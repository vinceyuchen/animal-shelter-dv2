# FIT3179 DV2 Visual Design System

## Typography
- Display headings (h1, h2, h3), hero deck and major numbers: **Fraunces**.
- Body text, axis labels, chart titles, legends, buttons, tooltips: **Helvetica**, falling back to Arial.
- All Vega-Lite configs should use `Helvetica, Arial, sans-serif` for chart font and axis/legend/title fonts.

## Semantic colour dictionary (one meaning, one colour)

| Meaning | CSS token | Hex |
| --- | --- | --- |
| Dogs (when *species* is encoded by colour) | `--dv2-dog` | `#235789` |
| Cats (when *species* is encoded by colour) | `--dv2-cat` | `#C46A2D` |
| Live release rate (low -> high) | `--dv2-live-low` -> `--dv2-live-high` | `#EDF0F8` -> `#5B5A93` |
| Total caseload | `--dv2-caseload` | `#5B7482` |
| State/outcome share (Chart 7, low -> high) | `--dv2-share-low` -> `--dv2-share-high` | `#F2F2F2` -> `#404040` |
| Selected RSPCA facilities | `--dv2-facility` | `#63794A` |
| Rehomed | `--dv2-outcome-rehomed` | `#2B8C78` |
| Reunited | `--dv2-outcome-reunited` | `#5B87C2` |
| Transferred | `--dv2-outcome-transferred` | `#A88E5A` |
| In care | `--dv2-outcome-in-care` | `#9FAAAE` |
| Euthanased | `--dv2-outcome-euthanased` | `#B65C6A` |
| Other | `--dv2-outcome-other` | `#D9C8B2` |

## Rules for every new visualisation
1. First decide *what* the colour channel encodes. Do not treat a map shaded by live-release rate as a categorical dog/cat colour map.
2. When species is a coloured category, use blue for dogs and orange for cats every time. Match legend and highlighted values.
3. When outcome type is a coloured category, use the outcome dictionary, not species colours (species may instead be encoded on the y-axis).
4. Quantitative fields use ordered scales and clearly labelled legends. Chart 1 uses a distinct purple live-release scale; Chart 7 uses neutral greyscale for outcome shares, so its cell colours cannot be mistaken for outcome-category or species colours.
5. Text legibility and colour-blind accessibility: colour must not be the sole cue where possible; use labels, positions or legend.
6. Sources and caveats remain unchanged. Do not change underlying numbers when applying the theme.
