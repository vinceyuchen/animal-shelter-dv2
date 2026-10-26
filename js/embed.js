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
