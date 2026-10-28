import fs from 'node:fs';

const read = (file) => fs.readFileSync(file, 'utf8');
const json = (file) => JSON.parse(read(file));
const failures = [];
const expect = (ok, message) => { if (!ok) failures.push(message); };

const files = {
  map: json('charts/map_caseload_symbols.vg.json'),
  mapLrr: json('charts/map_live_release.vg.json'),
  mapFacilities: json('charts/map_rspca_locations.vg.json'),
  seasonal: json('charts/chart13_townsville_seasonality.vg.json'),
  heat: json('charts/chart7_outcome_heatmap.vg.json'),
  comparison: json('charts/connected_dot_lrr.vg.json'),
  butterfly: json('charts/chart5_compare.vg.json'),
  annual: json('charts/chart8_annual_caseload.vg.json'),
  foster: json('charts/chart11_foster_lollipop.vg.json'),
  treemap: json('charts/chart14_foster_treemap.vg.json'),
  bump: json('charts/chart9_yoy_bump.vg.json'),
  slope: json('charts/chart12_cat_share_slope.vg.json'),
};
const DOG = '#235789';
const CAT = '#C46A2D';
for (const [name, chart] of Object.entries(files)) {
  const serialized = JSON.stringify(chart);
  if (['comparison','butterfly','annual','foster','treemap'].includes(name)) {
    expect(serialized.includes(DOG) && serialized.includes(CAT), name + ' must use the canonical dog and cat colours');
  }
}
const size = files.map.layer[1].encoding.size.scale;
expect(JSON.stringify(size.domain) === '[0,15000]' && JSON.stringify(size.range) === '[0,3600]',
  'Chart 2 must retain a fixed cross-selection circle-area scale');
const css = read('css/style.css');
for (const [cls, width] of [['bubble-2k',25],['bubble-8k',49],['bubble-14k',65]]) {
  expect(css.includes('.' + cls + ' { width: ' + width + 'px; height: ' + width + 'px; }'),
    'HTML circle-size legend inconsistent: ' + cls);
}
// Butterfly uses signed data only to position opposing bars. Axis labels must show
// genuine (nonnegative) species shares, never negative percentages.
const butterflyAxis = files.butterfly.encoding.x.axis;
expect(butterflyAxis.labelExpr === "format(abs(datum.value), '.0%')",
  'Butterfly axis must show absolute rates, including on its left side');
expect(files.butterfly.encoding.x.field === 'signed_share',
  'Butterfly must preserve signed positioning around zero');
expect(files.butterfly.layer[1].encoding.color?.value === '#FFFFFF',
  'The 59.7% dog label must be rendered white on a blue bar');
expect(files.butterfly.layer[2].encoding.color?.value === '#173642',
  'The 46.7% cat label must use dark text when placed outside the bar');
expect(files.foster.spec.width >= 300 &&
  files.foster.spec.encoding.y.axis.labelFontSize >= 12 &&
  files.foster.facet.column.header.labelFontSize >= 16,
  'Foster lollipop requires readable entity labels and sufficient facet width');
expect(files.heat.encoding.x.axis.labelFontSize >= 13 &&
       files.heat.encoding.y.axis.labelFontSize >= 13 &&
       files.heat.encoding.x.axis.labelFontWeight === 'bold' &&
       files.heat.encoding.y.axis.labelFontWeight === 'bold' &&
       files.heat.layer[1].mark.fontSize === 12 &&
       files.heat.layer[0].encoding.color.legend.titleFontSize >= 13,
  'Heatmap must distinguish category headings from cell values');
const grey = files.heat.layer[0].encoding.color.scale.range;
expect(JSON.stringify(grey) === '["#F2F2F2","#A4A4A4"]', 'Chart 7 must use a neutral quantitative grey scale');
expect(files.heat.layer[1].encoding.color.value === '#173642', 'Chart 7 percentage labels must be uniformly dark');
const relativeLuminance = hex => {
  const values = [1,3,5].map(i=>parseInt(hex.slice(i,i+2),16)/255)
    .map(v => v <= 0.04045 ? v / 12.92 : ((v + 0.055)/1.055)**2.4);
  return 0.2126*values[0]+0.7152*values[1]+0.0722*values[2];
};
const contrast = (relativeLuminance(grey[1])+0.05)/(relativeLuminance('#173642')+0.05);
expect(contrast >= 4.5, 'Chart 7 minimum text contrast must exceed 4.5:1');
// Round 2: direct annotations reflect each plotted data source and selection.
expect(files.mapLrr.layer?.length === 3 &&
  files.mapLrr.layer.slice(1).every(layer => layer.transform.some(t =>
    t.calculate?.includes("Species_selection"))),
  'Choropleth direct rate labels must be bound to the species selector');
expect(files.mapFacilities.layer?.length === 4 &&
  files.mapFacilities.layer[2].data.values[0].note === '18 verified examples',
  'Point map must identify its 18-site sample without implying a full census');
expect(files.seasonal.layer?.length === 3 &&
  files.seasonal.layer.slice(1).every(layer =>
    layer.transform.some(step => step.window?.[0]?.op === 'max' &&
      JSON.stringify(step.frame) === '[null,null]')),
  'Streamgraph labels should derive peaks from observed monthly values');
for (const [series,month,count] of [['Reclaimed','May',84.4],['Adopted','Dec',100.4]]) {
  const actual = files.seasonal.data.values.filter(row => row.series === series)
    .reduce((best,row) => row.mean_count > best.mean_count ? row : best);
  expect(actual.month === month && Math.abs(actual.mean_count - count) < 1e-8,
    'Peak annotation must match observed mean for ' + series);
}
// Round 3: geographical series gain redundant line patterns without changing colour meaning.
const jurisdiction = ['ACT','QLD','SA','TAS','VIC','WA'];
const bumpColour = files.bump.encoding.color.scale;
const slopeColour = files.slope.encoding.color.scale;
expect(files.bump.encoding.color.legend === null,
  'The six direct endpoint labels should replace the redundant, cluttered bump legend');
const bumpDashes = files.bump.layer[0].encoding.strokeDash?.scale;
const slopeDashes = files.slope.layer[0].encoding.strokeDash?.scale;
expect(JSON.stringify(bumpColour.domain) === JSON.stringify(jurisdiction) &&
       JSON.stringify(slopeColour) === JSON.stringify(bumpColour) &&
       JSON.stringify(bumpDashes) === JSON.stringify(slopeDashes) &&
       JSON.stringify(bumpDashes?.domain) === JSON.stringify(jurisdiction) &&
       bumpDashes?.range?.length === 6 &&
       new Set(bumpDashes.range.map(x => JSON.stringify(x))).size === 6,
  'Jurisdictions need identical colour and uniquely distinguishable line patterns across both charts');
expect(css.includes('--accent: #50636E;') && css.includes('--dv2-ui-border: #B7C4CB;'),
  'Editorial decoration should use neutral UI colours rather than data-category hues');
expect(css.includes('.source-note a {') && css.includes('color: #315A6A;'),
  'Source links must use neutral, accessible editorial colours rather than a default saturated blue');
// Round 3: separate local outcome colours from RSPCA's national reporting categories.
const townsvilleColour = files.seasonal.layer[0].encoding.color.scale;
const otherColours = new Set([DOG,CAT,'#2B8C78','#5B87C2','#A88E5A','#9FAAAE','#B65C6A','#D9C8B2','#6950A1','#07827A','#C07822','#A84677','#2B5F91','#71882E']);
expect(JSON.stringify(townsvilleColour.domain) === JSON.stringify(['Adopted','Reclaimed']) &&
  JSON.stringify(townsvilleColour.range) === JSON.stringify(['#76518F','#91622F']) &&
  townsvilleColour.range.every(value=>!otherColours.has(value)),
  'Townsville outcomes require dedicated category colours, distinct from RSPCA outcomes');
expect(css.includes('--dv2-townsville-adopted:#76518F;') &&
  css.includes('--dv2-townsville-reclaimed:#91622F;') &&
  css.includes('.dv2-story-grid > .dv2-story-aside { align-self:center; }'),
  'Local outcome tokens and desktop insight alignment must remain consistent');
// Round 4: retained Fraunces/Helvetica hierarchy and minimum chart-label font sizes.
const sankey=json('charts/chart10_outcome_sankey.vg.json');
const sankeyFont = name => sankey.marks.find(m=>m.name===name)?.encode?.enter?.fontSize?.value;
expect(sankeyFont('sourceLabels')>=17 &&
       sankeyFont('outcomeLabels')>=16 &&
       sankeyFont('outcomeCounts')>=16 &&
       sankeyFont('leftColumnHeader')>=15 && sankeyFont('rightColumnHeader')>=15,
  'SVG-scaled Sankey labels must remain readable at small laptop width');
expect(files.foster.spec.encoding.y.axis.labelFontSize>=13 &&
       files.foster.spec.encoding.x.axis.labelFontSize>=13 &&
       files.foster.facet.column.header.labelFontSize>=17,
  'Foster care labels need consistent minimum typography');
expect(files.treemap.layer[1].mark.fontSize>=14 &&
       files.treemap.layer[1].mark.color === '#0A1920' &&
       files.treemap.layer[1].mark.strokeWidth === undefined &&
       files.treemap.layer[0].encoding.color.legend.labelFontSize>=13,
  'Treemap labels need sufficient size and text contrast');
expect(css.includes('.source-note { font-size: 14px; line-height: 1.65; }'),
  'Chart sources must retain a legible 14px editorial font');
// Strict, field-level semantic validation, not simple substring searches.
const speciesColour = {Dogs:DOG,Cats:CAT,Dog:DOG,Cat:CAT};
for (const [name,encoding] of [
  ['connected dots',files.comparison.layer[1].encoding.color],
  ['butterfly',files.butterfly.encoding.color],
  ['annual trend',files.annual.encoding.color],
  ['foster lollipop',files.foster.spec.encoding.color],
  ['foster treemap',files.treemap.layer[0].encoding.color]
]) {
  expect(encoding.field === 'species' &&
    encoding.scale.domain.every((key,i)=>speciesColour[key]===encoding.scale.range[i]),
    'Species domain-to-colour identity must be identical for '+name);
}
const sankeySource = sankey.data.find(x=>x.name==='sources')?.values||[];
expect(sankeySource.length===2 && sankeySource.every(x=>speciesColour[x.name]===x.color),
  'Sankey source nodes must use the same Dog/Cat colour identity');
const choroplethColour=files.mapLrr.layer[0].encoding.color;
expect(choroplethColour.field==='selected_lrr' && choroplethColour.type==='quantitative' &&
  JSON.stringify(choroplethColour.scale.range)===JSON.stringify(['#EDF0F8','#5B5A93']) &&
  files.mapLrr.params[0].name==='Species_selection',
  'Chart 1 purple must encode numeric live-release rate, never species identity');
expect(files.map.layer[1].encoding.color.value==='#5B7482' &&
       files.map.layer[1].encoding.size.field==='selected_total',
  'Chart 2 neutral circle fill must accompany the quantitative size encoding');
const pageHtml=read('index.html');
expect((pageHtml.match(/class="dv2-species-cue"/g)||[]).length===2 &&
  pageHtml.includes('Live-release rate (%) · darker purple = higher rate') &&
  pageHtml.includes('Animals recorded · circle area') &&
  !pageHtml.includes('Blue dot = Dogs; orange dot = Cats.') &&
  !pageHtml.includes('Blue/orange dots identify the selection.'),
  'Both maps require a visible, unambiguous species identity/quantitative legend');
const code=read('js/dv2-story-layout.js');
expect(code.includes('function connectSpeciesCue(') &&
  code.includes('select.addEventListener("change", update)') &&
  code.includes('connectSpeciesCue(id, card);'),
  'Map species identity badges must stay synced to the live Vega selectors');
expect(css.includes('.dv2-cue-dog {background:var(--dv2-dog);}') &&
  css.includes('.dv2-cue-cat {background:var(--dv2-cat);}'),
  'Selection dots must use the canonical categorical palette');
const html = read('index.html');
expect(html.includes('pp means <em>percentage points</em>'),
  'Chart 4 must define percentage points at first use');
expect(html.includes('Which euthanasia reasons were recorded?') &&
  !html.includes('Why do euthanasia reasons differ?') &&
  !html.includes('Not every animal has the same chance'),
  'The story must not imply causation or individual outcome probabilities from aggregate counts');
expect(html.includes('not the journey of an individual animal'),
  'Sankey ribbons must be described as aggregate records, not individual animal journeys');

for (const title of ['PART 01 / GEOGRAPHY','PART 02 / OUTCOMES','PART 03 / CHANGES','PART 04 / BEYOND THE SHELTER']) {
  expect(html.includes(title), 'Missing planning-sketch story chapter: ' + title);
}
expect(files.bump.layer[2].transform[0].filter === "datum.financial_year === '2024-25'",
  'Bump chart should directly label every jurisdiction at its latest end point');
const color = name => files[name].encoding?.color?.scale?.range ??
  files[name].spec?.encoding?.color?.scale?.range ?? [];
expect(JSON.stringify(color('bump')) === JSON.stringify(color('slope')),
  'Jurisdiction colours must match in bump and slopegraph');
if (failures.length) {
  console.error('DV2 semantic colour/encoding audit failed:\n- ' + failures.join('\n- '));
  process.exitCode = 1;
} else {
  console.log('DV2 semantic audit PASS: species, state, quantitative colour, circle area and story chapters');
}
