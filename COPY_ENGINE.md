# Drape Digital — Copy Engine v1
## Local-trade web copy that doesn't read as AI

### 0. Read this first (the honest part)
AI detectors (GPTZero, Originality.ai, Copyleaks) are statistically unreliable and Google does not use them. Google's stated position is that it rewards helpful content regardless of how it was produced, and penalises content produced at scale primarily to manipulate rankings.

Passing a detector is a vanity metric. Sounding like the owner of the business is the actual goal, and it happens to also beat the detectors.

### 1. The Rhythm Rules (The Mechanical Fix)
LLM copy sounds like LLM copy because of the rhythm. It writes perfectly balanced sentences of identical length, grouped into perfectly balanced paragraphs.

Before you write any copy for a Drape Digital client site, apply these structural constraints to your output:

- **11-word average sentence length:** Real tradesmen write short. LLMs average 18-24 words. Force the output to be punchy.
- **1 to 3 sentences per paragraph:** No wall-of-text. If a paragraph hits 4 sentences, break it.
- **Fragments are fine:** "Twenty minutes." "No call-out fee." Use them.
- **The 1-adjective limit:** Never stack adjectives. "Fast, reliable, professional service" is banned. Pick one.
- **Zero fluff adverbs:** Remove "seamlessly," "effortlessly," "expertly," "truly."
- **Active verbs only:** "We fix locks" not "Lock fixing services are provided."

### 2. The Vocabulary Ban List
Never use these words on a trade site. They are instant markers of templated/AI copy:
- Elevate
- Unlock (unless literally unlocking a door)
- Seamless
- Premier
- Top-notch
- State-of-the-art
- Solutions
- Journey
- Leverage
- Comprehensive
- Tailored

### 3. Concessions (The Trust Trigger)
Sales copy that only lists positives sounds fake. Real business owners talk about what they *don't* do, or what might go wrong. Include one concession per page.
Examples:
- "We don't do automotive transponder keys for German cars."
- "If we can't pick it, we'll have to drill it. We'll always tell you the cost before we do."
- "If you're outside the M25, we're not your cheapest option."

### 4. Specificity beats Adjectives
Don't say "fast response." Say "25 minutes in Central, 40 minutes outer suburbs."
Don't say "affordable." Say "$65 call-out fee, applied to the job."
Don't say "experienced." Say "We've drilled 400 of these specific deadbolts."

### 5. Implementation
When generating content for `tradeData.ts` or blog posts, prepend these rules to your prompt.
