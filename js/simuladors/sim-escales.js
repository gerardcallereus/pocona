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

  function setScale(val) {
    const sel = document.getElementById('scaleSelect');
    if (sel) {
      sel.value = String(val);
      updateScalesSim();
    }
  }
  window.setScale = setScale;

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

    // Dibuixar fons de mapa estilitzat i relleu de la vall de Pocona
    ctx.save();
    // Valls i relleus
    const rGrad1 = ctx.createRadialGradient(260, 260, 20, 260, 260, 180);
    rGrad1.addColorStop(0, 'rgba(16, 185, 129, 0.15)');
    rGrad1.addColorStop(1, 'rgba(16, 185, 129, 0)');
    ctx.fillStyle = rGrad1;
    ctx.beginPath(); ctx.arc(260, 260, 180, 0, Math.PI * 2); ctx.fill();

    const rGrad2 = ctx.createRadialGradient(560, 110, 10, 560, 110, 160);
    rGrad2.addColorStop(0, 'rgba(2, 132, 199, 0.25)');
    rGrad2.addColorStop(1, 'rgba(2, 132, 199, 0)');
    ctx.fillStyle = rGrad2;
    ctx.beginPath(); ctx.arc(560, 110, 160, 0, Math.PI * 2); ctx.fill();

    // Corbes de nivell estilitzades
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.22)';
    ctx.lineWidth = 1.5;
    [60, 110, 150].forEach(r => {
      ctx.beginPath(); ctx.arc(560, 110, r, 0, Math.PI * 2); ctx.stroke();
    });
    [50, 90, 130].forEach(r => {
      ctx.beginPath(); ctx.arc(380, 90, r, 0, Math.PI * 2); ctx.stroke();
    });

    // Punts de referència geogràfica (fites del municipi)
    const landmarks = [
      { x: 240, y: 270, icon: '🏘️', name: 'Poble de Pocona (2.200 m)' },
      { x: 680, y: 210, icon: '🏫', name: 'Escola Chimboata (2.450 m)' },
      { x: 380, y: 90, icon: '🥔', name: 'Chillijchi (3.250 m)' },
      { x: 560, y: 110, icon: '🗼', name: 'Torre Cim El Fuerte (3.400 m)' },
      { x: 880, y: 310, icon: '🏥', name: 'Ambulatori Huayapacha (2.300 m)' }
    ];

    landmarks.forEach(lm => {
      ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.4)';
      ctx.lineWidth = 1;
      ctx.font = '11px Outfit, sans-serif';
      const tw = ctx.measureText(`${lm.icon} ${lm.name}`).width;
      ctx.beginPath();
      ctx.roundRect(lm.x - tw / 2 - 6, lm.y - 12, tw + 12, 22, 5);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#94a3b8';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${lm.icon} ${lm.name}`, lm.x, lm.y);
    });
    ctx.restore();

    // Línia de mesura entre A i B amb ombra
    ctx.save();
    ctx.strokeStyle = '#ec4899';
    ctx.lineWidth = 3.5;
    ctx.setLineDash([8, 6]);
    ctx.beginPath();
    ctx.moveTo(ptA.x, ptA.y);
    ctx.lineTo(ptB.x, ptB.y);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();

    // Dibuixar regle graduat sobre la línia
    const dx = ptB.x - ptA.x;
    const dy = ptB.y - ptA.y;
    const pixelDist = Math.hypot(dx, dy);
    const angle = Math.atan2(dy, dx);

    // 40 píxels a pantalla = 1 cm físic de paper a escala
    const mapCm = pixelDist / 40;
    const realMeters = Math.round((mapCm * scale) / 100);
    const realKm = realMeters / 1000;

    // Marques de regle graduat (centímetres i mil·límetres)
    ctx.save();
    ctx.translate(ptA.x, ptA.y);
    ctx.rotate(angle);
    for (let d = 0; d <= pixelDist; d += 8) {
      const isCm = (d % 40 === 0);
      const isHalfCm = (d % 20 === 0);
      const tickH = isCm ? 12 : (isHalfCm ? 8 : 4);
      const cmNum = Math.round(d / 40);

      ctx.strokeStyle = isCm ? '#f472b6' : 'rgba(244, 114, 182, 0.5)';
      ctx.lineWidth = isCm ? 2 : 1;
      ctx.beginPath();
      ctx.moveTo(d, -tickH);
      ctx.lineTo(d, tickH);
      ctx.stroke();

      if (isCm && cmNum > 0 && d + 15 < pixelDist) {
        ctx.fillStyle = '#fdf2f8';
        ctx.font = 'bold 10px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillText(`${cmNum}cm`, d, -16);
      }
    }
    ctx.restore();

    // Pastilla flotant amb la mesura al punt mig de la línia
    const midX = (ptA.x + ptB.x) / 2;
    const midY = (ptA.y + ptB.y) / 2;
    const distTag = `📏 ${mapCm.toFixed(1).replace('.', ',')} cm al mapa ➔ ${realMeters.toLocaleString('ca-ES')} m reals (${realKm.toFixed(2).replace('.', ',')} km)`;
    ctx.save();
    ctx.font = 'bold 12px Outfit, sans-serif';
    const tagW = ctx.measureText(distTag).width;
    ctx.fillStyle = 'rgba(15, 23, 42, 0.95)';
    ctx.strokeStyle = '#ec4899';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(midX - tagW / 2 - 10, midY - 14, tagW + 20, 26, 6);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#fce7f3';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(distTag, midX, midY);
    ctx.restore();

    // Dibuixar punts A i B amb anells i etiquetes
    function drawPoint(p, letter) {
      // Halo exterior
      ctx.fillStyle = p.color === '#38bdf8' ? 'rgba(56, 189, 248, 0.25)' : 'rgba(245, 158, 11, 0.25)';
      ctx.beginPath();
      ctx.arc(p.x, p.y, 18, 0, Math.PI * 2);
      ctx.fill();

      // Cercle central
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 11, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Etiqueta del punt
      ctx.font = 'bold 12px Outfit, sans-serif';
      const labelText = `${letter}: ${p.label}`;
      const lWidth = ctx.measureText(labelText).width;
      ctx.fillStyle = 'rgba(15, 23, 42, 0.92)';
      ctx.strokeStyle = p.color;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.roundRect(p.x - lWidth / 2 - 8, p.y + 18, lWidth + 16, 22, 5);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(labelText, p.x, p.y + 29);
    }
    drawPoint(ptA, 'A');
    drawPoint(ptB, 'B');

    // Escala gràfica de referència al cantó inferior dret (estil cartogràfic IGN)
    const barPx = 40 * 5; // 5 cm de regle
    const barMeters = Math.round((5 * scale) / 100);
    const barX = w - barPx - 40;
    const barY = h - 35;

    ctx.save();
    ctx.fillStyle = '#1e293b';
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(barX - 12, barY - 24, barPx + 24, 40, 6);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(barX, barY, barPx / 2, 8);
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(barX + barPx / 2, barY, barPx / 2, 8);
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1;
    ctx.strokeRect(barX, barY, barPx, 8);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 10px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('0 m', barX, barY - 6);
    ctx.fillText(`${barMeters / 2} m`, barX + barPx / 2, barY - 6);
    ctx.fillText(`${barMeters} m`, barX + barPx, barY - 6);
    ctx.restore();

    // Actualitzar panell de mètriques
    const cmElem = document.getElementById('mapMeasureCmVal');
    if (cmElem) cmElem.textContent = `${mapCm.toFixed(1).replace('.', ',')} cm`;

    const factorElem = document.getElementById('mapScaleFactorVal');
    if (factorElem) factorElem.textContent = `${(scale / 100).toLocaleString('ca-ES')} m reals`;

    const realMElem = document.getElementById('realMetersVal');
    if (realMElem) realMElem.textContent = `${realMeters.toLocaleString('ca-ES')} m`;

    const realKmElem = document.getElementById('realKmVal');
    if (realKmElem) realKmElem.textContent = `${realKm.toFixed(2).replace('.', ',')} km`;

    const realCm = Math.round(mapCm * scale);

    // Actualitzar explicació pas a pas per a l'alumnat
    const s1 = document.getElementById('step1CmDisplay');
    if (s1) s1.textContent = `${mapCm.toFixed(1).replace('.', ',')} cm`;

    const s2 = document.getElementById('step2CalcDisplay');
    if (s2) s2.textContent = `${mapCm.toFixed(1).replace('.', ',')} cm × ${scale.toLocaleString('ca-ES')} = ${realCm.toLocaleString('ca-ES')} cm`;

    const s3 = document.getElementById('step3ResultDisplay');
    if (s3) s3.textContent = `${realMeters.toLocaleString('ca-ES')} m (${realKm.toFixed(2).replace('.', ',')} km)`;

    const calcElem = document.getElementById('scaleCalculationDetail');
    if (calcElem) {
      calcElem.textContent = `Distància Real = ${mapCm.toFixed(1).replace('.', ',')} cm × ${scale.toLocaleString('ca-ES')} = ${realCm.toLocaleString('ca-ES')} cm = ${realMeters.toLocaleString('ca-ES')} m = ${realKm.toFixed(2).replace('.', ',')} km`;
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
