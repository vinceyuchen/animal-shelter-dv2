# Behind the Shelter Doors — FIT3179 Data Visualisation 2

**Live single-page visualisation:** https://vinceyuchen.github.io/animal-shelter-dv2/

**Original hand-drawn sketch (PDF):** https://github.com/vinceyuchen/animal-shelter-dv2/blob/main/design/Behind_the_Shelter_Doors_Hand_Drawn_Sketch.pdf

**Author:** Yu Chen (GitHub: [@vinceyuchen](https://github.com/vinceyuchen))  
**Project date:** 24 October 2026  
**Assigned topic:** Animal Shelter

## Domain, who, what, why and how

**Domain:** Animal welfare and animal shelter outcomes, with an Australian focus.

**Who:** A non-specialist Australian or Malaysian reader interested in companion-animal welfare, including pet owners, potential adopters and shelter supporters. Australian reporting scope is explicit; definitions, colour meanings and near-chart notes do not assume statistical experience.

**What:** Publicly reported RSPCA dog/cat outcomes and jurisdiction-level caseloads (2024–25), comparable historical RSPCA caseloads (2020–21 through 2024–25), reported Victorian shelter/pound foster-care placements (2025), a local Townsville monthly adoption/reclaim case study (2021–2025), ABS administrative geography and selected official RSPCA facility locations.

**Why:** To distinguish outcome *rates* from *volumes*, compare species' pathways through care, identify within-network geographic differences, show changes over time and make clear why unrelated reporting systems cannot be simply combined.

**How:** Fourteen Vega/Vega-Lite charts on a single scrolling GitHub Pages website, organised from geographic context to animal outcomes, changing caseloads, foster care and a local seasonality example. Static summaries and menu-linked key findings support presentation; tooltips and selectors offer limited exploration without hiding the story. Four short chapter transitions follow the original four-section hand-drawn planning sketch.

## Chart inventory and idiom rationale

| # | Idiom | Communication goal |
|---|---|---|
| 1 | Choropleth map | Compare RSPCA live-release percentages across jurisdictions |
| 2 | Proportional-symbol map | Show reported caseload magnitude independently of success rate |
| 3 | Point-location map | Locate selected verified RSPCA facilities, not intake or capacity |
| 4 | Connected dot plot | Compare dog and cat live-release rates within each jurisdiction |
| 5 | 100% stacked bars | Compare the composition of recorded outcome classifications |
| 6 | Diverging/butterfly bars | Compare within-species reasons for euthanasia |
| 7 | Annotated heatmap | Read state-by-outcome shares for dogs or cats |
| 8 | Multi-line time series | Compare annual dogs and cats recorded by an individual RSPCA society |
| 9 | Bump/rank chart | Compare rankings of jurisdiction-level year-on-year change |
| 10 | Sankey/alluvial chart | Compare counts flowing from aggregate species categories to recorded outcome classifications |
| 11 | Faceted lollipop plot | Compare reported foster placement episodes across 12 selected Victorian entities and species |
| 12 | Nested treemap (hierarchical area encoding) | Show foster placement concentration across the 12 selected Victorian reporting entities, subdivided into dogs and cats |
| 13 | Slopegraph | Compare the cat proportion of dog-and-cat reporting between two financial years |
| 14 | Streamgraph | Explore average monthly adoption/reclaim records for five complete years at one Townsville centre |

**Rubric advanced-idiom evidence:** The course-provided *Advanced idioms* list explicitly names **butterfly charts, connected dot plots, bump charts, heatmaps, lollipop charts, Sankey diagrams, slope charts, streamgraphs and treemaps**. These are implemented in Charts **4, 6, 7, 9, 10, 11, 12, 13 and 14** respectively (9 named advanced idioms). Charts 1–3 supply three distinct geographic map idioms in addition. The ordinary time-series line and 100% stacked bar are useful basic idioms, not claimed as advanced. The final marker assesses appropriateness, not chart names alone.

## Sources and scope

1. [RSPCA Australia Annual Statistics](https://www.rspca.org.au/about/annual-statistics/) — RSPCA reporting network, outcome categories, annual counts and euthanasia reasons.
2. [Australian Bureau of Statistics ASGS Edition 3](https://www.abs.gov.au/statistics/standards/australian-statistical-geography-standard-asgs/edition-3-july-2021-june-2026/access-and-downloads/digital-boundary-files) — mapping geometry and geographic context.
3. [RSPCA shelter and services directory](https://www.rspca.org.au/our-role/caring-for-animals/services-and-shelters/) and official jurisdiction webpages — selected verified facility locations.
4. [Animal Welfare Victoria, shelter and pound reporting](https://agriculture.vic.gov.au/livestock-and-animals/animal-welfare-victoria/domestic-animals-act/animal-fate-data-set) — recorded foster-care placement episodes, not unique animals.
5. [Townsville City Council, Animals Adopted and Reclaimed](https://data.gov.au/data/dataset/414d816a-f79c-45c7-af7f-46af1b923bdd) — mean monthly totals for one local care centre; the plotted series aggregate animal types, even though the broader published dataset contains more animal-type detail.

The RSPCA series does **not** describe all shelters or council pounds in Australia. RSPCA reporting coverage can differ by jurisdiction and year; NSW and NT are omitted from historical comparisons due to material coverage changes. Animal Welfare Victoria and Townsville observations must **not** be added to national RSPCA totals. 'Reunited' combines RSPCA Reclaimed and Returned records; 'In Care' is not a final exit outcome. A Sankey ribbon illustrates aggregate classifications, not the journeys of identifiable animals.

## Code, data and verification

- `index.html` — public single-page narrative, sections and source notes.
- `css/style.css` — typography, semantic colour keys, responsive layout.
- `js/embed.js` and `js/dv2-story-layout.js` — Vega-Embed, chart controls and data-driven notes.
- `charts/` — human-readable Vega and Vega-Lite specifications.
- `data/` — cleaned plot-ready datasets and geography.
- `scripts/dv2-browser-audit.mjs`, `.github/workflows/dv2-live-audit.yml` — automated live Chromium render and interaction checks.
- `scripts/dv2-semantic-encoding-audit.mjs` — automated cross-chart colour, proportional-area, text-contrast and chapter-sequence checks.

**AI acknowledgement:** Generative AI assisted with code, debugging, data preparation and writing. The author is responsible for checking source data, calculations, design decisions and interpretation. Submitted work must be original and properly attributed.

## October 2026 rubric improvements

- Chart 2 uses one fixed 0–15,000 animal area domain for all species selections, with matching reference-symbol diameters.
- Chart 7 uses neutral greyscale, dark numeric labels and minimum text contrast above 4.5:1, keeping percentage colours distinct from categories.
- Four chapter transitions reinforce the original sketch narrative: geography, outcomes, caseload changes and beyond-the-shelter care.
- Connected-dot and butterfly comparisons now identify two key differences directly on the plots, alongside their existing explanatory notes.
- The hand-drawn sketch documents preliminary planning, and its handwritten date and provisional conclusions may differ from corrected findings on the final page.

## Moodle Part B: assessed domain description

- **[Ready-to-copy answers for the four Moodle prompts](MOODLE_PART_B_READY.md)**: Domain; Why and Who; What; How. Includes the required website/sketch links, source attribution and AI acknowledgement.
- **[Detailed 14-chart Munzner Why–What–How rationale](SUBMISSION_DESCRIPTION.md)**: A chart-by-chart table of audience tasks, dataset attributes, marks/channels and reasons for each idiom. Intended to address DV1 feedback asking for more detail on **How**, and to prepare for the interview.
- The brief is for a **general reader** in the relevant national audience. This report uses Australian datasets; the project never implies its numerical findings describe Malaysian shelters.
