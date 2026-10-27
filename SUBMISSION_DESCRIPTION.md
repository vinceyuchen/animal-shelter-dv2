# FIT3179 Data Visualisation 2 — Submission Description

**Project title:** Behind the Shelter Doors  
**Public single-page visualisation:** https://vinceyuchen.github.io/animal-shelter-dv2/  
**GitHub repository:** https://github.com/vinceyuchen/animal-shelter-dv2  
**Sketch PDF URL:** [Add the URL to your own hand-drawn A4 sketch PDF after uploading it to GitHub.]  
**Author:** Vince / @vinceyuchen  
**Date:** 27 October 2026

## Domain, Why and Who

**Domain:** Animal welfare, shelter outcomes and foster care in Australia.

**Why:** A single adoption total or live-release rate cannot describe the experiences of dogs and cats across shelters. The visualisation examines how reported caseloads, outcomes, species differences and paths through care vary across jurisdictions and time. It distinguishes outcome percentages from recorded volumes and explains why changes in RSPCA coverage, contracts and recording practices limit comparisons.

**Who:** A general reader without prior knowledge of Australian animal shelter statistics. Familiar terms, descriptive questions, labels, explanatory annotations, consistent colour encoding, source notes and definitions aim to make these measures accessible without requiring statistical training.

## What: data and provenance

Five source groups contribute to the project, with three distinct reporting scopes. The statistics are not pooled into a single nationwide estimate.

1. **RSPCA Australia, Annual Statistics** (2020–21 through 2024–25). Species outcomes, reported dog and cat caseloads, live-release comparisons, reasons for euthanasia and historical changes in six consistently selected RSPCA jurisdictions. Source: https://www.rspca.org.au/about/annual-statistics/
2. **Australian Bureau of Statistics, ASGS Edition 3**. State and territory geography and boundaries, used for the maps. Source: https://www.abs.gov.au/statistics/standards/australian-statistical-geography-standard-asgs/edition-3-july-2021-june-2026/access-and-downloads/digital-boundary-files
3. **Official RSPCA shelter and service pages**. Verified addresses for selected RSPCA-operated facilities. The point map is not a census of all shelters. Source: https://www.rspca.org.au/our-role/caring-for-animals/services-and-shelters/
4. **Animal Welfare Victoria, 2025 Animal Fate Dataset**. Reported dog/cat foster-placement episodes for 12 selected high-volume Victorian reporting entities. These are placements rather than unique animals, and they are separate from RSPCA national reporting. Source: https://agriculture.vic.gov.au/livestock-and-animals/animal-welfare-victoria/domestic-animals-act/animal-fate-data-set
5. **Townsville City Council, Animals Adopted and Reclaimed**. Monthly counts averaged by calendar month across five complete years, 2021–2025, for one care centre. The source does not distinguish dogs and cats. Source: https://data.gov.au/data/dataset/414d816a-f79c-45c7-af7f-46af1b923bdd

**Preparation:** Published annual or entity-level records were reshaped into chart-ready tables and formatted for Vega-Lite. RSPCA `Reclaimed` and `Returned` were combined into a clearly labelled `Reunited` group, and percentages were calculated within the appropriate recorded outcome or species denominator. `In Care` remains an ongoing status, not a final exit outcome. NSW and NT were omitted from the five-year comparative RSPCA trends because reporting coverage changed substantially. Annual ranking plots use the year-on-year percentage change within the six selected jurisdictions. Foster records were restricted to the twelve selected leading reporting entities; no unique-animal total is claimed. Townsville seasonal values are arithmetic means of each calendar month over five complete years.

## How: idioms, marks, channels and interactions

The 14 charts form a single scrolling data story:

- **Geographic context (Charts 1–3):** A choropleth encodes live-release rate with a sequential colour scale; proportional symbols encode reported animal volume through circle area; a point-location map shows selected facility sites. These three different map idioms answer different questions rather than reusing geography decoratively.
- **Species outcomes (Charts 4–7):** Connected dots show within-jurisdiction dog/cat differences; 100% stacked bars compare the composition of recorded outcomes; a butterfly plot puts species-specific euthanasia reasons on opposing sides; an annotated heatmap crosses jurisdiction with six outcome classifications and allows a Dogs/Cats selection.
- **Change and pathways (Charts 8–10):** A two-species line chart shows five annual observations per jurisdiction; a bump chart uses vertical position for the changing year-on-year rank, not welfare performance; a Sankey uses ribbon width to encode aggregate counts from species to outcome category, not individual journeys.
- **Foster care and timing (Charts 11–14):** A faceted lollipop compares placement episodes for the same twelve Victorian reporting entities. A nested treemap instead makes concentration visible with area, subdivided into dog/cat episodes. A slopegraph connects the 2020–21 and 2024–25 percentage of reported cases that were cats. A Townsville streamgraph provides one explicitly local seasonality example rather than a national conclusion.

**Interaction and design:** Species, jurisdiction and outcome controls are placed near the charts they affect. Key Findings update with the selected data in Charts 7–9. Tooltips provide precise values while headings, callouts and direct labels communicate the main interpretation without interaction. Dog/cat, jurisdiction and outcome colour meanings are kept consistent; quantitative map scales use separate sequential encodings. Fraunces headings, Helvetica labels and a restrained white-space system establish reading hierarchy. Source, denominator and limitation notes are located near the evidence.

## Limitations, authorship and AI acknowledgement

RSPCA reports describe the participating RSPCA reporting network, not all Australian shelters or pounds. Comparisons between jurisdictions and years may reflect different coverage, policies and contracts. Victoria counts placement episodes, potentially including more than one episode for an animal. Townsville is a single-centre case study. These sources must not be summed or treated as a nationally representative shelter total.

All diagrams and maps in the web page are implemented with Vega or Vega-Lite and are stored as human-readable specifications in the GitHub repository. Data-driven metrics have been cross-checked across charts, and the public page has passed Chromium render checks at desktop and small-laptop widths. Generative AI assisted with drafting text and code, debugging, data preparation and visualisation feedback. The author remains responsible for checking original sources, calculations, attribution, interpretation and final design choices.

**Reminder:** This document is a drafting aid for the Moodle submission template, not a replacement for the required hand-drawn sketch PDF, interview, or any submission fields.
