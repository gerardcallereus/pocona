/* ==========================================================
   POCONA: SIMULADOR DIDÀCTIC INTERACTIU
   «Calculadora de la Desigualtat: Quant et costaria Internet si visquessis a Pocona?» 🧮
   ========================================================== */

(function() {
  // Paràmetres socioeconòmics de referència
  const SMI_CAT = 1184;            // Salari Mínim Interprofessional mensual a Espanya/Cat (€)
  const TARIFA_PLANA_CAT = 38;     // Tarifa plana mitjana fibra 300-600 Mbps + mòbil (€)
  const SPEED_CAT_KBPS = 300000;   // 300 Mbps simètrics

  const INCOME_POCONA_BOB = 1350;  // Ingrés mitjà d'una família pagesa a Pocona (BOB/mes)
  const COST_PER_GB_BOB = 12;      // Cost d'1 GB prepagament mòbil a Bolívia rural (BOB)
  const BOB_TO_EUR = 0.133;        // 1 BOB ≈ 0,133 €
  const SPEED_POCONA_KBPS = 256;   // Velocitat 2G/3G residual mitjana (kbps)

  // Estat dels consums diaris (hores)
  let userHours = {
    social: 2.5,   // TikTok, Instagram, WhatsApp
    video: 2.0,    // YouTube, Netflix, Twitch
    gaming: 1.0,   // Discord, Spotify, videojocs
    edu: 0.5       // Classroom, Wikipedia, recerca
  };

  const weightsPerCategoryGbPerHour = {
    social: 0.22,  // ~220 MB/hora
    video: 0.85,   // ~850 MB/hora (720p estàndard)
    gaming: 0.18,  // ~180 MB/hora
    edu: 0.06      // ~60 MB/hora
  };

  const presets = {
    zero: { social: 0, video: 0, gaming: 0, edu: 0 },
    minim: { social: 0.5, video: 0, gaming: 0, edu: 0.2 },
    moderat: { social: 1.0, video: 1.0, gaming: 0.5, edu: 0.5 },
    mitja: { social: 2.5, video: 2.0, gaming: 1.0, edu: 0.5 },
    heavy: { social: 4.0, video: 3.5, gaming: 2.5, edu: 1.0 }
  };

  function calculateMonthlyGb() {
    const dailyGb = 
      userHours.social * weightsPerCategoryGbPerHour.social +
      userHours.video * weightsPerCategoryGbPerHour.video +
      userHours.gaming * weightsPerCategoryGbPerHour.gaming +
      userHours.edu * weightsPerCategoryGbPerHour.edu;
    
    return Math.max(0, Math.round(dailyGb * 30 * 10) / 10);
  }

  function formatTime(seconds) {
    if (seconds < 60) {
      return `${Math.round(seconds)} segons`;
    } else if (seconds < 3600) {
      const m = Math.floor(seconds / 60);
      const s = Math.round(seconds % 60);
      return `${m} min ${s} s`;
    } else {
      const h = Math.floor(seconds / 3600);
      const m = Math.round((seconds % 3600) / 60);
      return `${h} h ${m} min`;
    }
  }

  function updateSimulator() {
    const monthlyGb = calculateMonthlyGb();

    // Actualitzar etiquetes de les hores
    const hSocialEl = document.getElementById('valHoursSocial');
    if (hSocialEl) hSocialEl.textContent = `${userHours.social} h/dia`;
    const hVideoEl = document.getElementById('valHoursVideo');
    if (hVideoEl) hVideoEl.textContent = `${userHours.video} h/dia`;
    const hGamingEl = document.getElementById('valHoursGaming');
    if (hGamingEl) hGamingEl.textContent = `${userHours.gaming} h/dia`;
    const hEduEl = document.getElementById('valHoursEdu');
    if (hEduEl) hEduEl.textContent = `${userHours.edu} h/dia`;

    // Indicador general de consum
    const totalGbEl = document.getElementById('calcTotalMonthlyGb');
    if (totalGbEl) totalGbEl.textContent = `${monthlyGb.toFixed(1)} GB / mes`;

    // 1. CÀLCUL CATALUNYA / ESPANYA
    const costCat = TARIFA_PLANA_CAT;
    const effortCatPct = ((costCat / SMI_CAT) * 100).toFixed(1);
    const downloadSecCat = (500 * 8 * 1024) / SPEED_CAT_KBPS; // per 500 MB

    const costCatEl = document.getElementById('calcCostCat');
    if (costCatEl) costCatEl.textContent = `${costCat} € / mes`;
    const effortCatEl = document.getElementById('calcEffortCat');
    if (effortCatEl) effortCatEl.textContent = `${effortCatPct}% del Salari Mínim`;
    const timeCatEl = document.getElementById('calcTimeCat');
    if (timeCatEl) timeCatEl.textContent = formatTime(downloadSecCat);

    // 2. CÀLCUL POCONA (BOLÍVIA RURAL)
    const costPoconaBob = Math.round(monthlyGb * COST_PER_GB_BOB);
    const costPoconaEur = Math.round(costPoconaBob * BOB_TO_EUR);
    const effortPoconaPct = Math.round((costPoconaBob / INCOME_POCONA_BOB) * 100);
    const equivalentCostCat = Math.round(SMI_CAT * (effortPoconaPct / 100));
    const downloadSecPocona = (500 * 8 * 1024) / SPEED_POCONA_KBPS; // per 500 MB

    const costPoconaEl = document.getElementById('calcCostPocona');
    if (costPoconaEl) costPoconaEl.textContent = `${costPoconaBob} BOB (~${costPoconaEur} €)`;
    const effortPoconaEl = document.getElementById('calcEffortPocona');
    if (effortPoconaEl) effortPoconaEl.textContent = `${effortPoconaPct}% dels Ingressos Familiars!`;
    const timePoconaEl = document.getElementById('calcTimePocona');
    if (timePoconaEl) timePoconaEl.textContent = formatTime(downloadSecPocona);

    // 3. FACTOR DE XOC CENTRAL
    const shockMultEl = document.getElementById('calcShockMultiplier');
    const equivBillEl = document.getElementById('calcEquivBillCat');
    const shockStoryEl = document.getElementById('calcShockStory');
    const currentLevel = (typeof getPoconaLevel === "function" ? getPoconaLevel() : localStorage.getItem("pocona_learning_level")) || "segur";

    if (monthlyGb <= 0) {
      if (shockMultEl) shockMultEl.textContent = '0×';
      if (equivBillEl) equivBillEl.textContent = '0 € / mes';
      if (shockStoryEl) {
        if (currentLevel === "insegur") {
          shockStoryEl.innerHTML = `
            ⚪ <strong>Sense consum:</strong> No costa diners, però la família està <strong>incomunicada</strong> sense accés a res!
          `;
        } else {
          shockStoryEl.innerHTML = `
            Amb <strong>0 hores de consum</strong>, no hi ha despesa en recàrregues de dades mòbils. 
            Però a Pocona, si no es compren paquets prepagament, la família està <strong>completament incomunicada</strong> del món digital, sense accés a educació, avisos sanitaris ni tràmits.
          `;
        }
      }
    } else {
      const shockMultiplier = Math.max(1, Math.round(effortPoconaPct / parseFloat(effortCatPct)));
      if (shockMultEl) shockMultEl.textContent = `×${shockMultiplier}`;
      if (equivBillEl) equivBillEl.textContent = `${equivalentCostCat} € / mes`;
      if (shockStoryEl) {
        if (currentLevel === "insegur") {
          shockStoryEl.innerHTML = `
            🌱 <strong>Resum Clar:</strong> Per tenir el teu mateix Internet (<strong>${monthlyGb.toFixed(1)} GB</strong>), una família de Pocona gastaria el <strong>${effortPoconaPct}% del seu sou</strong>! 
            <div style="margin-top:0.4rem; font-weight:700; color:#b91c1c;">Això seria com pagar ${equivalentCostCat} € de factura a casa teva! 😱</div>
          `;
        } else {
          shockStoryEl.innerHTML = `
            Per consumir els teus mateixos <strong>${monthlyGb.toFixed(1)} GB</strong>, una família camperola de Pocona hauria de destinar el <strong>${effortPoconaPct}%</strong> de tots els diners que guanya al mes. 
            Això equivaldria a que a casa teva la factura d'Internet fos de <strong>${equivalentCostCat} € cada mes</strong>!
          `;
        }
      }
    }

    // 4. Actualitzar dades del Joc del Pressupost Familiar i Alerta Dinàmica
    const gameGbEl = document.getElementById('gameGbVal');
    if (gameGbEl) gameGbEl.textContent = `${monthlyGb.toFixed(1)} GB`;
    const gameCostEl = document.getElementById('gameCostVal');
    if (gameCostEl) gameCostEl.textContent = `${costPoconaBob} BOB`;
    const gameDeficitEl = document.getElementById('gameDeficitVal');
    if (gameDeficitEl) {
      const deficit = Math.max(0, costPoconaBob - 100);
      gameDeficitEl.textContent = `${deficit} BOB`;
    }

    const deficitAlertEl = document.getElementById('gameDeficitAlert');
    const alertTitleEl = document.getElementById('gameAlertTitle');
    const alertDescEl = document.getElementById('gameAlertDesc');
    const btnCutEl = document.getElementById('btnToggleCutOptions');
    const cutPanelEl = document.getElementById('cutOptionsPanel');

    if (deficitAlertEl && alertTitleEl && alertDescEl) {
      if (monthlyGb <= 0) {
        // Estat 0: Sense consum (0 BOB)
        deficitAlertEl.style.background = '#f8fafc';
        deficitAlertEl.style.borderColor = '#cbd5e1';
        alertTitleEl.style.color = '#334155';
        alertTitleEl.innerHTML = `⚪ Sense consum de dades (<strong>0.0 GB = 0 BOB</strong> al mes)`;
        alertDescEl.style.color = '#64748b';
        alertDescEl.innerHTML = `La família conserva els 100 BOB d'estalvi lliures, però roman totalment aïllada i incomunicada del món digital.`;
        if (btnCutEl) btnCutEl.style.display = 'none';
        if (cutPanelEl) cutPanelEl.style.display = 'none';
      } else if (costPoconaBob <= 100) {
        // Estat 1: Consum assumible dins dels 100 BOB d'estalvi
        const margeLliure = 100 - costPoconaBob;
        deficitAlertEl.style.background = '#f0fdf4';
        deficitAlertEl.style.borderColor = '#86efac';
        alertTitleEl.style.color = '#166534';
        alertTitleEl.innerHTML = `🟢 Consum assumible (<strong>${monthlyGb.toFixed(1)} GB</strong> costa <strong>${costPoconaBob} BOB</strong> al mes)`;
        alertDescEl.style.color = '#15803d';
        alertDescEl.innerHTML = `La despesa queda coberta pels 100 BOB d'estalvi familiar (encara queden <strong>${margeLliure} BOB lliures</strong>). No hi ha dèficit econòmic!`;
        if (btnCutEl) btnCutEl.style.display = 'none';
        if (cutPanelEl) cutPanelEl.style.display = 'none';
      } else {
        // Estat 2: Supera els 100 BOB lliures (DÈFICIT / ALERTA)
        const deficitVal = costPoconaBob - 100;
        deficitAlertEl.style.background = '#fef2f2';
        deficitAlertEl.style.borderColor = '#f87171';
        alertTitleEl.style.color = '#991b1b';
        alertTitleEl.innerHTML = `🚨 El teu consum (<strong>${monthlyGb.toFixed(1)} GB</strong>) costa <strong>${costPoconaBob} BOB</strong> al mes!`;
        alertDescEl.style.color = '#7f1d1d';
        alertDescEl.innerHTML = `Només queden 100 BOB lliures a la família. Tenim un <strong>dèficit de ${deficitVal} BOB</strong>!`;
        if (btnCutEl) btnCutEl.style.display = 'inline-block';
      }
    }
  }

  // Funció per canviar amb sliders
  window.onHoursSliderChange = function(category, value) {
    userHours[category] = parseFloat(value);
    document.querySelectorAll('.preset-card-btn, .preset-btn, .preset-reset-btn').forEach(btn => btn.classList.remove('active'));
    updateSimulator();
  };

  // Funció per carregar presets
  window.applyConsumptionPreset = function(presetKey, btnEl) {
    if (!presets[presetKey]) return;
    userHours = { ...presets[presetKey] };

    // Sincronitzar sliders
    const slSocial = document.getElementById('sliderHoursSocial');
    if (slSocial) slSocial.value = userHours.social;
    const slVideo = document.getElementById('sliderHoursVideo');
    if (slVideo) slVideo.value = userHours.video;
    const slGaming = document.getElementById('sliderHoursGaming');
    if (slGaming) slGaming.value = userHours.gaming;
    const slEdu = document.getElementById('sliderHoursEdu');
    if (slEdu) slEdu.value = userHours.edu;

    document.querySelectorAll('.preset-card-btn, .preset-btn, .preset-reset-btn').forEach(btn => btn.classList.remove('active'));
    if (btnEl) btnEl.classList.add('active');

    updateSimulator();
  };

  // --------------------------------------------------------------------------
  // LÒGICA DEL JOC DE LA SUPERVIVÈNCIA DIGITAL A POCONA
  // --------------------------------------------------------------------------
  window.toggleCutOptions = function() {
    const p = document.getElementById('cutOptionsPanel');
    if (!p) return;
    p.style.display = (p.style.display === 'none' || p.style.display === '') ? 'block' : 'none';
  };

  window.tryCutExpense = function(type) {
    const fb = document.getElementById('cutFeedbackMsg');
    if (!fb) return;

    if (type === 'food') {
      fb.style.color = '#dc2626';
      fb.innerHTML = '🚫 <strong>Inacceptable!</strong> Si retalles menjar (300 BOB), els nens patiran desnutrició severa per poder pagar dades mòbils.';
    } else if (type === 'school') {
      fb.style.color = '#dc2626';
      fb.innerHTML = '🚫 <strong>Dramàtic!</strong> Si treus els diners d\'escola (150 BOB), els fills hauran d\'abandonar els estudis per anar a treballar la terra.';
    } else if (type === 'health') {
      fb.style.color = '#dc2626';
      fb.innerHTML = '🚫 <strong>Perill vital!</strong> Si retalles salut (100 BOB), qualsevol febre o infecció pot ser mortal estant a 4 hores de l\'hospital més proper.';
    }
  };

  // Mini-joc dels 75 Megabytes (Límit UNESCO del 2%)
  let dailyMb = 75;

  window.spendData = function(mb, actionName) {
    const txt = document.getElementById('dailyMbText');
    const bar = document.getElementById('dailyMbBar');
    const st = document.getElementById('dailyMbStatus');
    const log = document.getElementById('dataLogText');
    if (!txt || !bar || !st || !log) return;

    if (dailyMb <= 0) {
      st.innerHTML = '🚫 <strong>DADES ESGOTADES!</strong> La família està completament desconnectada fins demà.';
      st.style.color = '#dc2626';
      log.innerHTML = `❌ No es pot realitzar: no queden megabytes!`;
      return;
    }

    dailyMb = Math.max(0, dailyMb - mb);
    const pct = Math.round((dailyMb / 75) * 100);

    txt.textContent = `${dailyMb} / 75 MB`;
    bar.style.width = `${pct}%`;

    if (dailyMb <= 15) {
      bar.style.background = '#dc2626';
    } else if (dailyMb <= 35) {
      bar.style.background = '#f59e0b';
    } else {
      bar.style.background = '#16a34a';
    }

    log.innerHTML = `Darrera acció: <strong>${actionName}</strong> (-${mb} MB). Resten <strong>${dailyMb} MB</strong>.`;

    if (dailyMb === 0) {
      st.innerHTML = '🚫 <strong>S\'han acabat els 75 MB diaris!</strong> Connexió tallada per a tota la casa fins demà. Ningú més pot consultar res!';
      st.style.color = '#dc2626';
    } else if (dailyMb <= 20) {
      st.innerHTML = `⚠️ <strong>Nivell crític!</strong> Només queden ${dailyMb} MB. Si algú ha de trucar al metge, la xarxa s'apagarà!`;
      st.style.color = '#d97706';
    } else {
      st.innerHTML = `🟢 Connexió activa: ${dailyMb} MB restants per avui.`;
      st.style.color = '#15803d';
    }
  };

  window.resetDayData = function() {
    dailyMb = 75;
    const txt = document.getElementById('dailyMbText');
    const bar = document.getElementById('dailyMbBar');
    const st = document.getElementById('dailyMbStatus');
    const log = document.getElementById('dataLogText');

    if (txt) txt.textContent = '75 / 75 MB';
    if (bar) {
      bar.style.width = '100%';
      bar.style.background = '#16a34a';
    }
    if (st) {
      st.innerHTML = '🟢 Connexió activa: La família té 75 MB disponibles per avui.';
      st.style.color = '#15803d';
    }
    if (log) {
      log.innerHTML = 'Comença un nou dia amb 75 MB de dades disponibles.';
    }
  };

  window.initInequalityCalculator = function() {
    updateSimulator();
  };

  window.addEventListener('DOMContentLoaded', () => {
    updateSimulator();
  });

  window.addEventListener('poconaLevelChanged', () => {
    updateSimulator();
  });
})();
