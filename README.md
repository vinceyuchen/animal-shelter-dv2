# Behind the Shelter Doors — FIT3179 Data Visualisation 2

**Live single-page visualisation:** https://vinceyuchen.github.io/animal-shelter-dv2/

**Author:** Vince (GitHub: [@vinceyuchen](https://github.com/vinceyuchen))  
**Updated:** 27 October 2026  
**Assigned topic:** Animal Shelter

## Domain, who, what, why and how

**Domain:** Animal welfare and animal shelter outcomes, with an Australian focus.

**Who:** General readers, including Australian and Malaysian audiences who may not know shelter reporting terminology. Each chart explains its denominator and limitations in plain language.

**What:** Publicly reported RSPCA dog/cat outcomes and jurisdiction-level caseloads (2024–25), comparable historical RSPCA caseloads (2020–21 through 2024–25), reported Victorian shelter/pound foster-care placements (2025), a local Townsville monthly adoption/reclaim case study (2021–2025), ABS administrative geography and selected official RSPCA facility locations.

**Why:** To distinguish outcome *rates* from *volumes*, compare species' pathways through care, identify within-network geographic differences, show changes over time and make clear why unrelated reporting systems cannot be simply combined.

**How:** Thirteen Vega/Vega-Lite charts on a single scrolling GitHub Pages website, organised from geographic context to animal outcomes, changing caseloads, foster care and a local seasonality example. Static summaries and menu-linked key findings support presentation; tooltips and selectors offer limited exploration without hiding the story.

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
| 12 | Slopegraph | Compare the cat proportion of dog-and-cat reporting between two financial years |
| 13 | Streamgraph | Explore mean monthly adopted/reclaimed records over five complete years for one Townsville centre |

**Marking caution:** A chart's label does not alone establish that it is an 'advanced idiom'. In particular, bars, dot plots and ordinary line charts remain basic under the published rubric. Complex idioms must be used meaningfully, not merely counted.

## Sources and scope

1. [RSPCA Australia Annual Statistics](https://www.rspca.org.au/about/annual-statistics/) — RSPCA reporting network, outcome categories, annual counts and euthanasia reasons.
2. [Australian Bureau of Statistics ASGS Edition 3](https://www.abs.gov.au/statistics/standards/australian-statistical-geography-standard-asgs/edition-3-july-2021-june-2026/access-and-downloads/digital-boundary-files) — mapping geometry and geographic context.
3. [RSPCA shelter and services directory](https://www.rspca.org.au/our-role/caring-for-animals/services-and-shelters/) and official jurisdiction webpages — selected verified facility locations.
4. [Animal Welfare Victoria, shelter and pound reporting](https://agriculture.vic.gov.au/livestock-and-animals/animal-welfare-victoria/domestic-animals-act/animal-fate-data-set) — recorded foster-care placement episodes, not unique animals.
5. [Townsville City Council, Animals Adopted and Reclaimed](https://data.gov.au/data/dataset/414d816a-f79c-45c7-af7f-46af1b923bdd) — mean monthly totals for one local care centre, without a dog/cat split.

The RSPCA series does **not** describe all shelters or council pounds in Australia. RSPCA reporting coverage can differ by jurisdiction and year; NSW and NT are omitted from historical comparisons due to material coverage changes. Animal Welfare Victoria and Townsville observations must **not** be added to national RSPCA totals. 'Reunited' combines RSPCA Reclaimed and Returned records; 'In Care' is not a final exit outcome. A Sankey ribbon illustrates aggregate classifications, not the journeys of identifiable animals.

## Code, data and verification

- `index.html` — public single-page narrative, sections and source notes.
- `css/style.css` — typography, semantic colour keys, responsive layout.
- `js/embed.js` and `js/dv2-story-layout.js` — Vega-Embed, chart controls and data-driven notes.
- `charts/` — human-readable Vega and Vega-Lite specifications.
- `data/` — cleaned plot-ready datasets and geography.
- `scripts/dv2-browser-audit.mjs`, `.github/workflows/dv2-live-audit.yml` — automated live Chromium render and interaction checks.

**AI acknowledgement:** Generative AI assisted with code, debugging, data preparation and writing. The author is responsible for checking source data, calculations, design decisions and interpretation. Submitted work must be original and properly attributed.
