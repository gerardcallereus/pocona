/* ==========================================================
   POCONA: SIMULADOR D'IDH I INDICADORS SOCIALS & TECNOLÒGICS
   3 Països: Espanya (Molt Alt), Bolívia (Mitjà - Pocona), Txad (Baix)
   ========================================================== */

const idhCountriesData = [
  {
    id: "espanya",
    name: "Espanya / Catalunya",
    flag: "🇪🇸",
    tier: "Molt Alt",
    tierColor: "#10b981",
    subtitle: "Sud d’Europa • Capital: Madrid / Barcelona • IDH: 0,911 (Molt Alt)",
    real: {
      lifeExp: 83.6,
      schoolYears: 10.6,
      childMort: 3,
      electricity: 100,
      internet: 95,
      cleanWater: 98
    }
  },
  {
    id: "bolivia",
    name: "Bolívia",
    flag: "🇧🇴",
    tier: "Mitjà",
    tierColor: "#d97706",
    subtitle: "Amèrica del Sud • Regió Andina (Pocona) • IDH: 0,698 (Mitjà)",
    real: {
      lifeExp: 64.0,
      schoolYears: 9.2,
      childMort: 21,
      electricity: 94,
      internet: 65,
      cleanWater: 88
    }
  },
  {
    id: "txad",
    name: "Txad",
    flag: "🇹🇩",
    tier: "Baix",
    tierColor: "#e11d48",
    subtitle: "Àfrica Central (Sahel) • Capital: N’Djamena • IDH: 0,394 (Baix)",
    real: {
      lifeExp: 53.0,
      schoolYears: 2.6,
      childMort: 107,
      electricity: 11,
      internet: 18,
      cleanWater: 43
    }
  }
];

const idhIndicatorsMeta = [
  {
    key: "lifeExp",
    icon: "🎂",
    name: "Esperança de vida",
    question: "Quants anys s'espera que visqui una persona en néixer amb la sanitat actual?",
    unit: "anys",
    min: 40,
    max: 90,
    step: 0.5,
    defaultVal: 65
  },
  {
    key: "schoolYears",
    icon: "🎒",
    name: "Anys d'escolarització",
    question: "Quants anys passa de mitjana una persona a l'escola, institut o universitat?",
    unit: "anys",
    min: 1,
    max: 16,
    step: 0.5,
    defaultVal: 8
  },
  {
    key: "childMort",
    icon: "🏥",
    name: "Mortalitat infantil",
    question: "Quants infants moren abans de complir 5 anys per cada 1.000 nascuts vius?",
    unit: "per 1.000",
    min: 0,
    max: 150,
    step: 1,
    defaultVal: 30
  },
  {
    key: "electricity",
    icon: "💡",
    name: "Accés a l'electricitat",
    question: "Quin percentatge de la població disposa de corrent elèctric regular a la llar?",
    unit: "%",
    min: 0,
    max: 100,
    step: 1,
    defaultVal: 60
  },
  {
    key: "internet",
    icon: "📶",
    name: "Accés a Internet",
    question: "Quin percentatge de la població té connexió i utilitza la xarxa digital?",
    unit: "%",
    min: 0,
    max: 100,
    step: 1,
    defaultVal: 50
  },
  {
    key: "cleanWater",
    icon: "🚰",
    name: "Accés a aigua potable",
    question: "Quin percentatge de la població disposa d'accés segur i regular a aigua potable?",
    unit: "%",
    min: 0,
    max: 100,
    step: 1,
    defaultVal: 60
  }
];

let activeCountryIdx = 0;
const studentIdhEstimates = {};
const configuredCountries = new Set();

function initIdhSimulator() {
  idhCountriesData.forEach(c => {
    studentIdhEstimates[c.id] = studentIdhEstimates[c.id] || {};
    idhIndicatorsMeta.forEach(ind => {
      if (studentIdhEstimates[c.id][ind.key] === undefined) {
        studentIdhEstimates[c.id][ind.key] = ind.defaultVal;
      }
    });
  });
  renderCountryPills();
  renderActiveCountryForm();
}

function renderCountryPills() {
  const navContainer = document.getElementById("countryNavPills");
  if (!navContainer) return;
  navContainer.innerHTML = idhCountriesData.map((country, idx) => {
    const isActive = idx === activeCountryIdx ? "active" : "";
    const isConf = configuredCountries.has(country.id) ? "configured" : "";
    return `
      <button type="button" class="country-pill-btn ${isActive} ${isConf}" onclick="selectCountry(${idx})">
        <span class="flag-icon">${country.flag}</span>
        <span>${country.name}</span>
        <span class="pill-status-dot"></span>
      </button>
    `;
  }).join("");
}

function selectCountry(idx) {
  activeCountryIdx = idx;
  renderCountryPills();
  renderActiveCountryForm();
}

function navCountry(delta) {
  const newIdx = activeCountryIdx + delta;
  if (newIdx >= 0 && newIdx < idhCountriesData.length) {
    selectCountry(newIdx);
  }
}

function getActiveIndicators() {
  const currentLevel = (typeof getPoconaLevel === "function" ? getPoconaLevel() : localStorage.getItem("pocona_learning_level")) || "segur";
  if (currentLevel === "insegur") {
    // ESTRUCTURA REDUÏDA (MENYS INFO I MENYS DECISIONS): NOMÉS ELS 3 PILARS ESSENCIALS
    return idhIndicatorsMeta.filter(ind => ind.key === "lifeExp" || ind.key === "schoolYears" || ind.key === "cleanWater");
  }
  return idhIndicatorsMeta;
}

function renderActiveCountryForm() {
  const country = idhCountriesData[activeCountryIdx];
  if (!country) return;

  const flagEl = document.getElementById("activeFlag");
  const nameEl = document.getElementById("activeCountryName");
  const subEl = document.getElementById("activeCountrySubtitle");
  const tierCont = document.getElementById("activeTierBadgeContainer");
  const btnPrev = document.getElementById("btnPrevCountry");
  const btnNext = document.getElementById("btnNextCountry");

  if (flagEl) flagEl.textContent = country.flag;
  if (nameEl) nameEl.textContent = country.name;
  if (subEl) subEl.textContent = country.subtitle;
  if (tierCont) {
    tierCont.innerHTML = `<span class="tier-badge" style="background:${country.tierColor}20; color:${country.tierColor}; border:1px solid ${country.tierColor}40;">${country.tier}</span>`;
  }
  if (btnPrev) btnPrev.disabled = (activeCountryIdx === 0);
  if (btnNext) btnNext.disabled = (activeCountryIdx === idhCountriesData.length - 1);

  const formGrid = document.getElementById("indicatorsFormGrid");
  if (!formGrid) return;

  const currentLevel = (typeof getPoconaLevel === "function" ? getPoconaLevel() : localStorage.getItem("pocona_learning_level")) || "segur";
  const userVals = studentIdhEstimates[country.id];
  const activeIndicators = getActiveIndicators();

  // Visual Clue Banner for Insegur
  let levelBannerHtml = "";
  if (currentLevel === "insegur") {
    let clueText = "";
    if (country.id === "espanya") clueText = "🟢 <strong>Pista visual fàcil:</strong> Espanya té hospitals moderns, aigua i escoles per a tothom. Els valors seran molt <strong>ALTS</strong>.";
    if (country.id === "bolivia") clueText = "🟡 <strong>Pista visual fàcil:</strong> Bolívia té ciutats mitjanes, però al camp (com Pocona) costa més accedir als serveis. Valors <strong>MITJANS</strong>.";
    if (country.id === "txad") clueText = "🔴 <strong>Pista visual fàcil:</strong> Txad pateix pobresa severa. Falten hospitals, escoles i aigua neta. Els valors seran <strong>BAIXOS</strong>.";

    levelBannerHtml = `
      <div style="grid-column: 1 / -1; background: #ecfdf5; border: 2px solid #10b981; border-radius: 12px; padding: 0.9rem 1.2rem; margin-bottom: 0.75rem; font-size: 0.95rem; color: #065f46;">
        ${clueText}
        <div style="font-size: 0.85rem; color: #047857; margin-top: 0.35rem;">
          💡 <em>Pots arrossegar el botó o prémer directament els botons 🔴 Baix, 🟡 Mitjà o 🟢 Alt.</em>
        </div>
      </div>
    `;
  } else if (currentLevel === "segur") {
    levelBannerHtml = `
      <div style="grid-column: 1 / -1; background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 10px; padding: 0.75rem 1rem; margin-bottom: 0.75rem; font-size: 0.88rem; color: #0369a1;">
        🌱 <strong>Nivell Segur (Guiat):</strong> Compara com influeixen la salut, l'educació i les infraestructures en la qualitat de vida de cada regió.
      </div>
    `;
  }

  const cardsHtml = activeIndicators.map(ind => {
    const curVal = userVals[ind.key] !== undefined ? userVals[ind.key] : ind.defaultVal;
    const valFormatted = (ind.step < 1) ? Number(curVal).toFixed(1) : Math.round(curVal);

    // Quick buttons for 'insegur'
    let quickButtonsHtml = "";
    if (currentLevel === "insegur") {
      const vLow = ind.min + (ind.max - ind.min) * 0.2;
      const vMid = ind.min + (ind.max - ind.min) * 0.55;
      const vHigh = ind.min + (ind.max - ind.min) * 0.88;
      quickButtonsHtml = `
        <div style="display: flex; gap: 0.4rem; margin-top: 0.6rem; justify-content: flex-end;">
          <button type="button" class="btn btn-outline" style="padding: 0.25rem 0.55rem; font-size: 0.78rem;" onclick="setIndicatorValue('${ind.key}', ${vLow.toFixed(1)}, '${ind.unit}', ${ind.step})">🔴 Baix</button>
          <button type="button" class="btn btn-outline" style="padding: 0.25rem 0.55rem; font-size: 0.78rem;" onclick="setIndicatorValue('${ind.key}', ${vMid.toFixed(1)}, '${ind.unit}', ${ind.step})">🟡 Mitjà</button>
          <button type="button" class="btn btn-outline" style="padding: 0.25rem 0.55rem; font-size: 0.78rem;" onclick="setIndicatorValue('${ind.key}', ${vHigh.toFixed(1)}, '${ind.unit}', ${ind.step})">🟢 Alt</button>
        </div>
      `;
    }

    return `
      <div class="indicator-card">
        <div class="indicator-header">
          <div class="indicator-label-group">
            <span class="indicator-icon">${ind.icon}</span>
            <span class="indicator-name" title="${ind.name}">${ind.name}</span>
          </div>
          <div class="indicator-value-pill" id="valLabel_${ind.key}">
            <span class="val-number">${valFormatted}</span>
            <span class="val-unit">${ind.unit}</span>
          </div>
        </div>

        <p class="indicator-question">${ind.question}</p>

        <div class="indicator-slider-wrap">
          <input 
            type="range" 
            class="indicator-slider" 
            id="slider_${ind.key}"
            min="${ind.min}" 
            max="${ind.max}" 
            step="${ind.step}" 
            value="${curVal}"
            oninput="onSliderChange('${ind.key}', this.value, '${ind.unit}', ${ind.step})"
          >
          <div class="slider-range-labels">
            <span>Min: ${ind.min}</span>
            <span>Max: ${ind.max} ${ind.unit}</span>
          </div>
        </div>
        ${quickButtonsHtml}
      </div>
    `;
  }).join("");

  formGrid.innerHTML = levelBannerHtml + cardsHtml;
}

function setIndicatorValue(indKey, val, unit, step) {
  const slider = document.getElementById(`slider_${indKey}`);
  if (slider) slider.value = val;
  onSliderChange(indKey, val, unit, step);
}

function onSliderChange(indKey, val, unit, step) {
  const country = idhCountriesData[activeCountryIdx];
  const numericVal = parseFloat(val);
  studentIdhEstimates[country.id][indKey] = numericVal;
  configuredCountries.add(country.id);

  const label = document.getElementById(`valLabel_${indKey}`);
  if (label) {
    const valFormatted = (step < 1) ? numericVal.toFixed(1) : Math.round(numericVal);
    label.innerHTML = `<span class="val-number">${valFormatted}</span> <span class="val-unit">${unit}</span>`;
  }
  renderCountryPills();
}

function checkIdhPredictions() {
  const activeIndicators = getActiveIndicators();
  let totalRelativeError = 0;
  let count = 0;

  idhCountriesData.forEach(country => {
    const userVals = studentIdhEstimates[country.id];
    activeIndicators.forEach(ind => {
      const uVal = userVals[ind.key];
      const rVal = country.real[ind.key];
      const range = ind.max - ind.min;
      const error = Math.abs(uVal - rVal) / range;
      totalRelativeError += error;
      count++;
    });
  });

  const avgRelativeError = totalRelativeError / count;
  const score = Math.max(30, Math.min(100, Math.round((1 - avgRelativeError * 1.5) * 100)));

  const panel = document.getElementById("idhResultsPanel");
  if (!panel) return;
  panel.classList.add("open");

  const badgeEl = document.getElementById("resultsBadge");
  if (badgeEl) {
    let badgeTitle = "Explorador/a Global";
    if (score >= 85) badgeTitle = "🌟 Gran Saviesa Social i Geogràfica!";
    else if (score >= 70) badgeTitle = "🎯 Enginyer/a Humanitari/ària Compassiu/va";
    else badgeTitle = "🔍 Observador/a del Món en Formació";

    badgeEl.textContent = `🎯 Precisió Global: ${score}% — ${badgeTitle}`;
  }

  const grid = document.getElementById("comparisonGrid");
  if (grid) {
    grid.innerHTML = idhCountriesData.map(country => {
      const userVals = studentIdhEstimates[country.id];

      const rowsHtml = activeIndicators.map(ind => {
        const uVal = userVals[ind.key];
        const rVal = country.real[ind.key];
        const range = ind.max - ind.min;
        const diff = uVal - rVal;
        const absDiff = Math.abs(diff);

        const userPercent = Math.max(5, Math.min(100, ((uVal - ind.min) / range) * 100));
        const realPercent = Math.max(5, Math.min(100, ((rVal - ind.min) / range) * 100));

        const diffFormatted = (ind.step < 1) ? absDiff.toFixed(1) : Math.round(absDiff);
        let diffClass = "diff-exact";
        let diffText = "Exacte!";
        if (absDiff > range * 0.25) {
          diffClass = "diff-far";
          diffText = diff > 0 ? `+${diffFormatted} ${ind.unit}` : `-${diffFormatted} ${ind.unit}`;
        } else if (absDiff > 0.05) {
          diffClass = "diff-close";
          diffText = diff > 0 ? `+${diffFormatted} ${ind.unit}` : `-${diffFormatted} ${ind.unit}`;
        }

        const uValFormatted = (ind.step < 1) ? Number(uVal).toFixed(1) : Math.round(uVal);
        const rValFormatted = (ind.step < 1) ? Number(rVal).toFixed(1) : Math.round(rVal);

        return `
          <div class="comp-row">
            <div class="comp-row-header">
              <span class="comp-row-header-label">${ind.icon} ${ind.name}</span>
              <span class="comp-diff-pill ${diffClass}">${diffText}</span>
            </div>

            <!-- Barra Usuari -->
            <div class="comp-bar-item">
              <div class="comp-bar-legend">
                <span style="color:#2563eb;">La teva predicció:</span>
                <span style="color:#1d4ed8; font-weight:800;">${uValFormatted} ${ind.unit}</span>
              </div>
              <div class="comp-track">
                <div class="comp-fill-user" style="width: ${userPercent}%;"></div>
              </div>
            </div>

            <!-- Barra Realitat -->
            <div class="comp-bar-item">
              <div class="comp-bar-legend">
                <span style="color:#059669;">Dada real (ONU/Banc Mundial):</span>
                <span style="color:#047857; font-weight:800;">${rValFormatted} ${ind.unit}</span>
              </div>
              <div class="comp-track">
                <div class="comp-fill-real" style="width: ${realPercent}%;"></div>
              </div>
            </div>
          </div>
        `;
      }).join("");

      return `
        <div class="comparison-card">
          <div class="comp-country-header">
            <div class="comp-country-name">
              <span style="font-size: 2rem; line-height: 1;">${country.flag}</span>
              <div>
                <div>${country.name}</div>
                <div style="font-size: 0.8rem; color: var(--text-subtle); font-weight: 500;">IDH: ${country.tier}</div>
              </div>
            </div>
            <span class="tier-badge" style="background:${country.tierColor}20; color:${country.tierColor}; border:1px solid ${country.tierColor}40;">${country.tier}</span>
          </div>
          ${rowsHtml}
        </div>
      `;
    }).join("");
  }

  panel.scrollIntoView({ behavior: "smooth", block: "start" });
}

function resetIdhSimulator() {
  const panel = document.getElementById("idhResultsPanel");
  if (panel) panel.classList.remove("open");
  activeCountryIdx = 0;
  configuredCountries.clear();
  initIdhSimulator();
  const simBox = document.querySelector(".sim-interactive-box");
  if (simBox) simBox.scrollIntoView({ behavior: "smooth", block: "start" });
}

window.addEventListener("DOMContentLoaded", () => {
  if (typeof initIdhSimulator === "function") initIdhSimulator();
});

window.addEventListener("poconaLevelChanged", () => {
  if (typeof renderActiveCountryForm === "function") renderActiveCountryForm();
});
