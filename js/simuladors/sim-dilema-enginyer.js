/* ==========================================================
   POCONA: SIMULADOR DIDÀCTIC INTERACTIU
   «El Dilema de l'Enginyer/a: Què passarà d'aquí a 2 anys?» ⏳
   ========================================================== */

const dilemmaQuestions = [
  {
    id: "tech",
    num: 1,
    title: "Equips de Telecomunicació",
    icon: "📡",
    question: "Quina tipologia d'antenes i equips de ràdio instal·laràs a la torre del turó de Pocona?",
    options: {
      A: {
        id: "A",
        label: "Proposta A",
        title: "Equips Industrials d'Alta Gamma (Importació Europea)",
        desc: "Tecnologia molt avançada fabricada a Europa. Ofereix la màxima velocitat el primer dia, però requereix llicències de pagament i peces exclusives que no es venen a Bolívia.",
        type: "assist",
        modelBadge: "Model Assistencialista",
        summaryChoice: "Equips industrials d'importació europea",
        statusLabel: "Aturat per falta de recanvis",
        shortOutcome: "Torre apagada: recanvi car a Europa i llicències caducades.",
        shortYear1: "❌ Peça clau cremada per llamp: costa 800 $ a Europa i el poble no té diners.",
        shortYear2: "❌ Torre apagada: peces d'importació inaccessibles i llicències caducades.",
        outcomeYear1: "Un llamp crema una peça clau. Com que és un model exclusiu estranger, costa 800 $ més l'enviament des d'Europa; el poble no té aquests diners i la xarxa s'apaga.",
        outcomeYear2: "La torre porta mesos apagada sense recanvis i les llicències de programari han caducat. Els equips han quedat abandonats al cim.",
        lesson: "Els equips exclusius generen dependència de recanvis cars i llicències de l'estranger."
      },
      B: {
        id: "B",
        label: "Proposta B",
        title: "Equips de Ràdio Oberts amb Components Estàndard",
        desc: "Antenes i equips de ràdio senzills i robustos. Utilitzen peces, cables i connectors comuns que es troben fàcilment a les botigues d'electrònica de Cochabamba.",
        type: "transform",
        modelBadge: "Model Transformador",
        summaryChoice: "Equips de ràdio oberts i peces locals",
        statusLabel: "Actiu i reparable a Cochabamba",
        shortOutcome: "Xarxa en funcionament continu: peces barates a la comarca.",
        shortYear1: "✅ Fusible fos: comprat a Cochabamba i canviat en menys de 24 hores.",
        shortYear2: "✅ Servei 100% actiu: recanvis barats a Cochabamba i sense llicències privades.",
        outcomeYear1: "Una forta tempesta fon un fusible de seguretat. Com que és una peça barata i comuna, es compra a Cochabamba i el servei torna a funcionar en menys de 24 hores.",
        outcomeYear2: "La xarxa continua emetent sense necessitat de llicències de pagament. El manteniment s'ha fet amb peces locals a un preu assequible per al poble.",
        lesson: "Utilitzar peces estàndard permet reparar la xarxa a prop de casa i a baix cost."
      }
    }
  },
  {
    id: "knowledge",
    num: 2,
    title: "Muntatge i Coneixement Tècnic",
    icon: "🛠️",
    question: "Com s'organitzarà la instal·lació dels equips i la formació de les persones?",
    options: {
      A: {
        id: "A",
        label: "Proposta A",
        title: "Muntatge Ràpid per Tècnics Externs («Clau en mà»)",
        desc: "Enginyers estrangers munten tota la xarxa en 3 dies. Tot queda enllestit molt ràpid, però no s'ensenya res als veïns ni al personal local.",
        type: "assist",
        modelBadge: "Model Assistencialista",
        summaryChoice: "Instal·lació per tècnics externs («clau en mà»)",
        statusLabel: "Sense tècnics locals formats",
        shortOutcome: "Ningú a Pocona sap reparar avaries perquè no es va capacitar ningú del poble.",
        shortYear1: "❌ Antena moguda pel vent: ningú del poble sap com reorientar-la.",
        shortYear2: "❌ Dependència total: en marxar els enginyers, ningú sap solucionar avaries.",
        outcomeYear1: "El vent desvia una antena i el senyal falla. Com que ningú al poble sap com funciona, l'ambulatori queda incomunicat esperant que vingui un tècnic de fora.",
        outcomeYear2: "Els enginyers forans ja han tornat al seu país. Com que no es va formar ningú, la comunitat no sap com solucionar les noves fallades.",
        lesson: "El muntatge extern és ràpid al principi, però fa que el poble depengui sempre de gent de fora."
      },
      B: {
        id: "B",
        label: "Proposta B",
        title: "Muntatge Conjunt i Formació a Joves Locals",
        desc: "L'equip d'enginyeria dedica dues setmanes a ensenyar als joves del poble i al personal de salut com funciona la xarxa, amb guies visuals molt clares.",
        type: "transform",
        modelBadge: "Model Transformador",
        summaryChoice: "Capacitació tècnica local i guies visuals",
        statusLabel: "Equip comunitari capacitat",
        shortOutcome: "Els joves del poble gestionen i reparen la xarxa sols amb total autonomia.",
        shortYear1: "✅ Antena moguda pel vent: els joves pugen amb la guia i l'orienten en un matí.",
        shortYear2: "✅ Equip autònom: el jovent manté la xarxa i ajuda escoles rurals veïnes.",
        outcomeYear1: "El vent desorienta una antena. Els joves que van fer el curs pugen amb la guia visual i la brúixola i tornen a orientar l'antena en un sol matí.",
        outcomeYear2: "Pocona té el seu propi equip comunitari de manteniment: cuiden la xarxa i fins i tot assessoren comunitats veïnes.",
        lesson: "Formar la comunitat demana més temps inicial, però assegura que la xarxa no depengui de ningú."
      }
    }
  },
  {
    id: "energy",
    num: 3,
    title: "Subministrament Elèctric al Turó",
    icon: "⚡",
    question: "Com s'alimentarà la torre al cim de la muntanya on no arriba la xarxa elèctrica?",
    options: {
      A: {
        id: "A",
        label: "Proposta A",
        title: "Generador de Combustible (Benzina)",
        desc: "Comprar un motor elèctric de benzina. És econòmic de comprar i dóna electricitat de seguida, però consumeix molts litres de carburant cada dia.",
        type: "assist",
        modelBadge: "Model Assistencialista",
        summaryChoice: "Generador de combustible (benzina)",
        statusLabel: "Parat per falta de diners per combustible",
        shortOutcome: "Torre apagada la majoria de dies: la benzina a 3.400 m és massa cara.",
        shortYear1: "❌ Generador aturat: portar benzina a 3.400 m costa 60 €/setmana (inassumible).",
        shortYear2: "❌ Motor desgastat: sense diners continus per benzina, la torre s'apaga.",
        outcomeYear1: "Transportar bidons de benzina a 3.400 m costa uns 60 € cada setmana. Aquesta despesa és massa alta per al poble i hi ha talls freqüents de connexió.",
        outcomeYear2: "El generador pateix desgast mecànic i la benzina és molt cara. Sense diners continus per a carburant, la torre està apagada la major part del temps.",
        lesson: "El generador sembla barat el primer dia, però la compra diària de combustible és insostenible."
      },
      B: {
        id: "B",
        label: "Proposta B",
        title: "Sistema Solar Fotovoltaic amb Bateries",
        desc: "Instal·lar panells solars i bateries al cim. Aprofiten la radiació solar, gratuïta i abundant a la zona, per donar electricitat les 24 hores.",
        type: "transform",
        modelBadge: "Model Transformador",
        summaryChoice: "Energia solar fotovoltaica amb bateries",
        statusLabel: "Electricitat solar neta i gratuïta",
        shortOutcome: "Electricitat neta i gratuïta les 24h aprofitant el sol abundant del turó.",
        shortYear1: "✅ Plaques solars: llum neta dia i nit amb cost zero de combustible.",
        shortYear2: "✅ Energia solar infinita: les bateries donen servei continu sense cap cost.",
        outcomeYear1: "El sistema solar genera electricitat dia i nit de franc, assegurant la connexió sense haver de gastar diners en benzina cada setmana.",
        outcomeYear2: "Després de dos anys, el sistema solar continua alimentant els equips amb cost zero. Només cal netejar la pols de les plaques de tant en tant.",
        lesson: "L'energia solar és més cara d'instal·lar el primer dia, però és gratuïta cada dia i independent per sempre."
      }
    }
  },
  {
    id: "governance",
    num: 4,
    title: "Propietat i Administració de la Xarxa",
    icon: "🏛️",
    question: "Qui serà el titular legal i qui prendrà les decisions sobre el servei?",
    options: {
      A: {
        id: "A",
        label: "Proposta A",
        title: "L'ONG es Queda la Propietat i les Claus d'Accés",
        desc: "L'entitat externa es queda la propietat i totes les contrasenyes per gestionar la xarxa a distància i assegurar que es compleix el pla.",
        type: "assist",
        modelBadge: "Model Assistencialista",
        summaryChoice: "Gestió centralitzada per l'organització externa",
        statusLabel: "Sense propietat comunitària",
        shortOutcome: "La xarxa s'abandona en marxar l'ONG: ningú tenia les contrasenyes.",
        shortYear1: "❌ Bloqueig d'accés: esperant setmanes permisos i contrasenyes de fora.",
        shortYear2: "❌ Abandonament: ningú se sent amo de la xarxa i es deixa com a ferralla.",
        outcomeYear1: "L'escola vol connectar nous ordinadors, però com que no tenen les contrasenyes, han d'esperar setmanes que l'ONG els respongui de fora.",
        outcomeYear2: "En acabar el conveni, l'organització marxa. Com que el poble no és el propietari legal ni té els permisos, ningú se'n sent responsable i la xarxa s'abandona.",
        lesson: "Si la comunitat no és la propietària, la xarxa s'abandona quan l'ajuda externa marxa."
      },
      B: {
        id: "B",
        label: "Proposta B",
        title: "Transferència de la Propietat a l'Assemblea de Pocona",
        desc: "La xarxa es registra com un bé comú de tot el municipi, creant una comissió de l'escola, salut i veïns per decidir les normes i cuidar-la.",
        type: "transform",
        modelBadge: "Model Transformador",
        summaryChoice: "Propietat comunitària de l'Assemblea de Pocona",
        statusLabel: "Governança comunitària activa",
        shortOutcome: "La xarxa és un patrimoni col·lectiu protegit i ampliat pel poble.",
        shortYear1: "✅ Comissió veïnal activa: prioritzen salut i escola i tenen guardiola d'estalvi.",
        shortYear2: "✅ Bé comú del poble: el veïnat cuida la xarxa i l'amplia a una altra escola.",
        outcomeYear1: "La comissió de Pocona es reuneix periòdicament: acorden donar prioritat a salut i educació i gestionen una petita guardiola per a imprevistos.",
        outcomeYear2: "En sentir la xarxa com a patrimoni de tothom, el veïnat n'ha tingut cura i fins i tot ha connectat una escola rural veïna.",
        lesson: "Quan la tecnologia és del poble, la comunitat se'n fa responsable i el servei dura per sempre."
      }
    }
  }
];

// Estat del Simulador
let userChoices = {
  tech: null,
  knowledge: null,
  energy: null,
  governance: null
};

let currentPhase = "dilemma"; // 'dilemma' | 'timeline'
let currentDilemmaIndex = 0;   // 0 .. 3
let currentTimelineStep = 0;   // 0 (Any 0), 1 (Any 1), 2 (Any 2), 3 (Balanç)
let maxUnlockedTimelineStep = 0;
let validationMessage = "";

function initDilemmaSimulator() {
  renderDilemmaApp();
}

function countTransformChoices() {
  let count = 0;
  dilemmaQuestions.forEach(d => {
    const chosenKey = userChoices[d.id];
    if (chosenKey && d.options[chosenKey].type === "transform") {
      count++;
    }
  });
  return count;
}

function calculateScores() {
  const transformCount = countTransformChoices();
  const pct = Math.round((transformCount / 4) * 100);
  return {
    sustainability: Math.max(15, pct),
    autonomy: Math.max(10, Math.round(pct * 0.95 + (userChoices.knowledge === "B" ? 5 : 0))),
    resilience: Math.max(20, Math.round(pct * 0.9 + (userChoices.energy === "B" ? 10 : 0)))
  };
}

// Renderitzat Principal
function renderDilemmaApp() {
  const root = document.getElementById("dilemmaAppRoot");
  if (!root) return;

  if (currentPhase === "dilemma") {
    renderDilemmaPhase(root);
  } else {
    renderTimelinePhase(root);
  }
}

// --------------------------------------------------------------------------
// FASE 1: ELECCIÓ SEQÜENCIAL DELS DILEMES (1 -> 2 -> 3 -> 4)
// --------------------------------------------------------------------------
function renderDilemmaPhase(root) {
  const d = dilemmaQuestions[currentDilemmaIndex];
  const chosenOpt = userChoices[d.id];
  const currentLevel = (typeof getPoconaLevel === "function" ? getPoconaLevel() : localStorage.getItem("pocona_learning_level")) || "segur";

  let levelBannerHtml = "";
  if (currentLevel === "insegur") {
    levelBannerHtml = `
      <div style="background: #ecfdf5; border: 2px solid #10b981; border-radius: 10px; padding: 0.75rem 1rem; margin-bottom: 1rem; font-size: 0.92rem; color: #065f46;">
        🌱 <strong>Nivell Insegur:</strong> Busca l'opció amb peces que es puguin comprar a prop i que permetin al poble no dependre de ningú.
      </div>
    `;
  } else if (currentLevel === "segur") {
    levelBannerHtml = `
      <div style="background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 10px; padding: 0.7rem 1rem; margin-bottom: 1rem; font-size: 0.88rem; color: #0369a1;">
        🌱 <strong>Nivell Segur (Guiat):</strong> Avalua quin model (Assistencialista vs. Transformador) fa sostenible la xarxa a llarg termini.
      </div>
    `;
  }

  const badgeA = currentLevel === "insegur" 
    ? (optA.type === 'assist' 
        ? '<div style="margin-top:0.6rem; padding:0.4rem 0.6rem; border-radius:6px; font-weight:700; font-size:0.84rem; background:#fee2e2; color:#991b1b;">⚠️ Risc: dependència de l\'estranger i recanvis cars.</div>' 
        : '<div style="margin-top:0.6rem; padding:0.4rem 0.6rem; border-radius:6px; font-weight:700; font-size:0.84rem; background:#dcfce7; color:#166534;">✅ Autonomia: peces locals i manteniment comunitari.</div>')
    : '';

  const badgeB = currentLevel === "insegur" 
    ? (optB.type === 'assist' 
        ? '<div style="margin-top:0.6rem; padding:0.4rem 0.6rem; border-radius:6px; font-weight:700; font-size:0.84rem; background:#fee2e2; color:#991b1b;">⚠️ Risc: dependència de l\'estranger i recanvis cars.</div>' 
        : '<div style="margin-top:0.6rem; padding:0.4rem 0.6rem; border-radius:6px; font-weight:700; font-size:0.84rem; background:#dcfce7; color:#166534;">✅ Autonomia: peces locals i manteniment comunitari.</div>')
    : '';

  root.innerHTML = `
    <!-- Targeta del Dilema Actual -->
    <div class="dilemma-active-card">
      ${levelBannerHtml}
      <div class="dilemma-active-header">
        <div class="badge badge-cyan" style="font-size: 0.85rem; font-weight: 700;">
          Dilema ${d.num} de 4
        </div>
        <div style="font-size: 0.86rem; color: var(--text-muted);">
          Pas ${currentDilemmaIndex + 1} de 4 de la presa de decisions
        </div>
      </div>

      <div class="dilemma-active-title">
        <span>${d.icon}</span>
        <span>${d.title}</span>
      </div>

      <div class="dilemma-active-question">
        ${d.question}
      </div>

      <!-- Opcions A i B -->
      <div class="dilemma-options-grid">
        <!-- Proposta A -->
        <div class="dilemma-option-box ${chosenOpt === 'A' ? 'active' : ''}" onclick="chooseOption('A')">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span class="opt-badge">Proposta A</span>
            ${chosenOpt === 'A' ? '<span style="color:#0284c7; font-weight:800; font-size:0.85rem;">✓ Triada</span>' : ''}
          </div>
          <div class="opt-title">${optA.title}</div>
          <div class="opt-desc">${optA.desc}</div>
          ${badgeA}
          <div class="opt-select-mark">
            <span>👉 Opció actualment seleccionada</span>
          </div>
        </div>

        <!-- Proposta B -->
        <div class="dilemma-option-box ${chosenOpt === 'B' ? 'active' : ''}" onclick="chooseOption('B')">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span class="opt-badge">Proposta B</span>
            ${chosenOpt === 'B' ? '<span style="color:#0284c7; font-weight:800; font-size:0.85rem;">✓ Triada</span>' : ''}
          </div>
          <div class="opt-title">${optB.title}</div>
          <div class="opt-desc">${optB.desc}</div>
          ${badgeB}
          <div class="opt-select-mark">
            <span>👉 Opció actualment seleccionada</span>
          </div>
        </div>
      </div>

      <!-- Missatge de Validació si no ha triat -->
      ${validationMessage ? `
        <div style="background: #fef2f2; border-left: 4px solid #ef4444; padding: 0.75rem 1rem; border-radius: 4px; color: #b91c1c; font-size: 0.88rem; font-weight: 600;">
          ${validationMessage}
        </div>
      ` : ''}

      <!-- Barra de Navegació entre Dilemes -->
      <div class="dilemma-nav-bar">
        <div>
          ${currentDilemmaIndex > 0 ? `
            <button type="button" class="btn-action btn-outline" onclick="prevDilemma()">
              ← Dilema Anterior (${dilemmaQuestions[currentDilemmaIndex - 1].title})
            </button>
          ` : `<div></div>`}
        </div>

        <div>
          ${currentDilemmaIndex < 3 ? `
            <button type="button" class="btn-action btn-primary" onclick="nextDilemma()">
              Següent: Dilema ${currentDilemmaIndex + 2} (${dilemmaQuestions[currentDilemmaIndex + 1].title}) →
            </button>
          ` : `
            <button type="button" class="btn-action btn-primary" style="background:#0284c7; border-color:#0369a1; font-weight:800;" onclick="finishDilemmas()">
              🚀 Iniciar Simulació Temporal: Veure Conseqüències a l'Any 0 🏁 →
            </button>
          `}
        </div>
      </div>
    </div>
  `;
}

function chooseOption(optionKey) {
  const d = dilemmaQuestions[currentDilemmaIndex];
  userChoices[d.id] = optionKey;
  validationMessage = "";
  renderDilemmaApp();
}

function goToDilemma(index) {
  validationMessage = "";
  currentDilemmaIndex = index;
  renderDilemmaApp();
}

function nextDilemma() {
  const d = dilemmaQuestions[currentDilemmaIndex];
  if (!userChoices[d.id]) {
    validationMessage = "⚠️ Si us plau, selecciona la Proposta A o la Proposta B abans d'avançar.";
    renderDilemmaApp();
    return;
  }
  validationMessage = "";
  if (currentDilemmaIndex < 3) {
    currentDilemmaIndex++;
    renderDilemmaApp();
  }
}

function prevDilemma() {
  validationMessage = "";
  if (currentDilemmaIndex > 0) {
    currentDilemmaIndex--;
    renderDilemmaApp();
  }
}

function finishDilemmas() {
  const d = dilemmaQuestions[3];
  if (!userChoices[d.id]) {
    validationMessage = "⚠️ Si us plau, selecciona una proposta per al Dilema 4 abans d'iniciar la simulació temporal.";
    renderDilemmaApp();
    return;
  }
  validationMessage = "";
  currentPhase = "timeline";
  currentTimelineStep = 0; // Comença a l'Any 0
  maxUnlockedTimelineStep = 0;
  renderDilemmaApp();

  const container = document.getElementById("dilemmaSimContainer");
  if (container) {
    container.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function editDecisions() {
  currentPhase = "dilemma";
  currentDilemmaIndex = 0;
  validationMessage = "";
  renderDilemmaApp();
  const container = document.getElementById("dilemmaSimContainer");
  if (container) {
    container.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

// --------------------------------------------------------------------------
// FASE 2: SIMULACIÓ TEMPORAL (ANY 0 -> ANY 1 -> ANY 2 -> BALANÇ FINAL)
// --------------------------------------------------------------------------
function renderTimelinePhase(root) {
  const transformCount = countTransformChoices();
  const scores = calculateScores();

  const stepsMeta = [
    { title: "🏁 Any 0", subtitle: "El Dia de la Inauguració" },
    { title: "⛈️ Any 1", subtitle: "La Primera Prova de Foc" },
    { title: "⏳ Any 2", subtitle: "L'Hora de la Veritat" },
    { title: "📊 Balanç", subtitle: "Anàlisi Comparativa de Models" }
  ];

  root.innerHTML = `
    <!-- Capçalera de la Màquina del Temps -->
    <div class="timeline-section">
      <div class="timeline-header">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.75rem; margin-bottom:1rem;">
          <h3 style="font-size: 1.35rem; font-weight: 800; color: #ffffff; margin: 0; display:flex; align-items:center; gap:0.5rem;">
            <span>⏳</span> Simulació Temporal: Quines conseqüències tenen les teves decisions?
          </h3>
          <button type="button" class="btn-action btn-outline" style="font-size:0.8rem; padding:0.35rem 0.75rem; color:#94a3b8; border-color:#475569;" onclick="editDecisions()">
            ✏️ Modificar decisions preses
          </button>
        </div>
        <p style="font-size: 0.9rem; color: #94a3b8; margin: 0; text-align: left;">
          Observa l'evolució de la xarxa: <strong>Any 0</strong> (estrena de la instal·lació), <strong>Any 1</strong> (tempesta andina), <strong>Any 2</strong> (després de la marxa de l'equip extern) i l'anàlisi del <strong>Balanç Final</strong> entre el model assistencialista i el model transformador.
        </p>
      </div>

      <!-- Stepper Temporal de 4 Passos -->
      <div class="timeline-stepper">
        ${stepsMeta.map((s, idx) => {
          let btnClass = "timeline-step-btn";
          if (idx === currentTimelineStep) btnClass += " active";

          return `
            <button type="button" class="${btnClass}" onclick="setTimelineStep(${idx})">
              <span class="timeline-step-title">${s.title}</span>
              <span class="timeline-step-subtitle">${s.subtitle}</span>
            </button>
          `;
        }).join("")}
      </div>

      <!-- Contingut de la Targeta Segons el Pas Actiu -->
      <div id="timelineOutcomeCard">
        ${renderCurrentTimelineContent(transformCount, scores)}
      </div>
    </div>
  `;
}

function setTimelineStep(step) {
  currentTimelineStep = step;
  if (step > maxUnlockedTimelineStep) {
    maxUnlockedTimelineStep = step;
  }
  renderDilemmaApp();
}

function renderCurrentTimelineContent(transformCount, scores) {
  if (currentTimelineStep === 0) {
    return renderYear0HTML(transformCount, scores);
  } else if (currentTimelineStep === 1) {
    return renderYear1HTML(transformCount, scores);
  } else if (currentTimelineStep === 2) {
    return renderYear2HTML(transformCount, scores);
  } else {
    return renderBalanceHTML(transformCount, scores);
  }
}

// --- ANY 0 ---
function renderYear0HTML(transformCount, scores) {
  const isHighAssist = transformCount <= 1;
  const isMixed = transformCount >= 2 && transformCount <= 3;
  const cardClass = isHighAssist ? "outcome-assist" : (isMixed ? "outcome-mixed" : "outcome-transform");

  let statusBadgeText = "";
  let statusBadgeBg = "";

  if (transformCount === 4) {
    statusBadgeText = "🌱 Desplegament Participatiu Comunitari";
    statusBadgeBg = "#065f46";
  } else if (isMixed) {
    statusBadgeText = "⚖️ Desplegament amb Enfocament Híbrid";
    statusBadgeBg = "#0369a1";
  } else {
    statusBadgeText = "📦 Desplegament Ràpid «Clau en mà»";
    statusBadgeBg = "#1e3a8a";
  }

  return `
    <div class="timeline-outcome-card ${cardClass}">
      <div class="outcome-header">
        <div class="outcome-title">
          <span>🏁</span> Any 0: Inauguració de la Xarxa a Pocona
        </div>
        <span class="outcome-status-badge" style="background:${statusBadgeBg}; color:#ffffff;">
          ${statusBadgeText}
        </span>
      </div>

      <!-- Targeta Visual de Situació -->
      <div class="timeline-quick-status ${isHighAssist ? 'status-assist' : (isMixed ? 'status-mixed' : 'status-transform')}">
        <div class="quick-status-icon">🎉</div>
        <div class="quick-status-body">
          <div class="quick-status-title">Tot sembla un èxit el primer dia!</div>
          <div class="quick-status-desc">
            La torre està alçada i el senyal arriba per primer cop a l'escola i a l'ambulatori. Hi ha festa al poble!
            <br><strong>⚠️ El parany del Dia 0:</strong> El dia de la inauguració <em>tots els models funcionen</em>. La diferència real no es nota durant la festa, sinó quan arribin les tempestes i marxi l'equip forà.
          </div>
        </div>
      </div>

      <!-- Barres de Progrés Visuals -->
      <div class="timeline-meters-grid">
        <div class="timeline-meter-card">
          <div class="meter-header">
            <span>⏱️ Rapidesa de Muntatge</span>
            <span class="meter-val" style="color:#38bdf8;">${isHighAssist ? 'Molt ràpida (3 dies)' : (isMixed ? 'Mitjana' : 'Requereix tallers')}</span>
          </div>
          <div class="timeline-meter-track">
            <div class="timeline-meter-fill" style="width:${isHighAssist ? '95%' : (isMixed ? '65%' : '40%')}; background:#38bdf8;"></div>
          </div>
        </div>

        <div class="timeline-meter-card">
          <div class="meter-header">
            <span>🧑‍🔧 Autonomia i Formació Local</span>
            <span class="meter-val" style="color:${scores.autonomy >= 60 ? '#34d399' : '#f87171'};">${scores.autonomy}%</span>
          </div>
          <div class="timeline-meter-track">
            <div class="timeline-meter-fill" style="width:${scores.autonomy}%; background:${scores.autonomy >= 60 ? '#10b981' : '#ef4444'};"></div>
          </div>
        </div>

        <div class="timeline-meter-card">
          <div class="meter-header">
            <span>🌱 Sostenibilitat Prevista</span>
            <span class="meter-val" style="color:${scores.sustainability >= 60 ? '#34d399' : '#f59e0b'};">${scores.sustainability}%</span>
          </div>
          <div class="timeline-meter-track">
            <div class="timeline-meter-fill" style="width:${scores.sustainability}%; background:${scores.sustainability >= 60 ? '#10b981' : '#f59e0b'};"></div>
          </div>
        </div>
      </div>

      <!-- Navegació -->
      <div class="timeline-nav-bar">
        <div>
          <button type="button" class="btn-action btn-outline" style="color:#94a3b8; border-color:#475569;" onclick="editDecisions()">
            ← Canviar Decisions
          </button>
        </div>
        <div>
          <button type="button" class="btn-action btn-primary" onclick="setTimelineStep(1)">
            Avançar a l'Any 1: Prova davant la Tempesta ⛈️ →
          </button>
        </div>
      </div>
    </div>
  `;
}

// --- ANY 1 ---
function renderYear1HTML(transformCount, scores) {
  const isHighAssist = transformCount <= 1;
  const isMixed = transformCount >= 2 && transformCount <= 3;
  const cardClass = isHighAssist ? "outcome-assist" : (isMixed ? "outcome-mixed" : "outcome-transform");

  let statusBadgeText = "";
  let statusBadgeBg = "";

  if (transformCount === 4) {
    statusBadgeText = "🌱 Resolució Local Autònoma";
    statusBadgeBg = "#065f46";
  } else if (isMixed) {
    statusBadgeText = "⚖️ Resolució amb Lleugera Dependència Externa";
    statusBadgeBg = "#0369a1";
  } else {
    statusBadgeText = "📦 Aturada per Dependència Forana";
    statusBadgeBg = "#1e3a8a";
  }

  return `
    <div class="timeline-outcome-card ${cardClass}">
      <div class="outcome-header">
        <div class="outcome-title">
          <span>⛈️</span> Any 1: Tempesta Andina a 3.400 m
        </div>
        <span class="outcome-status-badge" style="background:${statusBadgeBg}; color:#ffffff;">
          ${statusBadgeText}
        </span>
      </div>

      <!-- Targeta d'Alerta Visual -->
      <div class="timeline-quick-status ${isHighAssist ? 'status-assist' : (isMixed ? 'status-mixed' : 'status-transform')}">
        <div class="quick-status-icon">${isHighAssist ? '🚨' : (isMixed ? '⚠️' : '🛡️')}</div>
        <div class="quick-status-body">
          <div class="quick-status-title">
            ${isHighAssist ? 'Xarxa aturada durant mesos!' : (isMixed ? 'Xarxa amb talls i problemes parcials' : 'Avaria solucionada en menys de 24 hores!')}
          </div>
          <div class="quick-status-desc">
            Vents de 90 km/h i llamps afecten la torre del cim. 
            ${isHighAssist ? 'Sense peces locals ni gent formada, el metge queda incomunicat esperant ajuda exterior.' : (isMixed ? 'Algunes parts s\'arreglen ràpid, però les peces foranes fan esperar setmanes.' : 'Els joves de Pocona pugen a la torre i canvien el fusible amb recanvis comuns de Cochabamba.')}
          </div>
        </div>
      </div>

      <!-- Graella Visual 2x2 de les 4 Decisions -->
      <div class="timeline-visual-grid">
        ${dilemmaQuestions.map(d => {
          const choiceKey = userChoices[d.id];
          const opt = d.options[choiceKey];
          const isTransform = opt.type === "transform";
          return `
            <div class="visual-mini-card ${isTransform ? 'mini-transform' : 'mini-assist'}">
              <div class="mini-card-head">
                <span>${d.icon} <strong>${d.title}</strong></span>
                <span class="mini-status-chip ${isTransform ? 'chip-success' : 'chip-danger'}">
                  ${isTransform ? '🟢 Local' : '🔴 Forà'}
                </span>
              </div>
              <div class="mini-card-outcome">
                ${opt.shortYear1}
              </div>
            </div>
          `;
        }).join("")}
      </div>

      <!-- Mètriques Instantànies -->
      <div class="outcome-metrics-grid">
        <div class="outcome-metric-item">
          <span class="outcome-metric-label">Temps d'aturada</span>
          <span class="outcome-metric-val" style="color:${isHighAssist ? '#f87171' : (isMixed ? '#fbbf24' : '#34d399')};">
            ${isHighAssist ? '⏳ > 2 mesos' : (isMixed ? '⏳ 1-2 setmanes' : '⚡ < 24 hores')}
          </span>
        </div>
        <div class="outcome-metric-item">
          <span class="outcome-metric-label">Despesa d'avaria</span>
          <span class="outcome-metric-val" style="color:${isHighAssist ? '#f87171' : '#34d399'};">
            ${isHighAssist ? '💸 > 600 $ (importació)' : '🪙 < 15 $ (recanvi comú)'}
          </span>
        </div>
        <div class="outcome-metric-item">
          <span class="outcome-metric-label">Resiliència</span>
          <span class="outcome-metric-val" style="color:${scores.resilience >= 60 ? '#34d399' : '#38bdf8'};">${scores.resilience}%</span>
        </div>
      </div>

      <!-- Navegació -->
      <div class="timeline-nav-bar">
        <div>
          <button type="button" class="btn-action btn-outline" style="color:#94a3b8; border-color:#475569;" onclick="setTimelineStep(0)">
            ← Tornar a l'Any 0
          </button>
        </div>
        <div>
          <button type="button" class="btn-action btn-primary" onclick="setTimelineStep(2)">
            Avançar a l'Any 2: L'Hora de la Veritat ⏳ →
          </button>
        </div>
      </div>
    </div>
  `;
}

// --- ANY 2 ---
function renderYear2HTML(transformCount, scores) {
  const isHighAssist = transformCount <= 1;
  const isMixed = transformCount >= 2 && transformCount <= 3;
  const cardClass = isHighAssist ? "outcome-assist" : (isMixed ? "outcome-mixed" : "outcome-transform");

  let statusBadgeText = "";
  let statusBadgeBg = "";

  if (transformCount === 4) {
    statusBadgeText = "🌱 Xarxa Comunitària Viva i Autònoma";
    statusBadgeBg = "#065f46";
  } else if (isMixed) {
    statusBadgeText = "⚖️ Servei Actiu amb Dependències Puntuals";
    statusBadgeBg = "#0369a1";
  } else {
    statusBadgeText = "📦 Desconnexió i Abandonament";
    statusBadgeBg = "#1e3a8a";
  }

  return `
    <div class="timeline-outcome-card ${cardClass}">
      <div class="outcome-header">
        <div class="outcome-title">
          <span>⏳</span> Any 2: L'Hora de la Veritat (L'equip forà ha marxat)
        </div>
        <span class="outcome-status-badge" style="background:${statusBadgeBg}; color:#ffffff;">
          ${statusBadgeText}
        </span>
      </div>

      <!-- Targeta d'Estat Final -->
      <div class="timeline-quick-status ${isHighAssist ? 'status-assist' : (isMixed ? 'status-mixed' : 'status-transform')}">
        <div class="quick-status-icon">${isHighAssist ? '💀' : (isMixed ? '⚠️' : '🌟')}</div>
        <div class="quick-status-body">
          <div class="quick-status-title">
            ${isHighAssist ? 'La xarxa s\'ha mort: la torre ha quedat abandonada' : (isMixed ? 'La xarxa resisteix a batzegades amb dificultats' : 'Xarxa viva, autònoma i salvant vides!')}
          </div>
          <div class="quick-status-desc">
            ${isHighAssist ? 'L\'equip extern ha marxat. Sense recanvis assequibles, ni formació, ni diners per a benzina, la torre és ferralla inútil.' : (isMixed ? 'El poble cuida les parts que entén, però les peces foranes continuen provocant talls i despeses imprevistes.' : 'L\'assemblea de Pocona gestiona la xarxa amb orgull: l\'ambulatori ha fet més de 450 teleconsultes amb metges especialistes.')}
          </div>
        </div>
      </div>

      <!-- Graella Visual 2x2 de les 4 Decisions -->
      <div class="timeline-visual-grid">
        ${dilemmaQuestions.map(d => {
          const choiceKey = userChoices[d.id];
          const opt = d.options[choiceKey];
          const isTransform = opt.type === "transform";
          return `
            <div class="visual-mini-card ${isTransform ? 'mini-transform' : 'mini-assist'}">
              <div class="mini-card-head">
                <span>${d.icon} <strong>${d.title}</strong></span>
                <span class="mini-status-chip ${isTransform ? 'chip-success' : 'chip-danger'}">
                  ${isTransform ? '🟢 Autònom' : '🔴 Inactiu'}
                </span>
              </div>
              <div class="mini-card-outcome">
                ${opt.shortYear2}
              </div>
            </div>
          `;
        }).join("")}
      </div>

      <!-- Mètriques Instantànies -->
      <div class="outcome-metrics-grid">
        <div class="outcome-metric-item">
          <span class="outcome-metric-label">Telemedicina a l'Ambulatori</span>
          <span class="outcome-metric-val" style="color:${isHighAssist ? '#f87171' : '#34d399'};">
            ${isHighAssist ? '❌ 0 (Inactiva)' : (isMixed ? '🟡 Amb talls' : '✅ > 450 consultes')}
          </span>
        </div>
        <div class="outcome-metric-item">
          <span class="outcome-metric-label">Autonomia Comunitària</span>
          <span class="outcome-metric-val" style="color:${scores.autonomy >= 60 ? '#34d399' : '#f87171'};">${scores.autonomy}%</span>
        </div>
        <div class="outcome-metric-item">
          <span class="outcome-metric-label">Sostenibilitat Real</span>
          <span class="outcome-metric-val" style="color:${scores.sustainability >= 60 ? '#34d399' : '#f59e0b'};">${scores.sustainability}%</span>
        </div>
      </div>

      <!-- Navegació -->
      <div class="timeline-nav-bar">
        <div>
          <button type="button" class="btn-action btn-outline" style="color:#94a3b8; border-color:#475569;" onclick="setTimelineStep(1)">
            ← Tornar a l'Any 1
          </button>
        </div>
        <div>
          <button type="button" class="btn-action btn-primary" style="background:#0284c7; border-color:#0369a1;" onclick="setTimelineStep(3)">
            Descobrir el Balanç Final 📊 →
          </button>
        </div>
      </div>
    </div>
  `;
}

// --- BALANÇ FINAL I CONCLUSIÓ ---
function renderBalanceHTML(transformCount, scores) {
  const isHighAssist = transformCount <= 1;
  const isMixed = transformCount >= 2 && transformCount <= 3;
  const cardClass = isHighAssist ? "outcome-assist" : (isMixed ? "outcome-mixed" : "outcome-transform");

  let verdictTitle = "";
  let verdictBadge = "";
  let verdictBadgeBg = "";
  let verdictDesc = "";

  if (transformCount === 4) {
    verdictTitle = "🌱 Model Transformador Integral";
    verdictBadge = "4 de 4 decisions transformadores";
    verdictBadgeBg = "#065f46";
    verdictDesc = "Excel·lent! Peces locals, formació, plaques solars i assemblea. La xarxa és 100% autònoma i durarà per sempre.";
  } else if (transformCount === 3) {
    verdictTitle = "✨ Model Transformador amb 1 Punt Feble";
    verdictBadge = "3 de 4 decisions transformadores";
    verdictBadgeBg = "#047857";
    verdictDesc = "Molt bona feina! El projecte és sòlid, però l'única decisió assistencialista provoca retards o sobrecostos.";
  } else if (isMixed) {
    verdictTitle = "⚖️ Model Híbrid (Resultat Irregular)";
    verdictBadge = "2 transformadores / 2 assistencialistes";
    verdictBadgeBg = "#0369a1";
    verdictDesc = "Resultat a mitges: allò gestionat pel poble funciona bé, però les peces o ajudes de fora acaben encallant el servei.";
  } else {
    verdictTitle = "📦 Model Assistencialista («Clau en mà»)";
    verdictBadge = "0-1 decisions transformadores";
    verdictBadgeBg = "#1e3a8a";
    verdictDesc = "Ràpid d'inaugurar el dia 1, però un fracàs al cap de 2 anys per falta de formació i peces inaccessibles.";
  }

  return `
    <div class="timeline-outcome-card ${cardClass}">
      <div class="outcome-header">
        <div class="outcome-title">
          <span>📊</span> Balanç Final: Resum dels 2 Models
        </div>
        <span class="outcome-status-badge" style="background:${verdictBadgeBg}; color:#ffffff;">
          ${verdictBadge}
        </span>
      </div>

      <!-- Veredicte Visual Sintètic -->
      <div style="background: rgba(0, 0, 0, 0.28); padding: 0.9rem 1.15rem; border-radius: var(--radius-sm); border: 1px solid rgba(255, 255, 255, 0.1);">
        <h4 style="color:#ffffff; margin:0 0 0.25rem 0; font-size:1.1rem; display:flex; align-items:center; gap:0.4rem;">
          ${verdictTitle}
        </h4>
        <p style="color:#cbd5e1; margin:0; font-size:0.9rem; line-height:1.45;">${verdictDesc}</p>
      </div>

      <!-- Barres de Progrés Visuals -->
      <div class="timeline-meters-grid">
        <div class="timeline-meter-card">
          <div class="meter-header">
            <span>🧑‍🔧 Autonomia Local</span>
            <span class="meter-val" style="color:${scores.autonomy >= 60 ? '#34d399' : '#f87171'};">${scores.autonomy}%</span>
          </div>
          <div class="timeline-meter-track">
            <div class="timeline-meter-fill" style="width:${scores.autonomy}%; background:${scores.autonomy >= 60 ? '#10b981' : '#ef4444'};"></div>
          </div>
        </div>

        <div class="timeline-meter-card">
          <div class="meter-header">
            <span>🌱 Sostenibilitat a 2 Anys</span>
            <span class="meter-val" style="color:${scores.sustainability >= 60 ? '#34d399' : '#f59e0b'};">${scores.sustainability}%</span>
          </div>
          <div class="timeline-meter-track">
            <div class="timeline-meter-fill" style="width:${scores.sustainability}%; background:${scores.sustainability >= 60 ? '#10b981' : '#f59e0b'};"></div>
          </div>
        </div>

        <div class="timeline-meter-card">
          <div class="meter-header">
            <span>🛡️ Resiliència davant Avaries</span>
            <span class="meter-val" style="color:${scores.resilience >= 60 ? '#34d399' : '#38bdf8'};">${scores.resilience}%</span>
          </div>
          <div class="timeline-meter-track">
            <div class="timeline-meter-fill" style="width:${scores.resilience}%; background:${scores.resilience >= 60 ? '#10b981' : '#38bdf8'};"></div>
          </div>
        </div>
      </div>

      <!-- Graella Visual de les 4 Decisions -->
      <div class="timeline-visual-grid">
        ${dilemmaQuestions.map(d => {
          const choiceKey = userChoices[d.id];
          const opt = d.options[choiceKey];
          const isTransform = opt.type === "transform";
          return `
            <div class="visual-mini-card ${isTransform ? 'mini-transform' : 'mini-assist'}">
              <div class="mini-card-head">
                <span>${d.icon} <strong>${d.title}</strong></span>
                <span class="mini-status-chip ${isTransform ? 'chip-success' : 'chip-danger'}">
                  ${isTransform ? '🟢 ' + opt.statusLabel : '🔴 ' + opt.statusLabel}
                </span>
              </div>
              <div class="mini-card-outcome">
                ${opt.shortOutcome}
              </div>
            </div>
          `;
        }).join("")}
      </div>

      <!-- Comparativa Visual en 2 Columnes -->
      <div class="balance-comparison-box">
        <div class="balance-compare-col col-assist">
          <div style="font-weight:800; color:#fca5a5; margin-bottom:0.35rem; display:flex; align-items:center; gap:0.35rem; font-size:0.92rem;">
            <span>📦</span> Model Assistencialista («Clau en mà»)
          </div>
          <ul style="color:#cbd5e1; font-size:0.84rem; line-height:1.45; margin:0 0 0 1rem; padding:0;">
            <li>⚡ <strong>Ràpid</strong> el dia 1, però zero formació veïnal.</li>
            <li>💸 <strong>Peces cares</strong> i dependència forana contínua.</li>
            <li>❌ <strong>Any 2: La xarxa s'abandona</strong> com a ferralla.</li>
          </ul>
        </div>
        <div class="balance-compare-col col-transform">
          <div style="font-weight:800; color:#6ee7b7; margin-bottom:0.35rem; display:flex; align-items:center; gap:0.35rem; font-size:0.92rem;">
            <span>🌱</span> Model Transformador (Tecnologia Comunitària)
          </div>
          <ul style="color:#cbd5e1; font-size:0.84rem; line-height:1.45; margin:0 0 0 1rem; padding:0;">
            <li>⏳ <strong>Demana temps</strong> inicial per fer tallers i acords.</li>
            <li>🔧 <strong>Peces locals barates</strong> i plaques solars netes.</li>
            <li>✅ <strong>Any 2: Xarxa 100% autònoma</strong> i viva per sempre.</li>
          </ul>
        </div>
      </div>

      <!-- Barra Final d'Accions -->
      <div class="timeline-nav-bar">
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <button type="button" class="btn-action btn-outline" style="color:#cbd5e1; border-color:#64748b;" onclick="setTimelineStep(2)">
            ← Revisar Any 2
          </button>
          <button type="button" class="btn-action btn-outline" style="color:#cbd5e1; border-color:#64748b;" onclick="editDecisions()">
            ✏️ Canviar Decisions
          </button>
        </div>

        <div>
          <button type="button" class="btn-action btn-primary" style="background:#16a34a; border-color:#15803d; font-size:0.95rem; font-weight:800; padding:0.65rem 1.3rem; box-shadow:0 4px 14px rgba(22, 163, 74, 0.35);" onclick="restartDilemmaSimulator()">
            🔄 Reiniciar Simulador
          </button>
        </div>
      </div>
    </div>
  `;
}

function restartDilemmaSimulator() {
  userChoices = {
    tech: null,
    knowledge: null,
    energy: null,
    governance: null
  };
  currentPhase = "dilemma";
  currentDilemmaIndex = 0;
  currentTimelineStep = 0;
  maxUnlockedTimelineStep = 0;
  validationMessage = "";

  renderDilemmaApp();

  const container = document.getElementById("dilemmaSimContainer");
  if (container) {
    container.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

// Compatibilitat global amb qualsevol crida externa
window.initDilemmaSimulator = initDilemmaSimulator;
window.chooseOption = chooseOption;
window.goToDilemma = goToDilemma;
window.nextDilemma = nextDilemma;
window.prevDilemma = prevDilemma;
window.finishDilemmas = finishDilemmas;
window.editDecisions = editDecisions;
window.setTimelineStep = setTimelineStep;
window.setTimelineYear = setTimelineStep;
window.restartDilemmaSimulator = restartDilemmaSimulator;

window.addEventListener("DOMContentLoaded", () => {
  initDilemmaSimulator();
});

window.addEventListener("poconaLevelChanged", () => {
  if (typeof renderDilemmaApp === "function") renderDilemmaApp();
});
