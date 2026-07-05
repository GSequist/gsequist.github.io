---
title: Solve Hard Problems
subtitle: Scale of execution is not depth of problem.
date: 2026-07-05
---

Two interesting tweets that hit me in the last days.

![phil](/assets/solve-hard-problems/phil.png)

You can have objections to this. RLHF and RLAIF turn taste into a loss function too, and that matters. Taste, tone, what counts as helpful or safe; all of it is a proxy for the choices/preferences of a specific room in San Francisco, scaled indefinitely. So a chunk of what we call the model's judgment is really the lab's judgment, frozen and mass-produced.

But regardless, the claim holds as essentially all knowledge work collapses to a loss function problem, because essentially all knowledge work is by extension a coding problem. That I semi-agree with. The M&A model, the legal memo: these look like judgment, but in practice they resolve to exact problems. The M&A model is a DCF: fix the assumptions and the output is arithmetic, not opinion. The legal memo is a mapping, facts against statute and precedent, a lookup with structure. In every case the "thinking" collapses into a definite computation once the framing is set. And no one is better at exact problems than a SOTA model writing and executing code. The voiced opinion at the end ("I recommend we pass") is just the last mile of an exact process, and the exact part is exactly what code eats.

## The Translation Tax

Yes, you could've said this in 1985. Code existed before LLMs. If problems are collapsing to exact problems, you could have encoded them before. Excel was already code. Assumption-selection was already the bottleneck, not arithmetic.

What changed is the code is now generated on the fly, cheaply, by the person who owns the judgment. Simple architectures, assembled in the moment, disposable. That's new. That matters. What collapsed isn't the judgment, it's the translation tax between the expert's head and the running system. The distance from "I think the signal's in the elderly" to code that proves it used to be a two-week queue and three intermediaries. Now it's a sentence.

A specialist who vaguely knows the shape of the solution can now navigate a model through building the exact one-off system that solves it: check the direction, nudge, discard, rebuild, at a cost that used to be prohibitive. A specialist is rather a vulgar word describing anyone who knows or has the potential to know the problem intricately, not just stop at the shallow layer. A pharmacovigilance lead who needs to know whether a safety signal is real. She can't code the pipeline by hand: pulling the case series, deduping, normalizing MedDRA terms, running the disproportionality math, cross-checking against the label. Ten years ago that's a data-science ticket, a two-week queue, a translation layer between her head and the answer. Now she sits with the model and builds the one-off system live: she knows a PRR needs a proper 2x2, she smells it when the denominator's wrong, she says "no, stratify by age, the signal's in the elderly," and the code reassembles under her. She never wrote a line. But she owned every turn, because she knew the problem cold. The model supplied the hands; the judgment about what to compute stayed hers.

This to me, is the fundamental shift. Yet the discourse seems to hang around loops and quantity and more quantity.

## Loops Calling Loops

![geoff](/assets/solve-hard-problems/geoff.png)

Dear god, I share his sentiment when he shudders: is AI engineering really going to be about loops calling loops to write more code? And no, giving it a fancy infra label does not make it better, thanks for asking. He, and many others from the Claude Code team, are also skipping the important caveat: it is not good if Claude produces thousands of lines of good code thanks to clever loops if you don't know your code well. You don't own it. You are walking into a trap down the line. It's not the writing, it's digesting the complexity of the codebase in your own head, not Claude's context window, that makes you the owner of that codebase.

This is orders of magnitude more true for knowledge work. Mollick's "office heroes" are the human instantiation of this mistake. They know models well enough to move fast, and what they produce is a layer, not an insight. They skim a complex problem, get the model to generate something plausible-shaped around it, ship the artifact. No one interrogated whether the problem was framed right. The loop ran; nothing was understood.

## Find The Hard Problem

Scale-of-execution, not depth-of-problem. Quantity of tokens spent, not quality of the question asked.

The unlock isn't "loop more, orchestrate harder." It's finding and owning the hard problem in your own head, using code-on-demand as an instrument to cut through the expensive parts.

Please do not build for quantity. Go find the hard problem.
