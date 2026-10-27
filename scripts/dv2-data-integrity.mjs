import fs from 'node:fs';
import path from 'node:path';

const chart = filename => JSON.parse(fs.readFileSync(path.join('charts', filename), 'utf8'));
const outcomes = chart('outcome_composition.vg.json').data.values;
const heat = chart('chart7_outcome_heatmap.vg.json').data.values;
const annual = chart('chart8_annual_caseload.vg.json').data.values;
const rank = chart('chart9_yoy_bump.vg.json').data.values;
const flows = chart('chart10_outcome_sankey.vg.json').data.find(x => x.name === 'flows').values;
const foster = chart('chart11_foster_lollipop.vg.json').data.values;
const slopes = chart('chart12_cat_share_slope.vg.json').data.values;
const seasonal = chart('chart13_townsville_seasonality.vg.json').data.values;
const treemap = chart('chart14_foster_treemap.vg.json').data.values;

let checked = 0;
const failures = [];
function check(ok, title, detail = '') {
  checked++;
  if (!ok) failures.push({ title, detail });
}
const sum = (list, field) => list.reduce((total, row) => total + Number(row[field]), 0);
const match = (a, b) => Math.abs(Number(a) - Number(b)) < 0.001;
const fiscalYears = ['2020-21', '2021-22', '2022-23', '2023-24', '2024-25'];
const states = ['ACT', 'QLD', 'SA', 'TAS', 'VIC', 'WA'];
const outcomeGroups = ['Rehomed', 'Reunited', 'Transferred', 'In Care', 'Euthanased', 'Other'];

check(outcomes.length === 12, 'Twelve species-outcome groups');
check(heat.length === 96, 'Eight states × two species × six outcome groups');
check(annual.length === 60, 'Six states × two species × five financial years');
check(rank.length === 72, 'Six states × three measures × four annual changes');
check(flows.length === 12, 'Sankey twelve flows');
check(foster.length === 24 && treemap.length === 24, 'Foster and treemap 12 entities × two species');
check(slopes.length === 12, 'Six jurisdictions × two year endpoints');
check(seasonal.length === 24, 'Twelve months × two Townsville series');

for (const species of ['Dog', 'Cat']) {
  const expected = sum(outcomes.filter(row => row.species === species), 'count');
  check(expected === sum(heat.filter(row => row.species === species), 'count'),
    'Heatmap agrees with total ' + species + ' outcomes');
  check(expected === sum(flows.filter(row => row.source === species), 'count'),
    'Sankey agrees with total ' + species + ' outcomes');
  for (const group of outcomeGroups) {
    const row = outcomes.find(x => x.species === species && x.category === group);
    const flow = flows.find(x => x.source === species && x.target === group);
    check(!!row && !!flow && row.count === flow.count,
      'Sankey species/category reconciliation: ' + species + ' / ' + group);
    if (row) check(Math.abs(row.share - row.count / expected) < 0.00001,
      'Outcome share denominator: ' + species + ' / ' + group);
  }
}
for (const st of ['ACT', 'NSW', 'NT', 'QLD', 'SA', 'TAS', 'VIC', 'WA']) {
  for (const species of ['Dog', 'Cat']) {
    const group = heat.filter(row => row.state === st && row.species === species);
    check(group.length === 6, 'Heatmap categories: ' + st + ' / ' + species);
    const total = sum(group, 'count');
    check(total > 0, 'Positive heatmap state total: ' + st + ' / ' + species);
    for (const row of group) {
      check(Math.abs(row.share_pct - 100 * row.count / total) <= 0.051,
        'Heatmap percentage: ' + st + ' / ' + species + ' / ' + row.outcome_group);
    }
    if (states.includes(st)) {
      const latest = annual.find(row => row.state === st && row.financial_year === '2024-25' &&
        row.species === (species === 'Dog' ? 'Dogs' : 'Cats'));
      check(!!latest && latest.count === total, 'Heatmap agrees with 2024-25 series: ' + st + ' / ' + species);
    }
  }
}
for (const row of rank) {
  const current = annual.filter(x => x.financial_year === row.financial_year && x.state === row.state);
  const previousYear = fiscalYears[fiscalYears.indexOf(row.financial_year) - 1];
  const previous = annual.filter(x => x.financial_year === previousYear && x.state === row.state);
  const reduceMetric = list => list
    .filter(x => row.metric === 'Dogs + cats' || x.species === row.metric)
    .reduce((total, x) => total + x.count, 0);
  const currentCount = reduceMetric(current), previousCount = reduceMetric(previous);
  const change = 100 * (currentCount - previousCount) / previousCount;
  check(previousCount > 0 && currentCount === row.current_count &&
    previousCount === row.previous_count && Math.abs(change - row.change_pct) < 0.001,
    'Bump rank source counts/percentage: ' + row.metric + ' / ' + row.state + ' / ' + row.financial_year);
}
for (const metric of ['Dogs + cats', 'Dogs', 'Cats']) {
  for (const year of fiscalYears.slice(1)) {
    const group = rank.filter(x => x.metric === metric && x.financial_year === year);
    const ranks = group.map(x => x.rank).sort((a, b) => a - b).join(',');
    check(ranks === '1,2,3,4,5,6', 'Unique six ranks: ' + metric + ' / ' + year);
  }
}
for (const row of slopes) {
  const dog = annual.find(x => x.state === row.state && x.financial_year === row.financial_year && x.species === 'Dogs');
  const cat = annual.find(x => x.state === row.state && x.financial_year === row.financial_year && x.species === 'Cats');
  check(!!dog && !!cat && dog.count === row.dogs_count && cat.count === row.cats_count,
    'Slope endpoint counts: ' + row.state + ' / ' + row.financial_year);
  if (dog && cat) check(Math.abs(100 * cat.count / (dog.count + cat.count) - row.cat_share_pct) < 0.001,
    'Slope endpoint percentage: ' + row.state + ' / ' + row.financial_year);
}
const fosterByEntity = new Map();
for (const row of foster) {
  const val = fosterByEntity.get(row.reporting_entity) || { Dogs: 0, Cats: 0, total: row.total_placements };
  val[row.species] += row.placements;
  fosterByEntity.set(row.reporting_entity, val);
}
const fosterTotal = sum(foster, 'placements');
check(fosterTotal === 13797, 'Selected foster entity control total is 13,797 episodes');
check(fosterByEntity.size === 12, 'Twelve distinct selected foster reporting entities');
check(sum(treemap, 'placements') === fosterTotal, 'Treemap total matches lollipop');
for (const [name, entity] of fosterByEntity) {
  const rows = treemap.filter(x => x.reporting_entity === name);
  check(entity.Dogs + entity.Cats === entity.total, 'Reporting entity total: ' + name);
  check(rows.length === 2, 'Treemap species split for entity: ' + name);
  for (const row of rows) {
    check(row.placements === entity[row.species] && row.org_total === entity.total,
      'Treemap record matches selected foster data: ' + name + ' / ' + row.species);
    const area = (row.x1 - row.x0) * (row.y1 - row.y0);
    check(row.x0 >= 0 && row.y0 >= 0 && row.x1 <= 1 && row.y1 <= 1 &&
      Math.abs(area - row.placements / fosterTotal) < 0.00001,
      'Treemap area proportional to placement count: ' + name + ' / ' + row.species);
  }
}
for (const series of ['Adopted', 'Reclaimed']) {
  const rows = seasonal.filter(x => x.series === series);
  check(rows.length === 12 && rows.every(x => x.years === 5 && x.mean_count >= 0),
    'Five complete calendar years of non-negative ' + series + ' averages');
  check(rows.map(x => x.month_num).sort((a, b) => a - b).join(',') === '1,2,3,4,5,6,7,8,9,10,11,12',
    'Exactly one entry per calendar month: ' + series);
}
const summary = {
  checked,
  passed: checked - failures.length,
  failed: failures.length,
  validatedFrom: 'Processed Vega and Vega-Lite chart data. This checks internal consistency, not independent source provenance.',
  failures,
};
console.log('DV2 integrity: ' + summary.passed + '/' + checked + ' checks passed.');
if (failures.length) {
  for (const fail of failures) console.error('- ' + fail.title + (fail.detail ? ': ' + fail.detail : ''));
  process.exitCode = 1;
}
fs.mkdirSync('dv2-browser-audit', { recursive: true });
fs.writeFileSync('dv2-browser-audit/data-integrity.json', JSON.stringify(summary, null, 2) + '\n');
