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

    const formatRate = row => Number(row.share_pct).toFixed(1) + "%";
    const name = code => states[code] || code;
    // Select cards directly by section ID. The Vega controls are reparented at
    // runtime, so anchoring card updates to the story aside can miss the cards.
    const cards = document.querySelectorAll("#section-07 [data-chart7-kpis] .callout");
    if (cards.length === 2) {
      const eNumber = cards[0].querySelector(".callout-number");
      const eLabel = cards[0].querySelector(".callout-label");
      const rNumber = cards[1].querySelector(".callout-number");
      const rLabel = cards[1].querySelector(".callout-label");
      if (eNumber) eNumber.textContent = formatRate(euth);
      if (eLabel) eLabel.textContent = (species === "Dog" ? "Dogs" : "Cats") + " · " + name(euth.state) + ": highest euthanasia share";
      if (rNumber) rNumber.textContent = formatRate(rehomed);
      if (rLabel) rLabel.textContent = (species === "Dog" ? "Dogs" : "Cats") + " · " + name(rehomed.state) + ": highest rehoming share";
    } else {
      console.warn("Chart 7 key percentage cards could not be located.", cards.length);
    }

    writeInsight(aside,
      (species === "Dog" ? "Dogs" : "Cats") + ": " + name(euth.state) +
      " had the highest euthanasia share (" + formatRate(euth) +
      "), while " + name(rehomed.state) +
      " had the highest rehoming share (" + formatRate(rehomed) + ").",
      "The heatmap and key percentages refer only to the selected species. " +
      "Each rate divides an outcome count by that jurisdiction's recorded species total, " +
      "not all Australian shelter outcomes."
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

  // Species identity is a fixed categorical mapping. Map fill encodes a different
  // quantitative variable (rate on Chart 1, neutral count symbols on Chart 2).
  function connectSpeciesCue(id, card) {
    if (id !== "map-live-release" && id !== "map-caseload") return;
    const cue = card.querySelector(".dv2-species-cue");
    const select = card.querySelector(".dv2-control-toolbar select");
    if (!cue || !select || select.dataset.dv2SpeciesCueConnected === "yes") return;
    select.dataset.dv2SpeciesCueConnected = "yes";
    const label = cue.querySelector(".dv2-species-cue-value");
    const update = () => {
      const value = select.value;
      const choice = value === "Dog" ? "dogs" : value === "Cat" ? "cats" : "both";
      cue.dataset.speciesChoice = choice;
      if (label) label.textContent = choice === "dogs" ? "Dogs" :
        choice === "cats" ? "Cats" : "Dogs + cats";
    };
    select.addEventListener("change", update);
    update();
  }

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
    fetch(src, {cache: "no-cache"})
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
          connectSpeciesCue(id, card);
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
        connectSpeciesCue(id, card);
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
