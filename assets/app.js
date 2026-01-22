// Guest-post marketplace (static) — load JSON + render cards + search/filter/sort

let allSites = [];
let filtered = [];

const elSearch = document.getElementById("search");
const elCountry = document.getElementById("countryFilter");
const elSort = document.getElementById("sort");
const elResults = document.getElementById("results");
const elCount = document.getElementById("count");

function formatNum(n) {
  return new Intl.NumberFormat("en-US").format(n);
}

function render(list) {
  elResults.innerHTML = "";

  if (!list.length) {
    elResults.innerHTML = `<div class="card"><strong>No results</strong><div class="line">Try removing some filters.</div></div>`;
    elCount.textContent = "0 results";
    return;
  }

  const frag = document.createDocumentFragment();

  list.forEach((s) => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <strong>${s.domain}</strong>
      <div class="line">${s.niche} • ${s.country}</div>
      <div class="line">DA ${s.da} • DR ${s.dr} • Spam ${s.spamScore}</div>
      <div class="line">Traffic: ${formatNum(s.traffic)} / month</div>

      <div>
        <span class="badge">${s.dofollow ? "Dofollow" : "Nofollow"}</span>
        <span class="badge">${s.linkType}</span>
        <span class="badge">${s.turnAroundDays}d TAT</span>
      </div>

      <div class="price">€${s.priceEur}</div>
    `;

    frag.appendChild(card);
  });

  elResults.appendChild(frag);
  elCount.textContent = `${list.length} result${list.length === 1 ? "" : "s"}`;
}

function applyFilters() {
  const q = (elSearch.value || "").trim().toLowerCase();
  const country = elCountry.value;

  filtered = allSites.filter((s) => {
    const hay = `${s.domain} ${s.niche} ${s.country}`.toLowerCase();

    const matchQuery = !q || hay.includes(q);
    const matchCountry = !country || s.country === country;

    return matchQuery && matchCountry;
  });

  applySort();
  render(filtered);
}

function applySort() {
  const v = elSort.value;
  if (!v) return;

  const sorters = {
    priceAsc: (a, b) => a.priceEur - b.priceEur,
    priceDesc: (a, b) => b.priceEur - a.priceEur,
    trafficDesc: (a, b) => b.traffic - a.traffic,
  };

  filtered.sort(sorters[v] || (() => 0));
}

// simple debounce
function debounce(fn, ms = 300) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
}

function populateCountries(sites) {
  const countries = [...new Set(sites.map((s) => s.country))].sort();
  for (const c of countries) {
    const opt = document.createElement("option");
    opt.value = c;
    opt.textContent = c;
    elCountry.appendChild(opt);
  }
}

async function init() {
  try {
    const res = await fetch("data/sites.json");
    allSites = await res.json();

    populateCountries(allSites);
    filtered = [...allSites];
    render(filtered);

    elSearch.addEventListener("input", debounce(applyFilters, 300));
    elCountry.addEventListener("change", applyFilters);
    elSort.addEventListener("change", () => {
      applySort();
      render(filtered);
    });
  } catch (e) {
    console.error(e);
    elResults.innerHTML = `<div class="card"><strong>Error</strong><div class="line">Could not load data/sites.json</div></div>`;
    elCount.textContent = "Error";
  }
}

init();
