---
title: The (Cruel) Benevolence of Gods
subtitle: Unkind Notes on the Future of Knowledge Work
date: 2026-02-10
---

For decades now, it was a sign of a good pedigree to aspire towards a desk job: the mind was the moat; analytical thinking, synthesis, judgment over manual work — these were the things machines couldn't do. That was the assumption.

In a world where software was eating the world for the past 20 or so years, when we automate software, we automate ourselves.

Make no mistake. the current frontier models are incredibly good. The gap between what they can do and what your desk job requires is not intelligence — it's access. Remove that barrier, and the displacement calculus gets uncomfortable fast.

## Bring model close to the metal

Most people know AI through ChatGPT. A text box. You type, it types back. Developers using Claude Code or Codex know something different entirely: a model that lives inside your machine, reads your files, runs your code, and does the work itself.

At a level where models currently are, chat interface is a constraint on their intelligence expression. It is the difference between giving model the ability of 'describing the work' and 'doing work'.

Through chat interface, you interact with a model the way you'd talk to someone through mail. You describe your problem. It describes a solution. You copy-paste. You go back and forth. The model never touches anything.

But give the model system access and everything changes. Dramatically. 'System access' is shorthand for allowing a model to read, write, and edit files on your computer. In other words, bring the model as close to the metal as possible.

This is like giving them externalized cognition. Models can structure their thinking, leave breadcrumbs, build compound context across files across sessions. The GUI[^1] forces atomic prompt->response. System access lets models manifest their true cognitive superiority.

Model stops describing work and starts doing it. It reads your files directly. It writes code and runs it. When it fails, it reads the  error, reasons about it, and tries again. It builds compound understanding across files, across sessions.

The primitives are deceptively simple — read a file, write a file, run a command. But those three operations compose into everything a knowledge worker does. The model doesn't need a spreadsheet GUI. It needs the data and the ability to write output.

The concerning proof is in how trivially this replicates.

Here's a micro version of CC I built in one evening — [github](https://github.com/GSequist/micro-cc). A persistent loop giving Claude file operations and a bash shell. It works surprisingly well because the models are just that good. Remove the GUI getting, it was getting in their way. Coding is the self-embodiment, if you will.

My invoicing used to be stitched together with macros — already automated, but I still pulled data manually. Logging into AWS,  downloading cost reports, cross-referencing hours. Now I maintain an instructions sheet, give Claude the keys, and ask. The  way you'd ask oh I don't know, a secretary. Same pattern for contract review, data migration, client reporting. All of these were jobs.

## Knowledge work is a for-loop

Begin by asking yourself, what does a knowledge worker actually do?
  - Read email → decide → write response
  - Read spreadsheet → think → update spreadsheet
  - Read document → synthesize → write document
  - Pull data from system A → transform → put in system B
  - Read requirements → plan → execute steps

  All of this can be distilled to:
  1. Read from data layer one (API/file/GUI)
  2. Cognitive processing
  3. Write to data layer two (API/file/GUI)

  Give model a file access and ability to execute code, and it will:
  - Read .csv, reason, write .csv
  - Read emails (via API), compose responses
  - Pull from database, analyze, update database
  - Read docs, extract, write reports

Right now in this moment in history, we are at crossroads, coming to the realization that coding IS the abstraction layer for all knowledge work. Once you can code autonomously, you can do anything that's read→think→write.

A financial analyst pulls data from Bloomberg, builds models in Excel, writes the investment memo. That's read API → compute → write_file. A paralegal reviews hundreds of pages of contracts, extracts risk clauses, organizes findings. That's read_file → grep_ → write_file. A project manager reads status updates from six teams, identifies what's blocked, sends the Monday email. Read → synthesize → write.

Financial modeling: read assumptions, compute, write output. Market research: read sources, synthesize, write report. Project management: read status, identify blockers, write action items. The job titles change. The loop doesn't.

## So why aren't we all unemployed? 

Organizations are interconnected graphs of responsibility. You automate the edge — say, reviewing invoices against supplier contract terms, verifying, responding. Eight hours saved. But that person wasn't just executing a task. She was a checkpoint. She caught anomalies. She knew when a number didn't look right. She was accountable.

Automate her, and you don't just need the automation — you need the checks and balances she provided. Monitoring. Validation rules. Escalation paths. Audit trails. You need to engineer the trust that was previously embodied in a human. That is cognitively hard — designing those systems requires deeper understanding of the process than the person doing it ever needed. And it's decision-hard — someone has to sign off on replacing human judgment with automated judgment system, and own the consequences when it's wrong.

It is for this reason that despite the models' immense capabilities, the automation stays mostly local. Contained. Not because of politics — because the replacement cost isn't just the salary. It's the  entire accountability architecture around it.

Other than the rigidity of social structures, somewhat surpisingly, white collar jobs are also protected from models by the bloated XML of MS office documents. Models choke on .docx and .xlsx—not because parsing is impossible, but because these formats are compressed XML nightmares, designed for humans clicking through ribbons, not models reading data. If people were exchaning work outputs in .txt or .md files, this entire shift would be much faster.

## The math doesn't care

It's a simple game theory: first company where one person with system-access AI produces the output of five has an 80% cost  advantage. Competitors follow or die. There is no third option.

Worse still, this is assuming that the evolution stops at this stage, but this is unlikely. In a span of one year, frontier models x10-ed in terms of quality, the ability to devour complexity of problem and solve it with finesse.

## What remains

If most knowledge work is a for-loop, what isn't?

I run four or five Claude Code sessions in parallel most days. Work that takes the model minutes takes me hours to review,  stress-test, and certify. I am, in the most literal sense, a manager now — a bridge between physical reality and the model's  cognition. But, I am also the bottleneck. The model's throughput exceeds my capacity to verify its output. That asymmetry is the new shape of knowledge work. 

Understanding the data layers underneath — where things are read, how they transform, where they're  written — well enough to instruct a model in its own terms, then deciding whether the output is correct. The for-loop hasn't gone  anywhere. You've just moved from inside it to above it


## Benevolence of gods

The unkind reading: most knowledge workers are cognitive middleware. Integration layers between data systems. Human APIs with  judgment. A model with system access is also an integration layer with judgment. Faster. Cheaper. Always on.

What protects white-collar work today is not capability but complexity — tangled accountability structures, social contracts, trust  that lives in handshakes and hallway conversations. These are real. They will slow displacement. They will not stop it.

The question isn't whether the for-loop gets automated. It's what you become when it does — the person using the model, or the  person the model replaced.

Only in retrospect is it unsurprising that a probability function, enriching its parameters by devouring quanta of human output,  could achieve this depth of cognition. A benevolence of gods that such a thing exists at all. 

It comes as a joyful new miracle to marvel at, but also, given the unforgiving cruelty of economics, a real competition to your very self's worth.

[^1]: GUI — Graphical User Interface. The visual layer of buttons, menus, and ribbons between the user and the actual data.

Co-authored by Claude, ofc.

