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

**RSPCA Australia Annual Statistics (2020–21 to 2024–25)** provide dog/cat caseloads, recorded outcomes and euthanasia reasons. **Australian Bureau of Statistics ASGS Edition 3 (2021)** boundaries and **official RSPCA facility pages** provide geographic context, including 18 selected verified locations. Separately, **Animal Welfare Victoria's 2025 Animal Fate Dataset** provides foster-placement episodes for 12 selected reporting entities; **Townsville City Council's adoption/reclaim records (2021–2025)** provide monthly averages for one local centre.

Attributes are **categorical** (species, jurisdiction, outcome and entity), **quantitative** (counts, shares and changes), **temporal** (financial years and months) and **spatial** (boundaries and coordinates). I prepared chart-ready data, grouped RSPCA Reclaimed and Returned as **Reunited**, and calculated live-release rate as **(Rehomed + Reunited + Transferred) divided by (those categories + Euthanased)** among the eligible recorded outcomes. Animals still in care are not final outcomes in this calculation. Six jurisdictions were retained for the five-year comparisons because NSW and NT had substantial reporting-coverage changes. Foster placements are **episodes**, not unique animals; facility locations are a **sample**, not a census. The three reporting populations are never pooled.

## 4. Describe the “How” aspect of your DV II

I built **14 Vega/Vega-Lite charts** in four chapters: **Geography → Outcomes → Changes → Beyond the Shelter**. The maps serve distinct tasks: a **choropleth** uses sequential colour for live-release *rates*, **proportional circles** use area for recorded *counts* on a fixed scale, and **points** locate selected facilities.

**Connected dots** compare dog–cat rates on the same positional scale, whereas **100% stacked bars** compare outcome *composition* rather than totals. **Butterfly bars** contrast euthanasia-reason shares; a **heatmap** uses grid position and lightness to scan jurisdiction–outcome combinations. **Line charts** show the full five-year count trend, while a **bump chart** tracks ranks of annual change, not welfare quality. A custom **Sankey** uses ribbon width for aggregate species–outcome counts, not individual animal journeys.

For foster care, **lollipop marks** allow more precise entity comparisons, while a **nested treemap** sacrifices precise reading of values to reveal concentration within a genuine *reporting entity → species* hierarchy. A **slopegraph** emphasises the direction of cat-share change between two years, unlike the full time-series line chart; a **streamgraph** highlights the monthly pattern of one Townsville centre, with directly labelled peaks.

Selectors, data-linked Key Findings, direct labels and tooltips support both guided reading and focused comparison. Dogs and cats consistently use blue and orange; quantitative colour scales encode rates, not species identity.

---

### Before submitting (not part of the four answers)

- **Campus:** This Who answer assumes **Malaysia campus**, whose assigned audience is the average Malaysian. For **Clayton**, change Who to the average Australian reader and adapt the local relevance explanation.
- **Source scope:** Rate denominators above follow the current processed RSPCA outcome table; the three reporting populations are separate. The Townsville chart aggregates animal types in its plotted series.
- **Submission:** Paste the four numbered answers into the Moodle template. Submit the live-site and sketch-PDF URLs in their designated fields. Check for any limit shown in Moodle.
- **AI declaration:** Acknowledge use of AI in the appropriate Moodle field with wording that accurately reflects your work.
