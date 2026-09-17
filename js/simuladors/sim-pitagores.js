/* ==========================================================
       2. SIMULADOR DE PITÀGORES I TRIANGULACIÓ DINÀMICA
       ========================================================== */
    const pytCanvas = document.getElementById('pythagorasCanvas');

    function updatePythagorasSim() {
      if (!pytCanvas) return;
      const ctx = pytCanvas.getContext('2d');
      const w = pytCanvas.width;
      const h = pytCanvas.height;

      const dh = parseInt(document.getElementById('pytDhSlider').value);
      const cotaA = parseInt(document.getElementById('pytCotaASlider').value);
      const cotaB = parseInt(document.getElementById('pytCotaBSlider').value);

      document.getElementById('pytDhLabel').textContent = `${dh.toLocaleString('ca-ES')} m`;
      document.getElementById('pytCotaALabel').textContent = `${cotaA.toLocaleString('ca-ES')} m`;
      document.getElementById('pytCotaBLabel').textContent = `${cotaB.toLocaleString('ca-ES')} m`;

      const deltaH = Math.abs(cotaB - cotaA);
      const dg = Math.sqrt(dh * dh + deltaH * deltaH);
      const angleRad = Math.atan2(deltaH, dh);
      const angleDeg = (angleRad * 180) / Math.PI;
      const slopePct = (deltaH / dh) * 100;
      // Light speed in air: ~299.792 km/s
      const timeMicrosec = (dg / 299792458) * 1e6;

      document.getElementById('pytDgVal').textContent = `${dg.toLocaleString('ca-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} m`;
      document.getElementById('pytAngleVal').textContent = `${angleDeg.toFixed(2).replace('.', ',')}°`;
      document.getElementById('pytSlopeVal').textContent = `${slopePct.toFixed(2).replace('.', ',')} %`;
      document.getElementById('pytTimeVal').textContent = `${timeMicrosec.toFixed(2).replace('.', ',')} µs`;

      const dhSq = Math.round(dh * dh);
      const dHSq = Math.round(deltaH * deltaH);
      const sumSq = dhSq + dHSq;
      document.getElementById('pytFormulaDetail').textContent = 
        `d = √(${dh}² + ${deltaH}²) = √(${dhSq.toLocaleString('ca-ES')} + ${dHSq.toLocaleString('ca-ES')}) = √${sumSq.toLocaleString('ca-ES')} = ${dg.toLocaleString('ca-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} m`;

      // Render 2.5D Canvas Diagram
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, w, h);

      // Coordinates on canvas
      const padX = 140;
      const pA = { x: padX, y: h - 100 };
      const pCorner = { x: w - padX, y: h - 100 };
      const pB = { x: w - padX, y: Math.max(50, h - 100 - (deltaH / 1500) * 220) };

      // Terrain cliff background
      ctx.fillStyle = '#1e293b';
      ctx.beginPath();
      ctx.moveTo(pCorner.x - 40, h);
      ctx.lineTo(pCorner.x - 40, pB.y + 40);
      ctx.lineTo(w, pB.y + 40);
      ctx.lineTo(w, h);
      ctx.closePath();
      ctx.fill();

      // Right Angle Marker
      const mSize = 24;
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(pCorner.x - mSize, pCorner.y);
      ctx.lineTo(pCorner.x - mSize, pCorner.y - mSize);
      ctx.lineTo(pCorner.x, pCorner.y - mSize);
      ctx.stroke();

      // Horizontal Cathetus (dh)
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(pA.x, pA.y);
      ctx.lineTo(pCorner.x, pCorner.y);
      ctx.stroke();

      // Vertical Cathetus (Δh)
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(pCorner.x, pCorner.y);
      ctx.lineTo(pB.x, pB.y);
      ctx.stroke();

      // Hypotenuse (dg) - Animated Glow
      ctx.strokeStyle = '#a855f7';
      ctx.lineWidth = 5;
      ctx.shadowColor = '#c084fc';
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.moveTo(pA.x, pA.y);
      ctx.lineTo(pB.x, pB.y);
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Angle arc at A
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(pA.x, pA.y, 45, -angleRad, 0);
      ctx.stroke();
      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 12px JetBrains Mono';
      ctx.fillText(`θ = ${angleDeg.toFixed(1)}°`, pA.x + 55, pA.y - 12);

      // Labels on sides
      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 14px Outfit';
      ctx.fillText(`Distància Horitzontal (dh) = ${dh} m`, (pA.x + pCorner.x) / 2 - 120, pA.y + 35);

      ctx.fillStyle = '#f59e0b';
      ctx.fillText(`Desnivell (Δh) = ${deltaH} m`, pCorner.x + 20, (pCorner.y + pB.y) / 2);

      ctx.fillStyle = '#c084fc';
      ctx.font = 'bold 16px Outfit';
      const midHypX = (pA.x + pB.x) / 2;
      const midHypY = (pA.y + pB.y) / 2;
      ctx.fillText(`Distància Geomètrica (dg) = ${dg.toFixed(1)} m`, midHypX - 110, midHypY - 20);

      // Tower Icons at Endpoints
      function drawTowerIcon(pt, label, col) {
        ctx.fillStyle = col;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 12px Outfit';
        ctx.fillText(label, pt.x - 30, pt.y - 16);
      }
      drawTowerIcon(pA, `Estació A (${cotaA}m)`, '#38bdf8');
      drawTowerIcon(pB, `Estació B (${cotaB}m)`, '#a855f7');
    }

  // LÒGICA DELS REPTES DE PITÀGORES
  const pytSolved = { 1: false, 2: false, 3: false };

  function updatePytSolvedBadge() {
    const count = Object.values(pytSolved).filter(Boolean).length;
    const badge = document.getElementById('pytScoreBadge');
    const cntElem = document.getElementById('pytSolvedCount');
    if (cntElem) cntElem.textContent = count;
    if (badge && count === 3) {
      badge.className = 'badge badge-green';
      badge.textContent = '🎉 Missió de Pitàgores Completada (3/3)!';
    }
  }

  window.checkPytChallenge = function(challengeNum) {
    if (challengeNum === 1) {
      const val = parseFloat(document.getElementById('pytCh1Input')?.value);
      const status = document.getElementById('pytCh1Status');
      const fb = document.getElementById('pytCh1Feedback');

      if (Math.abs(val - 1000) < 5) {
        pytSolved[1] = true;
        if (status) { status.className = 'status-badge status-ok'; status.textContent = 'Correcte! (+100 XP)'; }
        if (fb) {
          fb.style.display = 'block';
          fb.style.color = '#15803d';
          fb.innerHTML = '<strong>Perfecte!</strong> Catet horitzontal = 800 m, catet vertical = 600 m. Triplet pitagòric (6-8-10): d = √(800² + 600²) = √(640.000 + 360.000) = √1.000.000 = <strong>1.000 metres</strong>!';
        }
      } else {
        if (status) { status.className = 'status-badge status-danger'; status.textContent = 'Incorrecte'; }
        if (fb) {
          fb.style.display = 'block';
          fb.style.color = '#b91c1c';
          fb.innerHTML = 'Pista: Eleva al quadrat 800 (640.000), eleva al quadrat 600 (360.000), suma\'ls (1.000.000) i fes l\'arrel quadrada.';
        }
      }
    } else if (challengeNum === 2) {
      const val = parseFloat(document.getElementById('pytCh2Input')?.value);
      const status = document.getElementById('pytCh2Status');
      const fb = document.getElementById('pytCh2Feedback');

      if (Math.abs(val - 1050) < 5) {
        pytSolved[2] = true;
        if (status) { status.className = 'status-badge status-ok'; status.textContent = 'Correcte! (+100 XP)'; }
        if (fb) {
          fb.style.display = 'block';
          fb.style.color = '#15803d';
          fb.innerHTML = '<strong>Molt bona previsió!</strong> 1.000 m × 1,05 = <strong>1.050 metres</strong> de cable. Així garantim que no es trenqui per tensió mecànica!';
        }
      } else {
        if (status) { status.className = 'status-badge status-danger'; status.textContent = 'Incorrecte'; }
        if (fb) {
          fb.style.display = 'block';
          fb.style.color = '#b91c1c';
          fb.innerHTML = 'Pista: El 5% de 1.000 és 50. Suma aquest marge a la distància de 1.000 m.';
        }
      }
    } else if (challengeNum === 3) {
      const val = parseFloat(document.getElementById('pytCh3Input')?.value);
      const status = document.getElementById('pytCh3Status');
      const fb = document.getElementById('pytCh3Feedback');

      if (Math.abs(val - 29.17) < 0.5) {
        pytSolved[3] = true;
        if (status) { status.className = 'status-badge status-ok'; status.textContent = 'Correcte! (+100 XP)'; }
        if (fb) {
          fb.style.display = 'block';
          fb.style.color = '#15803d';
          fb.innerHTML = '<strong>Molt bona lectura!</strong> Pendent = (700 ÷ 2.400) × 100 = <strong>29,17%</strong>. Un pendent molt pronunciat típic de les valls andines!';
        }
      } else {
        if (status) { status.className = 'status-badge status-danger'; status.textContent = 'Incorrecte'; }
        if (fb) {
          fb.style.display = 'block';
          fb.style.color = '#b91c1c';
          fb.innerHTML = 'Pista: Llegeix la casella «Pendent del Trajecte» a la barra de lectures (és aproximadament 29,17%).';
        }
      }
    }
    updatePytSolvedBadge();
  };

window.addEventListener('DOMContentLoaded', () => {
  if (typeof updatePythagorasSim === 'function') updatePythagorasSim();
});
