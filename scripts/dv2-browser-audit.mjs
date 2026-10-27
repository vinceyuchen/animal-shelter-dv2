import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const URL = 'https://vinceyuchen.github.io/animal-shelter-dv2/';
const outputDir = 'dv2-browser-audit';
fs.mkdirSync(outputDir, { recursive: true });
const charts = [
  ['01','Live-release choropleth','map-live-release'],
  ['02','Caseload proportional symbols','map-caseload'],
  ['03','Shelter location dot map','map-locations'],
  ['04','Connected dot live-release','connected-dot-lrr'],
  ['05','Outcome composition','outcome-composition'],
  ['06','Euthanasia reasons butterfly','butterfly-euthanasia'],
  ['07','Outcome heatmap','vis-chart7'],
  ['08','Annual trend line','chart8-annual-caseload'],
  ['09','Year-on-year bump','chart9-yoy-bump'],
  ['10','Outcome Sankey','chart10-outcome-sankey'],
  ['11','Foster care lollipop','chart11-foster'],
  ['12','Victoria foster concentration treemap','chart14-foster-treemap'],
  ['13','Cat share slope','chart12-cat-share-slope'],
  ['14','Townsville streamgraph','chart13-townsville'],
];

const browser = await chromium.launch({ headless: true });
const report = { url: URL, checkedUTC: new Date().toISOString(), views: [] };

try {
  for (const config of [
    { name: 'desktop', width: 1440, height: 900 },
    { name: 'laptop', width: 1024, height: 768 },
  ]) {
    const context = await browser.newContext({
      viewport: { width: config.width, height: config.height },
      deviceScaleFactor: 1,
    });
    const page = await context.newPage();
    const view = { viewport: config, httpStatus: null, chartResults: [], controls: [], errors: [], failedRequests: [], overflow: null };
    report.views.push(view);
    page.on('pageerror', error => view.errors.push(String(error)));
    page.on('console', message => { if (message.type() === 'error') view.errors.push(message.text()); });
    page.on('requestfailed', request => {
      if (!/favicon|analytics|fonts\.googleapis|fonts\.gstatic/.test(request.url())) {
        view.failedRequests.push(request.url() + ' ' + (request.failure()?.errorText || 'failed'));
      }
    });

    try {
      const response = await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
      view.httpStatus = response?.status() ?? null;
      await page.waitForFunction(
        () => document.querySelectorAll('.vega-embed svg, .vega-embed canvas').length  >= 14,
        { timeout: 45000 }
      ).catch(() => {});
      await page.waitForTimeout(1000);

      view.overflow = await page.evaluate(() => ({
        documentWidth: document.documentElement.scrollWidth,
        viewportWidth: window.innerWidth,
        overflowing: document.documentElement.scrollWidth > window.innerWidth + 5,
      }));

      const actualOrder = await page.locator('section[id^="section-"]').evaluateAll(sections =>
        sections.map(section => ({id: section.id, charts: Array.from(section.querySelectorAll('.vis-host[id]')).map(host => host.id)}))
      );
      view.chapterOrder = actualOrder.map(item => item.id);
      for (let i = 0; i < 14; i++) {
        const expectedId = 'section-' + String(i + 1).padStart(2, '0');
        const expectedChart = charts[i][2];
        if (actualOrder[i]?.id !== expectedId || !(actualOrder[i]?.charts.includes(expectedChart) || (expectedChart === 'map-locations' && actualOrder[i]?.charts.includes('map-locations-plot')))) {
          view.errors.push('Story order mismatch in section ' + expectedId + ': expected ' + expectedChart);
        }
      }
      for (const [number, name, id] of charts) {
        const host = page.locator('#' + id);
        const count = await host.count();
        const marks = count ? await host.locator('svg, canvas').count() : 0;
        const bounds = count ? await host.evaluate(el => ({
          width: Math.round(el.getBoundingClientRect().width),
          height: Math.round(el.getBoundingClientRect().height),
          clientWidth: el.clientWidth,
          scrollWidth: el.scrollWidth,
          svgWidth: Math.round((el.querySelector('svg') || el).getBoundingClientRect().width),
        })) : null;
        const internalOverflow = !!bounds && bounds.scrollWidth > bounds.clientWidth + 5;
        view.chartResults.push({ number, name, id, rendered: marks > 0, hostFound: count === 1, bounds, internalOverflow });
        if (config.name === 'desktop' && count) {
          try {
            const section = host.locator('xpath=ancestor::section[1]');
            await section.screenshot({ path: path.join(outputDir, 'chart-' + number + '.png'), timeout: 20000, animations: 'disabled' });
          } catch (error) {
            view.errors.push('Screenshot ' + number + ': ' + String(error));
          }
        }
      }

      if (config.name === 'desktop') {
        const activeEmbedScript = await page.locator('script[src^="js/embed.js"]').getAttribute('src');
        if (!activeEmbedScript?.includes('20261028-idiom-audit3')) {
          view.errors.push('Stale embed script was served: ' + activeEmbedScript);
        }
        const liveLollipop = await page.evaluate(async () => {
          const response = await fetch('charts/chart11_foster_lollipop.vg.json?v=20261028-legibility1', {cache:'no-store'});
          if (!response.ok) throw new Error('Chart 11 spec unavailable');
          const spec = await response.json();
          return {width:spec.spec?.width,labels:spec.spec?.encoding?.y?.axis?.labelFontSize};
        });
        view.assetVersion = {embedScript:activeEmbedScript,chart11:liveLollipop};
        // An SVG can render successfully while its annotations inherit the wrong
        // species fill colour and disappear against the bars. Verify the glyphs.
        const butterflyLabels = await page.locator('#butterfly-euthanasia svg text').evaluateAll(nodes => {
          const find = target => nodes.find(node => node.textContent?.trim() === target);
          const dog = find('59.7%'), cat = find('46.7%');
          return {
            dogVisible: !!dog,
            catVisible: !!cat,
            dogFill: dog ? getComputedStyle(dog).fill : null,
            catFill: cat ? getComputedStyle(cat).fill : null
          };
        });
        view.rubricChecks = {...(view.rubricChecks || {}), butterflyLabels};
        if (!butterflyLabels.dogVisible || !butterflyLabels.catVisible ||
            butterflyLabels.dogFill !== 'rgb(255, 255, 255)' ||
            butterflyLabels.catFill !== 'rgb(23, 54, 66)') {
          view.errors.push('Butterfly text visibility/colour regression: ' + JSON.stringify(butterflyLabels));
        }

        if (liveLollipop.width !== 315 || liveLollipop.labels < 12) {
          view.errors.push('Chart 11 spec is stale in live site: ' + JSON.stringify(liveLollipop));
        }
      }
      if (config.name === 'desktop') {
        // Rubric-specific regressions: honesty of annotations, scale, byline and selected sample.
        const checkContent = await page.evaluate(() => {
          const byline = document.querySelector('.dv2-hero-byline')?.textContent || '';
          const legend = document.querySelector('#section-01 .legend-scale')?.textContent || '';
          const gradient = getComputedStyle(document.querySelector('#section-01 .gradient-bar')).backgroundImage;
          const facility = document.querySelector('#section-03 .section-heading')?.textContent || '';
          return { byline, legend, gradient, facility };
        });
        const checks = {
          author: checkContent.byline.includes('Yu Chen'),
          projectDate: checkContent.byline.includes('24 October 2026'),
          mapScale: checkContent.legend.includes('65%') && checkContent.legend.includes('100%'),
          mapGradient: checkContent.gradient.includes('237, 240, 248') && checkContent.gradient.includes('91, 90, 147'),
          locationScope: checkContent.facility.includes('not a complete list')
        };
        view.rubricChecks = checks;
        if (Object.values(checks).some(ok => !ok)) {
          view.errors.push('Rubric-specific content validation failed: ' + JSON.stringify(checks));
        }
        const select7 = page.locator('#section-07 .dv2-control-toolbar select');
        if (await select7.count() === 1) {
          const kpis = page.locator('#section-07 [data-chart7-kpis] .callout-number');
          const valuesMatch = async (left, right) => {
            await page.waitForFunction(
              args => {
                const values = [...document.querySelectorAll('#section-07 [data-chart7-kpis] .callout-number')]
                  .map(x => x.textContent.trim());
                return values[0] === args.left && values[1] === args.right;
              }, {left, right}, {timeout: 12000}
            );
          };
          try {
            await select7.selectOption('Cat');
            await page.waitForTimeout(600);
            view.rubricChecks.chart7AfterCats = {
              selection: await select7.inputValue(),
              kpis: await kpis.allTextContents(),
              aside: await page.locator('#section-07 .dv2-story-aside').innerText(),
              connected: await select7.getAttribute('data-dv2-story-connected')
            };
            await valuesMatch('26.7%', '74.1%');
            await page.waitForFunction(() =>
              (document.querySelector('#section-07 .dv2-story-aside strong')?.textContent || '').startsWith('Cats:'),
              {timeout: 12000});
            await select7.selectOption('Dog');
            await valuesMatch('26.4%', '58.3%');
            view.rubricChecks.chart7SyncedToSpecies = true;
          } catch(error) {
            view.rubricChecks.chart7SyncedToSpecies = false;
            view.errors.push('Chart 7 KPIs failed to follow species selector: ' + String(error));
          }
        } else {
          view.errors.push('Chart 7 species selector is missing');
        }
      }
      if (config.name === 'desktop') {
        // Interactive narrative must describe the selected data, not a stale default.
        for (const [id, option, expected, reset] of [
          ['section-08', 'VIC', 'Victoria:', 'QLD'],
          ['section-09', 'Dogs', 'Dogs in 2024–25:', 'Dogs + cats']
        ]) {
          const menu = page.locator('#' + id + ' .dv2-control-toolbar select');
          const finding = page.locator('#' + id + ' .dv2-story-aside p:not(.dv2-story-kicker)').first();
          try {
            if (await menu.count() !== 1) throw new Error('Expected one selector');
            await menu.selectOption(option);
            await page.waitForFunction(({id, expected}) => {
              const panel = document.querySelector('#' + id + ' .dv2-story-aside p:not(.dv2-story-kicker)');
              return (panel?.textContent || '').startsWith(expected);
            }, {id, expected}, {timeout:12000});
            view.rubricChecks['dynamicStory' + id] = {value:await menu.inputValue(),finding:(await finding.innerText()).slice(0,140)};
            await menu.selectOption(reset);
          } catch (error) {
            view.errors.push('Dynamic story failed for ' + id + ': ' + String(error));
          }
        }
      }
      if (config.name === 'desktop') {
        const selects = page.locator('.dv2-control-toolbar select');
        for (let i = 0, n = await selects.count(); i < n; i++) {
          const select = selects.nth(i);
          const initial = await select.evaluate(el => ({
            value: el.value,
            options: [...el.options].map(option => ({ label: option.label, value: option.value })),
          }));
          const item = { control: i + 1, labels: initial.options.map(option => option.label), switched: false, error: null };
          const other = initial.options.find(option => option.value !== initial.value);
          if (other) {
            try {
              await select.selectOption(other.value);
              item.switched = (await select.inputValue()) === other.value;
              await select.selectOption(initial.value);
            } catch (error) { item.error = String(error); }
          }
          view.controls.push(item);
        }
        try { await page.screenshot({ path: path.join(outputDir, 'full-desktop.png'), fullPage: true, timeout: 40000, animations: 'disabled' }); }
        catch (error) { view.errors.push('Desktop full page screenshot: ' + String(error)); }
      }
    } catch (error) { view.errors.push('Navigation: ' + String(error)); }
    await context.close();
  }
} finally { await browser.close(); }

report.passed = report.views.every(view =>
  view.httpStatus === 200 &&
  view.chartResults.length === 14 &&
  view.chartResults.every(chart => chart.rendered && (view.viewport.width < 1024 || !chart.internalOverflow)) &&
  !view.overflow?.overflowing &&
  !view.errors.some(error => /Navigation:|Uncaught|could not render|failed to render|Story order mismatch|Rubric-specific|Stale embed script|Chart 11 spec is stale|Butterfly text visibility|Chart 7 KPI|Chart 7 species|Dynamic story failed/i.test(error))
);
const lines = ['# DV2 Browser Audit', '', 'Website: ' + URL, 'Checked: ' + report.checkedUTC, 'Result: ' + (report.passed ? 'PASS' : 'REVIEW REQUIRED'), ''];
for (const view of report.views) {
  lines.push('## ' + view.viewport.name + ' (' + view.viewport.width + ' × ' + view.viewport.height + ')');
  lines.push('HTTP: ' + view.httpStatus);
  lines.push('Horizontal overflow: ' + (view.overflow?.overflowing ? 'YES' : 'no'));
  lines.push('');
  lines.push('| Chart | Rendered | Visible host size |', '|---|---|---|');
  for (const item of view.chartResults) {
    lines.push('| ' + item.number + ' ' + item.name + ' | ' + (item.rendered ? 'Yes' : 'NO') +
      ' | ' + (item.bounds ? item.bounds.width + '×' + item.bounds.height : 'missing') + (item.internalOverflow ? ' ⚠ inner horizontal overflow' : '') + ' |');
  }
  if (view.viewport.name === 'desktop') {
    lines.push('', '### Rubric content and interaction checks', JSON.stringify(view.rubricChecks || {}, null, 2));
    lines.push('', '### Filters');
    for (const control of view.controls) {
      lines.push('- ' + control.control + ': ' + (control.switched ? 'switch OK' : 'NOT VERIFIED') +
        ' (' + control.labels.join(', ') + ')' + (control.error ? ' ERROR: ' + control.error : ''));
    }
  }
  if (view.errors.length) lines.push('', '### Console and page errors', ...view.errors.slice(0, 20).map(e => '- ' + e));
  if (view.failedRequests.length) lines.push('', '### Failed requests', ...view.failedRequests.slice(0, 20).map(e => '- ' + e));
  lines.push('');
}
fs.writeFileSync(path.join(outputDir, 'report.md'), lines.join('\n'));
fs.writeFileSync(path.join(outputDir, 'results.json'), JSON.stringify(report, null, 2));
console.log(lines.join('\n'));
if (!report.passed) process.exitCode = 1;
