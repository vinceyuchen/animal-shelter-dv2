const embedOptions = {
  actions: false,
  renderer: "svg"
};

vegaEmbed("#map-live-release", "charts/map_live_release.vg.json", embedOptions)
  .catch(console.error);

vegaEmbed("#map-caseload", "charts/map_caseload_symbols.vg.json", embedOptions)
  .catch(console.error);
