import fs from 'node:fs';

const read = (file) => fs.readFileSync(file, 'utf8');
const json = (file) => JSON.parse(read(file));
const failures = [];
const expect = (ok, message) => { if (!ok) failures.push(message); };

const files = {
  map: json('charts/map_caseload_symbols.vg.json'),
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
const html = read('index.html');
for (const title of ['PART 01 / GEOGRAPHY','PART 02 / OUTCOMES','PART 03 / CHANGES','PART 04 / BEYOND THE SHELTER']) {
  expect(html.includes(title), 'Missing planning-sketch story chapter: ' + title);
}
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
