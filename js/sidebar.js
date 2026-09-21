/* ==========================================================
   POCONA: CONTROL DEL MENÚ LATERAL I NAVEGACIÓ DEL DOSSIER
   ========================================================== */

const dossierNavigation = [
  {
    id: "inici",
    num: 0,
    title: "0. Inici: El Repte",
    icon: "🏠",
    path: "index.html",
    subpages: []
  },
  {
    id: "cooperacio",
    num: 1,
    title: "1. Cooperació",
    icon: "🤝",
    subpages: [
      { id: "1-1", title: "1.1 Què és l'IDH", path: "01-cooperacio/1-1-idh.html" },
      { id: "1-2", title: "1.2 Model de Cooperació", path: "01-cooperacio/1-2-model-cooperacio.html" },
      { id: "1-3", title: "1.3 Bretxa Digital", path: "01-cooperacio/1-3-telecomunicacions.html" },
      { id: "1-4", title: "1.4 Dossier d'Aprenentatge", path: "01-cooperacio/1-4-dossier-aprenentatge.html" },
      { id: "1-4-adaptat", title: "1.4 🌱 Dossier Adaptat", path: "01-cooperacio/1-4-dossier-adaptat.html" },
      { id: "1-5", title: "1.5 ✅ Autoavaluació Estàndard", path: "01-cooperacio/1-5-autoavaluacio.html" },
      { id: "1-5-adaptada", title: "1.5 🌱 Autoavaluació Adaptada", path: "01-cooperacio/1-5-autoavaluacio-adaptada.html" }
    ]
  },
  {
    id: "analisi",
    num: 2,
    title: "2. Anàlisi",
    icon: "🔍",
    subpages: [
      { id: "2-1", title: "2.1 Arbre de Problemes", path: "02-analisi/2-1-arbre-problemes.html" },
      { id: "2-2", title: "2.2 Informe Tècnic de Camp", path: "02-analisi/2-2-informe-camp.html" },
      { id: "2-3", title: "2.3 Activitat d'Equip (A3)", path: "02-analisi/2-3-activitat-equip.html" }
    ]
  },
  {
    id: "terreny",
    num: 3,
    title: "3. Terreny i Comunicacions",
    icon: "📐",
    subpages: [
      { id: "3-1", title: "3.1 Canvi d'Unitats de Mesura", path: "03-terreny/3-1-canvis-unitats.html" },
      { id: "3-2", title: "3.2 Escales Cartogràfiques", path: "03-terreny/3-2-escales.html" },
      { id: "3-3", title: "3.3 Corbes de Nivell", path: "03-terreny/3-3-corbes-nivell.html" },
      { id: "3-4", title: "3.4 Perfil i Línia de Vista (LoS)", path: "03-terreny/3-4-perfil.html" },
      { id: "3-5", title: "3.5 Distància Geomètrica (Pitàgores)", path: "03-terreny/3-5-pitagores.html" },
      { id: "3-6", title: "3.6 Dibuix Tècnic: Mediatriu i Circumcentre", path: "03-terreny/3-6-mediatriu-circumcentre.html" },
      { id: "3-7", title: "3.7 Sistemes de Comunicació i Antenes", path: "03-terreny/3-7-antenes-comunicacio.html" }
    ]
  },
  {
    id: "torre",
    num: 4,
    title: "4. Càlcul de Torres",
    icon: "🗼",
    subpages: [
      { id: "4-1", title: "4.1 Tipologies de Torres", path: "04-torre/4-1-estructures-torres.html" },
      { id: "4-2", title: "4.2 Simulador de Forces i Vent", path: "04-torre/4-2-simulador-torre.html" }
    ]
  },
  {
    id: "sistemes",
    num: 5,
    title: "5. Sistemes i Energia",
    icon: "📡",
    subpages: [
      { id: "5-1", title: "5.1 Energia Solar i Pressupost", path: "05-sistemes/5-1-sistemes-energia.html" }
    ]
  },
  {
    id: "tancament",
    num: 6,
    title: "6. Tancament",
    icon: "🏁",
    subpages: [
      { id: "6-1", title: "6.1 Conclusions i KPSI Final", path: "06-tancament/6-1-conclusions-kpsi.html" }
    ]
  }
];

function getRootPrefix() {
  const currentPath = window.location.pathname;
  if (currentPath.includes("/01-") || currentPath.includes("/02-") || 
      currentPath.includes("/03-") || currentPath.includes("/04-") || 
      currentPath.includes("/05-") || currentPath.includes("/06-")) {
    return "../";
  }
  return "";
}

// Càrrega immediata de la configuració de progressió del curs si no està present
if (typeof window.CONFIG_CURS === "undefined" && typeof window.CONFIG_DOCENT === "undefined") {
  const curP = window.location.pathname;
  let pfx = "";
  if (curP.includes("/01-") || curP.includes("/02-") || 
      curP.includes("/03-") || curP.includes("/04-") || 
      curP.includes("/05-") || curP.includes("/06-")) {
    pfx = "../";
  }
  document.write('<script src="' + pfx + 'js/config-curs.js"><\/script>');
}

function getCourseConfig() {
  const cfg = window.CONFIG_CURS || window.CONFIG_DOCENT || {};
  return {
    capitolMaximVisible: typeof cfg.capitolMaximVisible === "number" ? cfg.capitolMaximVisible : 6,
    estilFuturs: cfg.estilFuturs || "cadenat",
    missatgeBloqueig: cfg.missatgeBloqueig || "Aquest tema s'obrirà a classe quan finalitzem la fase actual del projecte Pocona."
  };
}

function getMaxVisibleChapter() {
  return getCourseConfig().capitolMaximVisible;
}

function getFlatPageList() {
  const maxCap = getMaxVisibleChapter();
  const list = [];
  dossierNavigation.forEach(item => {
    if (item.num !== undefined && item.num > maxCap) {
      return;
    }
    if (item.subpages.length === 0) {
      list.push({ title: item.title, path: item.path });
    } else {
      item.subpages.forEach(sub => {
        list.push({ title: sub.title, path: sub.path });
      });
    }
  });
  return list;
}

function initSidebar() {
  const sidebarContainer = document.getElementById("appSidebar");
  if (!sidebarContainer) return;

  const prefix = getRootPrefix();
  const flatList = getFlatPageList();
  const currentPath = window.location.pathname;
  const courseConfig = getCourseConfig();
  const maxCap = courseConfig.capitolMaximVisible;
  const lockStyle = courseConfig.estilFuturs;

  // Verificació d'accés directe a pàgines de capítols bloquejats
  const currentChapter = dossierNavigation.find(ch => {
    if (ch.subpages.length === 0) {
      const fn = ch.path.split("/").pop();
      return currentPath.endsWith(ch.path) || currentPath.endsWith(fn);
    }
    return ch.subpages.some(sub => {
      const fn = sub.path.split("/").pop();
      return currentPath.endsWith(sub.path) || currentPath.endsWith(fn);
    });
  });

  if (currentChapter && currentChapter.num !== undefined && currentChapter.num > maxCap) {
    const content = document.querySelector(".content-container");
    if (content) {
      content.innerHTML = `
        <div style="max-width: 650px; margin: 3.5rem auto; text-align: center; background: #ffffff; border: 2px solid #e2e8f0; border-radius: 16px; padding: 3rem 2rem; box-shadow: 0 10px 25px rgba(0,0,0,0.06);">
          <div style="font-size: 3.5rem; margin-bottom: 1rem;">🔒</div>
          <div class="badge badge-amber" style="font-size: 0.85rem; margin-bottom: 0.75rem; font-weight:700;">Fase en Preparació</div>
          <h1 style="font-size: 1.6rem; color: #1e293b; margin-bottom: 0.75rem;">Aquest tema encara no està disponible</h1>
          <p style="font-size: 0.98rem; color: #64748b; line-height: 1.6; margin-bottom: 2rem;">
            ${courseConfig.missatgeBloqueig}<br>
            Actualment estem treballant fins a la <strong>Fase ${maxCap}</strong>.
          </p>
          <div style="display: flex; justify-content: center; gap: 0.85rem; flex-wrap: wrap;">
            <a href="${prefix}index.html" class="btn-action btn-outline">🏠 Tornar a l'Inici</a>
            <a href="${prefix}01-cooperacio/1-1-idh.html" class="btn-action btn-primary">Anar al Tema 1 (Cooperació) →</a>
          </div>
        </div>
      `;
    }
  }

  let activeIndex = -1;
  flatList.forEach((p, idx) => {
    const filename = p.path.split("/").pop();
    if (currentPath.endsWith(p.path) || currentPath.endsWith(filename)) {
      activeIndex = idx;
    }
  });
  if (activeIndex === -1 && (currentPath.endsWith("/") || currentPath.endsWith("index.html"))) {
    activeIndex = 0;
  }

  const progressPercent = Math.round(((activeIndex + 1) / flatList.length) * 100);

  let chaptersHtml = "";

  dossierNavigation.forEach((chapter) => {
    // Control de progressió docent
    if (chapter.num !== undefined && chapter.num > maxCap) {
      if (lockStyle === "ocult") return;
      chaptersHtml += `
        <div class="nav-chapter" style="opacity: 0.65; margin-bottom: 0.35rem;">
          <button type="button" class="chapter-btn" onclick="alert('🔒 ${courseConfig.missatgeBloqueig}')" style="cursor: not-allowed; display:flex; justify-content:space-between; align-items:center;" title="Capítol en preparació">
            <span class="chapter-label">
              <span>🔒</span>
              <span>${chapter.title}</span>
            </span>
            <span style="font-size:0.68rem; font-weight:700; background:#e2e8f0; color:#64748b; padding:0.12rem 0.4rem; border-radius:4px;">Pròximament</span>
          </button>
        </div>
      `;
      return;
    }

    const isSinglePage = chapter.subpages.length === 0;

    if (isSinglePage) {
      const isAct = (activeIndex === 0);
      chaptersHtml += `
        <div class="nav-chapter">
          <a href="${prefix}${chapter.path}" class="chapter-btn ${isAct ? "active-chapter" : ""}">
            <span class="chapter-label">
              <span>${chapter.icon}</span>
              <span>${chapter.title}</span>
            </span>
          </a>
        </div>
      `;
    } else {
      const hasActiveChild = chapter.subpages.some(sub => {
        const fn = sub.path.split("/").pop();
        return currentPath.endsWith(sub.path) || currentPath.endsWith(fn);
      });

      let subLinksHtml = chapter.subpages.map(sub => {
        const fn = sub.path.split("/").pop();
        const isAct = currentPath.endsWith(sub.path) || currentPath.endsWith(fn);
        return `
          <li>
            <a href="${prefix}${sub.path}" class="sub-nav-link ${isAct ? "active-subpage" : ""}">
              ${sub.title}
            </a>
          </li>
        `;
      }).join("");

      chaptersHtml += `
        <div class="nav-chapter ${hasActiveChild ? "open" : ""}" id="chapter_${chapter.id}">
          <button type="button" class="chapter-btn ${hasActiveChild ? "active-chapter" : ""}" onclick="toggleChapter('${chapter.id}')">
            <span class="chapter-label">
              <span>${chapter.icon}</span>
              <span>${chapter.title}</span>
            </span>
            <span class="chapter-chevron">▶</span>
          </button>
          <ul class="sub-nav-list">
            ${subLinksHtml}
          </ul>
        </div>
      `;
    }
  });

  sidebarContainer.innerHTML = `
    <div class="sidebar-header">
      <a href="${prefix}index.html" class="brand-link">
        <div>
          <div class="brand-title">Pocona</div>
          <div class="brand-sub">Enginyeria &amp; Cooperació</div>
        </div>
      </a>
    </div>

    <nav class="sidebar-nav">
      ${chaptersHtml}
    </nav>

    <!-- Selector de Nivell DUA (Inicial vs Segur) -->
    <div class="sidebar-level-box">
      <div class="level-selector-header">
        <span class="level-selector-title">🎯 Nivell d'Aprenentatge:</span>
      </div>
      <div class="level-selector-group">
        <button type="button" class="btn-level-pill" id="btnLevelInicial" onclick="setPoconaLevel('inicial')" title="Mode Inicial: Textos més breus, conceptes directes i passos guiats">
          🌱 Inicial
        </button>
        <button type="button" class="btn-level-pill active" id="btnLevelSegur" onclick="setPoconaLevel('segur')" title="Mode Segur: Contingut complet detallat original">
          🛡️ Segur
        </button>
      </div>
      <div class="level-selector-hint" id="levelSelectorHint">
        Mode complet amb tot el detall tècnic
      </div>
    </div>

    <div class="sidebar-footer">
      Unitat Didàctica de 3r d'ESO<br>
      <strong>Enginyeria pel Desenvolupament</strong>
    </div>
  `;

  if (!document.getElementById("sidebarOverlay")) {
    const overlay = document.createElement("div");
    overlay.id = "sidebarOverlay";
    overlay.className = "sidebar-overlay";
    overlay.onclick = closeMobileSidebar;
    document.body.appendChild(overlay);
  }

  initPoconaLevel();
  renderStepNav(activeIndex, flatList, prefix);
}

// --------------------------------------------------------------------------
// GESTIÓ DELS NIVELLS D'APRENENTATGE (DUA: INICIAL vs SEGUR)
// --------------------------------------------------------------------------
function getPoconaLevel() {
  try {
    return localStorage.getItem("pocona_level") || "segur";
  } catch (e) {
    return "segur";
  }
}

function setPoconaLevel(level) {
  const current = (level === "inicial") ? "inicial" : "segur";
  try {
    localStorage.setItem("pocona_level", current);
  } catch (e) {}

  document.documentElement.setAttribute("data-level", current);

  const btnInicial = document.getElementById("btnLevelInicial");
  const btnSegur = document.getElementById("btnLevelSegur");
  const hint = document.getElementById("levelSelectorHint");

  if (btnInicial && btnSegur) {
    if (current === "inicial") {
      btnInicial.classList.add("active");
      btnSegur.classList.remove("active");
      if (hint) hint.textContent = "Textos breus, directes i guiatge pas a pas";
    } else {
      btnSegur.classList.add("active");
      btnInicial.classList.remove("active");
      if (hint) hint.textContent = "Mode complet amb tot el detall tècnic";
    }
  }

  // Notificar canvi als components i simuladors de la pàgina
  if (typeof CustomEvent !== "undefined") {
    window.dispatchEvent(new CustomEvent("poconaLevelChanged", { detail: { level: current } }));
  }
}

function initPoconaLevel() {
  const level = getPoconaLevel();
  document.documentElement.setAttribute("data-level", level);
  setPoconaLevel(level);
}

function toggleChapter(chapterId) {
  const el = document.getElementById("chapter_" + chapterId);
  if (el) {
    el.classList.toggle("open");
  }
}

function toggleMobileSidebar() {
  const sidebar = document.getElementById("appSidebar");
  const overlay = document.getElementById("sidebarOverlay");
  if (sidebar && overlay) {
    sidebar.classList.toggle("open");
    overlay.classList.toggle("open");
  }
}

function closeMobileSidebar() {
  const sidebar = document.getElementById("appSidebar");
  const overlay = document.getElementById("sidebarOverlay");
  if (sidebar && overlay) {
    sidebar.classList.remove("open");
    overlay.classList.remove("open");
  }
}

function renderStepNav(activeIndex, flatList, prefix) {
  const container = document.getElementById("stepNavContainer");
  if (!container || activeIndex === -1) return;

  const prev = activeIndex > 0 ? flatList[activeIndex - 1] : null;
  const next = activeIndex < flatList.length - 1 ? flatList[activeIndex + 1] : null;

  let html = "";
  if (prev) {
    html += `
      <a href="${prefix}${prev.path}" class="btn-action btn-outline">
        ← Anterior: ${prev.title}
      </a>
    `;
  } else {
    html += `<div></div>`;
  }

  const maxCap = getMaxVisibleChapter();

  if (next) {
    html += `
      <a href="${prefix}${next.path}" class="btn-action btn-primary">
        Següent: ${next.title} →
      </a>
    `;
  } else if (maxCap < 6) {
    html += `
      <div style="font-size: 0.85rem; color: #475569; font-weight: 700; display:inline-flex; align-items:center; gap:0.45rem; padding: 0.55rem 1rem; background: #f1f5f9; border: 1px solid #cbd5e1; border-radius: 8px;">
        <span>🔒</span> Has completat les pàgines de la Fase ${maxCap}! El proper tema s'obrirà a classe.
      </div>
    `;
  }

  container.innerHTML = html;
}

function openLightbox(src) {
  let modal = document.getElementById("lightboxModal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "lightboxModal";
    modal.className = "lightbox-modal";
    modal.innerHTML = `
      <span class="lightbox-close" onclick="closeLightbox()">&times;</span>
      <img id="lightboxImg" class="lightbox-img" src="">
    `;
    modal.onclick = (e) => {
      if (e.target !== document.getElementById("lightboxImg")) closeLightbox();
    };
    document.body.appendChild(modal);
  }
  document.getElementById("lightboxImg").src = src;
  modal.classList.add("open");
}

function closeLightbox() {
  const modal = document.getElementById("lightboxModal");
  if (modal) modal.classList.remove("open");
}

window.setPoconaLevel = setPoconaLevel;
window.getPoconaLevel = getPoconaLevel;

// Inicialització immediata per evitar parpelleig visual (FOUC)
(function() {
  const lvl = getPoconaLevel();
  document.documentElement.setAttribute("data-level", lvl);
})();

window.addEventListener("DOMContentLoaded", () => {
  initSidebar();
});
