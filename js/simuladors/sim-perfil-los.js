/* ==========================================================
       1. SIMULADOR DE TOPOGRAFIA, ESCALES I PERFIL AMB LoS
       ========================================================== */
    const topoMapCanvas = document.getElementById('topoMapCanvas');
    const topoProfileCanvas = document.getElementById('topoProfileCanvas');

    // State for Tower A and Tower B positions on map
    const towerA = { x: 80, y: 220 };
    const towerB = { x: 440, y: 110 };
    let draggingTower = null;

    // Mountain peaks definition in the 2D map space
    const peaks = [
      { x: 120, y: 190, r: 130, h: 3200 }, // Peak 1 (Tower A side)
      { x: 270, y: 160, r: 100, h: 3350 }, // Central mountain (obstacle)
      { x: 420, y: 130, r: 120, h: 3050 }  // Peak 3 (Tower B side)
    ];

    function getElevationAt(x, y) {
      let base = 2400;
      let totalH = base;
      for (const p of peaks) {
        const dist = Math.hypot(x - p.x, y - p.y);
        if (dist < p.r) {
          const factor = Math.cos((dist / p.r) * (Math.PI / 2));
          totalH += (p.h - base) * factor * factor;
        }
      }
      return totalH;
    }

    function initTopoInteraction() {
      function getCanvasPos(evt) {
        const rect = topoMapCanvas.getBoundingClientRect();
        const scaleX = topoMapCanvas.width / rect.width;
        const scaleY = topoMapCanvas.height / rect.height;
        const clientX = evt.clientX || (evt.touches && evt.touches[0].clientX);
        const clientY = evt.clientY || (evt.touches && evt.touches[0].clientY);
        return {
          x: (clientX - rect.left) * scaleX,
          y: (clientY - rect.top) * scaleY
        };
      }

      function onDown(e) {
        const pos = getCanvasPos(e);
        if (Math.hypot(pos.x - towerA.x, pos.y - towerA.y) < 25) {
          draggingTower = 'A';
        } else if (Math.hypot(pos.x - towerB.x, pos.y - towerB.y) < 25) {
          draggingTower = 'B';
        }
      }

      function onMove(e) {
        if (!draggingTower) return;
        const pos = getCanvasPos(e);
        pos.x = Math.max(30, Math.min(topoMapCanvas.width - 30, pos.x));
        pos.y = Math.max(30, Math.min(topoMapCanvas.height - 30, pos.y));
        if (draggingTower === 'A') {
          towerA.x = pos.x; towerA.y = pos.y;
        } else {
          towerB.x = pos.x; towerB.y = pos.y;
        }
        updateTopoSim();
      }

      function onUp() {
        draggingTower = null;
      }

      topoMapCanvas.addEventListener('mousedown', onDown);
      window.addEventListener('mousemove', onMove);
      window.addEventListener('mouseup', onUp);

      topoMapCanvas.addEventListener('touchstart', onDown, { passive: true });
      window.addEventListener('touchmove', onMove, { passive: true });
      window.addEventListener('touchend', onUp);
    }

    function updateTopoSim() {
      if (!topoMapCanvas || !topoProfileCanvas) return;
      const ctxMap = topoMapCanvas.getContext('2d');
      const ctxProf = topoProfileCanvas.getContext('2d');

      const scale = parseInt(document.getElementById('topoScaleSlider').value);
      const hTowerA = parseInt(document.getElementById('towerH1Slider').value);
      const hTowerB = parseInt(document.getElementById('towerH2Slider').value);

      document.getElementById('topoScaleLabel').textContent = `1:${scale.toLocaleString('ca-ES')}`;
      document.getElementById('towerH1Label').textContent = `${hTowerA} m`;
      document.getElementById('towerH2Label').textContent = `${hTowerB} m`;

      // 1. Draw Map Canvas
      const w = topoMapCanvas.width;
      const h = topoMapCanvas.height;
      ctxMap.clearRect(0, 0, w, h);

      // Background terrain color
      ctxMap.fillStyle = '#1e293b';
      ctxMap.fillRect(0, 0, w, h);

      // Draw contour lines (Isohipses)
      for (let alt = 2500; alt <= 3300; alt += 100) {
        ctxMap.strokeStyle = (alt % 200 === 0) ? 'rgba(56, 189, 248, 0.45)' : 'rgba(56, 189, 248, 0.2)';
        ctxMap.lineWidth = (alt % 200 === 0) ? 2 : 1;

        for (const p of peaks) {
          if (alt < p.h) {
            const rRatio = Math.sqrt(Math.max(0, 1 - (alt - 2400) / (p.h - 2400)));
            const r = p.r * (1 - rRatio);
            ctxMap.beginPath();
            ctxMap.arc(p.x, p.y, p.r * rRatio, 0, Math.PI * 2);
            ctxMap.stroke();

            // Label on main curves
            if (alt % 200 === 0) {
              ctxMap.fillStyle = 'rgba(148, 163, 184, 0.7)';
              ctxMap.font = '9px JetBrains Mono';
              ctxMap.fillText(`${alt}m`, p.x + p.r * rRatio - 12, p.y);
            }
          }
        }
      }

      // Draw Line between Tower A and Tower B
      ctxMap.strokeStyle = '#f59e0b';
      ctxMap.lineWidth = 2;
      ctxMap.setLineDash([5, 4]);
      ctxMap.beginPath();
      ctxMap.moveTo(towerA.x, towerA.y);
      ctxMap.lineTo(towerB.x, towerB.y);
      ctxMap.stroke();
      ctxMap.setLineDash([]);

      // Draw Towers on Map
      function drawMapTower(pos, label, color) {
        ctxMap.fillStyle = color;
        ctxMap.beginPath();
        ctxMap.arc(pos.x, pos.y, 8, 0, Math.PI * 2);
        ctxMap.fill();
        ctxMap.strokeStyle = '#ffffff';
        ctxMap.lineWidth = 2;
        ctxMap.stroke();

        ctxMap.fillStyle = '#ffffff';
        ctxMap.font = 'bold 11px Outfit';
        ctxMap.fillText(label, pos.x - 4, pos.y + 20);
      }
      drawMapTower(towerA, 'Torre A', '#38bdf8');
      drawMapTower(towerB, 'Torre B', '#a855f7');

      // 2. Sample Terrain Profile
      const steps = 80;
      const profileData = [];
      let maxObstacle = -Infinity;
      const elevA = getElevationAt(towerA.x, towerA.y);
      const elevB = getElevationAt(towerB.x, towerB.y);

      const antA_alt = elevA + hTowerA;
      const antB_alt = elevB + hTowerB;

      let isBlocked = false;

      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const x = towerA.x + (towerB.x - towerA.x) * t;
        const y = towerA.y + (towerB.y - towerA.y) * t;
        const terrainH = getElevationAt(x, y);
        const rayH = antA_alt + (antB_alt - antA_alt) * t;

        if (terrainH > rayH) {
          isBlocked = true;
        }
        profileData.push({ t, terrainH, rayH });
      }

      // 3. Draw Profile Canvas
      ctxProf.clearRect(0, 0, w, h);
      ctxProf.fillStyle = '#0f172a';
      ctxProf.fillRect(0, 0, w, h);

      // Grid
      ctxProf.strokeStyle = 'rgba(51, 65, 85, 0.4)';
      ctxProf.lineWidth = 1;
      for (let alt = 2400; alt <= 3400; alt += 200) {
        const py = h - 40 - ((alt - 2400) / 1000) * (h - 80);
        ctxProf.beginPath();
        ctxProf.moveTo(40, py);
        ctxProf.lineTo(w - 20, py);
        ctxProf.stroke();
        ctxProf.fillStyle = '#64748b';
        ctxProf.font = '10px JetBrains Mono';
        ctxProf.fillText(`${alt}m`, 5, py + 3);
      }

      // Terrain Shape
      ctxProf.beginPath();
      ctxProf.moveTo(40, h - 40);
      for (let i = 0; i <= steps; i++) {
        const pt = profileData[i];
        const px = 40 + pt.t * (w - 60);
        const py = h - 40 - ((pt.terrainH - 2400) / 1000) * (h - 80);
        ctxProf.lineTo(px, py);
      }
      ctxProf.lineTo(w - 20, h - 40);
      ctxProf.closePath();
      const gradTerrain = ctxProf.createLinearGradient(0, 40, 0, h - 40);
      gradTerrain.addColorStop(0, '#059669');
      gradTerrain.addColorStop(0.5, '#047857');
      gradTerrain.addColorStop(1, '#064e3b');
      ctxProf.fillStyle = gradTerrain;
      ctxProf.fill();
      ctxProf.strokeStyle = '#34d399';
      ctxProf.lineWidth = 2;
      ctxProf.stroke();

      // Towers in Profile
      const pxA = 40;
      const pyA_base = h - 40 - ((elevA - 2400) / 1000) * (h - 80);
      const pyA_top = h - 40 - ((antA_alt - 2400) / 1000) * (h - 80);

      const pxB = w - 20;
      const pyB_base = h - 40 - ((elevB - 2400) / 1000) * (h - 80);
      const pyB_top = h - 40 - ((antB_alt - 2400) / 1000) * (h - 80);

      // Tower Mast A
      ctxProf.strokeStyle = '#38bdf8';
      ctxProf.lineWidth = 4;
      ctxProf.beginPath();
      ctxProf.moveTo(pxA, pyA_base);
      ctxProf.lineTo(pxA, pyA_top);
      ctxProf.stroke();

      // Tower Mast B
      ctxProf.strokeStyle = '#a855f7';
      ctxProf.lineWidth = 4;
      ctxProf.beginPath();
      ctxProf.moveTo(pxB, pyB_base);
      ctxProf.lineTo(pxB, pyB_top);
      ctxProf.stroke();

      // Line of Sight Ray (Laser beam)
      ctxProf.beginPath();
      ctxProf.moveTo(pxA, pyA_top);
      ctxProf.lineTo(pxB, pyB_top);
      ctxProf.strokeStyle = isBlocked ? '#ef4444' : '#22c55e';
      ctxProf.lineWidth = 3;
      ctxProf.shadowColor = isBlocked ? '#ef4444' : '#22c55e';
      ctxProf.shadowBlur = 10;
      ctxProf.stroke();
      ctxProf.shadowBlur = 0; // reset

      // Calculate Physical Metrics
      const pixelDist = Math.hypot(towerB.x - towerA.x, towerB.y - towerA.y);
      // Assuming 100 pixels = 10 cm on canvas
      const mapCm = (pixelDist / 10);
      const realMeters = Math.round((mapCm * scale) / 100);
      const deltaH = Math.round(Math.abs(elevB - elevA));

      document.getElementById('topoMapDistCm').textContent = `${mapCm.toFixed(1).replace('.', ',')} cm`;
      document.getElementById('topoRealDistM').textContent = `${realMeters.toLocaleString('ca-ES')} m`;
      document.getElementById('topoDeltaH').textContent = `${deltaH} m`;

      const statusElem = document.getElementById('topoLosStatus');
      if (isBlocked) {
        statusElem.className = 'status-badge status-danger';
        statusElem.textContent = '🔴 Enllaç Bloquejat (Obstacle Intermedi)';
      } else {
        statusElem.className = 'status-badge status-ok';
        statusElem.textContent = '🟢 Visió Neta (LoS OK)';
        markLosChallenge1Solved();
      }
    }

  // LÒGICA DELS REPTES DE LÍNIA DE VISTA (LoS)
  const losSolved = { 1: false, 2: false, 3: false };

  function updateLosSolvedBadge() {
    const count = Object.values(losSolved).filter(Boolean).length;
    const badge = document.getElementById('losScoreBadge');
    const cntElem = document.getElementById('losSolvedCount');
    if (cntElem) cntElem.textContent = count;
    if (badge && count === 3) {
      badge.className = 'badge badge-green';
      badge.textContent = '🎉 Missió de LoS Completada (3/3)!';
    }
  }

  function markLosChallenge1Solved() {
    if (losSolved[1]) return;
    losSolved[1] = true;
    const status = document.getElementById('losCh1Status');
    const fb = document.getElementById('losCh1Feedback');
    if (status) { status.className = 'status-badge status-ok'; status.textContent = 'Correcte! (+100 XP)'; }
    if (fb) {
      fb.style.display = 'block';
      fb.style.color = '#15803d';
      fb.innerHTML = '<strong>Molt bona feina!</strong> El raig verd de telecomunicació ha superat la cresta de la muntanya. Ara hi ha visió directa entre els dos punts!';
    }
    updateLosSolvedBadge();
  }

  window.checkLosChallenge = function(challengeNum) {
    if (challengeNum === 2) {
      const val = parseFloat(document.getElementById('losCh2Input')?.value);
      const status = document.getElementById('losCh2Status');
      const fb = document.getElementById('losCh2Feedback');
      const curDelta = parseFloat(document.getElementById('topoDeltaH')?.textContent) || 340;

      if (Math.abs(val - curDelta) < 15) {
        losSolved[2] = true;
        if (status) { status.className = 'status-badge status-ok'; status.textContent = 'Correcte! (+100 XP)'; }
        if (fb) {
          fb.style.display = 'block';
          fb.style.color = '#15803d';
          fb.innerHTML = `<strong>Molt bona lectura!</strong> El desnivell entre la base de la Torre A i la Torre B és exactament de <strong>${val} metres</strong>.`;
        }
      } else {
        if (status) { status.className = 'status-badge status-danger'; status.textContent = 'Incorrecte'; }
        if (fb) {
          fb.style.display = 'block';
          fb.style.color = '#b91c1c';
          fb.innerHTML = `Pista: Llegeix el valor que mostra la casella «Desnivell (Δh)» a la barra de lectures superior (actualment ronda els ${curDelta} m).`;
        }
      }
    } else if (challengeNum === 3) {
      const val = document.getElementById('losCh3Select')?.value;
      const status = document.getElementById('losCh3Status');
      const fb = document.getElementById('losCh3Feedback');

      if (val === 'rep') {
        losSolved[3] = true;
        if (status) { status.className = 'status-badge status-ok'; status.textContent = 'Correcte! (+100 XP)'; }
        if (fb) {
          fb.style.display = 'block';
          fb.style.color = '#15803d';
          fb.innerHTML = '<strong>Excel·lent decisió d\'enginyeria!</strong> Instal·lar un petit node repetidor solar a la carena permet fer dos salts curts amb visió directa sense necessitat de torres gegants ni despeses prohibitives.';
        }
      } else {
        if (status) { status.className = 'status-badge status-danger'; status.textContent = 'Incorrecte'; }
        if (fb) {
          fb.style.display = 'block';
          fb.style.color = '#b91c1c';
          fb.innerHTML = 'Pista: Pensa en una solució autònoma, de baix cost i comunitària que aprofiti l\'energia del sol.';
        }
      }
    }
    updateLosSolvedBadge();
  };

window.addEventListener('DOMContentLoaded', () => {
  if (typeof initTopoInteraction === 'function') initTopoInteraction();
  if (typeof updateTopoSim === 'function') updateTopoSim();
});
