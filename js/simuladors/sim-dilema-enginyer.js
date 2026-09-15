/* ==========================================================
   POCONA: SIMULADOR DIDÀCTIC
   «El Dilema de l'Enginyer/a: Què passarà d'aquí a 2 anys?» ⏳
   ========================================================== */

const dilemmaQuestions = [
  {
    id: "tech",
    num: "1",
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
        summaryChoice: "Equips industrials alemanys d'alta gamma",
        outcomeYear1: "Un llamp crema un mòdul de transmissió. La peça és propietària i costa 800 $ més despeses d'enviament des d'Europa; la comunitat no pot assumir el cost i la xarxa s'apaga.",
        outcomeYear2: "La torre porta mesos inactiva per manca de peces i les llicències de programari han caducat. Els equips s'estan rovellant al cim.",
        lesson: "Principi no assolit: Reparabilitat local. Els equips sofisticats que no es poden arreglar a la regió acaben abandonats."
      },
      B: {
        id: "B",
        label: "Proposta B",
        title: "Equips WiMAX Oberts amb Components Estàndard",
        desc: "Ràdioenllaços basats en protocols estàndard i components robustos, que utilitzen peces, connectors i cables que es comercialitzen habitualment a les botigues electròniques de Cochabamba.",
        type: "transform",
        summaryChoice: "Equips WiMAX oberts i peces locals estàndard",
        outcomeYear1: "La forta tempesta només fon un fusible de seguretat de 50 cèntims. Es compra un recanvi a Cochabamba i el servei es restableix en menys de 24 hores.",
        outcomeYear2: "La xarxa continua emetent sense necessitat de llicències de pagament. El manteniment s'ha fet amb recanvis comuns a preu assequible.",
        lesson: "Principi assolit: Tecnologia Apropiada i Reparabilitat. La solució s'adapta a l'economia i recursos de la regió."
      }
    }
  },
  {
    id: "knowledge",
    num: "2",
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
        summaryChoice: "Instal·lació per enginyers externs sense formació local",
        outcomeYear1: "Quan cau el senyal després d'un vent fort, ningú a Pocona sap si el problema és un cable solt o un desajust de l'antena. L'ambulatori es queda sense telemedicina esperant ajuda externa.",
        outcomeYear2: "L'equip estranger fa mesos que ha marxat a altres països. Ningú al poble té les competències per reiniciar el sistema i el projecte mor per dependència.",
        lesson: "Principi no assolit: Sobirania Tecnològica. Sense transferència de coneixement, la tecnologia genera dependència."
      },
      B: {
        id: "B",
        label: "Proposta B",
        title: "Muntatge Conjunt i Tallers de Formació Tècnica Local",
        desc: "L'equip d'enginyeria dedica dues setmanes a formar joves del poble i personal de salut, elaborant guies visuals de manteniment preventiu i resolució d'avaries en castellà i quítxua.",
        type: "transform",
        summaryChoice: "Tallers formatius i capacitació de joves i sanitaris",
        outcomeYear1: "Quan el vent desorienta lleugerament una antena, els joves formats pugen amb el manual visual i la brúixola i realineen l'enllaç en un matí.",
        outcomeYear2: "Pocona té el seu propi equip tècnic comunitari, que no només manté la xarxa sinó que és capaç d'ensenyar altres comunitats veïnes.",
        lesson: "Principi assolit: Sobirania Tecnològica. El coneixement compartit empodera les persones i fa el projecte immortal."
      }
    }
  },
  {
    id: "energy",
    num: "3",
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
        summaryChoice: "Generador de benzina dependent de combustible",
        outcomeYear1: "Pujar bidons de benzina a 3.400 m costa 60 € cada setmana. La comunitat no pot assumir la despesa contínua i el generador passa setmanes apagat per falta de carburant.",
        outcomeYear2: "El generador té el motor gripat per manca de lubricació adequada i no hi ha recursos per pagar combustible. La torre no té electricitat.",
        lesson: "Principi no assolit: Sostenibilitat ambiental i econòmica. Una despesa diària en combustible és inviable per a famílies camperoles."
      },
      B: {
        id: "B",
        label: "Proposta B",
        title: "Sistema Solar Fotovoltaic amb Bateries",
        desc: "Instal·lació de panells solars d'alta eficiència, banc de bateries estacionàries i protecció contra sobretensions, aprofitant la radiació solar sense despesa diària.",
        type: "transform",
        summaryChoice: "Panells solars i bateries 100% autònoms",
        outcomeYear1: "El sistema solar genera energia gratuïta i ininterrompuda les 24 hores del dia, cobrint tant les hores de sol com les nits d'hivern.",
        outcomeYear2: "Després de dos anys, la instal·lació fotovoltaica continua alimentant els equips sense haver costat ni un sol euro en combustible.",
        lesson: "Principi assolit: Sostenibilitat i Autonomia Energètica. Els recursos renovables locals garanteixen la viabilitat a llarg termini."
      }
    }
  },
  {
    id: "governance",
    num: "4",
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
        summaryChoice: "Control centralitzat per l'ONG estrangera",
        outcomeYear1: "L'escola necessita canviar les claus d'accés per afegir nous ordinadors, però l'administrador és a Europa i triga setmanes a respondre el correu.",
        outcomeYear2: "En finalitzar el conveni de l'ONG, el poble es queda sense contrasenyes ni capacitat de decisió. La gent sent que el projecte mai no va ser seu.",
        lesson: "Principi no assolit: Apropiació comunitària. La tecnologia imposada sense participació local genera desafecció."
      },
      B: {
        id: "B",
        label: "Proposta B",
        title: "Transferència de la Propietat a l'Assemblea de Pocona",
        desc: "La torre i els equips es registren com a bé comú de la comunitat, creant una comissió mixta (escola, salut i veïnat) per establir les normes d'ús i prioritats.",
        type: "transform",
        summaryChoice: "Titularitat comunitària i Comissió Mixta de Pocona",
        outcomeYear1: "La comissió de Pocona es reuneix mensualment per organitzar els torns d'ús de la xarxa i acordar petites quotes veïnals per a manteniment.",
        outcomeYear2: "Sentint la torre com a patrimoni propi, el poble n'ha tingut cura impecable i fins i tot ha connectat una escola d'una comunitat veïna!",
        lesson: "Principi assolit: Cooperació Transformadora. El lideratge comunitari converteix la infraestructura en un bé comú perdurable."
      }
    }
  }
];

// Estat de selecció de l'alumnat
let userChoices = {
  tech: "B",
  knowledge: "B",
  energy: "B",
  governance: "B"
};

let currentTimelineYear = 0; // 0, 1, 2

function initDilemmaSimulator() {
  renderDilemmaCards();
  renderTimelineStep();
}

function selectDilemmaOption(dilemmaId, optionKey) {
  userChoices[dilemmaId] = optionKey;
  renderDilemmaCards();
  renderTimelineStep();
}

function setTimelineYear(year) {
  currentTimelineYear = year;
  renderTimelineStep();
}

function countTransformChoices() {
  let count = 0;
  dilemmaQuestions.forEach(d => {
    const chosenKey = userChoices[d.id];
    if (d.options[chosenKey].type === "transform") {
      count++;
    }
  });
  return count;
}

function calculateScores() {
  const transformCount = countTransformChoices();
  // 4 transform => 95-100%, 3 => 75%, 2 => 50%, 1 => 25%, 0 => 10%
  const pct = Math.round((transformCount / 4) * 100);
  return {
    sustainability: Math.max(15, pct),
    resilience: Math.max(20, Math.round(pct * 0.9 + (userChoices.energy === "B" ? 10 : 0))),
    social: Math.max(10, Math.round(pct * 0.95 + (userChoices.knowledge === "B" ? 5 : 0)))
  };
}

function renderDilemmaCards() {
  const container = document.getElementById("dilemmasGrid");
  if (!container) return;

  container.innerHTML = dilemmaQuestions.map(d => {
    const currentOpt = userChoices[d.id];
    const optA = d.options.A;
    const optB = d.options.B;

    return `
      <div class="dilemma-card">
        <div class="dilemma-card-header">
          <span>${d.icon}</span>
          <span>Dilema ${d.num}: ${d.title}</span>
        </div>
        <div class="dilemma-card-desc">${d.question}</div>

        <div class="dilemma-options">
          <!-- Proposta A -->
          <button type="button" 
                  class="dilemma-option-btn ${currentOpt === 'A' ? 'active' : ''}" 
                  onclick="selectDilemmaOption('${d.id}', 'A')">
            <div class="opt-btn-header">
              <span class="opt-label-tag">Proposta A</span>
              <span class="opt-title">${optA.title}</span>
            </div>
            <div class="opt-desc">${optA.desc}</div>
          </button>

          <!-- Proposta B -->
          <button type="button" 
                  class="dilemma-option-btn ${currentOpt === 'B' ? 'active' : ''}" 
                  onclick="selectDilemmaOption('${d.id}', 'B')">
            <div class="opt-btn-header">
              <span class="opt-label-tag">Proposta B</span>
              <span class="opt-title">${optB.title}</span>
            </div>
            <div class="opt-desc">${optB.desc}</div>
          </button>
        </div>
      </div>
    `;
  }).join("");
}

function renderTimelineStep() {
  const outcomeContainer = document.getElementById("timelineOutcomeCard");
  const stepBtns = document.querySelectorAll(".timeline-step-btn");
  if (!outcomeContainer) return;

  const transformCount = countTransformChoices();
  const scores = calculateScores();

  // Actualitzar botons de timeline
  stepBtns.forEach((b, idx) => {
    b.classList.remove("active", "step-year2-success", "step-year2-fail");
    if (idx === currentTimelineYear) {
      b.classList.add("active");
      if (idx === 2) {
        if (transformCount >= 3) b.classList.add("step-year2-success");
        else b.classList.add("step-year2-fail");
      }
    }
  });

  if (currentTimelineYear === 0) {
    renderYear0(outcomeContainer, transformCount, scores);
  } else if (currentTimelineYear === 1) {
    renderYear1(outcomeContainer, transformCount, scores);
  } else {
    renderYear2(outcomeContainer, transformCount, scores);
  }
}

function renderYear0(container, transformCount, scores) {
  const isHighAssist = transformCount <= 1;

  container.className = "timeline-outcome-card " + (isHighAssist ? "outcome-warning" : "outcome-success");
  container.innerHTML = `
    <div class="outcome-header">
      <div class="outcome-title">
        <span>🏁</span> Any 0: El Dia de la Inauguració a Pocona
      </div>
      <span class="outcome-status-badge" style="background:${isHighAssist ? '#78350f' : '#065f46'}; color:#ffffff;">
        ${isHighAssist ? '⚠️ Il·lusió Inicial' : '✨ Posada en Marxa Sòlida'}
      </span>
    </div>

    <div class="outcome-story-box">
      <p>
        🎉 <strong>El primer dia:</strong> La torre de comunicacions està instal·lada al cim del turó i el senyal arriba per primera vegada a l'ambulatori i a l'escola de Pocona. Hi ha festa al poble, música andina i paraules d'agraïment.
      </p>
      <p>
        ${isHighAssist ? 
          'A simple vista tot sembla un gran triomf. Tanmateix, <strong>les decisions que has pres amaguen riscos severs</strong>: equips que ningú a la comunitat sap com funcionen, costos recurrents difícils d\'assumir o manca de lideratge local. Què passarà quan aparegui la primera avaria?' : 
          'El projecte arrenca amb bases fermes: <strong>la comunitat ha participat activament</strong>, s\'ha optat per equips que es poden reparar a la regió i no es depèn de combustible car ni de llicències foranes.'}
      </p>
    </div>

    <div class="outcome-metrics-grid">
      <div class="outcome-metric-item">
        <span class="outcome-metric-label">Aparença Inicial d'Èxit</span>
        <span class="outcome-metric-val" style="color:#38bdf8;">100%</span>
      </div>
      <div class="outcome-metric-item">
        <span class="outcome-metric-label">Sostenibilitat Real</span>
        <span class="outcome-metric-val" style="color:${scores.sustainability >= 60 ? '#34d399' : '#fbbf24'};">${scores.sustainability}%</span>
      </div>
      <div class="outcome-metric-item">
        <span class="outcome-metric-label">Autonomia Local</span>
        <span class="outcome-metric-val" style="color:${scores.social >= 60 ? '#34d399' : '#fbbf24'};">${scores.social}%</span>
      </div>
    </div>

    <div class="outcome-lesson-card">
      💡 <strong>Observació d'Enginyeria:</strong> El dia de la inauguració pràcticament qualsevol instal·lació sembla perfecta. La veritable qualitat d'un projecte es mesura quan s'acaba la festa i arriba la primera gran incidència.
    </div>
  `;
}

function renderYear1(container, transformCount, scores) {
  const isHighAssist = transformCount <= 1;
  const isMixed = transformCount >= 2 && transformCount <= 3;

  container.className = "timeline-outcome-card " + (isHighAssist ? "outcome-fail" : (isMixed ? "outcome-warning" : "outcome-success"));
  container.innerHTML = `
    <div class="outcome-header">
      <div class="outcome-title">
        <span>⛈️</span> Any 1: La Primera Prova de Foc (Tempesta Andina a 3.400 m)
      </div>
      <span class="outcome-status-badge" style="background:${isHighAssist ? '#991b1b' : (isMixed ? '#92400e' : '#065f46')}; color:#ffffff;">
        ${isHighAssist ? '❌ Col·lapse del Servei' : (isMixed ? '⚠️ Recuperació amb Dificultats' : '✅ Incidència Resolta amb Èxit')}
      </span>
    </div>

    <div class="outcome-story-box">
      <p>
        ⚡ <strong>Arriba la dura època de tempestes andines:</strong> Vents de més de 90 km/h, llamps freqüents i pluges torrencials posen a prova els equips de la torre.
      </p>
      <p>
        ${isHighAssist ? 
          'Les teves decisions passen factura immediatament: han fallat components que ningú a Bolívia sap reparar, no hi ha diners per al combustible o no es disposa de personal format al poble. <strong>El servei de comunicacions s\'ha tallat durant setmanes</strong> i l\'ambulatori torna a estar aïllat.' : 
          (isMixed ? 
            'La instal·lació aguanta parcialment. Algunes de les teves decisions han permès salvar el servei bàsic, però les opcions menys apropiades generen colls d\'ampolla i despeses inesperades.' : 
            'Gràcies a les teves decisions, l\'impacte de la tempesta ha estat mínim. El personal local ha sabut identificar la petita avaria, canviar el fusible i restablir el senyal WiMAX en poques hores sense haver de dependre de ningú de fora.')}
      </p>
    </div>

    <!-- Desglossament de l'Any 1 per a cadascuna de les 4 decisions -->
    <div class="dilemma-breakdown-box">
      <div style="font-size:0.82rem; font-weight:800; color:#38bdf8; text-transform:uppercase; letter-spacing:0.04em;">
        🔍 Anàlisi de les teves 4 decisions davant la crisi:
      </div>
      ${dilemmaQuestions.map(d => {
        const choiceKey = userChoices[d.id];
        const opt = d.options[choiceKey];
        return `
          <div class="breakdown-item">
            <div class="breakdown-title">
              <span>${d.icon}</span>
              <span>Dilema ${d.num} (${d.title}): ${opt.summaryChoice}</span>
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
        <span class="outcome-metric-label">Resiliència a Avaries</span>
        <span class="outcome-metric-val" style="color:${scores.resilience >= 60 ? '#34d399' : '#f87171'};">${scores.resilience}%</span>
      </div>
      <div class="outcome-metric-item">
        <span class="outcome-metric-label">Temps de Restabliment</span>
        <span class="outcome-metric-val" style="color:${isHighAssist ? '#f87171' : (isMixed ? '#fbbf24' : '#34d399')};">
          ${isHighAssist ? '> 2 mesos (o Mai)' : (isMixed ? '1-2 setmanes' : '< 24 hores')}
        </span>
      </div>
      <div class="outcome-metric-item">
        <span class="outcome-metric-label">Despesa Extra Imprevista</span>
        <span class="outcome-metric-val" style="color:${isHighAssist ? '#f87171' : '#34d399'};">
          ${isHighAssist ? '> 600 $' : '0,50 € (Recanvi local)'}
        </span>
      </div>
    </div>
  `;
}

function renderYear2(container, transformCount, scores) {
  const isHighAssist = transformCount <= 1;
  const isMixed = transformCount >= 2 && transformCount <= 3;

  container.className = "timeline-outcome-card " + (isHighAssist ? "outcome-fail" : (isMixed ? "outcome-warning" : "outcome-success"));
  container.innerHTML = `
    <div class="outcome-header">
      <div class="outcome-title">
        <span>⏳</span> Any 2: L'Hora de la Veritat (L'equip de cooperació ha marxat)
      </div>
      <span class="outcome-status-badge" style="background:${isHighAssist ? '#991b1b' : (isMixed ? '#92400e' : '#065f46')}; color:#ffffff;">
        ${isHighAssist ? '💀 Projecte Abandonat' : (isMixed ? '⚖️ Projecte Fràgil' : '🌟 Projecte Autònom i Viu')}
      </span>
    </div>

    <div class="outcome-story-box">
      <p>
        ⏳ <strong>Han passat 2 anys complets:</strong> El conveni de cooperació ha finalitzat, els enginyers estrangers han marxat a altres països i la comunitat de Pocona està sola davant de la instal·lació.
      </p>
      <p>
        ${isHighAssist ? 
          'El projecte s\'ha convertit en un <strong>cementiri tecnològic</strong>. Les antenes estan trencades o desorientades, ningú no pot pagar les llicències foranes i el generador està rovellat. Els diners de cooperació s\'han malbaratat i l\'ambulatori torna a estar incomunicat com abans.' : 
          (isMixed ? 
            'La xarxa sobreviu amb dificultats. Algunes decisions encertades han evitat el col·lapse total, però les decisions assistencialistes provoquen talls intermitents que requereixen ajuda externa.' : 
            'El projecte és un <strong>èxit rotund de sobirania comunitària</strong>. La xarxa WiMAX és 100% propietat del poble de Pocona, l\'ambulatori ha pogut atendre més de 450 teleconsultes mèdiques salvant vides i els joves formats ara són els tècnics de referència de la vall.')}
      </p>
    </div>

    <!-- Desglossament pedagògic de les 4 decisions a l'Any 2 -->
    <div class="dilemma-breakdown-box">
      <div style="font-size:0.82rem; font-weight:800; color:#38bdf8; text-transform:uppercase; letter-spacing:0.04em;">
        🎓 Balanç de les teves 4 decisions al cap de 2 anys:
      </div>
      ${dilemmaQuestions.map(d => {
        const choiceKey = userChoices[d.id];
        const opt = d.options[choiceKey];
        const isGood = opt.type === "transform";
        return `
          <div class="breakdown-item">
            <div class="breakdown-title" style="color:${isGood ? '#6ee7b7' : '#fca5a5'};">
              <span>${isGood ? '✅' : '❌'}</span>
              <span>Dilema ${d.num} (${d.title}): ${opt.summaryChoice}</span>
            </div>
            <div class="breakdown-text" style="color:#e2e8f0;">
              ${opt.outcomeYear2}
            </div>
            <div style="font-size:0.78rem; color:${isGood ? '#a7f3d0' : '#fecdd3'}; font-style:italic; margin-top:0.15rem;">
              📌 ${opt.lesson}
            </div>
          </div>
        `;
      }).join("")}
    </div>

    <div class="outcome-metrics-grid">
      <div class="outcome-metric-item">
        <span class="outcome-metric-label">Telemedicina a l'Ambulatori</span>
        <span class="outcome-metric-val" style="color:${isHighAssist ? '#f87171' : '#34d399'};">
          ${isHighAssist ? '0 consultes (Incomunicat)' : '> 450 consultes actives'}
        </span>
      </div>
      <div class="outcome-metric-item">
        <span class="outcome-metric-label">Sostenibilitat Final</span>
        <span class="outcome-metric-val" style="color:${scores.sustainability >= 60 ? '#34d399' : '#f87171'};">${scores.sustainability}%</span>
      </div>
      <div class="outcome-metric-item">
        <span class="outcome-metric-label">Autonomia Comunitària</span>
        <span class="outcome-metric-val" style="color:${scores.social >= 60 ? '#34d399' : '#f87171'};">${scores.social}%</span>
      </div>
    </div>

    <div class="outcome-lesson-card">
      🎓 <strong>Conclusió d'Enginyeria pel Desenvolupament:</strong> 
      L'autèntica tecnologia apropiada no és la que costa més diners o té més prestacions sobre el paper, sinó aquella que la comunitat local pot entendre, mantenir, pagar i governar quan l'equip d'enginyeria ja no hi és.
    </div>
  `;
}

window.addEventListener("DOMContentLoaded", () => {
  initDilemmaSimulator();
});
