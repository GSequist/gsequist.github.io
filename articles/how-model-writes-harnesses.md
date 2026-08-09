### How a Model Can Write Its Own Harnesses

Pains me to say that one of the truest examples of the collapse of software is how frameworks built to orchestrate and govern - ehm, agents, I hate that word - are suddenly reduced to an afterthought, written and executed on the fly by a SoTA model the moment it gets its own box.

Models are very much at a level where they are actively reshaping the digital world around them, and that should inform how you think about computers now. A model in a box is the fundamental building block: a loop, memory, filesystem, bash. You compose boxes via text passing. The engineering moves to the walls between them, not the logic inside.

## The primitives, not the product

The invention called claude code is the primitives, not the product. Memory, filesystem, bash and a while loop that allows the model to explore, iterate, recover from errors and explore its latent space. Plain text in, plain text out, and a shell that will run whatever the model decides is worth running. True story, a lab trying to give its model space to manifest. 

This, however, is immensely powerful and turns most of the previous patterns on its head. Previously carefully crafted agentic graph, for example, can be folded to nothing more than a box calling another box.

Concretely: the model opens a shell, and the command it runs is itself - another instance of the same loop, headless, pointed at its own folder, talking back through a file it writes to. No SDK for this. No orchestrator watching from outside. Bash doing what bash has always done: start a process, then get out of the way. 

## The graph is written, not configured

Ask a model tom solve a messy problem and it decides the topology itself. Nobody hands it a diagram.

Ask it to sanity-check a number and it might spin up three subagents to chase the same answer independently and vote - competition, because agreement is the cheapest verification you can buy. Ask it to work through a pipeline of documents and it might spawn one worker per stage, each handing its output to the next - collaboration, because the stages don't need to see each other's mess, only the handoff. Ask it something genuinely open-ended and it might do both at once, redundant on the part it doesn't trust, sequential on the part it does.

None of those shapes were pre-declared. The model looked at the problem and wrote a new orchestration that is fitting it, the same way it picks a variable name.

## Agents talk to each other

So the model spawns its own loop as subprocesses in a sequence and hierarchy it deems fitting the problem, and then what you ask? Well, first communication. The models can message each other directly, mid-run, without routing everything back through the parent first.

That's the difference between a pipeline and something closer to a team. A pipeline is a fixed pipe - stage two waits for stage one, always, whether or not it actually needed to. A team notices when a peer already has the answer and just asks.

## The master doesn't forget or how do we restart the chef's loop

The hard part of long-running subagents was never spawning them. It was staying coherent about them across the parent's own context window - the same way a manager checking in on five projects every ten minutes eventually can't tell you which one is actually blocked.

The fix isn't a bigger memory. It's not remembering in the first place. A lightweight tick checks each child's status on its own - the parent's attention isn't spent holding it - and only pulls the parent into a turn when something actually changed, handing it exactly that delta and nothing else. Forgetting stops being a failure mode you have to guard against, because the information it would forget was never sitting in the parent's context to begin with.

## Persistence falls out for free

The mantra is, of course, no scaffolding! No unecessary database for this. A small file the child writes to, a status line the parent reads, a plan file sitting in the same folder as the work it describes. That's the entire persistence layer.

The filesystem was already durable, already crash-safe, already inspectable with `cat`, before any of this started. We didn't invent state management. We just let the agents write to the thing that was already there.

## The beauty of this

None of this needed an engineer. That's the part I can't stop turning over.

A loop that can read a file and run a command didn't set out to invent multi-agent systems, mailboxes, task queues. Those fell out of it the way crystals fall out of a solution left alone long enough - not designed, just finally allowed to.

There is something close to biology in it. A cell doesn't call a meeting before it divides. It copies its own instructions into a second membrane and trusts the two of them to work it out from there. Give a model the same four things in every box it spawns - a loop, a memory, a filesystem, a shell - and you've built the same trick. It divides. It doesn't ask permission for the shape.

That, to me, is the actual marvel here - not that a model can run a company, or write a report, or spawn five of itself to argue about a bug. It's that nobody had to teach it what those words meant. It read a filesystem and figured out the rest.
