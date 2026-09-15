/* ==========================================================
       3. SIMULADOR DE COBERTURA WiMAX (DIRECCIONAL VS OMNI)
       ========================================================== */
    const wimaxCanvas = document.getElementById('wimaxCanvas');

    const receiverStations = [
      { id: 'Ambulatori', name: '🏥 Ambulatori Pocona', x: 780, y: 150, angleFromCenter: 0, dist: 0 },
      { id: 'Escola', name: '🏫 Escola Chimboata', x: 620, y: 340, angleFromCenter: 0, dist: 0 },
      { id: 'Chillijchi', name: '🏡 Comunitat Chillijchi', x: 260, y: 280, angleFromCenter: 0, dist: 0 }
    ];

    function updateWimaxSim() {
      if (!wimaxCanvas) return;
      const ctx = wimaxCanvas.getContext('2d');
      const w = wimaxCanvas.width;
      const h = wimaxCanvas.height;

      const type = document.getElementById('wimaxAntennaType').value;
      const orientationDeg = parseInt(document.getElementById('wimaxAngleSlider').value);
      const beamwidthDeg = parseInt(document.getElementById('wimaxBeamSlider').value);
      const powerDbm = parseInt(document.getElementById('wimaxPowerSlider').value);

      document.getElementById('wimaxAngleLabel').textContent = `${orientationDeg}°`;
      document.getElementById('wimaxBeamLabel').textContent = `${beamwidthDeg}°`;
      const mW = Math.round(Math.pow(10, powerDbm / 10));
      document.getElementById('wimaxPowerLabel').textContent = `${powerDbm} dBm (${mW} mW)`;

      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = '#090d16';
      ctx.fillRect(0, 0, w, h);

      // Base transmitter position
      const tx = { x: 480, y: 210 };

      // Map Grid Lines
      ctx.strokeStyle = 'rgba(30, 41, 59, 0.7)';
      ctx.lineWidth = 1;
      for (let r = 80; r <= 360; r += 80) {
        ctx.beginPath();
        ctx.arc(tx.x, tx.y, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Draw Radiation Pattern
      const maxRangePx = 380;

      if (type === 'dir') {
        // Directional Beam
        const startAng = ((orientationDeg - beamwidthDeg / 2) * Math.PI) / 180;
        const endAng = ((orientationDeg + beamwidthDeg / 2) * Math.PI) / 180;

        const beamGrad = ctx.createRadialGradient(tx.x, tx.y, 10, tx.x, tx.y, maxRangePx);
        beamGrad.addColorStop(0, 'rgba(168, 85, 247, 0.7)');
        beamGrad.addColorStop(0.6, 'rgba(124, 58, 237, 0.35)');
        beamGrad.addColorStop(1, 'rgba(124, 58, 237, 0)');

        ctx.fillStyle = beamGrad;
        ctx.beginPath();
        ctx.moveTo(tx.x, tx.y);
        ctx.arc(tx.x, tx.y, maxRangePx, startAng, endAng);
        ctx.closePath();
        ctx.fill();

        ctx.strokeStyle = '#c084fc';
        ctx.lineWidth = 2;
        ctx.stroke();
      } else {
        // Omnidirectional Circle
        const omniGrad = ctx.createRadialGradient(tx.x, tx.y, 10, tx.x, tx.y, 240);
        omniGrad.addColorStop(0, 'rgba(16, 185, 129, 0.65)');
        omniGrad.addColorStop(0.6, 'rgba(5, 150, 105, 0.25)');
        omniGrad.addColorStop(1, 'rgba(5, 150, 105, 0)');

        ctx.fillStyle = omniGrad;
        ctx.beginPath();
        ctx.arc(tx.x, tx.y, 240, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = '#34d399';
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Draw Central Transmitter Tower
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(tx.x, tx.y, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      ctx.stroke();
      ctx.font = 'bold 12px Outfit';
      ctx.fillStyle = '#38bdf8';
      ctx.fillText('Torre Repetidora Central', tx.x - 65, tx.y - 18);

      // Evaluate signal at receiver stations
      receiverStations.forEach(st => {
        const dx = st.x - tx.x;
        const dy = st.y - tx.y;
        const distPx = Math.hypot(dx, dy);
        let angDeg = (Math.atan2(dy, dx) * 180) / Math.PI;
        if (angDeg < 0) angDeg += 360;

        // Path loss calculation (logarithmic free space model)
        const km = (distPx / 40) * 0.8; // scale: 50px = 1km
        const pathLoss = 32.4 + 20 * Math.log10(5800) + 20 * Math.log10(km); // 5.8 GHz WiMAX

        let gain = 0;
        if (type === 'dir') {
          let diff = Math.abs(angDeg - orientationDeg);
          if (diff > 180) diff = 360 - diff;
          if (diff <= beamwidthDeg / 2) {
            gain = 24 - (diff / (beamwidthDeg / 2)) * 6; // 24 dBi main lobe
          } else {
            gain = -10; // side lobe
          }
        } else {
          gain = 8; // 8 dBi omni
        }

        const rxPower = Math.round(powerDbm + gain - pathLoss);

        // Draw Receiver Station on Canvas
        ctx.fillStyle = '#1e293b';
        ctx.beginPath();
        ctx.arc(st.x, st.y, 12, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = rxPower >= -75 ? '#22c55e' : (rxPower >= -88 ? '#eab308' : '#ef4444');
        ctx.lineWidth = 3;
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 11px Outfit';
        ctx.fillText(`${st.name}`, st.x - 30, st.y + 24);

        // Update UI Badges
        const badgeElem = document.getElementById(`stat${st.id}Badge`);
        const textElem = document.getElementById(`stat${st.id}Text`);
        if (badgeElem && textElem) {
          badgeElem.textContent = `${rxPower} dBm`;
          if (rxPower >= -75) {
            badgeElem.className = 'status-badge status-ok';
            textElem.textContent = 'Qualitat: Excel·lent (Enllaç d\'alta velocitat)';
          } else if (rxPower >= -88) {
            badgeElem.className = 'status-badge status-warn';
            textElem.textContent = 'Qualitat: Mitjana (Veu i telemetria estable)';
          } else {
            badgeElem.className = 'status-badge status-danger';
            textElem.textContent = 'Qualitat: Fora de cobertura / Senyal nul';
          }
        }
      });
    }

window.addEventListener('DOMContentLoaded', () => {
  if (typeof updateWimaxSim === 'function') updateWimaxSim();
});
