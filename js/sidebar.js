/* ==========================================================
   POCONA: CONTROL DEL MENÚ LATERAL I NAVEGACIÓ DEL DOSSIER
   ========================================================== */

const dossierNavigation = [
  {
    id: "inici",
    title: "0. Inici: El Repte",
    icon: "🏠",
    path: "index.html",
    subpages: []
  },
  {
    id: "cooperacio",
    title: "1. Cooperació",
    icon: "🤝",
    subpages: [
      { id: "1-1", title: "1.1 Què és l'IDH", path: "01-cooperacio/1-1-idh.html" },
      { id: "1-2", title: "1.2 Model de Cooperació", path: "01-cooperacio/1-2-model-cooperacio.html" },
      { id: "1-3", title: "1.3 Telecomunicacions a Bolívia", path: "01-cooperacio/1-3-telecomunicacions.html" },
      { id: "1-4", title: "1.4 Dossier d'Aprenentatge", path: "01-cooperacio/1-4-dossier-aprenentatge.html" }
    ]
  },
  {
    id: "analisi",
    title: "2. Anàlisi",
    icon: "🔍",
    subpages: [
      { id: "2-1", title: "2.1 Informe Tècnic de Camp", path: "02-analisi/2-1-informe-camp.html" },
      { id: "2-2", title: "2.2 Arbre de Problemes", path: "02-analisi/2-2-arbre-problemes.html" }
    ]
  },
  {
    id: "terreny",
    title: "3. Terreny i WiMAX",
    icon: "📐",
    subpages: [
      { id: "3-1", title: "3.1 Topografia i Perfil LoS", path: "03-terreny/3-1-topografia-perfil.html" },
      { id: "3-2", title: "3.2 Teorema de Pitàgores", path: "03-terreny/3-2-pitagores.html" },
      { id: "3-3", title: "3.3 Sistemes WiMAX", path: "03-terreny/3-3-wimax.html" }
    ]
  },
  {
    id: "torre",
    title: "4. Càlcul de Torres",
    icon: "🗼",
    subpages: [
      { id: "4-1", title: "4.1 Tipologies de Torres", path: "04-torre/4-1-estructures-torres.html" },
      { id: "4-2", title: "4.2 Simulador de Forces i Vent", path: "04-torre/4-2-simulador-torre.html" }
    ]
  },
  {
    id: "sistemes",
    title: "5. Sistemes i Energia",
    icon: "📡",
    subpages: [
      { id: "5-1", title: "5.1 Energia Solar i Pressupost", path: "05-sistemes/5-1-sistemes-energia.html" }
    ]
  },
  {
    id: "tancament",
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

function getFlatPageList() {
  const list = [];
  dossierNavigation.forEach(item => {
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

  renderStepNav(activeIndex, flatList, prefix);
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

  if (next) {
    html += `
      <a href="${prefix}${next.path}" class="btn-action btn-primary">
        Següent: ${next.title} →
      </a>
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

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});

window.addEventListener("DOMContentLoaded", () => {
  initSidebar();
});
