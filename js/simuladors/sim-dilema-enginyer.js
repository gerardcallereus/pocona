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
    question: "Quina tipologia d'antenes i ràdioenllaços instal·laràs a la torre del turó de Pocona?",
    options: {
      A: {
        id: "A",
        label: "Proposta A",
        title: "Equips Industrials d'Alta Gamma (Importació Europea)",
        desc: "Tecnologia propietària d'última generació fabricada a Alemanya. Ofereix la màxima velocitat teòrica el primer dia, suport remot internacional i gestió mitjançant programari avançat amb llicència.",
        type: "assist",
        modelBadge: "Model Assistencialista",
        summaryChoice: "Equips industrials d'importació europea",
        outcomeYear1: "Un llamp crema un mòdul de transmissió. La peça és de fabricant estranger i costa 800 $ més despeses d'enviament des d'Europa; la comunitat no disposa d'aquest pressupost i el servei s'interromp.",
        outcomeYear2: "La torre porta mesos inactiva per manca de recanvis i les llicències de programari han caducat. Els equips romanen aturats al cim.",
        lesson: "Conseqüència: Els equips propietaris sofisticats generen una forta dependència de recanvis estrangers i llicències de pagament periòdiques."
      },
      B: {
        id: "B",
        label: "Proposta B",
        title: "Equips WiMAX Oberts amb Components Estàndard",
        desc: "Ràdioenllaços basats en protocols estàndard i components robustos, que utilitzen peces, connectors i cables que es comercialitzen habitualment a les botigues electròniques de Cochabamba.",
        type: "transform",
        modelBadge: "Model Transformador",
        summaryChoice: "Equips WiMAX oberts i peces locals estàndard",
        outcomeYear1: "La forta tempesta només fon un fusible de seguretat de baix cost. Es compra un recanvi a Cochabamba i el servei es restableix en menys de 24 hores.",
        outcomeYear2: "La xarxa continua emetent sense necessitat de llicències de pagament. El manteniment s'ha realitzat amb recanvis comuns a preu assequible per a l'economia local.",
        lesson: "Conseqüència: La tecnologia basada en components estàndard permet la reparabilitat a la regió a preu assumible per la comunitat."
      }
    }
  },
  {
    id: "knowledge",
    num: 2,
    title: "Muntatge i Coneixement Tècnic",
    icon: "🛠️",
    question: "Com s'organitzarà la instal·lació dels equips i la capacitació de les persones?",
    options: {
      A: {
        id: "A",
        label: "Proposta A",
        title: "Muntatge Ràpid per Tècnics Externs («Clau en mà»)",
        desc: "Un equip d'enginyers professionals estrangers fa tot el muntatge en 3 dies, garantint una posada en marxa immediata i sense necessitat d'involucrar els habitants en la feina tècnica.",
        type: "assist",
        modelBadge: "Model Assistencialista",
        summaryChoice: "Instal·lació per tècnics externs («clau en mà»)",
        outcomeYear1: "Quan el senyal s'afebleix després d'un temporal de vent, ningú a Pocona disposa dels coneixements per revisar les connexions. L'ambulatori queda incomunicat a l'espera d'una visita tècnica externa.",
        outcomeYear2: "L'equip extern ja ha conclòs la seva estada al país. Com que no es va formar personal local, la comunitat no disposa de la capacitat tècnica per resoldre noves incidències.",
        lesson: "Conseqüència: El muntatge extern «clau en mà» estalvia temps inicial, però crea un buit de coneixement que genera dependència tècnica continuada."
      },
      B: {
        id: "B",
        label: "Proposta B",
        title: "Muntatge Conjunt i Tallers de Formació Tècnica Local",
        desc: "L'equip d'enginyeria dedica dues setmanes a formar joves del poble i personal de salut, elaborant guies visuals de manteniment preventiu i resolució d'avaries en castellà i quítxua.",
        type: "transform",
        modelBadge: "Model Transformador",
        summaryChoice: "Capacitació tècnica local i guies bilingües",
        outcomeYear1: "Quan el vent desorienta lleugerament una antena, els joves formats pugen amb la guia visual i la brúixola i realineen l'enllaç autònomament en un matí.",
        outcomeYear2: "Pocona compta amb el seu propi grup de manteniment comunitari, que no només gestiona la xarxa sinó que pot assessorar comunitats veïnes.",
        lesson: "Conseqüència: La capacitació i transferència tecnològica requereix més temps inicial, però consolida l'autonomia i la sobirania tecnològica local."
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
        title: "Generador Elèctric de Combustible (Benzina)",
        desc: "Adquisició d'un grup electrogen potent de benzina. Té un preu de compra assequible i produeix electricitat constant sempre que es disposi de carburant.",
        type: "assist",
        modelBadge: "Model Assistencialista",
        summaryChoice: "Generador de combustible líquid (benzina)",
        outcomeYear1: "Transportar bidons de benzina a 3.400 m costa uns 60 € setmanals. Aquesta despesa recurrent resulta difícil d'assumir regularment per la comunitat, generant talls de subministrament.",
        outcomeYear2: "El generador pateix desgast mecànic i el cost del carburant continua pujant. Sense fons per a combustible continu, la torre queda sense alimentació elèctrica la major part del temps.",
        lesson: "Conseqüència: El generador abarateix la instal·lació inicial, però imposa una despesa recurrent i una logística de combustible poc viable per a l'economia camperola."
      },
      B: {
        id: "B",
        label: "Proposta B",
        title: "Sistema Solar Fotovoltaic amb Bateries",
        desc: "Instal·lació de panells solars d'alta eficiència, banc de bateries estacionàries i protecció contra sobretensions, aprofitant la radiació solar sense despesa diària.",
        type: "transform",
        modelBadge: "Model Transformador",
        summaryChoice: "Sistema solar fotovoltaic autònom amb bateries",
        outcomeYear1: "El sistema solar genera electricitat ininterrompuda a partir d'un recurs local abundant, assegurant el servei tant de dia com a la nit sense despesa setmanal en combustible.",
        outcomeYear2: "Després de dos anys, el sistema fotovoltaic continua alimentant els equips amb un cost de funcionament pràcticament nul, depenent únicament de la neteja periòdica dels panells.",
        lesson: "Conseqüència: L'energia solar requereix una inversió inicial superior, però garanteix independència econòmica de subministrament i sostenibilitat ambiental."
      }
    }
  },
  {
    id: "governance",
    num: 4,
    title: "Propietat i Administració de la Xarxa",
    icon: "🏛️",
    question: "Qui tindrà la titularitat legal i prendrà les decisions sobre el servei de telecomunicacions?",
    options: {
      A: {
        id: "A",
        label: "Proposta A",
        title: "Administració i Supervisió Centralitzada per l'ONG",
        desc: "L'entitat promotora es queda la propietat formal, les contrasenyes d'administrador i la gestió a distància per assegurar el compliment estricte dels objectius del conveni.",
        type: "assist",
        modelBadge: "Model Assistencialista",
        summaryChoice: "Administració centralitzada des de l'entitat externa",
        outcomeYear1: "L'escola necessita actualitzar les credencials per incorporar nous equips educatius, però la gestió centralitzada a distància dilata el procés diverses setmanes.",
        outcomeYear2: "En finalitzar el conveni del projecte, la comunitat no disposa de la titularitat ni dels permisos d'administració, provocant desafecció veïnal respecte a la continuïtat del servei.",
        lesson: "Conseqüència: La gestió externa facilita el control burocràtic inicial, però allunya la comunitat de la presa de decisions i de la corresponsabilitat del projecte."
      },
      B: {
        id: "B",
        label: "Proposta B",
        title: "Transferència de la Propietat a l'Assemblea de Pocona",
        desc: "La torre i els equips es registren com a bé comú de la comunitat, creant una comissió mixta (escola, salut i veïnat) per establir les normes d'ús i prioritats.",
        type: "transform",
        modelBadge: "Model Transformador",
        summaryChoice: "Titularitat comunitària i Comissió Mixta de Pocona",
        outcomeYear1: "La comissió de Pocona es reuneix periòdicament per acordar els torns d'accés prioritari per a salut i educació, gestionant un petit fons d'estalvi per a imprevistos.",
        outcomeYear2: "En considerar la infraestructura com a patrimoni col·lectiu, el veïnat s'ha responsabilitzat del seu manteniment i ha articulat la connexió per a punts educatius pròxims.",
        lesson: "Conseqüència: La governança comunitària exigeix processos d'acord col·lectiu, però transforma la infraestructura en un bé comú amb arrelament i continuïtat."
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
    verdictTitle = "🌱 Perfil: Cooperació Transformadora Integral";
    verdictBadge = "Model Transformador Plè (4 de 4 decisions)";
    verdictBadgeBg = "#065f46";
    verdictDesc = "Has aplicat de manera coherent els principis de la tecnologia apropiada i l'apoderament local: peces reparables a la regió, capacitació tècnica comunitària, energia solar neta i sobirania en la governança. Tot i requerir més esforç inicial d'acompanyament, el projecte ha demostrat ser plenament autònom i perdurable.";
  } else if (transformCount === 3) {
    verdictTitle = "✨ Perfil: Cooperació Transformadora amb Dependència Puntual";
    verdictBadge = "Model Transformador Predominant (3 de 4)";
    verdictBadgeBg = "#047857";
    verdictDesc = "El projecte compta amb un fort arrelament comunitari i capacitat tècnica local. Tanmateix, l'opció assistencialista seleccionada representa una font de vulnerabilitat (sobrecostos de recanvis o combustible, o buits de gestió) que la comunitat haurà de compensar per garantir una continuïtat completa.";
  } else if (isMixed) {
    verdictTitle = "⚖️ Perfil: Model Mixt (Tensió entre Rapidesa i Sostenibilitat)";
    verdictBadge = "Model Mixt (2 transformadores / 2 assistencialistes)";
    verdictBadgeBg = "#0369a1";
    verdictDesc = "Aquest perfil reflecteix el dilema clàssic de molts projectes reals: es busca la comoditat o rapidesa inicial mitjançant solucions foranes en alguns aspectes, mentre es fomenta l'apoderament en d'altres. Les conseqüències a 2 anys mostren un servei útil però fràgil, exposat a aturades quan fallen els components externs.";
  } else {
    verdictTitle = "📦 Perfil: Model Assistencialista / «Clau en mà»";
    verdictBadge = "Model Tradicional Centralitzat (0-1 transformadores)";
    verdictBadgeBg = "#1e3a8a";
    verdictDesc = "Has escollit solucions d'alta tecnologia i una instal·lació ràpida per tècnics externs. Tot i que a l'Any 0 aquest enfocament sembla eficient i estalvia feina als veïns, l'evolució a 2 anys evidencia la limitació clàssica de l'assistencialisme: sense capacitat local, recanvis assequibles ni propietat comunitària, la instal·lació esdevé insostenible quan l'equip forà marxa.";
  }

  return `
    <div class="timeline-outcome-card ${cardClass}">
      <div class="outcome-header">
        <div class="outcome-title">
          <span>📊</span> Balanç Global i Anàlisi Comparativa de Models
        </div>
        <span class="outcome-status-badge" style="background:${verdictBadgeBg}; color:#ffffff;">
          ${verdictBadge}
        </span>
      </div>

      <div style="background: rgba(0, 0, 0, 0.25); padding: 1.25rem; border-radius: var(--radius-sm); border: 1px solid rgba(255, 255, 255, 0.1);">
        <h4 style="color:#ffffff; margin:0 0 0.4rem 0; font-size:1.15rem;">${verdictTitle}</h4>
        <p style="color:#cbd5e1; margin:0; font-size:0.92rem; line-height:1.55;">${verdictDesc}</p>
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

      <!-- Taula Resum de les 4 Decisions Preses -->
      <div style="margin-top: 0.5rem;">
        <div style="font-size:0.85rem; font-weight:800; color:#38bdf8; text-transform:uppercase; letter-spacing:0.04em; margin-bottom:0.6rem;">
          📋 Comparativa de les 4 Decisions Preses i el seu Efecte Real:
        </div>
        <table class="balance-table">
          <thead>
            <tr>
              <th style="width: 20%;">Dilema</th>
              <th style="width: 26%;">Opció Triada</th>
              <th style="width: 22%;">Model de Cooperació</th>
              <th style="width: 32%;">Conseqüència a la Pràctica</th>
            </tr>
          </thead>
          <tbody>
            ${dilemmaQuestions.map(d => {
              const choiceKey = userChoices[d.id];
              const opt = d.options[choiceKey];
              const isTransform = opt.type === "transform";
              return `
                <tr>
                  <td><strong>${d.icon} ${d.title}</strong></td>
                  <td>${opt.summaryChoice}</td>
                  <td>
                    <span style="display:inline-block; font-size:0.75rem; font-weight:800; padding:0.2rem 0.6rem; border-radius:10px; background:${isTransform ? 'rgba(16,185,129,0.2)' : 'rgba(59,130,246,0.2)'}; color:${isTransform ? '#6ee7b7' : '#93c5fd'};">
                      ${isTransform ? '🌱 Model Transformador' : '📦 Model Assistencialista'}
                    </span>
                  </td>
                  <td style="font-size:0.82rem; color:#cbd5e1;">${opt.lesson}</td>
                </tr>
              `;
            }).join("")}
          </tbody>
        </table>
      </div>

      <!-- Gran Conclusió Pedagògica -->
      <div class="outcome-lesson-card">
        🎓 <strong>Conclusió Pedagògica: Per què fem aquesta simulació?</strong><br>
        En enginyeria pel desenvolupament no es tracta d'etiquetar les respostes com a 'correctes' o 'incorrectes', sinó d'analitzar de manera crítica les seves <strong>conseqüències reals</strong>:
        <ul style="margin: 0.5rem 0 0 1.25rem; padding: 0; line-height: 1.55;">
          <li>El <strong>model assistencialista</strong> resol la urgència inicial ràpidament des de l'exterior, però tendeix a generar dependència tecnològica, vulnerabilitat financera i manca de relleu quan marxa l'equip promotor.</li>
          <li>El <strong>model transformador</strong> requereix més temps inicial de diàleg i formació, però construeix autonomia, sobirania tecnològica i converteix la tecnologia en un bé comú que la pròpia comunitat pot cuidar i sostenir per sempre.</li>
        </ul>
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
