const embedOptions = {
  actions: false,
  renderer: "svg"
};

vegaEmbed("#map-live-release", "charts/map_live_release.vg.json?v=20261014-3", embedOptions)
  .catch(console.error);

vegaEmbed("#map-caseload", "charts/map_caseload_symbols.vg.json?v=20261014-3", embedOptions)
  .catch(console.error);

vegaEmbed("#map-locations", "charts/map_rspca_locations.vg.json", embedOptions)
  .catch(console.error);

vegaEmbed("#connected-dot-lrr", "charts/connected_dot_lrr.vg.json?v=20261014-6", embedOptions)
  .catch(console.error);

const chartHosts = document.querySelectorAll(".vis-host");
if (chartHosts.length >= 5) {
  vegaEmbed(chartHosts[4], "charts/chart5_compare.vg.json?v=20261014-2", embedOptions)
    .catch(console.error);
}
