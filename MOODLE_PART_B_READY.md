# Part B: Domain Description

**Project:** Behind the Shelter Doors  
**Live website:** https://vinceyuchen.github.io/animal-shelter-dv2/  
**Hand-drawn sketch:** https://github.com/vinceyuchen/animal-shelter-dv2/blob/main/design/Behind_the_Shelter_Doors_Hand_Drawn_Sketch.pdf

## 1. Describe your domain chosen for DV II

My domain is **dog and cat welfare outcomes reported by Australia's RSPCA network**. I examine regional differences in recorded caseloads, live-release rates and outcomes, alongside changes from 2020–21 to 2024–25. Separate Victorian foster-care and Townsville adoption/reclaim case studies broaden the perspective without being treated as part of one national dataset.

## 2. Describe the Why and Who aspects of your DV II

**Why:** Adoption totals alone conceal important differences between rehoming, reunion with owners, euthanasia and ongoing care. A high caseload does not necessarily mean a low live-release rate. My visualisation helps readers **compare** dog and cat outcomes, **identify** geographical and temporal differences, and **distinguish** percentages from counts without implying that the charts explain the causes.

**Who:** The intended audience is an **average Malaysian reader** interested in companion-animal welfare, including pet owners, prospective adopters and shelter supporters. Adoption, lost-pet reunification and foster care are relevant concerns for this audience. Australian reporting provides an explicitly labelled case study for understanding these issues, **not evidence about Malaysian shelters**. Plain-language definitions, direct annotations and consistent colours make the story accessible without statistical expertise.

## 3. Describe the “What” aspect of your DV II

**RSPCA Australia's 2024–25 Annual Statistics** provide outcome counts and euthanasia reasons used for current-year composition and live-release calculations. Reports from **2020–21 to 2024–25** provide caseloads for historical trends, annual-change rankings and cat-share comparisons. **Australian Bureau of Statistics ASGS Edition 3 (2021)** boundaries and **official RSPCA facility pages** provide spatial context, including 18 selected locations. **Animal Welfare Victoria's 2025 Animal Fate Dataset** supplies foster-placement episodes for 12 selected reporting entities; **Townsville City Council's 2021–2025 records** supply monthly adoption/reclaim averages for one centre.

The attributes are **categorical** (species, jurisdiction, outcome, entity), **quantitative** (counts, percentages, changes), **temporal** (years, months) and **spatial** (boundaries, coordinates). I prepared chart-ready tables and grouped Reclaimed and Returned as **Reunited**. For eligible recorded outcomes, live-release rate equals **(Rehomed + Reunited + Transferred) / (those categories + Euthanased)**, excluding animals still in care. Historical comparisons use six jurisdictions because NSW and NT reporting coverage changed substantially. Foster figures count **placement episodes**, the 18 facility points are a **sample**, and the three reporting populations are not pooled.

## 4. Describe the “How” aspect of your DV II

I organised **14 Vega/Vega-Lite charts** into four chapters: **Geography, Outcomes, Changes and Beyond the Shelter**. A **choropleth** uses sequential colour for live-release *rates*; **proportional circles** use area for caseload *counts* on a fixed scale; and a **point map** locates selected facilities.

**Connected dots** compare dog–cat rates on one axis, while **100% stacked bars** show outcome *composition*. **Butterfly bars** contrast euthanasia-reason shares; a **heatmap** uses position and lightness to scan jurisdiction–outcome combinations. **Lines** preserve the five-year caseload trend, whereas a **bump chart** isolates changing *ranks*, not welfare quality. The **Sankey** uses ribbon width for aggregate species–outcome counts rather than individual animal journeys.

For foster care, **lollipops** enable more precise comparisons between entities; a **nested treemap** instead reveals concentration within a genuine *reporting entity → species* hierarchy. A **slopegraph** highlights cat-share changes between two endpoints rather than the full time series. A **streamgraph** shows Townsville's monthly patterns and annotated peaks.

Selectors and tooltips allow focused exploration; **Charts 7–9** update Key Findings with the selection. Direct labels communicate key results without interaction. Dogs and cats retain fixed blue/orange colours, while numerical rates use separate scales.

---

### Before submitting (not part of the four answers)

- **Campus:** This Who answer assumes **Malaysia campus**, whose assigned audience is the average Malaysian. For **Clayton**, change Who to the average Australian reader and adapt the local relevance explanation.
- **Source scope:** Rate denominators above follow the current processed RSPCA outcome table; the three reporting populations are separate. The Townsville chart aggregates animal types in its plotted series.
- **Submission:** Paste the four numbered answers into the Moodle template. Submit the live-site and sketch-PDF URLs in their designated fields. Check for any limit shown in Moodle.
- **AI declaration:** Acknowledge use of AI in the appropriate Moodle field with wording that accurately reflects your work.
