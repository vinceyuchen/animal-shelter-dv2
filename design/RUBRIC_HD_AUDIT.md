# FIT3179 DV2: Rubric-led HD audit

**Purpose:** Track defensible evidence and unresolved loss-of-mark risks against the official v1.2 rubric. A successful build is not proof of full marks. The assessor determines the final mark.

## 1. Idioms and complexity (8%)

- **Evidence:** Fourteen on-page charts, three different map idioms and nine specifically named non-map advanced idioms: connected dot, butterfly, heatmap, bump, Sankey, lollipop, treemap, slope and streamgraph.
- **Confirmed visual-encoding fixes:** Chart 2 uses an invariant symbol-area scale across the species selector; Chart 6 positions bars with signed values but labels both sides with positive percentages; both highlighted reasons have legible labels; Chart 7 percentage fills use neutral quantitative greys rather than a categorical outcome colour.
- **Confirmed design refinements:** Chart 9 directly labels all six jurisdiction endpoints, Chart 11 uses larger entity labels and expanded facet widths.
- **Unresolved assessor-sensitive issues:** Chart 3 is an intentionally non-exhaustive location sample (avoid drawing density or welfare-performance conclusions); the two-series streamgraph makes exact values less intuitive than a baseline chart; small-laptop readability of dense Sankey/lollipop charts needs continued visual inspection.
- **Verification:** `scripts/dv2-data-integrity.mjs`, `scripts/dv2-semantic-encoding-audit.mjs` and `scripts/dv2-browser-audit.mjs`. CI now compares the actual published chart assets with the repository commit before marking the run successful.
- **Status:** Meets the explicit numerical HD gates; effectiveness and appropriateness remain subject to assessor judgement. Do **not** record this as an assured 8/8.

## 2. Storytelling, annotation, grammar, style (5%)

- Four-part progression maps to the original hand-drawn sketch: Geography → Outcomes → Changes → Beyond.
- Many charts have near-chart scope notes; Charts 4, 6, 8, 9 and 13 highlight selected observations. Interactive summaries update alongside some selectors.
- Remaining focus: reduce repeated headings/explanations, check every internal annotation visually, and distinguish within-network variation from conclusions about all Australian shelters.

## 3. Layout, colour and figure–ground (3%)

- Consistent white chart cards, restrained page background, aligned long-form sections, semantic species/outcome palettes and separate numeric gradients.
- Remaining focus: tune density/whitespace at 1024px and examine places where jurisdiction hues visually resemble species/outcome hues.

## 4. Typography (2%)

- Fraunces for editorial headings; Helvetica for body and chart text, with shorter narrative line measures, line heights and alignment rules.
- Remaining focus: verify **rendered** type, not just JSON fontSize; inspect Sankey, lollipop and long source notes at small-laptop width.

## 5. Domain / Who / What / Why / How (2%)

- Submission description distinguishes RSPCA reporting, Victorian foster placements and Townsville records, and provides idiom rationale.
- Remaining focus: a succinct final Moodle response and a consistent statement of target readers.

## 6. Sketch (2%)

- Original non-digital sketch PDF is published at `design/Behind_the_Shelter_Doors_Hand_Drawn_Sketch.pdf`. Four hand-drawn sections and fourteen initial idiom ideas appear.
- The sketch is a planning artifact. Provisional wording and dates must not be mistaken for final verified outcomes.

## 7. Interview (3%)

- Requires independent explanation of denominators, visual encodings, chosen idioms, interactions, reporting limitations and data provenance. Code cannot establish the interview result.

## No fabricated certainty

- The automated data script cross-checks processed charts. It is **not** an independent verification of every original data source.
- Browser tests confirm rendering, selected interactions, size/asset consistency and absence of certain errors. They are **not** substitutes for human readability or editorial review.
- No category is labelled `100% achieved` before all relevant rubric evidence has been reviewed.

## Round 2: Storytelling, annotations, grammar and style (5%)

- Rewrote Chapters 4–6 to describe **observed group rates and classified reasons**, not individual animal probabilities or causes for species differences. The butterfly chart cannot establish why one species has a greater behavioural/medical share.
- Defined `pp` as percentage points at the first dog–cat comparison.
- Streamlined the Chart 9 transition from annual totals to ranks, with a short reading hint instead of repeating the same ranking caveat.
- Reworded Chart 10 as **aggregate recorded categories**, not a trace of individual animal journeys, and corrected conclusion wording accordingly.
- Simplified the Chart 13 and Chart 14 questions for general readers. Scoped Townsville's averages to one centre and an unsegmented source.
- Added a browser regression test checking whether Chart 8 (jurisdiction) and Chart 9 (species metric) sidebar findings change with the selector.
- **Remaining review:** perform human visual inspection of all callouts and graphics; do not claim a 5/5 until the final rendered version is confirmed accessible, engaging and coherent.
