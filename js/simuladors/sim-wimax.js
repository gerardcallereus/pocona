/* ==========================================================
   3.7 SIMULADOR AVANÇAT DE XARXA RURAL: VISTA DE PLANTA TOPOGRÀFICA
   Pocona: Node Dorsal ➔ Repetidor al Cim ➔ Distribució Comunitària
   ========================================================== */

(function() {
  const wimaxCanvas = document.getElementById('wimaxCanvas');
  if (!wimaxCanvas) return;
  const ctx = wimaxCanvas.getContext('2d');

  // Coordenades en Vista de Planta (Mapa Topogràfic 2D)
  // Escala aproximada del mapa: 1 km ≈ 36 píxels
  const T1 = { x: 130, y: 250, name: 'Torre 1 (Node Dorsal)', cota: 2350, distNextKm: 8.5 };
  const T2 = { x: 490, y: 120, name: 'Torre 2 (Repetidor Cim)', cota: 3450, distNextKm: 6.5 };
  const T3 = { x: 770, y: 260, name: 'Torre 3 (Distribució Vall)', cota: 2480 };

  // 3 Poblacions rurals al voltant de Torre 3
  const villages = [
    { id: 'Ambulatori', name: '🏥 Ambulatori Central', x: 890, y: 180, distKm: 1.2, angleDeg: 335 },
    { id: 'Chillijchi', name: '🏡 Comunitat Chillijchi', x: 840, y: 395, distKm: 1.5, angleDeg: 62 },
    { id: 'Escola', name: '🏫 Escola Rural Chimboata', x: 990, y: 295, distKm: 1.8, angleDeg: 10 }
  ];

  let pulseOffset = 0;
  let animTimer = null;

  // Dibuixar corbes de nivell topogràfiques en vista de planta
  function drawTopographicContourLines(w, h) {
    // 1. Relleu de la Serralada / Cim (al voltant de T2)
    const summits = [
      { x: T2.x, y: T2.y, cotaMax: 3450, radMax: 260 }
    ];

    // Corbes de nivell de la muntanya de T2 (cotes 2.600m a 3.400m cada 200m)
    const ridgeContours = [
      { rX: 250, rY: 150, cota: 2600, master: false },
      { rX: 215, rY: 130, cota: 2800, master: true },
      { rX: 180, rY: 110, cota: 3000, master: false },
      { rX: 140, rY: 85,  cota: 3200, master: true },
      { rX: 85,  rY: 55,  cota: 3400, master: false }
    ];

    ctx.save();
    ridgeContours.forEach(c => {
      ctx.beginPath();
      // Forma el·líptica orogràfica allargada (eix de la serralada)
      ctx.ellipse(T2.x + 10, T2.y + 15, c.rX, c.rY, -0.15, 0, Math.PI * 2);
      ctx.strokeStyle = c.master ? 'rgba(217, 119, 6, 0.45)' : 'rgba(148, 163, 184, 0.22)';
      ctx.lineWidth = c.master ? 1.5 : 0.8;
      ctx.stroke();

      // Etiqueta de cota al corrent de la corba mestra
      if (c.master) {
        ctx.fillStyle = 'rgba(217, 119, 6, 0.7)';
        ctx.font = '9px JetBrains Mono';
        ctx.fillText(`${c.cota} m`, T2.x - c.rX + 25, T2.y + 35);
      }
    });

    // 2. Relleu de la Vall de Pocona (al voltant de T1)
    const valley1Contours = [
      { rX: 110, rY: 90, cota: 2400 },
      { rX: 75,  rY: 65, cota: 2300 }
    ];
    valley1Contours.forEach(c => {
      ctx.beginPath();
      ctx.ellipse(T1.x, T1.y, c.rX, c.rY, 0.25, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.2)';
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.fillStyle = 'rgba(100, 116, 139, 0.6)';
      ctx.font = '8px JetBrains Mono';
      ctx.fillText(`${c.cota} m`, T1.x - c.rX + 10, T1.y - 10);
    });

    // 3. Relleu de la Vall Comunitària (al voltant de T3 i pobles)
    const valley3Contours = [
      { rX: 250, rY: 180, cota: 2600 },
      { rX: 190, rY: 140, cota: 2500 }
    ];
    valley3Contours.forEach(c => {
      ctx.beginPath();
      ctx.ellipse(T3.x + 80, T3.y + 20, c.rX, c.rY, 0.1, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.2)';
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.fillStyle = 'rgba(100, 116, 139, 0.6)';
      ctx.font = '8px JetBrains Mono';
      ctx.fillText(`${c.cota} m`, T3.x + c.rX - 40, T3.y + 40);
    });

    // 4. Graella de Coordenades UTM / Cartografia
    ctx.strokeStyle = 'rgba(51, 65, 85, 0.25)';
    ctx.lineWidth = 0.75;
    for (let x = 60; x < w; x += 110) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 45; y < h; y += 75) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // 5. Rosa dels vents (Nord) a dalt a la dreta
    const compassX = w - 45;
    const compassY = 40;
    ctx.fillStyle = 'rgba(148, 163, 184, 0.7)';
    ctx.font = 'bold 11px Outfit';
    ctx.fillText('N', compassX - 4, compassY - 14);

    ctx.beginPath();
    ctx.moveTo(compassX, compassY - 12);
    ctx.lineTo(compassX + 5, compassY + 8);
    ctx.lineTo(compassX, compassY + 4);
    ctx.closePath();
    ctx.fillStyle = '#38bdf8';
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(compassX, compassY - 12);
    ctx.lineTo(compassX - 5, compassY + 8);
    ctx.lineTo(compassX, compassY + 4);
    ctx.closePath();
    ctx.fillStyle = '#64748b';
    ctx.fill();

    // 6. Escala gràfica cartogràfica a baix a l'esquerra
    const scaleBarX = 25;
    const scaleBarY = h - 20;
    const pxPer2Km = 72; // ~36px per km

    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(scaleBarX, scaleBarY);
    ctx.lineTo(scaleBarX + pxPer2Km, scaleBarY);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(scaleBarX, scaleBarY - 4);
    ctx.lineTo(scaleBarX, scaleBarY + 4);
    ctx.moveTo(scaleBarX + pxPer2Km, scaleBarY - 4);
    ctx.lineTo(scaleBarX + pxPer2Km, scaleBarY + 4);
    ctx.stroke();

    ctx.fillStyle = '#94a3b8';
    ctx.font = '10px JetBrains Mono';
    ctx.fillText('0', scaleBarX - 3, scaleBarY - 7);
    ctx.fillText('2 km', scaleBarX + pxPer2Km - 12, scaleBarY - 7);

    // Etiqueta de la vista
    ctx.fillStyle = 'rgba(148, 163, 184, 0.5)';
    ctx.font = '10px JetBrains Mono';
    ctx.fillText('VISTA DE PLANTA • CARTOGRAFIA TOPOGRÀFICA POCONA', scaleBarX + pxPer2Km + 25, scaleBarY - 2);

    ctx.restore();
  }

  function updateWimaxSim() {
    const w = wimaxCanvas.width;
    const h = wimaxCanvas.height;

    // Controls Torre 1
    const t1Antenna = document.getElementById('wimaxT1Antenna')?.value || '';
    const t1Power = parseInt(document.getElementById('wimaxT1PowerSlider')?.value || 15, 10);
    const t1Mw = Math.round(Math.pow(10, t1Power / 10));
    const t1PwrLbl = document.getElementById('wimaxT1PowerLabel');
    if (t1PwrLbl) t1PwrLbl.textContent = `${t1Power} dBm (${t1Mw} mW)`;

    // Controls Torre 2
    const t2Antenna = document.getElementById('wimaxT2Antenna')?.value || '';
    const t2Power = parseInt(document.getElementById('wimaxT2PowerSlider')?.value || 15, 10);
    const t2Mw = Math.round(Math.pow(10, t2Power / 10));
    const t2PwrLbl = document.getElementById('wimaxT2PowerLabel');
    if (t2PwrLbl) t2PwrLbl.textContent = `${t2Power} dBm (${t2Mw} mW)`;

    // Controls Torre 3
    const t3Antenna = document.getElementById('wimaxT3Antenna')?.value || '';
    const t3Power = parseInt(document.getElementById('wimaxT3PowerSlider')?.value || 15, 10);
    const t3Mw = Math.round(Math.pow(10, t3Power / 10));
    const t3PwrLbl = document.getElementById('wimaxT3PowerLabel');
    if (t3PwrLbl) t3PwrLbl.textContent = `${t3Power} dBm (${t3Mw} mW)`;

    // --- CÀLCULS D'ENGINYERIA I COBERTURA ---
    // Enllaç 1: T1 ➔ T2 (8,5 km reals)
    // Direccional: a 20 dBm assoleix exactament 8,5 km. A 30 dBm fins a 13 km.
    // Omnidireccional: abast màxim limitat a 3,8 km (mai no arriba a 8,5 km).
    const t1HasAntenna = Boolean(t1Antenna);
    const t1MaxDistKm = (t1Antenna === 'dir') ? (6.0 + (t1Power - 15) * 0.5) : (t1Antenna === 'omni' ? (1.8 + (t1Power - 15) * 0.13) : 0);
    const link1Active = (t1Antenna === 'dir' && t1Power >= 20);

    // Enllaç 2: T2 ➔ T3 (6,5 km reals)
    // Requereix internet de T1.
    // Direccional: a 20 dBm assoleix 6,5 km.
    const t2HasAntenna = Boolean(t2Antenna);
    const t2MaxDistKm = (t2Antenna === 'dir') ? (5.0 + (t2Power - 15) * 0.45) : (t2Antenna === 'omni' ? (1.8 + (t2Power - 15) * 0.13) : 0);
    const link2Active = link1Active && (t2Antenna === 'dir' && t2Power >= 20);

    // Enllaç 3: T3 ➔ Pobles (1,2 km, 1,5 km, 1,8 km)
    // Requereix internet de T2.
    // Si és omni: a 15 dBm -> 0.8 km (0 pobles).
    //             a 20 dBm -> 1.3 km (Ambulatori OK).
    //             a 22 dBm -> 1.6 km (Ambulatori i Chillijchi OK).
    //             a >= 24 dBm -> >= 1.9 km (Tots 3 pobles OK!).
    // Si és direccional: feix estret de 30° apuntant cap a l'Ambulatori (només 1 poble!).
    const t3HasAntenna = Boolean(t3Antenna);
    const t3MaxDistKm = (t3Antenna === 'omni') ? (0.8 + (t3Power - 15) * 0.12) : (t3Antenna === 'dir' ? (2.5 + (t3Power - 15) * 0.2) : 0);

    // Actualitzar Badges de les Torres
    const t1Badge = document.getElementById('t1LinkBadge');
    if (t1Badge) {
      if (!t1HasAntenna) {
        t1Badge.className = 'status-badge status-danger';
        t1Badge.textContent = '🔴 Sense Antena';
      } else if (link1Active) {
        t1Badge.className = 'status-badge status-ok';
        t1Badge.textContent = '🟢 Enllaç Actiu (8,5 km)';
      } else {
        t1Badge.className = 'status-badge status-danger';
        t1Badge.textContent = (t1Antenna === 'omni') ? 'Abast insuficient (Omni 360°)' : 'Potència insuficient (< 20 dBm)';
      }
    }

    const t2Badge = document.getElementById('t2LinkBadge');
    if (t2Badge) {
      if (!t1HasAntenna || !link1Active) {
        t2Badge.className = 'status-badge status-danger';
        t2Badge.textContent = '🔴 Inactiva (Esperant T1)';
      } else if (!t2HasAntenna) {
        t2Badge.className = 'status-badge status-warn';
        t2Badge.textContent = '⚠️ Tria Antena per T2';
      } else if (link2Active) {
        t2Badge.className = 'status-badge status-ok';
        t2Badge.textContent = '🟢 Enllaç Actiu (6,5 km)';
      } else {
        t2Badge.className = 'status-badge status-danger';
        t2Badge.textContent = (t2Antenna === 'omni') ? 'Abast insuficient (Omni 360°)' : 'Potència insuficient (< 20 dBm)';
      }
    }

    // Avaluar pobles
    let connectedVillagesCount = 0;
    const villageStatuses = {};

    villages.forEach(v => {
      let covered = false;
      let rxPower = -99;

      if (link2Active && t3HasAntenna) {
        if (t3Antenna === 'omni') {
          if (t3MaxDistKm >= v.distKm) {
            covered = true;
            // Nivell senyal rebut RSSI (dBm)
            rxPower = Math.round(t3Power + 8 - (32.4 + 20 * Math.log10(5800) + 20 * Math.log10(v.distKm)));
          } else {
            rxPower = -95;
          }
        } else if (t3Antenna === 'dir') {
          // Apunta només a l'Ambulatori
          if (v.id === 'Ambulatori' && t3MaxDistKm >= v.distKm) {
            covered = true;
            rxPower = Math.round(t3Power + 24 - (32.4 + 20 * Math.log10(5800) + 20 * Math.log10(v.distKm)));
          } else {
            covered = false;
            rxPower = -99;
          }
        }
      }

      if (covered) connectedVillagesCount++;
      villageStatuses[v.id] = { covered, rxPower };

      const badge = document.getElementById(`stat${v.id}Badge`);
      const txt = document.getElementById(`stat${v.id}Text`);
      if (badge && txt) {
        if (!link2Active) {
          badge.className = 'status-badge status-danger';
          badge.textContent = 'Desconnectat';
          txt.textContent = 'Estat: Sense senyal de xarxa troncal';
        } else if (!t3HasAntenna) {
          badge.className = 'status-badge status-danger';
          badge.textContent = 'Sense Antena';
          txt.textContent = 'Estat: Configura la Torre 3';
        } else if (covered) {
          badge.className = 'status-badge status-ok';
          badge.textContent = `${rxPower} dBm`;
          txt.textContent = 'Estat: Connectat i operatiu (Internet actiu)';
        } else {
          badge.className = 'status-badge status-danger';
          badge.textContent = `${rxPower} dBm`;
          txt.textContent = (t3Antenna === 'dir') ? 'Estat: Fora del feix direccional' : 'Estat: Fora d\'abast (puja potència)';
        }
      }
    });

    const t3Badge = document.getElementById('t3CoverageBadge');
    if (t3Badge) {
      if (!link2Active) {
        t3Badge.className = 'status-badge status-danger';
        t3Badge.textContent = '🔴 Inactiva (Esperant T2)';
      } else if (!t3HasAntenna) {
        t3Badge.className = 'status-badge status-warn';
        t3Badge.textContent = '⚠️ Tria Antena per T3';
      } else if (connectedVillagesCount === 3) {
        t3Badge.className = 'status-badge status-ok';
        t3Badge.textContent = '🟢 3 / 3 Pobles Connectats';
      } else {
        t3Badge.className = 'status-badge status-warn';
        t3Badge.textContent = `🟡 ${connectedVillagesCount} / 3 Pobles`;
      }
    }

    // Telemetria inferior
    const t1t2Stat = document.getElementById('wimaxT1T2Stat');
    if (t1t2Stat) {
      t1t2Stat.textContent = link1Active ? '8,5 km (Actiu OK)' : (!t1HasAntenna ? 'Sense Antena' : 'Tallat (< 20 dBm / Omni)');
      t1t2Stat.style.color = link1Active ? '#16a34a' : '#ef4444';
    }

    const t2t3Stat = document.getElementById('wimaxT2T3Stat');
    if (t2t3Stat) {
      t2t3Stat.textContent = link2Active ? '6,5 km (Actiu OK)' : (!link1Active ? 'Inactiu (Falta T1)' : (!t2HasAntenna ? 'Sense Antena' : 'Tallat'));
      t2t3Stat.style.color = link2Active ? '#16a34a' : '#ef4444';
    }

    const globalStat = document.getElementById('wimaxGlobalStat');
    if (globalStat) {
      if (link1Active && link2Active && connectedVillagesCount === 3) {
        globalStat.textContent = '100% Operativa 🎉';
        globalStat.style.color = '#16a34a';
      } else if (connectedVillagesCount > 0) {
        globalStat.textContent = `${connectedVillagesCount}/3 Pobles Connectats`;
        globalStat.style.color = '#eab308';
      } else {
        globalStat.textContent = 'Desconnectada';
        globalStat.style.color = '#ef4444';
      }
    }

    const connBadge = document.getElementById('wimaxConnectedCountBadge');
    if (connBadge) {
      connBadge.textContent = `${connectedVillagesCount} / 3 Poblacions`;
      connBadge.className = (connectedVillagesCount === 3) ? 'status-badge status-ok' : (connectedVillagesCount > 0 ? 'status-badge status-warn' : 'status-badge status-danger');
    }

    // ----------------------------------------------------
    // DIBUIX DEL CANVAS EN VISTA DE PLANTA
    // ----------------------------------------------------
    ctx.clearRect(0, 0, w, h);

    // Fons cartogràfic tècnic fosc
    ctx.fillStyle = '#080d1a';
    ctx.fillRect(0, 0, w, h);

    // Dibuixar corbes de nivell topogràfiques
    drawTopographicContourLines(w, h);

    // 1. FEIX / COBERTURA TORRE 1 (VISTA DE PLANTA)
    if (t1HasAntenna) {
      const t1PixelRadius = Math.min(410, (t1MaxDistKm / 8.5) * 380);

      if (t1Antenna === 'dir') {
        const ang = Math.atan2(T2.y - T1.y, T2.x - T1.x);
        const halfBeam = (16 * Math.PI) / 180; // 32° obertura en planta

        const grad = ctx.createRadialGradient(T1.x, T1.y, 4, T1.x, T1.y, t1PixelRadius);
        grad.addColorStop(0, link1Active ? 'rgba(56, 189, 248, 0.75)' : 'rgba(239, 68, 68, 0.55)');
        grad.addColorStop(0.65, link1Active ? 'rgba(14, 165, 233, 0.25)' : 'rgba(239, 68, 68, 0.18)');
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
        // Omnidireccional 360° en vista de planta (cercle concèntric)
        const grad = ctx.createRadialGradient(T1.x, T1.y, 4, T1.x, T1.y, t1PixelRadius);
        grad.addColorStop(0, 'rgba(239, 68, 68, 0.45)');
        grad.addColorStop(0.7, 'rgba(239, 68, 68, 0.15)');
        grad.addColorStop(1, 'rgba(239, 68, 68, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(T1.x, T1.y, t1PixelRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }

    // Línia troncal T1 ➔ T2
    if (link1Active) {
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2.5;
      ctx.setLineDash([6, 6]);
      ctx.beginPath();
      ctx.moveTo(T1.x, T1.y);
      ctx.lineTo(T2.x, T2.y);
      ctx.stroke();
      ctx.setLineDash([]);

      // Paquet de dades
      pulseOffset = (pulseOffset + 1.2) % 30;
      const t = pulseOffset / 30;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(T1.x + (T2.x - T1.x) * t, T1.y + (T2.y - T1.y) * t, 4, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.35)';
      ctx.lineWidth = 1.2;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(T1.x, T1.y);
      ctx.lineTo(T2.x, T2.y);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // 2. FEIX / COBERTURA TORRE 2 (Repetidor Cim)
    if (link1Active && t2HasAntenna) {
      const t2PixelRadius = Math.min(350, (t2MaxDistKm / 6.5) * 315);

      if (t2Antenna === 'dir') {
        const ang = Math.atan2(T3.y - T2.y, T3.x - T2.x);
        const halfBeam = (16 * Math.PI) / 180;

        const grad = ctx.createRadialGradient(T2.x, T2.y, 4, T2.x, T2.y, t2PixelRadius);
        grad.addColorStop(0, link2Active ? 'rgba(168, 85, 247, 0.75)' : 'rgba(239, 68, 68, 0.55)');
        grad.addColorStop(0.65, link2Active ? 'rgba(147, 51, 234, 0.25)' : 'rgba(239, 68, 68, 0.18)');
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
        grad.addColorStop(0, 'rgba(239, 68, 68, 0.45)');
        grad.addColorStop(1, 'rgba(239, 68, 68, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(T2.x, T2.y, t2PixelRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }

    // Línia troncal T2 ➔ T3
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
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(T2.x + (T3.x - T2.x) * t, T2.y + (T3.y - T2.y) * t, 4, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.35)';
      ctx.lineWidth = 1.2;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(T2.x, T2.y);
      ctx.lineTo(T3.x, T3.y);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // 3. COBERTURA TORRE 3 (Distribució Comunitària a la Vall)
    if (link2Active && t3HasAntenna) {
      // Escala visual local per a la vall: 1,8 km ≈ 225 píxels
      const t3PixelRadius = (t3MaxDistKm / 1.8) * 225;

      if (t3Antenna === 'omni') {
        const grad = ctx.createRadialGradient(T3.x, T3.y, 4, T3.x, T3.y, t3PixelRadius);
        grad.addColorStop(0, 'rgba(34, 197, 94, 0.65)');
        grad.addColorStop(0.65, 'rgba(16, 185, 129, 0.22)');
        grad.addColorStop(1, 'rgba(16, 185, 129, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(T3.x, T3.y, t3PixelRadius, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = (connectedVillagesCount === 3) ? '#22c55e' : '#eab308';
        ctx.lineWidth = 2;
        ctx.stroke();
      } else {
        // Feix direccional estret (30°) en vista de planta apuntant a l'Ambulatori
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

      // Línia d'enllaç actiu des de T3
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
      ctx.fillText(`(${v.distKm} km)`, v.x - 10, v.y + 36);
    });

    // 5. DIBUIXAR LES 3 TORRES AMB COTES TOPOGRÀFIQUES
    // Torre 1
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(T1.x, T1.y, 9, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = link1Active ? '#38bdf8' : '#ef4444';
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 12px Outfit';
    ctx.fillText('🗼 T1: Dorsal', T1.x - 45, T1.y - 18);
    ctx.font = '10px JetBrains Mono';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText(`(${T1.cota} m)`, T1.x - 22, T1.y + 24);

    // Torre 2 (Cim)
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(T2.x, T2.y, 9, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = link2Active ? '#a855f7' : '#64748b';
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.fillStyle = link1Active ? '#c084fc' : '#94a3b8';
    ctx.font = 'bold 12px Outfit';
    ctx.fillText('⛰️ T2: Repetidor Cim', T2.x - 55, T2.y - 18);
    ctx.font = '10px JetBrains Mono';
    ctx.fillStyle = '#d97706';
    ctx.fillText(`(${T2.cota} m)`, T2.x - 25, T2.y + 24);

    // Torre 3 (Vall)
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(T3.x, T3.y, 9, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = (connectedVillagesCount === 3) ? '#22c55e' : '#64748b';
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.fillStyle = link2Active ? '#4ade80' : '#94a3b8';
    ctx.font = 'bold 12px Outfit';
    ctx.fillText('🏘️ T3: Distribució', T3.x - 45, T3.y - 18);
    ctx.font = '10px JetBrains Mono';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText(`(${T3.cota} m)`, T3.x - 22, T3.y - 32);

    // Etiquetes de distàncies sobre les línies troncals
    ctx.fillStyle = '#94a3b8';
    ctx.font = '11px JetBrains Mono';
    ctx.fillText('Troncal 8,5 km', (T1.x + T2.x) / 2 - 40, (T1.y + T2.y) / 2 - 12);
    ctx.fillText('Troncal 6,5 km', (T2.x + T3.x) / 2 - 40, (T2.y + T3.y) / 2 - 12);

    // Desar estat actual per a la comprovació dels reptes
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

  // Estat del simulador
  let currentSimState = {
    t1Antenna: '',
    t1Power: 15,
    link1Active: false,
    t2Antenna: '',
    t2Power: 15,
    link2Active: false,
    t3Antenna: '',
    t3Power: 15,
    connectedVillagesCount: 0
  };

  const wimaxSolved = new Set();

  function updateWimaxScoreUI() {
    const solvedSpan = document.getElementById('wimaxSolvedCount');
    if (solvedSpan) solvedSpan.textContent = wimaxSolved.size;
    const badge = document.getElementById('wimaxScoreBadge');
    if (badge) {
      if (wimaxSolved.size === 5) {
        badge.className = 'badge badge-success';
        badge.style.background = '#16a34a';
        badge.style.color = '#ffffff';
        badge.textContent = '🎉 Missió WiMAX Completada! (5/5)';
      } else {
        badge.className = 'badge badge-cyan';
        badge.innerHTML = `Progrés: <span id="wimaxSolvedCount">${wimaxSolved.size}</span>/5 completats`;
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

      if (!currentSimState.t1Antenna) {
        fb.style.color = '#b91c1c';
        fb.innerHTML = '⚠️ Has de seleccionar un tipus d\'antena per a la <strong>Torre 1</strong> al desplegable del simulador.';
        return;
      }

      if (currentSimState.t1Antenna !== 'dir') {
        fb.style.color = '#b91c1c';
        fb.innerHTML = '⚠️ Una antena omnidireccional dispersa l\'energia en totes direccions (360°) i el seu abast màxim no arriba a 4 km. A <strong>8,5 km</strong> és imprescindible una antena <strong>Direccional PTP</strong> d\'alt guany (24 dBi) per concentrar el feix!';
        return;
      }

      if (currentSimState.t1Power < 20) {
        fb.style.color = '#b91c1c';
        fb.innerHTML = `⚠️ Has triat antena Direccional, però la potència actual (${currentSimState.t1Power} dBm) no és suficient per cobrir 8,5 km. Puja la potència a <strong>&ge; 20 dBm</strong>!`;
        return;
      }

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
      fb.innerHTML = `✅ <strong>Molt bona feina!</strong> L'enllaç dorsal T1 ➔ T2 s'ha establert a <strong>8,5 km</strong> amb antena direccional i potència de ${currentSimState.t1Power} dBm. El repetidor del cim ja rep internet!`;

    } else if (challengeNum === 2) {
      const fb = document.getElementById('wimaxCh2Feedback');
      const stBadge = document.getElementById('wimaxCh2Status');
      const card = document.getElementById('wimaxCh2Card');
      if (!fb) return;
      fb.style.display = 'block';

      if (!currentSimState.link1Active) {
        fb.style.color = '#b91c1c';
        fb.innerHTML = '⚠️ Primer has de tenir actiu l\'enllaç troncal T1 ➔ T2 (Repte 1) perquè el repetidor rebi el senyal abans de poder retransmetre!';
        return;
      }

      if (!currentSimState.t2Antenna) {
        fb.style.color = '#b91c1c';
        fb.innerHTML = '⚠️ Has de seleccionar un tipus d\'antena per a la <strong>Torre 2</strong> al simulador.';
        return;
      }

      if (currentSimState.t2Antenna !== 'dir') {
        fb.style.color = '#b91c1c';
        fb.innerHTML = '⚠️ Per cobrir <strong>6,5 km</strong> des del cim fins a la vall, una antena omnidireccional no té prou guany. Cal una antena <strong>Direccional PTP</strong>!';
        return;
      }

      if (currentSimState.t2Power < 20) {
        fb.style.color = '#b91c1c';
        fb.innerHTML = `⚠️ La potència de la Torre 2 (${currentSimState.t2Power} dBm) és insuficient per als 6,5 km. Puja-la a <strong>&ge; 20 dBm</strong>!`;
        return;
      }

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
      fb.innerHTML = `✅ <strong>Excel·lent!</strong> El salt de repetició T2 ➔ T3 (<strong>6,5 km</strong>) està operatiu. La connexió troncal ha arribat fins a la Torre de distribució a la vall!`;

    } else if (challengeNum === 3) {
      const fb = document.getElementById('wimaxCh3Feedback');
      const stBadge = document.getElementById('wimaxCh3Status');
      const card = document.getElementById('wimaxCh3Card');
      if (!fb) return;
      fb.style.display = 'block';

      if (!currentSimState.link2Active) {
        fb.style.color = '#b91c1c';
        fb.innerHTML = '⚠️ Per distribuir internet als pobles, primer cal tenir actius els enllaços previs (T1 ➔ T2 i T2 ➔ T3)!';
        return;
      }

      if (!currentSimState.t3Antenna) {
        fb.style.color = '#b91c1c';
        fb.innerHTML = '⚠️ Has de seleccionar un tipus d\'antena per a la <strong>Torre 3</strong> al simulador.';
        return;
      }

      if (currentSimState.t3Antenna === 'dir') {
        fb.style.color = '#b91c1c';
        fb.innerHTML = '⚠️ Una antena direccional té un feix estret de 30° i només pot apuntar a un poble (Ambulatori), deixant Chillijchi i l\'Escola sense servei. Per donar cobertura simultània en direccions diferents cal una antena <strong>Omnidireccional (360°)</strong>!';
        return;
      }

      if (currentSimState.t3Power < 24) {
        fb.style.color = '#b91c1c';
        fb.innerHTML = `⚠️ Com que l'antena omnidireccional escampa l'energia en 360°, cal més potència per arribar al poble més llunyà (Escola a 1,8 km). Amb ${currentSimState.t3Power} dBm l'abast és insuficient. Puja la potència a <strong>&ge; 24 dBm</strong>!`;
        return;
      }

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
      fb.innerHTML = `✅ <strong>Magnífic disseny de xarxa!</strong> Amb antena omnidireccional i potència de ${currentSimState.t3Power} dBm, la Torre 3 assoleix un radi de més d'1,8 km en 360°, cobrint simultàniament l'Ambulatori, Chillijchi i l'Escola (<strong>3 / 3 Poblacions Connectades</strong>).`;

    } else if (challengeNum === 4) {
      const inp = document.getElementById('wimaxCh4Input');
      const fb = document.getElementById('wimaxCh4Feedback');
      const stBadge = document.getElementById('wimaxCh4Status');
      const card = document.getElementById('wimaxCh4Card');
      if (!inp || !fb) return;

      fb.style.display = 'block';
      const val = parseInt(inp.value, 10);

      if (val === 44 || val === 43) {
        wimaxSolved.add(4);
        updateWimaxScoreUI();
        if (stBadge) {
          stBadge.textContent = 'Superat ✓';
          stBadge.className = 'status-badge status-ok';
          stBadge.style.background = '#dcfce7';
          stBadge.style.color = '#15803d';
        }
        if (card) card.style.borderColor = '#22c55e';
        fb.style.color = '#15803d';
        fb.innerHTML = `✅ <strong>Càlcul impecable!</strong> PIRE = 20 dBm (transmissor) + 24 dBi (guany antena) = <strong>44 dBm</strong>. Això equival a 25.000 mW (25 W) de potència radiada efectiva a l'aire gràcies a la concentració del feix de la parabòlica, consumint només 100 mW elèctrics de la placa solar!`;
      } else {
        fb.style.color = '#b91c1c';
        fb.innerHTML = `⚠️ Valor incorrecte (${isNaN(val) ? 'cap valor' : val + ' dBm'}). Recorda que en escala logarítmica es fa una simple suma: PIRE = Potència (20 dBm) + Guany (24 dBi). Quant suma 20 + 24?`;
      }

    } else if (challengeNum === 5) {
      const sel = document.getElementById('wimaxCh5Select');
      const fb = document.getElementById('wimaxCh5Feedback');
      const stBadge = document.getElementById('wimaxCh5Status');
      const card = document.getElementById('wimaxCh5Card');
      if (!sel || !fb) return;

      fb.style.display = 'block';
      if (sel.value === 'gain') {
        wimaxSolved.add(5);
        updateWimaxScoreUI();
        if (stBadge) {
          stBadge.textContent = 'Superat ✓';
          stBadge.className = 'status-badge status-ok';
          stBadge.style.background = '#dcfce7';
          stBadge.style.color = '#15803d';
        }
        if (card) card.style.borderColor = '#22c55e';
        fb.style.color = '#15803d';
        fb.innerHTML = `✅ <strong>Raonament físic excel·lent!</strong> Per la llei de conservació de l'energia, si reparteixes els mateixos watts en 360° en totes direccions, la densitat d'energia que arriba a qualsevol punt concret disminueix ràpidament ($1/d^2$). En canvi, l'antena direccional canalitza tota l'energia cap a una única direcció, assolint molts més quilòmetres d'abast amb la mateixa despesa de bateria.`;
      } else {
        fb.style.color = '#b91c1c';
        fb.innerHTML = '⚠️ Resposta incorrecta. Pensa en la comparativa de la llanterna: per què un far o llanterna amb lent concentradora il·lumina molt més lluny que una bombeta nua que il·lumina en 360°?';
      }
    }
  };

  window.updateWimaxSim = updateWimaxSim;
  window.addEventListener('DOMContentLoaded', updateWimaxSim);
  updateWimaxSim();
})();
