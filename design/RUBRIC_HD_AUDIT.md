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

## Round 2, final close-up review

- Choropleth: dynamic labels show the reported live-release rates for WA and Tasmania, sourced from map data and updated when the species selector changes.
- Location map: two unobtrusive in-chart labels state that the 18 facilities are selected verified examples, **not** the full RSPCA facility population.
- Townsville streamgraph: two in-band peak labels calculate their months and averages via a grouped maximum (Reclaims: May 84.4; Adoptions: December 100.4).
- Live browser regression checks verify that the labels are visible and that switching to Cats updates the choropleth numbers.
- No numeric records, category palettes, or existing legend definitions were changed. Inspect both laptop and desktop screenshots before claiming the aesthetic is finished.

## Round 3: Layout, colour and figure–ground (3%)

- **Implemented:** editorial teal decoration changed to neutral slate tokens so decorative UI is not mistaken for the green Rehomed encoding.
- **Implemented:** matching jurisdiction-specific dash patterns for lines in the bump and slope charts. No data, categorical hex colours, or quantitative colour scales changed.
- **Implemented:** callout borders, source-note separators, and figure/insight spacing standardised without removing chart context.
- **Verification:** the CI semantic audit checks state palette/pattern correspondence. The Chromium visual audit checks body/card background, insight border colour and left-edge chart/heading alignment at both 1440px and 1024px.
- **Residual risk:** an HD judgement on perceived colour differentiation, responsive readability and aesthetics is not replaceable by automated tests. The teacher's exact score remains unknown.

## Round 3 link contrast follow-up

- Source links in chart notes use neutral slate `#315A6A` with an underline. Against white, this text has approximately 7.5:1 contrast, stays recognisable as a link, and avoids using saturated browser blue that competes with categorical blue marks.
- This resolves only a visible hierarchy detail, not the remaining judgement-based colour-semantic and visual-balance risks.

## Round 3 closeout: separate Townsville colours and balance insight rails

- Chart 14 uses unique plum and umber colours for local Adopted and Reclaimed, without reusing the RSPCA network's categorical palette. The series, legend, tooltips, underlying values and peak labels retain their original meaning and data.
- On wide screens, each of the five Key Finding panels is vertically centred beside its corresponding chart; smaller screens retain stacked reading order.
- CI checks ensure the colour values are exclusive and browser tests check the live palette and wide-screen balance.
- **Not guaranteed 3/3:** an assessor can still interpret aesthetic decisions differently, and typography and source-definition precision are separate rubric considerations.

## Round 4: Typography (2%)

- **Evidence-based issue:** a fixed 990px Sankey SVG is downscaled at 1024px, making its 13px outcome counts approximately 11.5 rendered pixels. Raised source labels to 17px, outcomes to 16px, counts to 16px and compact headers to 13px in Vega.
- **Foster-care lollipop:** increased entity and numeric axis labels to 13px and species facet headers to 17px, preserving both data channels and meaningful order.
- **Treemap:** raised entity labels from 12px to 14px and used clean high-contrast dark ink against the fixed orange categorical fill, without distracting outlines; increased legend labels.
- **Page typography:** retained Fraunces for display and Helvetica for data/body, improved 14px chart-source text line height and the 12px Key Finding kicker, retaining ~53ch narrative lines.
- **Live verification:** browser audit now checks computed font stacks and rendered SVG effective pixel sizes at both 1440px and 1024px, saves new `laptop-chart-10/11/12.png` screenshots and fails on undersized or missing labels.
- **Remaining work:** visually inspect the newly rendered desktop and 1024px images for overlap or overfull labels before treating the 2% criterion as HD-competitive.

**Visual follow-up:** The first Treemap revision's white text outline introduced distracting chromatic edging in screenshots. Replaced it with 14px dark ink `#0A1920` on orange, no outline; the text-to-orange contrast exceeds 4.5:1. This keeps labels readable without creating edge artefacts.

## Post-round colour-semantics audit: map selections vs encoded fields

- Verified all fourteen Vega/Vega-Lite specifications. The categorical identity mapping for Dogs and Cats is already consistent wherever species is encoded directly, while Chart 1's purple is a numeric live-release-rate gradient and Chart 2's neutral circles encode total recorded caseload with area.
- However, these two selector-driven maps lacked a clearly visible species identity cue. Added blue/orange synced dots and explicit on-chart explanations, without changing any quantitative map value, colour ramp or circle area.
- Added strict mapping-aware tests for every species domain, Sankey source nodes, and both map encoding fields; a previous substring-only audit would not detect wrong category assignments.
- Review browser snapshots and selector interactions before closing this risk.

## Round 4 follow-up: effective typography and legend economy

- **Chart 10:** Increase both Sankey column headers to 15 Vega pixels, with live verification requiring at least 13 *rendered* pixels at 1024px.
- **Chart 7:** 13px bold state/outcome tick labels, 12px normal-weight cell percentages and 13px legend title. This supports scanning 48 cells without making all 48 numbers bold.
- **Charts 1–2:** Keep the canonical blue/orange active species cue but remove lengthy repeated colour explanations. The map's quantitative legend is the sole explanation of the purple rate or neutral count/area encoding.
- **Constraints unchanged:** 14 charts, data records, computed rates, category-to-hex mappings, canonical fonts and four-act narrative.
- **Residual:** inspect the latest actual screenshots for clipping, visual congestion and loading the correct asset version before asserting HD confidence.

## Round 4: 768px and 390px typography stress test (28 October 2026)

- **Before:** On a 390px viewport, Chart 10 Sankey's column heading and numeric labels shrank to roughly 4.8px and 5.1px. Chart 7's 48 percentage labels overlapped; maps collapsed to small geographical silhouettes. The original 1440/1024 tests did not detect these failures.
- **Fixed:** Sankey uses its original intrinsic SVG width and an internal swipe region at <=850px; 390px/768px tests measure heading **16.43px**, count **17.53px**. The foster lollipop remains internally scrollable at **13px** entity text.
- **Fixed:** Heatmap uses a wide chart region rather than squeezing six outcome columns. Maps are recompiled with 850px plot widths and native text sizes instead of enlarging a compressed tiny SVG; text and geography now scale together.
- **Interaction:** Five mobile chart-swipe hints cover Maps 1–2, Heatmap 7, Sankey 10 and Foster 11. Whole-page horizontal scrolling remains absent.
- **Evidence:** `scripts/dv2-mobile-type-audit.mjs` runs Chromium at **768px and 390px** and checks all 14 charts, no page-level overflow, dedicated scroll areas and actual text sizes. It saves 8 chart-level screenshots alongside the existing desktop/laptop artifacts. The final strict browser audit is [GitHub Actions run 40673205199](https://github.com/vinceyuchen/animal-shelter-dv2/actions/runs/40673205199).
- **Scope:** The 1024px small-laptop layout keeps the full-chart presentation without internal scroll, preserving the assignment's desktop reading experience. Narrow-screen swipe is an accessibility enhancement, not a replacement for the main data visualisation.
- **Limit:** Browser checks cannot guarantee 2/2 from the grader; they confirm specifically tested fonts, visibility, no page overflow and the reported chart interactions.

## Round 5: Domain / Who / What / Why / How (2%)

- **Rubric basis:** HD requires these five parts to be described appropriately and succinctly. DV1 feedback specifically advised adding details to **How**; the previous report was at Distinction.
- **Changed:** Added `MOODLE_PART_B_READY.md`, structured exactly around the four template questions, with one-sentence Domain, task-specific Why, defined general-audience Who, publisher/year/attribute-level What, and explicit mark/channel/task How. The long `SUBMISSION_DESCRIPTION.md` now documents all 14 charts in a Munzner Why–What–How table, including genuine hierarchy, outcome denominators and Sankey non-journey caveat.
- **Scope precision:** Confirmed RSPCA annual 2024–25 statistics and 2020–21–2023–24 historical archive; Animal Welfare Victoria publishes calendar 2025 shelter/pound reporting, sometimes from entities serving more than one council. The ABS 2021 geography is used consistently for context; it is not claimed as the latest statistical outcomes dataset. Official Townsville dataset metadata mention adoption data by animal type: we corrected website prose to say **the two plotted summary series aggregate species**, not falsely that the full source lacks animal-type data.
- **Who and task:** The intended non-specialist Australian or Malaysian reader is explicitly defined. The "Why" is to compare species and jurisdictions, distinguish rates from volumes and notice temporal change, not infer causal explanations or rank shelter effectiveness.
- **Evidence alignment:** Four chapter sections, 14 source specifications, menus, data-dependent Chart 7–9 Key Findings, custom Vega Sankey and separate RSPCA/Victoria/Townsville scopes have all been matched against the documentation.
- **Remaining risk:** The assigned campus-specific national audience, final Moodle word limits and whether the text was uploaded in the required Moodle fields must be verified from the user's submission context. Documentation and GitHub changes alone do not confirm Moodle submission or guarantee 2/2.
