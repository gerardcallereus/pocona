/* ==========================================================
       4. SIMULADOR D'ESTRUCTURES I FORCES DE TORRES VENTADES
       ========================================================== */
    const towerCanvas = document.getElementById('towerCanvas');

    function updateTowerSim() {
      if (!towerCanvas) return;
      const ctx = towerCanvas.getContext('2d');
      const w = towerCanvas.width;
      const h = towerCanvas.height;

      const windKmh = parseInt(document.getElementById('towerWindSlider').value);
      const guyAngleDeg = parseInt(document.getElementById('towerAngleSlider').value);
      const baseTensionN = parseInt(document.getElementById('towerTensionSlider').value);
      const levels = parseInt(document.getElementById('towerLevelsSelect').value);

      document.getElementById('towerWindLabel').textContent = `${windKmh} km/h`;
      document.getElementById('towerAngleLabel').textContent = `${guyAngleDeg}°`;
      document.getElementById('towerTensionLabel').textContent = `${baseTensionN.toLocaleString('ca-ES')} N`;

      // Physics Calculation
      // Wind pressure: P = 0.5 * rho * v^2 -> Force = P * Area
      const windSpeedMs = windKmh / 3.6;
      const windForceN = Math.round(0.613 * windSpeedMs * windSpeedMs * 1.6); // 1.6 m2 effective mast area

      // Tension in windward guy wire: T = T0 + F_wind / sin(angle)
      const rad = (guyAngleDeg * Math.PI) / 180;
      const addTension = windForceN / Math.sin(rad);
      const maxCableTension = Math.round(baseTensionN + (levels === 2 ? addTension * 0.6 : addTension));

      // Axial Compression on mast base: N = Mast_Weight + sum(T_i * cos(angle))
      const mastWeightN = 1200;
      const axialCompN = Math.round(mastWeightN + (levels === 2 ? 4 : 2) * maxCableTension * Math.cos(rad));

      // Deflection (flexion bend) at top of mast
      const flexFactor = (windForceN / (baseTensionN * 0.8)) * (levels === 1 ? 2.2 : 1.0);
      const topDeflectPx = Math.min(65, Math.round(flexFactor * 8));

      document.getElementById('towerWindForceVal').textContent = `${windForceN} N`;
      document.getElementById('towerCableTensionVal').textContent = `${maxCableTension.toLocaleString('ca-ES')} N`;
      document.getElementById('towerBaseCompVal').textContent = `${axialCompN.toLocaleString('ca-ES')} N`;

      const safetyBadge = document.getElementById('towerSafetyBadge');
      if (windKmh > 110 || maxCableTension > 3500 || topDeflectPx > 45) {
        safetyBadge.className = 'status-badge status-danger';
        safetyBadge.textContent = '🔴 Alerta: Risc de Col·lapse per Pandeig!';
      } else if (windKmh > 75 || topDeflectPx > 22) {
        safetyBadge.className = 'status-badge status-warn';
        safetyBadge.textContent = '🟡 Atenció: Deformació Alta per Vent Fort';
      } else {
        safetyBadge.className = 'status-badge status-ok';
        safetyBadge.textContent = '🟢 Estructura Estable & Segura';
      }

      // Render Structural Canvas
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = '#0b1120';
      ctx.fillRect(0, 0, w, h);

      // Ground Line
      const groundY = h - 60;
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(40, groundY);
      ctx.lineTo(w - 40, groundY);
      ctx.stroke();

      // Concrete Anchors & Base
      const baseX = w / 2;
      ctx.fillStyle = '#64748b';
      ctx.fillRect(baseX - 25, groundY, 50, 15);

      const anchorDistPx = Math.round(260 * Math.tan(rad));
      const anchorLeftX = Math.max(80, baseX - anchorDistPx);
      const anchorRightX = Math.min(w - 80, baseX + anchorDistPx);

      ctx.fillRect(anchorLeftX - 15, groundY, 30, 15);
      ctx.fillRect(anchorRightX - 15, groundY, 30, 15);

      // Draw Guy Wires (Tensors)
      const topMastY = 80;
      const topMastX = baseX + topDeflectPx;
      const midMastY = (groundY + topMastY) / 2;
      const midMastX = baseX + topDeflectPx * 0.45;

      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 2;

      // Top Tier Guy Wires
      ctx.beginPath();
      ctx.moveTo(anchorLeftX, groundY);
      ctx.lineTo(topMastX, topMastY);
      ctx.moveTo(anchorRightX, groundY);
      ctx.lineTo(topMastX, topMastY);
      ctx.stroke();

      // Mid Tier Guy Wires (if 2 levels)
      if (levels === 2) {
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(anchorLeftX, groundY);
        ctx.lineTo(midMastX, midMastY);
        ctx.moveTo(anchorRightX, groundY);
        ctx.lineTo(midMastX, midMastY);
        ctx.stroke();
      }

      // Draw Lattice Mast (Gelosia triangular corbada pel vent)
      const mastSteps = 16;
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;

      let prevLeft = { x: baseX - 8, y: groundY };
      let prevRight = { x: baseX + 8, y: groundY };

      for (let s = 1; s <= mastSteps; s++) {
        const t = s / mastSteps;
        const curDeflect = topDeflectPx * (t * t);
        const curY = groundY - t * (groundY - topMastY);
        const curLeft = { x: baseX - 8 + curDeflect, y: curY };
        const curRight = { x: baseX + 8 + curDeflect, y: curY };

        // Mast Legs
        ctx.beginPath();
        ctx.moveTo(prevLeft.x, prevLeft.y);
        ctx.lineTo(curLeft.x, curLeft.y);
        ctx.moveTo(prevRight.x, prevRight.y);
        ctx.lineTo(curRight.x, curRight.y);
        ctx.stroke();

        // Cross bracing (Diagonals de gelosia)
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(prevLeft.x, prevLeft.y);
        ctx.lineTo(curRight.x, curRight.y);
        ctx.moveTo(prevRight.x, prevRight.y);
        ctx.lineTo(curLeft.x, curLeft.y);
        ctx.stroke();
        ctx.lineWidth = 3;

        prevLeft = curLeft;
        prevRight = curRight;
      }

      // Wind Vector Arrows (Animated flow)
      if (windKmh > 0) {
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.7)';
        ctx.fillStyle = 'rgba(56, 189, 248, 0.7)';
        ctx.lineWidth = 2;
        const numArrows = 4;
        for (let i = 0; i < numArrows; i++) {
          const ay = 120 + i * 60;
          const axStart = 60;
          const axEnd = baseX - 50 + (i % 2) * 20;
          ctx.beginPath();
          ctx.moveTo(axStart, ay);
          ctx.lineTo(axEnd, ay);
          ctx.stroke();
          // Arrow head
          ctx.beginPath();
          ctx.moveTo(axEnd, ay);
          ctx.lineTo(axEnd - 10, ay - 5);
          ctx.lineTo(axEnd - 10, ay + 5);
          ctx.closePath();
          ctx.fill();
        }
        ctx.font = 'bold 13px JetBrains Mono';
        ctx.fillText(`VENT: ${windKmh} km/h (F = ${windForceN} N) →`, 60, 100);
      }

      // Force Vector on Windward Cable (Tracció)
      ctx.strokeStyle = '#ef4444';
      ctx.fillStyle = '#ef4444';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(anchorLeftX + 40, groundY - 20);
      ctx.lineTo(anchorLeftX + 90, groundY - 60);
      ctx.stroke();
      ctx.font = 'bold 11px JetBrains Mono';
      ctx.fillText(`Tracció T1 = ${maxCableTension} N`, anchorLeftX - 10, groundY - 45);

      // Force Vector on Base (Compressió Axial)
      ctx.strokeStyle = '#eab308';
      ctx.fillStyle = '#eab308';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(baseX, groundY + 18);
      ctx.lineTo(baseX, groundY + 50);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(baseX, groundY + 50);
      ctx.lineTo(baseX - 6, groundY + 40);
      ctx.lineTo(baseX + 6, groundY + 40);
      ctx.closePath();
      ctx.fill();
      ctx.fillText(`Càrrega a la Base N = ${axialCompN} N`, baseX - 90, groundY + 45);

window.addEventListener('DOMContentLoaded', () => {
  if (typeof updateTowerSim === 'function') updateTowerSim();
});
