const bottoneMenu = document.querySelector("#menu-button");
const navbar = document.querySelector("header nav");
const darkModeBtn = document.querySelector("#darkMode-Btn");
const html = document.documentElement;

bottoneMenu.addEventListener("click", () => {
  navbar.classList.toggle("is-open");
  const isOpen = navbar.classList.contains("is-open");
  bottoneMenu.setAttribute("aria-expanded", isOpen.toString());
});

bottoneMenu.addEventListener("pointerdown", () => {
  gsap.to(bottoneMenu, {
    x: 3,
    y: 3,
    boxShadow: "0px 0px 0 #0d0d0d",
    duration: 0.1,
    ease: "power2.out",
  });
});

bottoneMenu.addEventListener("pointerup", () => {
  gsap.to(bottoneMenu, {
    x: 0,
    y: 0,
    boxShadow: "3px 3px 0 #0d0d0d",
    duration: 0.2,
    ease: "back.out(2)",
  });
});

bottoneMenu.addEventListener("pointerleave", () => {
  gsap.to(bottoneMenu, {
    x: 0,
    y: 0,
    boxShadow: "3px 3px 0 #0d0d0d",
    duration: 0.2,
    ease: "power2.out",
  });
});

// ── Dark Mode ──

function applyTheme(theme) {
  html.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
}

// On first visit, respect OS preference; otherwise use saved choice

const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  applyTheme(savedTheme);
} else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  applyTheme("dark");
}

darkModeBtn.addEventListener("click", () => {
  const current = html.getAttribute("data-theme");
  applyTheme(current === "dark" ? "light" : "dark");
});

// ── Graph Paper Grid ──

const GRID_SIZE = 30;
const gridSections = document.querySelectorAll(".has-grid");
let gridY = 0;
let sectionTops = [];

function updateSectionTops() {
  sectionTops = Array.from(gridSections).map((el) => el.offsetTop);
}
updateSectionTops();
window.addEventListener("resize", updateSectionTops);

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  gsap.ticker.add(() => {
    gridY += 0.1;
    gridSections.forEach((el, i) => {
      const bgX = gridY % GRID_SIZE;
      const bgY =
        (((gridY - sectionTops[i]) % GRID_SIZE) + GRID_SIZE) % GRID_SIZE;
      el.style.setProperty("--grid-pos", `${bgX}px ${bgY}px`);
    });
  });
}

// ── Hero Starburst ──

gsap.to(".hero-name-wrap .hero-starburst", {
  rotation: 360,
  duration: 40,
  repeat: -1,
  ease: "none",
  transformOrigin: "50% 50%",
});

// ── Contact Slide-in ──

gsap.registerPlugin(ScrollTrigger);

gsap.fromTo(
  ".contact-btn",
  { scale: 0, opacity: 0 },
  {
    scale: 1,
    opacity: 1,
    duration: 0.5,
    ease: "back.out(2)",
    stagger: 0.15,
    scrollTrigger: {
      trigger: "#contact",
      start: "top 80%",
    },
  },
);

// ── GitHub Languages ──

const LANG_COLORS = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Python: "#3572A5",
  Java: "#b07219",
  "C#": "#178600",
  Ruby: "#701516",
  Go: "#00ADD8",
  Rust: "#dea584",
  PHP: "#4F5D95",
  Shell: "#89e051",
  EJS: "#a91e50",
  SCSS: "#c6538c",
  Handlebars: "#f7931e",
  Pug: "#a86454",
};

function renderLangs(container, langData) {
  const total = Object.values(langData).reduce((sum, bytes) => sum + bytes, 0);
  if (total === 0) return;

  const langs = Object.entries(langData).map(([name, bytes]) => ({
    name,
    pct: ((bytes / total) * 100).toFixed(1),
    color: LANG_COLORS[name] || "#ccc",
  }));

  const bar = document.createElement("div");
  bar.className = "lang-bar";

  const legend = document.createElement("div");
  legend.className = "lang-legend";

  for (const lang of langs) {
    const segment = document.createElement("div");
    segment.className = "lang-bar-segment";
    segment.style.width = lang.pct + "%";
    segment.style.backgroundColor = lang.color;
    bar.appendChild(segment);

    const item = document.createElement("span");
    item.className = "lang-legend-item";
    item.innerHTML =
      '<span class="lang-legend-dot" style="background-color:' +
      lang.color +
      '"></span>' +
      lang.name +
      " " +
      lang.pct +
      "%";
    legend.appendChild(item);
  }

  container.appendChild(bar);
  container.appendChild(legend);
}

document.querySelectorAll(".project-stack[data-repo]").forEach((stack) => {
  const repo = stack.dataset.repo;
  const container = stack.querySelector(".project-langs");
  if (!container) return;

  fetch("https://api.github.com/repos/" + repo + "/languages")
    .then((res) => {
      if (!res.ok) throw new Error(res.status);
      return res.json();
    })
    .then((data) => renderLangs(container, data))
    .catch(() => {
      container.textContent = "Lingue non disponibili";
      container.style.fontFamily = "var(--font-reserve)";
      container.style.fontSize = "0.75rem";
      container.style.color = "var(--color-ink)";
      container.style.opacity = "0.6";
    });
});

// ── Drawer bleeding ──

window.addEventListener("resize", () => {
  if (window.innerWidth >= 1024) {
    navbar.classList.remove("is-open");
    bottoneMenu.setAttribute("aria-expanded", "false");
  }
});
