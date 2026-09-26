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
    
    return Math.max(1, Math.round(dailyGb * 30 * 10) / 10);
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
    const shockMultiplier = Math.max(1, Math.round(effortPoconaPct / parseFloat(effortCatPct)));
    const shockMultEl = document.getElementById('calcShockMultiplier');
    if (shockMultEl) shockMultEl.textContent = `×${shockMultiplier}`;

    const equivBillEl = document.getElementById('calcEquivBillCat');
    if (equivBillEl) equivBillEl.textContent = `${equivalentCostCat} € / mes`;

    const shockStoryEl = document.getElementById('calcShockStory');
    if (shockStoryEl) {
      shockStoryEl.innerHTML = `
        Per consumir els teus mateixos <strong>${monthlyGb.toFixed(1)} GB</strong>, una família camperola de Pocona hauria de destinar el <strong>${effortPoconaPct}%</strong> de tots els diners que guanya al mes. 
        Això equivaldria a que a casa teva la factura d'Internet fos de <strong>${equivalentCostCat} € cada mes</strong>!
      `;
    }
  }

  // Funció per canviar amb sliders
  window.onHoursSliderChange = function(category, value) {
    userHours[category] = parseFloat(value);
    document.querySelectorAll('.preset-btn').forEach(btn => btn.classList.remove('active'));
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

    document.querySelectorAll('.preset-btn').forEach(btn => btn.classList.remove('active'));
    if (btnEl) btnEl.classList.add('active');

    updateSimulator();
  };

  // --------------------------------------------------------------------------
  // REPTES DIDÀCTICS DE LA BRETXA DIGITAL
  // --------------------------------------------------------------------------
  const gapSolved = new Set();

  function updateGapScoreUI() {
    const solvedSpan = document.getElementById('gapSolvedCount');
    if (solvedSpan) solvedSpan.textContent = gapSolved.size;
    const badge = document.getElementById('gapScoreBadge');
    if (badge) {
      if (gapSolved.size === 3) {
        badge.className = 'badge badge-success';
        badge.style.background = '#16a34a';
        badge.style.color = '#ffffff';
        badge.textContent = '🎉 Missió de la Bretxa Completada! (3/3)';
      } else {
        badge.className = 'badge badge-cyan';
        badge.innerHTML = `Progrés: <span id="gapSolvedCount">${gapSolved.size}</span>/3 completats`;
      }
    }
  }

  window.checkGapChallenge = function(challengeNum) {
    if (challengeNum === 1) {
      const inp = document.getElementById('gapCh1Input');
      const fb = document.getElementById('gapCh1Feedback');
      const stBadge = document.getElementById('gapCh1Status');
      const card = document.getElementById('gapCh1Card');
      if (!inp || !fb) return;

      fb.style.display = 'block';
      const val = parseFloat(inp.value.replace(',', '.'));

      // 1.350 BOB * 0.02 = 27 BOB (admetem 26 a 28)
      if (Math.abs(val - 27) <= 1) {
        gapSolved.add(1);
        updateGapScoreUI();
        if (stBadge) {
          stBadge.textContent = 'Superat ✓';
          stBadge.className = 'status-badge status-ok';
          stBadge.style.background = '#dcfce7';
          stBadge.style.color = '#15803d';
        }
        if (card) card.style.borderColor = '#22c55e';
        fb.style.color = '#15803d';
        fb.innerHTML = `✅ <strong>Molt ben calculat!</strong> 1.350 BOB × 0,02 = <strong>27 BOB</strong> (uns 3,60 €). Això és tot el que podria destinar una família al mes a telecomunicacions sense caure en pobresa digital severa.`;
      } else {
        fb.style.color = '#b91c1c';
        fb.innerHTML = `⚠️ No és correcte. Revisa com calcular el percentatge (el 2% sobre els 1.350 BOB d'ingressos familiars). Torna-ho a provar!`;
      }
    } else if (challengeNum === 2) {
      const inp = document.getElementById('gapCh2Input');
      const fb = document.getElementById('gapCh2Feedback');
      const stBadge = document.getElementById('gapCh2Status');
      const card = document.getElementById('gapCh2Card');
      if (!inp || !fb) return;

      fb.style.display = 'block';
      const val = parseFloat(inp.value.replace(',', '.'));

      // 27 BOB / 12 BOB/GB = 2.25 GB (admetem 2.2 a 2.3)
      if (Math.abs(val - 2.25) <= 0.15 || val === 2.2 || val === 2.3) {
        gapSolved.add(2);
        updateGapScoreUI();
        if (stBadge) {
          stBadge.textContent = 'Superat ✓';
          stBadge.className = 'status-badge status-ok';
          stBadge.style.background = '#dcfce7';
          stBadge.style.color = '#15803d';
        }
        if (card) card.style.borderColor = '#22c55e';
        fb.style.color = '#15803d';
        fb.innerHTML = `✅ <strong>Dada esfereïdora i exacta!</strong> 27 BOB ÷ 12 BOB/GB = <strong>2,25 GB</strong>. Això significa que una família sencera només disposaria d'uns 75 MB al dia (gairebé s'esgota obrint dues o tres pàgines web!), mentre que un jove a Catalunya en gasta 50 o 100 vegades més.`;
      } else {
        fb.style.color = '#b91c1c';
        fb.innerHTML = `⚠️ Revisa el càlcul: pensa quantes vegades cap el preu d'1 GB (12 BOB) dins del pressupost disponible (27 BOB). Torna-ho a provar!`;
      }
    } else if (challengeNum === 3) {
      const sel = document.getElementById('gapCh3Select');
      const fb = document.getElementById('gapCh3Feedback');
      const stBadge = document.getElementById('gapCh3Status');
      const card = document.getElementById('gapCh3Card');
      if (!sel || !fb) return;

      fb.style.display = 'block';
      if (sel.value === 'wimax') {
        gapSolved.add(3);
        updateGapScoreUI();
        if (stBadge) {
          stBadge.textContent = 'Superat ✓';
          stBadge.className = 'status-badge status-ok';
          stBadge.style.background = '#dcfce7';
          stBadge.style.color = '#15803d';
        }
        if (card) card.style.borderColor = '#22c55e';
        fb.style.color = '#15803d';
        fb.innerHTML = `✅ <strong>Visió d'enginyeria impecable!</strong> Com que el mercat d'operadors privats no és assequible per a famílies camperoles, la solució transformadora és desplegar una <strong>xarxa pròpia de radioenllaços WiMAX lliure</strong> finançada com a bé comú comunitari, oferint connexió gratuïta a l'escola i a l'ambulatori.`;
      } else {
        fb.style.color = '#b91c1c';
        fb.innerHTML = `⚠️ Pensa en el model de cooperació pel desenvolupament: si les famílies no tenen diners per pagar tarifes privades de prepagament, de quina manera una infraestructura comunitària pròpia pot garantir el servei públic?`;
      }
    }
  };

  window.initInequalityCalculator = function() {
    updateSimulator();
  };

  window.addEventListener('DOMContentLoaded', () => {
    updateSimulator();
  });
})();
