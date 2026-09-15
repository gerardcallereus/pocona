/* ==========================================================
   POCONA: SIMULADOR I GRÀFICA INTERACTIVA D'EVOLUCIÓ DE L'ACCÉS A INTERNET A BOLÍVIA (ÚLTIMS 30 ANYS)
   Dades històriques basades en Banc Mundial / ITU (1994 - 2024)
   Comparativa territorial: Nacional vs Eix Urbà vs Àrea Rural Pocona
   ========================================================== */

const boliviaInternetHistorical = [
  {
    year: 1994,
    bolivia: 0.05,
    urban: 0.15,
    pocona: 0.0,
    milestone: "Pre-Internet Comercial",
    context: "Els primers enllaços telemàtics a Bolívia es limiten estrictament a xarxes acadèmiques universitàries experimentals (Bolnet) a La Paz.",
    isMilestone: false
  },
  {
    year: 1995,
    bolivia: 0.10,
    urban: 0.30,
    pocona: 0.0,
    milestone: "Primers Nodes Dial-up",
    context: "Inici del servei dial-up comercial a través de línies telefòniques commutades a 14,4 kbps a les capitals. Accés reservat a alts funcionaris i grans empreses.",
    isMilestone: true
  },
  {
    year: 1996,
    bolivia: 0.15,
    urban: 0.50,
    pocona: 0.0,
    milestone: "Primeres connexions corporatives",
    context: "L'ús d'Internet comença a estendre's entre organismes governamentals i bancs. Pocona no disposa de xarxa telefònica fixa bàsica.",
    isMilestone: false
  },
  {
    year: 1997,
    bolivia: 0.25,
    urban: 0.80,
    pocona: 0.0,
    milestone: "Aparició dels primers cibercafès",
    context: "S'obren els primers cafès Internet a La Paz i Santa Cruz. El cost per hora és prohibitiu per a la majoria de la població.",
    isMilestone: false
  },
  {
    year: 1998,
    bolivia: 0.53,
    urban: 1.50,
    pocona: 0.0,
    milestone: "Privatització de les telecomunicacions",
    context: "Entel és privatitzada i adquireix compromisos de modernització metropolitana, deixant de banda les zones rurals no rendibles.",
    isMilestone: false
  },
  {
    year: 1999,
    bolivia: 0.90,
    urban: 2.30,
    pocona: 0.0,
    milestone: "Inicis del correu electrònic",
    context: "L'e-mail es converteix en eina de treball en grans oficines. A les comunitats andines la comunicació continua essent per carta o ràdio analògica.",
    isMilestone: false
  },
  {
    year: 2000,
    bolivia: 1.44,
    urban: 3.50,
    pocona: 0.0,
    milestone: "Canvi de Mil·lenni",
    context: "L'accés a Bolívia supera per primer cop l'1%. Les connexions dial-up saturen les línies de coure urbanes.",
    isMilestone: true
  },
  {
    year: 2001,
    bolivia: 2.30,
    urban: 5.20,
    pocona: 0.0,
    milestone: "Primeres línies dedicades DSL",
    context: "Comença la substitució gradual del dial-up per línies digitals ADSL a oficines i seus diplomàtiques.",
    isMilestone: false
  },
  {
    year: 2002,
    bolivia: 3.20,
    urban: 7.00,
    pocona: 0.0,
    milestone: "Costos de connexió molt alts",
    context: "Un mes de connexió a internet costa l'equivalent a més del 40% del salari mínim nacional a Bolívia.",
    isMilestone: false
  },
  {
    year: 2003,
    bolivia: 3.80,
    urban: 8.50,
    pocona: 0.0,
    milestone: "Inici d'ADSL a les llars de classe alta",
    context: "Desplegament d'ADSL a barris residencials de capitals. Les zones rurals andines romanen en silenci digital absolut.",
    isMilestone: false
  },
  {
    year: 2004,
    bolivia: 4.44,
    urban: 10.20,
    pocona: 0.0,
    milestone: "Projectes pilots de telecentres",
    context: "Primers intents d'organismes internacionals d'instal·lar cabines d'ordinadors en zones rurals, amb dificultats greus de manteniment.",
    isMilestone: false
  },
  {
    year: 2005,
    bolivia: 5.23,
    urban: 12.00,
    pocona: 0.0,
    milestone: "El llindar del 5%",
    context: "Bolívia supera el 5% nacional. Els cibercafès es converteixen en el principal punt d'accés per als estudiants urbans.",
    isMilestone: false
  },
  {
    year: 2006,
    bolivia: 5.90,
    urban: 13.50,
    pocona: 0.0,
    milestone: "Inici del debat sobre servei bàsic",
    context: "Comença el debat constituent sobre si les comunicacions han de ser considerades un servei públic garantit per l'Estat.",
    isMilestone: false
  },
  {
    year: 2007,
    bolivia: 10.50,
    urban: 21.00,
    pocona: 0.0,
    milestone: "Mòdems USB mòbils (2.5G/EDGE)",
    context: "L'arribada dels 'pinchos' USB mòbils permet connectar portàtils a ciutats sense necessitat de línia telefònica fixa.",
    isMilestone: false
  },
  {
    year: 2008,
    bolivia: 12.50,
    urban: 24.50,
    pocona: 0.0,
    milestone: "Nacionalització d'Entel Bolívia",
    context: "L'Estat bolivià recupera l'empresa estatal Entel amb el mandat constitucional d'arribar a comunitats rurals i reduir tarifes.",
    isMilestone: true
  },
  {
    year: 2009,
    bolivia: 16.00,
    urban: 29.00,
    pocona: 0.0,
    milestone: "Nova Constitució (Art. 20)",
    context: "La nova Constitució Política de Bolívia reconeix les telecomunicacions com un dret bàsic universal. Arriben les primeres proves 3G.",
    isMilestone: false
  },
  {
    year: 2010,
    bolivia: 22.40,
    urban: 38.00,
    pocona: 0.0,
    milestone: "Boom dels Smartphones i 3G",
    context: "Desplegament massiu d'antenes mòbils 3G a les principals ciutats (La Paz, Santa Cruz, Cochabamba). Fort salt d'usuaris.",
    isMilestone: false
  },
  {
    year: 2011,
    bolivia: 25.00,
    urban: 42.00,
    pocona: 0.0,
    milestone: "L'ONU declara Internet Dret Humà",
    context: "L'Assemblea General de les Nacions Unides declara l'accés a Internet com un dret humà universal fonamental per al desenvolupament.",
    isMilestone: true
  },
  {
    year: 2012,
    bolivia: 30.70,
    urban: 48.00,
    pocona: 0.0,
    milestone: "Popularització de xarxes socials",
    context: "Facebook i WhatsApp esdevenen les principals aplicacions a Bolívia. L'escletxa entre camp i ciutat comença a fer-se insalvable.",
    isMilestone: false
  },
  {
    year: 2013,
    bolivia: 32.50,
    urban: 51.00,
    pocona: 0.1,
    milestone: "Llançament Satèl·lit Túpac Katari",
    context: "Bolívia llança a l'espai el satèl·lit de comunicacions TKSAT-1 per donar cobertura a escoles rurals remotes.",
    isMilestone: true
  },
  {
    year: 2014,
    bolivia: 34.60,
    urban: 55.00,
    pocona: 0.2,
    milestone: "Inici del 4G/LTE a l'eix urbà",
    context: "Les operadores activen les xarxes d'alta velocitat 4G LTE a l'eix troncal. A Pocona només es capta senyal residual molt feble a la carretera.",
    isMilestone: false
  },
  {
    year: 2015,
    bolivia: 39.80,
    urban: 61.00,
    pocona: 0.4,
    milestone: "4 de cada 10 bolivians connectats",
    context: "L'ús de dades mòbils supera àmpliament l'accés des d'ordinadors d'escriptori. Les tarifes de dades continuen sent cares en proporció al salari rural.",
    isMilestone: false
  },
  {
    year: 2016,
    bolivia: 42.00,
    urban: 64.00,
    pocona: 0.6,
    milestone: "Fibra òptica urbana a la llar (FTTH)",
    context: "Comença la substitució massiva de cables de coure per fibra òptica a les capitals departamentals.",
    isMilestone: false
  },
  {
    year: 2017,
    bolivia: 43.80,
    urban: 66.50,
    pocona: 0.8,
    milestone: "Consolidació de l'ús mòbil",
    context: "Més del 90% dels accessos a Internet a Bolívia es fan ja mitjançant telèfons intel·ligents.",
    isMilestone: false
  },
  {
    year: 2018,
    bolivia: 45.30,
    urban: 68.00,
    pocona: 1.0,
    milestone: "Telecentres comunals amb problemes",
    context: "Alguns punts oficials a capçaleres municipals intenten connectar-se per satèl·lit, però les avaries freqüents deixen les valls sense servei.",
    isMilestone: false
  },
  {
    year: 2019,
    bolivia: 47.90,
    urban: 71.00,
    pocona: 1.2,
    milestone: "Prop de la meitat del país en línia",
    context: "Gairebé la meitat dels ciutadans disposa de connexió, mentre municipis com Pocona mantenen el 98% de les llars desconnectades.",
    isMilestone: false
  },
  {
    year: 2020,
    bolivia: 55.10,
    urban: 78.0,
    pocona: 1.4,
    milestone: "Pandèmia COVID-19 i Teleescola",
    context: "El tancament d'escoles provoca un salt sense precedents d'ús d'Internet. A Pocona, els nens perden el curs escolar per manca absoluta de connexió a les cases.",
    isMilestone: true
  },
  {
    year: 2021,
    bolivia: 57.50,
    urban: 80.0,
    pocona: 1.5,
    milestone: "Retorn progressiu a la normalitat",
    context: "L'educació virtual es manté com a eina híbrida. Es fa evident la greu bretxa d'aprenentatge entre l'alumnat urbà i el rural andí.",
    isMilestone: false
  },
  {
    year: 2022,
    bolivia: 59.80,
    urban: 82.0,
    pocona: 1.6,
    milestone: "Assoliment del 60% nacional",
    context: "El Banc Mundial i la ITU certifiquen que el 60% de la població boliviana és usuària d'Internet, però el 98% de la població rural de Pocona segueix aïllada.",
    isMilestone: true
  },
  {
    year: 2023,
    bolivia: 63.20,
    urban: 84.5,
    pocona: 1.7,
    milestone: "Fibra simètrica i 5G experimental",
    context: "A les tres grans ciutats es despleguen xarxes d'alta velocitat de centenars de megabits, mentre les valls de Pocona continuen sense cobertura bàsica de trucada.",
    isMilestone: false
  },
  {
    year: 2024,
    bolivia: 66.00,
    urban: 86.0,
    pocona: 1.8,
    milestone: "Actualitat: La Gran Bretxa Territorial",
    context: "Mentre 2 de cada 3 bolivians estan connectats, a Pocona la taxa no arriba al 2% a les llars. La nostra xarxa comunitària WiMAX és la solució necessària.",
    isMilestone: true
  }
];

let currentSelectedYearIndex = boliviaInternetHistorical.length - 1; // 2024
let currentSeriesFilter = "all"; // 'all', 'bolivia', 'urban', 'pocona'
let isAutoplayRunning = false;
let autoplayTimer = null;

function initInternetEvolutionSimulator() {
  const container = document.getElementById("boliviaInternetEvolutionChart");
  if (!container) return;

  renderChartSkeleton();
  updateChartVisualization();
  attachChartEventListeners();
}

function renderChartSkeleton() {
  const container = document.getElementById("boliviaInternetEvolutionChart");
  if (!container) return;

  container.innerHTML = `
    <div class="evolution-chart-card">
      <div class="chart-header-row">
        <div>
          <div class="chart-badge-sub">Font Oficial: Banc Mundial &amp; ITU (1994 – 2024)</div>
          <h3 class="chart-main-title">Evolució de l'accés a Internet a Bolívia (Últims 30 anys)</h3>
          <p class="chart-main-desc">
            Interacciona amb el selector temporal, prem les fites històriques o passa el cursor per sobre de la corba per analitzar com ha evolucionat la penetració d'Internet i la bretxa territorial entre l'entorn urbà i la vall rural de Pocona.
          </p>
        </div>
      </div>

      <!-- Filtres de sèries territorials -->
      <div class="chart-controls-bar">
        <div class="chart-indicator-pills">
          <button type="button" class="chart-indicator-btn active" data-series="all">⚖️ Comparar Totes les Corbes</button>
          <button type="button" class="chart-indicator-btn" data-series="bolivia">🇧🇴 Mitjana Bolívia (Banc Mundial)</button>
          <button type="button" class="chart-indicator-btn" data-series="urban">🏙️ Eix Urbà (Capitals)</button>
          <button type="button" class="chart-indicator-btn" data-series="pocona">🏔️ Pocona (Rural Andina)</button>
        </div>
        <div class="chart-play-btn-wrap">
          <button type="button" id="btnPlayAnimation" class="btn-action btn-sm" style="background:#0284c7; color:#fff; border:none; display:inline-flex; align-items:center; gap:0.4rem; padding:0.45rem 0.9rem; font-weight:700; border-radius:var(--radius-full); cursor:pointer;">
            <span id="playIcon">▶</span> <span id="playText">Animar 30 Anys</span>
          </button>
        </div>
      </div>

      <!-- Àrea Gràfica SVG Interactiva -->
      <div class="chart-svg-wrap" style="position:relative;">
        <svg id="evolutionSvg" viewBox="0 0 860 380" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="gradBolivia" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#0284c7" stop-opacity="0.35"/>
              <stop offset="100%" stop-color="#0284c7" stop-opacity="0.02"/>
            </linearGradient>
            <linearGradient id="gradUrban" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#7c3aed" stop-opacity="0.25"/>
              <stop offset="100%" stop-color="#7c3aed" stop-opacity="0.01"/>
            </linearGradient>
            <linearGradient id="gradPocona" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#d97706" stop-opacity="0.25"/>
              <stop offset="100%" stop-color="#d97706" stop-opacity="0.01"/>
            </linearGradient>
            <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="glow"/>
              <feComposite in="SourceGraphic" in2="glow" operator="over"/>
            </filter>
          </defs>

          <!-- Fons de quadrícula i eixos -->
          <g id="chartGrid"></g>

          <!-- Àrees ombrejades sota les corbes -->
          <path id="areaUrban" fill="url(#gradUrban)" d="" />
          <path id="areaBolivia" fill="url(#gradBolivia)" d="" />
          <path id="areaPocona" fill="url(#gradPocona)" d="" />

          <!-- Línies de les corbes -->
          <path id="lineUrban" fill="none" stroke="#a78bfa" stroke-width="2.5" stroke-dasharray="4,4" d="" />
          <path id="lineBolivia" fill="none" stroke="#38bdf8" stroke-width="3.5" d="" filter="url(#glowEffect)" />
          <path id="linePocona" fill="none" stroke="#f59e0b" stroke-width="3" d="" />

          <!-- Línia vertical de posició interactiva (Scrubber) -->
          <line id="scrubberLine" x1="0" y1="30" x2="0" y2="320" stroke="#f8fafc" stroke-width="1.5" stroke-dasharray="3,3" opacity="0" />

          <!-- Punts clicables i marcadors -->
          <g id="chartMilestoneMarkers"></g>
          <g id="chartDataPoints"></g>

          <!-- Punter actiu seleccionat -->
          <circle id="activeCursorDotBolivia" r="6.5" fill="#38bdf8" stroke="#ffffff" stroke-width="2.5" opacity="0" />
          <circle id="activeCursorDotUrban" r="5" fill="#c084fc" stroke="#ffffff" stroke-width="2" opacity="0" />
          <circle id="activeCursorDotPocona" r="5" fill="#f59e0b" stroke="#ffffff" stroke-width="2" opacity="0" />
        </svg>

        <!-- Tooltip flotant dinàmic -->
        <div id="chartTooltip" class="chart-tooltip-floating" style="display:none; position:absolute; pointer-events:none;"></div>
      </div>

      <!-- Llegenda interactiva -->
      <div class="chart-legend-box" style="margin-top: 0.75rem;">
        <span class="legend-item" style="color: #38bdf8;">
          <span class="legend-line" style="background: #38bdf8;"></span>
          <strong>Bolívia (Mitjana Nacional Banc Mundial)</strong>
        </span>
        <span class="legend-item" style="color: #a78bfa;">
          <span class="legend-line" style="background: #a78bfa; border-top: 2px dashed #c084fc;"></span>
          <strong>Eix Urbà Troncal (Capitals)</strong>
        </span>
        <span class="legend-item" style="color: #f59e0b;">
          <span class="legend-line" style="background: #f59e0b;"></span>
          <strong>Pocona (Àrea Rural Andina)</strong>
        </span>
      </div>

      <!-- Selector lliscant d'anys (Timeline Slider) -->
      <div class="timeline-slider-section" style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:var(--radius-md); padding:1rem 1.25rem; margin:1rem 0;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.4rem;">
          <label for="yearRangeInput" style="font-weight:700; font-size:0.9rem; color:var(--text-main); display:flex; align-items:center; gap:0.5rem;">
            <span>⏳ Línia Temporal Any a Any:</span>
            <span id="sliderYearBadge" style="background:var(--primary); color:#fff; padding:0.15rem 0.6rem; border-radius:var(--radius-full); font-family:'JetBrains Mono', monospace; font-size:0.95rem;">2024</span>
          </label>
          <span style="font-size:0.8rem; color:var(--text-muted);">Fes lliscar o clica a les fites clau</span>
        </div>
        
        <input type="range" id="yearRangeInput" min="0" max="${boliviaInternetHistorical.length - 1}" step="1" value="${boliviaInternetHistorical.length - 1}" style="width:100%; cursor:pointer; accent-color:var(--primary);">
        
        <!-- Fites ràpides per clicar -->
        <div class="milestones-quick-bar" style="display:flex; flex-wrap:wrap; gap:0.4rem; margin-top:0.75rem; justify-content:space-between;">
          <button type="button" class="milestone-chip" data-year="1995">1995: Primers Dial-up</button>
          <button type="button" class="milestone-chip" data-year="2000">2000: Mil·lenni</button>
          <button type="button" class="milestone-chip" data-year="2008">2008: Nacionalització</button>
          <button type="button" class="milestone-chip" data-year="2011">2011: Dret Humà ONU</button>
          <button type="button" class="milestone-chip" data-year="2013">2013: Satèl·lit Katari</button>
          <button type="button" class="milestone-chip" data-year="2020">2020: Pandèmia Covid</button>
          <button type="button" class="milestone-chip active" data-year="2024">2024: Bretxa Actual</button>
        </div>
      </div>

      <!-- Targeta de resum dinàmic de l'any seleccionat -->
      <div id="dynamicYearCard" class="dynamic-year-detail-card" style="background:#ffffff; border:1.5px solid #cbd5e1; border-radius:var(--radius-md); padding:1.25rem; box-shadow:var(--shadow-sm);">
        <!-- S'omple dinàmicament per JS -->
      </div>
    </div>
  `;
}

function getCoords(index, val) {
  const leftX = 65;
  const rightX = 810;
  const topY = 40;
  const bottomY = 320;

  const totalPoints = boliviaInternetHistorical.length - 1;
  const x = leftX + (index / totalPoints) * (rightX - leftX);
  const maxVal = 100;
  const y = bottomY - (val / maxVal) * (bottomY - topY);
  return { x, y };
}

function updateChartVisualization() {
  const total = boliviaInternetHistorical.length;
  const selectedData = boliviaInternetHistorical[currentSelectedYearIndex];
  if (!selectedData) return;

  // 1. Dibuixar quadrícula i etiquetes d'eixos
  const gridGroup = document.getElementById("chartGrid");
  if (gridGroup) {
    let gridHtml = "";
    const leftX = 65;
    const rightX = 810;
    const topY = 40;
    const bottomY = 320;

    // Línies Y (0%, 20%, 40%, 60%, 80%, 100%)
    [0, 20, 40, 60, 80, 100].forEach(p => {
      const y = bottomY - (p / 100) * (bottomY - topY);
      gridHtml += `
        <line x1="${leftX}" y1="${y}" x2="${rightX}" y2="${y}" stroke="#334155" stroke-width="1" stroke-opacity="0.6" stroke-dasharray="${p === 0 ? 'none' : '3,3'}" />
        <text x="${leftX - 10}" y="${y + 4}" fill="#94a3b8" font-size="11" font-family="'JetBrains Mono', monospace" text-anchor="end">${p}%</text>
      `;
    });

    // Línies X (Anys clau)
    [1994, 2000, 2005, 2010, 2015, 2020, 2024].forEach(yVal => {
      const idx = boliviaInternetHistorical.findIndex(d => d.year === yVal);
      if (idx >= 0) {
        const coords = getCoords(idx, 0);
        gridHtml += `
          <line x1="${coords.x}" y1="${topY}" x2="${coords.x}" y2="${bottomY}" stroke="#334155" stroke-width="1" stroke-opacity="0.3" stroke-dasharray="2,2" />
          <text x="${coords.x}" y="${bottomY + 22}" fill="#cbd5e1" font-size="11" font-weight="600" font-family="'JetBrains Mono', monospace" text-anchor="middle">${yVal}</text>
        `;
      }
    });

    // Títols d'eixos
    gridHtml += `
      <text x="${leftX}" y="${topY - 14}" fill="#38bdf8" font-size="11" font-weight="700" font-family="'Outfit', sans-serif">▲ % Població amb Accés a Internet</text>
      <text x="${rightX}" y="${bottomY + 40}" fill="#94a3b8" font-size="10" font-family="'JetBrains Mono', monospace" text-anchor="end">Línia temporal (30 anys) ▶</text>
    `;

    gridGroup.innerHTML = gridHtml;
  }

  // 2. Construir corbes SVG i àrees
  let pathUrban = "";
  let pathBolivia = "";
  let pathPocona = "";

  boliviaInternetHistorical.forEach((d, i) => {
    const cU = getCoords(i, d.urban);
    const cB = getCoords(i, d.bolivia);
    const cP = getCoords(i, d.pocona);

    if (i === 0) {
      pathUrban += `M ${cU.x} ${cU.y}`;
      pathBolivia += `M ${cB.x} ${cB.y}`;
      pathPocona += `M ${cP.x} ${cP.y}`;
    } else {
      pathUrban += ` L ${cU.x} ${cU.y}`;
      pathBolivia += ` L ${cB.x} ${cB.y}`;
      pathPocona += ` L ${cP.x} ${cP.y}`;
    }
  });

  const bottomY = 320;
  const firstCoords = getCoords(0, 0);
  const lastCoords = getCoords(total - 1, 0);

  const areaDurban = `${pathUrban} L ${lastCoords.x} ${bottomY} L ${firstCoords.x} ${bottomY} Z`;
  const areaDbolivia = `${pathBolivia} L ${lastCoords.x} ${bottomY} L ${firstCoords.x} ${bottomY} Z`;
  const areaDpocona = `${pathPocona} L ${lastCoords.x} ${bottomY} L ${firstCoords.x} ${bottomY} Z`;

  const elLineUrban = document.getElementById("lineUrban");
  const elLineBolivia = document.getElementById("lineBolivia");
  const elLinePocona = document.getElementById("linePocona");
  const elAreaUrban = document.getElementById("areaUrban");
  const elAreaBolivia = document.getElementById("areaBolivia");
  const elAreaPocona = document.getElementById("areaPocona");

  if (elLineUrban) elLineUrban.setAttribute("d", pathUrban);
  if (elLineBolivia) elLineBolivia.setAttribute("d", pathBolivia);
  if (elLinePocona) elLinePocona.setAttribute("d", pathPocona);
  if (elAreaUrban) elAreaUrban.setAttribute("d", areaDurban);
  if (elAreaBolivia) elAreaBolivia.setAttribute("d", areaDbolivia);
  if (elAreaPocona) elAreaPocona.setAttribute("d", areaDpocona);

  // Aplicar visibilitat segons el filtre seleccionat
  if (elLineUrban) elLineUrban.style.opacity = (currentSeriesFilter === "all" || currentSeriesFilter === "urban") ? "1" : "0.15";
  if (elLineBolivia) elLineBolivia.style.opacity = (currentSeriesFilter === "all" || currentSeriesFilter === "bolivia") ? "1" : "0.15";
  if (elLinePocona) elLinePocona.style.opacity = (currentSeriesFilter === "all" || currentSeriesFilter === "pocona") ? "1" : "0.15";

  if (elAreaUrban) elAreaUrban.style.opacity = (currentSeriesFilter === "all" || currentSeriesFilter === "urban") ? "1" : "0.02";
  if (elAreaBolivia) elAreaBolivia.style.opacity = (currentSeriesFilter === "all" || currentSeriesFilter === "bolivia") ? "1" : "0.02";
  if (elAreaPocona) elAreaPocona.style.opacity = (currentSeriesFilter === "all" || currentSeriesFilter === "pocona") ? "1" : "0.02";

  // 3. Punts clicables i icones de fites
  const ptsGroup = document.getElementById("chartDataPoints");
  const markersGroup = document.getElementById("chartMilestoneMarkers");

  if (ptsGroup) {
    let ptsHtml = "";
    boliviaInternetHistorical.forEach((d, i) => {
      const c = getCoords(i, d.bolivia);
      const isSel = (i === currentSelectedYearIndex);
      ptsHtml += `
        <circle class="chart-click-dot" data-idx="${i}" cx="${c.x}" cy="${c.y}" r="${d.isMilestone ? '5' : '3.5'}" fill="${isSel ? '#ffffff' : '#38bdf8'}" stroke="#0f172a" stroke-width="2" style="cursor:pointer; transition:transform 0.15s ease;" />
      `;
    });
    ptsGroup.innerHTML = ptsHtml;
  }

  if (markersGroup) {
    let markersHtml = "";
    boliviaInternetHistorical.forEach((d, i) => {
      if (d.isMilestone) {
        const c = getCoords(i, d.bolivia);
        markersHtml += `
          <g class="milestone-pin-marker" data-idx="${i}" style="cursor:pointer;">
            <circle cx="${c.x}" cy="${c.y - 18}" r="10" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
            <text x="${c.x}" y="${c.y - 14}" fill="#38bdf8" font-size="9" font-weight="700" text-anchor="middle" font-family="'JetBrains Mono', monospace">★</text>
            <line x1="${c.x}" y1="${c.y - 8}" x2="${c.x}" y2="${c.y}" stroke="#38bdf8" stroke-width="1" stroke-dasharray="2,2"/>
          </g>
        `;
      }
    });
    markersGroup.innerHTML = markersHtml;
  }

  // 4. Actualitzar Scrubber i Punters actius
  const curCoordsBolivia = getCoords(currentSelectedYearIndex, selectedData.bolivia);
  const curCoordsUrban = getCoords(currentSelectedYearIndex, selectedData.urban);
  const curCoordsPocona = getCoords(currentSelectedYearIndex, selectedData.pocona);

  const scrubber = document.getElementById("scrubberLine");
  if (scrubber) {
    scrubber.setAttribute("x1", curCoordsBolivia.x);
    scrubber.setAttribute("x2", curCoordsBolivia.x);
    scrubber.style.opacity = "1";
  }

  const dotB = document.getElementById("activeCursorDotBolivia");
  const dotU = document.getElementById("activeCursorDotUrban");
  const dotP = document.getElementById("activeCursorDotPocona");

  if (dotB) {
    dotB.setAttribute("cx", curCoordsBolivia.x);
    dotB.setAttribute("cy", curCoordsBolivia.y);
    dotB.style.opacity = (currentSeriesFilter === "all" || currentSeriesFilter === "bolivia") ? "1" : "0.3";
  }
  if (dotU) {
    dotU.setAttribute("cx", curCoordsUrban.x);
    dotU.setAttribute("cy", curCoordsUrban.y);
    dotU.style.opacity = (currentSeriesFilter === "all" || currentSeriesFilter === "urban") ? "1" : "0.3";
  }
  if (dotP) {
    dotP.setAttribute("cx", curCoordsPocona.x);
    dotP.setAttribute("cy", curCoordsPocona.y);
    dotP.style.opacity = (currentSeriesFilter === "all" || currentSeriesFilter === "pocona") ? "1" : "0.3";
  }

  // 5. Actualitzar el Slider i Badge
  const slider = document.getElementById("yearRangeInput");
  if (slider) slider.value = currentSelectedYearIndex;

  const sliderBadge = document.getElementById("sliderYearBadge");
  if (sliderBadge) sliderBadge.textContent = selectedData.year;

  // Actualitzar botons de fites
  document.querySelectorAll(".milestone-chip").forEach(btn => {
    const yr = parseInt(btn.dataset.year);
    if (yr === selectedData.year) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  // 6. Actualitzar la targeta dinàmica inferior
  renderDynamicYearCard(selectedData);
}

function renderDynamicYearCard(d) {
  const card = document.getElementById("dynamicYearCard");
  if (!card) return;

  const bretxaUrbanaPocona = (d.urban - d.pocona).toFixed(1);
  const statusColor = d.bolivia > 50 ? "#059669" : (d.bolivia > 20 ? "#0284c7" : "#d97706");

  card.innerHTML = `
    <div style="display:flex; flex-wrap:wrap; justify-content:space-between; align-items:center; gap:0.75rem; border-bottom:1px solid #e2e8f0; padding-bottom:0.75rem; margin-bottom:1rem;">
      <div style="display:flex; align-items:center; gap:0.6rem;">
        <span style="background:#0f172a; color:#38bdf8; font-family:'JetBrains Mono', monospace; font-weight:800; font-size:1.15rem; padding:0.25rem 0.8rem; border-radius:var(--radius-sm); border:1px solid #334155;">
          📅 ANY ${d.year}
        </span>
        <span style="font-weight:700; color:var(--text-main); font-size:1.05rem;">${d.milestone}</span>
      </div>
      <div style="font-size:0.85rem; color:var(--text-muted); display:flex; align-items:center; gap:0.4rem;">
        <span>Escletxa Territorial:</span>
        <strong style="color:#dc2626; background:#fee2e2; padding:0.15rem 0.5rem; border-radius:4px;">${bretxaUrbanaPocona} punts %</strong>
      </div>
    </div>

    <!-- Mètriques de les 3 realitats -->
    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:0.85rem; margin-bottom:1rem;">
      <div style="background:#f0f9ff; border:1px solid #bae6fd; border-radius:var(--radius-sm); padding:0.75rem 1rem;">
        <div style="font-size:0.78rem; font-weight:700; color:#0369a1; text-transform:uppercase;">🇧🇴 Mitjana Bolívia (Banc Mundial)</div>
        <div style="font-size:1.6rem; font-weight:800; color:#0284c7; font-family:'JetBrains Mono', monospace;">${d.bolivia.toFixed(1)}%</div>
        <div style="font-size:0.78rem; color:#475569;">Població total de l'estat amb accés</div>
      </div>

      <div style="background:#faf5ff; border:1px solid #e9d5ff; border-radius:var(--radius-sm); padding:0.75rem 1rem;">
        <div style="font-size:0.78rem; font-weight:700; color:#6b21a8; text-transform:uppercase;">🏙️ Eix Urbà (Capitals)</div>
        <div style="font-size:1.6rem; font-weight:800; color:#7c3aed; font-family:'JetBrains Mono', monospace;">${d.urban.toFixed(1)}%</div>
        <div style="font-size:0.78rem; color:#475569;">La Paz, Cochabamba i Santa Cruz</div>
      </div>

      <div style="background:#fffbeb; border:1.5px solid #fde68a; border-radius:var(--radius-sm); padding:0.75rem 1rem;">
        <div style="font-size:0.78rem; font-weight:700; color:#92400e; text-transform:uppercase;">🏔️ Vall Rural de Pocona</div>
        <div style="font-size:1.6rem; font-weight:800; color:#d97706; font-family:'JetBrains Mono', monospace;">${d.pocona.toFixed(1)}%</div>
        <div style="font-size:0.78rem; color:#475569;">Aïllament greu per orografia andina</div>
      </div>
    </div>

    <!-- Context històric i educatiu -->
    <div style="background:#f8fafc; border-left:4px solid ${statusColor}; border-radius:0 var(--radius-sm) var(--radius-sm) 0; padding:0.85rem 1.1rem; font-size:0.92rem; line-height:1.55; color:#1e293b;">
      <strong>Context tecnològic i polític (${d.year}):</strong> ${d.context}
    </div>
  `;
}

function attachChartEventListeners() {
  // 1. Selector de sèries
  document.querySelectorAll(".chart-indicator-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".chart-indicator-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentSeriesFilter = btn.dataset.series;
      updateChartVisualization();
    });
  });

  // 2. Slider temporal
  const slider = document.getElementById("yearRangeInput");
  if (slider) {
    slider.addEventListener("input", (e) => {
      currentSelectedYearIndex = parseInt(e.target.value);
      updateChartVisualization();
    });
  }

  // 3. Botons de fites ràpides
  document.querySelectorAll(".milestone-chip").forEach(btn => {
    btn.addEventListener("click", () => {
      const yr = parseInt(btn.dataset.year);
      const idx = boliviaInternetHistorical.findIndex(d => d.year === yr);
      if (idx >= 0) {
        currentSelectedYearIndex = idx;
        updateChartVisualization();
      }
    });
  });

  // 4. Interacció amb SVG (Hover / Clic)
  const svg = document.getElementById("evolutionSvg");
  if (svg) {
    svg.addEventListener("mousemove", handleSvgMouseMove);
    svg.addEventListener("mouseleave", () => {
      const tooltip = document.getElementById("chartTooltip");
      if (tooltip) tooltip.style.display = "none";
    });

    svg.addEventListener("click", handleSvgClick);
  }

  // 5. Botó Play Animació
  const btnPlay = document.getElementById("btnPlayAnimation");
  if (btnPlay) {
    btnPlay.addEventListener("click", toggleAutoplay);
  }
}

function handleSvgMouseMove(e) {
  const svg = document.getElementById("evolutionSvg");
  if (!svg) return;

  const rect = svg.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const svgWidth = rect.width;
  const svgViewBoxWidth = 860;
  const scale = svgViewBoxWidth / svgWidth;
  const svgX = mouseX * scale;

  const leftX = 65;
  const rightX = 810;
  const total = boliviaInternetHistorical.length - 1;

  if (svgX >= leftX && svgX <= rightX) {
    const ratio = (svgX - leftX) / (rightX - leftX);
    const closestIdx = Math.round(ratio * total);
    if (closestIdx >= 0 && closestIdx < boliviaInternetHistorical.length) {
      currentSelectedYearIndex = closestIdx;
      updateChartVisualization();

      // Mostrar tooltip
      const d = boliviaInternetHistorical[closestIdx];
      const tooltip = document.getElementById("chartTooltip");
      if (tooltip) {
        tooltip.style.display = "block";
        tooltip.style.left = `${Math.min(e.clientX - rect.left + 15, rect.width - 180)}px`;
        tooltip.style.top = `${Math.max(10, e.clientY - rect.top - 70)}px`;
        tooltip.innerHTML = `
          <div style="font-weight:800; font-size:0.85rem; color:#38bdf8;">Any ${d.year}</div>
          <div style="font-size:0.8rem; color:#f8fafc;">Bolívia: <strong>${d.bolivia.toFixed(1)}%</strong></div>
          <div style="font-size:0.75rem; color:#a78bfa;">Eix Urbà: ${d.urban.toFixed(1)}%</div>
          <div style="font-size:0.75rem; color:#f59e0b;">Pocona: ${d.pocona.toFixed(1)}%</div>
        `;
      }
    }
  }
}

function handleSvgClick(e) {
  const dot = e.target.closest(".chart-click-dot") || e.target.closest(".milestone-pin-marker");
  if (dot && dot.dataset.idx !== undefined) {
    currentSelectedYearIndex = parseInt(dot.dataset.idx);
    updateChartVisualization();
  }
}

function toggleAutoplay() {
  const btn = document.getElementById("btnPlayAnimation");
  const icon = document.getElementById("playIcon");
  const text = document.getElementById("playText");

  if (isAutoplayRunning) {
    clearInterval(autoplayTimer);
    isAutoplayRunning = false;
    if (icon) icon.textContent = "▶";
    if (text) text.textContent = "Animar 30 Anys";
  } else {
    isAutoplayRunning = true;
    if (icon) icon.textContent = "⏸";
    if (text) text.textContent = "Pausar";

    if (currentSelectedYearIndex >= boliviaInternetHistorical.length - 1) {
      currentSelectedYearIndex = 0;
    }

    autoplayTimer = setInterval(() => {
      currentSelectedYearIndex++;
      if (currentSelectedYearIndex >= boliviaInternetHistorical.length) {
        currentSelectedYearIndex = boliviaInternetHistorical.length - 1;
        clearInterval(autoplayTimer);
        isAutoplayRunning = false;
        if (icon) icon.textContent = "▶";
        if (text) text.textContent = "Animar 30 Anys";
      }
      updateChartVisualization();
    }, 450);
  }
}

// Inicialització automàtica
window.addEventListener("DOMContentLoaded", () => {
  initInternetEvolutionSimulator();
});
