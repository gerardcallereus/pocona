/**
 * sim-circumcentre.js
 * Laboratori Interactiu de Dibuix Tècnic: Mediatriu i Circumcentre
 * Aplicació a la ubicació d'antenes omnidireccionals a Pocona
 */

(function () {
  const canvas = document.getElementById("circumcentreCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  // Escala en km per píxel
  const KM_PER_PX = 0.025; // 40px = 1km

  // Punts dels pobles (inicials)
  const points = {
    A: { name: "Pocona (Ambulatori)", x: 280, y: 300, color: "#0284c7" },
    B: { name: "Chimboata (Escola)", x: 800, y: 340, color: "#7c3aed" },
    C: { name: "Chillijchi (Centre Comunitari)", x: 520, y: 90, color: "#ea580c" }
  };

  let draggedPoint = null;
  let showArcs = true;
  let showMediatrius = true;
  let showCircle = true;
  let showOmniCoverage = true;
  let constructionStep = 5; // 1 a 5

  // Elements UI
  const stepSlider = document.getElementById("ccStepSlider");
  const stepLabel = document.getElementById("ccStepLabel");
  const chkArcs = document.getElementById("ccChkArcs");
  const chkMediatrius = document.getElementById("ccChkMediatrius");
  const chkCircle = document.getElementById("ccChkCircle");
  const statDistA = document.getElementById("ccDistA");
  const statDistB = document.getElementById("ccDistB");
  const statDistC = document.getElementById("ccDistC");
  const statTriangleType = document.getElementById("ccTriangleType");
  const statCircumPos = document.getElementById("ccCircumPos");
  const explanationBox = document.getElementById("ccExplanation");

  function getMidpoint(p1, p2) {
    return { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 };
  }

  function getDistance(p1, p2) {
    return Math.hypot(p2.x - p1.x, p2.y - p1.y);
  }

  // Càlcul del circumcentre de 3 punts
  function getCircumcenter(A, B, C) {
    const d = 2 * (A.x * (B.y - C.y) + B.x * (C.y - A.y) + C.x * (A.y - B.y));
    if (Math.abs(d) < 0.0001) return null; // Alineats

    const ux = (
      (A.x * A.x + A.y * A.y) * (B.y - C.y) +
      (B.x * B.x + B.y * B.y) * (C.y - A.y) +
      (C.x * C.x + C.y * C.y) * (A.y - B.y)
    ) / d;

    const uy = (
      (A.x * A.x + A.y * A.y) * (C.x - B.x) +
      (B.x * B.x + B.y * B.y) * (A.x - C.x) +
      (C.x * C.x + C.y * C.y) * (B.x - A.x)
    ) / d;

    const r = Math.hypot(ux - A.x, uy - A.y);
    return { x: ux, y: uy, r: r };
  }

  function drawCompassArcs(p1, p2, color) {
    const d = getDistance(p1, p2);
    const r = d * 0.65; // radi de compàs > meitat de la distància

    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.2;
    ctx.setLineDash([4, 4]);

    const ang1 = Math.atan2(p2.y - p1.y, p2.x - p1.x);
    const ang2 = Math.atan2(p1.y - p2.y, p1.x - p2.x);

    // Arc des de p1
    ctx.beginPath();
    ctx.arc(p1.x, p1.y, r, ang1 - 0.7, ang1 + 0.7);
    ctx.stroke();

    // Arc des de p2
    ctx.beginPath();
    ctx.arc(p2.x, p2.y, r, ang2 - 0.7, ang2 + 0.7);
    ctx.stroke();

    ctx.restore();
  }

  function drawMediatriu(p1, p2, color) {
    const mid = getMidpoint(p1, p2);
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;

    const len = Math.hypot(dx, dy);
    if (len === 0) return;
    const nx = -dy / len;
    const ny = dx / len;

    const extend = 600;

    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 3]);

    ctx.beginPath();
    ctx.moveTo(mid.x - nx * extend, mid.y - ny * extend);
    ctx.lineTo(mid.x + nx * extend, mid.y + ny * extend);
    ctx.stroke();

    // Símbol d'angle recte
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5;
    ctx.setLineDash([]);
    const s = 10;
    const vx = (dx / len) * s;
    const vy = (dy / len) * s;
    const px = nx * s;
    const py = ny * s;
    ctx.beginPath();
    ctx.moveTo(mid.x + vx, mid.y + vy);
    ctx.lineTo(mid.x + vx + px, mid.y + vy + py);
    ctx.lineTo(mid.x + px, mid.y + py);
    ctx.stroke();

    // Punt mig
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(mid.x, mid.y, 4, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  function render() {
    const W = canvas.width;
    const H = canvas.height;

    ctx.clearRect(0, 0, W, H);

    // Fons quadriculat
    ctx.save();
    ctx.strokeStyle = "#e2e8f0";
    ctx.lineWidth = 0.5;
    const grid = 25;
    for (let x = 0; x < W; x += grid) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, H);
      ctx.stroke();
    }
    for (let y = 0; y < H; y += grid) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(W, y);
      ctx.stroke();
    }
    ctx.restore();

    const A = points.A;
    const B = points.B;
    const C = points.C;

    // 1. Dibuixar costats del triangle
    ctx.save();
    ctx.strokeStyle = "#475569";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(A.x, A.y);
    ctx.lineTo(B.x, B.y);
    ctx.lineTo(C.x, C.y);
    ctx.closePath();
    ctx.stroke();

    ctx.fillStyle = "rgba(148, 163, 184, 0.07)";
    ctx.fill();
    ctx.restore();

    // 2. Traçar Arcs de Compàs i Mediatrius segons el pas de construcció
    if (constructionStep >= 1) {
      if (showArcs) drawCompassArcs(A, B, "rgba(2, 132, 199, 0.45)");
      if (showMediatrius) drawMediatriu(A, B, "#0284c7");
    }

    if (constructionStep >= 2) {
      if (showArcs) drawCompassArcs(B, C, "rgba(124, 58, 237, 0.45)");
      if (showMediatrius) drawMediatriu(B, C, "#7c3aed");
    }

    if (constructionStep >= 3) {
      if (showArcs) drawCompassArcs(C, A, "rgba(234, 88, 12, 0.45)");
      if (showMediatrius) drawMediatriu(C, A, "#ea580c");
    }

    // 3. Circumcentre i circumferència circumscrita
    const circum = getCircumcenter(A, B, C);

    if (circum && constructionStep >= 4) {
      // Cobertura omnidireccional
      if (showOmniCoverage) {
        ctx.save();
        const radGrad = ctx.createRadialGradient(circum.x, circum.y, 5, circum.x, circum.y, circum.r);
        radGrad.addColorStop(0, "rgba(16, 185, 129, 0.35)");
        radGrad.addColorStop(0.7, "rgba(16, 185, 129, 0.15)");
        radGrad.addColorStop(1, "rgba(16, 185, 129, 0.02)");
        ctx.fillStyle = radGrad;
        ctx.beginPath();
        ctx.arc(circum.x, circum.y, circum.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Circumferència Circumscrita
      if (showCircle) {
        ctx.save();
        ctx.strokeStyle = "#10b981";
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(circum.x, circum.y, circum.r, 0, Math.PI * 2);
        ctx.stroke();

        // Radis d'equidistància
        ctx.strokeStyle = "rgba(16, 185, 129, 0.7)";
        ctx.setLineDash([4, 4]);
        ctx.lineWidth = 1.5;
        [A, B, C].forEach(pt => {
          ctx.beginPath();
          ctx.moveTo(circum.x, circum.y);
          ctx.lineTo(pt.x, pt.y);
          ctx.stroke();
        });
        ctx.restore();
      }

      // Circumcentre (O)
      ctx.save();
      ctx.fillStyle = "#047857";
      ctx.beginPath();
      ctx.arc(circum.x, circum.y, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.strokeStyle = "rgba(16, 185, 129, 0.8)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(circum.x, circum.y, 16, 0, Math.PI * 2);
      ctx.stroke();

      ctx.font = "bold 13px 'JetBrains Mono', monospace";
      ctx.fillStyle = "#065f46";
      ctx.fillText("📡 O: Torre Central Equidistant (Circumcentre)", circum.x + 14, circum.y + 5);
      ctx.font = "11px 'Outfit', sans-serif";
      ctx.fillStyle = "#047857";
      const radKm = (circum.r * KM_PER_PX).toFixed(2);
      ctx.fillText(`Radi d'antena R = ${radKm} km`, circum.x + 14, circum.y + 20);
      ctx.restore();
    }

    // 4. Dibuixar els 3 Punts
    [A, B, C].forEach((p, idx) => {
      const letter = ["A", "B", "C"][idx];
      ctx.save();

      ctx.shadowColor = "rgba(0,0,0,0.2)";
      ctx.shadowBlur = 6;
      ctx.shadowOffsetY = 2;

      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 11, 0, Math.PI * 2);
      ctx.fill();

      ctx.shadowColor = "transparent";
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 11px 'Outfit', sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(letter, p.x, p.y);

      ctx.textAlign = "left";
      ctx.font = "600 12px 'Outfit', sans-serif";
      ctx.fillStyle = "#0f172a";
      ctx.fillText(p.name, p.x + 16, p.y - 4);

      ctx.font = "11px 'JetBrains Mono', monospace";
      ctx.fillStyle = "#64748b";
      ctx.fillText(`(${Math.round(p.x * KM_PER_PX * 10) / 10}, ${Math.round(p.y * KM_PER_PX * 10) / 10}) km`, p.x + 16, p.y + 11);

      ctx.restore();
    });

    updateStats(A, B, C, circum);
  }

  function updateStats(A, B, C, circum) {
    if (!circum) {
      if (statDistA) statDistA.textContent = "N/A";
      if (statDistB) statDistB.textContent = "N/A";
      if (statDistC) statDistC.textContent = "N/A";
      if (statTriangleType) statTriangleType.textContent = "Degenerat";
      if (statCircumPos) statCircumPos.textContent = "A l'infinit";
      return;
    }

    const distA_km = (getDistance(circum, A) * KM_PER_PX).toFixed(2);
    const distB_km = (getDistance(circum, B) * KM_PER_PX).toFixed(2);
    const distC_km = (getDistance(circum, C) * KM_PER_PX).toFixed(2);

    if (statDistA) statDistA.textContent = `${distA_km} km`;
    if (statDistB) statDistB.textContent = `${distB_km} km`;
    if (statDistC) statDistC.textContent = `${distC_km} km`;

    const a = getDistance(B, C);
    const b = getDistance(A, C);
    const c = getDistance(A, B);
    const sides = [a, b, c].sort((x, y) => x - y);
    const [s1, s2, hyp] = sides;
    const diff = hyp * hyp - (s1 * s1 + s2 * s2);

    let typeText = "";
    let posText = "";

    if (Math.abs(diff) < 25) {
      typeText = "Rectangle (📐 90°)";
      posText = "Sobre la hipotenusa (al punt mig)";
    } else if (diff < 0) {
      typeText = "Acutangle (tots els angles < 90°)";
      posText = "A l'interior del triangle";
    } else {
      typeText = "Obtusangle (un angle > 90°)";
      posText = "A l'exterior del triangle";
    }

    if (statTriangleType) statTriangleType.textContent = typeText;
    if (statCircumPos) statCircumPos.textContent = posText;

    if (explanationBox) {
      const stepTexts = [
        "Pas 0: Traçat inicial dels vèrtexs que representen els 3 pobles de Pocona.",
        "Pas 1: Traçat del primer segment i de la seva mediatriu (perpendicular pel punt mig). Tots els punts d'aquesta recta estan a la mateixa distància d'A i de B.",
        "Pas 2: Traçat del segon segment i de la seva mediatriu. El punt on es tallen les dues rectes ja és equidistant d'A, B i C.",
        "Pas 3: Traçat de la tercera mediatriu. Observa com coincideix exactament al mateix punt de tall! Les 3 mediatrius són concurrents.",
        "Pas 4: Localització del Circumcentre (O). Aquest punt és la ubicació geomètrica ideal per a una torre omnidireccional perquè iguala la distància cap a tots tres nuclis.",
        "Pas 5: Traçat de la circumferència circumscrita. Comprova com la circumferència passa exactament per sobre dels 3 pobles. Una antena omnidireccional amb radi R donarà senyal homogeni a tothom!"
      ];
      explanationBox.textContent = stepTexts[constructionStep] || stepTexts[5];
    }
  }

  function getMousePos(evt) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (evt.clientX - rect.left) * scaleX,
      y: (evt.clientY - rect.top) * scaleY
    };
  }

  canvas.addEventListener("mousedown", (e) => {
    const pos = getMousePos(e);
    for (const key of ["A", "B", "C"]) {
      if (Math.hypot(pos.x - points[key].x, pos.y - points[key].y) < 22) {
        draggedPoint = key;
        canvas.style.cursor = "grabbing";
        break;
      }
    }
  });

  window.addEventListener("mousemove", (e) => {
    if (!draggedPoint) {
      const pos = getMousePos(e);
      let hovering = false;
      for (const key of ["A", "B", "C"]) {
        if (Math.hypot(pos.x - points[key].x, pos.y - points[key].y) < 22) {
          hovering = true;
          break;
        }
      }
      canvas.style.cursor = hovering ? "grab" : "default";
      return;
    }

    const pos = getMousePos(e);
    points[draggedPoint].x = Math.max(30, Math.min(canvas.width - 30, pos.x));
    points[draggedPoint].y = Math.max(30, Math.min(canvas.height - 30, pos.y));
    render();
  });

  window.addEventListener("mouseup", () => {
    if (draggedPoint) {
      draggedPoint = null;
      canvas.style.cursor = "default";
    }
  });

  if (stepSlider) {
    stepSlider.addEventListener("input", (e) => {
      constructionStep = parseInt(e.target.value, 10);
      if (stepLabel) stepLabel.textContent = `Pas ${constructionStep} de 5`;
      render();
    });
  }

  if (chkArcs) {
    chkArcs.addEventListener("change", (e) => {
      showArcs = e.target.checked;
      render();
    });
  }

  if (chkMediatrius) {
    chkMediatrius.addEventListener("change", (e) => {
      showMediatrius = e.target.checked;
      render();
    });
  }

  if (chkCircle) {
    chkCircle.addEventListener("change", (e) => {
      showCircle = e.target.checked;
      showOmniCoverage = e.target.checked;
      render();
    });
  }

  render();

  window.resetCircumcenterSim = function () {
    points.A.x = 280; points.A.y = 300;
    points.B.x = 800; points.B.y = 340;
    points.C.x = 520; points.C.y = 90;
    constructionStep = 5;
    if (stepSlider) stepSlider.value = 5;
    if (stepLabel) stepLabel.textContent = "Pas 5 de 5";
    render();
  };

  // LÒGICA DELS REPTES DE CIRCUMCENTRE
  const ccSolved = { 1: false, 2: false, 3: false };

  function updateCcSolvedBadge() {
    const count = Object.values(ccSolved).filter(Boolean).length;
    const badge = document.getElementById('ccScoreBadge');
    const cntElem = document.getElementById('ccSolvedCount');
    if (cntElem) cntElem.textContent = count;
    if (badge && count === 3) {
      badge.className = 'badge badge-green';
      badge.textContent = '🎉 Missió de Circumcentre Completada (3/3)!';
    }
  }

  window.checkCcChallenge = function(challengeNum) {
    if (challengeNum === 1) {
      const val = parseFloat(document.getElementById('ccCh1Input')?.value);
      const status = document.getElementById('ccCh1Status');
      const fb = document.getElementById('ccCh1Feedback');

      if (Math.abs(val - 3.4) < 0.15) {
        ccSolved[1] = true;
        if (status) { status.className = 'status-badge status-ok'; status.textContent = 'Correcte! (+100 XP)'; }
        if (fb) {
          fb.style.display = 'block';
          fb.style.color = '#15803d';
          fb.innerHTML = '<strong>Exacte!</strong> Per definició de circumcentre (centre de la circumferència que passa pels 3 vèrtexs), tots els radis són idèntics: d(O, A) = d(O, B) = d(O, C) = <strong>3,4 km</strong>.';
        }
      } else {
        if (status) { status.className = 'status-badge status-danger'; status.textContent = 'Incorrecte'; }
        if (fb) {
          fb.style.display = 'block';
          fb.style.color = '#b91c1c';
          fb.innerHTML = 'Pista: Recorda la propietat d\'equidistància: la distància des del circumcentre a qualsevol dels tres pobles és sempre exactament la mateixa!';
        }
      }
    } else if (challengeNum === 2) {
      const val = document.getElementById('ccCh2Select')?.value;
      const status = document.getElementById('ccCh2Status');
      const fb = document.getElementById('ccCh2Feedback');

      if (val === 'hip') {
        ccSolved[2] = true;
        if (status) { status.className = 'status-badge status-ok'; status.textContent = 'Correcte! (+100 XP)'; }
        if (fb) {
          fb.style.display = 'block';
          fb.style.color = '#15803d';
          fb.innerHTML = '<strong>Molt bona deducció geomètrica!</strong> En qualsevol triangle rectangle, el circumcentre se situa sempre exactament sobre la hipotenusa, coincidint amb el seu punt mig (Teorema de Tales)!';
        }
      } else {
        if (status) { status.className = 'status-badge status-danger'; status.textContent = 'Incorrecte'; }
        if (fb) {
          fb.style.display = 'block';
          fb.style.color = '#b91c1c';
          fb.innerHTML = 'Pista: Mou els pobles fins que a la barra de lectures posi «Rectangle» i fixa\'t on cau el punt O.';
        }
      }
    } else if (challengeNum === 3) {
      const status = document.getElementById('ccCh3Status');
      const fb = document.getElementById('ccCh3Feedback');
      const circum = getCircumcenter(points.A, points.B, points.C);

      if (circum) {
        const r_km = parseFloat((getDistance(circum, points.A) * KM_PER_PX).toFixed(2));
        if (r_km <= 4.05) {
          ccSolved[3] = true;
          if (status) { status.className = 'status-badge status-ok'; status.textContent = 'Superat! (+100 XP)'; }
          if (fb) {
            fb.style.display = 'block';
            fb.style.color = '#15803d';
            fb.innerHTML = `<strong>Objectiu assolit!</strong> El radi circumscrit actual és de <strong>${r_km} km</strong> (menor o igual a 4,0 km). L'antena omnidireccional cobrirà eficaçment tots 3 nuclis!`;
          }
        } else {
          if (status) { status.className = 'status-badge status-warn'; status.textContent = 'Radi massa gran'; }
          if (fb) {
            fb.style.display = 'block';
            fb.style.color = '#b91c1c';
            fb.innerHTML = `El radi actual és de ${r_km} km (supera el límit de 4,0 km). Arrossega els pobles A, B i C apropant-los entre si per reduir la mida del triangle territorial.`;
          }
        }
      }
    }
    updateCcSolvedBadge();
  };
})();
