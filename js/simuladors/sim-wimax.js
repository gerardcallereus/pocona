/* ==========================================================
   3.7 SIMULADOR AVANÇAT DE COBERTURA WiMAX I XARXA DE 3 TORRES
   Pocona: Node Dorsal ➔ Repetidor Intermedi ➔ Distribució Comunitària
   ========================================================== */

(function() {
  const wimaxCanvas = document.getElementById('wimaxCanvas');
  if (!wimaxCanvas) return;
  const ctx = wimaxCanvas.getContext('2d');

  // Posicions de la infraestructura
  const T1 = { x: 130, y: 220, name: 'Torre 1 (Node Dorsal)', distNextKm: 7.5 };
  const T2 = { x: 490, y: 135, name: 'Torre 2 (Repetidor Cim)', distNextKm: 6.2 };
  const T3 = { x: 790, y: 235, name: 'Torre 3 (Distribució Vall)' };

  // Poblacions receptores connectades a Torre 3
  const villages = [
    { id: 'Ambulatori', name: '🏥 Ambulatori Pocona', x: 980, y: 140, distKm: 2.1, angleDeg: 335 },
    { id: 'Escola', name: '🏫 Escola Chimboata', x: 1030, y: 275, distKm: 2.4, angleDeg: 10 },
    { id: 'Chillijchi', name: '🏡 Comunitat Chillijchi', x: 885, y: 375, distKm: 1.9, angleDeg: 55 }
  ];

  let animFrame = 0;
  let pulseOffset = 0;

  function updateWimaxSim() {
    const w = wimaxCanvas.width;
    const h = wimaxCanvas.height;

    // Lectura de controls de Torre 1
    const t1Antenna = document.getElementById('wimaxT1Antenna')?.value || 'dir';
    const t1Power = parseInt(document.getElementById('wimaxT1PowerSlider')?.value || 24, 10);
    const t1Mw = Math.round(Math.pow(10, t1Power / 10));
    const t1PwrLbl = document.getElementById('wimaxT1PowerLabel');
    if (t1PwrLbl) t1PwrLbl.textContent = `${t1Power} dBm (${t1Mw} mW)`;

    // Lectura de controls de Torre 2
    const t2Antenna = document.getElementById('wimaxT2Antenna')?.value || 'dir';
    const t2Power = parseInt(document.getElementById('wimaxT2PowerSlider')?.value || 24, 10);
    const t2Mw = Math.round(Math.pow(10, t2Power / 10));
    const t2PwrLbl = document.getElementById('wimaxT2PowerLabel');
    if (t2PwrLbl) t2PwrLbl.textContent = `${t2Power} dBm (${t2Mw} mW)`;

    // Lectura de controls de Torre 3
    const t3Antenna = document.getElementById('wimaxT3Antenna')?.value || 'omni';
    const t3Power = parseInt(document.getElementById('wimaxT3PowerSlider')?.value || 26, 10);
    const t3Mw = Math.round(Math.pow(10, t3Power / 10));
    const t3PwrLbl = document.getElementById('wimaxT3PowerLabel');
    if (t3PwrLbl) t3PwrLbl.textContent = `${t3Power} dBm (${t3Mw} mW)`;

    // Càlculs físics de cobertura
    // Enllaç 1: T1 ➔ T2 (7.5 km)
    // Direccional: guany 24 dBi, abast = 5.5 km + (P - 15) * 0.4 km. A 20 dBm -> 7.5 km OK.
    // Omnidireccional: guany 8 dBi, abast màxim = 4.0 km (no arriba mai a 7.5 km)
    const t1MaxDistKm = (t1Antenna === 'dir') ? (5.5 + (t1Power - 15) * 0.4) : (2.2 + (t1Power - 15) * 0.12);
    const link1Active = (t1Antenna === 'dir' && t1Power >= 20);

    // Enllaç 2: T2 ➔ T3 (6.2 km)
    // Requereix que T1 estigui actiu
    const t2MaxDistKm = (t2Antenna === 'dir') ? (5.2 + (t2Power - 15) * 0.38) : (2.2 + (t2Power - 15) * 0.12);
    const link2Active = link1Active && (t2Antenna === 'dir' && t2Power >= 20);

    // Enllaç 3: T3 ➔ Pobles
    // Si és omni: abast = 1.2 km + (P - 15) * 0.14 km.
    // A 15 dBm -> 1.2 km (0 pobles)
    // A 20 dBm -> 1.9 km (Chillijchi al límit)
    // A 22 dBm -> 2.18 km (Chillijchi i Ambulatori OK)
    // A >= 24 dBm -> >= 2.46 km (Tots 3 pobles OK!)
    // Si és direccional: només cobreix un feix estret (~30°) cap a l'Ambulatori (1 sol poble)
    const t3MaxDistKm = (t3Antenna === 'omni') ? (1.2 + (t3Power - 15) * 0.14) : (3.5 + (t3Power - 15) * 0.25);

    // Actualitzar estats visuals T1 Link Badge
    const t1Badge = document.getElementById('t1LinkBadge');
    if (t1Badge) {
      if (link1Active) {
        t1Badge.className = 'status-badge status-ok';
        t1Badge.textContent = 'Enllaç Actiu (7,5 km)';
      } else {
        t1Badge.className = 'status-badge status-danger';
        t1Badge.textContent = (t1Antenna === 'omni') ? 'Abast insuficient (Omni)' : 'Potència insuficient (< 20 dBm)';
      }
    }

    // Actualitzar estats visuals T2 Link Badge
    const t2Badge = document.getElementById('t2LinkBadge');
    if (t2Badge) {
      if (!link1Active) {
        t2Badge.className = 'status-badge status-warn';
        t2Badge.textContent = 'Sense senyal de T1';
      } else if (link2Active) {
        t2Badge.className = 'status-badge status-ok';
        t2Badge.textContent = 'Enllaç Actiu (6,2 km)';
      } else {
        t2Badge.className = 'status-badge status-danger';
        t2Badge.textContent = (t2Antenna === 'omni') ? 'Abast insuficient (Omni)' : 'Potència insuficient (< 20 dBm)';
      }
    }

    // Avaluar cobertura a cada poble
    let connectedVillagesCount = 0;
    const villageStatuses = {};

    villages.forEach(v => {
      let covered = false;
      let rxPower = -99;

      if (link2Active) {
        if (t3Antenna === 'omni') {
          if (t3MaxDistKm >= v.distKm) {
            covered = true;
            rxPower = Math.round(t3Power + 8 - (32.4 + 20 * Math.log10(5800) + 20 * Math.log10(v.distKm)));
          } else {
            rxPower = -92;
          }
        } else {
          // Direccional: apunta cap a l'Ambulatori (~340°)
          if (v.id === 'Ambulatori') {
            covered = true;
            rxPower = Math.round(t3Power + 24 - (32.4 + 20 * Math.log10(5800) + 20 * Math.log10(v.distKm)));
          } else {
            covered = false;
            rxPower = -98; // Fora del feix
          }
        }
      }

      if (covered) connectedVillagesCount++;
      villageStatuses[v.id] = { covered, rxPower };

      // Actualitzar targeta HTML del poble
      const badge = document.getElementById(`stat${v.id}Badge`);
      const txt = document.getElementById(`stat${v.id}Text`);
      if (badge && txt) {
        if (!link2Active) {
          badge.className = 'status-badge status-danger';
          badge.textContent = 'Sense Internet';
          txt.textContent = 'Estat: Xarxa dorsal troncal caiguda';
        } else if (covered) {
          badge.className = 'status-badge status-ok';
          badge.textContent = `${rxPower} dBm`;
          txt.textContent = 'Estat: Connectat i operatiu';
        } else {
          badge.className = 'status-badge status-danger';
          badge.textContent = `${rxPower} dBm`;
          txt.textContent = (t3Antenna === 'dir') ? 'Estat: Fora del feix direccional' : 'Estat: Fora d\'abast (augmenta potència)';
        }
      }
    });

    // Actualitzar Badge Torre 3
    const t3Badge = document.getElementById('t3CoverageBadge');
    if (t3Badge) {
      if (!link2Active) {
        t3Badge.className = 'status-badge status-danger';
        t3Badge.textContent = 'Inactiva (Sense dorsal)';
      } else if (connectedVillagesCount === 3) {
        t3Badge.className = 'status-badge status-ok';
        t3Badge.textContent = '3 / 3 Pobles Connectats';
      } else {
        t3Badge.className = 'status-badge status-warn';
        t3Badge.textContent = `${connectedVillagesCount} / 3 Pobles`;
      }
    }

    // Barra de telemetria inferior
    const t1t2Stat = document.getElementById('wimaxT1T2Stat');
    if (t1t2Stat) {
      t1t2Stat.textContent = link1Active ? '7,5 km (Actiu OK)' : 'Tallat (Inaccessible)';
      t1t2Stat.style.color = link1Active ? '#16a34a' : '#ef4444';
    }

    const t2t3Stat = document.getElementById('wimaxT2T3Stat');
    if (t2t3Stat) {
      t2t3Stat.textContent = link2Active ? '6,2 km (Actiu OK)' : (!link1Active ? 'Sense alimentació T1' : 'Tallat (Inaccessible)');
      t2t3Stat.style.color = link2Active ? '#16a34a' : '#ef4444';
    }

    const globalStat = document.getElementById('wimaxGlobalStat');
    if (globalStat) {
      if (link1Active && link2Active && connectedVillagesCount === 3) {
        globalStat.textContent = '100% Operativa 🎉';
        globalStat.style.color = '#16a34a';
      } else if (connectedVillagesCount > 0) {
        globalStat.textContent = 'Parcialment Operativa';
        globalStat.style.color = '#eab308';
      } else {
        globalStat.textContent = 'Xarxa Desconnectada';
        globalStat.style.color = '#ef4444';
      }
    }

    const connBadge = document.getElementById('wimaxConnectedCountBadge');
    if (connBadge) {
      connBadge.textContent = `${connectedVillagesCount} / 3 Poblacions`;
      connBadge.className = (connectedVillagesCount === 3) ? 'status-badge status-ok' : (connectedVillagesCount > 0 ? 'status-badge status-warn' : 'status-badge status-danger');
    }

    // ----------------------------------------------------
    // DIBUIX DEL CANVAS
    // ----------------------------------------------------
    ctx.clearRect(0, 0, w, h);

    // Fons cel fosc tecnològic
    ctx.fillStyle = '#080d1a';
    ctx.fillRect(0, 0, w, h);

    // Dibuixar perfil orogràfic de muntanyes andines al fons
    ctx.beginPath();
    ctx.moveTo(0, h);
    ctx.lineTo(0, 310);
    ctx.quadraticCurveTo(130, 240, 260, 280);
    ctx.lineTo(380, 200);
    ctx.lineTo(490, 155); // Cim Torre 2
    ctx.lineTo(600, 220);
    ctx.quadraticCurveTo(700, 290, 790, 260); // Turó Torre 3
    ctx.quadraticCurveTo(920, 280, 1050, 340);
    ctx.lineTo(w, 360);
    ctx.lineTo(w, h);
    ctx.closePath();
    ctx.fillStyle = '#0f172a';
    ctx.fill();
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Dibuixar graella de coordenades / línies de relleu
    ctx.strokeStyle = 'rgba(51, 65, 85, 0.25)';
    ctx.lineWidth = 1;
    for (let x = 60; x < w; x += 100) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 50; y < h; y += 70) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // 1. COBERTURA RADIADA PER TORRE 1
    const t1PixelRadius = Math.min(390, (t1MaxDistKm / 7.5) * 360);
    if (t1Antenna === 'dir') {
      // Feix direccional cap a Torre 2 (angle entre T1 i T2)
      const ang = Math.atan2(T2.y - T1.y, T2.x - T1.x);
      const halfBeam = (16 * Math.PI) / 180; // 32° d'obertura

      const grad = ctx.createRadialGradient(T1.x, T1.y, 4, T1.x, T1.y, t1PixelRadius);
      grad.addColorStop(0, link1Active ? 'rgba(56, 189, 248, 0.75)' : 'rgba(239, 68, 68, 0.6)');
      grad.addColorStop(0.6, link1Active ? 'rgba(14, 165, 233, 0.25)' : 'rgba(239, 68, 68, 0.2)');
      grad.addColorStop(1, 'rgba(14, 165, 233, 0)');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.moveTo(T1.x, T1.y);
      ctx.arc(T1.x, T1.y, t1PixelRadius, ang - halfBeam, ang + halfBeam);
      ctx.closePath();
      ctx.fill();

      ctx.strokeStyle = link1Active ? '#38bdf8' : '#ef4444';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    } else {
      // Omnidireccional
      const grad = ctx.createRadialGradient(T1.x, T1.y, 4, T1.x, T1.y, t1PixelRadius);
      grad.addColorStop(0, 'rgba(239, 68, 68, 0.5)');
      grad.addColorStop(1, 'rgba(239, 68, 68, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(T1.x, T1.y, t1PixelRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Línia de connexió PTP T1 ➔ T2
    if (link1Active) {
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2.5;
      ctx.setLineDash([6, 6]);
      ctx.beginPath();
      ctx.moveTo(T1.x, T1.y);
      ctx.lineTo(T2.x, T2.y);
      ctx.stroke();
      ctx.setLineDash([]);

      // Pols de dades animat
      pulseOffset = (pulseOffset + 1.2) % 30;
      const t = (pulseOffset / 30);
      const px = T1.x + (T2.x - T1.x) * t;
      const py = T1.y + (T2.y - T1.y) * t;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(px, py, 4, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(T1.x, T1.y);
      ctx.lineTo(T2.x, T2.y);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // 2. COBERTURA RADIADA PER TORRE 2 (Repetidor Cim)
    if (link1Active) {
      const t2PixelRadius = Math.min(330, (t2MaxDistKm / 6.2) * 300);
      if (t2Antenna === 'dir') {
        const ang = Math.atan2(T3.y - T2.y, T3.x - T2.x);
        const halfBeam = (16 * Math.PI) / 180;

        const grad = ctx.createRadialGradient(T2.x, T2.y, 4, T2.x, T2.y, t2PixelRadius);
        grad.addColorStop(0, link2Active ? 'rgba(168, 85, 247, 0.75)' : 'rgba(239, 68, 68, 0.6)');
        grad.addColorStop(0.6, link2Active ? 'rgba(147, 51, 234, 0.25)' : 'rgba(239, 68, 68, 0.2)');
        grad.addColorStop(1, 'rgba(147, 51, 234, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(T2.x, T2.y);
        ctx.arc(T2.x, T2.y, t2PixelRadius, ang - halfBeam, ang + halfBeam);
        ctx.closePath();
        ctx.fill();

        ctx.strokeStyle = link2Active ? '#a855f7' : '#ef4444';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      } else {
        const grad = ctx.createRadialGradient(T2.x, T2.y, 4, T2.x, T2.y, t2PixelRadius);
        grad.addColorStop(0, 'rgba(239, 68, 68, 0.5)');
        grad.addColorStop(1, 'rgba(239, 68, 68, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(T2.x, T2.y, t2PixelRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      if (link2Active) {
        ctx.strokeStyle = '#a855f7';
        ctx.lineWidth = 2.5;
        ctx.setLineDash([6, 6]);
        ctx.beginPath();
        ctx.moveTo(T2.x, T2.y);
        ctx.lineTo(T3.x, T3.y);
        ctx.stroke();
        ctx.setLineDash([]);

        const t = ((pulseOffset + 15) % 30) / 30;
        const px = T2.x + (T3.x - T2.x) * t;
        const py = T2.y + (T3.y - T2.y) * t;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(px, py, 4, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // 3. COBERTURA RADIADA PER TORRE 3 (Distribució a la Vall)
    if (link2Active) {
      // Radi visual dels pobles (escala: 2.4 km ~ 240px)
      const t3PixelRadius = (t3MaxDistKm / 2.4) * 240;

      if (t3Antenna === 'omni') {
        const grad = ctx.createRadialGradient(T3.x, T3.y, 4, T3.x, T3.y, t3PixelRadius);
        grad.addColorStop(0, 'rgba(34, 197, 94, 0.7)');
        grad.addColorStop(0.5, 'rgba(16, 185, 129, 0.25)');
        grad.addColorStop(1, 'rgba(16, 185, 129, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(T3.x, T3.y, t3PixelRadius, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = '#22c55e';
        ctx.lineWidth = 2;
        ctx.stroke();
      } else {
        // Direccional només cap a l'Ambulatori
        const ang = Math.atan2(villages[0].y - T3.y, villages[0].x - T3.x);
        const halfBeam = (15 * Math.PI) / 180;

        const grad = ctx.createRadialGradient(T3.x, T3.y, 4, T3.x, T3.y, t3PixelRadius);
        grad.addColorStop(0, 'rgba(234, 179, 8, 0.7)');
        grad.addColorStop(0.6, 'rgba(234, 179, 8, 0.2)');
        grad.addColorStop(1, 'rgba(234, 179, 8, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(T3.x, T3.y);
        ctx.arc(T3.x, T3.y, t3PixelRadius, ang - halfBeam, ang + halfBeam);
        ctx.closePath();
        ctx.fill();

        ctx.strokeStyle = '#eab308';
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    }

    // 4. DIBUIXAR ELS 3 POBLES (Receptors)
    villages.forEach(v => {
      const st = villageStatuses[v.id] || { covered: false };
      const isConnected = st.covered;

      if (isConnected) {
        ctx.strokeStyle = '#22c55e';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.moveTo(T3.x, T3.y);
        ctx.lineTo(v.x, v.y);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      ctx.fillStyle = '#1e293b';
      ctx.beginPath();
      ctx.arc(v.x, v.y, 11, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = isConnected ? '#22c55e' : '#ef4444';
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 11px Outfit';
      ctx.fillText(v.name, v.x - 30, v.y + 24);

      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px JetBrains Mono';
      ctx.fillText(`(${v.distKm} km)`, v.x - 10, v.y + 37);
    });

    // 5. DIBUIXAR ICONES I ETIQUETES DE LES 3 TORRES
    // Torre 1
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(T1.x, T1.y, 9, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 12px Outfit';
    ctx.fillText('🗼 T1: Dorsal (Internet)', T1.x - 55, T1.y - 18);

    // Torre 2
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(T2.x, T2.y, 9, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = link1Active ? '#a855f7' : '#64748b';
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.fillStyle = link1Active ? '#c084fc' : '#94a3b8';
    ctx.font = 'bold 12px Outfit';
    ctx.fillText('⛰️ T2: Repetidor Cim', T2.x - 50, T2.y - 18);

    // Torre 3
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(T3.x, T3.y, 9, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = link2Active ? '#22c55e' : '#64748b';
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.fillStyle = link2Active ? '#4ade80' : '#94a3b8';
    ctx.font = 'bold 12px Outfit';
    ctx.fillText('🏘️ T3: Distribució Vall', T3.x - 50, T3.y - 18);

    // Dibuixar rètols de distàncies entre torres
    ctx.fillStyle = '#64748b';
    ctx.font = '11px JetBrains Mono';
    ctx.fillText('Enllaç 7,5 km', (T1.x + T2.x) / 2 - 35, (T1.y + T2.y) / 2 - 12);
    ctx.fillText('Enllaç 6,2 km', (T2.x + T3.x) / 2 - 35, (T2.y + T3.y) / 2 - 12);

    // Guardar estat per als reptes
    currentSimState = {
      t1Antenna,
      t1Power,
      link1Active,
      t2Antenna,
      t2Power,
      link2Active,
      t3Antenna,
      t3Power,
      connectedVillagesCount
    };
  }

  // Estat dels reptes
  let currentSimState = {
    t1Antenna: 'dir',
    t1Power: 24,
    link1Active: true,
    t2Antenna: 'dir',
    t2Power: 24,
    link2Active: true,
    t3Antenna: 'omni',
    t3Power: 26,
    connectedVillagesCount: 3
  };

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
        badge.textContent = '🎉 Missió WiMAX 3 Torres Completada! (3/3)';
      } else {
        badge.className = 'badge badge-cyan';
        badge.innerHTML = `Progrés: <span id="wimaxSolvedCount">${wimaxSolved.size}</span>/3 completats`;
      }
    }
  }

  window.checkWimaxChallenge = function(challengeNum) {
    if (challengeNum === 1) {
      const fb = document.getElementById('wimaxCh1Feedback');
      const stBadge = document.getElementById('wimaxCh1Status');
      const card = document.getElementById('wimaxCh1Card');
      if (!fb) return;
      fb.style.display = 'block';

      if (currentSimState.t1Antenna !== 'dir') {
        fb.style.color = '#b91c1c';
        fb.innerHTML = '⚠️ Una antena omnidireccional escampa l\'energia en totes direccions (360°) i té un abast màxim de només ~4 km. A <strong>7,5 km</strong> és imprescindible una antena <strong>Direccional PTP</strong> d\'alt guany per concentrar el feix cap al cim!';
        return;
      }

      if (currentSimState.t1Power < 20) {
        fb.style.color = '#b91c1c';
        fb.innerHTML = `⚠️ Has triat antena Direccional, però la potència actual (${currentSimState.t1Power} dBm) no és suficient per superar les pèrdues d'espai lliure a 7,5 km. Puja la potència a <strong>&ge; 20 dBm</strong>!`;
        return;
      }

      // Encert!
      wimaxSolved.add(1);
      updateWimaxScoreUI();
      if (stBadge) {
        stBadge.textContent = 'Superat ✓';
        stBadge.className = 'status-badge status-ok';
        stBadge.style.background = '#dcfce7';
        stBadge.style.color = '#15803d';
      }
      if (card) card.style.borderColor = '#22c55e';
      fb.style.color = '#15803d';
      fb.innerHTML = `✅ <strong>Molt bona feina!</strong> L'enllaç troncal T1 ➔ T2 s'ha establert correctament a 7,5 km gràcies al feix estret de l'antena direccional i una potència d'emissió de ${currentSimState.t1Power} dBm. El repetidor del cim ja rep internet!`;

    } else if (challengeNum === 2) {
      const fb = document.getElementById('wimaxCh2Feedback');
      const stBadge = document.getElementById('wimaxCh2Status');
      const card = document.getElementById('wimaxCh2Card');
      if (!fb) return;
      fb.style.display = 'block';

      if (!currentSimState.link1Active) {
        fb.style.color = '#b91c1c';
        fb.innerHTML = '⚠️ Primer has de tenir operatiu l\'enllaç troncal T1 ➔ T2 (Repte 1) perquè el repetidor rebi senyal abans de poder retransmetre!';
        return;
      }

      if (currentSimState.t2Antenna !== 'dir') {
        fb.style.color = '#b91c1c';
        fb.innerHTML = '⚠️ Per cobrir <strong>6,2 km</strong> des del cim fins a la vall, una antena omnidireccional no té prou guany. Cal una antena <strong>Direccional PTP</strong> cap a la Torre 3!';
        return;
      }

      if (currentSimState.t2Power < 20) {
        fb.style.color = '#b91c1c';
        fb.innerHTML = `⚠️ La potència de la Torre 2 (${currentSimState.t2Power} dBm) és massa baixa per als 6,2 km. Augmenta la potència a <strong>&ge; 20 dBm</strong>.`;
        return;
      }

      // Encert!
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
      fb.innerHTML = `✅ <strong>Excel·lent!</strong> El salt troncal del repetidor T2 ➔ T3 (6,2 km) està actiu. La connexió d'alta velocitat ha arribat des del cim fins a la Torre de distribució comunitària a la vall!`;

    } else if (challengeNum === 3) {
      const fb = document.getElementById('wimaxCh3Feedback');
      const stBadge = document.getElementById('wimaxCh3Status');
      const card = document.getElementById('wimaxCh3Card');
      if (!fb) return;
      fb.style.display = 'block';

      if (!currentSimState.link2Active) {
        fb.style.color = '#b91c1c';
        fb.innerHTML = '⚠️ Per poder distribuir internet a la vall, primer cal tenir actius els enllaços previs (T1 ➔ T2 i T2 ➔ T3)!';
        return;
      }

      if (currentSimState.t3Antenna === 'dir') {
        fb.style.color = '#b91c1c';
        fb.innerHTML = '⚠️ Una antena direccional té un feix molt estret (~30°) i només pot apuntar a un sol poble alhora, deixant els altres dos desconnectats. Per donar servei simultani a comunitats situades en direccions oposades cal una antena <strong>Omnidireccional (360°)</strong>!';
        return;
      }

      if (currentSimState.t3Power < 24) {
        fb.style.color = '#b91c1c';
        fb.innerHTML = `⚠️ Com que l'antena omnidireccional reparteix l'energia en 360°, el seu abast és menor. Amb ${currentSimState.t3Power} dBm no s'arriba al poble més allunyat (Escola a 2,4 km). Puja la potència a <strong>&ge; 24 dBm</strong> per connectar els 3 pobles alhora!`;
        return;
      }

      // Encert!
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
      fb.innerHTML = `✅ <strong>Magnífic disseny de xarxa!</strong> Amb antena omnidireccional i potència de ${currentSimState.t3Power} dBm, la Torre 3 cobreix un radi de més de 2,4 km en 360°, connectant simultàniament l'Ambulatori, l'Escola i Chillijchi (<strong>3 / 3 Poblacions</strong>). Has completat la infraestructura comunitària de Pocona!`;
    }
  };

  window.updateWimaxSim = updateWimaxSim;
  window.addEventListener('DOMContentLoaded', updateWimaxSim);
  updateWimaxSim();
})();
