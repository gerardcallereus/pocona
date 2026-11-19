/* ==========================================================================
   POCONA — MOTOR INTERACTIU DEL BLOC 4: ESP32 + IMAGINA 3DBOT V4 + MICROBLOCKS
   Inclou:
   1. Sintetitzador d'àudio real per al Brunzidor Piezoelèctric (Web Audio API)
   2. Inspector interactiu de la placa ESP32 STEAMakers + Imagina 3dBot v4
   3. Classificadors i Constructors de Diagrames de Flux (estil "Com pensen els robots?")
   4. Simuladors en temps real amb traça visual dels diagrames de flux
   5. Motor de preguntes autocorregibles
   ========================================================================== */

(function () {
  let audioCtx = null;
  window.poconaAudioMuted = false;

  window.togglePoconaAudio = function () {
    window.poconaAudioMuted = !window.poconaAudioMuted;
    document.querySelectorAll('.audio-mute-btn').forEach(btn => {
      btn.innerHTML = window.poconaAudioMuted ? '🔇 So Piezo Silenciat' : '🔊 So Piezo Actiu';
    });
  };

  window.playPiezoTone = function (freq, durationMs, delayMs = 0) {
    if (window.poconaAudioMuted) return;
    setTimeout(() => {
      try {
        if (!audioCtx) {
          const AudioContext = window.AudioContext || window.webkitAudioContext;
          if (AudioContext) audioCtx = new AudioContext();
        }
        if (!audioCtx) return;
        if (audioCtx.state === 'suspended') audioCtx.resume();

        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + durationMs / 1000);

        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + durationMs / 1000);
      } catch (e) {
        // Ignorar si el navegador bloqueja l'àudio
      }
    }, delayMs);
  };

  /* ========================================================================
     1. INSPECTOR D'INFOGRAFIA DE LA PLACA ESP32 + IMAGINA 3DBOT V4 (SESSIÓ 1)
     ======================================================================== */
  const BOARD_PARTS = {
    esp32: {
      title: '🧠 Microcontrolador ESP32 STEAMakers (El Cervell)',
      type: 'MICROCONTROLADOR (PROCÉS)',
      typeBadge: 'pinout-badge',
      pin: 'CPU 32-bit · 240 MHz · Wi-Fi + Bluetooth',
      role: 'És la placa base que s\'acobla sota la shield Imagina 3dBot v4. Llegeix els valors dels sensors, executa el nostre diagrama de flux programat a MicroBlocks i dóna ordres elèctriques als actuadors.',
      mbBlock: 'Executa en temps real tots els blocs del programa quan el cercle de MicroBlocks està en VERD 🟢.',
      poconaUse: 'Actua com l\'ordinador central de la Torre Repetidora o del Centre de Salut de Cocaipata.'
    },
    leds: {
      title: '🚦 Semàfor de 3 LEDs Integrats (Verd, Groc i Vermell)',
      type: 'ACTUADOR LLUMINÓS (SORTIDA)',
      typeBadge: 'pinout-badge actuator',
      pin: 'Verd: D3 · Groc: D5 · Vermell: D6',
      role: 'Tres díodes emissors de llum ja soldats a la placa Imagina 3dBot v4. S\'encenen quan reben un senyal digital ALT (HIGH / Cert) i s\'apaguen amb BAIX (LOW / Fals).',
      mbBlock: 'Blocs: [posa LED Verd a cert/fals] de la llibreria Imagina 3dBot o [posa pin digital 3/5/6 a cert].',
      poconaUse: 'Indiquen el nivell d\'urgència mèdica (Triatge): Verd = Consulta normal, Groc = Urgència moderada, Vermell = Emergència vital!'
    },
    piezo: {
      title: '🔊 Brunzidor Piezoelèctric / Buzzer (Altaveu de Tons)',
      type: 'ACTUADOR ACÚSTIC (SORTIDA)',
      typeBadge: 'pinout-badge actuator',
      pin: 'Pin Analògic/Digital A0',
      role: 'Un disc ceràmic piezoelèctric que vibra a gran velocitat quan rep impulsos elèctrics, generant notes musicals, bips d\'alerta i sirenes.',
      mbBlock: 'Llibreria Tone (So): [toca nota DO octava 5 durant 300 ms] o [toca freqüència 880 Hz durant 200 ms].',
      poconaUse: 'Fa sonar l\'alarma acústica a l\'Hospital de Cocaipata per avisar el metge de guàrdia quan entra un avís des d\'una comunitat aïllada.'
    },
    button: {
      title: '🔘 Polsador Tàctil Integrat (SW1)',
      type: 'SENSOR DIGITAL (ENTRADA)',
      typeBadge: 'pinout-badge sensor',
      pin: 'Pin Digital D2',
      role: 'Un botó mecànic que tanca el circuit quan el premem amb el dit. Envia un valor lògic CERT (1) quan està premut i FALS (0) quan el deixem anar.',
      mbBlock: 'Bloc booleà: <polsador D2 premut?> de la llibreria Imagina 3dBot o <llegeix pin digital 2>.',
      poconaUse: 'Serveix perquè el metge de Cocaipata confirmi (ACK) que ha rebut l\'alerta i silenciï l\'alarma, o per activar un SOS manual.'
    },
    ir_rx: {
      title: '📡 Receptor d\'Infrarojos (IR Receiver 38 kHz)',
      type: 'SENSOR ÒPTIC DE COMUNICACIÓ (ENTRADA)',
      typeBadge: 'pinout-badge sensor',
      pin: 'Pin Digital D11',
      role: 'Fotodíode amb filtre negre que capta els polsos de llum infraroja invisibles (38 kHz) emesos pel comandament a distància o per una altra placa i els descodifica en un número.',
      mbBlock: 'Llibreria IR Remote: (rep codi IR) — retorna el número del botó premut al comandament.',
      poconaUse: 'Simula l\'antena parabòlica receptora de l\'Hospital de Cocaipata que rep els senyals direccionals enviats des de Laimiña, Chilijchi o Pizorga!'
    },
    ldr: {
      title: '☀️ Sensor de Llum Ambiental (LDR - Fotoresistència)',
      type: 'SENSOR ANALÒGIC (ENTRADA)',
      typeBadge: 'pinout-badge sensor',
      pin: 'Pin Analògic A1',
      role: 'Resistència que varia segons la quantitat de llum solar que rep. Retorna un número entre 0 (foscor total) i 1023 (ple sol andí).',
      mbBlock: 'Bloc: (llum LDR) o (llegeix pin analògic 1).',
      poconaUse: 'Detecta quan es fa de nit a les muntanyes de Pocona per encendre automàticament la balisa d\'emergència de la torre i gestionar les plaques solars.'
    },
    ntc: {
      title: '🌡️ Sensor de Temperatura (Termistor NTC)',
      type: 'SENSOR ANALÒGIC (ENTRADA)',
      typeBadge: 'pinout-badge sensor',
      pin: 'Pin Analògic A2',
      role: 'Mesura la temperatura ambiental variant la seva resistència elèctrica amb el fred o la calor.',
      mbBlock: 'Bloc: (temperatura °C) de la llibreria Imagina 3dBot.',
      poconaUse: 'Controla que les bateries de la torre repetidora i les vacunes de l\'ambulatori no es congelin durant les nits glaçades dels Andes.'
    },
    switch_pwr: {
      title: '⚡ Interruptor General i Alimentació Solar / USB',
      type: 'CONTROL D\'ENERGIA',
      typeBadge: 'pinout-badge',
      pin: 'Alimentació 3.3V / 5V · Port USB-C',
      role: 'Permet alimentar la placa des de l\'ordinador (USB) o des d\'un portapiles/bateria solar, i activar o tallar el pas d\'energia.',
      mbBlock: 'Quan el programa està desat a la memòria Flash de l\'ESP32, arrenca tot sol en accionar l\'interruptor!',
      poconaUse: 'Simula l\'interruptor del sistema fotovoltaic autònom de l\'ambulatori.'
    }
  };

  window.inspectBoardPart = function (partKey) {
    const data = BOARD_PARTS[partKey];
    if (!data) return;
    const panel = document.getElementById('boardDetailPanel');
    if (!panel) return;

    document.querySelectorAll('.board-hotspot').forEach(el => {
      el.style.strokeWidth = el.getAttribute('data-part') === partKey ? '3.5' : '2';
    });

    panel.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem; margin-bottom:0.75rem;">
        <span class="${data.typeBadge}">${data.type}</span>
        <span class="pinout-badge">📌 ${data.pin}</span>
      </div>
      <h3 style="margin:0 0 0.6rem 0; color:#0f172a; font-size:1.18rem;">${data.title}</h3>
      <p style="font-size:0.92rem; color:#334155; line-height:1.6; margin-bottom:0.85rem;">
        ${data.role}
      </p>
      <div style="background:#1e293b; color:#e2e8f0; border-radius:10px; padding:0.75rem 1rem; font-size:0.85rem; margin-bottom:0.75rem;">
        <strong style="color:#38bdf8;">🧩 Com es programa a MicroBlocks?</strong><br>
        <span style="font-family:'JetBrains Mono',monospace; font-size:0.82rem;">${data.mbBlock}</span>
      </div>
      <div style="background:#ecfdf5; border-left:4px solid #10b981; border-radius:8px; padding:0.75rem 1rem; font-size:0.88rem; color:#065f46;">
        <strong>🏥 Funció a la Xarxa de Salut de Pocona:</strong><br>
        ${data.poconaUse}
      </div>
    `;
  };

  /* ========================================================================
     2. MOTOR DE PREGUNTES AUTOCORREGIBLES (QUIZ)
     ======================================================================== */
  window.checkPoconaQuiz = function (qId, btnElem, isCorrect, explanation) {
    const card = document.getElementById(qId);
    if (!card) return;
    const buttons = card.querySelectorAll('.quiz-opt-btn');
    buttons.forEach(b => {
      b.classList.remove('correct', 'wrong');
    });

    const fb = card.querySelector('.quiz-feedback-box');
    if (isCorrect) {
      btnElem.classList.add('correct');
      playPiezoTone(880, 120, 0);
      playPiezoTone(1174, 160, 130);
      if (fb) {
        fb.style.display = 'block';
        fb.style.background = '#dcfce7';
        fb.style.color = '#14532d';
        fb.style.border = '1px solid #86efac';
        fb.innerHTML = '✅ <strong>Correcte!</strong> ' + explanation;
      }
    } else {
      btnElem.classList.add('wrong');
      playPiezoTone(220, 220, 0);
      if (fb) {
        fb.style.display = 'block';
        fb.style.background = '#fee2e2';
        fb.style.color = '#7f1d1d';
        fb.style.border = '1px solid #fca5a5';
        fb.innerHTML = '❌ <strong>Torna-ho a provar:</strong> ' + explanation;
      }
    }
  };

  /* ========================================================================
     3. CONSTRUCTOR INTERACTIU DE DIAGRAMES DE FLUX (CLIC O ARROSSEGAR)
     ======================================================================== */
  const selectedChipByBoard = {};

  window.selectFlowChip = function (boardId, chipElem) {
    const board = document.getElementById(boardId);
    if (!board) return;
    board.querySelectorAll('.draggable-flow-chip').forEach(c => c.classList.remove('selected-chip'));
    chipElem.classList.add('selected-chip');
    selectedChipByBoard[boardId] = {
      id: chipElem.getAttribute('data-chip-id'),
      type: chipElem.getAttribute('data-chip-type'),
      text: chipElem.getAttribute('data-chip-text'),
      elem: chipElem
    };
  };

  window.placeInFlowSlot = function (boardId, slotElem) {
    const board = document.getElementById(boardId);
    if (!board) return;
    const sel = selectedChipByBoard[boardId];

    // Si ja té contingut i no hi ha cap xip seleccionat, el retornem a la paleta
    if (!sel && slotElem.getAttribute('data-placed-id')) {
      const oldId = slotElem.getAttribute('data-placed-id');
      const chip = board.querySelector(`.draggable-flow-chip[data-chip-id="${oldId}"]`);
      if (chip) chip.style.display = 'flex';
      slotElem.removeAttribute('data-placed-id');
      slotElem.classList.remove('filled-action', 'filled-decision', 'slot-correct', 'slot-wrong');
      slotElem.innerHTML = slotElem.getAttribute('data-placeholder') || 'Clica per col·locar capsa';
      return;
    }

    if (!sel) return;

    // Si la ranura ja tenia una altra capsa, la tornem a mostrar a la paleta
    if (slotElem.getAttribute('data-placed-id')) {
      const prevId = slotElem.getAttribute('data-placed-id');
      const prevChip = board.querySelector(`.draggable-flow-chip[data-chip-id="${prevId}"]`);
      if (prevChip) prevChip.style.display = 'flex';
    }

    slotElem.setAttribute('data-placed-id', sel.id);
    slotElem.innerHTML = sel.text;
    slotElem.classList.remove('filled-action', 'filled-decision', 'slot-correct', 'slot-wrong');
    slotElem.classList.add(sel.type === 'decision' ? 'filled-decision' : 'filled-action');

    sel.elem.classList.remove('selected-chip');
    sel.elem.style.display = 'none';
    selectedChipByBoard[boardId] = null;
  };

  window.checkFlowBuilder = function (boardId) {
    const board = document.getElementById(boardId);
    if (!board) return;
    const slots = board.querySelectorAll('.flow-slot');
    let allCorrect = true;
    let filledCount = 0;

    slots.forEach(slot => {
      const expected = slot.getAttribute('data-expected');
      const placed = slot.getAttribute('data-placed-id');
      slot.classList.remove('slot-correct', 'slot-wrong');
      if (placed) filledCount++;
      if (placed === expected) {
        slot.classList.add('slot-correct');
      } else {
        slot.classList.add('slot-wrong');
        allCorrect = false;
      }
    });

    const fb = board.querySelector('.flow-builder-feedback');
    if (!fb) return;
    fb.style.display = 'block';

    if (filledCount < slots.length) {
      fb.style.background = '#fef3c7';
      fb.style.color = '#92400e';
      fb.style.border = '1px solid #fcd34d';
      fb.innerHTML = `⚠️ Encara et falten capses per col·locar (${filledCount}/${slots.length}). Clica una capsa de l'esquerra i després la seva ranura al diagrama!`;
      playPiezoTone(330, 180);
      return;
    }

    if (allCorrect) {
      fb.style.background = '#dcfce7';
      fb.style.color = '#14532d';
      fb.style.border = '1px solid #86efac';
      fb.innerHTML = '🎉 <strong>Diagrama de flux 100% correcte!</strong> Has ordenat totes les accions i decisions amb precisió d\'enginyeria. Ara ja pots implementar els blocs a MicroBlocks!';
      playPiezoTone(523, 110, 0);
      playPiezoTone(659, 110, 120);
      playPiezoTone(784, 180, 240);
    } else {
      fb.style.background = '#fee2e2';
      fb.style.color = '#7f1d1d';
      fb.style.border = '1px solid #fca5a5';
      fb.innerHTML = '❌ <strong>Hi ha alguna capsa fora de lloc</strong> (marcada en vermell). Recorda: els <strong>rombes grocs</strong> sempre són preguntes (Sí/No) i els <strong>rectangles blaus</strong> són ordres directes. Clica sobre una capsa mal posada per treure-la.';
      playPiezoTone(220, 250);
    }
  };

  window.resetFlowBuilder = function (boardId) {
    const board = document.getElementById(boardId);
    if (!board) return;
    board.querySelectorAll('.draggable-flow-chip').forEach(c => {
      c.style.display = 'flex';
      c.classList.remove('selected-chip');
    });
    board.querySelectorAll('.flow-slot').forEach(s => {
      s.removeAttribute('data-placed-id');
      s.classList.remove('filled-action', 'filled-decision', 'slot-correct', 'slot-wrong');
      s.innerHTML = s.getAttribute('data-placeholder') || 'Clica per col·locar capsa';
    });
    const fb = board.querySelector('.flow-builder-feedback');
    if (fb) fb.style.display = 'none';
    selectedChipByBoard[boardId] = null;
  };

  /* ========================================================================
     4. SIMULADORS INTERACTIUS PER SESSIÓ
     ======================================================================== */

  // Helper per ressaltar un node del diagrama durant la simulació
  function highlightTraceNodes(containerId, activeNodeIds) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.querySelectorAll('.sim-node-trace').forEach(n => n.classList.remove('active-trace'));
    activeNodeIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.add('active-trace');
    });
  }

  // --- SESSIÓ 1: SIMULADOR D'ALGORISME DE TRASLLAT SANITARI (SENSE IR) ---
  window.runSession1RouteSim = function (minutesToAmbulance) {
    const lbl = document.getElementById('s1WaitVal');
    if (lbl) lbl.textContent = minutesToAmbulance + ' min';
    const status = document.getElementById('s1RouteStatus');

    if (minutesToAmbulance <= 15) {
      highlightTraceNodes('s1FlowDiagram', ['s1-n-start', 's1-n-check', 's1-n-dec', 's1-n-wait', 's1-n-end']);
      if (status) {
        status.innerHTML = `🚑 <strong>Temps d'espera = ${minutesToAmbulance} min (≤ 15 min → NO supera els 15 min):</strong> El diagrama pren la branca <strong>NO</strong>. Esperem l'ambulància a la posta de Laimiña i arribem a l'Hospital de Cocaipata.`;
      }
    } else {
      highlightTraceNodes('s1FlowDiagram', ['s1-n-start', 's1-n-check', 's1-n-dec', 's1-n-moto', 's1-n-end']);
      if (status) {
        status.innerHTML = `🏍️ <strong>Temps d'espera = ${minutesToAmbulance} min (> 15 min → SÍ supera els 15 min):</strong> El diagrama pren la branca <strong>SÍ</strong>. Activem la brigada mèdica en moto tot terreny fins a l'Hospital de Cocaipata!`;
      }
    }
  };

  // --- SESSIÓ 2: SIMULADORS DE LEDS, PIEZO I BUCLES ---
  let s2LoopTimer = null;

  window.runSim2A_LinearLed = function () {
    const ledG = document.getElementById('s2a-led-green');
    const status = document.getElementById('s2a-status');
    if (!ledG || !status) return;

    highlightTraceNodes('s2a-flow', ['s2a-n1']);
    ledG.classList.add('on');
    playPiezoTone(660, 120);
    status.innerHTML = '🟢 <strong>Pas 1:</strong> LED Verd (D3) ENCÈS! Esperant 1.000 ms (1 segon)...';

    setTimeout(() => {
      highlightTraceNodes('s2a-flow', ['s2a-n2']);
    }, 350);

    setTimeout(() => {
      highlightTraceNodes('s2a-flow', ['s2a-n3']);
      ledG.classList.remove('on');
      status.innerHTML = '⚫ <strong>Pas 3 (Fi del diagrama obert):</strong> S\'ha complert 1 segon i el LED Verd (D3) s\'ha APAGAT. Com que és un <em>diagrama obert (sense bucle)</em>, el programa s\'atura aquí.';
    }, 1200);
  };

  window.toggleSim2B_LoopBeacon = function (start) {
    const ledR = document.getElementById('s2b-led-red');
    const status = document.getElementById('s2b-status');
    if (s2LoopTimer) {
      clearInterval(s2LoopTimer);
      s2LoopTimer = null;
    }
    if (!start) {
      if (ledR) ledR.classList.remove('on');
      highlightTraceNodes('s2b-flow', []);
      if (status) status.innerHTML = '⏹️ <strong>Simulació aturada.</strong> Prem «Iniciar Bucle Per Sempre» per veure com funciona el diagrama tancat.';
      return;
    }

    let step = 0;
    const tick = () => {
      if (step % 2 === 0) {
        if (ledR) ledR.classList.add('on');
        highlightTraceNodes('s2b-flow', ['s2b-n1', 's2b-n2']);
        playPiezoTone(880, 90);
        if (status) status.innerHTML = '🔴 <strong>Bucle actiu (Cicle ON):</strong> LED Vermell (D6) ENCÈS durant 500 ms...';
      } else {
        if (ledR) ledR.classList.remove('on');
        highlightTraceNodes('s2b-flow', ['s2b-n3', 's2b-n4']);
        if (status) status.innerHTML = '↺ <strong>Bucle actiu (Cicle OFF → Retorn):</strong> LED Vermell (D6) APAGAT 500 ms i la fletxa verda torna a dalt!';
      }
      step++;
    };
    tick();
    s2LoopTimer = setInterval(tick, 750);
  };

  window.runSim2C_SemaforPiezo = function () {
    const ledG = document.getElementById('s2c-led-green');
    const ledY = document.getElementById('s2c-led-yellow');
    const ledR = document.getElementById('s2c-led-red');
    const piezo = document.getElementById('s2c-piezo');
    const status = document.getElementById('s2c-status');
    if (!ledG || !ledY || !ledR) return;

    ledG.classList.remove('on');
    ledY.classList.remove('on');
    ledR.classList.remove('on');
    if (piezo) piezo.classList.remove('sounding');

    // Fase 1: Verd
    ledG.classList.add('on');
    if (piezo) piezo.classList.add('sounding');
    playPiezoTone(523, 250);
    if (status) status.innerHTML = '🟢 <strong>1/3 Test Bateria Solar OK:</strong> LED Verd (D3) + Nota DO (523 Hz)...';
    setTimeout(() => { if (piezo) piezo.classList.remove('sounding'); }, 260);

    // Fase 2: Groc
    setTimeout(() => {
      ledG.classList.remove('on');
      ledY.classList.add('on');
      if (piezo) piezo.classList.add('sounding');
      playPiezoTone(659, 250);
      if (status) status.innerHTML = '🟡 <strong>2/3 Test Antena WiMAX:</strong> LED Groc (D5) + Nota MI (659 Hz)...';
      setTimeout(() => { if (piezo) piezo.classList.remove('sounding'); }, 260);
    }, 900);

    // Fase 3: Vermell + Sirena
    setTimeout(() => {
      ledY.classList.remove('on');
      ledR.classList.add('on');
      if (piezo) piezo.classList.add('sounding');
      playPiezoTone(880, 200, 0);
      playPiezoTone(987, 250, 220);
      if (status) status.innerHTML = '🔴 <strong>3/3 Test Sirena d\'Emergència:</strong> LED Vermell (D6) + Doble to agut al Piezo (A0)!';
      setTimeout(() => {
        ledR.classList.remove('on');
        if (piezo) piezo.classList.remove('sounding');
        if (status) status.innerHTML = '✅ <strong>Autotest de la posta sanitària completat!</strong> Tots els LEDs i el brunzidor piezoelèctric funcionen.';
      }, 650);
    }, 1800);
  };

  // --- SESSIÓ 3: CONDICIONALS (IF / ELSE / WHILE) AMB POLSADOR, INTERRUPTOR I LDR ---
  window.updateSim3A_Button = function (isPressed) {
    const ledR = document.getElementById('s3a-led-red');
    const ledG = document.getElementById('s3a-led-green');
    const piezo = document.getElementById('s3a-piezo');
    const status = document.getElementById('s3a-status');

    if (isPressed) {
      if (ledR) ledR.classList.add('on');
      if (ledG) ledG.classList.remove('on');
      if (piezo) piezo.classList.add('sounding');
      highlightTraceNodes('s3a-flow', ['s3a-dec', 's3a-yes']);
      playPiezoTone(880, 180, 0);
      playPiezoTone(660, 180, 190);
      if (status) status.innerHTML = '🚨 <strong>Polsador D2 = PREMUT (SÍ):</strong> S\'activa la branca <strong>SÍ</strong> del rombe! S\'encén el LED Vermell (D6), s\'apaga el Verd i sona la sirena d\'emergència al Piezo (A0).';
    } else {
      if (ledR) ledR.classList.remove('on');
      if (ledG) ledG.classList.add('on');
      if (piezo) piezo.classList.remove('sounding');
      highlightTraceNodes('s3a-flow', ['s3a-dec', 's3a-no']);
      if (status) status.innerHTML = '🟢 <strong>Polsador D2 = NO PREMUT (NO):</strong> S\'executa la branca <strong>SI NO (ELSE)</strong>! El LED Verd (D3) indica consultori en calma i el piezo està en silenci.';
    }
  };

  window.updateSim3B_SolarNight = function () {
    const sw = document.getElementById('s3b-switch');
    const slider = document.getElementById('s3b-ldr-slider');
    const lbl = document.getElementById('s3b-ldr-val');
    const ledY = document.getElementById('s3b-led-yellow');
    const ledG = document.getElementById('s3b-led-green');
    const status = document.getElementById('s3b-status');

    const switchOn = sw ? sw.checked : true;
    const lightVal = slider ? parseInt(slider.value, 10) : 600;
    if (lbl) lbl.textContent = lightVal + (lightVal < 350 ? ' (Nit als Andes 🌙)' : ' (Dia assolellat ☀️)');

    if (!switchOn) {
      if (ledY) ledY.classList.remove('on');
      if (ledG) ledG.classList.remove('on');
      highlightTraceNodes('s3b-flow', ['s3b-dec-sw', 's3b-off']);
      if (status) status.innerHTML = '🔌 <strong>Interruptor General = OFF (NO):</strong> El sistema està desconnectat per manteniment. Tots els LEDs apagats.';
      return;
    }

    if (lightVal < 350) {
      if (ledY) ledY.classList.add('on');
      if (ledG) ledG.classList.remove('on');
      highlightTraceNodes('s3b-flow', ['s3b-dec-sw', 's3b-dec-ldr', 's3b-night']);
      if (status) status.innerHTML = `🌙 <strong>Interruptor ON + Llum LDR (${lightVal} < 350 → SÍ és de nit):</strong> S'encén automàticament la balisa groga (D5) de la torre repetidora!`;
    } else {
      if (ledY) ledY.classList.remove('on');
      if (ledG) ledG.classList.add('on');
      highlightTraceNodes('s3b-flow', ['s3b-dec-sw', 's3b-dec-ldr', 's3b-day']);
      if (status) status.innerHTML = `☀️ <strong>Interruptor ON + Llum LDR (${lightVal} ≥ 350 → NO és de nit):</strong> S'apaga la balisa groga per estalviar bateria i s'encén el LED Verd (D3) de càrrega solar.`;
    }
  };

  let s3cWhileTimer = null;
  window.triggerSim3C_WhileAlarm = function (action) {
    const ledR = document.getElementById('s3c-led-red');
    const ledG = document.getElementById('s3c-led-green');
    const piezo = document.getElementById('s3c-piezo');
    const status = document.getElementById('s3c-status');

    if (action === 'ack') {
      if (s3cWhileTimer) {
        clearInterval(s3cWhileTimer);
        s3cWhileTimer = null;
      }
      if (ledR) ledR.classList.remove('on');
      if (ledG) ledG.classList.add('on');
      if (piezo) piezo.classList.remove('sounding');
      playPiezoTone(1046, 200);
      if (status) status.innerHTML = '✅ <strong>Polsador D2 Premut! Condició del MENTRE (WHILE) = FALSA:</strong> El bucle d\'alarma s\'atura immediatament i el metge pren el control.';
      return;
    }

    if (s3cWhileTimer) clearInterval(s3cWhileTimer);
    if (ledG) ledG.classList.remove('on');
    let tickState = false;
    const stepFn = () => {
      tickState = !tickState;
      if (tickState) {
        if (ledR) ledR.classList.add('on');
        if (piezo) piezo.classList.add('sounding');
        playPiezoTone(950, 160);
      } else {
        if (ledR) ledR.classList.remove('on');
        if (piezo) piezo.classList.remove('sounding');
      }
      if (status) status.innerHTML = '🔁 <strong>Bucle MENTRE (WHILE) en execució:</strong> <em>Mentre el polsador D2 NO estigui premut</em>, la sirena i el LED Vermell continuen avisant sense parar! Prem el botó «Prem Polsador D2» per sortir del bucle.';
    };
    stepFn();
    s3cWhileTimer = setInterval(stepFn, 450);
  };

  // --- SESSIÓ 4: COMUNICACIÓ PER INFRAROJOS (COMANDAMENT IR) ---
  window.s4ObstacleActive = false;

  window.toggleS4Obstacle = function () {
    window.s4ObstacleActive = !window.s4ObstacleActive;
    const btn = document.getElementById('s4ObstacleBtn');
    const beam = document.getElementById('s4IrBeamVisual');
    if (btn) {
      btn.innerHTML = window.s4ObstacleActive
        ? '⛰️ Obstacle Actiu (Turó bloqueja la Línia de Visió!) — Clica per treure\'l'
        : '✨ Línia de Visió (LoS) Lliure — Clica per posar un Obstacle al mig';
      btn.style.background = window.s4ObstacleActive ? '#991b1b' : '#334155';
    }
    if (beam) {
      beam.innerHTML = window.s4ObstacleActive
        ? '📡 Comandament Comunitat ──🔦❌⛰️ <em>(Feix IR bloquejat per obstacle!)</em> ── Placa Cocaipata (D11)'
        : '📡 Comandament Comunitat ──🔦✨───► Receptor IR (Pin D11) Hospital de Cocaipata';
    }
  };

  window.sendS4IrCommand = function (btnCode, labelName) {
    const rxDisplay = document.getElementById('s4IrCodeReadout');
    const ledG = document.getElementById('s4-led-green');
    const ledY = document.getElementById('s4-led-yellow');
    const ledR = document.getElementById('s4-led-red');
    const piezo = document.getElementById('s4-piezo');
    const status = document.getElementById('s4-status');

    if (ledG) ledG.classList.remove('on');
    if (ledY) ledY.classList.remove('on');
    if (ledR) ledR.classList.remove('on');
    if (piezo) piezo.classList.remove('sounding');

    if (window.s4ObstacleActive) {
      if (rxDisplay) rxDisplay.textContent = '--- (Cap senyal)';
      highlightTraceNodes('s4-flow', []);
      playPiezoTone(180, 150);
      if (status) {
        status.innerHTML = '❌ <strong>El senyal infraroig NO ha arribat al receptor D11!</strong> Hi ha un obstacle físic entre l\'antena emissora (comandament) i la receptora. Recorda l\'estudi de viabilitat: sense <em>Línia de Visió Directa (LoS)</em>, la llum infraroja no pot travessar cossos opacs!';
      }
      return;
    }

    if (rxDisplay) rxDisplay.textContent = `Codi IR = ${btnCode} (${labelName})`;

    if (btnCode === 1) {
      if (ledG) ledG.classList.add('on');
      if (piezo) piezo.classList.add('sounding');
      highlightTraceNodes('s4-flow', ['s4-n-rx', 's4-dec-1', 's4-act-1']);
      playPiezoTone(587, 150);
      setTimeout(() => { if (piezo) piezo.classList.remove('sounding'); }, 180);
      if (status) status.innerHTML = '🟢 <strong>Rebut Codi IR = 1 (Consulta Laimiña):</strong> El primer rombe <code>codiIR = 1?</code> és <strong>SÍ</strong>. S\'encén el LED Verd (D3) i sona 1 bip suau de consulta mèdica.';
    } else if (btnCode === 2) {
      if (ledY) ledY.classList.add('on');
      if (piezo) piezo.classList.add('sounding');
      highlightTraceNodes('s4-flow', ['s4-n-rx', 's4-dec-1', 's4-dec-2', 's4-act-2']);
      playPiezoTone(740, 130, 0);
      playPiezoTone(740, 130, 180);
      setTimeout(() => { if (piezo) piezo.classList.remove('sounding'); }, 350);
      if (status) status.innerHTML = '🟡 <strong>Rebut Codi IR = 2 (Urgència Moderada Chilijchi):</strong> El primer rombe és NO, i el segon rombe <code>codiIR = 2?</code> és <strong>SÍ</strong>. S\'encén el LED Groc (D5) i sonen 2 bips d\'alerta per preparar medicació.';
    } else if (btnCode === 3) {
      if (ledR) ledR.classList.add('on');
      if (piezo) piezo.classList.add('sounding');
      highlightTraceNodes('s4-flow', ['s4-n-rx', 's4-dec-1', 's4-dec-2', 's4-dec-3', 's4-act-3']);
      playPiezoTone(987, 160, 0);
      playPiezoTone(784, 160, 170);
      playPiezoTone(987, 220, 340);
      setTimeout(() => { if (piezo) piezo.classList.remove('sounding'); }, 580);
      if (status) status.innerHTML = '🔴 <strong>Rebut Codi IR = 3 (EMERGÈNCIA VITAL Pizorga!):</strong> Passa fins al tercer rombe <code>codiIR = 3? → SÍ</code>. S\'encén el LED Vermell (D6) i sona la sirena d\'emergència per enviar l\'ambulància immediatament!';
    } else {
      highlightTraceNodes('s4-flow', ['s4-n-rx', 's4-dec-1', 's4-dec-2', 's4-dec-3', 's4-act-0']);
      playPiezoTone(440, 120);
      if (status) status.innerHTML = '⚪ <strong>Rebut Codi IR = 0 (Fi d\'alerta / Reset):</strong> Tots els LEDs s\'apaguen i la centraleta de Cocaipata queda lliure esperant el següent missatge.';
    }
  };

  // --- SESSIÓ 5: SIMULADOR INTEGRADOR FINAL (CENTRALETA HOSPITAL DE COCAIPATA) ---
  let s5AlarmInterval = null;
  window.s5State = {
    powerOn: true,
    obstacle: false,
    activeEmergencyCommunity: null,
    activeCode: null
  };

  window.s5TogglePower = function (checked) {
    window.s5State.powerOn = checked;
    if (!checked) {
      if (s5AlarmInterval) clearInterval(s5AlarmInterval);
      s5AlarmInterval = null;
      window.s5State.activeEmergencyCommunity = null;
      s5UpdateVisuals('🔌 Energia solar desconnectada (Interruptor OFF). La centraleta està apagada.');
    } else {
      playPiezoTone(523, 100);
      s5UpdateVisuals('🟢 Energia solar ACTIVA (Interruptor ON). Hospital de Cocaipata escoltant l\'antena IR (Pin D11)...');
    }
  };

  window.s5ToggleObstacle = function () {
    window.s5State.obstacle = !window.s5State.obstacle;
    const btn = document.getElementById('s5ObstacleBtn');
    if (btn) {
      btn.innerHTML = window.s5State.obstacle
        ? '⛰️ Carena Bloquejant el Feix IR (Sense LoS)'
        : '📡 Línia de Visió (LoS) Neta entre Antenes';
      btn.style.background = window.s5State.obstacle ? '#b91c1c' : '#0369a1';
    }
  };

  window.s5SendCommunityIR = function (code, communityName, symptomText) {
    if (!window.s5State.powerOn) {
      s5UpdateVisuals('⚠️ La placa de Cocaipata té l\'interruptor d\'energia solar APAGAT! Encén-lo primer.');
      return;
    }
    if (window.s5State.obstacle) {
      playPiezoTone(190, 160);
      s5UpdateVisuals(`❌ [${communityName}] Ha intentat enviar el Codi IR ${code}, però una muntanya tapa la Línia de Visió (LoS)! El receptor D11 no rep res.`);
      return;
    }

    if (s5AlarmInterval) clearInterval(s5AlarmInterval);

    if (code === 0) {
      window.s5State.activeEmergencyCommunity = null;
      window.s5State.activeCode = 0;
      playPiezoTone(660, 120);
      s5UpdateVisuals(`📶 [TEST D'ENLLAÇ OK] Senyal de prova rebut amb èxit al Pin D11. Línia de visió (LoS) verificada al 100%!`, 'green');
      return;
    }

    window.s5State.activeEmergencyCommunity = communityName;
    window.s5State.activeCode = code;

    let toggle = false;
    const runLoop = () => {
      toggle = !toggle;
      const ledR = document.getElementById('s5-led-red');
      const ledY = document.getElementById('s5-led-yellow');
      const ledG = document.getElementById('s5-led-green');
      const piezo = document.getElementById('s5-piezo');

      if (ledG) ledG.classList.remove('on');
      if (toggle) {
        if (ledR) ledR.classList.add('on');
        if (ledY && code === 2) ledY.classList.add('on');
        if (piezo) piezo.classList.add('sounding');
        playPiezoTone(code === 1 ? 784 : (code === 2 ? 880 : 1046), 150);
      } else {
        if (ledR) ledR.classList.remove('on');
        if (ledY) ledY.classList.remove('on');
        if (piezo) piezo.classList.remove('sounding');
      }
    };
    runLoop();
    s5AlarmInterval = setInterval(runLoop, 480);

    s5UpdateVisuals(
      `🚨 ALARMA ACTIVA (Bucle MENTRE): Rebut Codi IR ${code} des de <strong>${communityName}</strong> (${symptomText}).<br>` +
      `👉 <em>La sirena i el LED d'alerta no s'aturaran fins que el metge de Cocaipata premi el Polsador de Confirmació (Pin D2)!</em>`
    );
  };

  window.s5DoctorAcknowledge = function () {
    if (!window.s5State.powerOn) return;
    if (!window.s5State.activeEmergencyCommunity) {
      playPiezoTone(440, 100);
      s5UpdateVisuals('ℹ️ Polsador D2 premut: No hi ha cap emergència pendent de confirmar en aquest moment.', 'green');
      return;
    }

    const comm = window.s5State.activeEmergencyCommunity;
    const code = window.s5State.activeCode;
    const ackCode = code + 3; // Protocol Pocona: Laimiña 1->4, Chilijchi 2->5, Pizorga 3->6

    if (s5AlarmInterval) {
      clearInterval(s5AlarmInterval);
      s5AlarmInterval = null;
    }

    window.s5State.activeEmergencyCommunity = null;
    playPiezoTone(523, 110, 0);
    playPiezoTone(659, 110, 120);
    playPiezoTone(784, 110, 240);
    playPiezoTone(1046, 220, 360);

    s5UpdateVisuals(
      `✅ <strong>CONFIRMACIÓ MÈDICA (Polsador D2 Premut!):</strong> S'atura el bucle MENTRE d'alarma.<br>` +
      `🚑 L'Hospital de Cocaipata envia el <strong>Codi de Confirmació ACK ${ackCode}</strong> cap a <strong>${comm}</strong>: «Equip mèdic i ambulància en camí!» (LED Verd D3 encès).`,
      'green'
    );
  };

  function s5UpdateVisuals(msgHtml,forceLed) {
    const ledR = document.getElementById('s5-led-red');
    const ledY = document.getElementById('s5-led-yellow');
    const ledG = document.getElementById('s5-led-green');
    const piezo = document.getElementById('s5-piezo');
    const log = document.getElementById('s5-console-log');

    if (!s5AlarmInterval) {
      if (ledR) ledR.classList.remove('on');
      if (ledY) ledY.classList.remove('on');
      if (ledG) ledG.classList.toggle('on', forceLed === 'green' || window.s5State.powerOn);
      if (piezo) piezo.classList.remove('sounding');
    }

    if (log) {
      log.innerHTML = msgHtml;
    }
  }
})();
