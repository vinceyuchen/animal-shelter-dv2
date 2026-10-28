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
| State/outcome share (Chart 7, low -> high) | `--dv2-share-low` -> `--dv2-share-high` | `#F2F2F2` -> `#A4A4A4` |
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
4. Quantitative fields use ordered scales and clearly labelled legends. Chart 1 uses a distinct purple live-release scale; Chart 7 uses a light neutral greyscale for outcome shares with dark legible percentage labels; Chart 2 uses a fixed quantitative symbol-area domain across every species selection.
5. Text legibility and colour-blind accessibility: colour must not be the sole cue where possible; use labels, positions or legend.
6. Sources and caveats remain unchanged. Do not change underlying numbers when applying the theme.

## Round 3: Figure–ground and spacing

- Neutral page `#F5F7F8` contrasts with white chart cards.
- Callouts use a soft grey `#EEF2F4` and an understated border; source notes receive a thin neutral rule.
- Interactive controls and chart/aside grids retain the original functional layout, with a consistent 32px desktop gap and constrained mobile spacing.
- Headings and body typography remain Fraunces + Helvetica.
- The newly added line patterns in Charts 9 and 13 are identical by jurisdiction, supplementing consistent categorical colours.

## Source-specific local outcomes and editorial balance

- Townsville Adopted: `--dv2-townsville-adopted` `#76518F`.
- Townsville Reclaimed: `--dv2-townsville-reclaimed` `#91622F`.
- Neither is an alias for national RSPCA Rehomed / Reunited outcomes.
- Wide-screen Key Finding panels are vertically centred beside their chart to balance large chart areas; at 1024px the panels follow the chart in normal reading order.
