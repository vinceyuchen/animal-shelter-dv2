# Part B | FIT3179 Data Visualisation 2

**Title:** Behind the Shelter Doors  
**Website:** https://vinceyuchen.github.io/animal-shelter-dv2/  
**Sketch PDF:** https://github.com/vinceyuchen/animal-shelter-dv2/blob/main/design/Behind_the_Shelter_Doors_Hand_Drawn_Sketch.pdf

## 1. Describe your domain chosen for DV II

My domain is **Australian animal-shelter welfare**, focusing on recorded outcomes for dogs and cats. The main study examines the RSPCA reporting network across states and territories, including live-release rates, outcome composition, reported caseloads and changes over time. Two clearly separated case studies cover foster-care placements in Victoria and monthly adoption/reclaim records at one Townsville centre. These data sources represent different reporting systems and are never added together as one national shelter total.

## 2. Describe the Why and Who aspects of your DV II

**Why:** An adoption count alone cannot show whether animals were rehomed, reunited with owners, transferred, euthanased or still in care. Nor does a large reported caseload necessarily imply a high or low live-release rate. The visualisation helps viewers **compare** dogs and cats, **identify** regional differences and temporal changes, and **distinguish** rates from counts. Its goal is to explain *observed* outcomes, not to assign causes or rank shelter quality.

**Who:** The target is a **non-specialist Australian or Malaysian reader** interested in animal welfare, such as a pet owner, potential adopter or shelter supporter. Australian reporting scope is clearly identified to avoid suggesting that the results describe Malaysian shelters. Descriptive questions, plain-language definitions, direct labels, stable colour semantics and nearby sources make the charts understandable without statistical training.

## 3. Describe the What aspect of your DV II

Five public source groups contribute: **RSPCA Australia Annual Statistics (2020–21 to 2024–25)** for reported species counts, outcomes and euthanasia reasons; **Australian Bureau of Statistics ASGS Edition 3 (2021)** for state/territory geometry; **official RSPCA facility pages** for 18 selected address-verified locations; **Animal Welfare Victoria's 2025 shelter and pound dataset** for foster-placement episodes at 12 selected reporting entities; and **Townsville City Council's Animals Adopted and Reclaimed** for monthly means across five complete years (2021–2025). Full publisher URLs are linked on the website.

The data combine **categorical attributes** (species, jurisdiction, outcome, reason, reporting entity), **quantitative attributes** (counts, percentages, annual changes and ranks), **temporal attributes** (financial year, calendar month) and **spatial attributes** (boundaries and facility coordinates). Source figures were prepared as chart-ready tables. RSPCA *Reunited* combines Reclaimed and Returned; *In Care* is ongoing, not a final exit outcome. Historical comparisons use six selected jurisdictions due to changed reporting coverage elsewhere. Foster data count **placement episodes**, not unique animals; the *plotted* Townsville monthly series are aggregated over animal types. These datasets have different denominators and are not nationally representative of all Australian shelters.

## 4. Describe the How aspect of your DV II

Fourteen original Vega/Vega-Lite charts tell one scrolling story: **Geography → Outcomes → Changes → Beyond the shelter**. Three different maps support three tasks: a **choropleth** uses sequential colour to compare jurisdiction-level live-release *rates*; **proportional circles** use area to reveal recorded *counts* on a fixed scale; and a **point-location map** identifies selected facilities without claiming complete coverage.

**Connected dots** place dog/cat rates on a shared horizontal axis for direct within-jurisdiction comparison. **100% stacked bars** compare outcome composition rather than volume; a **butterfly plot** contrasts reason shares around a common centre; a **heatmap** uses row/column position and quantitative lightness to reveal state–outcome combinations. **Lines** show actual reported counts across five years, while a **bump chart** tracks ranks of annual percentage change, not shelter welfare. A custom **Sankey** uses ribbon thickness for aggregate species-by-outcome counts, not individual journeys. A **faceted lollipop** makes exact Victorian foster-episode differences easy to compare, while a **nested treemap** uses the genuine reporting-entity → species hierarchy to reveal concentration. A **slopegraph** highlights the direction of changes in cat share between two endpoints; a Townsville **streamgraph** shows local monthly patterns with data-derived peak labels.

Interactions are deliberately limited: selectors support meaningful comparison, Chart 7–9 Key Findings update with the selected data, and tooltips give exact values. Direct annotations make important findings visible without interaction. Dogs and cats use consistent blue/orange category colours, while quantitative maps use their own numerical scales. Fraunces headings, Helvetica body text, responsive layout and source-specific limitations support general readers. The final website follows the four-part hand-drawn sketch.

## Attribution and submission information

**Author:** Yu Chen. **Original project date:** 24 October 2026. **AI acknowledgement:** Generative AI assisted with text, code, debugging, data preparation and visual feedback; the author remains responsible for verification.

**Publisher sources:** [RSPCA](https://www.rspca.org.au/about/annual-statistics/) · [ABS](https://www.abs.gov.au/statistics/standards/australian-statistical-geography-standard-asgs/edition-3-july-2021-june-2026/access-and-downloads/digital-boundary-files) · [RSPCA facilities](https://www.rspca.org.au/our-role/caring-for-animals/services-and-shelters/) · [Animal Welfare Victoria](https://agriculture.vic.gov.au/livestock-and-animals/animal-welfare-victoria/domestic-animals-act/animal-fate-data-set) · [Townsville](https://data.gov.au/data/dataset/414d816a-f79c-45c7-af7f-46af1b923bdd)

**Note:** These four sections are a Moodle copy-ready draft. Enter the website and sketch URLs in their required fields, and check campus-specific audience wording and any Moodle word limit.
