/* ==========================================================
   POCONA: VISTA COMPARATIVA DE COBERTURA I BRETXA DIGITAL
   3 Territoris: Espanya / Cat. vs Bolívia (Urbà) vs Pocona (Rural)
   + Evolució Històrica (2014 - 2024)
   ========================================================== */

const telecomData = [
  {
    id: "espanya",
    flag: "🇪🇸",
    name: "Espanya / Cat.",
    subtitle: "Entorn de referència europeu",
    tag: "Cobertura Universal (4G/5G)",
    themeColor: "#059669",
    themeBg: "#ecfdf5",
    themeBorder: "#a7f3d0",
    cardClass: "territory-espanya",
    coverageMobile: "99,8%",
    coverageFill: 99.8,
    homeInternet: "96%",
    homeFill: 96,
    avgSpeed: "150 Mbps",
    speedFill: 100,
    healthCenters: "100%",
    healthFill: 100,
    costGBSalary: "0,08%",
    costDesc: "Impacte gairebé nul en el pressupost familiar mensual.",
    techDesc: "Xarxa capil·lar de fibra òptica i estacions base 4G/5G universals a ciutats i pobles rurals."
  },
  {
    id: "bolivia_urba",
    flag: "🇧🇴",
    name: "Bolívia (Urbà)",
    subtitle: "La Paz, Cochabamba i Santa Cruz",
    tag: "Concentració Metropolitana",
    themeColor: "#2563eb",
    themeBg: "#eff6ff",
    themeBorder: "#bfdbfe",
    cardClass: "territory-bolivia-urba",
    coverageMobile: "91%",
    coverageFill: 91,
    homeInternet: "76%",
    homeFill: 76,
    avgSpeed: "38 Mbps",
    speedFill: 35,
    healthCenters: "98%",
    healthFill: 98,
    costGBSalary: "0,9%",
    costDesc: "11 vegades més car que a Espanya en proporció al salari mínim d'un treballador.",
    techDesc: "Les operadores privades concentren el 70% de la infraestructura amb fibra i 4G a les tres grans ciutats."
  },
  {
    id: "pocona_rural",
    flag: "🏔️",
    name: "Pocona (Rural)",
    subtitle: "Província de Carrasco (> 2.800 m)",
    tag: "Zona d'Ombra Andina",
    themeColor: "#d97706",
    themeBg: "#fffbeb",
    themeBorder: "#fde68a",
    cardClass: "territory-pocona",
    coverageMobile: "14%",
    coverageFill: 14,
    homeInternet: "< 2%",
    homeFill: 2,
    avgSpeed: "0,5 Mbps",
    speedFill: 3,
    healthCenters: "0% (Incomunicat)",
    healthFill: 0,
    costGBSalary: "> 4,8%",
    costDesc: "60 vegades més car proporcionalment que a Espanya. Navegar és un luxe prohibitiu.",
    techDesc: "Les muntanyes de 3.400 m bloquegen els senyals mòbils. Cap operador comercial hi desplega fibra per manca de rendibilitat."
  }
];

// Dades Històriques (Fonts: ATT Bolívia, ITU, Programa Nacional Telesalud)
const historicalData = {
  years: [2014, 2016, 2018, 2020, 2022, 2024],
  indicators: {
    coverage: {
      id: "coverage",
      title: "📶 Cobertura 4G/LTE",
      unit: "%",
      maxVal: 100,
      urban: [15, 48, 72, 84, 89, 91],
      pocona: [0, 0, 5, 8, 12, 14],
      analysis: "<strong>Evolució de la cobertura:</strong> El 4G va arrencar a les capitals bolivianes el 2014 i va créixer a un ritme vertiginós fins al 91%. A Pocona, l'orografia andina i el desinterès comercial van mantenir la població a 0% fins al 2018; actualment només alguns punts elevats capten senyal residual (14%)."
    },
    internet: {
      id: "internet",
      title: "🏠 Internet Fix a la Llar",
      unit: "%",
      maxVal: 100,
      urban: [22, 34, 48, 65, 71, 76],
      pocona: [0, 0, 0.3, 1.0, 1.5, 1.8],
      analysis: "<strong>Evolució de la fibra a la llar:</strong> El confinament del 2020 va provocar un salt gegantí de connexió fixa urbana (del 48% al 65%), arribant al 76% el 2024. A Pocona, sense inversió pública ni cooperació, la fibra no ha arribat: el 98,2% de les famílies camperoles no tenen accés."
    },
    speed: {
      id: "speed",
      title: "⚡ Velocitat Mitjana",
      unit: "Mbps",
      maxVal: 45,
      urban: [1.8, 4.5, 12.0, 22.0, 31.0, 38.0],
      pocona: [0.1, 0.1, 0.2, 0.3, 0.4, 0.5],
      analysis: "<strong>Evolució de la velocitat:</strong> A les ciutats la velocitat de descàrrega s'ha multiplicat per 21 (d'1,8 a 38 Mbps). A Pocona, en canvi, la velocitat continua encallada en 0,5 Mbps, impedint qualsevol ús educatiu o mèdic modern."
    },
    telehealth: {
      id: "telehealth",
      title: "🏥 Centres amb Telemedicina",
      unit: "%",
      maxVal: 100,
      urban: [8, 32, 60, 82, 92, 98],
      pocona: [0, 0, 0, 0, 0, 0],
      analysis: "<strong>Evolució de la telemedicina:</strong> El Ministeri de Salut de Bolívia ha connectat gairebé tots els hospitals urbans i capçaleres municipals (98%). Tanmateix, l'ambulatori de Pocona continua al 0% perquè cap operadora no li garanteix un canal de dades estable."
    }
  }
};

let activeChartIndicator = "coverage";

function initTelecomComparison() {
  renderThreeCards();
  renderGapSummary();
  renderChartIndicatorPills();
  renderEvolutionChart();
}

function renderThreeCards() {
  const container = document.getElementById("telecomComparisonGrid");
  if (!container) return;

  container.className = "telecom-3col-grid";
  container.innerHTML = telecomData.map(t => `
    <div class="telecom-territory-card ${t.cardClass}">
      <div class="territory-card-header">
        <div class="territory-header-top">
          <span class="territory-flag">${t.flag}</span>
          <div>
            <h3 class="territory-title">${t.name}</h3>
            <div class="territory-subtitle">${t.subtitle}</div>
          </div>
        </div>
        <span class="zone-tag" style="background:${t.themeBg}; color:${t.themeColor}; border:1px solid ${t.themeBorder};">
          ${t.tag}
        </span>
      </div>

      <div class="territory-metrics-box">
        <div class="metric-row">
          <div class="metric-header">
            <span>📶 Cobertura 4G/5G</span>
            <span class="metric-val" style="color:${t.themeColor};">${t.coverageMobile}</span>
          </div>
          <div class="metric-track">
            <div class="metric-fill" style="width:${t.coverageFill}%; background:${t.themeColor};"></div>
          </div>
        </div>

        <div class="metric-row">
          <div class="metric-header">
            <span>🏠 Internet a la llar</span>
            <span class="metric-val" style="color:${t.themeColor};">${t.homeInternet}</span>
          </div>
          <div class="metric-track">
            <div class="metric-fill" style="width:${t.homeFill}%; background:${t.themeColor};"></div>
          </div>
        </div>

        <div class="metric-row">
          <div class="metric-header">
            <span>⚡ Velocitat mitjana</span>
            <span class="metric-val" style="color:${t.themeColor};">${t.avgSpeed}</span>
          </div>
          <div class="metric-track">
            <div class="metric-fill" style="width:${t.speedFill}%; background:${t.themeColor};"></div>
          </div>
        </div>

        <div class="metric-row">
          <div class="metric-header">
            <span>🏥 Telemedicina</span>
            <span class="metric-val" style="color:${t.id === 'pocona_rural' ? '#e11d48' : t.themeColor};">${t.healthCenters}</span>
          </div>
          <div class="metric-track">
            <div class="metric-fill" style="width:${t.healthFill}%; background:${t.id === 'pocona_rural' ? '#e11d48' : t.themeColor};"></div>
          </div>
        </div>
      </div>

      <div class="territory-cost-card" style="background:${t.themeBg}; border-color:${t.themeBorder};">
        <div style="font-size:0.72rem; text-transform:uppercase; font-weight:700; color:${t.themeColor}; margin-bottom:0.2rem;">
          💰 Esforç per 1 GB de Dades
        </div>
        <div style="font-size:1.15rem; font-weight:800; font-family:'JetBrains Mono',monospace; color:${t.themeColor};">
          ${t.costGBSalary} <span style="font-size:0.75rem; font-weight:600; color:var(--text-muted);">del sou mínim</span>
        </div>
        <div style="font-size:0.76rem; color:var(--text-muted); margin-top:0.25rem; line-height:1.35;">
          ${t.costDesc}
        </div>
      </div>

      <div class="territory-context-desc">
        <strong>Orografia i Xarxa:</strong> ${t.techDesc}
      </div>
    </div>
  `).join("");
}

function renderGapSummary() {
  const container = document.getElementById("telecomGapSummary");
  if (!container) return;

  container.innerHTML = `
    <div class="telecom-summary-card">
      <h4 style="font-size:1.05rem; font-weight:800; color:var(--text-main); margin-bottom:0.65rem; display:flex; align-items:center; gap:0.5rem;">
        <span>⚖️</span> Anàlisi de la Bretxa Digital: 3 Realitats Incomparables
      </h4>
      <div class="gap-summary-grid">
        <div class="gap-summary-col">
          <div class="gap-col-title" style="color:#059669;">1. Bretxa d'Infraestructura</div>
          <p class="gap-col-text">
            Mentre a Espanya el <strong>99,8%</strong> de la població gaudeix de 4G/5G, a Pocona només el <strong>14%</strong> té algun senyal residual a causa de la muralla andina de 3.400 m.
          </p>
        </div>
        <div class="gap-summary-col">
          <div class="gap-col-title" style="color:#2563eb;">2. Bretxa Urbana vs Rural</div>
          <p class="gap-col-text">
            Dins de la mateixa Bolívia, una família a Cochabamba ciutat té un <strong>76%</strong> de probabilitat de tenir internet fix, enfront de menys del <strong>2%</strong> a les comunitats de Pocona.
          </p>
        </div>
        <div class="gap-summary-col">
          <div class="gap-col-title" style="color:#d97706;">3. Bretxa Econòmica</div>
          <p class="gap-col-text">
            Per a una família de camperols a Pocona, comprar 1 GB de dades costa <strong>60 vegades més proporcionalment</strong> al seu sou que a una família a Espanya (4,8% vs 0,08%).
          </p>
        </div>
      </div>
    </div>
  `;
}

// Controls de la Gràfica Històrica
function setChartIndicator(indKey) {
  activeChartIndicator = indKey;
  renderChartIndicatorPills();
  renderEvolutionChart();
}

function renderChartIndicatorPills() {
  const container = document.getElementById("chartIndicatorPills");
  if (!container) return;

  const indicators = [
    { id: "coverage", label: "📶 Cobertura 4G/LTE (%)" },
    { id: "internet", label: "🏠 Internet a la Llar (%)" },
    { id: "speed", label: "⚡ Velocitat (Mbps)" },
    { id: "telehealth", label: "🏥 Telemedicina (%)" }
  ];

  container.innerHTML = indicators.map(ind => `
    <button type="button" 
            class="chart-indicator-btn ${ind.id === activeChartIndicator ? 'active' : ''}" 
            onclick="setChartIndicator('${ind.id}')">
      ${ind.label}
    </button>
  `).join("");
}

function renderEvolutionChart() {
  const svgContainer = document.getElementById("chartSvgContainer");
  const analysisCard = document.getElementById("chartAnalysisCard");
  if (!svgContainer || !analysisCard) return;

  const ind = historicalData.indicators[activeChartIndicator];
  const years = historicalData.years;
  const urbanData = ind.urban;
  const poconaData = ind.pocona;

  // Actualitzar text d'anàlisi
  analysisCard.innerHTML = `
    <div style="font-size:0.95rem; line-height:1.55;">
      ${ind.analysis}
    </div>
  `;

  // Construcció dinàmica de l'SVG
  const w = 700;
  const h = 300;
  const padLeft = 55;
  const padRight = 35;
  const padTop = 30;
  const padBottom = 45;

  const plotW = w - padLeft - padRight;
  const plotH = h - padTop - padBottom;

  const maxVal = ind.maxVal;

  const getX = (idx) => padLeft + (idx / (years.length - 1)) * plotW;
  const getY = (val) => padTop + plotH - (val / maxVal) * plotH;

  // Punts per a les polilínies
  const urbanPoints = urbanData.map((v, i) => `${getX(i)},${getY(v)}`).join(" ");
  const poconaPoints = poconaData.map((v, i) => `${getX(i)},${getY(v)}`).join(" ");

  // Línies de quadrícula horitzontals
  const gridSteps = 4;
  let gridLinesHtml = "";
  for (let s = 0; s <= gridSteps; s++) {
    const val = Math.round((maxVal / gridSteps) * s);
    const yPos = getY(val);
    gridLinesHtml += `
      <line x1="${padLeft}" y1="${yPos}" x2="${w - padRight}" y2="${yPos}" stroke="#334155" stroke-width="1" stroke-dasharray="3,3" />
      <text x="${padLeft - 10}" y="${yPos + 4}" font-family="JetBrains Mono" font-size="10" fill="#94a3b8" text-anchor="end">${val}${ind.unit === '%' ? '%' : ''}</text>
    `;
  }

  // Etiquetes anys eix X
  let xLabelsHtml = "";
  years.forEach((yr, i) => {
    const xPos = getX(i);
    xLabelsHtml += `
      <line x1="${xPos}" y1="${padTop + plotH}" x2="${xPos}" y2="${padTop + plotH + 6}" stroke="#64748b" stroke-width="1.5" />
      <text x="${xPos}" y="${padTop + plotH + 20}" font-family="Outfit" font-weight="600" font-size="12" fill="#cbd5e1" text-anchor="middle">${yr}</text>
    `;
  });

  // Cercles i valors de punts urbans
  let urbanDotsHtml = "";
  urbanData.forEach((v, i) => {
    const cx = getX(i);
    const cy = getY(v);
    urbanDotsHtml += `
      <circle cx="${cx}" cy="${cy}" r="5" fill="#38bdf8" stroke="#0f172a" stroke-width="2" />
      <text x="${cx}" y="${cy - 10}" font-family="JetBrains Mono" font-weight="700" font-size="10" fill="#38bdf8" text-anchor="middle">${v}${ind.unit === '%' ? '%' : ''}</text>
    `;
  });

  // Cercles i valors de punts Pocona
  let poconaDotsHtml = "";
  poconaData.forEach((v, i) => {
    const cx = getX(i);
    const cy = getY(v);
    poconaDotsHtml += `
      <circle cx="${cx}" cy="${cy}" r="5" fill="#f59e0b" stroke="#0f172a" stroke-width="2" />
      <text x="${cx}" y="${cy + (v > 10 ? 18 : 15)}" font-family="JetBrains Mono" font-weight="700" font-size="10" fill="#fbbf24" text-anchor="middle">${v}${ind.unit === '%' ? '%' : ''}</text>
    `;
  });

  svgContainer.innerHTML = `
    <svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid meet">
      <!-- Fons gràfic -->
      <rect x="0" y="0" width="${w}" height="${h}" fill="#0f172a" rx="8" />

      <!-- Quadrícula i eixos -->
      ${gridLinesHtml}
      ${xLabelsHtml}

      <!-- Eix X principal -->
      <line x1="${padLeft}" y1="${padTop + plotH}" x2="${w - padRight}" y2="${padTop + plotH}" stroke="#64748b" stroke-width="2" />
      <!-- Eix Y principal -->
      <line x1="${padLeft}" y1="${padTop}" x2="${padLeft}" y2="${padTop + plotH}" stroke="#64748b" stroke-width="2" />

      <!-- Línia Bolívia Urbà -->
      <polyline fill="none" stroke="#38bdf8" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" points="${urbanPoints}" />
      ${urbanDotsHtml}

      <!-- Línia Pocona Rural -->
      <polyline fill="none" stroke="#f59e0b" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" points="${poconaPoints}" />
      ${poconaDotsHtml}
    </svg>
  `;
}

window.addEventListener("DOMContentLoaded", () => {
  initTelecomComparison();
});
