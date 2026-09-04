---
title: How Various Harnesses Engineer Their Loop
subtitle: Exploration of Pi, Hermes, DSH, Codex, CC and microcc
date: 2026-09-04
---

I will, for once abstain from any stylistic hurrah and just get right down to explaining - this is a factual piece. Building [microcc](https://pypi.org/project/micro-cc/), I greatly benefited from having the opportunity to read other people's open source projects. I am immensely thankful.

Below are notes on their loop architecture: how the loop uses tools, text files (Anthropic's skills), system notifications, how a harness writes its own harness (subagents), and how it changes itself mid-run. All of it has a downstream impact on token caching, so I write a little about that too.

Most of these concepts come from Anthropic. They look simple, but that is only true after the fact. I will also not pretend to have read each line of code of these immensely rich and powerful repositories. I did where I could, and tried it as much as possible, but was also significantly aided by Claude. One specific callout to the Pi team, for they inspired me to write my own TUI, ripping out Textual dependancy.

![harnesses](assets/loop-engineering-harnesses/harnesses.png)

## The Loop

A new primitive of software engineering. Whereas in past, model was treated as a mere decoration on top, a layer called onto existing tech stack to answer a question, the present paradigm is to always spawn model inside its own box and give it the latitude to loop, explore its latent space, reason longer, invent ways to recover from mistakes, iterate and decide when to stop. A concept so simple, and so heavily relying on the ability of model, that it has become something of a joke; a meme contrasting the very little human engineer is expected to do with the abnormality of feats frontier models can do.

## Bash is All You Need

Frontier models thrive on shell usage. Writing a shell command is in model's reptile brain, a deeply inprinted memorized knowledge. A loop without a bash is teethless.

## Context

Where 2022-2025 joyfully explored with tool schemas and agent graphs, the new new is to 'get out of the model's way,' start it with as minimal context filled as possible, while allow it to call into its context newly discovered tools and instruction files.

## Hooks

A hook is one specific point inside the loop's own code - before a tool runs, after it runs, when a turn is about to end - where the loop pauses and asks whatever's registered there what to do next. The loop hands over exactly what it has at that moment, the tool call about to happen, the response that just came back, and waits for an answer before continuing. Nothing registered, and the loop carries on as if the point was never there.

What a hook is allowed to touch depends entirely on where it's wired in. One placed before a tool runs can block it or rewrite its arguments. One placed after can rewrite what came back, or send the loop around for another pass instead of ending the turn. Almost none of them get to reach backward and rewrite what's already happened - across the six harnesses this piece looks at, that stays a separate, harness-owned mechanism, usually compaction, that hooks don't touch. 

## Subagents Are Just More Loops

There's no separate subagent architecture sitting behind any of this. A subagent is the same loop, started again, usually through the exact primitive that already lets the parent run a shell command. The parent isn't calling into some dedicated spawn-agent subsystem so much as running a program, and the program it happens to run is itself - pointed at a different folder, handed a narrower prompt, sometimes with fewer tools. A guardian review, a delegated task, a teammate on a shared board - all of it is the same loop wearing a different hat, not a second kind of thing.

I see a beauty in this; a thing that harness makes possible - model shapes the world around itself. Nobody had to design a multi-agent framework for this to work. Give a loop a shell and a way to talk to a running process, and spawning a copy of itself is just another command. What actually differs harness to harness, and what the rest of this piece gets into, is what that new loop starts out knowing, what it's allowed to touch, and how it gets to talk back to the one that started it.

## Tool Discovery

A tool schema costs tokens on every single turn, whether the model ever calls it or not. Load fifty tools onto every request and fifty tools sit in context on the turn where the model only needed one, from the first message to the last. The fix spreading through this piece isn't a smaller tool count, it's not loading the tool at all until something has a reason to.

The shape is close to the same wherever it shows up. A name and a one-line purpose are known ahead of time, the full schema isn't. The model asks, by keyword, by a plain description of what it needs, sometimes by exact name, and only what matches actually enters context, at which point it behaves like any other tool for the rest of the session. What's fixed and what's discovered differs harness to harness, but the principle doesn't: don't pay for what you haven't reached for yet.

## Codex

Codex is OpenAI's own coding agent, built almost entirely in Rust. Each turn, the loop hands the model three separate things: a fixed set of instructions, a list of available tools, and the conversation so far. The important part is that these never get mixed back together once a run starts. The instructions and tool list stay put in their own slot on every request. The conversation only ever grows - new tool results and new messages get added to the end of it, nothing already recorded is ever rewritten or reordered. Codex enforces this directly rather than trusting itself to follow the rule: before it treats a new request as a continuation of the last one, it walks through both item by item and confirms the new one really is the old one with something new stuck on the end. Fail that check by even one changed byte, and codex gives up on reusing what it already sent and builds the request fresh.

Tools work the way you'd expect, a fixed registry the model calls into. Skills come along for the ride too - when the model spins off a subagent, its own skills service travels with it so the child can use the same instruction files the parent could. None of this rewrites itself mid-run. Codex doesn't touch its own instructions or swap which tools are on offer once a turn is underway. Whatever was fixed for the loop was fixed before the first request went out.

Subagents are where codex gets more interesting. A guardian review session spawns a child with no memory of anything the parent has done and a stripped-down toolset - it can flag a problem but it can never stop and ask a human what to do, that door is closed on purpose. A separate tool, `spawn_agent`, lets the model fork a child that inherits the parent's settings, which sandbox it runs in, what directory it's pointed at, how cautious it needs to be, but still starts with no conversation of its own. Either way, whatever the child comes back with gets added onto the parent's own record. It's never spliced into the middle of what the parent already knew.

This does not just work in one direction. In the newer multi-agent mode, a running child can push a structured message straight into the parent's turn while the parent is still working, so the two can talk mid-task instead of only at the end.

Hooks are where codex goes furthest of any in the sample. Twelve separate moments in the loop can be hooked into: before and after a tool runs, when a session starts or ends, when the model asks for permission, before and after the loop compresses old history to save space. It's all configured through a TOML or JSON file that matches handlers to events by name or pattern, and handlers can run synchronously or in the background. Nobody else here builds hooks this thoroughly.

## Deepseek's Harness

DeepSeek's own harness is a large TypeScript monorepo, built on the same bones as the rest: a loop, a set of tools, a memory layer underneath. It keeps the fixed and the growing parts of the state apart in its own way. The system prompt, the tool list, and the run's configuration get frozen together into a single object the moment a turn starts - they call it an `EpochHeader` - and that object only gets rebuilt when something inside it genuinely changes. Everything the model sees beyond that gets read off an append-only log: new turns, new tool results, new messages, all added at the tail, nothing rewritten. The one place they break that discipline on purpose is when the log gets too long and needs summarizing. Their own documentation says as much: the frozen part stays reusable for exactly as long as nothing about it changes, and the moment it does, everything downstream has to be rebuilt.

This is also the harness that answers the sharper question: can a loop change itself while it's running? At the level of the core driver, no. DeepSeek's core has something called an `AgentFactory`, registered through a function called `setFactory()`, and it looks exactly like the mechanism you'd want for hot-swapping the loop's own implementation mid-flight. It isn't one. `setFactory()` takes exactly one registration - call it a second time and it throws. One loop implementation gets chosen, at build time, and that's what runs for the life of the process.

One level up, the answer flips. A tool called `cordis_define` lets the model write raw JavaScript, host-side code, client-side code, or both, that becomes an immutable package. `cordis_run` mounts it live into the exact same running system the loop itself is built on. Once mounted, that self-written code can register new tools, and it can hook into the same events that drive the loop's own turns - `agent/pre-step`, the same gate that decides what gets added to context each step. The tool that hands this power to the model does exactly that to itself, wiring a handler onto that event the moment it loads. So the driver stays fixed, but the model can write and mount new code into its own running session that reaches into the same wiring steering its own behavior. That's the closest thing to a self-changing kernel anywhere in this survey, and it's sanctioned on purpose, not a workaround someone found - their own config calls it a trust boundary rather than pretending it's a sandbox.

Subagents come from two separate providers here, and the difference between them is written as a plain setting. One spawns a completely fresh child with an empty session, nothing carried over from the parent. The other forks the parent's own log up to the last turn that finished cleanly, so the child starts already knowing what the parent knew. Either way, the child's access to tools is boxed inside its own private scope that the parent and any siblings can't see or touch, and the child is told directly, inside its own system prompt, that this scope was fixed the moment it was created and nothing it does from inside the session can widen it.

Some children don't just report back once and disappear, either. A continuable child keeps its session open after its first response, and the parent can keep talking to it afterward through a `sendMessage()` call, steering it instead of spawning a fresh one from scratch every time.

DeepSeek never built its own hook configuration format. Instead the loop exposes its internal events directly - a tool about to run, a tool that just finished, a turn about to end - and two small bridge packages translate an existing Claude Code or Codex `hooks.json` file into calls against those events. Point one of those bridges at a hooks file already written for Claude Code, and it runs against DeepSeek's loop unmodified.

## Pi

Pi is a very elegant and clean designed CLI harness built to talk to more than one model provider, and it keeps the same basic discipline as the rest: a system prompt fixed for the run, a tool list that changes rarely, a conversation that only grows. When the conversation gets too long, pi compresses it by working directly on its own session log - it replaces a range of already-committed entries with one summary entry, and that's built into the harness itself, nothing a plugin can trigger.

Pi is interesting, for it has a hook called `transform_context` that fires on every single request the loop makes, and hands whatever's listening the entire assembled context - full history, system prompt, all of it - with permission to hand back a complete replacement. Nothing pi ships uses this itself. It just sits there as an open door, and it's a wider door than the other harnesses in this piece leave open: DSH walls off that kind of power behind a dedicated compaction component, cc's hooks can only append a new message to what's already been decided, and pi's `transform_context` can rewrite anything, on every turn, if something registers for it.

None of that touches the loop itself, though. Extensions can add tools, add hooks, add whole new behaviors, but the code actually driving the model stays the same program from the first request to the last.

Subagents in pi aren't a built-in tool. They're a documented extension that spawns an entire second `pi` process for each one, run headless, talking back over its own standard output instead of any shared memory. Because it really is a separate process, the child starts from nothing: no shared history with the parent, only whatever the extension decides to hand it up front, including which tools it's allowed to use and what its own system prompt should say.

Hooks in pi aren't configuration at all, they're code. There's no hooks file to write - a handler gets registered directly from a TypeScript extension file that's loaded when the harness starts. That trades the flexibility of a config format for something closer to writing a plugin: fewer knobs to turn, more done by each one.

## Hermes

Hermes is also the heaviest of the six, and that's not a compliment. The actual loop is Python, a plain `python run_agent.py` process, but wrapped around it sit three separate frontends: a terminal UI, a web frontend, and a full Electron desktop app with its own build pipeline, Vite, electron-builder, native dependency staging, installers per platform. All of it talks back to the Python core through a dedicated gateway process. Two languages, four separate programs, to keep one agent loop running. Everything else in this piece does the same job as a single process in a single language.

Underneath that sprawl the loop mechanics are genuinely careful, which makes the packaging harder to excuse, not easier. It treats the fixed part of what the model sees as something with real internal structure, not one undifferentiated block. The system prompt is built in layers - identity and instructions first, then the state of the current workspace, then the parts most likely to change from one call to the next, like the skills index or the current timestamp - deliberately ordered so that whatever changes most often sits furthest from the front. Anything a plugin wants to inject into a running conversation goes into the message the model is currently responding to, never back into the system prompt itself, specifically so a plugin doing its job doesn't quietly disturb the one part of the state everything else is built to assume stays fixed.

The loop itself doesn't rewrite its own logic mid-run. What changes is what's available to it, skills, tools, plugins can all be added or reconfigured, not the loop that's driving all of it.

Subagents here are called by name: the tool is `delegate_task`, and the harness means it literally which is somewhat limited in comparison. The parent genuinely never sees what the child did along the way, only the request it sent and the summary that comes back. The child doesn't inherit the parent's own identity either - that's deliberately left out of what gets built for it - and which tools it's allowed to use is decided by taking the parent's own toolset and subtracting a fixed list: no delegating further, no writing to shared memory, no messaging anyone directly. That last one is a real capability elsewhere in Hermes, not an invented restriction - `send_message` lets one running agent reach another directly, mid-run. It's simply stripped out of what a delegated child gets handed.

Hermes runs four separate hook systems side by side, each built for a different situation: one living inside the same process for plugins, one that shells out to any language over a small JSON protocol deliberately made compatible with Claude Code's, one that lives in the gateway process and is organized as a folder per hook, and one that just pushes signed events out to an external URL. One hook is worth naming specifically. It fires right before the loop is about to accept whatever the model just said as the final answer, and it's allowed to send the loop around for one more pass if something looks wrong, capped at three extra passes, so a hook with a bug in it can't turn into an infinite loop of its own.

## The One That Leaked

None of what I describe here is from anything Anthropic published. It's read off a source tree that leaked for a brief moment, and I was fortunate enough to read through. Everything below is my own reading of that code with the help of Claude. It is not a claim about what Anthropic officially ships or endorses.

The system prompt is split at a literal marker in the code into a fixed identity block and a second part rebuilt every time from CLAUDE.md and the state of the current session. The conversation, like everywhere else, only ever grows.

The loop doesn't touch its own logic while it runs. Tools, skills, and MCP servers can all come and go across a session, loaded and unloaded as the model discovers or drops them, but that's a change to what the loop appends to messages, not a change to the loop itself. The history-shrinking pass works the same way it does in pi and DSH - hardcoded control flow inside the loop. When a hook does add something, a tool hook's extra context comes back as a plain new message dropped into the current turn, appended where the turn already is. It never gets spliced further back.

That discovery mechanism has a name in the source: `ToolSearchTool`. Most of what a session could call isn't loaded by default, only a name is known ahead of time. A keyword query, or an exact `select:<name>`, searches over what's still deferred and pulls the matching schema into context, at which point it's just a normal tool for the rest of the session. It's the same trick the Claude session helping me write this piece is running on, mid-search calls and all.

Subagents come in two forms. The ordinary kind starts completely fresh: its own prompt, its own tool pool, nothing carried over. A second kind, a fork, deliberately does the opposite - it hands the child the parent's exact system prompt and its entire conversation so far, on purpose, so the child's very first request looks close enough to something the parent already sent that it can be served from what's already been processed instead of starting over. Nobody else studied here builds that second kind.

There's a separate system sitting next to that one, gated behind its own flag: teammates, spawned through a different tool than the one above. Where an ordinary subagent only reports back once it's finished, a teammate can be messaged while it's still running - if it's mid-task when a message arrives, the message gets queued and delivered into its next tool round instead of getting lost, and a teammate that's stopped can be woken back up by the message that reaches it. Messages can also go out to a whole team at once through a shared mailbox, and teammates carry a bit of protocol on top of plain text: one can ask another for permission to shut down, or to get a plan approved, mid-run, with the answer routed back the same way. Two of the addressing schemes I found even reach outside the one machine - one over a local socket, one across machines entirely.

The hook system covers a lot of ground. 26 moments in the loop, several I hadn't seen used anywhere else, like a file changing on disk or a new worktree being created. One hook can force the loop to keep going instead of stopping where it otherwise would, though it's deliberately switched off the moment the model's last response was an error, so a hook can't accidentally start the loop retrying itself forever.

## microcc

microcc is the harness I built myself, the reason I went reading through all the others in the first place. Everything above is a coding agent that happens to generalize. microcc was never coding-first. It's running on clients doing CRM work, accounting, and general operations, none of it code. Code is model's hands for knowledge work; that is the premise of microcc.

It's also the smallest of the six by a wide margin, on purpose. Plain Python, no build step, nothing like bazel or tsdown or a Cordis plugin system sitting underneath it. Small enough that reading the whole loop is an afternoon, not a research project, which matters more than it sounds like once a client is trusting it to run a shell against their own systems. Distribution is `pip install micro-cc`. 

Headless isn't a stripped-down mode bolted on for demos, it's the exact same code path interactive use runs, just pointed at a folder instead of a terminal. Drop it into a container and it runs, no gateway process, no web frontend, no separate infrastructure to stand up first.

Its loop keeps the same discipline described throughout this piece. The system prompt and the memory index each get cached in their own block, kept apart on purpose - update one and the model doesn't have to reprocess the other from a cold start. A memory update doesn't touch that block once it's written either. It gets tacked onto the end as a short note instead, marked so a later cleanup pass knows to leave it alone.

The transcript itself never gets deleted. Every message is written to disk the moment it happens and stays there. What changes is what gets replayed into the live prompt: once that gets too big, older messages get folded into one summary and drop out of what the model sees each turn, but they're not gone, the full text is still sitting on disk, and a search tool can reach back into it any time the model actually needs an exact quote or an old file path. The conversation grows forever on disk. What the model is looking at right now doesn't.

Tools work the same way. `search_tools` takes a plain description of what's needed, embeds it, and matches it against a precomputed catalog by cosine similarity, falling back to keyword matching on backends with no embedding API. A match gets written into a small per-project store, so it's there for the rest of the session without needing to be searched for twice, but nothing about it costs a token before that first search actually finds it. The same discipline shows up in `monitor_`, the tool that watches subagents and backgrounded processes: it isn't offered every turn either, only on a turn where there's actually a tracked subagent, a live process, or an active watch to report on. Nothing to monitor, no schema slot spent asking about it. When it is in play, one action reads a subagent's on-disk transcript straight off disk and reports done, failed, or still running; another starts a live stream that pushes matching output into the session the moment it happens, instead of the model polling in a loop to find out.

The loop doesn't touch its own logic while it's running, same as everywhere else in this survey.

Subagents get spawned exactly the way described earlier in this piece: shelling out to a second copy of the harness, pointed at its own folder, running in the background, no SDK, no dedicated spawn subsystem, just a shell command whose program happens to be itself. It starts with nothing from the parent, its own history, loaded from its own project directory. Coordination between agents needs no infrastructure either - one agent reaches another, parent to child or sibling to sibling, by trying a live socket first and falling back to writing into a durable inbox file if nobody's listening. Whatever's sitting in that inbox gets folded back in at the next turn boundary, so a message sent mid-tool-call still lands, just a beat later than it would have live. None of it needs a message broker or a queue. It degrades to plain files on a filesystem the client already controls, which matters more than it sounds like for anyone running this air-gapped.

microcc does not support hooks, nor does it have subagents with inherited context.

## Closing

Six harnesses, the same shape underneath: a loop, a shell, a fixed part kept apart from a growing part, and a handful of named moments where code gets to interrupt itself. The differences are all in the edges - how far a hook is allowed to reach, how much infrastructure two agents need just to talk to each other, how honestly each one admits what it hasn't built yet.
