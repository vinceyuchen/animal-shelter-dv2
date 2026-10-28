# FIT3179 DV2 Colour & Encoding Guidelines

**Principle:** Colour follows the field that is encoded. A species colour must not replace a quantitative colour gradient, and an outcome category must not become a species colour.

## Species

| Value | Hex |
| --- | --- |
| Dogs | #235789 |
| Cats | #C46A2D |

Applies to Chart 4, 6, 8 and 11 whenever species is encoded by colour, and to the Sankey source nodes in Chart 10. Other charts may distinguish Dogs/Cats by spatial rows, not colour.

## Jurisdictions (same palette in Charts 9 and 12)

| Jurisdiction | Hex |
| --- | --- |
| ACT | #6950A1 |
| QLD | #07827A |
| SA | #C07822 |
| TAS | #A84677 |
| VIC | #2B5F91 |
| WA | #71882E |

These six encode RSPCA jurisdictions, not outcome quality.

## Recorded outcomes (Charts 5, 10; also Chart 13 where its categories are semantically comparable)

| Outcome | Hex |
| --- | --- |
| Rehomed | #2B8C78 |
| Reunited | #5B87C2 |
| Transferred | #A88E5A |
| In Care | #9FAAAE |
| Euthanased | #B65C6A |
| Other | #D9C8B2 |

Townsville's **Adopted** and **Reclaimed** use dedicated colours (#76518F and #91622F), separate from RSPCA **Rehomed** and **Reunited**. The categories have different reporting scopes and may not be merged.

## Quantitative and location encodings

- Chart 1 live-release **rate**: continuous gradient #EDF0F8 → #5B5A93, same as manual HTML legend.
- Chart 2 total reported **caseload**: neutral #5B7482. Circle area uses a fixed scale (domain 0–15,000 animals; size 0–3,600) for all species selections, with matching reference diameters for 2k, 8k and 14k.
- Chart 3 selected facility **locations**: olive #63794A.
- Chart 7 outcome **percent**: neutral sequential greyscale #F2F2F2 → #A4A4A4. Text uses dark #173642 throughout and achieves at least 5:1 contrast even against the darkest fill. The fill represents a percentage, **not** any species or outcome category.

## Review checklist

1. Does a colour encode species, state, outcome, or continuous quantity?
2. If the same category recurs elsewhere, does it use the same hex colour?
3. Do HTML custom legends, Vega-Lite legends, and direct labels agree?
4. Are quantitative scales ordered and accompanied by a clear explanation?
5. Are source scopes and caveats unchanged?

## Signed-position encodings are not negative rates

- Chart 6 uses signed values only to place Dogs on the left and Cats on the right. Its tick labels deliberately use `abs()`, so both sides display non-negative within-species percentages. The axis title also explicitly describes its two halves.

## Round 3: Redundant channels and neutral UI

The categorical jurisdiction palette remains **unchanged and identical** across Chart 9 and Chart 13. The six states also have the same explicit line-dash encodings in both charts, reinforced by direct labels. The added line style is a redundant recognition cue for colour-blind viewers, not a seventh data category.

Editorial accents, including navigation, chapter separators, Key Finding borders and reading-hint rails, now use slate-grey UI tokens rather than similar green decorative accents. Outcome and species hues are reserved for data categories; map gradients remain quantitative.

## Townsville source-specific colours (Round 3)

- Adopted: **#76518F**, a muted plum.
- Reclaimed: **#91622F**, a dark umber.
- Their hexadecimal values do not duplicate species, jurisdiction, national outcome or facility colours. Direct annotations and the local legend still identify the actual categories.

## Strict species identity versus quantitative encoding (verified across 14 charts)

- **Whenever the categorical variable is species**, Dogs = **#235789** and Cats = **#C46A2D**, including connected dots, butterfly marks, annual trend, Sankey species nodes, foster lollipop and the treemap.
- **Chart 1** colours encode a *quantitative live-release rate* with one stable purple gradient for both selections. They must **never** be relabelled as Dogs or Cats. A blue/orange identity dot and the "Showing" label now change with the Dogs/Cats selector.
- **Chart 2** keeps neutral circle fills (#5B7482), because circle **area** encodes recorded caseload, not species. The same blue/orange identity dots follow Dogs, Cats and Dogs + cats selections.
- **Other semantic fields** use their own exclusive encodings: locations, RSPCA outcomes, jurisdictions, and local Townsville outcomes. A mark's colour must agree with the field named in its legend. A quantitative gradient is a different encoding channel from an animal's categorical identity.
- The visible map legend explicitly states that purple means rate, not species. The semantic regression checks also compare exact domain-to-colour assignments, not just the presence of the right hex strings somewhere in a JSON file.
