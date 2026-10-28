# FIT3179 Data Visualisation 2 — Submission Description

**Project title:** Behind the Shelter Doors  
**Public single-page visualisation:** https://vinceyuchen.github.io/animal-shelter-dv2/  
**GitHub repository:** https://github.com/vinceyuchen/animal-shelter-dv2  
**Sketch PDF URL:** https://github.com/vinceyuchen/animal-shelter-dv2/blob/main/design/Behind_the_Shelter_Doors_Hand_Drawn_Sketch.pdf  
**Author:** Yu Chen (GitHub: @vinceyuchen)  
**Original project date:** 24 October 2026 (subsequent code refinements documented in GitHub commits)

## Domain, Why and Who

**Domain:** Animal welfare, shelter outcomes and foster care in Australia.

**Why:** A single adoption total or live-release rate cannot describe the experiences of dogs and cats across shelters. The visualisation examines how reported caseloads, outcomes, species differences and paths through care vary across jurisdictions and time. It distinguishes outcome percentages from recorded volumes and explains why changes in RSPCA coverage, contracts and recording practices limit comparisons.

**Who:** A non-specialist Australian or Malaysian reader interested in companion-animal welfare, including pet owners, prospective adopters and shelter supporters. For Australians the observations describe a familiar shelter network; for Malaysians, adoption, reunification and foster care are relevant comparison questions, although the Australian rates cannot be transferred to Malaysian shelters. Plain-language labels, definitions, stable category colours and source notes support readers without statistical training.

## What: data and provenance

Five source groups contribute to the project, with three distinct reporting scopes. The statistics are not pooled into a single nationwide estimate.

1. **RSPCA Australia, Annual Statistics** (2020–21 through 2024–25). Species outcomes, reported dog and cat caseloads, live-release comparisons, reasons for euthanasia and historical changes in six consistently selected RSPCA jurisdictions. Source: https://www.rspca.org.au/about/annual-statistics/
2. **Australian Bureau of Statistics, ASGS Edition 3**. State and territory geography and boundaries, used for the maps. Source: https://www.abs.gov.au/statistics/standards/australian-statistical-geography-standard-asgs/edition-3-july-2021-june-2026/access-and-downloads/digital-boundary-files
3. **Official RSPCA shelter and service pages**. Verified addresses for selected RSPCA-operated facilities. The point map is not a census of all shelters. Source: https://www.rspca.org.au/our-role/caring-for-animals/services-and-shelters/
4. **Animal Welfare Victoria, 2025 Animal Fate Dataset**. Reported dog/cat foster-placement episodes for 12 selected high-volume Victorian reporting entities. These are placements rather than unique animals, and they are separate from RSPCA national reporting. Source: https://agriculture.vic.gov.au/livestock-and-animals/animal-welfare-victoria/domestic-animals-act/animal-fate-data-set
5. **Townsville City Council, Animals Adopted and Reclaimed**. Monthly counts averaged by calendar month across five complete years, 2021–2025, for one care centre. The two monthly series plotted here aggregate animal types; the published source metadata also describes adoption data by animal type, so no claim is made that the source itself lacks all species detail. Source: https://data.gov.au/data/dataset/414d816a-f79c-45c7-af7f-46af1b923bdd

**Preparation:** Published annual or entity-level records were reshaped into chart-ready tables and formatted for Vega-Lite. RSPCA `Reclaimed` and `Returned` were combined into a clearly labelled `Reunited` group, and percentages were calculated within the appropriate recorded outcome or species denominator. `In Care` remains an ongoing status, not a final exit outcome. NSW and NT were omitted from the five-year comparative RSPCA trends because reporting coverage changed substantially. Annual ranking plots use the year-on-year percentage change within the six selected jurisdictions. Foster records were restricted to the twelve selected leading reporting entities; no unique-animal total is claimed. Townsville seasonal values are arithmetic means of each calendar month over five complete years.

## How: idioms, marks, channels and interactions

The 14 charts form a single scrolling data story:

- **Geographic context (Charts 1–3):** A choropleth encodes live-release rate with a sequential colour scale; proportional symbols encode reported animal volume through circle area; a point-location map shows selected facility sites. These three different map idioms answer different questions rather than reusing geography decoratively.
- **Species outcomes (Charts 4–7):** Connected dots show within-jurisdiction dog/cat differences; 100% stacked bars compare the composition of recorded outcomes; a butterfly plot puts species-specific euthanasia reasons on opposing sides; an annotated heatmap crosses jurisdiction with six outcome classifications and allows a Dogs/Cats selection.
- **Change and pathways (Charts 8–10):** A two-species line chart shows five annual observations per jurisdiction; a bump chart uses vertical position for the changing year-on-year rank, not welfare performance; a Sankey uses ribbon width to encode aggregate counts from species to outcome category, not individual journeys.
- **Foster care and timing (Charts 11–14):** A faceted lollipop compares placement episodes for the same twelve Victorian reporting entities. A nested treemap instead makes concentration visible with area, subdivided into dog/cat episodes. A slopegraph connects the 2020–21 and 2024–25 percentage of reported cases that were cats. A Townsville streamgraph provides one explicitly local seasonality example rather than a national conclusion.

**Why these visual encodings:** The choropleth assigns colour to a *rate*, whereas the proportional-symbol map assigns circle *area* to animal counts, so a high count is not mistaken for a high live-release rate. Connected dots prioritise differences between two species within the same jurisdiction; the butterfly chart uses a common centre to compare opposing species shares. The treemap uses a genuine two-level hierarchy (reporting entity → species) to show concentration, while the lollipop chart is better for reading exact placement differences. The heatmap has an explicitly quantitative legend, and the two separately sourced case studies are not presented as nationwide results.

**Interaction and design:** Species, jurisdiction and outcome controls are placed near the charts they affect. Key Findings update with the selected data in Charts 7–9. Tooltips provide precise values while headings, callouts and direct labels communicate the main interpretation without interaction. Dog/cat, jurisdiction and outcome colour meanings are kept consistent; quantitative map scales use separate sequential encodings. Fraunces headings, Helvetica labels and a restrained white-space system establish reading hierarchy. Source, denominator and limitation notes are located near the evidence.


### Why–What–How justification for every chart

| # | Why: audience task | What: data being compared | How: meaningful marks and channels |
|---|---|---|---|
| 1 Choropleth | Compare state-level *rates* | RSPCA dog/cat live-release share, 2024–25 | Geographic **area** plus a sequential **lightness** ramp compares rates, without reusing dog/cat identity colours. |
| 2 Proportional symbols | Find large reported *caseloads* | Jurisdiction and dog/cat counts | **Circle area**, fixed across selector choices, conveys magnitude without implying welfare performance. |
| 3 Point-location map | Locate verified example facilities | Eighteen selected site coordinates/types | Geographic **position** shows locations; sample size disclaimer prevents interpreting gaps as lack of shelters. |
| 4 Connected dot | Compare species gaps within each jurisdiction | Paired dog/cat live-release rates | Two **positions** on one rate axis plus a connector reveal magnitude and direction of the gap. |
| 5 100% stacked bars | Compare outcome *composition* | Species × six recorded outcome categories | **Segment length** expresses within-species percentages, independent of raw caseload totals. |
| 6 Butterfly | Contrast euthanasia-reason profiles | Species × euthanasia-reason shares | Opposing **bar lengths** around a shared centre reveal asymmetric distributions; values remain positive. |
| 7 Heatmap | Find high/low state–outcome combinations | State × outcome × selected species × rate | **Grid positions** identify categorical pairs; neutral quantitative **lightness** and labels encode rate. |
| 8 Line | Trace reported changes over time | 2020–21 to 2024–25 dog/cat caseloads | **Horizontal time position** and two species lines show trends without conflating sources. |
| 9 Bump | Compare annual change *ranks* | Six jurisdictions' year-on-year percentage change | **Vertical position** represents ranks; coloured/dashed paths and endpoint labels track jurisdictions. Rank is not welfare quality. |
| 10 Sankey | Compare aggregate species-to-outcome counts | Dogs/Cats × recorded categories × totals | **Ribbon thickness** encodes aggregate count, not paths followed by identifiable animals. |
| 11 Faceted lollipop | Compare foster episodes precisely | Twelve selected Victorian entities × species | **Dot position** on a shared number axis supports precise comparison; species facets reduce overlap. |
| 12 Nested treemap | See concentration in a true hierarchy | Reporting entity → species → foster episodes | **Nested rectangular area** expresses part-to-whole concentration; this is a real hierarchy, not arbitrary treemap grouping. |
| 13 Slopegraph | Compare cat shares at two endpoints | Six selected jurisdictions, 2020–21 vs 2024–25 | Two aligned **positions** and connecting slopes make direction of proportional change visible. |
| 14 Streamgraph | See local monthly patterns and peak timing | Townsville Adopted/Reclaimed monthly means | **Band thickness** conveys counts; distinct local-series colours and calculated peak labels support comparison. One-centre scope is explicit. |

**Custom features and trade-offs:** An original Vega Sankey uses data-derived aggregate ribbon geometry. Chart 7–9 summaries are linked to their actual selector states; the Maps 1–2 blue/orange cue separates chosen species from quantitative shading. Tooltips, direct annotations, concise source notes and narrow-screen chart-local scrolling support non-experts without replacing the main scrolling narrative. Some marks prioritise patterns rather than exact values, so labels/tooltips supply precision.

**Source-scope caution:** RSPCA reports do not cover every shelter in Australia; the Victoria entity totals include placement episodes and may cover multiple local council service areas; the Townsville series aggregates animal types for this chart. These measures must not be pooled or used for causal claims.

## Limitations, authorship and AI acknowledgement

RSPCA reports describe the participating RSPCA reporting network, not all Australian shelters or pounds. Comparisons between jurisdictions and years may reflect different coverage, policies and contracts. Victoria counts placement episodes, potentially including more than one episode for an animal. Townsville is a single-centre case study. These sources must not be summed or treated as a nationally representative shelter total.

All diagrams and maps in the web page are implemented with Vega or Vega-Lite and are stored as human-readable specifications in the GitHub repository. Data-driven metrics have been cross-checked across charts, and the public page has passed Chromium render checks at desktop and small-laptop widths. Generative AI assisted with drafting text and code, debugging, data preparation and visualisation feedback. The author remains responsible for checking original sources, calculations, attribution, interpretation and final design choices.

**Reminder:** Use the concise `MOODLE_PART_B_READY.md` for the four Moodle text prompts. This detailed version supports the interview and design rationale; it is not a substitute for the sketch or other submission fields.

## Planning sketch and final visualisation

The original A4 sketch contains four hand-drawn sections (Geography, Outcomes, Changes, Beyond) and fourteen chart thumbnails. The final website preserves this four-part, fourteen-chart plan. As a **planning document**, the sketch also contains provisional annotations, including an old handwritten date and a preliminary generalisation about cat outcomes. The final narrative supersedes those provisional statements: the 2024–25 RSPCA data show cats had a higher **rehomed share** of recorded outcomes than dogs, and euthanasia outcomes differ by reporting jurisdiction. These are observed associations, not causal conclusions.

The final website also differentiates the separate Victorian foster-placement records and Townsville seasonality case study from national RSPCA reporting; these sources are not summed together.
