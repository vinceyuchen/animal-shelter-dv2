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
