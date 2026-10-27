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

Townsville's Adopted is styled like Rehomed; Reclaimed is styled like Reunited. This is a visual analogy only: different sources and reporting scopes remain separate.

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
