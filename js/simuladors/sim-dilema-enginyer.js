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
        shortOutcome: "Torre apagada des de fa mesos: la peça trencada costa 800 $ a Europa i les llicències han caducat.",
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
        shortOutcome: "La xarxa continua funcionant: les reparacions es fan ràpid amb peces barates comprades a la regió.",
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
        shortOutcome: "Els joves del poble gestionen i reparen la xarxa sols, amb total autonomia.",
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
        shortOutcome: "Torre apagada la majoria de dies: pagar i transportar benzina a 3.400 m és inviable per al poble.",
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
        shortOutcome: "Electricitat neta i gratuïta les 24 hores del dia, aprofitant el sol abundant del turó.",
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
        shortOutcome: "La xarxa s'abandona en marxar l'ONG perquè la comunitat no tenia la propietat ni les contrasenyes.",
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
        shortOutcome: "La xarxa és un patrimoni col·lectiu ben cuidat que fins i tot s'ha ampliat a una escola rural propera.",
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
  const optA = d.options.A;
  const optB = d.options.B;

  root.innerHTML = `
    <!-- Barra de Progrés dels Dilemes (1 a 4) -->
    <div class="dilemma-stepper-bar">
      ${dilemmaQuestions.map((item, idx) => {
        const isDone = userChoices[item.id] !== null;
        const isActive = idx === currentDilemmaIndex;
        let pillClass = "dilemma-step-pill";
        if (isActive) pillClass += " active";
        else if (isDone) pillClass += " completed";

        return `
          <button type="button" class="${pillClass}" onclick="goToDilemma(${idx})" title="Dilema ${item.num}: ${item.title}">
            <span class="step-dot">${isDone ? "✓" : item.num}</span>
            <span>${item.icon} ${item.title}</span>
          </button>
          ${idx < 3 ? '<span class="dilemma-step-arrow">➔</span>' : ''}
        `;
      }).join("")}
    </div>

    <!-- Targeta del Dilema Actual -->
    <div class="dilemma-active-card">
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
          <span>🏁</span> Any 0: El Dia de la Inauguració a Pocona
        </div>
        <span class="outcome-status-badge" style="background:${statusBadgeBg}; color:#ffffff;">
          ${statusBadgeText}
        </span>
      </div>

      <div class="outcome-story-box">
        <p>
          🎉 <strong>La celebració inicial:</strong> La torre de telecomunicacions s'alça al cim de la muntanya i el senyal arriba per primer cop a l'ambulatori i a l'escola de Pocona. Hi ha festa al poble, música i agraïments.
        </p>
        <p>
          ${isHighAssist ? 
            '<strong>La perspectiva del model assistencialista:</strong> La instal·lació s\'ha completat en temps rècord mitjançant tècnics forans i equips d\'alta tecnologia. A curt termini, tot sembla un gran èxit perquè funciona perfectament. Tanmateix, s\'ha generat un model vulnerable: la població no ha participat en el muntatge tècnic, les peces són d\'importació costosa i la gestió depèn d\'actors externs.' : 
            (isMixed ? 
              '<strong>La perspectiva d\'un model mixt:</strong> S\'ha combinat la rapidesa d\'algunes solucions externes amb iniciatives d\'apoderament comunitari. La xarxa comença a funcionar amb bones expectatives, tot i que caldrà veure com conviuen els components locals amb les dependències externes.' : 
              '<strong>La perspectiva del model de cooperació transformadora:</strong> Posar en marxa la xarxa ha exigit més temps previ de tallers, assemblees i formació tècnica conjunta. Però el dia de la inauguració, el veïnat sap que la torre no és un regal forà, sinó una infraestructura pròpia que ells mateixos han ajudat a alçar i entenen com mantenir.')}
        </p>
      </div>

      <div class="outcome-metrics-grid">
        <div class="outcome-metric-item">
          <span class="outcome-metric-label">Facilitat / Rapidesa Inicial</span>
          <span class="outcome-metric-val" style="color:#38bdf8;">${isHighAssist ? 'Molt Alta (Clau en mà)' : (isMixed ? 'Equilibrada' : 'Requereix Més Temps')}</span>
        </div>
        <div class="outcome-metric-item">
          <span class="outcome-metric-label">Capacitació i Autonomia Local</span>
          <span class="outcome-metric-val" style="color:${scores.autonomy >= 60 ? '#34d399' : '#94a3b8'};">${scores.autonomy}%</span>
        </div>
        <div class="outcome-metric-item">
          <span class="outcome-metric-label">Sostenibilitat Prevista</span>
          <span class="outcome-metric-val" style="color:${scores.sustainability >= 60 ? '#34d399' : '#fbbf24'};">${scores.sustainability}%</span>
        </div>
      </div>

      <div class="outcome-lesson-card">
        💡 <strong>Clau de l'Enginyeria pel Desenvolupament:</strong> El dia de la inauguració pràcticament qualsevol instal·lació funciona. La diferència de fons entre el model assistencialista i el transformador no es nota durant la festa, sinó en com resisteix el sistema quan apareixen les primeres incidències reals.
      </div>

      <div class="timeline-nav-bar">
        <div>
          <button type="button" class="btn-action btn-outline" style="color:#94a3b8; border-color:#475569;" onclick="editDecisions()">
            ← Modificar Decisions dels Dilemes
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
    statusBadgeText = "📦 Aturada per Dependència de Recanvis i Suport Forà";
    statusBadgeBg = "#1e3a8a";
  }

  return `
    <div class="timeline-outcome-card ${cardClass}">
      <div class="outcome-header">
        <div class="outcome-title">
          <span>⛈️</span> Any 1: La Primera Gran Prova (Tempesta Andina a 3.400 m)
        </div>
        <span class="outcome-status-badge" style="background:${statusBadgeBg}; color:#ffffff;">
          ${statusBadgeText}
        </span>
      </div>

      <div class="outcome-story-box">
        <p>
          ⚡ <strong>Arriba l'època de tempestes a la serralada:</strong> Vents de 90 km/h, llamps freqüents i pluges intenses afecten la instal·lació del turó.
        </p>
        <p>
          ${isHighAssist ? 
            '<strong>Les conseqüències del model assistencialista a la pràctica:</strong> Els equips d\'alta tecnologia requereixen recanvis exclusius d\'Europa molt costosos, el subministrament de benzina pel generador no s\'ha pogut pagar contínuament i no hi ha veïns amb coneixement tècnic per diagnosticar la fallada. La xarxa s\'apaga durant setmanes i l\'ambulatori queda incomunicat a l\'espera de suport exterior.' : 
            (isMixed ? 
              '<strong>Les conseqüències del model mixt:</strong> La xarxa respon de manera desigual. Les decisions participatives han permès resoldre alguns aspectes amb agilitat local, però les opcions assistencialistes generen sobrecostos imprevistos o retards en l\'espera d\'ajuda externa.' : 
              '<strong>Les conseqüències del model transformador:</strong> L\'aposta per tecnologia apropiada i capacitació dóna fruits immediats. En fallar un fusible, els joves formats pugen a la torre amb eines bàsiques, compren un recanvi comú a Cochabamba i el servei es restableix en menys de 24 hores sense cap cost desproporcionat.')}
        </p>
      </div>

      <!-- Desglossament de l'Any 1 -->
      <div class="dilemma-breakdown-box">
        <div style="font-size:0.82rem; font-weight:800; color:#38bdf8; text-transform:uppercase; letter-spacing:0.04em;">
          🔍 Conseqüències observades segons les teves 4 decisions:
        </div>
        ${dilemmaQuestions.map(d => {
          const choiceKey = userChoices[d.id];
          const opt = d.options[choiceKey];
          const isTransform = opt.type === "transform";
          return `
            <div class="breakdown-item">
              <div class="breakdown-title" style="display:flex; justify-content:space-between; align-items:center;">
                <span>${d.icon} Dilema ${d.num} (${d.title}): ${opt.summaryChoice}</span>
                <span style="font-size:0.75rem; padding:0.15rem 0.5rem; border-radius:10px; background:${isTransform ? 'rgba(16,185,129,0.2)' : 'rgba(59,130,246,0.2)'}; color:${isTransform ? '#6ee7b7' : '#93c5fd'};">
                  ${isTransform ? '🌱 Enfocament Transformador' : '📦 Enfocament Assistencialista'}
                </span>
              </div>
              <div class="breakdown-text">
                ${opt.outcomeYear1}
              </div>
            </div>
          `;
        }).join("")}
      </div>

      <div class="outcome-metrics-grid">
        <div class="outcome-metric-item">
          <span class="outcome-metric-label">Temps de Restabliment</span>
          <span class="outcome-metric-val" style="color:${isHighAssist ? '#93c5fd' : (isMixed ? '#fbbf24' : '#34d399')};">
            ${isHighAssist ? '> 2 mesos (esperant ajuda)' : (isMixed ? '1-2 setmanes' : '< 24 hores (resolució local)')}
          </span>
        </div>
        <div class="outcome-metric-item">
          <span class="outcome-metric-label">Despesa Imprevista</span>
          <span class="outcome-metric-val" style="color:${isHighAssist ? '#93c5fd' : '#34d399'};">
            ${isHighAssist ? '> 600 $ + ports internacionals' : 'Recanvi comú assequible'}
          </span>
        </div>
        <div class="outcome-metric-item">
          <span class="outcome-metric-label">Resiliència davant Avaries</span>
          <span class="outcome-metric-val" style="color:${scores.resilience >= 60 ? '#34d399' : '#38bdf8'};">${scores.resilience}%</span>
        </div>
      </div>

      <div class="timeline-nav-bar">
        <div>
          <button type="button" class="btn-action btn-outline" style="color:#94a3b8; border-color:#475569;" onclick="setTimelineStep(0)">
            ← Tornar a l'Any 0 (Inauguració)
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
    statusBadgeText = "📦 Desconnexió per Sobrecost i Manca de Capacitat Local";
    statusBadgeBg = "#1e3a8a";
  }

  return `
    <div class="timeline-outcome-card ${cardClass}">
      <div class="outcome-header">
        <div class="outcome-title">
          <span>⏳</span> Any 2: L'Hora de la Veritat (L'equip extern ha marxat)
        </div>
        <span class="outcome-status-badge" style="background:${statusBadgeBg}; color:#ffffff;">
          ${statusBadgeText}
        </span>
      </div>

      <div class="outcome-story-box">
        <p>
          ⏳ <strong>Han transcorregut 2 anys:</strong> El conveni del projecte ha finalitzat formalment, l'equip tècnic exterior ha tornat als seus països i la comunitat de Pocona assumeix la realitat quotidiana del servei.
        </p>
        <p>
          ${isHighAssist ? 
            '<strong>La realitat d\'un model assistencialista sense continuïtat:</strong> Sense suport financer ni tècnic extern, els equips d\'importació han quedat inactius per manca de llicències o peces, la benzina és inassumible i ningú té les contrasenyes d\'administració. Aquest escenari il·lustra un fenomen freqüent en cooperació: infraestructures costoses que queden abandonades per manca d\'arrelament i sobirania local.' : 
            (isMixed ? 
              '<strong>La realitat d\'un model mixt:</strong> La xarxa continua prestant servei, però amb limitacions. Allà on es va capacitar la comunitat i es va optar per solucions sostenibles, el servei funciona amb fluïdesa; tanmateix, els punts que es van deixar lligats a tecnologies o gestions externes continuen generant tensions i aturades periòdiques.' : 
              '<strong>La realitat d\'un model de cooperació transformadora:</strong> Pocona és la propietària efectiva i legítima de la seva infraestructura. L\'ambulatori ha realitzat més de 450 teleconsultes mèdiques amb l\'hospital de Cochabamba, els joves formats mantenen el sistema i l\'assemblea gestiona les quotes d\'estalvi sense dependre de cap entitat externa.')}
        </p>
      </div>

      <!-- Desglossament Any 2 -->
      <div class="dilemma-breakdown-box">
        <div style="font-size:0.82rem; font-weight:800; color:#38bdf8; text-transform:uppercase; letter-spacing:0.04em;">
          🎓 Estat dels 4 àmbits després de 2 anys:
        </div>
        ${dilemmaQuestions.map(d => {
          const choiceKey = userChoices[d.id];
          const opt = d.options[choiceKey];
          const isTransform = opt.type === "transform";
          return `
            <div class="breakdown-item">
              <div class="breakdown-title" style="display:flex; justify-content:space-between; align-items:center;">
                <span>${d.icon} Dilema ${d.num} (${d.title}): ${opt.summaryChoice}</span>
                <span style="font-size:0.75rem; padding:0.15rem 0.5rem; border-radius:10px; background:${isTransform ? 'rgba(16,185,129,0.2)' : 'rgba(59,130,246,0.2)'}; color:${isTransform ? '#6ee7b7' : '#93c5fd'};">
                  ${isTransform ? '🌱 Model Transformador' : '📦 Model Assistencialista'}
                </span>
              </div>
              <div class="breakdown-text" style="color:#e2e8f0;">
                ${opt.outcomeYear2}
              </div>
            </div>
          `;
        }).join("")}
      </div>

      <div class="outcome-metrics-grid">
        <div class="outcome-metric-item">
          <span class="outcome-metric-label">Telemedicina a l'Ambulatori</span>
          <span class="outcome-metric-val" style="color:${isHighAssist ? '#93c5fd' : '#34d399'};">
            ${isHighAssist ? 'Inactiva (Sense connexió)' : (isMixed ? 'Activa amb talls puntuals' : '> 450 consultes actives')}
          </span>
        </div>
        <div class="outcome-metric-item">
          <span class="outcome-metric-label">Autonomia Comunitària</span>
          <span class="outcome-metric-val" style="color:${scores.autonomy >= 60 ? '#34d399' : '#38bdf8'};">${scores.autonomy}%</span>
        </div>
        <div class="outcome-metric-item">
          <span class="outcome-metric-label">Sostenibilitat a 2 Anys</span>
          <span class="outcome-metric-val" style="color:${scores.sustainability >= 60 ? '#34d399' : '#38bdf8'};">${scores.sustainability}%</span>
        </div>
      </div>

      <div class="timeline-nav-bar">
        <div>
          <button type="button" class="btn-action btn-outline" style="color:#94a3b8; border-color:#475569;" onclick="setTimelineStep(1)">
            ← Tornar a l'Any 1 (La Tempesta)
          </button>
        </div>
        <div>
          <button type="button" class="btn-action btn-primary" style="background:#0284c7; border-color:#0369a1;" onclick="setTimelineStep(3)">
            Descobrir el Balanç Final i Conclusió 📊 →
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
    verdictDesc = "Excel·lent! Has apostat per peces locals, formació comunitària, energia solar i sobirania veïnal. La xarxa és 100% autònoma i funcionarà molts anys sense dependre de ningú.";
  } else if (transformCount === 3) {
    verdictTitle = "✨ Model Transformador amb 1 Punt Feble";
    verdictBadge = "3 de 4 decisions transformadores";
    verdictBadgeBg = "#047857";
    verdictDesc = "Molt bona feina! El projecte té un fort arrelament local. Compte amb l'única decisió assistencialista que has triat, ja que és la font dels sobrecostos o de la dependència exterior.";
  } else if (isMixed) {
    verdictTitle = "⚖️ Model Híbrid (Resultat Irregular)";
    verdictBadge = "2 transformadores / 2 assistencialistes";
    verdictBadgeBg = "#0369a1";
    verdictDesc = "Has combinat solucions comunitàries amb solucions ràpides de fora. El resultat és desigual: allò que és local funciona sol, però les opcions foranes acaben provocant talls i despeses.";
  } else {
    verdictTitle = "📦 Model Assistencialista («Clau en mà»)";
    verdictBadge = "0-1 decisions transformadores";
    verdictBadgeBg = "#1e3a8a";
    verdictDesc = "Portar solucions avançades fetes des de fora semblava ràpid i fàcil el primer dia, però quan l'equip d'enginyers ha marxat la xarxa ha quedat aturada per falta de recanvis i formació local.";
  }

  return `
    <div class="timeline-outcome-card ${cardClass}">
      <div class="outcome-header">
        <div class="outcome-title">
          <span>📊</span> Balanç Final: El Resultat a la Pràctica
        </div>
        <span class="outcome-status-badge" style="background:${verdictBadgeBg}; color:#ffffff;">
          ${verdictBadge}
        </span>
      </div>

      <!-- Veredicte Sintètic -->
      <div style="background: rgba(0, 0, 0, 0.28); padding: 1rem 1.25rem; border-radius: var(--radius-sm); border: 1px solid rgba(255, 255, 255, 0.1);">
        <h4 style="color:#ffffff; margin:0 0 0.35rem 0; font-size:1.15rem; display:flex; align-items:center; gap:0.4rem;">
          ${verdictTitle}
        </h4>
        <p style="color:#cbd5e1; margin:0; font-size:0.92rem; line-height:1.5;">${verdictDesc}</p>
      </div>

      <!-- Mètriques Finals -->
      <div class="outcome-metrics-grid">
        <div class="outcome-metric-item">
          <span class="outcome-metric-label">Autonomia i Capacitat Local</span>
          <span class="outcome-metric-val" style="color:${scores.autonomy >= 60 ? '#34d399' : '#38bdf8'};">${scores.autonomy}%</span>
        </div>
        <div class="outcome-metric-item">
          <span class="outcome-metric-label">Sostenibilitat a Llarg Termini</span>
          <span class="outcome-metric-val" style="color:${scores.sustainability >= 60 ? '#34d399' : '#38bdf8'};">${scores.sustainability}%</span>
        </div>
        <div class="outcome-metric-item">
          <span class="outcome-metric-label">Resiliència davant Avaries</span>
          <span class="outcome-metric-val" style="color:${scores.resilience >= 60 ? '#34d399' : '#38bdf8'};">${scores.resilience}%</span>
        </div>
      </div>

      <!-- Graella Visual de les 4 Decisions -->
      <div style="margin-top: 0.25rem;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.4rem; margin-bottom:0.6rem;">
          <span style="font-size:0.86rem; font-weight:800; color:#38bdf8; text-transform:uppercase; letter-spacing:0.04em;">
            🎯 Què ha passat amb cadascuna de les 4 decisions?
          </span>
          <span style="font-size:0.78rem; color:#94a3b8;">Estat al cap de 2 anys</span>
        </div>

        <div class="decision-balance-grid">
          ${dilemmaQuestions.map(d => {
            const choiceKey = userChoices[d.id];
            const opt = d.options[choiceKey];
            const isTransform = opt.type === "transform";
            return `
              <div class="decision-balance-card ${isTransform ? 'card-transform' : 'card-assist'}">
                <div class="balance-card-header">
                  <div class="balance-card-title">
                    <span>${d.icon}</span>
                    <span>${d.title}</span>
                  </div>
                  <span class="balance-status-chip ${isTransform ? 'chip-success' : 'chip-danger'}">
                    ${isTransform ? '🟢 ' + opt.statusLabel : '🔴 ' + opt.statusLabel}
                  </span>
                </div>

                <div class="balance-card-choice">
                  <span style="color:#94a3b8; font-size:0.76rem; text-transform:uppercase; display:block; font-weight:700;">Has triat:</span>
                  <strong>${opt.summaryChoice}</strong>
                  <span style="margin-left:0.4rem; font-size:0.75rem; color:${isTransform ? '#6ee7b7' : '#93c5fd'};">
                    (${isTransform ? '🌱 Transformador' : '📦 Assistencialista'})
                  </span>
                </div>

                <div class="balance-card-outcome ${isTransform ? 'outcome-success-bg' : 'outcome-danger-bg'}">
                  ${isTransform ? '✅' : '❌'} <strong>Efecte real:</strong> ${opt.shortOutcome}
                </div>

                <div class="balance-card-lesson">
                  💡 <strong>Lliçó:</strong> ${opt.lesson}
                </div>
              </div>
            `;
          }).join("")}
        </div>
      </div>

      <!-- Conclusió Visual en 2 Columnes -->
      <div style="background: rgba(0, 0, 0, 0.22); border-radius: var(--radius-sm); padding: 1rem 1.15rem; border: 1px solid rgba(255, 255, 255, 0.1); margin-top: 0.25rem;">
        <div style="font-size:0.92rem; font-weight:800; color:#38bdf8; display:flex; align-items:center; gap:0.4rem;">
          <span>🎓</span> Què hem après comparant els dos models de cooperació?
        </div>
        <div class="balance-comparison-box">
          <div class="balance-compare-col col-assist">
            <div style="font-weight:800; color:#fca5a5; margin-bottom:0.35rem; display:flex; align-items:center; gap:0.35rem;">
              <span>📦</span> Model Assistencialista («Clau en mà»)
            </div>
            <ul style="color:#cbd5e1; font-size:0.84rem; line-height:1.45; margin:0 0 0 1rem; padding:0;">
              <li>⚡ <strong>Molt ràpid</strong> d'inaugurar, però sense ensenyar res a la gent.</li>
              <li>💸 <strong>Peces de fora molt cares</strong> i llicències estrangeres.</li>
              <li>❌ <strong>S'abandona</strong> quan l'equip estranger marxa i ningú sap reparar-ho.</li>
            </ul>
          </div>
          <div class="balance-compare-col col-transform">
            <div style="font-weight:800; color:#6ee7b7; margin-bottom:0.35rem; display:flex; align-items:center; gap:0.35rem;">
              <span>🌱</span> Model Transformador (Tecnologia Comunitària)
            </div>
            <ul style="color:#cbd5e1; font-size:0.84rem; line-height:1.45; margin:0 0 0 1rem; padding:0;">
              <li>⏳ <strong>Demana més temps</strong> per fer tallers i prendre acords.</li>
              <li>🔧 <strong>Peces locals barates</strong> que es compren a la mateixa comarca.</li>
              <li>✅ <strong>100% autònom:</strong> el poble se'l fa seu i dura per sempre.</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Barra Final d'Accions -->
      <div class="timeline-nav-bar">
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <button type="button" class="btn-action btn-outline" style="color:#cbd5e1; border-color:#64748b;" onclick="setTimelineStep(2)">
            ← Revisar l'Any 2
          </button>
          <button type="button" class="btn-action btn-outline" style="color:#cbd5e1; border-color:#64748b;" onclick="editDecisions()">
            ✏️ Modificar Decisions
          </button>
        </div>

        <div>
          <button type="button" class="btn-action btn-primary" style="background:#16a34a; border-color:#15803d; font-size:1rem; font-weight:800; padding:0.7rem 1.4rem; box-shadow:0 4px 14px rgba(22, 163, 74, 0.35);" onclick="restartDilemmaSimulator()">
            🔄 Reiniciar per Explorar altres Decisions
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
