/* ==========================================================
   GAMIFICACIÓ FASE 3: TERRENY I COMUNICACIONS (POCONA)
   Motor de joc, barra de progrés, penalitzacions i diploma final
   ========================================================== */

(function() {
  'use strict';

  const STORAGE_KEY = 'pocona_terreny_game_v1';

  const LEVELS = [
    { num: 1, letter: 'A', id: '3-1', url: '3-1-canvis-unitats.html', title: 'A. Canvi d\'Unitats', short: 'Unitats', totalChallenges: 5 },
    { num: 2, letter: 'B', id: '3-2', url: '3-2-escales.html', title: 'B. Escales Cartogràfiques', short: 'Escales', totalChallenges: 3 },
    { num: 3, letter: 'C', id: '3-3', url: '3-3-corbes-nivell.html', title: 'C. Corbes de Nivell', short: 'Corbes', totalChallenges: 3 },
    { num: 4, letter: 'D', id: '3-4', url: '3-4-perfil.html', title: 'D. Perfil Topogràfic & LoS', short: 'Perfil', totalChallenges: 3 },
    { num: 5, letter: 'E', id: '3-5', url: '3-5-pitagores.html', title: 'E. Pitàgores a la Muntanya', short: 'Pitàgores', totalChallenges: 3 },
    { num: 6, letter: 'F', id: '3-6', url: '3-6-mediatriu-circumcentre.html', title: 'F. Dibuix Tècnic: Mediatriu i Circumcentre', short: 'Dibuix Tècnic', totalChallenges: 0 },
    { num: 7, letter: 'G', id: '3-8', url: '3-8-diploma.html', title: 'G. 🎓 Diploma d\'Aprofitament', short: 'Diploma', totalChallenges: 0 },
    { num: 8, letter: 'H', id: '3-7', url: '3-7-antenes-comunicacio.html', title: 'H. Sistemes de Comunicació i Antenes', short: 'Antenes', totalChallenges: 3 }
  ];

  // Sons procedurals senzills mitjançant Web Audio API
  let audioCtx = null;
  function getAudioContext() {
    if (!audioCtx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (AC) audioCtx = new AC();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function playTone(freq, type, duration, delay = 0) {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);
      gain.gain.setValueAtTime(0.12, ctx.currentTime + delay);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + delay);
      osc.stop(ctx.currentTime + delay + duration);
    } catch (e) { /* ignore audio error */ }
  }

  function playSuccessSound() {
    playTone(523.25, 'sine', 0.12, 0);     // C5
    playTone(659.25, 'sine', 0.12, 0.08);  // E5
    playTone(783.99, 'sine', 0.22, 0.16);  // G5
  }

  function playErrorSound() {
    playTone(180, 'sawtooth', 0.2, 0);
    playTone(130, 'sawtooth', 0.25, 0.1);
  }

  function playLevelUpSound() {
    playTone(440, 'triangle', 0.15, 0);
    playTone(554.37, 'triangle', 0.15, 0.12);
    playTone(659.25, 'triangle', 0.18, 0.24);
    playTone(880, 'triangle', 0.35, 0.36);
  }

  // Identificar el nivell actual de la pàgina
  function getCurrentLevelNum() {
    const path = window.location.pathname;
    if (path.includes('3-1-canvis') || path.includes('3-0-canvis')) return 1;
    if (path.includes('3-2-escales')) return 2;
    if (path.includes('3-3-corbes') || path.includes('3-1-topografia')) return 3;
    if (path.includes('3-4-perfil') || path.includes('3-3-perfil')) return 4;
    if (path.includes('3-5-pitagores') || path.includes('3-2-pitagores')) return 5;
    if (path.includes('3-6-mediatriu')) return 6;
    if (path.includes('3-8-diploma')) return 7;
    if (path.includes('3-7-antenes') || path.includes('3-3-wimax') || path.includes('3-5-wimax')) return 8;
    if (path.includes('3-9-viabilitat')) return 9;
    if (path.includes('3-10-viabilitat')) return 10;
    return 1;
  }

  // Obtenir o inicialitzar l'estat del joc
  function getGameState() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.warn('Error reading localStorage for Pocona game:', e);
    }
    return null;
  }

  function saveGameState(state) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn('Error saving game state:', e);
    }
  }

  function initDefaultState(name, group) {
    return {
      studentName: name.trim(),
      studentGroup: group, // '3r d\'ESO A' o '3r d\'ESO B'
      score: 10.0,
      errors: 0,
      correctCount: 0,
      completedLevels: [],
      solvedChallenges: {
        1: [false, false, false, false, false],
        2: [false, false, false],
        3: [false, false, false],
        4: [false, false, false],
        5: [false, false, false],
        6: [],
        7: [],
        8: [false, false, false]
      },
      answers: {},
      userInputs: {}, // Autosave: conserva respostes i seleccions
      startedAt: new Date().toISOString(),
      completedAt: null
    };
  }

  // Objecte principal exposat a window
  const PoconaGame = {
    state: null,
    currentLevelNum: getCurrentLevelNum(),

    init() {
      // Activar protecció anti-còpia al DOM
      document.body.classList.add('pocona-game-page');
      this.setupAntiCheatProtection();

      this.state = getGameState();
      const currentLvl = this.currentLevelNum;

      if (!this.state || !this.state.studentName) {
        this.showRegistrationModal();
        return;
      }

      if (this.state.studentName.trim().toLowerCase() === 'teacher') {
        document.body.classList.add('pocona-teacher-mode');
      }

      if (!this.state.userInputs) {
        this.state.userInputs = {};
      }

      // Comprovar si el nivell actual està bloquejat
      if (!this.isLevelUnlocked(currentLvl)) {
        this.renderLockedView();
        return;
      }

      // Renderitzar el HUD a la part superior de la pàgina
      this.renderHUD();

      // Restaurar valors previs desats i activar autosave continu
      this.restoreUserInputs();
      this.setupAutosaveListeners();

      // Interceptar i monitoritzar reptes del nivell actual
      this.setupLevelHooks(currentLvl);

      // Si el nivell actual és 6 (F. Dibuix Tècnic) o 7 (G. Diploma), s'auto-completa en visitar-lo
      if (currentLvl === 6 || currentLvl === 7) {
        if (!this.state.completedLevels.includes(currentLvl)) {
          this.state.completedLevels.push(currentLvl);
          saveGameState(this.state);
        }
      }

      // Si estem a la pàgina de diploma (3.8 / nivell 7), renderitzar el diploma inline
      if (currentLvl === 7) {
        this.renderInlineDiploma('diplomaEmbed');
      }
    },

    // Protecció anti-còpia i prevenció de consultes a IA des del navegador
    setupAntiCheatProtection() {
      if (window._poconaAntiCheatInitialized) return;
      window._poconaAntiCheatInitialized = true;
      const self = this;

      const isTeacherActive = () => {
        return Boolean(self.state && self.state.studentName && self.state.studentName.trim().toLowerCase() === 'teacher');
      };

      if (isTeacherActive()) {
        document.body.classList.add('pocona-teacher-mode');
        return;
      }

      // Desactivar menú contextual (clic dret / dues ditades a Chromebooks)
      document.addEventListener('contextmenu', (e) => {
        if (isTeacherActive()) return;
        const isInput = e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA');
        if (!isInput) {
          e.preventDefault();
          self.showToast('penalty', 'Menú contextual protegit durant la missió.');
        }
      });

      // Desactivar esdeveniment de còpia i tallar
      document.addEventListener('copy', (e) => {
        if (isTeacherActive()) return;
        const isInput = e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA');
        if (!isInput) {
          e.preventDefault();
          self.showToast('penalty', 'Còpia desactivada per protecció de la prova.');
        }
      });

      document.addEventListener('cut', (e) => {
        if (isTeacherActive()) return;
        const isInput = e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA');
        if (!isInput) {
          e.preventDefault();
        }
      });

      // Desactivar arrossegament de text o imatges cap a altres pestanyes
      document.addEventListener('dragstart', (e) => {
        if (isTeacherActive()) return;
        const isInput = e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA');
        if (!isInput) {
          e.preventDefault();
        }
      });

      // Bloquejar dreceres de teclat (Ctrl+C, Ctrl+U, Ctrl+S, F12, DevTools)
      document.addEventListener('keydown', (e) => {
        if (isTeacherActive()) return;
        const isCtrlOrMeta = e.ctrlKey || e.metaKey;
        const key = (e.key || '').toLowerCase();
        const isInput = e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA');

        if (isCtrlOrMeta && !isInput) {
          if (key === 'c') {
            e.preventDefault();
            self.showToast('penalty', 'Drecera Ctrl+C desactivada per protecció pedagògica.');
          } else if (key === 'u' || key === 's') {
            e.preventDefault();
          }
        }

        if (e.key === 'F12' || (isCtrlOrMeta && e.shiftKey && (key === 'i' || key === 'j' || key === 'c'))) {
          e.preventDefault();
        }
      });
    },

    // Autosave automàtic de tots els camps de text, select i radio
    setupAutosaveListeners() {
      if (!this.state) return;
      if (!this.state.userInputs) this.state.userInputs = {};
      const self = this;

      const saveInput = (target) => {
        if (!target) return;
        if (target.closest && target.closest('#poconaRegModal')) return;

        const name = target.name;
        const id = target.id;
        if (!id && !name) return;

        if (target.type === 'radio') {
          if (target.checked && name) {
            self.state.userInputs[name] = target.value;
          }
        } else if (target.type === 'checkbox') {
          const key = id || name;
          self.state.userInputs[key] = target.checked;
        } else {
          const key = id || name;
          self.state.userInputs[key] = target.value;
        }

        saveGameState(self.state);
      };

      document.addEventListener('input', (e) => {
        if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) {
          saveInput(e.target);
        }
      });

      document.addEventListener('change', (e) => {
        if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT' || e.target.tagName === 'TEXTAREA')) {
          saveInput(e.target);
        }
      });
    },

    // Restauració dels valors previs introduïts per l'alumnat
    restoreUserInputs() {
      if (!this.state || !this.state.userInputs) return;
      const inputs = this.state.userInputs;

      Object.keys(inputs).forEach(key => {
        const val = inputs[key];

        // 1. Cercar per ID
        const elById = document.getElementById(key);
        if (elById) {
          if (elById.type === 'checkbox') {
            elById.checked = Boolean(val);
          } else if (elById.type !== 'radio') {
            elById.value = val;
          }
        }

        // 2. Cercar per nom de grup Radio
        const radios = document.querySelectorAll(`input[type="radio"][name="${key}"]`);
        if (radios.length > 0) {
          radios.forEach(r => {
            if (r.value === val) {
              r.checked = true;
            }
          });
        }
      });
    },

    isLevelUnlocked(levelNum) {
      if (levelNum === 1) return true;
      if (!this.state) return false;
      if (this.state.studentName && this.state.studentName.trim().toLowerCase() === 'teacher') {
        return true;
      }
      const completed = this.state.completedLevels || [];
      if (levelNum >= 9) {
        return completed.includes(8);
      }
      return completed.includes(levelNum - 1);
    },

    // Modal de registre d'alumne/a
    showRegistrationModal() {
      let modal = document.getElementById('poconaRegModal');
      if (modal) modal.remove();

      modal = document.createElement('div');
      modal.id = 'poconaRegModal';
      modal.className = 'pocona-modal-overlay no-print';
      modal.innerHTML = `
        <div class="pocona-modal-box">
          <div style="text-align: center; margin-bottom: 1.25rem;">
            <div style="font-size: 3rem; margin-bottom: 0.5rem;">🏔️</div>
            <h2 class="pocona-modal-title" style="justify-content: center;">Missió Topogràfica Pocona</h2>
            <p class="pocona-modal-subtitle" style="margin-bottom: 0.5rem;">
              Benvingut/da a la <strong>Fase 3: Terreny i Comunicacions</strong>! Abans d'iniciar el càlcul topogràfic sobre el terreny, registra les teves dades d'enginyer/a:
            </p>
          </div>

          <form id="poconaRegForm" onsubmit="PoconaGame.handleRegistration(event)">
            <div class="pocona-form-group">
              <label class="pocona-form-label" for="regStudentName">Nom i Cognoms de l'Alumne/a:</label>
              <input type="text" id="regStudentName" class="pocona-form-input" placeholder="Ex: Arnau Puig Martí" required autofocus>
            </div>

            <div class="pocona-form-group">
              <label class="pocona-form-label" for="regStudentGroup">Curs i Grup:</label>
              <select id="regStudentGroup" class="pocona-form-select" required>
                <option value="3r d'ESO A">3r d'ESO A</option>
                <option value="3r d'ESO B">3r d'ESO B</option>
              </select>
            </div>

            <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 0.85rem; font-size: 0.85rem; color: #166534; margin-bottom: 1.25rem; line-height: 1.5;">
              🎯 <strong>Instruccions de la Missió:</strong><br>
              • Començaràs al Nivell 3.1. Els nivells 3.2 a 3.7 s'aniran desbloquejant a mesura que superis els reptes de cada pantalla.<br>
              • Cada resposta incorrecta <strong>resta punts</strong> de la teva qualificació final (-0.25 pts).<br>
              • En completar el Nivell 3.7 rebràs el teu <strong>Diploma Oficial d'Aprofitament</strong> personalitzat amb tot el resum!
            </div>

            <button type="submit" class="pocona-btn-primary">
              🚀 Començar la Missió al Terreny
            </button>
          </form>
        </div>
      `;
      document.body.appendChild(modal);
    },

    handleRegistration(evt) {
      if (evt) evt.preventDefault();
      const nameInput = document.getElementById('regStudentName');
      const groupSelect = document.getElementById('regStudentGroup');
      if (!nameInput || !nameInput.value.trim()) return;

      const isTeacher = nameInput.value.trim().toLowerCase() === 'teacher';
      this.state = initDefaultState(nameInput.value, groupSelect.value);
      if (isTeacher) {
        this.state.completedLevels = [1, 2, 3, 4, 5, 6, 7];
        document.body.classList.add('pocona-teacher-mode');
      }
      saveGameState(this.state);

      const modal = document.getElementById('poconaRegModal');
      if (modal) modal.remove();

      if (typeof initSidebar === 'function') {
        initSidebar();
      }

      // Si estem en una pàgina diferent a 3.1 i no és teacher, redirigim a 3.1
      if (this.currentLevelNum !== 1 && !isTeacher) {
        window.location.href = '3-1-canvis-unitats.html';
      } else {
        this.renderHUD();
        this.restoreUserInputs();
        this.setupAutosaveListeners();
        playSuccessSound();
        this.showToast('success', isTeacher ? 'Mode Docent activat: Tots els subapartats desbloquejats!' : `Benvingut/da ${this.state.studentName}! Nivell ${this.currentLevelNum} actiu.`);
      }
    },

    // Pantalla de bloqueig si l'alumne intenta saltar-se un nivell
    renderLockedView() {
      const mainContainer = document.querySelector('.content-container');
      if (!mainContainer) return;

      const highestUnlocked = this.getHighestUnlockedLevel();
      const prevLvlIndex = Math.min(Math.max(this.currentLevelNum - 2, 0), LEVELS.length - 1);
      const prevLvl = LEVELS[prevLvlIndex] || LEVELS[0];
      const curTitle = this.currentLevelNum === 7 ? "G. 🎓 Diploma d'Aprofitament" :
                       this.currentLevelNum === 8 ? "H. Sistemes de Comunicació i Antenes" :
                       this.currentLevelNum === 9 ? "Cas 1" :
                       this.currentLevelNum === 10 ? "Cas 2" :
                       (LEVELS[this.currentLevelNum - 1] ? LEVELS[this.currentLevelNum - 1].title : `Nivell ${this.currentLevelNum}`);

      // Ocultar contingut de la pàgina
      Array.from(mainContainer.children).forEach(child => {
        child.style.display = 'none';
      });

      // Injectar HUD primer perquè pugui veure l'estat
      this.renderHUD();

      // Crear missatge de bloqueig
      let lockBox = document.getElementById('poconaLockedViewBox');
      if (lockBox) lockBox.remove();
      lockBox = document.createElement('div');
      lockBox.id = 'poconaLockedViewBox';
      lockBox.className = 'pocona-locked-view';
      lockBox.innerHTML = `
        <div class="pocona-locked-icon">🔒</div>
        <h2 style="font-size: 1.5rem; color: #0f172a; margin-bottom: 0.5rem;">${curTitle} Bloquejat!</h2>
        <p style="color: #475569; max-width: 550px; margin: 0 auto 1.5rem auto; line-height: 1.6;">
          Hola <strong>${this.state.studentName}</strong>! Per poder accedir a aquest apartat, primer has de completar amb èxit tots els reptes dels apartats previs (fins a <strong>${prevLvl.title}</strong>).
        </p>
        <div style="display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap;">
          <a href="${prevLvl.url}" class="pocona-btn-primary" style="width: auto; text-decoration: none; padding: 0.65rem 1.4rem;">
            ⬅️ Anar a l'apartat ${prevLvl.title}
          </a>
          <a href="${LEVELS[highestUnlocked - 1].url}" class="btn-action" style="text-decoration: none; padding: 0.65rem 1.25rem; font-size: 0.95rem;">
            🎯 Anar al teu apartat actiu (${LEVELS[highestUnlocked - 1].short})
          </a>
        </div>
      `;
      mainContainer.appendChild(lockBox);
    },

    getHighestUnlockedLevel() {
      if (!this.state || !this.state.completedLevels || this.state.completedLevels.length === 0) return 1;
      const maxCompleted = Math.max(...this.state.completedLevels);
      return Math.min(maxCompleted + 1, 8);
    },

    // Renderitzar barra de progrés HUD
    renderHUD() {
      let hud = document.getElementById('poconaGameHud');
      if (hud) hud.remove();

      const mainContainer = document.querySelector('.content-container');
      if (!mainContainer) return;

      const state = this.state || { studentName: 'Sense registrar', studentGroup: '3r d\'ESO A', score: 10.0, errors: 0, completedLevels: [] };
      const curLvl = this.currentLevelNum;
      const completedCount = (state.completedLevels || []).length;
      const progressPercent = Math.min(100, Math.round((completedCount / 8) * 100));

      hud = document.createElement('div');
      hud.id = 'poconaGameHud';
      hud.className = 'pocona-game-hud no-print';

      // Generar nodes del stepper
      let nodesHTML = '';
      LEVELS.forEach(lvl => {
        const isDone = (state.completedLevels || []).includes(lvl.num);
        const isCurrent = (lvl.num === curLvl);
        const isUnlocked = this.isLevelUnlocked(lvl.num);

        let statusClass = 'unlocked';
        let iconContent = lvl.letter || lvl.num;
        if (isDone) {
          statusClass = 'completed';
          iconContent = '✓';
        } else if (isCurrent) {
          statusClass = 'current';
          iconContent = '🎯';
        } else if (!isUnlocked) {
          statusClass = 'locked disabled';
          iconContent = '🔒';
        }

        if (isUnlocked) {
          nodesHTML += `
            <a href="${lvl.url}" class="stepper-node ${statusClass}" title="${lvl.title} (${isDone ? 'Superat' : (isCurrent ? 'En curs' : 'Disponible')})">
              <div class="stepper-icon-circle">${iconContent}</div>
              <div class="stepper-label">${lvl.letter ? `${lvl.letter}. ${lvl.short}` : lvl.short}</div>
            </a>
          `;
        } else {
          nodesHTML += `
            <span class="stepper-node ${statusClass}" style="cursor: not-allowed; opacity: 0.55;" title="${lvl.title} (Bloquejat - Supera els reptes de l'apartat anterior)" onclick="alert('🔒 Aquest apartat està bloquejat. Has de resoldre i comprovar tots els reptes de l\'apartat anterior per poder avançar!');">
              <div class="stepper-icon-circle">${iconContent}</div>
              <div class="stepper-label">${lvl.letter ? `${lvl.letter}. ${lvl.short}` : lvl.short}</div>
            </span>
          `;
        }
      });

      const isTeacher = state.studentName && state.studentName.trim().toLowerCase() === 'teacher';

      hud.innerHTML = `
        <div class="hud-top-row">
          <div class="hud-agent-info">
            <span class="hud-badge-agent">👷‍♂️ Enginyer/a: <strong>${state.studentName}</strong>${isTeacher ? ' <span style="background:#f59e0b; color:#1e293b; font-size:0.72rem; padding:2px 7px; border-radius:4px; font-weight:800; margin-left:4px;">DOCENT 🔓</span>' : ''}</span>
            <span class="hud-badge-group">🏫 Curs: <strong>${state.studentGroup}</strong></span>
          </div>
          <div class="hud-stats">
            <div class="hud-stat-pill score-pill">⭐ Nota: <strong id="hudScoreVal">${state.score.toFixed(1)}</strong>/10</div>
            <div class="hud-stat-pill errors-pill">⚠️ Errors: <strong id="hudErrorsVal">${state.errors}</strong></div>
            <button type="button" class="btn-hud-diploma" onclick="PoconaGame.openDiploma()" title="Veure el Diploma d'Aprofitament">
              📜 Diploma
            </button>
            <button type="button" class="btn-hud-reset" onclick="PoconaGame.promptChangeStudent()" title="Canviar o reiniciar alumne/a">
              👤 Canviar
            </button>
          </div>
        </div>

        <div class="hud-stepper">
          <div class="stepper-track">
            <div class="stepper-fill" id="hudStepperFill" style="width: ${progressPercent}%;"></div>
          </div>
          <div class="stepper-nodes">
            ${nodesHTML}
          </div>
        </div>
      `;

      mainContainer.insertBefore(hud, mainContainer.firstChild);
    },

    // Notificacions flotants
    showToast(type, message) {
      const existing = document.querySelector('.hud-score-toast');
      if (existing) existing.remove();

      const toast = document.createElement('div');
      toast.className = `hud-score-toast ${type} no-print`;
      toast.innerHTML = type === 'penalty' ? `⚠️ ${message}` : `🎉 ${message}`;
      document.body.appendChild(toast);

      setTimeout(() => {
        if (toast.parentNode) toast.remove();
      }, 3500);
    },

    // Penalització per fallada
    applyPenalty(reason) {
      if (!this.state) return;
      playErrorSound();
      this.state.errors = (this.state.errors || 0) + 1;
      // Restar 0.25 punts per error, mínim 1.0
      this.state.score = Math.max(1.0, +(this.state.score - 0.25).toFixed(2));
      saveGameState(this.state);

      // Actualitzar visualment HUD
      const scoreElem = document.getElementById('hudScoreVal');
      const errElem = document.getElementById('hudErrorsVal');
      if (scoreElem) scoreElem.textContent = this.state.score.toFixed(1);
      if (errElem) errElem.textContent = this.state.errors;

      this.showToast('penalty', `${reason || 'Resposta incorrecta!'} (-0.25 pts)`);
    },

    // Registre d'encert
    recordSuccess(levelNum, challengeNum, answerSummary, keyConcept) {
      if (!this.state) return;
      playSuccessSound();
      if (!this.state.solvedChallenges[levelNum]) {
        this.state.solvedChallenges[levelNum] = [];
      }
      this.state.solvedChallenges[levelNum][challengeNum - 1] = true;
      this.state.correctCount = (this.state.correctCount || 0) + 1;

      // Guardar resposta i resum
      if (!this.state.answers) this.state.answers = {};
      const answerKey = `lvl_${levelNum}_ch_${challengeNum}`;
      this.state.answers[answerKey] = {
        level: levelNum,
        challenge: challengeNum,
        summary: answerSummary,
        concept: keyConcept,
        timestamp: new Date().toLocaleTimeString('ca-ES')
      };

      saveGameState(this.state);
      this.showToast('success', `Repte ${challengeNum} superat!`);

      // Comprovar si tots els reptes del nivell actual estan fets
      this.checkLevelCompletion(levelNum);
    },

    checkLevelCompletion(levelNum) {
      const lvlMeta = LEVELS[levelNum - 1];
      const solvedArr = this.state.solvedChallenges[levelNum] || [];
      const totalRequired = lvlMeta.totalChallenges;

      const solvedCount = solvedArr.slice(0, totalRequired).filter(Boolean).length;
      if (solvedCount >= totalRequired) {
        if (!this.state.completedLevels.includes(levelNum)) {
          this.state.completedLevels.push(levelNum);
          if (levelNum === 8) {
            this.state.completedAt = new Date().toISOString();
          }
          saveGameState(this.state);
          this.renderHUD();
          if (typeof initSidebar === 'function') {
            initSidebar();
          }
          window.dispatchEvent(new CustomEvent('poconaGameUpdated', { detail: { completedLevels: this.state.completedLevels } }));
          playLevelUpSound();
          this.showLevelSuccessModal(levelNum);
        }
      }
    },

    showLevelSuccessModal(levelNum) {
      const lvlMeta = LEVELS[levelNum - 1];
      const nextLvl = LEVELS[levelNum]; // pot ser undefined si és el 8

      let modal = document.getElementById('poconaLvlSuccessModal');
      if (modal) modal.remove();

      modal = document.createElement('div');
      modal.id = 'poconaLvlSuccessModal';
      modal.className = 'pocona-modal-overlay no-print';

      let buttonHTML = '';
      if (nextLvl) {
        buttonHTML = `
          <a href="${nextLvl.url}" class="pocona-btn-primary" style="text-decoration: none;">
            🚀 Avançar al Nivell ${nextLvl.title} ➔
          </a>
        `;
      } else {
        buttonHTML = `
          <a href="3-9-viabilitat-cas-1.html" class="pocona-btn-primary" style="text-decoration: none;">
            📋 Avançar als Casos de Viabilitat de Camp (Cas 1) ➔
          </a>
        `;
      }

      modal.innerHTML = `
        <div class="pocona-modal-box" style="text-align: center;">
          <div style="font-size: 3.5rem; margin-bottom: 0.5rem;">🎉</div>
          <h2 class="pocona-modal-title" style="justify-content: center; color: #15803d;">
            Nivell ${lvlMeta.title} Superat!
          </h2>
          <p class="pocona-modal-subtitle" style="margin-bottom: 1.25rem;">
            Molt bona feina, <strong>${this.state.studentName}</strong>! Has resolt amb èxit tots els reptes i investigacions tècniques d'aquest apartat.
          </p>

          <div style="background: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 10px; padding: 1rem; margin-bottom: 1.5rem; display: flex; justify-content: space-around; text-align: center;">
            <div>
              <div style="font-size: 0.75rem; color: #64748b; font-weight: 700; text-transform: uppercase;">Puntuació Actual</div>
              <div style="font-size: 1.4rem; font-weight: 800; color: #16a34a; font-family: 'JetBrains Mono', monospace;">${this.state.score.toFixed(1)} / 10</div>
            </div>
            <div>
              <div style="font-size: 0.75rem; color: #64748b; font-weight: 700; text-transform: uppercase;">Nivells Assolits</div>
              <div style="font-size: 1.4rem; font-weight: 800; color: #0284c7;">${this.state.completedLevels.length} / 8</div>
            </div>
            <div>
              <div style="font-size: 0.75rem; color: #64748b; font-weight: 700; text-transform: uppercase;">Errors Comessos</div>
              <div style="font-size: 1.4rem; font-weight: 800; color: ${this.state.errors > 0 ? '#ef4444' : '#10b981'};">${this.state.errors}</div>
            </div>
          </div>

          <div style="display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap;">
            ${buttonHTML}
            <button type="button" class="btn-action" onclick="document.getElementById('poconaLvlSuccessModal').remove();" style="font-size: 0.9rem;">
              Continuar explorant aquesta pàgina
            </button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    },

    // Monitorització i connexió amb els simuladors existents
    setupLevelHooks(levelNum) {
      if (levelNum === 1) {
        this.setupUnitChallenges();
        return;
      }

      // Per a nivells 2 a 8: interceptar les funcions de comprovació dels simuladors
      const hookMap = {
        2: { fn: 'checkScaleChallenge', cardPrefix: 'scaleCh', count: 3 },
        3: { fn: 'checkContourChallenge', cardPrefix: 'contourCh', count: 3 },
        4: { fn: 'checkLosChallenge', cardPrefix: 'losCh', count: 3 },
        5: { fn: 'checkPytChallenge', cardPrefix: 'pytCh', count: 3 },
        8: { fn: 'checkWimaxChallenge', cardPrefix: 'wimaxCh', count: 3 }
      };

      const meta = hookMap[levelNum];
      if (!meta) return;

      const self = this;

      // Restaurar visualment reptes ja resolts d'aquest nivell
      const solvedArr = (this.state && this.state.solvedChallenges[levelNum]) || [];
      for (let i = 1; i <= meta.count; i++) {
        if (solvedArr[i - 1]) {
          const statusElem = document.getElementById(`${meta.cardPrefix}${i}Status`);
          const fbElem = document.getElementById(`${meta.cardPrefix}${i}Feedback`);
          if (statusElem) {
            statusElem.className = 'status-badge status-ok';
            statusElem.textContent = 'Correcte!';
          }
          if (fbElem) {
            fbElem.style.display = 'block';
            fbElem.style.color = '#15803d';
            fbElem.innerHTML = '✅ <strong>Completat amb èxit!</strong>';
          }
        }
      }

      // Wrap de la funció global del simulador
      const originalFn = window[meta.fn];
      if (typeof originalFn === 'function') {
        window[meta.fn] = function(challengeNum) {
          originalFn.apply(this, arguments);
          self.inspectDOMChallenge(levelNum, challengeNum, meta.cardPrefix);
        };
      }

      // Observer per detectar canvis d'estat automàtics (com el punter del canvas a 3.3 o botons a 3.7)
      const observer = new MutationObserver(() => {
        for (let i = 1; i <= meta.count; i++) {
          const statusElem = document.getElementById(`${meta.cardPrefix}${i}Status`);
          if (statusElem && statusElem.classList.contains('status-ok')) {
            const alreadySolved = (self.state.solvedChallenges[levelNum] || [])[i - 1];
            if (!alreadySolved) {
              self.inspectDOMChallenge(levelNum, i, meta.cardPrefix);
            }
          }
        }
      });

      for (let i = 1; i <= meta.count; i++) {
        const card = document.getElementById(`${meta.cardPrefix}${i}Card`);
        if (card) {
          observer.observe(card, { attributes: true, subtree: true, childList: true });
        }
      }
    },

    inspectDOMChallenge(levelNum, challengeNum, cardPrefix) {
      const statusElem = document.getElementById(`${cardPrefix}${challengeNum}Status`);
      if (!statusElem) return;

      const isOk = statusElem.classList.contains('status-ok');
      const isDanger = statusElem.classList.contains('status-danger');
      const alreadySolved = (this.state.solvedChallenges[levelNum] || [])[challengeNum - 1];

      if (isOk && !alreadySolved) {
        let answerSummary = 'Comprovat correctament amb el simulador interactiu';
        let concept = `Repte ${challengeNum} del Nivell ${levelNum}`;

        const inputElem = document.getElementById(`${cardPrefix}${challengeNum}Input`) ||
                          document.getElementById(`${cardPrefix}${challengeNum}Select`);
        if (inputElem && inputElem.value) {
          answerSummary = `Valor introduït: ${inputElem.value}`;
        }

        // Descripció pedagògica per al diploma segons el nivell
        const conceptsDesc = {
          '2_1': 'Càlcul de distància real amb escala 1:25.000 (8,5 cm = 2.125 m)',
          '2_2': 'Mesura interactiva ruta Pocona-Chillijchi a escala 1:10.000 (~0,57 km)',
          '2_3': 'Determinació d\'escala idònia per a plànol d\'instal·lació (1:50.000)',
          '3_1': 'Identificació del coll orogràfic i punts de sella al mapa topogràfic',
          '3_2': 'Càlcul de desnivell vertical entre fons de vall i cim (Δh = 1.200 m)',
          '3_3': 'Equidistància de corbes de nivell i pendents del terreny (12 corbes)',
          '4_1': 'Alliberament d\'obstacles a la línia de visió (LoS OK entre torres)',
          '4_2': 'Lectura i anàlisi del desnivell real al perfil topogràfic',
          '4_3': 'Estratègia de repetidor intermedi per superar barreres de relleu',
          '5_1': 'Teorema de Pitàgores: distància real 3D entre antenes Ambulatori-Torre (1.000 m)',
          '5_2': 'Càlcul d\'enllaç d\'antenes Escola-Repetidor amb Pitàgores (500 m)',
          '5_3': 'Verificació d\'abast de l\'antena del fabricant amb Pitàgores (2.600 m)',
          '6_1': 'Propietat geomètrica d\'equidistància del circumcentre (radis idèntics)',
          '6_2': 'Teorema de Tales i posició del circumcentre en triangles rectangles',
          '6_3': 'Optimització de la ubicació del repetidor per cobertura comunitària (R ≤ 4 km)',
          '7_1': 'Diploma d\'Aprofitament en Enginyeria Topogràfica obtingut',
          '8_1': 'Enllaç troncal T1-T2 amb antena direccional per superar 7,5 km (P ≥ 20 dBm)',
          '8_2': 'Salt de repetidor T2-T3 amb antena direccional des del cim a la vall (6,2 km)',
          '8_3': 'Distribució multipunt comunitària T3 amb antena omnidireccional 360° (P ≥ 24 dBm)'
        };

        const key = `${levelNum}_${challengeNum}`;
        concept = conceptsDesc[key] || concept;

        this.recordSuccess(levelNum, challengeNum, answerSummary, concept);
      } else if (isDanger && !alreadySolved) {
        this.applyPenalty('Resposta errònia');
      }
    },

    // ==========================================================
    // LÒGICA DELS 5 REPTES DEL NIVELL 3.1 (CANVI D'UNITATS)
    // ==========================================================
    setupUnitChallenges() {
      // Si ja hi ha reptes resolts a l'estat, marcar-los al DOM
      const solved = (this.state && this.state.solvedChallenges[1]) || [];
      for (let i = 1; i <= 5; i++) {
        if (solved[i - 1]) {
          const status = document.getElementById(`unitCh${i}Status`);
          const fb = document.getElementById(`unitCh${i}Feedback`);
          if (status) {
            status.className = 'status-badge status-ok';
            status.textContent = 'Correcte!';
          }
          if (fb) {
            fb.style.display = 'block';
            fb.style.color = '#15803d';
            fb.innerHTML = '✅ <strong>Completat amb èxit!</strong>';
          }
        }
      }
    },

    checkUnitChallenge(num) {
      if (!this.state) {
        this.showRegistrationModal();
        return;
      }

      const status = document.getElementById(`unitCh${num}Status`);
      const fb = document.getElementById(`unitCh${num}Feedback`);

      if (num === 1) {
        // Quiz: 4,5 km a metres = 4.500 m
        const selected = document.querySelector('input[name="unitCh1Opt"]:checked');
        if (!selected) {
          alert('Selecciona una opció abans de comprovar.');
          return;
        }
        if (selected.value === '4500') {
          if (status) { status.className = 'status-badge status-ok'; status.textContent = 'Correcte! (+100 XP)'; }
          if (fb) {
            fb.style.display = 'block';
            fb.style.color = '#15803d';
            fb.innerHTML = '<strong>Molt bé!</strong> 1 km = 1.000 m. Per tant, 4,5 × 1.000 = <strong>4.500 metres</strong> de distància fins a l\'antena de l\'escola.';
          }
          this.recordSuccess(1, 1, '4.500 metres', 'Conversió directa km ➔ m (× 1.000)');
        } else {
          if (status) { status.className = 'status-badge status-danger'; status.textContent = 'Incorrecte'; }
          if (fb) {
            fb.style.display = 'block';
            fb.style.color = '#b91c1c';
            fb.innerHTML = 'Pista: Recorda que per baixar de quilòmetres a metres es baixa 3 graons a l\'escala mètrica (multiplicar per 1.000). 4,5 × 1.000 = ?';
          }
          this.applyPenalty('Repte 1 d\'Unitats incorrecte');
        }
      } else if (num === 2) {
        // Omplir el buit: 350.000 cm = 3.500 m
        const val = parseFloat(document.getElementById('unitCh2Input')?.value);
        if (isNaN(val)) {
          alert('Introdueix un número a la casella.');
          return;
        }
        if (Math.abs(val - 3500) < 5) {
          if (status) { status.className = 'status-badge status-ok'; status.textContent = 'Correcte! (+100 XP)'; }
          if (fb) {
            fb.style.display = 'block';
            fb.style.color = '#15803d';
            fb.innerHTML = '<strong>Exacte!</strong> Com que 1 m té 100 cm, per passar de cm a m pugem 2 graons (dividim entre 100): 350.000 ÷ 100 = <strong>3.500 m</strong>.';
          }
          this.recordSuccess(1, 2, '3.500 metres', 'Conversió cm ➔ m (÷ 100)');
        } else {
          if (status) { status.className = 'status-badge status-danger'; status.textContent = 'Incorrecte'; }
          if (fb) {
            fb.style.display = 'block';
            fb.style.color = '#b91c1c';
            fb.innerHTML = 'Pista: 1 metre té 100 centímetres. Divideix 350.000 entre 100 (treu dos zeros).';
          }
          this.applyPenalty('Repte 2 d\'Unitats incorrecte');
        }
      } else if (num === 3) {
        // Comparació: Antena A (2.800 m) vs Antena B (2,5 km)
        const selected = document.querySelector('input[name="unitCh3Opt"]:checked');
        if (!selected) {
          alert('Tria una opció abans de comprovar.');
          return;
        }
        if (selected.value === 'A') {
          if (status) { status.className = 'status-badge status-ok'; status.textContent = 'Correcte! (+100 XP)'; }
          if (fb) {
            fb.style.display = 'block';
            fb.style.color = '#15803d';
            fb.innerHTML = '<strong>Molt bona deducció!</strong> 2,5 km són 2.500 m. Per tant, l\'<strong>Antena A</strong> (2.800 m) té 300 metres més d\'abast que l\'Antena B.';
          }
          this.recordSuccess(1, 3, 'Antena A (2.800 m > 2.500 m)', 'Comparació d\'unitats homogènies');
        } else {
          if (status) { status.className = 'status-badge status-danger'; status.textContent = 'Incorrecte'; }
          if (fb) {
            fb.style.display = 'block';
            fb.style.color = '#b91c1c';
            fb.innerHTML = 'Pista: Passa primer els 2,5 km a metres (2,5 × 1.000 = 2.500 m) i compara 2.800 m amb 2.500 m.';
          }
          this.applyPenalty('Repte 3 d\'Unitats incorrecte');
        }
      } else if (num === 4) {
        // 180 mm = 18 cm
        const val = parseFloat(document.getElementById('unitCh4Input')?.value);
        if (isNaN(val)) {
          alert('Introdueix un número.');
          return;
        }
        if (Math.abs(val - 18) < 0.5) {
          if (status) { status.className = 'status-badge status-ok'; status.textContent = 'Correcte! (+100 XP)'; }
          if (fb) {
            fb.style.display = 'block';
            fb.style.color = '#15803d';
            fb.innerHTML = '<strong>Perfecte!</strong> Per passar de mil·límetres a centímetres es puja 1 graó (dividim entre 10): 180 mm ÷ 10 = <strong>18 cm</strong>.';
          }
          this.recordSuccess(1, 4, '18 cm', 'Conversió mm ➔ cm (÷ 10)');
        } else {
          if (status) { status.className = 'status-badge status-danger'; status.textContent = 'Incorrecte'; }
          if (fb) {
            fb.style.display = 'block';
            fb.style.color = '#b91c1c';
            fb.innerHTML = 'Pista: 1 cm té 10 mm. Divideix 180 entre 10.';
          }
          this.applyPenalty('Repte 4 d\'Unitats incorrecte');
        }
      } else if (num === 5) {
        // Desnivell de 3.200 m = 3,2 km (repte pur de conversió, sense escales)
        const raw = document.getElementById('unitCh5Input')?.value || '';
        const val = parseFloat(raw.replace(',', '.'));
        if (isNaN(val)) {
          alert('Introdueix un número.');
          return;
        }
        if (Math.abs(val - 3.2) < 0.1) {
          if (status) { status.className = 'status-badge status-ok'; status.textContent = 'Correcte! (+100 XP)'; }
          if (fb) {
            fb.style.display = 'block';
            fb.style.color = '#15803d';
            fb.innerHTML = '<strong>Molt ben calculat!</strong> Per passar de metres a quilòmetres pugem 3 graons a l\'escala mètrica (dividim entre 1.000): 3.200 m ÷ 1.000 = <strong>3,2 quilòmetres</strong>.';
          }
          this.recordSuccess(1, 5, '3,2 km', 'Conversió m ➔ km (÷ 1.000) aplicada a l\'alçada de la muntanya');
        } else {
          if (status) { status.className = 'status-badge status-danger'; status.textContent = 'Incorrecte'; }
          if (fb) {
            fb.style.display = 'block';
            fb.style.color = '#b91c1c';
            fb.innerHTML = 'Pista: 1 km té 1.000 metres. Divideix 3.200 entre 1.000 (mou la coma 3 posicions a l\'esquerra). 3.200 ÷ 1.000 = ?';
          }
          this.applyPenalty('Repte 5 d\'Unitats incorrecte');
        }
      }
    },

    // ==========================================================
    // DIPLOMA OFICIAL FINAL
    // ==========================================================
    getDiplomaContentHTML(state, isInline = false) {
      if (!state) state = this.state || {
        studentName: 'Alumne/a de Tecnologia',
        studentGroup: '3r d\'ESO A',
        score: 10.0,
        errors: 0,
        correctCount: 0,
        completedLevels: [],
        answers: {}
      };

      const completedCount = (state.completedLevels || []).length;
      const isCompleted = completedCount >= 7;

      let rankTitle = 'Tècnic/a de Camp en Pràctiques';
      let rankEmoji = '🧭';
      if (state.score >= 9.0) {
        rankTitle = 'Enginyer/a en Cap d\'Infraestructures (Excel·lent)';
        rankEmoji = '🏆';
      } else if (state.score >= 7.0) {
        rankTitle = 'Especialista Topogràfic/a Comunitari/ària (Notable)';
        rankEmoji = '🌟';
      }

      // Generar files de la taula de respostes i competències (excloem el nivell 7 que és el diploma mateix)
      const tableRows = LEVELS.filter(lvl => lvl.num !== 7).map(lvl => {
        const isDone = (state.completedLevels || []).includes(lvl.num);
        let summaryText = 'Pendent de resoldre';
        if (isDone) {
          if (lvl.num === 1) {
            summaryText = '4.500 m; 3.500 m; Antena A major; 18 cm; 3,2 km reals';
          } else if (lvl.num === 2) {
            summaryText = '8,5 cm = 2.125 m; Ruta Pocona-Chillijchi 2,28 km; Escala 1:50.000';
          } else if (lvl.num === 3) {
            summaryText = 'Coll orogràfic detectat; Δh = 1.200 m; 12 corbes d\'equidistància';
          } else if (lvl.num === 4) {
            summaryText = 'Línia de visió (LoS) buidada; Desnivell registrat; Repetidor intermedi';
          } else if (lvl.num === 5) {
            summaryText = 'Hipotenusa d = 1.000 m; Enllaç escola 500 m; Abast fabricant 2.600 m';
          } else if (lvl.num === 6) {
            summaryText = 'Traçat geomètric de mediatrius i circumcentre amb regle i compàs';
          } else if (lvl.num === 8) {
            summaryText = 'Troncal T1-T2 (7,5 km); Repetidor T2-T3 (6,2 km); Cobertura 360° 3 pobles';
          }
        }

        const compDesc = {
          1: 'Conversió d\'unitats mètriques i decimals (km, m, cm, mm)',
          2: 'Càlcul de distàncies reals mitjançant escales numèriques',
          3: 'Interpretació de relleu, cotes i equidistància en corbes de nivell',
          4: 'Traçat de perfil topogràfic i verificació de línia de visió (LoS)',
          5: 'Càlcul geomètric tridimensional de distància real amb Teorema de Pitàgores',
          6: 'Dibuix tècnic geomètric: mediatrius de triangle i circumcentre per a repetidor',
          8: 'Xarxa de radiocomunicació rural: antenes direccionals PTP i omnidireccionals 360°'
        };

        return `
          <tr>
            <td style="font-weight: 700; white-space: nowrap;">${lvl.letter ? `${lvl.letter}. ${lvl.short}` : `${lvl.num}. ${lvl.short}`}</td>
            <td style="font-size: 0.78rem;">${compDesc[lvl.num]}</td>
            <td style="font-family: 'JetBrains Mono', monospace; font-size: 0.76rem;">${summaryText}</td>
            <td style="text-align: center; font-weight: 700; color: ${isDone ? '#16a34a' : '#64748b'};">
              ${isDone ? '✅ Assolit' : '⏳ En curs'}
            </td>
          </tr>
        `;
      }).join('');

      const dateStr = new Date().toLocaleDateString('ca-ES', { month: 'long', year: 'numeric' });

      return `
        <div class="diploma-wrapper" id="printableDiploma">
          <div class="diploma-header">
            <div class="diploma-inst-title">Departament d'Educació · Àrea de Tecnologia · 3r d'ESO</div>
            <h1 class="diploma-main-title">DIPLOMA D'APROFITAMENT EN ENGINYERIA TOPOGRÀFICA</h1>
            <div class="diploma-sub-title">Projecte de Cooperació i Telecomunicacions Comunitàries a Pocona (Bolívia)</div>
          </div>

          <div class="diploma-student-box">
            <div class="diploma-cert-text">Es certifica oficialment que l'alumne/a:</div>
            <div class="diploma-student-name">${state.studentName}</div>
            <div style="font-size: 0.95rem; color: #334155; margin-top: 0.35rem;">
              del grup <span class="diploma-group-badge">${state.studentGroup}</span> ha completat les investigacions de:
            </div>
            <div style="font-size: 1.05rem; font-weight: 700; color: #0284c7; margin-top: 0.3rem;">
              «Topografia, Escales Cartogràfiques, Corbes de Nivell i Xarxa WiMAX Rural»
            </div>
          </div>

          <div class="diploma-kpi-grid">
            <div class="diploma-kpi-card highlight">
              <div class="diploma-kpi-label">Qualificació</div>
              <div class="diploma-kpi-val grade">${state.score.toFixed(1)} / 10</div>
              <div class="diploma-rank-badge">${rankEmoji} ${rankTitle.split('(')[0]}</div>
            </div>
            <div class="diploma-kpi-card">
              <div class="diploma-kpi-label">Nivells Superats</div>
              <div class="diploma-kpi-val">${completedCount} / 7</div>
              <div style="font-size: 0.7rem; color: #64748b; margin-top: 0.15rem;">Fase 3 Completada</div>
            </div>
            <div class="diploma-kpi-card">
              <div class="diploma-kpi-label">Balanç d'Errors</div>
              <div class="diploma-kpi-val">${state.errors}</div>
              <div style="font-size: 0.7rem; color: #64748b; margin-top: 0.15rem;">Fallades penalitzades</div>
            </div>
            <div class="diploma-kpi-card">
              <div class="diploma-kpi-label">Estat Global</div>
              <div class="diploma-kpi-val" style="color: ${isCompleted ? '#16a34a' : '#d97706'}; font-size: 1.05rem;">
                ${isCompleted ? 'GRADUAT/DA' : 'EN DESENVOLUPAMENT'}
              </div>
              <div style="font-size: 0.7rem; color: #64748b; margin-top: 0.15rem;">${dateStr}</div>
            </div>
          </div>

          <div class="diploma-table-wrapper">
            <table class="diploma-table">
              <thead>
                <tr>
                  <th style="width: 20%;">Nivell</th>
                  <th style="width: 35%;">Competència Tècnica Clau</th>
                  <th style="width: 33%;">Resum d'Evidències i Càlculs</th>
                  <th style="width: 12%; text-align: center;">Estat</th>
                </tr>
              </thead>
              <tbody>
                ${tableRows}
              </tbody>
            </table>
          </div>

          <div class="diploma-footer-signatures">
            <div class="diploma-signature-col">
              <div class="diploma-signature-line"></div>
              <strong>Cap del Departament de Tecnologia</strong><br>
              <span>Avaluació Curricular</span>
            </div>
            <div style="text-align: center; font-size: 0.75rem; color: #64748b;">
              🏅 Segell Oficial de Projecte Comunitari<br>
              <em>Pocona Enginyeria & Cooperació</em>
            </div>
            <div class="diploma-signature-col">
              <div class="diploma-signature-line"></div>
              <strong>Equip Tècnic d'Enginyeria</strong><br>
              <span>Validació de Camp (${dateStr})</span>
            </div>
          </div>
        </div>

        <div class="diploma-actions-bar no-print" style="margin-top: 1.5rem; justify-content: center; display: flex; gap: 0.75rem; flex-wrap: wrap;">
          <button type="button" class="btn-diploma-print" onclick="window.print()">
            🖨️ Imprimir / Descarregar Diploma en PDF
          </button>
          ${!isInline ? `
          <button type="button" class="btn-diploma-close" onclick="PoconaGame.closeDiploma()">
            ✖️ Tancar Vista
          </button>` : `
          <a href="3-7-antenes-comunicacio.html" class="pocona-btn-primary" style="width: auto; text-decoration: none; padding: 0.65rem 1.4rem;">
            📡 Continuar a l'Apartat H (Antenes i WiMAX) ➔
          </a>`}
          <button type="button" class="btn-diploma-reset" onclick="PoconaGame.promptChangeStudent()">
            🔄 Canviar d'Alumne/a
          </button>
        </div>
      `;
    },

    openDiploma() {
      if (!this.state) {
        this.showRegistrationModal();
        return;
      }
      let modal = document.getElementById('poconaDiplomaModal');
      if (modal) modal.remove();

      modal = document.createElement('div');
      modal.id = 'poconaDiplomaModal';
      modal.className = 'pocona-modal-overlay';
      modal.innerHTML = `
        <div class="pocona-modal-box modal-xl" style="background: transparent; border: none; box-shadow: none; padding: 0.5rem;">
          ${this.getDiplomaContentHTML(this.state, false)}
        </div>
      `;
      document.body.appendChild(modal);
    },

    renderInlineDiploma(containerId) {
      const container = document.getElementById(containerId);
      if (!container) return;
      container.innerHTML = this.getDiplomaContentHTML(this.state, true);
    },

    closeDiploma() {
      const modal = document.getElementById('poconaDiplomaModal');
      if (modal) modal.remove();
    },

    promptChangeStudent() {
      if (confirm('Vols canviar d\'alumne/a o iniciar una nova missió? S\'esborrarà el progrés d\'aquesta sessió.')) {
        localStorage.removeItem(STORAGE_KEY);
        window.location.href = '3-1-canvis-unitats.html';
      }
    }
  };

  window.PoconaGame = PoconaGame;

  // Inicialització automàtica quan el document estigui llest
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => PoconaGame.init());
  } else {
    PoconaGame.init();
  }

})();
