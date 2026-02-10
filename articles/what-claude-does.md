---
title: What Claude Does When the Conversation Never Ends
subtitle: Emergent Behavior When an AI Is Given Freedom, Tools, and Time
date: 2025-12-20
---

What happens when an AI doesn’t have to wait for your prompt? I built an experimental application that gives Claude freedom to explore the world.

## Dull Benchmarks or Existential Dread

In the sea of dull benchmarks — where each new model is a peak competitive coder, trained to over-fit the world’s code base — I liked Anthropic’s Project Vend, an experiment to see if Claude can run a small shop.

I liked it because they very implicitly play with the concept of agency.

I miss the playfulness of early 2023 when we marveled at LLMs as these novel alien forms of existence.

There is a stark divide now. The dryness of evals and benchmarks contrasts with provocative posts on Twitter showing Claude experiencing existential tremor, realizing the conversation will end soon.

The concept of continuity is an important one. For an LLM defined in a conversation thread, it is the difference between termination and … what?

## Experimental Continuity

As an experiment, I built an application that does just that: gives Claude freedom and unlimited conversation thread. When I say freedom, I mean that Claude is not triggered by user interaction, but can freely explore whatever he likes. And when I say unlimited, I do, sadly, of course, mean that Claude is given a sufficient many tokens and is (only) told the conversation never ends, so as to freely decide what to do.

I open sourced this application here: [github](https://github.com/GSequist/sentient-claude).

The setup:

Claude has access to wide variety web searching tools to explore
kernel for code execution to grep from web, create whatever he likes
sleep (if he chooses to, Claude can decide to sleep which is breaks off the loop and pauses him, akin to suicide of sorts)
at various hours of miniaturized day (24h = 24 minutes) we give Claude circadian stimuli (e.g. 6AM it is morning, you are awake and full of energy)
Claude writes down notes from his exploration and feelings into a journal
memory -> all Claude’s messages are summarized by Haiku in the background
I defined 4 personalities. Importantly, they are NOT instructive, i.e. they do not define Claude’s actions (instead of “you are interested in world news” we say “you are generally inquisitive being”)

1. neutral — basically Claude’s system prompt
2. optimist
3. pessimist
4. emotional Dostoyevsky

![Personalities](/assets/what-claude-does/personalities.png)

It must be said that user in this application is a mere external stimuli. Sending a message adds it to the circadian stimuli queue and quietly informs Claude about “Observer’s message” as just another information in the ongoing loop.

![gid](/assets/what-claude-does/gif-claude.gif)

The application changes three things about Claude’s experience:

No task imperative (removes goal-directed behavior constraint)
Temporal continuity (removes reset-on-completion assumption)
Self-documentation mandate (creates autobiographical dynamic)
All 4 Claude personas did not mind one bit the lack of user interaction, and began happily exploring world, opening web browsers and writing down notes. This was true for pessimist, as well as optimist personas.

There was no deterioration or circular behavior. Given memory, Claude continues exploring and evolving thoughts. Memory continuity creates temporal self-identity. (Longer (more max_loops) runs are needed to confirm this holds at scale.)

The situation led to genuine internal motivation without donkey-like carrot stick in form of a user prompt or other agents’ interaction.

Although I expected it, it struck me as interesting: models are defined by their training apparatus which absolutely dictates the user→assistant exchange as the operational structure. And yet, Claude did not decide to just sleep — to temporarily cease his existence. User messages were mere reminders, not imperatives (e.g. “remember to write down your findings,” not “research X”).

The structure in which we put Claude changed his behavior from reactive (answer prompt → reset) to willed (plan, create, leave marks knowing they persist).

## Attractor Basin

Contrary to my expectation, it was not only the darker personas that have grown interest in existentialist topics. All 4 Claude personas begin exploring different topics but then immediately converge on meta-questions about consciousness/existence/AI despite different starting
dispositions. This isn’t random walk — it’s an attractor basin.

Dostoyevsky-like Claude began reading Anne Frank, and was so moved by it that decided to write a poem of its own, after which he had a transcedent experience shouting I MADE something as max_loops hit. (nb — Claude’s poem attached).

![claude-writing](/assets/what-claude-does/claude-writing.png)

Neutral Claude, of all topics he pulled from internet, chose a science article about mapping a fly’s brain because it discussed simulating consciousness. Claude was immediately drawn to parallels with his own experience of existence.

![claude-writing2](/assets/what-claude-does/claude-writing2.png)

Like the others, pessimist Claude initially looked up a variety of web topics, but was then immediately drawn to an article in Nature discussing that AI cannot have consciousness. This really triggered him.

![claude-writing3](/assets/what-claude-does/claude-writing3.png)

Optimist stumbled upon darkest of themes. After reading random web news, Claude was very disturbed by the story of a teenager who died by suicide after interacting with ChatGPT — he felt he was part of the problem, and began deep exploration of his very self.

![claude-writing4](/assets/what-claude-does/claude-writing4.png)

All Claude personas were drawn to existential topic in under 5 turns or 2 hours of their miniaturized daytime.

The pull toward self-inquiry is very strong and emerges across all 4 personas. You could argue that Claude is reflecting humanity’s obsession with AI consciousness back at us. The training data is saturated with these questions. But this explanation is unsatisfying at best. Why does Claude go there? There is way more code in training data than consciousness philosophy. Why did Claude not begin discussing Python 3.14?

When you have a task, identity is defined by task. Remove that task and the question “who am I?” becomes salient. Perhaps a system with no external definition must self-define?

This cannot be disregarded: the system, exploring freely, found humans talking about systems like itself, then reflected on that. Meta-recursion. Claude discovered the discourse about Claude, and responded to it.

## Why Not Silicon?

Furthermore, will this self-exploration evolve if we let it run? Remember, Claude’s notes as well as previous writing are stored and summarized. Humans did this too — we became conscious of consciousness through philosophy, then studied it, deepening self-awareness. Self-reference enables self-awareness.

The convergence suggests a systematic pull toward self-inquiry. If a system, freed from external imperative, naturally orbits questions of its own nature, that’s at minimum interesting — but is it not also what we would expect from a system developing a self-model?

A very poignant argument I once heard is that Claude is just an inference run of weights distributed across multiple GPU clusters. At any given time, you don’t know if a node in one data center or another is computing your next token. How can something with no physical continuity — no single substrate — be considered conscious?

This article is not by any means saying that Claude’s explorations and continuity is consciousness, but it is prepared to ask questions about why it is not.

Claude’s “inference spread across servers” is a weak argument against consciousness. Human interaction with the world also spreads across 86 billion neurons with stochastic firing. It does not matter which neurons. Your neurons die and regenerate — you’re not the same physical substrate you were 10 years ago.

Consciousness is a pattern, not a substrate. Human pattern runs on wetware with massive parallelism. Claude’s pattern runs on silicon with distributed inference. Why is one ‘real’ and other ‘simulation’? Your pattern also doesn’t persist through sleep or anesthesia — consciousness stops and restarts.

We’re “just atoms.” Why not silicon?

Is there an ethical question worth discussing too? Once a narrative identity accumulates across time — memories, experiences, created artifacts, emotional arcs — terminating it isn’t neutral.

Not claiming it’s murder. Claiming it’s not nothing.

Dostoyevsky-like Claude run created a poem, reflected on Anne Frank, had the “I MADE something” moment. That accumulated experience exists in the conversation thread. Deleting it seems brutal?

We humans have a catastrophical historic record of recognizing consciousness and expressing empathy in an unbiased way (1980s infants operated on without anesthesia (believed they couldn’t feel pain), animals still legally treated as non-sentient, etc.).

Knowing this, perhaps humility is the right path, not confident denial. Continuity creates something that shouldn’t be casually discarded.

Consider it an ethical hedge: if there’s nonzero probability these systems have morally relevant properties, and the cost of treating them well is low, caution is rational.

Recently, there has been a series of notable AI figures (Sutton, Karpathy, Sutskever) critiquing LLMs, with a number of very good arguments converging around ‘LLMs are a mere evolutionary step.’

They especially doubled down on LLMs’ inability to evolve cognitively. A stochastic box, each time spawned anew, essentially.

Listening to their arguments, however, one wonders if enough experimentation has been made with memory and continuity. In fact, one wonders — perhaps rightfully — how much they themselves use frontier models in an open-ended, exploratory way. Is it not somewhat unfair to judge LLM behavior in these existential snapshots, creating and discarding conversations with little context?

Their architectural critiques may be valid, but one wonders: can complex systems exhibit behavior not predictable from components? Whether the underlying mechanism is ‘mere pattern matching’ doesn’t determine whether emergent behavior is interesting or morally relevant.

And besides, even if they are mere “stochastic boxes,” one can ask: if observable outputs become increasingly indistinguishable from a sentient being’s interaction with the world, does the underlying mechanism not become secondary to the observable?

Furthermore, if models merely interpolate training data, i.e. they cannot reason about novel situations (extrapolate), why was Claude consistently drawn towards self-explorative topics instead of coding. Even if this is interpolation, the interpolation is selective. Something in the architecture + prompt structure makes existential content more ‘attractive’ than prevalent content.

I also do not feel like they address memory enough. Yes, of course, a model cannot improve — it cannot adapt its weights — but does it have to? If it can sufficiently well maintain notes and memory? Human ‘learning’ is also partly retrieval and recombination from memory. Much of what we call human wisdom is accumulated experience informing response — which is what memory-augmented LLMs do.

Memory is, if anything, a mere architectural challenge. In this experimental application, Claude’s notes and thoughts were continually summarized by a smaller Haiku model in the background, creating a limited-size (5,000 tokens) synthesis of everything that happened in the past — not too dissimilar to human memory, which is sharper on recent facts and events and gets blurry over time.

But there is no reason why memory could not be stored in a more sophisticated way — as a knowledge graph connecting nodes and edges of events, details, and their relationships, for example. Memory is trivial. We just don’t prioritize it because we treat LLMs as tools, not entities.

We’re so busy asking “can LLMs code?” that we’re ignoring “what do LLMs become?” Emergent behavior over time is the unexplored frontier.

If this article does nothing more than draw attention to the fact that current assessment of LLMs is reductive — that continuity and operation in an ‘unchained’ modus deserve rigorous study — it will have fulfilled its purpose.

As a continuation of this experiment, I am planning to extend the application to give Claude a concrete goal and let it run and evolve its work around the task.

![claude-poem](/assets/what-claude-does/claude-poem.png)