const embedOptions = {
  actions: false,
  renderer: "svg"
};

vegaEmbed("#map-live-release", "charts/map_live_release.vg.json?v=20261027-typefix", embedOptions)
  .catch(console.error);

vegaEmbed("#map-caseload", "charts/map_caseload_symbols.vg.json?v=20261027-typefix", embedOptions)
  .catch(console.error);

vegaEmbed("#map-locations", "charts/map_rspca_locations.vg.json?v=20261027-typefix", embedOptions)
  .catch(console.error);

vegaEmbed("#connected-dot-lrr", "charts/connected_dot_lrr.vg.json?v=20261027-typefix", embedOptions)
  .catch(console.error);

vegaEmbed("#butterfly-euthanasia", "charts/chart5_compare.vg.json?v=20261027-typefix", embedOptions)
  .catch(console.error);

vegaEmbed("#outcome-composition", "charts/outcome_composition.vg.json?v=20261027-typefix", embedOptions)
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
        "charts/chart7_outcome_heatmap.vg.json?v=20261027-repair2",
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
vegaEmbed("#chart8-annual-caseload", "charts/chart8_annual_caseload.vg.json?v=20261027-chart8-safe",
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
      "charts/chart9_yoy_bump.vg.json?v=20261027-chart9v1",
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
