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
  // Els 6 indicadors estan actius per a tots els nivells
  return idhIndicatorsMeta;
}

// --------------------------------------------------------------------------
// MAPPING DE REFERÈNCIA PER AL NIVELL INSEGUR (BAIX / MITJÀ / ALT)
// --------------------------------------------------------------------------
function getIndicatorRealTier(countryId, indKey) {
  const mapping = {
    espanya: {
      lifeExp: 'alt',      // 83.6 anys (Esperança de vida molt alta)
      schoolYears: 'alt',  // 10.6 anys (Escolarització perllongada)
      childMort: 'baix',   // 3 per 1.000 (Mortalitat molt baixa)
      electricity: 'alt',  // 100% (Universal)
      internet: 'alt',     // 95% (Fibra òptica i 4G/5G)
      cleanWater: 'alt'    // 98% (Aigua potable universal)
    },
    bolivia: {
      lifeExp: 'mitja',    // 64.0 anys (Franja mitjana)
      schoolYears: 'mitja',// 9.2 anys
      childMort: 'mitja',  // 21 per 1.000 (Mitjana)
      electricity: 'mitja',// 94% nacional (però al camp amb talls freqüents)
      internet: 'mitja',   // 65% nacional (però a Pocona <15%)
      cleanWater: 'mitja'  // 88%
    },
    txad: {
      lifeExp: 'baix',     // 53.0 anys (Molt baixa)
      schoolYears: 'baix', // 2.6 anys (Escassa escolarització)
      childMort: 'alt',    // 107 per 1.000 (Mortalitat infantil molt alta)
      electricity: 'baix', // 11% (Gravement insuficient)
      internet: 'baix',    // 18% (Molt baixa)
      cleanWater: 'baix'   // 43% (Manca severa d'aigua potable)
    }
  };
  return mapping[countryId]?.[indKey] || 'mitja';
}

function isTierCorrect(countryId, indKey, userTier) {
  if (!userTier) return false;
  const real = getIndicatorRealTier(countryId, indKey);
  if (userTier === real) return true;
  // A Bolívia l'electricitat té 94% estadístic nacional, acceptem tant 'mitja' com 'alt'
  if (countryId === 'bolivia' && indKey === 'electricity' && (userTier === 'mitja' || userTier === 'alt')) {
    return true;
  }
  return false;
}

function getTierBadgeHtml(tier) {
  if (tier === 'baix') return '<span class="insegur-tier-pill pill-baix">🔴 Baix</span>';
  if (tier === 'mitja') return '<span class="insegur-tier-pill pill-mitja">🟡 Mitjà</span>';
  if (tier === 'alt') return '<span class="insegur-tier-pill pill-alt">🟢 Alt</span>';
  return '<span style="color:#94a3b8; font-size:0.82rem;">Sense triar</span>';
}

function getUserTier(countryId, indKey) {
  if (studentIdhEstimates[countryId] && studentIdhEstimates[countryId][indKey + '_tier']) {
    return studentIdhEstimates[countryId][indKey + '_tier'];
  }
  const val = studentIdhEstimates[countryId]?.[indKey];
  const ind = idhIndicatorsMeta.find(m => m.key === indKey);
  if (ind && val !== undefined) {
    const pct = (val - ind.min) / (ind.max - ind.min);
    if (pct < 0.35) return 'baix';
    if (pct < 0.70) return 'mitja';
    return 'alt';
  }
  return null;
}

function selectInsegurTier(indKey, tier) {
  const country = idhCountriesData[activeCountryIdx];
  const ind = idhIndicatorsMeta.find(m => m.key === indKey);
  studentIdhEstimates[country.id][indKey + '_tier'] = tier;

  // Sincronitzar valor numèric equivalent per si canvia a mode segur/agoserat
  if (ind) {
    let numericVal;
    if (tier === 'baix') numericVal = ind.min + (ind.max - ind.min) * 0.2;
    else if (tier === 'mitja') numericVal = ind.min + (ind.max - ind.min) * 0.55;
    else numericVal = ind.min + (ind.max - ind.min) * 0.88;
    studentIdhEstimates[country.id][indKey] = numericVal;
  }
  configuredCountries.add(country.id);
  renderActiveCountryForm();
  renderCountryPills();
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

  // Banner didàctic de nivell
  let levelBannerHtml = "";
  if (currentLevel === "insegur") {
    let clueText = "";
    if (country.id === "espanya") {
      clueText = "🇪🇸 <strong>Espanya / Catalunya:</strong> Té sanitat gratuïta, escoles universals i xarxa moderna. La majoria dels indicadors seran <strong>🟢 ALTS</strong> (i la mortalitat serà molt <strong>🔴 BAIXA</strong>).";
    } else if (country.id === "bolivia") {
      clueText = "🇧🇴 <strong>Bolívia (on està Pocona):</strong> Té hospitals i universitats a les ciutats, però al camp aïllat costa molt arribar-hi. Valors en franja <strong>🟡 MITJANA</strong>.";
    } else if (country.id === "txad") {
      clueText = "🇹🇩 <strong>Txad (Àfrica):</strong> Pateix pobresa extrema. Falta aigua potable i metges. Valors <strong>🔴 BAIXOS</strong> (i la mortalitat infantil serà <strong>🟢 ALTA</strong> perquè moren massa infants).";
    }

    levelBannerHtml = `
      <div style="grid-column: 1 / -1; background: #ecfdf5; border: 2px solid #10b981; border-radius: 12px; padding: 1rem 1.25rem; margin-bottom: 0.75rem; font-size: 0.95rem; color: #064e3b;">
        <div style="font-weight: 800; font-size: 1.05rem; margin-bottom: 0.35rem; display:flex; align-items:center; gap:0.4rem;">
          <span>🌱</span> Mode Insegur: Tria directament 🔴 Baix, 🟡 Mitjà o 🟢 Alt per als 6 indicadors
        </div>
        <p style="margin: 0.25rem 0 0.5rem 0; line-height: 1.45;">${clueText}</p>
        <div style="font-size: 0.85rem; color: #047857; font-weight: 600;">
          👉 <em>Fes clic sobre el botó que creguis correcte a cadascun dels 6 indicadors.</em>
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
    // RENDERITZACIÓ ESPECÍFICA NIVELL INSEGUR (BOTONS TIER: BAIX / MITJÀ / ALT)
    if (currentLevel === "insegur") {
      const curTier = getUserTier(country.id, ind.key);
      const isSelectedBaix = curTier === 'baix' ? 'selected' : '';
      const isSelectedMitja = curTier === 'mitja' ? 'selected' : '';
      const isSelectedAlt = curTier === 'alt' ? 'selected' : '';

      return `
        <div class="indicator-card">
          <div class="indicator-header">
            <div class="indicator-label-group">
              <span class="indicator-icon">${ind.icon}</span>
              <span class="indicator-name" title="${ind.name}">${ind.name}</span>
            </div>
            <div id="valLabel_${ind.key}">
              ${getTierBadgeHtml(curTier)}
            </div>
          </div>

          <p class="indicator-question" style="margin: 0.4rem 0 0.75rem 0; min-height: 40px;">
            ${ind.question}
          </p>

          <div style="font-size: 0.82rem; font-weight: 700; color: #475569; margin-bottom: 0.35rem;">
            Tria la teva estimació:
          </div>

          <div class="insegur-tier-selector">
            <button type="button" 
                    class="btn-tier-select tier-baix ${isSelectedBaix}" 
                    onclick="selectInsegurTier('${ind.key}', 'baix')">
              🔴 Baix
            </button>
            <button type="button" 
                    class="btn-tier-select tier-mitja ${isSelectedMitja}" 
                    onclick="selectInsegurTier('${ind.key}', 'mitja')">
              🟡 Mitjà
            </button>
            <button type="button" 
                    class="btn-tier-select tier-alt ${isSelectedAlt}" 
                    onclick="selectInsegurTier('${ind.key}', 'alt')">
              🟢 Alt
            </button>
          </div>
        </div>
      `;
    }

    // RENDERITZACIÓ NIVELL SEGUR I AGOSERAT (SLIDERS NUMÈRICS TRADICIONALS)
    const curVal = userVals[ind.key] !== undefined ? userVals[ind.key] : ind.defaultVal;
    const valFormatted = (ind.step < 1) ? Number(curVal).toFixed(1) : Math.round(curVal);

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

  // Actualitzar tier sincronitzat
  const ind = idhIndicatorsMeta.find(m => m.key === indKey);
  if (ind) {
    const pct = (numericVal - ind.min) / (ind.max - ind.min);
    if (pct < 0.35) studentIdhEstimates[country.id][indKey + '_tier'] = 'baix';
    else if (pct < 0.70) studentIdhEstimates[country.id][indKey + '_tier'] = 'mitja';
    else studentIdhEstimates[country.id][indKey + '_tier'] = 'alt';
  }

  configuredCountries.add(country.id);

  const label = document.getElementById(`valLabel_${indKey}`);
  if (label) {
    const valFormatted = (step < 1) ? numericVal.toFixed(1) : Math.round(numericVal);
    label.innerHTML = `<span class="val-number">${valFormatted}</span> <span class="val-unit">${unit}</span>`;
  }
  renderCountryPills();
}

function checkIdhPredictions() {
  const currentLevel = (typeof getPoconaLevel === "function" ? getPoconaLevel() : localStorage.getItem("pocona_learning_level")) || "segur";
  const activeIndicators = getActiveIndicators();

  const panel = document.getElementById("idhResultsPanel");
  if (!panel) return;
  panel.classList.add("open");

  const badgeEl = document.getElementById("resultsBadge");
  const summaryEl = document.getElementById("resultsSummaryText");
  const grid = document.getElementById("comparisonGrid");

  // ==========================================================
  // MODE INSEGUR: VERIFICACIÓ DIRECTA DE TIER (BAIX / MITJÀ / ALT)
  // ==========================================================
  if (currentLevel === "insegur") {
    let totalEncerts = 0;
    const totalQuestions = idhCountriesData.length * activeIndicators.length; // 3 x 6 = 18

    idhCountriesData.forEach(country => {
      activeIndicators.forEach(ind => {
        const uTier = getUserTier(country.id, ind.key);
        if (isTierCorrect(country.id, ind.key, uTier)) {
          totalEncerts++;
        }
      });
    });

    const scorePercent = Math.round((totalEncerts / totalQuestions) * 100);

    if (badgeEl) {
      let badgeTitle = "🌟 Gran Saviesa Social i Geogràfica!";
      if (scorePercent < 60) badgeTitle = "🔍 Observador/a del Món en Formació";
      else if (scorePercent < 85) badgeTitle = "🎯 Molt Bona Intuïció Social";
      badgeEl.textContent = `🎯 Precisió Global: ${scorePercent}% — Has encertat ${totalEncerts} de ${totalQuestions} indicadors! (${badgeTitle})`;
    }

    if (summaryEl) {
      summaryEl.textContent = "Comprova a sota cadascuna de les teves respostes (Baix, Mitjà o Alt) en comparació amb les dades oficials de l'ONU. Fixa't en com canvia la realitat de les persones segons el país!";
    }

    if (grid) {
      grid.innerHTML = idhCountriesData.map(country => {
        let countryEncerts = 0;

        const rowsHtml = activeIndicators.map(ind => {
          const uTier = getUserTier(country.id, ind.key);
          const realTier = getIndicatorRealTier(country.id, ind.key);
          const correct = isTierCorrect(country.id, ind.key, uTier);
          if (correct) countryEncerts++;

          const rVal = country.real[ind.key];
          const rValFormatted = (ind.step < 1) ? Number(rVal).toFixed(1) : Math.round(rVal);

          return `
            <div class="insegur-result-row ${correct ? 'correct' : 'incorrect'}">
              <div class="insegur-result-indicator">
                <span style="font-size: 1.25rem;">${ind.icon}</span>
                <span>${ind.name}</span>
              </div>
              <div class="insegur-result-status">
                <span style="font-size: 0.82rem; color: #475569;">Tu:</span>
                ${getTierBadgeHtml(uTier)}
                <span style="color: #94a3b8;">➔</span>
                <span style="font-size: 0.82rem; color: #475569;">Realitat:</span>
                ${getTierBadgeHtml(realTier)}
                <span style="font-weight: 700; font-size: 0.82rem; color: #047857;">(${rValFormatted} ${ind.unit})</span>
                <span style="font-size: 1.15rem; margin-left: 0.3rem;">${correct ? '✅' : '❌'}</span>
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
                  <div style="font-size: 0.8rem; color: var(--text-subtle); font-weight: 500;">IDH: ${country.tier} • ${countryEncerts} / 6 encerts</div>
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
    return;
  }

  // ==========================================================
  // MODE SEGUR I AGOSERAT: VERIFICACIÓ NUMÈRICA AMB BARRES
  // ==========================================================
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

  if (badgeEl) {
    let badgeTitle = "Explorador/a Global";
    if (score >= 85) badgeTitle = "🌟 Gran Saviesa Social i Geogràfica!";
    else if (score >= 70) badgeTitle = "🎯 Enginyer/a Humanitari/ària Compassiu/va";
    else badgeTitle = "🔍 Observador/a del Món en Formació";

    badgeEl.textContent = `🎯 Precisió Global: ${score}% — ${badgeTitle}`;
  }

  if (summaryEl) {
    summaryEl.textContent = "Comprova com es comparen les teves hipòtesis amb les dades oficials de l'ONU (Informe de Desenvolupament Humà del PNUD i Banc Mundial). Observa les enormes diferències de qualitat de vida entre continents!";
  }

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
