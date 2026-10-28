# Part B: Domain Description (Moodle-ready)

**Project:** Behind the Shelter Doors  
**Live visualisation:** https://vinceyuchen.github.io/animal-shelter-dv2/  
**Sketch PDF:** https://github.com/vinceyuchen/animal-shelter-dv2/blob/main/design/Behind_the_Shelter_Doors_Hand_Drawn_Sketch.pdf

## 1. Describe your domain chosen for DV II

My domain is **animal welfare in Australian shelters**, focusing on outcomes recorded for dogs and cats. The main story compares live-release rates, caseloads and outcome distributions across Australia's RSPCA reporting network and over time. Separate Victorian foster-care and Townsville adoption/reclaim case studies extend the context without being combined into one national shelter total.

## 2. Describe the Why and Who aspects of your DV II

**Why:** Adoption totals alone cannot show the difference between animals rehomed, reunited with owners, transferred, euthanased or still in care. Nor does a large caseload necessarily imply a poor live-release rate. I want readers to compare **rates versus counts**, identify dog–cat and geographic differences, and recognise changes over time without drawing unsupported causal conclusions.

**Who:** The visualisation is designed for an **average Malaysian reader** interested in animal welfare, particularly pet owners, potential adopters and shelter supporters. Australia's published figures provide a clearly identified comparative case study, not statistics about Malaysian shelters. Plain-language explanations, direct annotations and consistent colour meanings make the story accessible without specialist knowledge.

## 3. Describe the “What” aspect of your DV II

The primary source is **RSPCA Australia's Annual Statistics (2020–21 to 2024–25)** for dog/cat caseloads, recorded outcomes and euthanasia reasons. **Australian Bureau of Statistics** state/territory boundaries (ASGS Edition 3) and **official RSPCA facility pages** provide geographic context, including 18 selected verified sites. Separate sources are **Animal Welfare Victoria's 2025 shelter and pound records** for foster-placement episodes at 12 selected reporting entities, and **Townsville City Council's adoption/reclaim records** for 2021–2025 monthly averages at one centre.

The attributes are **categorical** (species, jurisdiction, outcome and reporting entity), **quantitative** (counts, shares and annual percentage changes), **temporal** (financial years and months) and **spatial** (boundaries and locations). I prepared chart-ready tables, combined RSPCA Reclaimed and Returned as **Reunited**, and calculated relevant percentages and changes using documented denominators. The facility points are not a complete census; foster placements count episodes, not unique animals; and the three reporting populations are kept separate.

## 4. Describe the “How” aspect of your DV II

I built **14 Vega/Vega-Lite charts** as a four-part scrolling story: **Geography, Outcomes, Changes and Beyond the Shelter**. Three map idioms serve different tasks: a **choropleth** maps live-release *rates* to sequential colour; a **proportional-symbol map** maps caseload *counts* to circle area on a consistent scale; and a **point map** locates selected verified facilities.

For species comparisons, **connected dots** place paired rates on a common axis; **100% stacked bars** compare outcome composition; a **butterfly chart** contrasts euthanasia-reason shares; and a **heatmap** reveals jurisdiction-by-outcome patterns. **Line charts** show chronological counts, while a **bump chart** shows rankings of annual percentage change, not welfare quality. A custom **Sankey** uses ribbon width to show aggregate species-to-outcome counts, not individual animal journeys. A **lollipop chart** enables precise foster-episode comparisons, a **treemap** uses the genuine reporting-entity → species hierarchy to show concentration, a **slopegraph** highlights changes between two cat-share endpoints, and a **streamgraph** reveals local monthly patterns.

Selectors, updated Key Findings, tooltips and direct annotations support focused comparisons without hiding the main story. Dogs and cats retain consistent category colours; quantitative rates use separate colour scales.

---

### Submission checks (not part of the four answers)

- **Campus audience:** This draft uses **Malaysian readers**. The assignment requires Malaysian readers for the Malaysia campus, or Australian readers for Clayton. If this is a Clayton submission, replace the Who paragraph accordingly.
- **Statistics:** The RSPCA, Victorian and Townsville sources describe separate populations. Do not present them as an all-Australia shelter census.
- **Moodle:** Paste only the four answers into the corresponding template fields. Enter the website and sketch URLs where requested. The official brief gives no universal Part B word limit in the uploaded v1.2 specification.
- **AI acknowledgement:** The assignment requires acknowledging generative-AI use on submission. Add the appropriate acknowledgement in the relevant Moodle field: "Generative AI assisted with drafting, coding, debugging and visual-design feedback. I reviewed the final work."
