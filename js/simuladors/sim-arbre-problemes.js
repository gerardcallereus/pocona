/**
 * SIMULADOR DIDÀCTIC INTERACTIU: L'ARBRE DE PROBLEMES (3r d'ESO)
 * Estructura Visual amb Fletxes:
 *   - Branques: Efectes i Conseqüències (Superior)
 *   ▲ Fletxes direccionals: «Condueix a aquests efectes» ▲
 *   - Tronc: Problema Central Nuclear (Centre)
 *   ▲ Fletxes direccionals: «Té l'origen en aquestes causes reals» ▲
 *   - Arrels: Causes Reals d'Origen (Inferior)
 * 
 * Suporta:
 *   1. Arrossegament amb ratolí o pantalla tàctil (Pointer Drag & Drop fluid)
 *   2. Clic / Toc directe (seleccionar fitxa i clicar slot per col·locar)
 *   3. Drag and drop natiu HTML5
 */

(function() {
  'use strict';

  const TREE_DATA = {
    aigua: {
      id: "aigua",
      title: "1. Falta d'Accés a l'Aigua Potable",
      icon: "🚰",
      badge: "Comunitat Rural Andina (ex. Chillijchi)",
      description: "A les comunitats d'alta muntanya, les famílies no tenen aigua canalitzada ni tractada a casa. Construeix l'Arbre de Problemes col·locant cada fitxa al seu lloc: les causes a les arrels, el repte nuclear al tronc i els impactes a les branques.",
      cards: [
        {
          id: "a_c1",
          type: "cause",
          icon: "🚫",
          headline: "Manca de canonades i dipòsits",
          desc: "No hi ha xarxa de distribució ni sistema de filtració per portar l'aigua canalitzada a les llars.",
          why: "És una CAUSA ARREL tècnica: sense canonades ni dipòsits, l'aigua no pot arribar a les cases."
        },
        {
          id: "a_c2",
          type: "cause",
          icon: "🧪",
          headline: "Contaminació de rius i pous",
          desc: "Les rieres i pous superficials tenen bacteris i paràsits per abocaments agrícoles i fecals.",
          why: "És una CAUSA ARREL ambiental: l'aigua natural disponible està contaminada i no és salubre."
        },
        {
          id: "a_p1",
          type: "problem",
          icon: "🚰",
          headline: "Falta d'aigua potable regular i segura",
          desc: "La comunitat no disposa d'un subministrament bàsic d'aigua neta i apta per al consum humà.",
          why: "És el PROBLEMA CENTRAL (TRONC): la situació negativa nuclear que necessitem resoldre."
        },
        {
          id: "a_e1",
          type: "effect",
          icon: "🦠",
          headline: "Infeccions i malalties infantils",
          desc: "Alta incidència de gastroenteritis greus i mortalitat en nens petits per beure aigua sense tractar.",
          why: "És un EFECTE (BRANQUES): l'impacte sanitari directe que pateix la població."
        },
        {
          id: "a_e2",
          type: "effect",
          icon: "🚶",
          headline: "Hores perdudes caminant a buscar aigua",
          desc: "Dones i infants caminen quilòmetres cada dia amb càntirs a coll, perdent hores d'escola i feina.",
          why: "És un EFECTE (BRANQUES): la conseqüència social i educativa que perpetua la pobresa."
        }
      ]
    },
    energia: {
      id: "energia",
      title: "2. Falta d'Accés a l'Energia Elèctrica",
      icon: "⚡",
      badge: "Població Dispersa d'Alta Muntanya",
      description: "A les comunitats aïllades de la serralada, la xarxa elèctrica no arriba per l'orografia i el cost. Construeix l'Arbre de Problemes identificant per què passa (arrels), quin és el problema nuclear (tronc) i quines conseqüències pateix la gent (branques).",
      cards: [
        {
          id: "e_c1",
          type: "cause",
          icon: "🏔️",
          headline: "Cost prohibitiu de cablejar la muntanya",
          desc: "L'orografia andina abrupta i les cases disperses fan inviable la xarxa elèctrica convencional privada.",
          why: "És una CAUSA ARREL territorial i de mercat: les companyies no inverteixen per manca de rendibilitat."
        },
        {
          id: "e_c2",
          type: "cause",
          icon: "💰",
          headline: "Manca de recursos per a panells solars",
          desc: "Les famílies no disposen d'estalvis per pagar la forta inversió inicial de plaques i bateries pròpies.",
          why: "És una CAUSA ARREL financera: la pobresa econòmica impedeix comprar sistemes autònoms sense suport públic."
        },
        {
          id: "e_p1",
          type: "problem",
          icon: "⚡",
          headline: "Manca d'electricitat estable a les llars",
          desc: "Les cases i serveis comunitaris no tenen cap subministrament elèctric segur, constant i assequible.",
          why: "És el PROBLEMA CENTRAL (TRONC): el nus que bloqueja el desenvolupament de la comunitat."
        },
        {
          id: "e_e1",
          type: "effect",
          icon: "📚",
          headline: "Sense llum per estudiar ni fred per vacunes",
          desc: "Els joves no poden llegir ni fer deures de nit i la posta mèdica no pot refrigerar medicaments vitals.",
          why: "És un EFECTE (BRANQUES): conseqüència directa sobre l'educació dels infants i la salut pública."
        },
        {
          id: "e_e2",
          type: "effect",
          icon: "🔥",
          headline: "Ús perillós d'espelmes i generadors",
          desc: "Risc elevat d'incendis a les cases de tova, inhalació de fums nocius i despesa asfixiant en dièsel.",
          why: "És un EFECTE (BRANQUES): impacte negatiu sobre la seguretat domèstica i l'economia familiar."
        }
      ]
    }
  };

  // Estat del simulador
  let currentScenario = 'aigua';
  let slotMap = {
    branch_0: null,
    branch_1: null,
    trunk_0: null,
    root_0: null,
    root_1: null
  };
  let selectedCardId = null;

  // Variables auxiliars per al drag tàctil / ratolí per pointer events
  let isPointerDragging = false;
  let pointerDragCardId = null;
  let cloneEl = null;
  let startPointerX = 0;
  let startPointerY = 0;

  function getCards() {
    return TREE_DATA[currentScenario].cards;
  }

  function getCard(id) {
    return getCards().find(c => c.id === id);
  }

  function getPlacedCardIds() {
    return Object.values(slotMap).filter(Boolean);
  }

  function initSimulator() {
    const mount = document.getElementById("treeSimulatorRoot");
    if (!mount) return;

    renderTemplate(mount);
    updateBankAndSlots();
    bindEvents(mount);
  }

  function renderTemplate(mount) {
    const sc = TREE_DATA[currentScenario];

    mount.innerHTML = `
      <div class="tree-game-container">
        
        <!-- PESTANYES DE CANVI D'ESCENARI -->
        <div class="tree-game-nav">
          <div class="tree-game-tabs">
            <button type="button" class="tree-tab-btn ${currentScenario === 'aigua' ? 'active' : ''}" data-scenario="aigua">
              🚰 Exemple 1: Aigua Potable
            </button>
            <button type="button" class="tree-tab-btn ${currentScenario === 'energia' ? 'active' : ''}" data-scenario="energia">
              ⚡ Exemple 2: Energia Elèctrica
            </button>
          </div>
          <span class="badge" style="background:#e0f2fe; color:#0369a1; border:1px solid #bae6fd; font-weight:700;">
            ${sc.badge}
          </span>
        </div>

        <!-- BARRA D'ACCIÓ RÀPIDA SUPERIOR (MOLT VISIBLE) -->
        <div class="tree-action-bar-top">
          <button type="button" class="btn-check-tree btnCheckTree" id="btnCheckTreeTop">
            ✅ Comprovar si és correcte
          </button>
          <button type="button" class="btn-action btn-outline btnResetTree" id="btnResetTreeTop">
            🔄 Reiniciar
          </button>
          <button type="button" class="btn-action btnHintTree" id="btnHintTreeTop" style="background:#f1f5f9; border:1.5px solid #cbd5e1; color:#334155;">
            💡 Pista
          </button>
        </div>

        <!-- BRIEFING -->
        <div class="tree-scenario-box">
          <h3 class="tree-scenario-title">${sc.icon} ${sc.title}</h3>
          <p class="tree-scenario-desc">${sc.description}</p>
        </div>

        <!-- BANC DE FITXES DESORDENADES (POOL) -->
        <div class="tree-bank-box">
          <div class="tree-bank-header">
            <div class="tree-bank-title">
              <span>📦 Banc de Fitxes Desordenades (5)</span>
            </div>
            <span class="tree-bank-instructions">
              👉 Arrossega la fitxa al seu lloc, o fes-hi clic per seleccionar-la
            </span>
          </div>
          <div class="tree-bank-grid" id="treeCardsBank">
            <!-- Es renderitzen les targetes no col·locades -->
          </div>
        </div>

        <!-- ESTRUCTURA VISUAL DE L'ARBRE AMB FLETXES -->
        <div class="tree-canvas" id="treeCanvas">
          
          <!-- PIS 1 (SUPERIOR): LES BRANQUES - EFECTES I CONSEQÜÈNCIES -->
          <div class="tree-level">
            <div class="tree-level-header">
              <span class="tree-level-badge badge-branches">
                🌿 LES BRANQUES: EFECTES I CONSEQÜÈNCIES (Quins danys provoca?)
              </span>
            </div>
            <div class="tree-slots-container">
              <div class="tree-slot slot-branches" data-slot="branch_0" id="slot_branch_0"></div>
              <div class="tree-slot slot-branches" data-slot="branch_1" id="slot_branch_1"></div>
            </div>
          </div>

          <!-- FLETXA DIRECCIONAL ASCENDENT (TRONC ➔ BRANQUES) -->
          <div class="tree-arrow-connector">
            <div class="tree-arrow-track">
              <span class="tree-arrow-icon">▲</span>
              <span>CONDUEIX A AQUESTS EFECTES I IMPACTES</span>
              <span class="tree-arrow-icon">▲</span>
            </div>
          </div>

          <!-- PIS 2 (CENTRAL): EL TRONC - PROBLEMA CENTRAL NUCLEAR -->
          <div class="tree-level">
            <div class="tree-level-header">
              <span class="tree-level-badge badge-trunk">
                🪵 EL TRONC: PROBLEMA CENTRAL NUCLEAR (La carència principal)
              </span>
            </div>
            <div class="tree-slot-single">
              <div class="tree-slot slot-trunk" data-slot="trunk_0" id="slot_trunk_0"></div>
            </div>
          </div>

          <!-- FLETXA DIRECCIONAL ASCENDENT (ARRELS ➔ TRONC) -->
          <div class="tree-arrow-connector">
            <div class="tree-arrow-track">
              <span class="tree-arrow-icon">▲</span>
              <span>TÉ L'ORIGEN EN AQUESTES CAUSES ARREL</span>
              <span class="tree-arrow-icon">▲</span>
            </div>
          </div>

          <!-- PIS 3 (INFERIOR): LES ARRELS - CAUSES REALS D'ORIGEN -->
          <div class="tree-level">
            <div class="tree-level-header">
              <span class="tree-level-badge badge-roots">
                🪨 LES ARRELS: CAUSES REALS D'ORIGEN (Per què passa?)
              </span>
            </div>
            <div class="tree-slots-container">
              <div class="tree-slot slot-roots" data-slot="root_0" id="slot_root_0"></div>
              <div class="tree-slot slot-roots" data-slot="root_1" id="slot_root_1"></div>
            </div>
          </div>

        </div>

        <!-- CONTROLS I FEEDBACK -->
        <div class="tree-footer-bar">
          <div class="tree-footer-buttons">
            <button type="button" id="btnCheckTree" class="btn-check-tree btnCheckTree">
              ✅ Comprovar si és correcte
            </button>
            <button type="button" id="btnResetTree" class="btn-action btn-outline btnResetTree" style="padding: 0.65rem 1.1rem;">
              🔄 Reiniciar
            </button>
            <button type="button" id="btnHintTree" class="btn-action btnHintTree" style="background:#f1f5f9; border:1.5px solid #cbd5e1; color:#334155; padding: 0.65rem 1.1rem;">
              💡 Pista
            </button>
          </div>
          <div class="tree-progress-chip" id="treeProgressChip">
            Col·locades: <strong>0 / 5</strong>
          </div>
        </div>

        <!-- RESULTATS I EXPLICACIÓ PEDAGÒGICA -->
        <div id="treeResultsBox" class="tree-results-card"></div>

      </div>
    `;
  }

  function updateBankAndSlots() {
    const bankEl = document.getElementById("treeCardsBank");
    if (!bankEl) return;

    const cards = getCards();
    const placed = getPlacedCardIds();

    // 1. Renderitzar les targetes del banc
    const unplacedCards = cards.filter(c => !placed.includes(c.id));
    if (unplacedCards.length === 0) {
      bankEl.innerHTML = `
        <div style="grid-column: 1 / -1; text-align:center; padding:1.25rem; color:#059669; font-weight:800; font-size:0.95rem; background:#ecfdf5; border-radius:8px;">
          🎉 Molt bé! Totes les fitxes estan col·locades a l'arbre! Clica a «Comprovar Arbre» per avaluar la solució.
        </div>
      `;
    } else {
      bankEl.innerHTML = unplacedCards.map(c => `
        <div class="tree-card ${selectedCardId === c.id ? 'is-selected' : ''}" 
             data-card-id="${c.id}"
             tabindex="0"
             role="button"
             title="Clica per seleccionar o arrossega directament a l'arbre">
          <div class="tree-card-topline">
            <span class="tree-card-headline">${c.icon} ${c.headline}</span>
            <span class="tree-card-grip" aria-hidden="true">⠿ Arrossega</span>
          </div>
          <p class="tree-card-desc">${c.desc}</p>
        </div>
      `).join('');
    }

    // 2. Renderitzar cadascun dels 5 slots de l'arbre
    const slotConfigs = [
      { key: 'branch_0', prompt: '🌿 Deixa anar aquí un Efecte', cls: 'slot-branches' },
      { key: 'branch_1', prompt: '🌿 Deixa anar aquí un altre Efecte', cls: 'slot-branches' },
      { key: 'trunk_0', prompt: '🪵 Deixa anar aquí el Problema Central', cls: 'slot-trunk' },
      { key: 'root_0', prompt: '🪨 Deixa anar aquí una Causa Arrel', cls: 'slot-roots' },
      { key: 'root_1', prompt: '🪨 Deixa anar aquí una altra Causa Arrel', cls: 'slot-roots' }
    ];

    slotConfigs.forEach(cfg => {
      const el = document.getElementById(`slot_${cfg.key}`);
      if (!el) return;

      const assignedId = slotMap[cfg.key];
      if (assignedId) {
        const card = getCard(assignedId);
        el.classList.add("has-item");
        el.innerHTML = `
          <div class="tree-placed-item" data-card-id="${card.id}">
            <div class="tree-placed-header">
              <strong style="font-size:0.86rem; color:var(--text-main); display:flex; align-items:center; gap:0.4rem;">
                ${card.icon} ${card.headline}
              </strong>
              <button type="button" class="tree-remove-token-btn" data-slot-key="${cfg.key}" title="Treure aquesta fitxa de l'arbre">✕</button>
            </div>
            <p style="font-size:0.78rem; color:#475569; margin:0.15rem 0 0 0; line-height:1.35;">${card.desc}</p>
          </div>
        `;
      } else {
        el.classList.remove("has-item");
        el.innerHTML = `
          <div class="tree-slot-empty">
            <span class="tree-slot-empty-icon">📥</span>
            <span>${cfg.prompt}</span>
          </div>
        `;
      }
    });

    // 3. Actualitzar comptador i estat del botó Comprovar
    const progChip = document.getElementById("treeProgressChip");
    if (progChip) {
      progChip.innerHTML = `Col·locades: <strong>${placed.length} / 5</strong>`;
    }

    const checkButtons = document.querySelectorAll(".btnCheckTree");
    checkButtons.forEach(btn => {
      if (placed.length === 5) {
        btn.classList.add("btn-check-ready");
      } else {
        btn.classList.remove("btn-check-ready");
      }
    });
  }

  function bindEvents(mount) {
    // A. Canvi d'escenari (Pestanyes)
    mount.addEventListener("click", (e) => {
      const tab = e.target.closest(".tree-tab-btn");
      if (tab) {
        const target = tab.dataset.scenario;
        if (target && target !== currentScenario) {
          currentScenario = target;
          resetTree();
          renderTemplate(mount);
          updateBankAndSlots();
          return;
        }
      }

      // B. Botó eliminar fitxa d'un slot
      const removeBtn = e.target.closest(".tree-remove-token-btn");
      if (removeBtn) {
        e.stopPropagation();
        const slotKey = removeBtn.dataset.slotKey;
        if (slotKey) {
          slotMap[slotKey] = null;
          selectedCardId = null;
          clearFeedback();
          updateBankAndSlots();
        }
        return;
      }

      // C. Clic sobre un slot de l'arbre
      const slotEl = e.target.closest(".tree-slot");
      if (slotEl) {
        const slotKey = slotEl.dataset.slot;
        // Si hi ha una fitxa seleccionada prèviament del banc
        if (selectedCardId && slotKey) {
          assignCardToSlot(selectedCardId, slotKey);
          selectedCardId = null;
          updateBankAndSlots();
          return;
        }
      }

      // D. Clic sobre una targeta del banc
      const cardEl = e.target.closest(".tree-card");
      if (cardEl && !isPointerDragging) {
        const cId = cardEl.dataset.cardId;
        if (selectedCardId === cId) {
          selectedCardId = null;
        } else {
          selectedCardId = cId;
        }
        updateBankAndSlots();
        return;
      }

      // E. Botons d'acció (tant a dalt com a baix)
      if (e.target.closest(".btnCheckTree") || e.target.closest("#btnCheckTree")) {
        checkTree();
      } else if (e.target.closest(".btnResetTree") || e.target.closest("#btnResetTree")) {
        resetTree();
        clearFeedback();
        updateBankAndSlots();
      } else if (e.target.closest(".btnHintTree") || e.target.closest("#btnHintTree")) {
        showHint();
      }
    });

    // F. MOTOR DE DRAG & DROP PER POINTER EVENTS (Ratolí i Tàctil 100% fluid)
    mount.addEventListener("pointerdown", (e) => {
      const cardEl = e.target.closest(".tree-card");
      if (!cardEl) return;

      // Ignorar clics a botons
      if (e.target.closest("button")) return;

      pointerDragCardId = cardEl.dataset.cardId;
      startPointerX = e.clientX;
      startPointerY = e.clientY;
      isPointerDragging = false;

      function onPointerMove(moveEvent) {
        const dx = moveEvent.clientX - startPointerX;
        const dy = moveEvent.clientY - startPointerY;

        // Començar el drag si es mou més de 4 píxels
        if (!isPointerDragging && Math.hypot(dx, dy) > 4) {
          isPointerDragging = true;
          cardEl.classList.add("is-dragging");

          // Crear el clon flotant
          const cardData = getCard(pointerDragCardId);
          cloneEl = document.createElement("div");
          cloneEl.className = "tree-drag-clone";
          cloneEl.innerHTML = `
            <div style="font-weight:800; font-size:0.86rem; color:#0f172a; display:flex; align-items:center; gap:0.4rem;">
              ${cardData.icon} ${cardData.headline}
            </div>
            <p style="font-size:0.8rem; color:#475569; margin:0.25rem 0 0 0; line-height:1.35;">${cardData.desc}</p>
          `;
          document.body.appendChild(cloneEl);
        }

        if (isPointerDragging && cloneEl) {
          cloneEl.style.left = `${moveEvent.clientX}px`;
          cloneEl.style.top = `${moveEvent.clientY}px`;

          // Detectar slot sota el cursor
          document.querySelectorAll(".tree-slot").forEach(s => s.classList.remove("is-hovered"));
          const elementsUnder = document.elementsFromPoint(moveEvent.clientX, moveEvent.clientY);
          const hoveredSlot = elementsUnder.find(el => el.classList.contains("tree-slot"));
          if (hoveredSlot) {
            hoveredSlot.classList.add("is-hovered");
          }
        }
      }

      function onPointerUp(upEvent) {
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("pointerup", onPointerUp);

        if (cloneEl) {
          cloneEl.remove();
          cloneEl = null;
        }

        cardEl.classList.remove("is-dragging");

        if (isPointerDragging && pointerDragCardId) {
          // Detectar si s'ha soltat a sobre d'un slot
          const elementsUnder = document.elementsFromPoint(upEvent.clientX, upEvent.clientY);
          const targetSlot = elementsUnder.find(el => el.classList.contains("tree-slot"));

          if (targetSlot) {
            const slotKey = targetSlot.dataset.slot;
            assignCardToSlot(pointerDragCardId, slotKey);
            selectedCardId = null;
            updateBankAndSlots();
          }

          document.querySelectorAll(".tree-slot").forEach(s => s.classList.remove("is-hovered"));
        }

        // Reset
        setTimeout(() => {
          isPointerDragging = false;
          pointerDragCardId = null;
        }, 50);
      }

      window.addEventListener("pointermove", onPointerMove);
      window.addEventListener("pointerup", onPointerUp);
    });
  }

  function assignCardToSlot(cardId, targetSlotKey) {
    clearFeedback();

    // Si ja estava col·locada en un altre lloc, retirar-la d'allà
    Object.keys(slotMap).forEach(key => {
      if (slotMap[key] === cardId) {
        slotMap[key] = null;
      }
    });

    slotMap[targetSlotKey] = cardId;
  }

  function resetTree() {
    slotMap = {
      branch_0: null,
      branch_1: null,
      trunk_0: null,
      root_0: null,
      root_1: null
    };
    selectedCardId = null;
    clearFeedback();
  }

  function clearFeedback() {
    document.querySelectorAll(".tree-slot").forEach(s => {
      s.classList.remove("slot-correct", "slot-incorrect");
      const badge = s.querySelector(".tree-eval-badge");
      if (badge) badge.remove();
    });

    const resBox = document.getElementById("treeResultsBox");
    if (resBox) {
      resBox.style.display = "none";
      resBox.innerHTML = "";
    }
  }

  function checkTree() {
    clearFeedback();
    const placed = getPlacedCardIds();
    const resBox = document.getElementById("treeResultsBox");

    if (placed.length < 5) {
      if (resBox) {
        resBox.className = "tree-results-card tree-results-error";
        resBox.style.display = "block";
        resBox.innerHTML = `
          <strong>⚠️ Arbre incomplet:</strong> Has col·locat ${placed.length} de les 5 fitxes necessàries. 
          Arrossega fitxes a tots els buits de les <strong>Branques</strong>, del <strong>Tronc</strong> i de les <strong>Arrels</strong> abans de comprovar!
        `;
      }
      return;
    }

    let allCorrect = true;

    // Avaluar Branques (Efectes)
    ['branch_0', 'branch_1'].forEach(slotKey => {
      const slotEl = document.getElementById(`slot_${slotKey}`);
      const card = getCard(slotMap[slotKey]);
      if (card && card.type === 'effect') {
        slotEl.classList.add("slot-correct");
        addBadge(slotEl, true, "Efecte correcte");
      } else {
        slotEl.classList.add("slot-incorrect");
        addBadge(slotEl, false, "No és un efecte");
        allCorrect = false;
      }
    });

    // Avaluar Tronc (Problema Central)
    const trunkEl = document.getElementById("slot_trunk_0");
    const trunkCard = getCard(slotMap.trunk_0);
    if (trunkCard && trunkCard.type === 'problem') {
      trunkEl.classList.add("slot-correct");
      addBadge(trunkEl, true, "Problema central correcte");
    } else {
      trunkEl.classList.add("slot-incorrect");
      addBadge(trunkEl, false, "No és el problema central");
      allCorrect = false;
    }

    // Avaluar Arrels (Causes)
    ['root_0', 'root_1'].forEach(slotKey => {
      const slotEl = document.getElementById(`slot_${slotKey}`);
      const card = getCard(slotMap[slotKey]);
      if (card && card.type === 'cause') {
        slotEl.classList.add("slot-correct");
        addBadge(slotEl, true, "Causa d'arrel correcta");
      } else {
        slotEl.classList.add("slot-incorrect");
        addBadge(slotEl, false, "No és una causa");
        allCorrect = false;
      }
    });

    if (allCorrect) {
      const sc = TREE_DATA[currentScenario];
      if (resBox) {
        resBox.className = "tree-results-card tree-results-success";
        resBox.style.display = "block";
        resBox.innerHTML = `
          <div style="font-size:1.15rem; font-weight:800; margin-bottom:0.6rem; display:flex; align-items:center; gap:0.5rem;">
            🎉 Felicitats! Has construït l'Arbre de Problemes perfectament! (5 / 5)
          </div>
          <p style="margin:0 0 0.6rem 0;">
            Has identificat amb èxit la relació lògica entre l'origen real de la carència, el repte nuclear i els danys que genera sobre les persones:
          </p>
          <ul style="margin:0.5rem 0 0 1.25rem; padding:0; font-size:0.88rem; line-height:1.55;">
            ${sc.cards.map(c => `<li><strong>${c.headline}:</strong> ${c.why}</li>`).join('')}
          </ul>
        `;
      }
    } else {
      if (resBox) {
        resBox.className = "tree-results-card tree-results-error";
        resBox.style.display = "block";
        resBox.innerHTML = `
          <strong>🔍 Hi ha fitxes desubicades:</strong> Revisa els requadres marcats en vermell.<br>
          <span style="font-size:0.86rem; color:#78350f;">
            Pensa en la direcció de les fletxes: Les <strong>Arrels</strong> són el <em>motiu pel qual passa</em>, el <strong>Tronc</strong> és el <em>problema principal</em>, i les <strong>Branques</strong> són <em>què pateix la comunitat com a conseqüència</em>.
          </span>
        `;
      }
    }
  }

  function addBadge(slotEl, isCorrect, text) {
    const item = slotEl.querySelector(".tree-placed-item");
    if (!item) return;
    const old = item.querySelector(".tree-eval-badge");
    if (old) old.remove();

    const badge = document.createElement("div");
    badge.className = `tree-eval-badge ${isCorrect ? 'tree-eval-correct' : 'tree-eval-incorrect'}`;
    badge.innerHTML = `${isCorrect ? '✅' : '❌'} ${text}`;
    item.appendChild(badge);
  }

  function showHint() {
    const resBox = document.getElementById("treeResultsBox");
    if (!resBox) return;

    resBox.className = "tree-results-card tree-results-error";
    resBox.style.display = "block";
    resBox.innerHTML = `
      <strong>💡 Pista Didàctica per Resoldre l'Arbre:</strong>
      <div style="margin-top:0.4rem; font-size:0.88rem; line-height:1.5;">
        • <strong>Pas 1 (El Tronc):</strong> Busca la fitxa que descriu la situació general negativa (ex. <em>«Falta d'aigua potable...»</em> o <em>«Manca d'electricitat...»</em>).<br>
        • <strong>Pas 2 (Les Arrels):</strong> Pregunta't: <em>Per què no en tenen?</em> Perquè no hi ha canonades, perquè el riu està brut, perquè cablejar la muntanya val molts diners... Aquestes són les <strong>Causes</strong>.<br>
        • <strong>Pas 3 (Les Branques):</strong> Pregunta't: <em>Quines conseqüències té per als infants i les famílies?</em> Malalties, caminar hores, no poder estudiar... Aquests són els <strong>Efectes</strong>.
      </div>
    `;
  }

  // Executar quan el DOM estigui a punt
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initSimulator);
  } else {
    initSimulator();
  }
})();
