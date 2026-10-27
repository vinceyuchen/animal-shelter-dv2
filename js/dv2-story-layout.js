/* DV2: accessible Vega controls and data-driven story panels */
(function () {
  "use strict";

  const chartHosts = [
    "map-live-release", "map-caseload", "vis-chart7",
    "chart8-annual-caseload", "chart9-yoy-bump", "chart10-outcome-sankey"
  ];
  const chartSources = {
    "vis-chart7": "charts/chart7_outcome_heatmap.vg.json",
    "chart8-annual-caseload": "charts/chart8_annual_caseload.vg.json",
    "chart9-yoy-bump": "charts/chart9_yoy_bump.vg.json"
  };
  const states = {
    ACT: "ACT", NSW: "New South Wales", NT: "Northern Territory",
    QLD: "Queensland", SA: "South Australia", TAS: "Tasmania",
    VIC: "Victoria", WA: "Western Australia"
  };
  const commas = new Intl.NumberFormat("en-AU");
  const percent = value => (value > 0 ? "+" : "") + Number(value).toFixed(1) + "%";

  function writeInsight(aside, headline, detail) {
    if (!aside) return;
    const paragraphs = aside.querySelectorAll("p:not(.dv2-story-kicker)");
    if (paragraphs.length < 2) return;
    const strong = document.createElement("strong");
    strong.textContent = headline;
    paragraphs[0].replaceChildren(strong);
    paragraphs[1].textContent = detail;
  }

  function describeChart7(data, selection, aside) {
    const species = selection === "Cat" ? "Cat" : "Dog";
    const filtered = data.filter(row => row.species === species);
    const maxShare = category => filtered
      .filter(row => row.outcome_group === category)
      .reduce((best, row) => !best || row.share_pct > best.share_pct ? row : best, null);
    const euth = maxShare("Euthanased");
    const rehomed = maxShare("Rehomed");
    if (!euth || !rehomed) return;
    writeInsight(aside,
      species + " outcomes: " + states[euth.state] +
      " had the highest euthanasia share (" + euth.share_pct.toFixed(1) +
      "%), while " + states[rehomed.state] +
      " had the highest rehoming share (" + rehomed.share_pct.toFixed(1) + "%).",
      "Percentages use each jurisdiction's recorded " +
      species.toLowerCase() + " outcomes as the denominator. They do not compare all Australian shelters."
    );
  }

  function describeChart8(data, selection, aside) {
    const code = states[selection] ? selection : "QLD";
    const values = {};
    for (const species of ["Dogs", "Cats"]) {
      const start = data.find(row => row.state === code &&
        row.species === species && row.financial_year === "2020-21");
      const end = data.find(row => row.state === code &&
        row.species === species && row.financial_year === "2024-25");
      if (!start || !end || !start.count) return;
      values[species] = {
        first: start.count, last: end.count,
        change: 100 * (end.count - start.count) / start.count
      };
    }
    writeInsight(aside,
      states[code] + ": cats " + commas.format(values.Cats.first) +
      " to " + commas.format(values.Cats.last) +
      " (" + percent(values.Cats.change) + "); dogs " +
      commas.format(values.Dogs.first) + " to " + commas.format(values.Dogs.last) +
      " (" + percent(values.Dogs.change) + ").",
      "Changes compare 2020–21 with 2024–25 in RSPCA reported caseloads, " +
      "not all shelter admissions. Reporting scope and contracts can change."
    );
  }

  function describeChart9(data, selection, aside) {
    const metric = ["Dogs + cats", "Dogs", "Cats"].includes(selection) ?
      selection : "Dogs + cats";
    const latest = data
      .filter(row => row.metric === metric && row.financial_year === "2024-25")
      .sort((a, b) => a.rank - b.rank);
    if (latest.length !== 6 || latest[0].rank !== 1) return;
    const best = latest[0], last = latest[latest.length - 1];
    writeInsight(aside,
      metric + " in 2024–25: #1 " + states[best.state] +
      " (" + percent(best.change_pct) + "); #6 " +
      states[last.state] + " (" + percent(last.change_pct) + ").",
      "The ranking compares the year-on-year percentage change in reported " +
      "caseload across six RSPCA jurisdictions. Rank #1 means the largest " +
      "increase (or smallest decline), not better welfare outcomes."
    );
  }

  const describe = {
    "vis-chart7": describeChart7,
    "chart8-annual-caseload": describeChart8,
    "chart9-yoy-bump": describeChart9
  };

  function connectStory(id, card) {
    const src = chartSources[id];
    if (!src) return;
    const panel = card.closest(".dv2-story-grid")?.querySelector(".dv2-story-aside");
    const select = card.querySelector(".dv2-control-toolbar select");
    if (!panel || !select || select.dataset.dv2StoryConnected === "yes") return;
    select.dataset.dv2StoryConnected = "yes";
    let rows = null;
    const refresh = () => {
      if (rows) describe[id](rows, select.value, panel);
    };
    select.addEventListener("change", refresh);
    fetch(src, {cache: "force-cache"})
      .then(response => {
        if (!response.ok) throw new Error("Unable to load chart story data: " + src);
        return response.json();
      })
      .then(spec => {
        if (!Array.isArray(spec.data?.values)) throw new Error("Expected inline Vega-Lite data: " + src);
        rows = spec.data.values;
        refresh();
      })
      .catch(error => {
        console.warn("Data-driven insight unavailable; original chart remains usable.", error);
      });
  }

  function init() {
    chartHosts.forEach(id => {
      const host = document.getElementById(id);
      if (!host) return;
      const card = host.closest(".vis-card, .chart-card") || host.parentElement;
      if (!card) return;
      let observer = null;

      function moveControl() {
        const existing = card.querySelector(".dv2-control-toolbar");
        if (existing) {
          if (observer) observer.disconnect();
          connectStory(id, card);
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
        connectStory(id, card);
      }

      moveControl();
      if (!card.querySelector(".dv2-control-toolbar")) {
        observer = new MutationObserver(moveControl);
        observer.observe(card, {childList:true, subtree:true});
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, {once:true});
  } else {
    init();
  }
})();
