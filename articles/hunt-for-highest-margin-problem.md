---
title: The Hunt for the Million-Dollar Problem 
subtitle: AI Labs Are Solving Centuries Old Scientific Puzzles. Are You Pointing Claude at Sufficiently Hard Problems? 
date: 2026-09-08
---

![cover](/assets/hunt-for-highest-margin-problem/cover.png)

> Editorial note: All em-dashes in this article were human generated. Also, editorial note, Claude has absolutely helped me to understand and re-explain concepts in this article, 10x-ing my mediocre IQ. 

Unapologetically, it is very fun (if you have no stake in the game) to observe AI labs' current obsession with solving science problems by pointing their giant models at them. Fun because out of all sciences, they chose math — the one every AI doomer swore by, pointing fingers, explaining why LLMs can't solve basic calculations. Now demolished, seemingly with ease, one problem after another.

First, OpenAI announced 10 problems solved — astra took on ten open problems in math and theoretical computer science, each stuck for a decade or more with no progress: sphere packing bounds, group theory counterexamples, circuit complexity lower bounds, Ramsey numbers, among others. Each came with a Lean-formalized proof, checkable by machine. As of this writing, not one has cleared peer review, and there is already a credit dispute among mathematicians.

Then, Anthropic — one of its staff, Jarred, a non-mathematician — in a somewhat sympathetic cluelessness pointed Claude at the Riemann hypothesis and said "take a real stab at it," followed by the more educated "keep going" and "believe in yourself." Claude didn't solve it (nobody has, not for $1M, not ever). But it did push the proven lower bound on how many of the zeta function's zeros sit exactly where the hypothesis says they should — a separate, decades-old subproblem — from 41.6% up to 67.2%. What that actually means, with diagrams, is below the line[^1].

In a great finale — timing helped my thesis — OpenAI just announced that astra, roughly 10,000 agents running for 88 hours, produced a proof for the Navier-Stokes equations. It is, as it always is with OAI, messier than it looks: it solved the *forced* version, not the *unforced* case the Clay Institute's actual Millennium Prize criteria require. Impressive. Not a $1M cashout. An NYU mathematician, Buckmaster, alleges he and his collaborator, Alpöge (the same Anthropic mathematician who vetted Claude's zeta result, haha small world), had their private progress passed to OpenAI, and that when he moved to go public he was told "why would you ruin your career?" OpenAI's Bubeck denies it, calls it "false and inflammatory." Here's the part that should actually make you uneasy: the alleged leak vector wasn't a person. It's that their own work, fed into OpenAI's models as they used them, allegedly made its way back to the lab itself. If true, running your unpublished work through a frontier model isn't just a productivity choice, it's a disclosure decision. Let's let that one slide for now, but it's the actual crux.

![openai](/assets/hunt-for-highest-margin-problem/oai-navier-stokes.png)

Mercifully to whoever reads this, I will abstain from even pretending to remotely understand either of these complex problems, nor will I share some AI psychotic exchange between me and Claude on the subject. (Ok, but I lie, I actually do drop some notes below the line because, oh well it is interesting [^1])

Instead, and solely because Anthropic shared the detail of their [method](https://www.anthropic.com/research/riemann-zeta) (a fun read in and of itself — their own writeup can barely hide that it's having fun at Jarred's expense), I would like to focus on lessons learned, and more specifically can you apply some of their methods to your problems, i.e. become a superhuman?

> "Jarred Sumner, an Anthropic staff member (and non-mathematician), prompted Claude to 'take a real stab' at the hypothesis itself, leaving the mathematical choices from there up to the model."
>
> "...Jarred's input was mostly limited to sending Claude messages of encouragement (mostly variants of 'keep going' or 'believe in yourself')."

Per a footnote, the same trick was later reused to help Claude disprove the Jacobian conjecture. Encouragement, it turns out, generalizes.

![anthropic](assets/hunt-for-highest-margin-problem/claude-riemann.png)

## There is No Easy Easy There 

If you appreciate Jarred's astute maneuvring of Claude's sheer reasoning and coding power like me, you will also note that his psychotic pushing of Claude would yield to nothing, were there not a team of scientists at Anthropic who formalized the work. Naively, one might think we are in some wild wild west era when anyone willing to pay for tokens, with a good idea for next hard $1M scientific record to break can cash in. Partly, yes. And the part that's yes — in Claudish — is the part that should actually excite you, more than the wild-west fantasy itself. More on that later. But mostly, and far more importantly: *absolutely NO*. If you do not know what you are doing; if you are not a specialist capable of holding the problem in your head, then you will drift into AI psychotic generative loop, pushing model in nonsensical direction, it being what it is a generative transformer, drifting obediently with you, while generating quants of text that seem intelligible, but are nonsensical.

## Give Model Hands

We would not even be here talking about this, were models not given the ability to write, execute and store intermittent artifacts of its code. If we'd stay at the level of language, we'd still be fighting off those nasty AI doomers asking ChatGPT to multiply n x a, reveling at its inability to answer correctly *in language*, oblivious to their own absolute idiocy. Not prose, but code.

## Models Give You Wings

Models allow you to immensely cheaply synthesize *libraries* of previous knowledge. In Anthropic's case, Claude combined two papers nobody had thought to combine before. And it did something else: older proofs looked at each piece of evidence on its own, one at a time, because checking how every piece relates to every other piece by hand is too much bookkeeping for a human to suffer through. Claude kept all of it — every piece, and every relationship between them. Nothing thrown away. That alone is worth roughly 26 percentage points of proof. More on how below.

## Backtest via Falsification

Rip out the math and you will be left with a method. Call it Backtest-Gated Search. A specialist assembles an archive of past cases where the true outcome is already, provably known. They state one precise rule: a candidate approach is disqualified the moment it gets even one trusted historical case wrong. Only then does Claude, in code, generate many candidate models and mechanically kill every one that fails the backtest. Survivors get stress-tested by more code trying to break them. Code > prose.

What does this mean outside science? This needs zero math, and it is entirely code-centric — every step is generate, run, check. Code is hands. Prose is only allowed as a mediator between code executions, strictly factual, never persuasive.

## Low Hanging Fruit That I Shall Not Touch

Let us go over this one quickly and carefully, so I don't embarrass myself, but it is out there hanging too obvious, and I have to. An analogous problem comes from, no surprises, finance. It is, after all, exact math. 

Assume two stocks, both swinging about 2% a day on their own (variance 4 each). Hold an airline and an oil stock together and they move in opposite directions, since an oil spike hurts airline profits, so the combined risk isn't 4 + 4 = 8, it's 8 minus twice their covariance, landing around 3.2. Less than half. That gap between 8 and 3.2 is hedging. Flip the correlation (a second airline stock instead of an oil stock) and instead of subtracting you add, landing at 12.8 — same two stocks, same individual risk, now *four times the combined risk*, purely because they now move together, not in opposite directions.

Now picture two hundred positions instead of two. Instead of one covariance number, you get a table of them, one for every pair — airline against oil, airline against a second airline, oil against a bond, all of it. Each entry says the same thing the airline/oil pair did above: do these two move together, or apart. A negative entry is a real hedge, quietly cancelling risk. A positive one is risk compounding somewhere nobody's looking, because nobody looks at any single position and its neighbor at the same time.

With two hundred positions and only a few years of daily history, some entries in that table look like a real relationship purely by chance, the same way ten flips of a fair coin can land seven heads. Nothing wrong with the coin, just not enough flips. There's a known mathematical line that tells you how strong an entry has to be before it's more than a fluke.

Two hundred positions means roughly twenty thousand pairs, each one checked against that line. Claude can do this via code, in minutes. Push it to compute every entry, test each one, and hand back two lists: relationships strong enough to be real, and relationships you cannot tell apart from noise. That's a full audit of every assumed hedge in the book.

I'm not a quant, and I have no clue if this is exactly how a real risk desk would set it up. It is just a shift in technique I'm gesturing at. The point of this section: there are million dollar problems out there for specialists who can hold the problem in their head.

## But Now You

We can barely scratch the surface of this, but let me pick one industry, and try to walk the mental walk of how we can point frontier model at a truly hard problem, earn millions and become superhuman.

Let me try to tackle ecommerce, as one pick. We do not need anything else than access to frontier model and past data; and yes, data is gold here. Let us assume that the ecommerce company X is running promos and accumulates a growing set of already-run price/discount experiments where the real incremental lift is known: not "sales went up," which could be a hundred other things, but the actual, measured *extra revenue caused by the promo*, isolated by comparing a group that got it against a matched group that didn't.

You do two things here. First, you go through the pile of past promos and throw out the ones you can't trust — the one that ran during a stockout, the one where a competitor happened to run their own sale that same week, the one where the tracking broke halfway through. This cannot be skipped; otherwise the data is poisoned. Good news: this isn't you manually cherrypicking hundreds of old campaigns one by one. Claude writes the code that checks each one — cross-references the promo calendar for overlapping campaigns, flags weeks where stock ran out, checks the tracking logs for gaps. You're deciding what counts as disqualifying, and Claude writes and executes code as a rule against everything you've got. Imagine worst excel | SQL acrobatics imaginable, vaguely formulated - the ones you would never go and do for the mediocre chance of payoff, now merely gestured and implied, suddenly written and executed against reality by a superior IQ. Discussion and subsequent experimentation required between you and the model, of course.

Second, you write down one simple rule for what counts as a model being wrong. Take a real promo you already trust — say, a discount that actually brought in an extra $50k, as an illustration. Show a candidate model everything you knew *before* that promo ran, nothing after. If it guesses the promo lost you money, or guesses it made $2,000 instead of $50,000, that model is wrong, erased. 

Then you point Claude at it and push .. push to the MAX. It writes and runs a pile of different models, dozens if you let it — some betting price is the whole story, some weighting in seasonality, some looking at a completely different signal — each one only allowed to see data from before a given promo ran. Every model gets tested against every trusted promo you kept. Even one wrong, and that model is discarded. Whatever survives gets attacked on purpose next: a second pass of code trying to break it by starving it of data, removing a signal, or testing it on a promo you deliberately held back and never showed it. You're still the one in command through all of this, remember. You are the one who names which signals are even worth trying — weather, a competitor's price, day of the month — Claude just builds and tests whatever you name it, at a speed and volume you couldn't do by hand. Write/execute/assess. Code reading required, of course.

You're the specialist, and you're the final pass — and no, that's not this section shooting itself in the foot. It's exactly the shape of what happened at Anthropic. Claude's subagents didn't hand Jarred a finished proof and call it done; two of them wrote the paper, but Alpöge and Furman, real number theorists, still had to read it and certify it before anyone trusted it. The expensive computational search was never meant to replace the expert. It was meant to hand the expert one finished candidate to check, instead of a thousand raw promos to sift through by hand. 

This is the shift: 10x your cognitive power, not your expertise. Concretely, here: if the surviving model says the real driver is people buying the discounted item instead of something else in the same category, does that match your experience? Or did every trusted promo happen to land near payday, and the model quietly learned "payday," not "price," while still acing every backtest? Only someone who has run these promotions before thinks of that; has a chance at catching that. You go back and tell Claude to rebuild it, this time controlling for days-since-payday explicitly. 

The tests only catch a model that's wrong in a way you already thought to check for. Claude's zero zeta math proof has the exact same hole: a computer can confirm a proof is logically airtight, it cannot confirm the proof is about the right question. Same gap, every time, math or ecommerce.

Here's what we're actually doing: pointing at a model that predicts a promo's real revenue impact before you run it, built and stress-tested against your own company's historical experiments. That's the deliverable. A shift in what's now possible that I'm gesturing at, nothing more. The point of this section: there's a forecasting model sitting unbuilt in your data whatever it is, waiting for someone who can hold the problem in their head.

## Now Decompress Boy

![al-gaib](assets/hunt-for-highest-margin-problem/al-gaib.png)

----------------

## AI Psychosis

[^1]: My AI psychotic explanation of Riemann and Anthropic's tackle

>Editorial note: no surprises, there is an excellent video, which I watched to produce the bla bla below here [!3Blue1Brown](https://www.youtube.com/watch?v=sD0NjbwqlYw)

Riemann was obsessed with complex numbers — numbers that need two coordinates instead of one, a point on a page instead of a spot on a ruler. Take 1/2 to the power of (1+i):

$$\left(\frac{1}{2}\right)^{1+i} = \left(\frac{1}{2}\right)^{1} \cdot \left(\frac{1}{2}\right)^{i}$$

The first part is ordinary, just a half. The second part, the i exponent, doesn't make the number bigger or smaller at all — it rotates it. Whatever "i" is doing, it's spinning a point around a circle, same distance from center, every time.

![shrink and spin](/assets/hunt-for-highest-margin-problem/01-shrink-and-spin.png)

The zeta function is that formula — 1 + 1/2^s + 1/3^s + 1/4^s + ... forever — and every term is just a mark on the page. How far right it lands comes from the shrink. How far up or down comes from the spin, since spinning just moves you around that circle. Add up every term's mark, one whole number at a time, and wherever you end up is the function's output for that input. Change s and every mark shifts, so you land somewhere else entirely.

Now, what actually is a "zero" here? It's an input s where that entire walk — all those turns, all those shrinking steps, added up forever — cancels itself out exactly and brings you back to the very center of the page.

There are two kinds. The boring kind sits right on the ordinary number line, no spin at all, at -2, -4, -6, and so on forever. Fully understood, mathematicians set these aside and call them trivial.

Every other zero, infinitely many of them, has been proven to live inside one narrow vertical band on the page. Not scattered anywhere. Squeezed into one lane. The Riemann Hypothesis is the sharper claim sitting on top of that: not just "somewhere in the lane," but that every single one of them sits exactly on the one line running straight down its middle.

Why would that matter? Because each zero secretly controls a tiny wobble in how prime numbers are spaced out, and how far left or right that zero sits decides how big the wobble is. If every zero sits exactly on the one center line, every wobble is as small as it's allowed to be, and primes end up as randomly, evenly scattered as a fixed list of numbers can possibly be. If even one zero drifts off that line, its wobble gets bigger, and primes would show a real, visible clump or gap somewhere. That's the whole bet the Hypothesis makes: zero hidden structure in the primes, guaranteed, forever.

Nobody has proven or disproven this. It's been sitting there since 1859, and the Clay Mathematics Institute has a standing $1M bounty on it, because a lot of modern number theory relies on it.

![the critical line](/assets/hunt-for-highest-margin-problem/03-the-critical-line.png)

Anthropic didn't touch the Hypothesis itself. They went at a smaller, adjacent, still genuinely hard question: not "are all zeros on the line," but "what fraction of them can we actually prove are, so far." That number had crept from about a third up to 41.6% over fifty-odd years of work. Claude combined two previously separate papers and refused the old shortcut everyone before it had taken for convenience — kept every relationship between its building blocks instead of throwing them away — and pushed that proven fraction to 67.2%. The 26 percentage points from up above. Not the Hypothesis. A real, hard-won, machine-checked lower bound on how honest the universe of primes is forced to be. This is the model gives you wings moment, undeniably.
