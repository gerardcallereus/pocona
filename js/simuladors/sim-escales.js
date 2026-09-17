/* ==========================================================
   SIMULADOR DIDÀCTIC 2: ESCALES CARTOGRÀFIQUES
   ========================================================== */

(function() {
  const canvas = document.getElementById('scalesCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let ptA = { x: 220, y: 250, label: 'Punt A (Poble Pocona)', color: '#38bdf8' };
  let ptB = { x: 780, y: 160, label: 'Punt B (Escola Chimboata)', color: '#f59e0b' };
  let dragging = null;

  const presets = {
    custom: null,
    pocona_chimboata: { a: { x: 240, y: 270 }, b: { x: 680, y: 210 } },
    pocona_chillijchi: { a: { x: 240, y: 270 }, b: { x: 380, y: 90 } },
    torre_ambulatori: { a: { x: 560, y: 110 }, b: { x: 880, y: 310 } }
  };

  function getCanvasPos(evt) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const cx = evt.clientX || (evt.touches && evt.touches[0].clientX);
    const cy = evt.clientY || (evt.touches && evt.touches[0].clientY);
    return {
      x: (cx - rect.left) * scaleX,
      y: (cy - rect.top) * scaleY
    };
  }

  function setRoutePreset() {
    const sel = document.getElementById('routePresetSelect')?.value;
    if (sel && presets[sel]) {
      ptA.x = presets[sel].a.x;
      ptA.y = presets[sel].a.y;
      ptB.x = presets[sel].b.x;
      ptB.y = presets[sel].b.y;
      updateScalesSim();
    }
  }

  function updateScalesSim() {
    const scale = parseInt(document.getElementById('scaleSelect')?.value || 10000);
    const lbl = document.getElementById('scaleSelectorLabel');
    if (lbl) lbl.textContent = `1:${scale.toLocaleString('ca-ES')}`;

    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#0b1329';
    ctx.fillRect(0, 0, w, h);

    // Dibuixar graella cartogràfica
    ctx.strokeStyle = 'rgba(51, 65, 85, 0.4)';
    ctx.lineWidth = 1;
    const gridSize = 40;
    for (let x = 0; x < w; x += gridSize) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
    }
    for (let y = 0; y < h; y += gridSize) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
    }

    // Dibuixar fons de mapa estilitzat de Pocona
    ctx.strokeStyle = 'rgba(16, 185, 129, 0.25)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(300, 180, 140, 0, Math.PI * 2);
    ctx.arc(700, 240, 190, 0, Math.PI * 2);
    ctx.stroke();

    // Línia de mesura entre A i B
    ctx.strokeStyle = '#ec4899';
    ctx.lineWidth = 3;
    ctx.setLineDash([6, 5]);
    ctx.beginPath();
    ctx.moveTo(ptA.x, ptA.y);
    ctx.lineTo(ptB.x, ptB.y);
    ctx.stroke();
    ctx.setLineDash([]);

    // Dibuixar regle graduat sobre la línia
    const dx = ptB.x - ptA.x;
    const dy = ptB.y - ptA.y;
    const pixelDist = Math.hypot(dx, dy);
    const angle = Math.atan2(dy, dx);

    // Assumim que 40 píxels a pantalla representen 1 cm físic de paper a escala
    const mapCm = pixelDist / 40;
    const realMeters = Math.round((mapCm * scale) / 100);
    const realKm = realMeters / 1000;

    // Marques de centímetres
    ctx.save();
    ctx.translate(ptA.x, ptA.y);
    ctx.rotate(angle);
    for (let d = 0; d <= pixelDist; d += 40) {
      const cmNum = Math.round(d / 40);
      ctx.strokeStyle = '#f472b6';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(d, -8);
      ctx.lineTo(d, 8);
      ctx.stroke();
      if (cmNum > 0 && d + 20 < pixelDist) {
        ctx.fillStyle = '#ffffff';
        ctx.font = '10px JetBrains Mono';
        ctx.fillText(`${cmNum}cm`, d - 8, -12);
      }
    }
    ctx.restore();

    // Dibuixar punts A i B
    function drawPoint(p, letter) {
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 11, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 12px Outfit';
      ctx.fillText(`${letter}: ${p.label}`, p.x - 20, p.y + 26);
    }
    drawPoint(ptA, 'A');
    drawPoint(ptB, 'B');

    // Escala gràfica de referència al cantó inferior dret
    const barPx = 40 * 5; // 5 cm de regle
    const barMeters = Math.round((5 * scale) / 100);
    const barX = w - barPx - 40;
    const barY = h - 35;

    ctx.fillStyle = '#1e293b';
    ctx.fillRect(barX - 10, barY - 22, barPx + 20, 36);
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 2;
    ctx.strokeRect(barX, barY, barPx, 8);

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(barX, barY, barPx / 2, 8);
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(barX + barPx / 2, barY, barPx / 2, 8);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 10px JetBrains Mono';
    ctx.fillText('0', barX - 4, barY - 6);
    ctx.fillText(`${barMeters / 2}m`, barX + barPx / 2 - 14, barY - 6);
    ctx.fillText(`${barMeters}m (Escala Gràfica)`, barX + barPx - 50, barY - 6);

    // Actualitzar panell de mètriques
    const cmElem = document.getElementById('mapMeasureCmVal');
    if (cmElem) cmElem.textContent = `${mapCm.toFixed(1).replace('.', ',')} cm`;

    const factorElem = document.getElementById('mapScaleFactorVal');
    if (factorElem) factorElem.textContent = `${(scale / 100).toLocaleString('ca-ES')} m reals`;

    const realMElem = document.getElementById('realMetersVal');
    if (realMElem) realMElem.textContent = `${realMeters.toLocaleString('ca-ES')} m`;

    const realKmElem = document.getElementById('realKmVal');
    if (realKmElem) realKmElem.textContent = `${realKm.toFixed(2).replace('.', ',')} km`;

    const calcElem = document.getElementById('scaleCalculationDetail');
    if (calcElem) {
      const realCm = Math.round(mapCm * scale);
      calcElem.textContent = `Distància Real = ${mapCm.toFixed(1)} cm × ${scale.toLocaleString('ca-ES')} = ${realCm.toLocaleString('ca-ES')} cm = ${realMeters.toLocaleString('ca-ES')} metres = ${realKm.toFixed(2)} km`;
    }
  }

  canvas.addEventListener('mousedown', (e) => {
    const pos = getCanvasPos(e);
    if (Math.hypot(pos.x - ptA.x, pos.y - ptA.y) < 25) dragging = 'A';
    else if (Math.hypot(pos.x - ptB.x, pos.y - ptB.y) < 25) dragging = 'B';
  });

  window.addEventListener('mousemove', (e) => {
    if (!dragging) return;
    const pos = getCanvasPos(e);
    pos.x = Math.max(30, Math.min(canvas.width - 30, pos.x));
    pos.y = Math.max(30, Math.min(canvas.height - 30, pos.y));
    if (dragging === 'A') { ptA.x = pos.x; ptA.y = pos.y; }
    else { ptB.x = pos.x; ptB.y = pos.y; }
    const sel = document.getElementById('routePresetSelect');
    if (sel) sel.value = 'custom';
    updateScalesSim();
  });

  window.addEventListener('mouseup', () => { dragging = null; });

  canvas.addEventListener('touchstart', (e) => {
    const pos = getCanvasPos(e);
    if (Math.hypot(pos.x - ptA.x, pos.y - ptA.y) < 30) dragging = 'A';
    else if (Math.hypot(pos.x - ptB.x, pos.y - ptB.y) < 30) dragging = 'B';
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (!dragging) return;
    const pos = getCanvasPos(e);
    pos.x = Math.max(30, Math.min(canvas.width - 30, pos.x));
    pos.y = Math.max(30, Math.min(canvas.height - 30, pos.y));
    if (dragging === 'A') { ptA.x = pos.x; ptA.y = pos.y; }
    else { ptB.x = pos.x; ptB.y = pos.y; }
    const sel = document.getElementById('routePresetSelect');
    if (sel) sel.value = 'custom';
    updateScalesSim();
  }, { passive: true });

  window.addEventListener('touchend', () => { dragging = null; });

  // LÒGICA DE COMPROVACIÓ DELS REPTES D'ESCALES
  const solvedChallenges = { 1: false, 2: false, 3: false };

  function updateSolvedCount() {
    const count = Object.values(solvedChallenges).filter(Boolean).length;
    const badge = document.getElementById('scalesScoreBadge');
    const cntElem = document.getElementById('scalesSolvedCount');
    if (cntElem) cntElem.textContent = count;
    if (badge && count === 3) {
      badge.className = 'badge badge-green';
      badge.textContent = '🎉 Missió d\'Escales Completada (3/3)!';
    }
  }

  window.checkScaleChallenge = function(challengeNum) {
    if (challengeNum === 1) {
      const val = parseFloat(document.getElementById('scaleCh1Input')?.value);
      const status = document.getElementById('scaleCh1Status');
      const fb = document.getElementById('scaleCh1Feedback');
      if (Math.abs(val - 2125) < 5) {
        solvedChallenges[1] = true;
        if (status) { status.className = 'status-badge status-ok'; status.textContent = 'Correcte! (+100 XP)'; }
        if (fb) {
          fb.style.display = 'block';
          fb.style.color = '#15803d';
          fb.innerHTML = '<strong>Molt bé!</strong> 8,5 cm × 25.000 = 212.500 cm. Com que 1 m té 100 cm, dividim entre 100 ➔ <strong>2.125 metres</strong> (o 2,125 km).';
        }
      } else {
        if (status) { status.className = 'status-badge status-danger'; status.textContent = 'Incorrecte'; }
        if (fb) {
          fb.style.display = 'block';
          fb.style.color = '#b91c1c';
          fb.innerHTML = 'Pista: Multiplica 8,5 cm pel denominador 25.000 (obtindràs centímetres). Després divideix entre 100 per passar-ho a metres!';
        }
      }
    } else if (challengeNum === 2) {
      const val = parseFloat(document.getElementById('scaleCh2Input')?.value);
      const status = document.getElementById('scaleCh2Status');
      const fb = document.getElementById('scaleCh2Feedback');
      if (val >= 0.50 && val <= 0.65) {
        solvedChallenges[2] = true;
        if (status) { status.className = 'status-badge status-ok'; status.textContent = 'Correcte! (+100 XP)'; }
        if (fb) {
          fb.style.display = 'block';
          fb.style.color = '#15803d';
          fb.innerHTML = `<strong>Excel·lent!</strong> La distància mesurada és d'aprox. 5,7 cm al plànol. A escala 1:10.000 són 57.000 cm = 570 m = <strong>${val} km</strong>.`;
        }
      } else {
        if (status) { status.className = 'status-badge status-danger'; status.textContent = 'Incorrecte'; }
        if (fb) {
          fb.style.display = 'block';
          fb.style.color = '#b91c1c';
          fb.innerHTML = 'Pista: Selecciona la ruta al menú desplegable superior, comprova que l\'escala és 1:10.000 i llegeix el valor a la casella «Distància en Quilòmetres» (és al voltant de 0,57 km).';
        }
      }
    } else if (challengeNum === 3) {
      const val = document.getElementById('scaleCh3Select')?.value;
      const status = document.getElementById('scaleCh3Status');
      const fb = document.getElementById('scaleCh3Feedback');
      if (val === '50000') {
        solvedChallenges[3] = true;
        if (status) { status.className = 'status-badge status-ok'; status.textContent = 'Correcte! (+100 XP)'; }
        if (fb) {
          fb.style.display = 'block';
          fb.style.color = '#15803d';
          fb.innerHTML = '<strong>Molt bona deducció!</strong> 3.500 m són 350.000 cm. Dividint entre els 7 cm del paper: 350.000 ÷ 7 = 50.000. Per tant, l\'escala idònia és <strong>1:50.000</strong>!';
        }
      } else {
        if (status) { status.className = 'status-badge status-danger'; status.textContent = 'Incorrecte'; }
        if (fb) {
          fb.style.display = 'block';
          fb.style.color = '#b91c1c';
          fb.innerHTML = 'Pista: Passa primer els 3.500 metres a centímetres (×100 = 350.000 cm) i divideix-ho entre els 7 cm que vols que ocupi al paper.';
        }
      }
    }
    updateSolvedCount();
  };

  window.updateScalesSim = updateScalesSim;
  window.setRoutePreset = setRoutePreset;
  window.addEventListener('DOMContentLoaded', updateScalesSim);
  updateScalesSim();
})();
