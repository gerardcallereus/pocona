/* ==========================================================
   4.2 SIMULADOR DIDÀCTIC DE FÍSICA: FORCES I VENT EN TORRES
   ========================================================== */

// Declaració immediata a window per evitar ReferenceError
window.setWindPreset = function(wind, angle, tension, levels, height) {
  const wElem = document.getElementById('towerWindSlider');
  const aElem = document.getElementById('towerAngleSlider');
  const tElem = document.getElementById('towerTensionSlider');
  const lElem = document.getElementById('towerLevelsSelect');
  const hElem = document.getElementById('towerHeightSlider');

  if (wElem) wElem.value = wind;
  if (aElem) aElem.value = angle;
  if (tElem) tElem.value = tension;
  if (lElem) lElem.value = levels;
  if (hElem) hElem.value = height;

  window.updateTowerSim();
};

window.updateTowerSim = function() {
  const canvas = document.getElementById('towerCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const windSlider = document.getElementById('towerWindSlider');
  const angleSlider = document.getElementById('towerAngleSlider');
  const tensionSlider = document.getElementById('towerTensionSlider');
  const levelsSelect = document.getElementById('towerLevelsSelect');
  const heightSlider = document.getElementById('towerHeightSlider');
  const areaSlider = document.getElementById('towerAreaSlider');

  const windKmh = parseInt(windSlider ? windSlider.value : 45, 10);
  const guyAngleDeg = parseInt(angleSlider ? angleSlider.value : 45, 10);
  const baseTensionN = parseInt(tensionSlider ? tensionSlider.value : 1200, 10);
  const levels = parseInt(levelsSelect ? levelsSelect.value : 2, 10);
  const heightM = parseInt(heightSlider ? heightSlider.value : 24, 10);
  const areaM2 = parseFloat(areaSlider ? areaSlider.value : 1.5);

  // Actualitzar etiquetes de text
  const lblWind = document.getElementById('towerWindLabel');
  const lblAngle = document.getElementById('towerAngleLabel');
  const lblTension = document.getElementById('towerTensionLabel');
  const lblHeight = document.getElementById('towerHeightLabel');
  const lblArea = document.getElementById('towerAreaLabel');

  if (lblWind) lblWind.textContent = `${windKmh} km/h`;
  if (lblAngle) lblAngle.textContent = `${guyAngleDeg}°`;
  if (lblTension) lblTension.textContent = `${baseTensionN.toLocaleString('ca-ES')} N`;
  if (lblHeight) lblHeight.textContent = `${heightM} m`;
  if (lblArea) lblArea.textContent = `${areaM2.toFixed(1).replace('.', ',')} m²`;

  // CÀLCULS DE FÍSICA APLICADA (3r d'ESO)
  // 1. Pressió dinàmica del vent: P = 0.5 * rho * v^2
  const windSpeedMs = windKmh / 3.6;
  const rho = 1.0; // Densitat de l'aire a ~2.800m
  const dynamicPressurePa = 0.5 * rho * windSpeedMs * windSpeedMs;
  const mastArea = (heightM * 0.18) + areaM2;
  const windForceN = Math.round(dynamicPressurePa * mastArea * 1.2);

  // 2. Tracció en els cables (equilibri de forces horitzontals)
  const rad = (guyAngleDeg * Math.PI) / 180;
  const deltaTension = windForceN / (Math.cos(rad) * (levels === 1 ? 1 : (levels === 2 ? 1.7 : 2.4)));
  const maxCableTensionN = Math.round(baseTensionN + deltaTension);

  // 3. Compressió vertical a la base (N)
  const mastWeightN = Math.round(heightM * 250);
  const verticalCablesN = Math.round((levels * 3) * (baseTensionN + deltaTension * 0.5) * Math.sin(rad));
  const axialCompN = mastWeightN + verticalCablesN;

  // 4. Flexió i deformació (desplaçament horitzontal del cim)
  const stiffnessFactor = (levels === 1 ? 1.0 : (levels === 2 ? 3.5 : 7.0)) * (baseTensionN / 1000);
  const deflectCm = Math.min(35, ((windForceN * (heightM / 24)) / (stiffnessFactor * 60))).toFixed(1);
  const deflectPx = Math.min(70, Math.round(parseFloat(deflectCm) * 3));

  // 5. Càrrega crítica de Pandeig (Fórmula d'Euler simplificada)
  const freeLengthM = heightM / levels;
  const criticalBucklingN = Math.round((18000000) / (freeLengthM * freeLengthM));
  const bucklingRatio = (axialCompN / criticalBucklingN);

  // Actualitzar panell de resultats
  const wfElem = document.getElementById('towerWindForceVal');
  if (wfElem) wfElem.textContent = `${windForceN.toLocaleString('ca-ES')} N`;
  const ctElem = document.getElementById('towerCableTensionVal');
  if (ctElem) ctElem.textContent = `${maxCableTensionN.toLocaleString('ca-ES')} N`;
  const bcElem = document.getElementById('towerBaseCompVal');
  if (bcElem) bcElem.textContent = `${axialCompN.toLocaleString('ca-ES')} N`;
  const defElem = document.getElementById('towerDeflectVal');
  if (defElem) defElem.textContent = `${deflectCm.replace('.', ',')} cm`;

  const safetyBadge = document.getElementById('towerSafetyBadge');
  if (safetyBadge) {
    if (bucklingRatio > 0.9 || maxCableTensionN > 3800 || parseFloat(deflectCm) > 20) {
      safetyBadge.className = 'status-badge status-danger';
      safetyBadge.textContent = '🔴 Perill de Col·lapse per Pandeig / Trencament!';
    } else if (bucklingRatio > 0.6 || maxCableTensionN > 2600 || parseFloat(deflectCm) > 10) {
      safetyBadge.className = 'status-badge status-warn';
      safetyBadge.textContent = '🟡 Atenció: Deformació i Càrrega Elevades';
    } else {
      safetyBadge.className = 'status-badge status-ok';
      safetyBadge.textContent = '🟢 Estructura Estable (Factor de Seguretat OK)';
    }
  }

  const detailElem = document.getElementById('towerPhysicsFormulaDetail');
  if (detailElem) {
    detailElem.innerHTML = `
      1. Pressió del vent: P = ½ · 1,0 · (${windSpeedMs.toFixed(1)} m/s)² = <strong>${dynamicPressurePa.toFixed(1)} Pa</strong> ➔ F<sub>vent</sub> = <strong>${windForceN} N</strong><br>
      2. Tracció màxima al cable: T = T₀ + (F<sub>vent</sub> / cos(${guyAngleDeg}°)) = ${baseTensionN} + ${Math.round(deltaTension)} = <strong>${maxCableTensionN} N</strong><br>
      3. Compressió total a la base: N = Pes (${mastWeightN} N) + Tracció_vertical (${verticalCablesN} N) = <strong>${axialCompN} N</strong><br>
      4. Càrrega de pandeig admisible: <strong>${criticalBucklingN.toLocaleString('ca-ES')} N</strong> (Nivell de sol·licitació: <strong>${(bucklingRatio * 100).toFixed(1)}%</strong>)
    `;
  }

  // RENDERITZAT GRÀFIC AL CANVAS
  const w = canvas.width;
  const h = canvas.height;
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = '#0a101f';
  ctx.fillRect(0, 0, w, h);

  const groundY = h - 65;
  const baseX = w / 2;
  const mastTopY = Math.max(50, groundY - (heightM / 42) * (h - 130));

  // Dibuixar terra i fonamentació
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(30, groundY);
  ctx.lineTo(w - 30, groundY);
  ctx.stroke();

  // Sabata central de formigó
  ctx.fillStyle = '#475569';
  ctx.fillRect(baseX - 25, groundY, 50, 18);
  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 2;
  ctx.strokeRect(baseX - 25, groundY, 50, 18);

  // Ancoratges laterals
  const totalMastHeightPx = groundY - mastTopY;
  const anchorDistPx = Math.round(totalMastHeightPx / Math.tan(rad));
  const anchorLeftX = Math.max(70, baseX - anchorDistPx);
  const anchorRightX = Math.min(w - 70, baseX + anchorDistPx);

  // Blocs d'ancoratge
  ctx.fillStyle = '#475569';
  ctx.fillRect(anchorLeftX - 18, groundY, 36, 18);
  ctx.fillRect(anchorRightX - 18, groundY, 36, 18);
  ctx.strokeRect(anchorLeftX - 18, groundY, 36, 18);
  ctx.strokeRect(anchorRightX - 18, groundY, 36, 18);

  // Dibuixar Vent (Fletxes dinàmiques)
  if (windKmh > 0) {
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.6)';
    ctx.fillStyle = 'rgba(56, 189, 248, 0.6)';
    ctx.lineWidth = 2;
    const numArrows = 5;
    for (let i = 0; i < numArrows; i++) {
      const ay = mastTopY + 30 + i * ((groundY - mastTopY - 40) / numArrows);
      const axEnd = baseX - 50;
      ctx.beginPath();
      ctx.moveTo(50, ay);
      ctx.lineTo(axEnd, ay);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(axEnd, ay);
      ctx.lineTo(axEnd - 12, ay - 6);
      ctx.lineTo(axEnd - 12, ay + 6);
      ctx.closePath();
      ctx.fill();
    }
    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 13px JetBrains Mono, monospace';
    ctx.fillText(`VENT: ${windKmh} km/h (F_vent = ${windForceN} N) →`, 50, mastTopY + 15);
  }

  // Punts del màstil corbat
  const mastPoints = [];
  const numSteps = 24;
  for (let s = 0; s <= numSteps; s++) {
    const t = s / numSteps;
    const y = groundY - t * (groundY - mastTopY);
    const x = baseX + deflectPx * Math.pow(t, 1.8);
    mastPoints.push({ x, y });
  }

  // Dibuixar tirants (cables)
  for (let lvl = 1; lvl <= levels; lvl++) {
    const fraction = lvl / levels;
    const ptIdx = Math.round(fraction * numSteps);
    const tiePt = mastPoints[ptIdx];

    // Cable de sobrevent (esquerra)
    ctx.strokeStyle = lvl === levels ? '#ef4444' : '#f87171';
    ctx.lineWidth = lvl === levels ? 2.5 : 1.8;
    ctx.beginPath();
    ctx.moveTo(anchorLeftX, groundY);
    ctx.lineTo(tiePt.x, tiePt.y);
    ctx.stroke();

    // Cable de sotavent (dreta)
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.6)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(anchorRightX, groundY);
    ctx.lineTo(tiePt.x, tiePt.y);
    ctx.stroke();
  }

  // Dibuixar gelosia del màstil
  const mastWidthPx = 14;
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 2.5;

  for (let s = 0; s < numSteps; s++) {
    const p1 = mastPoints[s];
    const p2 = mastPoints[s + 1];

    ctx.beginPath();
    ctx.moveTo(p1.x - mastWidthPx / 2, p1.y);
    ctx.lineTo(p2.x - mastWidthPx / 2, p2.y);
    ctx.moveTo(p1.x + mastWidthPx / 2, p1.y);
    ctx.lineTo(p2.x + mastWidthPx / 2, p2.y);
    ctx.stroke();

    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(p1.x - mastWidthPx / 2, p1.y);
    ctx.lineTo(p2.x + mastWidthPx / 2, p2.y);
    ctx.moveTo(p1.x + mastWidthPx / 2, p1.y);
    ctx.lineTo(p2.x - mastWidthPx / 2, p2.y);
    ctx.stroke();
    ctx.lineWidth = 2.5;
  }

  // Antenes parabòliques al cim
  const topPt = mastPoints[numSteps];
  ctx.fillStyle = '#f59e0b';
  ctx.beginPath();
  ctx.arc(topPt.x + 14, topPt.y + 10, 10, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Vectors de força
  // Tracció T
  ctx.strokeStyle = '#ef4444';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(anchorLeftX, groundY);
  ctx.lineTo(anchorLeftX + 50 * Math.cos(rad), groundY - 50 * Math.sin(rad));
  ctx.stroke();
  ctx.fillStyle = '#ef4444';
  ctx.font = 'bold 11px JetBrains Mono, monospace';
  ctx.fillText(`T = ${maxCableTensionN} N`, anchorLeftX - 10, groundY - 24);

  // Compressió N a la Base
  ctx.strokeStyle = '#eab308';
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(baseX, groundY + 18);
  ctx.lineTo(baseX, groundY + 58);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(baseX, groundY + 58);
  ctx.lineTo(baseX - 6, groundY + 48);
  ctx.lineTo(baseX + 6, groundY + 48);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = '#eab308';
  ctx.font = 'bold 11px JetBrains Mono, monospace';
  ctx.fillText(`N = ${axialCompN} N (Compressió Base)`, baseX - 110, groundY + 52);
};

// Auto-inicialització
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    window.updateTowerSim();
  });
} else {
  window.updateTowerSim();
}
