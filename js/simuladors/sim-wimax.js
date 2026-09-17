/* ==========================================================
   3.5 SIMULADOR AVANÇAT DE COBERTURA WiMAX I BALANÇ DE POTÈNCIA
   ========================================================== */

(function() {
  const wimaxCanvas = document.getElementById('wimaxCanvas');
  if (!wimaxCanvas) return;
  const ctx = wimaxCanvas.getContext('2d');

  const receiverStations = [
    { id: 'Ambulatori', name: '🏥 Ambulatori Pocona', x: 800, y: 140, distKm: 6.8 },
    { id: 'Escola', name: '🏫 Escola Chimboata', x: 670, y: 340, distKm: 4.2 },
    { id: 'Chillijchi', name: '🏡 Comunitat Chillijchi', x: 230, y: 270, distKm: 5.1 }
  ];

  function updateWimaxSim() {
    const w = wimaxCanvas.width;
    const h = wimaxCanvas.height;

    const type = document.getElementById('wimaxAntennaType')?.value || 'dir';
    const orientationDeg = parseInt(document.getElementById('wimaxAngleSlider')?.value || 45);
    const beamwidthDeg = parseInt(document.getElementById('wimaxBeamSlider')?.value || 25);
    const powerDbm = parseInt(document.getElementById('wimaxPowerSlider')?.value || 27);

    // Labels
    const angleLbl = document.getElementById('wimaxAngleLabel');
    if (angleLbl) angleLbl.textContent = `${orientationDeg}°`;
    const beamLbl = document.getElementById('wimaxBeamLabel');
    if (beamLbl) beamLbl.textContent = `${beamwidthDeg}°`;

    const mW = Math.round(Math.pow(10, powerDbm / 10));
    const pwrLbl = document.getElementById('wimaxPowerLabel');
    if (pwrLbl) pwrLbl.textContent = `${powerDbm} dBm (${mW} mW)`;

    // Radi físic depenent directament de la potència d'emissió!
    // A 15 dBm radi mínim, a 33 dBm (2W) radi màxim
    // Per cada 6 dB es duplica l'abast teòric en espai lliure!
    const antennaGain = (type === 'dir') ? 24 : 8; // dBi
    const eirpDbm = powerDbm + antennaGain;
    const eirpW = (Math.pow(10, eirpDbm / 10) / 1000).toFixed(1);

    const eirpElem = document.getElementById('wimaxEirpVal');
    if (eirpElem) eirpElem.textContent = `${eirpDbm} dBm (${eirpW} W)`;

    // Radi visual en píxels lligat a la potència
    // Factor escala visual:
    const baseRadiusPx = (type === 'dir') ? 200 : 142;
    const powerScale = Math.pow(10, (powerDbm - 15) / 25); // factor dinàmic entre 1.0 i ~5.2
    const currentRadiusPx = Math.min(w * 0.48, baseRadiusPx * Math.sqrt(powerScale));

    const radiusKm = ((currentRadiusPx / 40) * 0.8).toFixed(1);
    const radElem = document.getElementById('wimaxRadiusVal');
    if (radElem) radElem.textContent = `${radiusKm} km`;

    // Netejar canvas fons espacial
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#080d1a';
    ctx.fillRect(0, 0, w, h);

    // Posició Torre Central Repetidora (al cim)
    const tx = { x: 490, y: 215 };

    // Dibuixar anells de distància (Graella concèntrica radar)
    ctx.strokeStyle = 'rgba(51, 65, 85, 0.45)';
    ctx.lineWidth = 1;
    for (let r = 70; r <= 420; r += 70) {
      ctx.beginPath();
      ctx.arc(tx.x, tx.y, r, 0, Math.PI * 2);
      ctx.stroke();
      const kmMark = ((r / 40) * 0.8).toFixed(1);
      ctx.fillStyle = 'rgba(148, 163, 184, 0.6)';
      ctx.font = '9px JetBrains Mono';
      ctx.fillText(`${kmMark} km`, tx.x + r + 4, tx.y - 4);
    }

    // Dibuixar Lòbul de Cobertura amb el radi calculat
    if (type === 'dir') {
      // Feix Direccional (Parabòlica)
      const startAng = ((orientationDeg - beamwidthDeg / 2) * Math.PI) / 180;
      const endAng = ((orientationDeg + beamwidthDeg / 2) * Math.PI) / 180;

      // Gradient del feix
      const beamGrad = ctx.createRadialGradient(tx.x, tx.y, 5, tx.x, tx.y, currentRadiusPx);
      beamGrad.addColorStop(0, 'rgba(168, 85, 247, 0.85)');
      beamGrad.addColorStop(0.5, 'rgba(124, 58, 237, 0.4)');
      beamGrad.addColorStop(1, 'rgba(124, 58, 237, 0)');

      ctx.fillStyle = beamGrad;
      ctx.beginPath();
      ctx.moveTo(tx.x, tx.y);
      ctx.arc(tx.x, tx.y, currentRadiusPx, startAng, endAng);
      ctx.closePath();
      ctx.fill();

      // Vora lluminosa del front d'ona
      ctx.strokeStyle = '#c084fc';
      ctx.lineWidth = 2.5;
      ctx.shadowColor = '#a855f7';
      ctx.shadowBlur = 12;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Lòbuls secundaris residuals (side lobes)
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.2)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(tx.x, tx.y, currentRadiusPx * 0.22, 0, Math.PI * 2);
      ctx.stroke();
    } else {
      // Feix Omnidireccional Circular 360°
      const omniGrad = ctx.createRadialGradient(tx.x, tx.y, 5, tx.x, tx.y, currentRadiusPx);
      omniGrad.addColorStop(0, 'rgba(16, 185, 129, 0.8)');
      omniGrad.addColorStop(0.6, 'rgba(5, 150, 105, 0.3)');
      omniGrad.addColorStop(1, 'rgba(5, 150, 105, 0)');

      ctx.fillStyle = omniGrad;
      ctx.beginPath();
      ctx.arc(tx.x, tx.y, currentRadiusPx, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#34d399';
      ctx.lineWidth = 2.5;
      ctx.shadowColor = '#10b981';
      ctx.shadowBlur = 10;
      ctx.stroke();
      ctx.shadowBlur = 0;
    }

    // Torre Emissora Central
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(tx.x, tx.y, 9, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 12px Outfit';
    ctx.fillText('🗼 Torre Repetidora Central (Cim 3.350m)', tx.x - 85, tx.y - 18);

    // Avaluar senyal rebut a cada estació
    let connectedCount = 0;

    receiverStations.forEach(st => {
      const dx = st.x - tx.x;
      const dy = st.y - tx.y;
      const distPx = Math.hypot(dx, dy);
      let angDeg = (Math.atan2(dy, dx) * 180) / Math.PI;
      if (angDeg < 0) angDeg += 360;

      const km = (distPx / 40) * 0.8;
      // Pèrdues en espai lliure a 5.8 GHz
      const freeSpaceLoss = 32.4 + 20 * Math.log10(5800) + 20 * Math.log10(km);

      let effGain = 0;
      if (type === 'dir') {
        let diff = Math.abs(angDeg - orientationDeg);
        if (diff > 180) diff = 360 - diff;
        if (diff <= beamwidthDeg / 2) {
          effGain = antennaGain - (diff / (beamwidthDeg / 2)) * 6;
        } else {
          effGain = -12; // fora del feix principal
        }
      } else {
        effGain = antennaGain;
      }

      // Potència rebuda RSL (Received Signal Level)
      const rxPower = Math.round(powerDbm + effGain - freeSpaceLoss);
      const isInsideRadius = distPx <= currentRadiusPx;
      const isConnected = (rxPower >= -85 && isInsideRadius);

      if (isConnected) connectedCount++;

      // Dibuixar línia guia d'enllaç
      if (isConnected) {
        ctx.strokeStyle = (rxPower >= -72) ? 'rgba(34, 197, 94, 0.6)' : 'rgba(234, 179, 8, 0.6)';
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(tx.x, tx.y);
        ctx.lineTo(st.x, st.y);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Dibuixar Estació Receptora
      ctx.fillStyle = '#1e293b';
      ctx.beginPath();
      ctx.arc(st.x, st.y, 11, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = isConnected ? ((rxPower >= -72) ? '#22c55e' : '#eab308') : '#ef4444';
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 11px Outfit';
      ctx.fillText(st.name, st.x - 30, st.y + 24);

      // Actualitzar targetes HTML
      const badge = document.getElementById(`stat${st.id}Badge`);
      const txt = document.getElementById(`stat${st.id}Text`);
      const distEl = document.getElementById(`stat${st.id}Dist`);

      if (distEl) distEl.textContent = `Distància: ${km.toFixed(1)} km`;

      if (badge && txt) {
        badge.textContent = `${rxPower} dBm`;
        if (rxPower >= -72 && isInsideRadius) {
          badge.className = 'status-badge status-ok';
          txt.textContent = 'Qualitat: Excel·lent (Telemedicina activa)';
        } else if (rxPower >= -85 && isInsideRadius) {
          badge.className = 'status-badge status-warn';
          txt.textContent = 'Qualitat: Mitjana (Veu i navegació estable)';
        } else {
          badge.className = 'status-badge status-danger';
          txt.textContent = isInsideRadius ? 'Senyal molt feble (< llindar)' : 'Fora de cobertura (Aïllat)';
        }
      }

      if (st.id === 'Ambulatori') {
        currentAmbulatoriPwr = rxPower;
        currentAmbulatoriConnected = isConnected;
        currentAmbulatoriInside = isInsideRadius;
      }
    });

    const connBadge = document.getElementById('wimaxConnectedCountBadge');
    if (connBadge) {
      connBadge.textContent = `${connectedCount} / ${receiverStations.length} Estacions`;
      connBadge.className = (connectedCount === 3) ? 'status-badge status-ok' : (connectedCount > 0 ? 'status-badge status-warn' : 'status-badge status-danger');
    }

    currentConnectedCount = connectedCount;
    currentAntennaType = type;

    // Comprovació automàtica del Repte 1
    if (type === 'dir' && currentAmbulatoriConnected && currentAmbulatoriPwr >= -72 && currentAmbulatoriInside) {
      markWimaxChallenge1Solved(currentAmbulatoriPwr);
    }
  }

  // Estat dels reptes
  let currentAmbulatoriPwr = -100;
  let currentAmbulatoriConnected = false;
  let currentAmbulatoriInside = false;
  let currentConnectedCount = 0;
  let currentAntennaType = 'dir';
  const wimaxSolved = new Set();

  function updateWimaxScoreUI() {
    const solvedSpan = document.getElementById('wimaxSolvedCount');
    if (solvedSpan) solvedSpan.textContent = wimaxSolved.size;
    const badge = document.getElementById('wimaxScoreBadge');
    if (badge) {
      if (wimaxSolved.size === 3) {
        badge.className = 'badge badge-success';
        badge.style.background = '#16a34a';
        badge.style.color = '#ffffff';
        badge.textContent = '🎉 Missió WiMAX Completada! (3/3)';
      } else {
        badge.className = 'badge badge-cyan';
        badge.innerHTML = `Progrés: <span id="wimaxSolvedCount">${wimaxSolved.size}</span>/3 completats`;
      }
    }
  }

  function markWimaxChallenge1Solved(pwr) {
    wimaxSolved.add(1);
    updateWimaxScoreUI();
    const stBadge = document.getElementById('wimaxCh1Status');
    const feedback = document.getElementById('wimaxCh1Feedback');
    const card = document.getElementById('wimaxCh1Card');
    if (stBadge) {
      stBadge.textContent = 'Superat ✓';
      stBadge.className = 'status-badge status-ok';
      stBadge.style.background = '#dcfce7';
      stBadge.style.color = '#15803d';
    }
    if (card) card.style.borderColor = '#22c55e';
    if (feedback) {
      feedback.style.display = 'block';
      feedback.style.color = '#15803d';
      feedback.innerHTML = `✅ <strong>Molt bé!</strong> L'enllaç direccional PTP amb l'Ambulatori s'ha establert amb una potència rebuda excel·lent de <strong>${pwr} dBm</strong> (&ge; -72 dBm). El feix parabòlic concentra tota l'energia cap al centre de salut!`;
    }
  }

  window.checkWimaxChallenge = function(challengeNum) {
    if (challengeNum === 1) {
      const fb = document.getElementById('wimaxCh1Feedback');
      if (!fb) return;
      fb.style.display = 'block';
      if (currentAntennaType !== 'dir') {
        fb.style.color = '#b91c1c';
        fb.innerHTML = '⚠️ Has de seleccionar el mode <strong>Antena Direccional (Feix Paraboloid)</strong> al desplegable superior.';
        return;
      }
      if (currentAmbulatoriPwr >= -72 && currentAmbulatoriInside) {
        markWimaxChallenge1Solved(currentAmbulatoriPwr);
      } else {
        fb.style.color = '#b91c1c';
        fb.innerHTML = `⚠️ El senyal actual a l'Ambulatori és de <strong>${currentAmbulatoriPwr} dBm</strong>. Assegura't d'orientar l'azimut cap a <strong>~45°</strong> i augmentar la potència fins a superar el llindar d'excel·lència (-72 dBm).`;
      }
    } else if (challengeNum === 2) {
      const inp = document.getElementById('wimaxCh2Input');
      const fb = document.getElementById('wimaxCh2Feedback');
      const stBadge = document.getElementById('wimaxCh2Status');
      const card = document.getElementById('wimaxCh2Card');
      if (!inp || !fb) return;

      fb.style.display = 'block';
      const val = parseInt(inp.value, 10);

      if (val === 33 || val === 32) {
        wimaxSolved.add(2);
        updateWimaxScoreUI();
        if (stBadge) {
          stBadge.textContent = 'Superat ✓';
          stBadge.className = 'status-badge status-ok';
          stBadge.style.background = '#dcfce7';
          stBadge.style.color = '#15803d';
        }
        if (card) card.style.borderColor = '#22c55e';
        fb.style.color = '#15803d';
        fb.innerHTML = `✅ <strong>Exacte!</strong> A <strong>${val} dBm (2.000 mW = 2 W)</strong> l'antena omnidireccional assoleix un radi de més de 6,8 km, cobrint les 3 estacions simultàniament amb senyal superior al llindar de sensibilitat (-85 dBm).`;
      } else {
        fb.style.color = '#b91c1c';
        fb.innerHTML = `⚠️ Amb <strong>${isNaN(val) ? 'aquesta' : val} dBm</strong> no s'obté la cobertura total de les 3 estacions. Selecciona l'antena omnidireccional al simulador i puja el lliscador de potència fins que el comptador marqui <strong>3 / 3 Estacions</strong>!`;
      }
    } else if (challengeNum === 3) {
      const sel = document.getElementById('wimaxCh3Select');
      const fb = document.getElementById('wimaxCh3Feedback');
      const stBadge = document.getElementById('wimaxCh3Status');
      const card = document.getElementById('wimaxCh3Card');
      if (!sel || !fb) return;

      fb.style.display = 'block';
      if (sel.value === 'gain') {
        wimaxSolved.add(3);
        updateWimaxScoreUI();
        if (stBadge) {
          stBadge.textContent = 'Superat ✓';
          stBadge.className = 'status-badge status-ok';
          stBadge.style.background = '#dcfce7';
          stBadge.style.color = '#15803d';
        }
        if (card) card.style.borderColor = '#22c55e';
        fb.style.color = '#15803d';
        fb.innerHTML = '✅ <strong>Raonament impecable!</strong> El guany d\'una antena direccional (ex: 24 dBi) s\'aconsegueix concentrant geomètricament les ones de ràdio cap al destí, sense augmentar el consum de la bateria solar i sense radiar soroll electromagnètic innecessari cap a altres indrets.';
      } else {
        fb.style.color = '#b91c1c';
        fb.innerHTML = '⚠️ Opció incorrecta. Pensa en termes de balanç energètic a una muntanya aïllada: com podem obtenir més potència radiada (PIRE) sense cremar energia elèctrica de la bateria?';
      }
    }
  };

  window.updateWimaxSim = updateWimaxSim;
  window.addEventListener('DOMContentLoaded', updateWimaxSim);
  updateWimaxSim();
})();
