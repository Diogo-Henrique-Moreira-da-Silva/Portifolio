const dict = {
  pt: {
    meta: { title: "Contato — Diogo" },
    nav: { brand: "Diogo Henrique", projects: "Projetos", experience: "Experiência", contact: "Contato" },
    
    experience: {
      page_title: "Minha Experiência",
      item1: {
        date: "23 de março de 2023",
        role: "Assistente de Suporte de TI — pHelcon",
        desc: "Responsável por prestar suporte técnico de primeiro nível aos usuários, solucionando problemas relacionados a hardware, software e redes. Atuação no monitoramento de sistemas, configuração de equipamentos, instalação de softwares e abertura de chamados. Colaboração direta com a equipe de TI para garantir a estabilidade dos serviços e auxiliar na manutenção preventiva e corretiva de recursos tecnológicos.",

      },
      item2: { date: "Hoje" }
    }
  },
  en: {
    meta: { title: "Contact — Diogo" },
    nav: { brand: "Diogo Henrique", projects: "Projects", experience: "Experience", contact: "Contact" },
    experience: {
      page_title: "My Experience",
      item1: {
        date: "March 23, 2023",
        role: "IT Support Assistant — pHelcon",
        desc: "Responsible for providing first-level technical support to users, troubleshooting issues related to hardware, software, and networks. Performed system monitoring, equipment configuration, software installation, and ticket management. Worked closely with the IT team to ensure service stability and assisted in the preventive and corrective maintenance of technological resources.",
      },
      item2: { date: "Today" }
    }
  }
}

/* 2) HELPERS */
const getByPath = (obj, path) =>
  path.split(".").reduce((o, k) => (o && o[k] !== undefined ? o[k] : undefined), obj);

const safe = (current, next) => (next !== undefined ? next : current);

/* 3) APLICA TRADUÇÕES */
function applyTranslations(bundle) {
  if (!bundle) return;

  // Textos (conteúdo)
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const val = getByPath(bundle, key);
    el.textContent = safe(el.textContent, val);
  });

  // Placeholders
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    const val = getByPath(bundle, key);
    el.setAttribute("placeholder", safe(el.getAttribute("placeholder"), val));
  });

  // Titles (tooltip)
  document.querySelectorAll("[data-i18n-title]").forEach((el) => {
    const key = el.getAttribute("data-i18n-title");
    const val = getByPath(bundle, key);
    el.setAttribute("title", safe(el.getAttribute("title"), val));
  });

  // Acessibilidade
  document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
    const key = el.getAttribute("data-i18n-aria");
    const val = getByPath(bundle, key);
    el.setAttribute("aria-label", safe(el.getAttribute("aria-label"), val));
  });

  // <title> da página
  const titleEl = document.querySelector("title[data-i18n]");
  if (titleEl) {
    const key = titleEl.getAttribute("data-i18n");
    const val = getByPath(bundle, key);
    if (val !== undefined) document.title = val;
  }
}

/* 4) BOTÃO ÚNICO (PT↔EN) */
function updateLangButton(lang) {
  const btn = document.getElementById("lang-toggle");
  if (!btn) return;
  if (lang === "pt") {
    btn.textContent = "EN";
    btn.setAttribute("data-next-lang", "en");
    btn.setAttribute("aria-label", "Change language to English");
  } else {
    btn.textContent = "PT";
    btn.setAttribute("data-next-lang", "pt");
    btn.setAttribute("aria-label", "Mudar idioma para Português");
  }
}

/* 5) APLICA IDIOMA + SALVA */
function setLanguage(lang) {
  const bundle = dict[lang] || dict.pt;
  applyTranslations(bundle);
  document.documentElement.lang = lang === "en" ? "en" : "pt-BR";
  localStorage.setItem("lang", lang);
  updateLangButton(lang);
}

/* 6) INICIALIZAÇÃO */
(function initI18n() {
  const saved = localStorage.getItem("lang");
  const fallback = (navigator.language || "").toLowerCase().startsWith("en") ? "en" : "pt";
  const current = saved || fallback;
  setLanguage(current);

  // botão de alternância
  document.getElementById("lang-toggle")?.addEventListener("click", (e) => {
    const next = e.currentTarget.getAttribute("data-next-lang");
    setLanguage(next);
  });
})();
