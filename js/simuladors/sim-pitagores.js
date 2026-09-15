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

window.addEventListener('DOMContentLoaded', () => {
  if (typeof updatePythagorasSim === 'function') updatePythagorasSim();
});
