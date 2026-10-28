import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const URL='https://vinceyuchen.github.io/animal-shelter-dv2/';
const outputDir='dv2-browser-audit';
fs.mkdirSync(outputDir,{recursive:true});
const report={url:URL,views:[],errors:[]};
const browser=await chromium.launch({headless:true});
try {
  for(const width of [768,390]) {
    const context=await browser.newContext({viewport:{width,height:850},deviceScaleFactor:1});
    const page=await context.newPage();
    const view={width,errors:[],checks:{}};
    report.views.push(view);
    page.on('pageerror', e=>view.errors.push('Page error: '+String(e)));
    try {
      const response=await page.goto(URL,{waitUntil:'domcontentloaded',timeout:60000});
      if(response?.status()!==200) view.errors.push('HTTP: '+response?.status());
      await page.waitForFunction(()=>document.querySelectorAll('.vega-embed svg, .vega-embed canvas').length>=14,{timeout:45000});
      await page.waitForTimeout(750);
      const result=await page.evaluate(()=>{
        const bounds=el=>{const r=el.getBoundingClientRect();return {width:r.width,top:r.top};};
        const effectiveText=(host,needle)=>{
          const svg=document.querySelector(host+' svg');
          const node=[...(svg?.querySelectorAll('text')||[])].find(el=>el.textContent?.includes(needle));
          if(!svg||!node)return null;
          const viewWidth=svg.viewBox?.baseVal?.width||parseFloat(svg.getAttribute('width'))||svg.getBoundingClientRect().width;
          return +(parseFloat(getComputedStyle(node).fontSize)*(svg.getBoundingClientRect().width/viewWidth)).toFixed(2);
        };
        const host=document.querySelector('#chart10-outcome-sankey');
        const scroll=document.querySelector('.vis-card.chart11-scroll');
        const cue=document.querySelector('#section-10 .dv2-mobile-chart-hint');
        const otherCue=document.querySelector('#section-11 .dv2-mobile-chart-hint');
        return {
          viewport:window.innerWidth,
          pageWidth:document.documentElement.scrollWidth,
          chartCount:document.querySelectorAll('.vega-embed svg, .vega-embed canvas').length,
          headline:getComputedStyle(document.querySelector('.hero h1')).fontSize,
          body:getComputedStyle(document.querySelector('#section-10 .section-heading > p:not(.eyebrow)')).fontSize,
          sankey:{
            viewportWidth:host.clientWidth,scrollWidth:host.scrollWidth,
            overflowX:getComputedStyle(host).overflowX,
            headerPx:effectiveText('#chart10-outcome-sankey','RECORDED OUTCOME'),
            numberPx:effectiveText('#chart10-outcome-sankey','23,284')
          },
          lollipop:{
            viewportWidth:scroll.clientWidth,scrollWidth:scroll.scrollWidth,
            overflowX:getComputedStyle(scroll).overflowX,
            labelPx:effectiveText('#chart11-foster','The Lost Dogs Home North Melbourne')
          },
          hints:{
            sankey:cue?getComputedStyle(cue).display:'missing',
            lollipop:otherCue?getComputedStyle(otherCue).display:'missing'
          }
        };
      });
      view.checks=result;
      if(result.chartCount<14) view.errors.push('Not all charts rendered');
      if(result.pageWidth>result.viewport+5) view.errors.push('Page-level horizontal overflow');
      if(!(result.sankey.scrollWidth>result.sankey.viewportWidth+50) ||
         !['auto','scroll'].includes(result.sankey.overflowX) ||
         !(result.sankey.headerPx>=13) || !(result.sankey.numberPx>=13)) {
        view.errors.push('Sankey text shrank or local swipe failed: '+JSON.stringify(result.sankey));
      }
      if(!(result.lollipop.scrollWidth>result.lollipop.viewportWidth+50) ||
         !['auto','scroll'].includes(result.lollipop.overflowX) ||
         !(result.lollipop.labelPx>=12)) {
        view.errors.push('Lollipop text shrank or local swipe failed: '+JSON.stringify(result.lollipop));
      }
      if(result.hints.sankey==='none' || result.hints.lollipop==='none') view.errors.push('Swipe cues must be visible');
      if(parseFloat(result.body)<16) view.errors.push('Main body type below 16px');
      for(const id of ['10','11','07','01']){
        const section=page.locator('#section-'+id);
        await section.screenshot({path:path.join(outputDir,'mobile-'+width+'-chart-'+id+'.png'),timeout:30000,animations:'disabled'});
      }
    } catch(e) {
      view.errors.push(String(e));
    } finally {await context.close();}
  }
} finally {await browser.close();}
report.passed=report.views.every(v=>v.errors.length===0);
fs.writeFileSync(path.join(outputDir,'mobile-typography.json'),JSON.stringify(report,null,2));
console.log(JSON.stringify(report,null,2));
if(!report.passed)process.exitCode=1;
