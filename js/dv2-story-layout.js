/* DV2 CONTROLS AND STORY LAYOUT */
(function () {
  "use strict";
  const chartHosts = [
    "map-live-release", "map-caseload", "vis-chart7",
    "chart8-annual-caseload", "chart9-yoy-bump", "chart10-outcome-sankey"
  ];
  function init() {
    chartHosts.forEach(function (id) {
      const host = document.getElementById(id);
      if (!host) return;
      const card = host.closest(".vis-card, .chart-card") || host.parentElement;
      if (!card) return;
      let observer;
      function moveControl() {
        if (card.querySelector(".dv2-control-toolbar")) {
          if (observer) observer.disconnect();
          return;
        }
        const bindings = card.querySelector(".vega-bindings");
        if (!bindings) return;
        if (observer) observer.disconnect();
        const toolbar = document.createElement("div");
        toolbar.className = "dv2-control-toolbar";
        toolbar.setAttribute("role", "group");
        toolbar.setAttribute("aria-label", "Chart controls");
        card.insertBefore(toolbar, card.firstChild);
        toolbar.appendChild(bindings);
      }
      moveControl();
      if (!card.querySelector(".dv2-control-toolbar")) {
        observer = new MutationObserver(moveControl);
        observer.observe(card, { childList: true, subtree: true });
      }
    });
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
