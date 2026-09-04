---
title: Thinnest Layer Wins
subtitle: Simplicity Over Engineering in a Post-AI World
date: 2026-07-03
---

We are at a strange and slightly frightening moment in history.

Almost any piece of hard, soul-deep knowledge work - the kind we spent our twenties earning the right to do - can now be performed by a frontier model end to end.

Not described. Done.

The only thing standing between the model and your job is not intelligence. It is whether you know how to throw the work at it.

Most people haven't noticed yet. That gap - between the ones who know and the ones who don't - is the most interesting thing happening in work right now.

## The Spreadsheet Moment

If you read history, you can be relatively calm about this.

Before VisiCalc in 1979, a "spreadsheet" was a physical sheet of paper and a department of clerks was the computer - each person a cell, recalculating by hand whenever a number changed upstream. VisiCalc did not speed that up; it made it unrecognisable. The mechanical recalculation vanished, and what remained - the judgment, the interpretation, the advice - grew.

We are standing at the equivalent moment. The harness does for cognitive work what the spreadsheet did for arithmetic: it collapses the mechanical effort and leaves the human the part that was always the point.

## Two kinds of people

From here, the world splits into two kinds of people.

The consumers of model memory. They come to the chat box and ask. They receive compressed civilisation - a clean first map of transfer pricing, cytokines, IFRS 16, Rust lifetimes. They get answers.

The compilers of private memory. They expose their own world to the model - their files, rules, traces, examples, failures, half-finished tools. Then the model works inside that world. They get leverage.

The first gets a better search engine.

The second gets a second self.

And once the model has hands inside your own working surface, the question stops being how much faster. You can spend it on quantity - ten times the output, ten times the speed. Or you can spend it on quality - push into directions that used to be closed because neither the hours nor the raw IQ were ever there.

There is no longer a wall at the edge of your competence. The wall is your imagination.

## The loop is the trick

Here is the part that I find particularly exciting.

In many ways, the frontier models restarted the game. No lab, no company - not even the ones who trained the things - has the answer for what the product is supposed to be. The product-market fit of intelligence itself is still wide open.

And one of the most loved products to come out of this (incl. by me) - Claude Code is, at its heart, a remarkably simple loop.

This is the realisation I have been obsessing about for a while now. A loop, with memory, and access to a filesystem, is the whole trick. Throw almost anything at a frontier model in that shape and it will solve it, given enough turns. It plans. It runs something. It reads the error. It tries again. It recovers. The intelligence was never the bottleneck - the iteration is where the work actually happens, and the loop is the thing that lets it iterate.

Here is me [watching Opus chew through a raw SAP dump](https://www.linkedin.com/posts/george-salapa_build-a-provenance-trail-on-23gb-data-dump-ugcPost-7445422769523019776-USCc/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAAbZIrQBj4Os2W3-xPSQbQexrjlsP-nhALA) - thousands of lines of transactional sludge - and surface chain transactions and over-collected VAT that no one had asked it to look for. No framework. A loop, a shell, and the documents. ([you can install it here](https://pypi.org/project/micro-cc/))

## thinharness: disposable intelligence

I am betting on this and call it thinharness. 
![thinharness](/assets/thinnest-layer/thinharness.png)

Where others build orchestration - graphs, nodes, routers, frameworks on top of frameworks - I believe the thinnest layer will win: agent loop of about ˜200 lines of code.

```python
while True:
    resp  = model(msgs, tools)      # the model thinks
    calls = resp.tool_use
    if not calls:                   # text, no tool → done
        return resp.text
    results = run(calls)            # bash_, inside a throwaway box
    msgs += [resp, results]         # append, repeat
```

Add a caption (optional)
That is the entire kernel. The only tool it truly needs is a shell - bash_ - because a model with a shell inside a disposable box writes its own scripts, installs its own packages, builds its own tools on the fly. Capability stops being something you wire in advance.

No matter what the task is, no code rewiring necessary. 

All you do, is write instruction.txt.

```python
from thinharness import Harness

h = Harness(instruction="instruction.txt", model="claude-opus-4-8")

h.run_cron("Begin the nightly run.")   # headless, returns
app = h.chat_app()                     # streaming, a chat
```

The instruction file is the entire engineering surface. It is prose - what the agent is, what it should do, what good looks like. Change the file, change the worker. A sales-order reviewer and a railway-maintenance triage agent are the same kernel and two different text files.

## A computer, not a sandbox

But to understand why that is enough, you have to see what filesystem access actually means. The model is not typing into a sandbox. It is handed a computer.

Every run spins up its own container - a real machine, a real disk, a real shell - and drops the model inside with bash_ and nothing else. It reads the files placed there. It writes new ones. It installs a library it decides it needs, runs a script it just wrote, reads the error, corrects itself. When the work is done, the container syncs its results out to storage and is wiped. The next run gets a clean one.  

That disposability is not a limitation. It is the whole reason you can safely give a model a shell. One box per task, one box per user, gone afterwards. Nothing leaks, nothing persists that you didn't ask to keep. 

In practice this takes two shapes, and they are the same kernel wearing different clothes. Headless is the simpler one. A plain container, scheduled. It wakes at three in the morning, pulls the night's folder of contracts from storage, runs the loop against each one, writes the answers into a database, syncs whatever it produced back out, and dies. No server sitting idle, no human, no screen. You pay for the minutes it runs and nothing else. This is cron - the agent as a batch job. 

Chat is the same loop with a person on the other end. A thin, always-on gateway takes the request. The moment a user speaks, it hands them one of a pool of containers kept warm and waiting - on our setup a Fargate task, a real isolated microVM - bound to that one user and nobody else. The box pulls that user's  files from storage onto its local disk, runs the identical loop, and streams the work back token by token.

Sit idle for ten minutes and it is reaped: the workspace pushed back to storage, the container wiped. Return tomorrow and a clean one spins up and rehydrates your files. So isolation is not a sandbox you are trusting the model to respect. It is the boundary of the machine itself. The model can do anything it likes inside its box, because the box is yours alone and thrown away after. That is what lets you hand it a real shell and still sleep at night - one tenant, one container, one lifetime.

One loop, two exits. Cron returns; chat streams. No graph to design, no GUI to require, no scaffolding to learn. A text file, a disposable computer, and a loop - pointed at SAP dumps, at legal PDFs, at a maintenance log, at your own messy working folder. The pattern never changes. Only the instruction does. And if you need a GUI version to interact with, you install CC or [my harness](https://pypi.org/project/micro-cc/)

The program is the instruction. The kernel is only the interpreter.

For forty years we told a story where the desk job was safe because judgment could not be automated. The judgment is still yours. Almost everything underneath it is now a loop.
