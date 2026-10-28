const embedOptions = {
  actions: false,
  renderer: "svg"
};

// Mobile maps must be recompiled with a full plot width. Scaling a compact
// 'container' SVG to 1100px makes its title enormous while enlarging tiny marks.
async function embedResponsiveMap(target, url) {
  if (!window.matchMedia("(max-width:850px)").matches) {
    return vegaEmbed(target, url, embedOptions);
  }
  const response = await fetch(url);
  if (!response.ok) throw new Error("Map specification unavailable: " + url);
  const spec = await response.json();
  spec.width = 850;
  spec.autosize = {type:"pad",contains:"padding",resize:false};
  return vegaEmbed(target, spec, embedOptions);
}

embedResponsiveMap("#map-live-release", "charts/map_live_release.vg.json?v=20261028-dynamic-labels1")
  .catch(console.error);
embedResponsiveMap("#map-caseload", "charts/map_caseload_symbols.vg.json?v=20261028-fixed-area1")
  .catch(console.error);

vegaEmbed("#map-locations-plot", "charts/map_rspca_locations.vg.json?v=20261028-sample-note1", embedOptions)
  .catch(console.error);

vegaEmbed("#connected-dot-lrr", "charts/connected_dot_lrr.vg.json?v=20261028-anotations1", embedOptions)
  .catch(console.error);

vegaEmbed("#butterfly-euthanasia", "charts/chart5_compare.vg.json?v=20261028-contrast-fix", embedOptions)
  .catch(console.error);

vegaEmbed("#outcome-composition", "charts/outcome_composition.vg.json?v=20261027-colour13-v1", embedOptions)
  .catch(console.error);


/* CHART7 EMBED START */
(function () {
  function renderChart7() {
    const host = document.getElementById("vis-chart7");
    if (!host) return;

    function showError(error) {
      console.error("Chart 7 error:", error);
      host.textContent =
        "Chart 7 could not load. Please check the browser console.";
      host.style.color = "#a33b36";
      host.style.padding = "24px";
    }

    try {
      vegaEmbed(
        "#vis-chart7",
        "charts/chart7_outcome_heatmap.vg.json?v=20261028-type-polish2",
        { actions: false, renderer: "svg" }
      ).catch(showError);
    } catch (error) {
      showError(error);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderChart7, {
      once: true
    });
  } else {
    renderChart7();
  }
})();
/* CHART7 EMBED END */

/* CHART8 EMBED START */
vegaEmbed("#chart8-annual-caseload", "charts/chart8_annual_caseload.vg.json?v=20261027-colour13-v1",
  {actions:false,renderer:"svg"}).catch(function(err) {
    console.error("Chart 8:",err);
    const el=document.getElementById("chart8-annual-caseload");
    if(el) el.textContent="Chart 8 could not render. See the browser console.";
  });
/* CHART8 EMBED END */

/* CHART9 EMBED START */
(function() {
  function renderChart9() {
    const host = document.getElementById("chart9-yoy-bump");
    if (!host) return;
    vegaEmbed(
      "#chart9-yoy-bump",
      "charts/chart9_yoy_bump.vg.json?v=20261028-r3-cleanlegend2",
      { actions: false, renderer: "svg" }
    ).catch(function(error) {
      console.error("Chart 9 error:", error);
      host.textContent = "Chart 9 could not load. Check the browser console.";
      host.style.color = "#a33b36";
      host.style.padding = "20px";
    });
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderChart9, { once: true });
  } else {
    renderChart9();
  }
})();
/* CHART9 EMBED END */

/* CHART10 EMBED START */
(function () {
  function renderChart10() {
    const host = document.getElementById("chart10-outcome-sankey");
    if (!host) return;
    const showError = function (error) {
      console.error("Chart 10 error:", error);
      host.textContent = "Chart 10 could not render. Check the browser console.";
      host.style.padding = "24px";
      host.style.color = "#a33b36";
    };
    vegaEmbed(
      "#chart10-outcome-sankey",
      "charts/chart10_outcome_sankey.vg.json?v=20261028-type-polish2",
      { actions: false, renderer: "svg", mode: "vega" }
    ).catch(showError);
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderChart10, { once: true });
  } else {
    renderChart10();
  }
})();
/* CHART10 EMBED END */

/* CHART11 EMBED START */
vegaEmbed('#chart11-foster','charts/chart11_foster_lollipop.vg.json?v=20261028-type1',{actions:false,renderer:'svg'})
  .catch(function(err){
    console.error('Chart 11 error:',err);
    const el=document.getElementById('chart11-foster');
    if(el) el.textContent='Chart 11 could not render. Check the browser console.';
  });
/* CHART11 EMBED END */

/* CHART12 EMBED START */
(function () {
  function renderChart12() {
    const host = document.getElementById("chart12-cat-share-slope");
    if (!host) return;
    vegaEmbed(
      "#chart12-cat-share-slope",
      "charts/chart12_cat_share_slope.vg.json?v=20261028-r3-dash1",
      { actions: false, renderer: "svg" }
    ).catch(function (error) {
      console.error("Chart 12 rendering error:", error);
      host.textContent = "Chart 12 could not load. Please check the browser console.";
      host.style.color = "#a33b36";
      host.style.padding = "20px";
    });
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderChart12, { once: true });
  } else {
    renderChart12();
  }
})();
/* CHART12 EMBED END */

/* CHART13 EMBED START */
(function() {
  function renderChart13() {
    const target = document.getElementById('chart13-townsville');
    if (!target) return;
    vegaEmbed('#chart13-townsville', 'charts/chart13_townsville_seasonality.vg.json?v=20261028-local-palette3',
      { actions:false, renderer:'svg' }).catch(function(error) {
        console.error('Chart 13 error:', error);
        target.textContent = 'Chart 13 could not render. Check the browser console.';
      });
  }
  if (document.readyState === 'loading')
    document.addEventListener('DOMContentLoaded', renderChart13, {once:true});
  else renderChart13();
})();
/* CHART13 EMBED END */

/* CHART14 TREEMAP EMBED START */
(function(){
  const target=document.getElementById("chart14-foster-treemap");
  if(!target) return;
  vegaEmbed("#chart14-foster-treemap","charts/chart14_foster_treemap.vg.json?v=20261028-type2",{actions:false,renderer:"svg"})
    .catch(function(error){console.error("Chart 14 treemap error:",error);target.textContent="Chart 14 could not render. Please check the browser console.";});
})();
/* CHART14 TREEMAP EMBED END */
