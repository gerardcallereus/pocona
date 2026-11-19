/* ==========================================================================
   POCONA — MOTOR INTERACTIU DEL BLOC 4: ESP32 PLUS STEAMAKERS + IMAGINA 3DBOT V4
   Mapa de Pins Oficial Verificat (Serigrafia Shield -> GPIO MicroBlocks):
   - D0 / D1 -> GPIO 3 / 1   (RX/TX USB Sèrie - PROHIBIT USAR)
   - D2      -> Pin 26      (Polsador a la shield - Entrada digital)
   - D3      -> Pin 25      (LED Vermell - Sortida digital / PWM)
   - D4      -> Pin 17      (Receptor IR / Seguelínies - Entrada digital)
   - D5      -> GPIO 16      (LED Groc - Sortida digital / PWM)
   - D6      -> Pin 27      (LED Verd - Sortida digital / PWM)
   - D7 / D10-> GPIO 14 / 5  (Motor A: Direcció / Velocitat PWM)
   - D8 / D11-> GPIO 12 / 23 (Motor B: Direcció / Velocitat PWM)
   - D9      -> GPIO 13      (Servo / Expansió PWM)
   - D12/D13 -> GPIO 19 / 18 (Ultrasons Trigger / Echo)
   - A0 / 14 -> Pin 2       (Brunzidor / Buzzer - Llibreria Tone, pin strapping)
   - A1 / 15 -> GPIO 4       (Sensor de Llum LDR - Entrada analògica 0-1023)
   - A2 / 16 -> GPIO 35      (Sensor de Temperatura - Només entrada analògica 0-1023)
   - A3..A5  -> GPIO 34,36,39(Seguelínies / Només entrada analògica 0-1023)
   - SDA/SCL -> Pin 21 / 22 (Bus I2C)
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
     1. INSPECTOR D'INFOGRAFIA DE LA PLACA ESP32 PLUS + IMAGINA 3DBOT V4
     ======================================================================== */
  const BOARD_PARTS = {
    esp32: {
      title: '🧠 Placa Base: ESP32 Plus STEAMakers (ESP32-D0WDQ6)',
      type: 'MICROCONTROLADOR (PROCÉS)',
      typeBadge: 'pinout-badge',
      pin: 'Xip ESP32-D0WDQ6 · USB CP210x (10c4:ea60)',
      role: 'Té el format físic d\'un Arduino UNO per poder acoblar la shield Imagina 3dBot V4 a sobre, però el seu cervell és un potent xip ESP32 de 32 bits amb memòria Flash que compila el bytecode de MicroBlocks en temps real.',
      mbBlock: 'Es connecta des del Chromebook a https://microblocks.fun/run via WebSerial. Tot el que pengi del bloc barret «en començar» s\'executa sol amb bateria/powerbank!',
      poconaUse: 'És l\'ordinador central de la Torre Repetidora o de l\'Hospital de Cocaipata. Atenció: la shield tapa el botó físic de Reset de l\'ESP32!'
    },
    leds: {
      title: '🚦 Semàfor de 3 LEDs Integrats (D3 Vermell, D5 Groc, D6 Verd)',
      type: 'ACTUADOR LLUMINÓS (SORTIDA DIGITAL / PWM)',
      typeBadge: 'pinout-badge actuator',
      pin: 'D3 ➔ Pin 25 (Vermell) · D5 ➔ GPIO 16 (Groc) · D6 ➔ Pin 27 (Verd)',
      role: 'Tres LEDs ja soldats a la shield Imagina 3dBot V4. A la serigrafia posa D3, D5 i D6, però a MicroBlocks hem d\'indicar el número de GPIO real de l\'ESP32: 25 (Vermell), 16 (Groc) i 27 (Verd)!',
      mbBlock: 'Blocs: [posa pin digital (27) a cert] per al LED Verd (D6), (16) per al Groc (D5) i (25) per al Vermell (D3).',
      poconaUse: 'Indiquen el triatge mèdic a Cocaipata: Pin 27 (Verd) = Consulta/Vigília, GPIO 16 (Groc) = Urgència moderada, Pin 25 (Vermell) = Emergència vital!'
    },
    piezo: {
      title: '🔊 Brunzidor Piezoelèctric / Buzzer (Serigrafia A0 ➔ Pin 2)',
      type: 'ACTUADOR ACÚSTIC (SORTIDA · LLIBRERIA TONE)',
      typeBadge: 'pinout-badge actuator',
      pin: 'Serigrafia A0 / 14 ➔ Pin 2 a MicroBlocks',
      role: 'Genera notes musicals i sirenes d\'alarma. IMPORTANT: El Pin 2 és un pin d\'strapping de l\'ESP32; sempre hem de posar pauses (espera) dins dels bucles per no bloquejar la placa.',
      mbBlock: 'Llibreria Tone (So): configurar el pin 2 i usar [toca nota DO octava 5 durant 300 ms] o [toca freqüència 880 Hz durant 200 ms].',
      poconaUse: 'Fa sonar l\'alarma acústica a l\'Hospital de Cocaipata quan entra un avís d\'emergència des de Laimiña, Chilijchi o Pizorga.'
    },
    button: {
      title: '🔘 Polsador Programable de la Shield (Serigrafia D2 ➔ Pin 26)',
      type: 'SENSOR DIGITAL (ENTRADA)',
      typeBadge: 'pinout-badge sensor',
      pin: 'Serigrafia D2 ➔ Pin 26 a MicroBlocks',
      role: 'Com que la shield Imagina 3dBot V4 tapa el botó de Reset de la placa ESP32 inferior, aquest botó que veiem a sobre NO és el Reset, sinó el polsador programable D2 (Pin 26)!',
      mbBlock: 'Bloc booleà: <llegeix pin digital (26)> — retorna Cert quan el premem i Fals quan el deixem anar.',
      poconaUse: 'El metge de guàrdia de Cocaipata el prem per confirmar (ACK) que ha rebut l\'emergència i aturar el bucle WHILE de la sirena.'
    },
    ir_rx: {
      title: '📡 Receptor d\'Infrarojos IR (Serigrafia D4 ➔ Pin 17)',
      type: 'SENSOR ÒPTIC DE COMUNICACIÓ (ENTRADA DIGITAL)',
      typeBadge: 'pinout-badge sensor',
      pin: 'Serigrafia D4 ➔ Pin 17 a MicroBlocks',
      role: 'Capta els senyals de llum infraroja modulada enviats pel comandament a distància en línia de visió directa (LoS) i els converteix en codis numèrics pel Pin 17.',
      mbBlock: 'Llibreria IR Remote (configurada al pin 17): bloc (rep codi IR) desat dins d\'una variable.',
      poconaUse: 'Simula l\'antena parabòlica receptora de l\'Hospital de Cocaipata que rep els senyals direccionals enviats des de les comunitats aïllades!'
    },
    ldr: {
      title: '☀️ Sensor de Llum Ambiental LDR (Serigrafia A1 ➔ GPIO 4)',
      type: 'SENSOR ANALÒGIC (ENTRADA 0–1023)',
      typeBadge: 'pinout-badge sensor',
      pin: 'Serigrafia A1 / 15 ➔ GPIO 4 a MicroBlocks',
      role: 'Fotoresistència que mesura la lluminositat ambiental retornant un valor continu entre 0 (foscor nocturna) i 1023 (ple sol andí).',
      mbBlock: 'Bloc reporter: (llegeix pin analògic (4)) — retorna un número de 0 a 1023.',
      poconaUse: 'Detecta quan es fa de nit a les muntanyes de Pocona per encendre automàticament la balisa de la torre i estalviar bateria solar de dia.'
    },
    ntc: {
      title: '🌡️ Sensor de Temperatura (Serigrafia A2 ➔ GPIO 35)',
      type: 'SENSOR ANALÒGIC (NOMÉS ENTRADA 0–1023)',
      typeBadge: 'pinout-badge sensor',
      pin: 'Serigrafia A2 / 16 ➔ GPIO 35 a MicroBlocks',
      role: 'Mesura la temperatura ambiental. Atenció tècnica: a l\'ESP32 els pins GPIO 34, 35, 36 i 39 (A2..A5) són NOMÉS D\'ENTRADA analògica (no s\'hi poden connectar sortides).',
      mbBlock: 'Bloc reporter: (llegeix pin analògic (35)) — retorna valor entre 0 i 1023.',
      poconaUse: 'Monitoritza la temperatura de les bateries solars i de la nevera de vacunes del centre de salut rural.'
    },
    usb_prohibit: {
      title: '⛔ Pins D0 / D1 (GPIO 3 / 1) i Port USB WebSerial (CP210x)',
      type: 'COMUNICACIÓ USB SÈRIE (PROHIBIT USAR D0/D1)',
      typeBadge: 'pinout-badge actuator',
      pin: 'D0 / D1 ➔ GPIO 3 / 1 (RX / TX USB Sèrie)',
      role: 'Els pins D0 i D1 (GPIO 3 i 1) són utilitzats pel xip Silicon Labs CP210x per comunicar la placa amb el Chromebook per cable USB. ESTÀ PROHIBIT utilitzar els pins 1 i 3 als nostres programes perquè bloquegen la connexió USB!',
      mbBlock: 'Connexió directa des de Chrome a https://microblocks.fun/run seleccionant el port CP210x USB to UART Bridge.',
      poconaUse: 'En acabar de programar amb el bloc barret «en començar», podem desendollar l\'USB i alimentar la placa amb una powerbank o bateria solar!'
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
      <h3 style="margin:0 0 0.6rem 0; color:#0f172a; font-size:1.15rem;">${data.title}</h3>
      <p style="font-size:0.91rem; color:#334155; line-height:1.6; margin-bottom:0.85rem;">
        ${data.role}
      </p>
      <div style="background:#1e293b; color:#e2e8f0; border-radius:10px; padding:0.75rem 1rem; font-size:0.84rem; margin-bottom:0.75rem;">
        <strong style="color:#38bdf8;">🧩 Com es programa a MicroBlocks (Chromebook)?</strong><br>
        <span style="font-family:'JetBrains Mono',monospace; font-size:0.81rem;">${data.mbBlock}</span>
      </div>
      <div style="background:#ecfdf5; border-left:4px solid #10b981; border-radius:8px; padding:0.75rem 1rem; font-size:0.87rem; color:#065f46;">
        <strong>🏥 Funció a la Xarxa de Salut de Pocona:</strong><br>
        ${data.poconaUse}
      </div>
    `;
  };

  /* ========================================================================
     2. TRADUCTOR RÀPID DE PINS (SERIGRAFIA SHIELD -> GPIO MICROBLOCKS)
     ======================================================================== */
  window.translateShieldPin = function (shieldPin) {
    const map = {
      'D2': { gpio: '26', comp: '🔘 Polsador de la Shield', block: 'llegeix pin digital (26)', note: 'Entrada digital (recorda: tapa el Reset de la placa base)' },
      'D3': { gpio: '25', comp: '🔴 LED Vermell', block: 'posa pin digital (25) a cert/fals', note: 'Sortida digital / PWM' },
      'D4': { gpio: '17', comp: '📡 Receptor d\'Infrarojos (IR)', block: 'Llibreria IR Remote al pin 17 / llegeix pin digital (17)', note: 'Entrada digital' },
      'D5': { gpio: '16', comp: '🟡 LED Groc', block: 'posa pin digital (16) a cert/fals', note: 'Sortida digital / PWM' },
      'D6': { gpio: '27', comp: '🟢 LED Verd', block: 'posa pin digital (27) a cert/fals', note: 'Sortida digital / PWM' },
      'A0': { gpio: '2',  comp: '🔊 Brunzidor (Buzzer / Piezo)', block: 'Llibreria Tone (pin 2)', note: '⚠️ Pin d\'strapping: posar sempre «espera» dins dels bucles!' },
      'A1': { gpio: '4',  comp: '☀️ Sensor de Llum (LDR)', block: 'llegeix pin analògic (4)', note: 'Entrada analògica (0 a 1023)' },
      'A2': { gpio: '35', comp: '🌡️ Sensor de Temperatura', block: 'llegeix pin analògic (35)', note: 'NOMÉS entrada analògica (0 a 1023)' },
      'D12_D13': { gpio: '19 (Trig) / 18 (Echo)', comp: '🦇 Ultrasons HC-SR04', block: 'Trigger GPIO 19 · Echo GPIO 18', note: 'Mesura de distància en cm' },
      'D0_D1': { gpio: '3 / 1 (PROHIBIT!)', comp: '⛔ RX / TX USB Sèrie', block: 'NO UTILITZAR MAI!', note: 'Bloqueja la comunicació USB WebSerial amb el Chromebook!' }
    };
    const info = map[shieldPin];
    const out = document.getElementById('pinTranslatorOutput');
    if (!info || !out) return;
    out.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem;">
        <div>
          <span style="font-size:0.8rem; color:#94a3b8; font-weight:700;">COMPONENT A LA SHIELD (${shieldPin}):</span>
          <div style="font-size:1.1rem; font-weight:800; color:#ffffff; margin-top:0.15rem;">${info.comp}</div>
        </div>
        <div style="background:#0284c7; color:#ffffff; font-family:'JetBrains Mono',monospace; font-size:1.15rem; font-weight:800; padding:0.4rem 0.9rem; border-radius:10px; border:2px solid #7dd3fc;">
          GPIO a MicroBlocks: ${info.gpio}
        </div>
      </div>
      <div style="margin-top:0.65rem; font-size:0.85rem; color:#bae6fd; font-family:'JetBrains Mono',monospace;">
        🧩 Bloc a utilitzar: <strong>${info.block}</strong> — <span style="color:#fde047;">${info.note}</span>
      </div>
    `;
  };

  /* ========================================================================
     3. MOTOR DE PREGUNTES AUTOCORREGIBLES (QUIZ)
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
        fb.innerHTML = '❌ <strong>Revisa-ho:</strong> ' + explanation;
      }
    }
  };

  /* ========================================================================
     4. CONSTRUCTOR INTERACTIU DE DIAGRAMES DE FLUX
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
      fb.innerHTML = '🎉 <strong>Diagrama de flux 100% correcte!</strong> Has ordenat totes les accions i decisions amb els pins GPIO exactes de l\'ESP32. Ara ja pots muntar els blocs a MicroBlocks!';
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
     5. SIMULADORS INTERACTIUS PER SESSIÓ (AMB PINS GPIO REALS)
     ======================================================================== */
  function highlightTraceNodes(containerId, activeNodeIds) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.querySelectorAll('.sim-node-trace').forEach(n => n.classList.remove('active-trace'));
    activeNodeIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.add('active-trace');
    });
  }

  // --- SESSIÓ 1: SIMULADOR D'ALGORISME DE TRASLLAT SANITARI ---
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

  // --- SESSIÓ 2: SIMULADORS DE LEDS (D6->Pin 27, D5->GPIO 16, D3->Pin 25) I PIEZO (A0->Pin 2) ---
  let s2LoopTimer = null;

  window.runSim2A_LinearLed = function () {
    const ledG = document.getElementById('s2a-led-green');
    const status = document.getElementById('s2a-status');
    if (!ledG || !status) return;

    highlightTraceNodes('s2a-flow', ['s2a-n1']);
    ledG.classList.add('on');
    playPiezoTone(660, 120);
    status.innerHTML = '🟢 <strong>Pas 1:</strong> LED Verd (<code>Pin 27</code>) ENCÈS! Esperant 1.000 ms (1 segon)...';

    setTimeout(() => {
      highlightTraceNodes('s2a-flow', ['s2a-n2']);
    }, 350);

    setTimeout(() => {
      highlightTraceNodes('s2a-flow', ['s2a-n3']);
      ledG.classList.remove('on');
      status.innerHTML = '⚫ <strong>Pas 3 (Fi del diagrama obert):</strong> S\'ha complert 1 segon i el LED Verd (<code>Pin 27</code>) s\'ha APAGAT. Com que és un <em>diagrama obert (sense bucle)</em>, el programa s\'atura aquí.';
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
        if (status) status.innerHTML = '🔴 <strong>Bucle actiu (Cicle ON):</strong> LED Vermell (<code>Pin 25</code>) ENCÈS durant 500 ms...';
      } else {
        if (ledR) ledR.classList.remove('on');
        highlightTraceNodes('s2b-flow', ['s2b-n3', 's2b-n4']);
        if (status) status.innerHTML = '↺ <strong>Bucle actiu (Cicle OFF → Retorn):</strong> LED Vermell (<code>Pin 25</code>) APAGAT 500 ms i la fletxa verda torna a dalt!';
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

    // Fase 1: Verd (D6 -> Pin 27)
    ledG.classList.add('on');
    if (piezo) piezo.classList.add('sounding');
    playPiezoTone(523, 250);
    if (status) status.innerHTML = '🟢 <strong>1/3 Test Bateria Solar OK:</strong> LED Verd (<code>Pin 27</code>) + Nota DO (523 Hz al Piezo <code>Pin 2</code>)...';
    setTimeout(() => { if (piezo) piezo.classList.remove('sounding'); }, 260);

    // Fase 2: Groc (D5 -> GPIO 16)
    setTimeout(() => {
      ledG.classList.remove('on');
      ledY.classList.add('on');
      if (piezo) piezo.classList.add('sounding');
      playPiezoTone(659, 250);
      if (status) status.innerHTML = '🟡 <strong>2/3 Test Antena WiMAX:</strong> LED Groc (<code>Pin 16</code>) + Nota MI (659 Hz al Piezo <code>Pin 2</code>)...';
      setTimeout(() => { if (piezo) piezo.classList.remove('sounding'); }, 260);
    }, 900);

    // Fase 3: Vermell (D3 -> Pin 25) + Sirena
    setTimeout(() => {
      ledY.classList.remove('on');
      ledR.classList.add('on');
      if (piezo) piezo.classList.add('sounding');
      playPiezoTone(880, 200, 0);
      playPiezoTone(987, 250, 220);
      if (status) status.innerHTML = '🔴 <strong>3/3 Test Sirena d\'Emergència:</strong> LED Vermell (<code>Pin 25</code>) + Doble to agut al Piezo (<code>Pin 2</code>)!';
      setTimeout(() => {
        ledR.classList.remove('on');
        if (piezo) piezo.classList.remove('sounding');
        if (status) status.innerHTML = '✅ <strong>Autotest de la posta sanitària completat!</strong> Tots els LEDs (Pins 27, 16, 25) i el brunzidor (Pin 2) funcionen.';
      }, 650);
    }, 1800);
  };

  // --- SESSIÓ 3: CONDICIONALS AMB POLSADOR (D2->Pin 26), INTERRUPTOR I LDR (A1->GPIO 4) ---
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
      if (status) status.innerHTML = '🚨 <strong>Polsador <code>Pin 26</code> = PREMUT (SÍ):</strong> S\'activa la branca <strong>SÍ</strong>! S\'encén el LED Vermell (<code>Pin 25</code>), s\'apaga el Verd (<code>Pin 27</code>) i sona la sirena al Piezo (<code>Pin 2</code>).';
    } else {
      if (ledR) ledR.classList.remove('on');
      if (ledG) ledG.classList.add('on');
      if (piezo) piezo.classList.remove('sounding');
      highlightTraceNodes('s3a-flow', ['s3a-dec', 's3a-no']);
      if (status) status.innerHTML = '🟢 <strong>Polsador <code>Pin 26</code> = NO PREMUT (NO):</strong> S\'executa la branca <strong>SI NO (ELSE)</strong>! El LED Verd (<code>Pin 27</code>) indica consultori en calma i el piezo està en silenci.';
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
      if (status) status.innerHTML = '🔌 <strong>Interruptor d\'Alimentació = OFF (NO):</strong> El sistema està desconnectat per manteniment. Tots els LEDs apagats.';
      return;
    }

    if (lightVal < 350) {
      if (ledY) ledY.classList.add('on');
      if (ledG) ledG.classList.remove('on');
      highlightTraceNodes('s3b-flow', ['s3b-dec-sw', 's3b-dec-ldr', 's3b-night']);
      if (status) status.innerHTML = `🌙 <strong>Interruptor ON + Llum LDR <code>Pin 4</code> (${lightVal} < 350 → SÍ és de nit):</strong> S'encén automàticament la balisa groga (<code>Pin 16</code>) de la torre repetidora!`;
    } else {
      if (ledY) ledY.classList.remove('on');
      if (ledG) ledG.classList.add('on');
      highlightTraceNodes('s3b-flow', ['s3b-dec-sw', 's3b-dec-ldr', 's3b-day']);
      if (status) status.innerHTML = `☀️ <strong>Interruptor ON + Llum LDR <code>Pin 4</code> (${lightVal} ≥ 350 → NO és de nit):</strong> S'apaga la balisa groga (<code>Pin 16</code>) per estalviar bateria i s'encén el LED Verd (<code>Pin 27</code>) de càrrega solar.`;
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
      if (status) status.innerHTML = '✅ <strong>Polsador <code>Pin 26</code> Premut! Condició del MENTRE (WHILE) = FALSA:</strong> El bucle d\'alarma s\'atura immediatament i s\'encén el LED Verd (<code>Pin 27</code>).';
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
      if (status) status.innerHTML = '🔁 <strong>Bucle MENTRE (WHILE) en execució:</strong> <em>Mentre el polsador <code>Pin 26</code> NO estigui premut</em>, la sirena (<code>Pin 2</code>) i el LED Vermell (<code>Pin 25</code>) continuen avisant amb una pausa de 250 ms a cada cicle!';
    };
    stepFn();
    s3cWhileTimer = setInterval(stepFn, 450);
  };

  // --- SESSIÓ 4: COMUNICACIÓ PER INFRAROJOS (RECEPTOR IR D4 -> Pin 17) ---
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
        ? '📡 Comandament Comunitat ──🔦❌⛰️ <em>(Feix IR bloquejat per obstacle!)</em> ── Placa Cocaipata (D4 ➔ Pin 17)'
        : '📡 Comandament Comunitat ──🔦✨───► Receptor IR (D4 ➔ Pin 17) Hospital de Cocaipata';
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
      if (rxDisplay) rxDisplay.textContent = '--- (Cap senyal al Pin 17)';
      highlightTraceNodes('s4-flow', []);
      playPiezoTone(180, 150);
      if (status) {
        status.innerHTML = '❌ <strong>El senyal infraroig NO ha arribat al receptor <code>Pin 17</code>!</strong> Hi ha un obstacle físic entre l\'antena emissora (comandament) i la receptora. Sense <em>Línia de Visió Directa (LoS)</em>, la llum infraroja no pot travessar cossos opacs!';
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
      if (status) status.innerHTML = '🟢 <strong>Rebut al Pin 17 Codi IR = 1 (Consulta Laimiña):</strong> El primer rombe <code>codiIR = 1?</code> és <strong>SÍ</strong>. S\'encén el LED Verd (<code>Pin 27</code>) i sona 1 bip suau al Piezo (<code>Pin 2</code>).';
    } else if (btnCode === 2) {
      if (ledY) ledY.classList.add('on');
      if (piezo) piezo.classList.add('sounding');
      highlightTraceNodes('s4-flow', ['s4-n-rx', 's4-dec-1', 's4-dec-2', 's4-act-2']);
      playPiezoTone(740, 130, 0);
      playPiezoTone(740, 130, 180);
      setTimeout(() => { if (piezo) piezo.classList.remove('sounding'); }, 350);
      if (status) status.innerHTML = '🟡 <strong>Rebut al Pin 17 Codi IR = 2 (Urgència Moderada Chilijchi):</strong> El segon rombe <code>codiIR = 2?</code> és <strong>SÍ</strong>. S\'encén el LED Groc (<code>Pin 16</code>) i sonen 2 bips d\'alerta al Piezo (<code>Pin 2</code>).';
    } else if (btnCode === 3) {
      if (ledR) ledR.classList.add('on');
      if (piezo) piezo.classList.add('sounding');
      highlightTraceNodes('s4-flow', ['s4-n-rx', 's4-dec-1', 's4-dec-2', 's4-dec-3', 's4-act-3']);
      playPiezoTone(987, 160, 0);
      playPiezoTone(784, 160, 170);
      playPiezoTone(987, 220, 340);
      setTimeout(() => { if (piezo) piezo.classList.remove('sounding'); }, 580);
      if (status) status.innerHTML = '🔴 <strong>Rebut al Pin 17 Codi IR = 3 (EMERGÈNCIA VITAL Pizorga!):</strong> Passa fins al tercer rombe <code>codiIR = 3? → SÍ</code>. S\'encén el LED Vermell (<code>Pin 25</code>) i sona la sirena d\'emergència al Piezo (<code>Pin 2</code>)!';
    } else {
      highlightTraceNodes('s4-flow', ['s4-n-rx', 's4-dec-1', 's4-dec-2', 's4-dec-3', 's4-act-0']);
      playPiezoTone(440, 120);
      if (status) status.innerHTML = '⚪ <strong>Rebut al Pin 17 Codi IR = 0 (Fi d\'alerta / Reset):</strong> Tots els LEDs (Pins 27, 16, 25) s\'apaguen i la centraleta de Cocaipata queda en espera.';
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
      s5UpdateVisuals('🔌 Alimentació desconnectada. La placa ESP32 Plus STEAMakers està apagada.');
    } else {
      playPiezoTone(523, 100);
      s5UpdateVisuals('🟢 Alimentació per Bateria / Powerbank ACTIVA (Autonomia via bloc «en començar»). Hospital de Cocaipata escoltant l\'antena IR (<code>Pin 17</code>)...');
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
      s5UpdateVisuals('⚠️ La placa de Cocaipata té l\'alimentació APAGADA! Activa l\'interruptor d\'energia primer.');
      return;
    }
    if (window.s5State.obstacle) {
      playPiezoTone(190, 160);
      s5UpdateVisuals(`❌ [${communityName}] Ha intentat enviar el Codi IR ${code}, però una muntanya tapa la Línia de Visió (LoS)! El receptor <code>Pin 17</code> no rep res.`);
      return;
    }

    if (s5AlarmInterval) clearInterval(s5AlarmInterval);

    if (code === 0) {
      window.s5State.activeEmergencyCommunity = null;
      window.s5State.activeCode = 0;
      playPiezoTone(660, 120);
      s5UpdateVisuals(`📶 [TEST D'ENLLAÇ OK] Senyal de prova rebut amb èxit a <code>Pin 17</code>. Línia de visió (LoS) verificada i LED Verd <code>Pin 27</code> encès!`, 'green');
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
      `🚨 ALARMA ACTIVA (Bucle MENTRE): Rebut a <code>Pin 17</code> Codi IR ${code} des de <strong>${communityName}</strong> (${symptomText}).<br>` +
      `👉 <em>El LED Vermell <code>Pin 25</code> i el Brunzidor <code>Pin 2</code> no s'aturaran fins que el metge premi el Polsador <code>Pin 26</code>!</em>`
    );
  };

  window.s5DoctorAcknowledge = function () {
    if (!window.s5State.powerOn) return;
    if (!window.s5State.activeEmergencyCommunity) {
      playPiezoTone(440, 100);
      s5UpdateVisuals('ℹ️ Polsador <code>Pin 26</code> premut: No hi ha cap emergència pendent de confirmar en aquest moment.', 'green');
      return;
    }

    const comm = window.s5State.activeEmergencyCommunity;
    const code = window.s5State.activeCode;
    const ackCode = code + 3;

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
      `✅ <strong>CONFIRMACIÓ MÈDICA (Polsador <code>Pin 26</code> Premut!):</strong> S'atura el bucle MENTRE d'alarma.<br>` +
      `🚑 L'Hospital de Cocaipata activa el <strong>LED Verd <code>Pin 27</code></strong> i registra el <strong>Codi ACK ${ackCode}</strong> per a <strong>${comm}</strong>: «Ambulància en camí!»`,
      'green'
    );
  };

  function s5UpdateVisuals(msgHtml, forceLed) {
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
