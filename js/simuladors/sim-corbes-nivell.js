/* ==========================================================
   SIMULADOR DIDÀCTIC 2: CORBES DE NIVELL (ISOHIPSES)
   Relleu Andí Irregular, Gran Format i Cotes Retolades
   ========================================================== */

(function() {
  const mapCanvas = document.getElementById('contourMapCanvas');
  const d3Canvas = document.getElementById('contour3dCanvas');
  if (!mapCanvas || !d3Canvas) return;

  const ctxMap = mapCanvas.getContext('2d');
  const ctx3d = d3Canvas.getContext('2d');

  // Posició inicial del punter de sondeig (al voltant del coll de muntanya)
  let probePos = { x: 520, y: 240 };

  const W = mapCanvas.width;   // 1000
  const H = mapCanvas.height;  // 480

  // Resolució de la graella de Marching Squares (125x60 = 7.500 cel·les, < 1ms)
  const NX = 125;
  const NY = 60;
  const DX = W / NX;
  const DY = H / NY;

  // Centres i paràmetres dels massissos andins
  const peak1 = { x: 320, y: 210, name: 'Cim Nord (Pocona)', h: 3400 };
  const peak2 = { x: 720, y: 260, name: 'Cim Sud (Chillijchi)', h: 3100 };
  const BASE_ALT = 2200;

  // Cache de la graella d'elevacions
  let cachedGrid = null;
  let cachedP1H = null;
  let cachedP2H = null;

  // Funció matemàtica contínua d'altitud (Relleu Andí Irregular amb arestes i coll)
  function getAltitude(x, y, p1HOverride, p2HOverride) {
    const p1H = p1HOverride !== undefined ? p1HOverride : parseInt(document.getElementById('peak1HSlider')?.value || 3400);
    const p2H = p2HOverride !== undefined ? p2HOverride : parseInt(document.getElementById('peak2HSlider')?.value || 3100);

    peak1.h = p1H;
    peak2.h = p2H;

    // 1. Massís 1: Cim Nord (amb deformació asimètrica i esperons)
    const dx1 = x - peak1.x;
    const dy1 = y - peak1.y;
    const d1 = Math.hypot(dx1, dy1);
    const th1 = Math.atan2(dy1, dx1);

    // Radi irregular per al massís 1 (esperons cap al NW, SE i NE)
    const r1Factor = 1.0 
      + 0.22 * Math.cos(2 * (th1 + 0.45)) 
      + 0.16 * Math.cos(3 * (th1 - 0.75)) 
      + 0.11 * Math.sin(5 * (th1 - 0.2));
    const r1 = 280 * r1Factor;

    let h1 = 0;
    if (d1 < r1) {
      const u1 = d1 / r1;
      h1 = (p1H - BASE_ALT) * Math.pow(Math.cos(u1 * Math.PI / 2), 2.1);
    }

    // 2. Massís 2: Cim Sud (amb deformació asimètrica diferent)
    const dx2 = x - peak2.x;
    const dy2 = y - peak2.y;
    const d2 = Math.hypot(dx2, dy2);
    const th2 = Math.atan2(dy2, dx2);

    const r2Factor = 1.0 
      + 0.24 * Math.cos(2 * (th2 - 0.65)) 
      + 0.15 * Math.cos(3 * (th2 + 0.5)) 
      + 0.10 * Math.sin(5 * (th2 - 1.1));
    const r2 = 260 * r2Factor;

    let h2 = 0;
    if (d2 < r2) {
      const u2 = d2 / r2;
      h2 = (p2H - BASE_ALT) * Math.pow(Math.cos(u2 * Math.PI / 2), 2.1);
    }

    // 3. Cordal i Coll de Muntanya (Saddle entre els dos cims)
    const segDx = peak2.x - peak1.x;
    const segDy = peak2.y - peak1.y;
    const segLenSq = segDx * segDx + segDy * segDy;
    const t = Math.max(0, Math.min(1, (dx1 * segDx + dy1 * segDy) / segLenSq));
    const projX = peak1.x + t * segDx;
    const projY = peak1.y + t * segDy;
    const distToRidge = Math.hypot(x - projX, y - projY);

    const ridgeWidth = 110 + 35 * Math.sin(t * Math.PI);
    let ridgeH = 0;
    if (distToRidge < ridgeWidth && t > 0.12 && t < 0.88) {
      const saddleMax = Math.min(p1H, p2H) - 420; // Alçada del pas natural
      const saddleLift = (saddleMax - BASE_ALT) * Math.sin(t * Math.PI);
      const uRidge = distToRidge / ridgeWidth;
      ridgeH = saddleLift * Math.pow(Math.cos(uRidge * Math.PI / 2), 2);
    }

    // 4. Micro-relleu i erosió orgànica
    const noise = 32 * Math.sin(x * 0.018 + y * 0.014) * Math.cos(x * 0.013 - y * 0.016)
                + 18 * Math.sin(x * 0.033 - y * 0.024)
                + 10 * Math.cos(x * 0.052 + y * 0.041);

    const edgeDist = Math.min(x, W - x, y, H - y);
    const edgeFade = Math.max(0, Math.min(1, edgeDist / 50));

    const mountainRelief = Math.max(h1, h2, ridgeH) + 0.28 * Math.min(h1, h2);
    const total = BASE_ALT + mountainRelief + noise * (mountainRelief / 800) * edgeFade;

    const maxLimit = Math.max(p1H, p2H);
    return Math.max(BASE_ALT, Math.min(maxLimit, Math.round(total)));
  }

  // Càlcul de la graella d'elevacions
  function getGrid(p1H, p2H) {
    if (cachedGrid && cachedP1H === p1H && cachedP2H === p2H) {
      return cachedGrid;
    }
    const grid = [];
    for (let j = 0; j <= NY; j++) {
      const row = new Float32Array(NX + 1);
      const y = j * DY;
      for (let i = 0; i <= NX; i++) {
        const x = i * DX;
        row[i] = getAltitude(x, y, p1H, p2H);
      }
      grid.push(row);
    }
    cachedGrid = grid;
    cachedP1H = p1H;
    cachedP2H = p2H;
    return cachedGrid;
  }

  // Funció auxiliar per dibuixar rectangles amb cantonades arrodonides
  function drawPill(ctx, x, y, w, h, r, fillColor, strokeColor) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
    if (fillColor) {
      ctx.fillStyle = fillColor;
      ctx.fill();
    }
    if (strokeColor) {
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }

  // Algorisme de Marching Squares per extreure segments d'isohipses
  function getContourSegments(grid, alt) {
    const segments = [];

    for (let j = 0; j < NY; j++) {
      const y0 = j * DY;
      const y1 = (j + 1) * DY;

      for (let i = 0; i < NX; i++) {
        const x0 = i * DX;
        const x1 = (i + 1) * DX;

        const v0 = grid[j][i];
        const v1 = grid[j][i + 1];
        const v2 = grid[j + 1][i + 1];
        const v3 = grid[j + 1][i];

        let mask = 0;
        if (v0 >= alt) mask |= 1;
        if (v1 >= alt) mask |= 2;
        if (v2 >= alt) mask |= 4;
        if (v3 >= alt) mask |= 8;

        if (mask === 0 || mask === 15) continue;

        // Punts d'interpolació als 4 costats de la cel·la
        const top = {
          x: x0 + ((alt - v0) / ((v1 - v0) || 1e-6)) * DX,
          y: y0
        };
        const right = {
          x: x1,
          y: y0 + ((alt - v1) / ((v2 - v1) || 1e-6)) * DY
        };
        const bottom = {
          x: x0 + ((alt - v3) / ((v2 - v3) || 1e-6)) * DX,
          y: y1
        };
        const left = {
          x: x0,
          y: y0 + ((alt - v0) / ((v3 - v0) || 1e-6)) * DY
        };

        switch (mask) {
          case 1: case 14:
            segments.push([left, top]);
            break;
          case 2: case 13:
            segments.push([top, right]);
            break;
          case 3: case 12:
            segments.push([left, right]);
            break;
          case 4: case 11:
            segments.push([right, bottom]);
            break;
          case 5:
            segments.push([left, top]);
            segments.push([right, bottom]);
            break;
          case 6: case 9:
            segments.push([top, bottom]);
            break;
          case 7: case 8:
            segments.push([left, bottom]);
            break;
          case 10:
            segments.push([top, right]);
            segments.push([left, bottom]);
            break;
        }
      }
    }
    return segments;
  }

  // Dibuix i actualització principal del simulador
  function updateContoursSim() {
    const p1H = parseInt(document.getElementById('peak1HSlider')?.value || 3400);
    const p2H = parseInt(document.getElementById('peak2HSlider')?.value || 3100);
    const step = parseInt(document.getElementById('equidistSelect')?.value || 50);
    const labelsMode = document.getElementById('labelsModeSelect')?.value || 'all';

    const lbl1 = document.getElementById('peak1HLabel');
    if (lbl1) lbl1.textContent = `${p1H.toLocaleString('ca-ES')} m`;
    const lbl2 = document.getElementById('peak2HLabel');
    if (lbl2) lbl2.textContent = `${p2H.toLocaleString('ca-ES')} m`;
    const lblEq = document.getElementById('equidistLabel');
    if (lblEq) lblEq.textContent = `${step} m`;
    const lblLabels = document.getElementById('labelsModeLabel');
    if (lblLabels) lblLabels.textContent = (labelsMode === 'master') ? 'Corbes Mestres' : 'Totes les Corbes';

    const grid = getGrid(p1H, p2H);

    // 1. DIBUIXAR MAPA TOPOGRÀFIC 2D A GRAN FORMAT
    ctxMap.clearRect(0, 0, W, H);

    // Fons base amb tintat hipsomètric subtil
    const bgGrad = ctxMap.createRadialGradient(480, 230, 80, 500, 240, 520);
    bgGrad.addColorStop(0, '#132338');
    bgGrad.addColorStop(0.5, '#0f172a');
    bgGrad.addColorStop(1, '#090d16');
    ctxMap.fillStyle = bgGrad;
    ctxMap.fillRect(0, 0, W, H);

    // Graella cartogràfica suau de fons (coordenades UTM / 100px)
    ctxMap.strokeStyle = 'rgba(51, 65, 85, 0.4)';
    ctxMap.lineWidth = 1;
    ctxMap.setLineDash([3, 6]);
    for (let gx = 100; gx < W; gx += 100) {
      ctxMap.beginPath();
      ctxMap.moveTo(gx, 0);
      ctxMap.lineTo(gx, H);
      ctxMap.stroke();
    }
    for (let gy = 100; gy < H; gy += 100) {
      ctxMap.beginPath();
      ctxMap.moveTo(0, gy);
      ctxMap.lineTo(W, gy);
      ctxMap.stroke();
    }
    ctxMap.setLineDash([]);

    // Llista per desar les etiquetes de cota a dibuixar al final
    const labelItems = [];

    // Traçat de les corbes de nivell (isohipses)
    const maxAlt = Math.max(p1H, p2H);
    for (let alt = 2250; alt <= maxAlt; alt += step) {
      const isMaster = (alt % 100 === 0);
      const segments = getContourSegments(grid, alt);
      if (segments.length === 0) continue;

      ctxMap.beginPath();
      for (const seg of segments) {
        ctxMap.moveTo(seg[0].x, seg[0].y);
        ctxMap.lineTo(seg[1].x, seg[1].y);
      }

      if (isMaster) {
        ctxMap.strokeStyle = '#38bdf8'; // Cian viu per a mestres
        ctxMap.lineWidth = 2.2;
      } else {
        ctxMap.strokeStyle = 'rgba(56, 189, 248, 0.42)'; // Cian suau per a ordinàries
        ctxMap.lineWidth = 1.1;
      }
      ctxMap.stroke();

      // Recollir punts per a les etiquetes de cota
      const shouldLabel = (labelsMode === 'all') || (labelsMode === 'master' && isMaster);
      if (shouldLabel && segments.length >= 4) {
        // Tria segments representatius distribuïts al llarg de la línia
        const stepSeg = Math.max(8, Math.floor(segments.length / 3));
        for (let sIdx = Math.floor(stepSeg / 2); sIdx < segments.length; sIdx += stepSeg) {
          const seg = segments[sIdx];
          const midX = (seg[0].x + seg[1].x) / 2;
          const midY = (seg[0].y + seg[1].y) / 2;

          // Evitar etiquetes fora dels marges o massa properes a les vores
          if (midX > 40 && midX < W - 40 && midY > 25 && midY < H - 25) {
            labelItems.push({
              alt,
              x: midX,
              y: midY,
              isMaster
            });
          }
        }
      }
    }

    // Filtrar etiquetes que quedin massa juntes per evitar superposicions
    const spacedLabels = [];
    for (const item of labelItems) {
      const tooClose = spacedLabels.some(other => Math.hypot(item.x - other.x, item.y - other.y) < (item.isMaster ? 45 : 35));
      if (!tooClose) {
        spacedLabels.push(item);
      }
    }

    // Dibuixar les etiquetes de cota amb pastilles protectores (alta llegibilitat)
    spacedLabels.forEach(lbl => {
      const text = `${lbl.alt}m`;
      const pillW = lbl.isMaster ? 46 : 42;
      const pillH = lbl.isMaster ? 16 : 14;

      ctxMap.save();
      const pillBg = lbl.isMaster ? 'rgba(15, 23, 42, 0.92)' : 'rgba(15, 23, 42, 0.85)';
      const pillBorder = lbl.isMaster ? '#38bdf8' : 'rgba(148, 163, 184, 0.6)';
      drawPill(ctxMap, lbl.x - pillW / 2, lbl.y - pillH / 2, pillW, pillH, 4, pillBg, pillBorder);

      ctxMap.fillStyle = lbl.isMaster ? '#38bdf8' : '#e2e8f0';
      ctxMap.font = `${lbl.isMaster ? 'bold 10px' : '9px'} "JetBrains Mono", monospace`;
      ctxMap.textAlign = 'center';
      ctxMap.textBaseline = 'middle';
      ctxMap.fillText(text, lbl.x, lbl.y);
      ctxMap.restore();
    });

    // Indicar els dos cims principals amb rètols destacats
    [peak1, peak2].forEach((p) => {
      // Triangle de cim
      ctxMap.fillStyle = '#f59e0b';
      ctxMap.beginPath();
      ctxMap.moveTo(p.x, p.y - 8);
      ctxMap.lineTo(p.x + 7, p.y + 5);
      ctxMap.lineTo(p.x - 7, p.y + 5);
      ctxMap.closePath();
      ctxMap.fill();

      // Etiqueta del cim
      const peakText = `▲ ${p.name}: ${p.h} m`;
      ctxMap.font = 'bold 11px Outfit, sans-serif';
      const textW = ctxMap.measureText(peakText).width;
      drawPill(ctxMap, p.x - textW / 2 - 8, p.y - 28, textW + 16, 20, 5, 'rgba(15, 23, 42, 0.92)', '#f59e0b');

      ctxMap.fillStyle = '#fef08a';
      ctxMap.textAlign = 'center';
      ctxMap.textBaseline = 'middle';
      ctxMap.fillText(peakText, p.x, p.y - 18);
    });

    // Indicar el Coll de Muntanya (Saddle / Pas natural)
    const saddleX = (peak1.x + peak2.x) / 2;
    const saddleY = (peak1.y + peak2.y) / 2;
    const saddleAlt = getAltitude(saddleX, saddleY, p1H, p2H);
    ctxMap.save();
    ctxMap.font = '600 10px Outfit, sans-serif';
    const sText = `≍ Coll de Pocona (~${saddleAlt} m)`;
    const sW = ctxMap.measureText(sText).width;
    drawPill(ctxMap, saddleX - sW / 2 - 6, saddleY - 10, sW + 12, 18, 4, 'rgba(15, 23, 42, 0.9)', 'rgba(56, 189, 248, 0.5)');
    ctxMap.fillStyle = '#94a3b8';
    ctxMap.textAlign = 'center';
    ctxMap.textBaseline = 'middle';
    ctxMap.fillText(sText, saddleX, saddleY - 1);
    ctxMap.restore();

    // Línia vermella de tall transversal Y (connecta visualment amb el perfil inferior)
    ctxMap.save();
    ctxMap.strokeStyle = 'rgba(239, 68, 68, 0.55)';
    ctxMap.lineWidth = 1.5;
    ctxMap.setLineDash([5, 5]);
    ctxMap.beginPath();
    ctxMap.moveTo(0, probePos.y);
    ctxMap.lineTo(W, probePos.y);
    ctxMap.stroke();
    ctxMap.setLineDash([]);
    ctxMap.restore();

    // Punter de sondeig actiu (vermell amb anell)
    ctxMap.save();
    ctxMap.strokeStyle = '#ef4444';
    ctxMap.lineWidth = 2.5;
    ctxMap.beginPath();
    ctxMap.arc(probePos.x, probePos.y, 9, 0, Math.PI * 2);
    ctxMap.stroke();

    ctxMap.fillStyle = 'rgba(239, 68, 68, 0.35)';
    ctxMap.fill();

    ctxMap.fillStyle = '#ffffff';
    ctxMap.beginPath();
    ctxMap.arc(probePos.x, probePos.y, 2.5, 0, Math.PI * 2);
    ctxMap.fill();
    ctxMap.restore();

    // 2. DIBUIXAR PERFIL TRANSVERSAL 2.5D ALINEAT (CANVAS INFERIOR)
    const W3 = d3Canvas.width;   // 1000
    const H3 = d3Canvas.height;  // 220
    ctx3d.clearRect(0, 0, W3, H3);

    // Fons fosc amb graella
    ctx3d.fillStyle = '#0f172a';
    ctx3d.fillRect(0, 0, W3, H3);

    const padLeft = 45;
    const padRight = 20;
    const padBottom = 30;
    const padTop = 25;
    const plotW = W3 - padLeft - padRight;
    const plotH = H3 - padBottom - padTop;

    const minScaleAlt = 2200;
    const maxScaleAlt = 3800;

    function altToY(a) {
      return padTop + plotH - ((a - minScaleAlt) / (maxScaleAlt - minScaleAlt)) * plotH;
    }

    // Línies de cota horitzontals
    ctx3d.strokeStyle = '#334155';
    ctx3d.lineWidth = 1;
    for (let a = 2200; a <= 3800; a += 400) {
      const yLine = altToY(a);
      ctx3d.beginPath();
      ctx3d.moveTo(padLeft, yLine);
      ctx3d.lineTo(W3 - padRight, yLine);
      ctx3d.stroke();

      ctx3d.fillStyle = '#64748b';
      ctx3d.font = '10px "JetBrains Mono", monospace';
      ctx3d.textAlign = 'right';
      ctx3d.fillText(`${a}m`, padLeft - 6, yLine + 3);
    }

    // Traçat del perfil d'altitud al llarg de la línia Y del punter
    const numSamples = 200;
    ctx3d.beginPath();
    ctx3d.moveTo(padLeft, altToY(minScaleAlt));

    for (let s = 0; s <= numSamples; s++) {
      const frac = s / numSamples;
      const mapX = frac * W;
      const altAtSample = getAltitude(mapX, probePos.y, p1H, p2H);
      const px = padLeft + frac * plotW;
      const py = altToY(altAtSample);
      ctx3d.lineTo(px, py);
    }

    ctx3d.lineTo(padLeft + plotW, altToY(minScaleAlt));
    ctx3d.closePath();

    // Degradat de muntanya per al perfil
    const grad3d = ctx3d.createLinearGradient(0, padTop, 0, H3 - padBottom);
    grad3d.addColorStop(0, '#0284c7');
    grad3d.addColorStop(0.5, '#0369a1');
    grad3d.addColorStop(1, '#0c4a6e');
    ctx3d.fillStyle = grad3d;
    ctx3d.fill();

    // Vora del relleu
    ctx3d.beginPath();
    for (let s = 0; s <= numSamples; s++) {
      const frac = s / numSamples;
      const mapX = frac * W;
      const altAtSample = getAltitude(mapX, probePos.y, p1H, p2H);
      const px = padLeft + frac * plotW;
      const py = altToY(altAtSample);
      if (s === 0) ctx3d.moveTo(px, py);
      else ctx3d.lineTo(px, py);
    }
    ctx3d.strokeStyle = '#38bdf8';
    ctx3d.lineWidth = 2.5;
    ctx3d.stroke();

    // Punter sobre el perfil
    const probeAlt = getAltitude(probePos.x, probePos.y, p1H, p2H);
    const probePx = padLeft + (probePos.x / W) * plotW;
    const probePy = altToY(probeAlt);

    // Línia vertical guia
    ctx3d.save();
    ctx3d.strokeStyle = 'rgba(239, 68, 68, 0.4)';
    ctx3d.lineWidth = 1.5;
    ctx3d.setLineDash([4, 4]);
    ctx3d.beginPath();
    ctx3d.moveTo(probePx, padTop);
    ctx3d.lineTo(probePx, H3 - padBottom);
    ctx3d.stroke();
    ctx3d.restore();

    // Punt vermell de mesura
    ctx3d.fillStyle = '#ef4444';
    ctx3d.beginPath();
    ctx3d.arc(probePx, probePy, 7, 0, Math.PI * 2);
    ctx3d.fill();
    ctx3d.strokeStyle = '#ffffff';
    ctx3d.lineWidth = 2;
    ctx3d.stroke();

    // Etiqueta del punt sondejat
    const ptText = `Cota: ${probeAlt.toLocaleString('ca-ES')} m (X: ${Math.round(probePos.x)}, Y: ${Math.round(probePos.y)})`;
    ctx3d.font = 'bold 11px Outfit, sans-serif';
    const ptW = ctx3d.measureText(ptText).width;
    const tagX = Math.max(padLeft + ptW / 2 + 10, Math.min(W3 - padRight - ptW / 2 - 10, probePx));
    const tagY = Math.max(padTop + 14, probePy - 16);

    drawPill(ctx3d, tagX - ptW / 2 - 8, tagY - 12, ptW + 16, 20, 4, 'rgba(15, 23, 42, 0.95)', '#ef4444');
    ctx3d.fillStyle = '#ffffff';
    ctx3d.textAlign = 'center';
    ctx3d.textBaseline = 'middle';
    ctx3d.fillText(ptText, tagX, tagY - 2);

    // 3. ACTUALITZAR TAULA DE MÈTRIQUES
    const probeAltVal = document.getElementById('probeAltitudeVal');
    if (probeAltVal) probeAltVal.textContent = `${probeAlt.toLocaleString('ca-ES')} m`;

    const reliefVal = document.getElementById('probeTotalReliefVal');
    if (reliefVal) reliefVal.textContent = `${(maxAlt - BASE_ALT).toLocaleString('ca-ES')} m`;

    const zoneVal = document.getElementById('probeZoneTypeVal');
    const statusVal = document.getElementById('contourChallengeStatus');

    // Comprovació de proximitat a cims o al coll de muntanya
    const distToPeak1 = Math.hypot(probePos.x - peak1.x, probePos.y - peak1.y);
    const distToPeak2 = Math.hypot(probePos.x - peak2.x, probePos.y - peak2.y);
    const distToSaddle = Math.hypot(probePos.x - saddleX, probePos.y - saddleY);

    if (zoneVal) {
      if (distToPeak1 < 45 || distToPeak2 < 45) {
        zoneVal.textContent = 'Cim d\'Alta Muntanya (Òptim per a Torre)';
        if (statusVal) {
          statusVal.className = 'status-badge status-ok';
          statusVal.textContent = '🟢 Cimal d\'Antena Principal';
        }
      } else if (distToSaddle < 55) {
        zoneVal.textContent = 'Coll de Muntanya (Saddle / Pas Natural)';
        if (statusVal) {
          statusVal.className = 'status-badge status-ok';
          statusVal.textContent = '🟢 Has trobat el Coll de Pocona!';
        }
        markContourChallenge1Solved();
      } else if (probeAlt > 2900) {
        zoneVal.textContent = 'Cresta / Vessant Rocós Superior';
        if (statusVal) {
          statusVal.className = 'status-badge status-warn';
          statusVal.textContent = '🟡 Zona d\'Accés Difícil';
        }
      } else if (probeAlt > 2500) {
        zoneVal.textContent = 'Vessant / Pendent Mitjà';
        if (statusVal) {
          statusVal.className = 'status-badge status-warn';
          statusVal.textContent = '🟡 Rampa de la Vall';
        }
      } else {
        zoneVal.textContent = 'Fons de Vall Plana (Comunitat Habitada)';
        if (statusVal) {
          statusVal.className = 'status-badge status-danger';
          statusVal.textContent = '🔴 Vall Ombrívola (Sense LoS Directe)';
        }
      }
    }
  }

  // LÒGICA DELS REPTES DIDÀCTICS DE CORBES DE NIVELL
  const contourSolved = { 1: false, 2: false, 3: false };

  function updateContourSolvedBadge() {
    const count = Object.values(contourSolved).filter(Boolean).length;
    const badge = document.getElementById('contourScoreBadge');
    const cntElem = document.getElementById('contourSolvedCount');
    if (cntElem) cntElem.textContent = count;
    if (badge && count === 3) {
      badge.className = 'badge badge-green';
      badge.textContent = '🎉 Missió de Relleu Completada (3/3)!';
    }
  }

  function markContourChallenge1Solved() {
    if (contourSolved[1]) return;
    contourSolved[1] = true;
    const status = document.getElementById('contourCh1Status');
    const fb = document.getElementById('contourCh1Feedback');
    if (status) { status.className = 'status-badge status-ok'; status.textContent = 'Completat! (+100 XP)'; }
    if (fb) {
      fb.style.display = 'block';
      fb.style.color = '#15803d';
      fb.innerHTML = '<strong>Molt bona observació!</strong> Has posicionat el punter sobre el Coll de Pocona. Fixa\'t com aquí les corbes de nivell s\'estrenyen i divergeixen cap a ambdues muntanyes.';
    }
    updateContourSolvedBadge();
  }

  window.checkContourChallenge = function(challengeNum) {
    if (challengeNum === 2) {
      const val = parseFloat(document.getElementById('contourCh2Input')?.value);
      const status = document.getElementById('contourCh2Status');
      const fb = document.getElementById('contourCh2Feedback');
      const p1H = parseInt(document.getElementById('peak1HSlider')?.value || 3400);
      const expected = p1H - 2200;

      if (Math.abs(val - expected) < 10) {
        contourSolved[2] = true;
        if (status) { status.className = 'status-badge status-ok'; status.textContent = 'Correcte! (+100 XP)'; }
        if (fb) {
          fb.style.display = 'block';
          fb.style.color = '#15803d';
          fb.innerHTML = `<strong>Exacte!</strong> Desnivell = Cota Cim (${p1H} m) − Cota Vall (2.200 m) = <strong>${expected.toLocaleString('ca-ES')} metres</strong>.`;
        }
      } else {
        if (status) { status.className = 'status-badge status-danger'; status.textContent = 'Incorrecte'; }
        if (fb) {
          fb.style.display = 'block';
          fb.style.color = '#b91c1c';
          fb.innerHTML = `Pista: Resta l'alçada del fons de la vall (2.200 m) a la cota actual del Cim Nord (${p1H} m).`;
        }
      }
    } else if (challengeNum === 3) {
      const val = parseInt(document.getElementById('contourCh3Input')?.value);
      const status = document.getElementById('contourCh3Status');
      const fb = document.getElementById('contourCh3Feedback');

      if (val === 12) {
        contourSolved[3] = true;
        if (status) { status.className = 'status-badge status-ok'; status.textContent = 'Correcte! (+100 XP)'; }
        if (fb) {
          fb.style.display = 'block';
          fb.style.color = '#15803d';
          fb.innerHTML = '<strong>Molt ben calculat!</strong> Desnivell = 3.100 − 2.500 = 600 m. Com que cada corba representa 50 m d\'alçada: 600 ÷ 50 = <strong>12 corbes de nivell</strong> creuades!';
        }
      } else {
        if (status) { status.className = 'status-badge status-danger'; status.textContent = 'Incorrecte'; }
        if (fb) {
          fb.style.display = 'block';
          fb.style.color = '#b91c1c';
          fb.innerHTML = 'Pista: Calcula primer el desnivell entre 3.100 m i 2.500 m (són 600 m), i després divideix pel valor d\'equidistància (50 m).';
        }
      }
    }
    updateContourSolvedBadge();
  };

  // Controladors d'interacció amb ratolí i pantalla tàctil
  function handlePointerMove(clientX, clientY) {
    const rect = mapCanvas.getBoundingClientRect();
    const scaleX = mapCanvas.width / rect.width;
    const scaleY = mapCanvas.height / rect.height;
    probePos.x = Math.max(10, Math.min(mapCanvas.width - 10, (clientX - rect.left) * scaleX));
    probePos.y = Math.max(10, Math.min(mapCanvas.height - 10, (clientY - rect.top) * scaleY));
    updateContoursSim();
  }

  mapCanvas.addEventListener('mousemove', (e) => {
    handlePointerMove(e.clientX, e.clientY);
  });

  mapCanvas.addEventListener('click', (e) => {
    handlePointerMove(e.clientX, e.clientY);
  });

  mapCanvas.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, { passive: true });

  mapCanvas.addEventListener('touchstart', (e) => {
    if (e.touches.length > 0) {
      handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, { passive: true });

  window.updateContoursSim = updateContoursSim;
  window.addEventListener('DOMContentLoaded', updateContoursSim);
  updateContoursSim();
})();
