# Part B: Domain Description

**Project:** Behind the Shelter Doors  
**Website:** https://vinceyuchen.github.io/animal-shelter-dv2/  
**Sketch PDF:** https://github.com/vinceyuchen/animal-shelter-dv2/blob/main/design/Behind_the_Shelter_Doors_Hand_Drawn_Sketch.pdf

## 1. Describe your domain chosen for DV II

My domain is **animal welfare in Australian shelters**, focusing on recorded outcomes for dogs and cats. Using RSPCA statistics, I compare live-release rates, caseloads and outcome patterns across jurisdictions and years. Separate Victorian foster-care and Townsville case studies provide context without being treated as nationwide totals.

## 2. Describe the Why and Who aspects of your DV II

**Why:** Adoption totals alone hide differences between rehoming, reunion with owners, transfer, euthanasia and ongoing care. A large caseload also does not necessarily imply poor outcomes. I want readers to compare **rates with counts**, identify species and regional differences, and interpret trends without assuming causation.

**Who:** The intended audience is an **average Malaysian reader** interested in animal welfare, such as a pet owner, potential adopter or shelter supporter. Australian records provide a clearly labelled comparative case study, not evidence about Malaysian shelters. Plain-language definitions, direct annotations and consistent colours support readers without statistical expertise.

## 3. Describe the “What” aspect of your DV II

The main data come from **RSPCA Australia Annual Statistics (2020–21 to 2024–25)**: dog/cat caseloads, recorded outcomes and euthanasia reasons. **Australian Bureau of Statistics** state/territory boundaries and **official RSPCA facility pages** provide spatial context, including 18 selected verified locations. Separate sources are **Animal Welfare Victoria's 2025 shelter and pound data** for foster-placement episodes at 12 selected reporting entities and **Townsville City Council's records (2021–2025)** for monthly adoption/reclaim averages at one centre.

Attributes are **categorical** (species, jurisdiction and outcome), **quantitative** (counts, shares and percentage changes), **temporal** (years and months) and **spatial** (boundaries and coordinates). I prepared chart-ready tables, grouped RSPCA Reclaimed and Returned as **Reunited**, and calculated relevant shares and changes using the documented denominators. The datasets describe different reporting populations; foster placements are episodes, and the selected facility points are not a complete census.

## 4. Describe the “How” aspect of your DV II

I organised **14 Vega/Vega-Lite charts** into four chapters: **Geography, Outcomes, Changes and Beyond the Shelter**. Three maps use different encodings for different tasks: a **choropleth** uses sequential colour for live-release *rates*; **proportional circles** use area for caseload *counts* on a consistent scale; and **points** identify selected facility locations.

**Connected dots** compare dog–cat rates on a common axis; **100% stacked bars** show outcome composition; **butterfly bars** contrast euthanasia-reason shares; and a **heatmap** supports jurisdiction-by-outcome comparisons. **Lines** show counts over time, whereas a **bump chart** displays ranks of annual change, not welfare quality. A custom **Sankey** uses ribbon width for aggregate species-to-outcome counts, not individual animal journeys. A **lollipop** supports precise foster-episode comparisons; a **treemap** uses the genuine reporting-entity → species hierarchy to reveal concentration; a **slopegraph** compares cat-share endpoints; and a **streamgraph** shows monthly patterns with annotated peaks.

Selectors, data-linked Key Findings and tooltips enable focused comparison. Direct labels preserve the main message without interaction. Dogs and cats retain fixed blue/orange category colours; quantitative rates use separate scales.

---

### Submission notes (do not paste into the four answer fields)

- **Campus assumption:** The Who paragraph is tailored to the **Malaysia campus**. Under the official assignment, Clayton students must instead target the **average Australian**. Confirm the campus before submitting.
- **Part B word limit:** The uploaded v1.2 brief specifies no general limit for these four answers; any restriction shown directly in Moodle takes priority.
- **Separate Moodle fields:** Supply the live GitHub Pages URL and the hand-drawn sketch PDF URL in the form's requested link fields.
- **AI acknowledgement:** Acknowledge generative-AI assistance in the appropriate submission field. Suggested wording: "Generative AI assisted with drafting, programming, debugging and design feedback. I reviewed the final work." Only use that wording if accurate.
