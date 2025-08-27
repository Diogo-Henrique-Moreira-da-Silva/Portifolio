const dict = {
  pt: {
    meta: { title: "Contato — Diogo" },
    nav: { brand: "Diogo Henrique", projects: "Projetos", experience: "Experiência", contact: "Contato" },
    contact: {
      form_title: "ENVIE-ME UMA MENSAGEM!",
      email_label: "E-MAIL: *",
      email_ph: "seuemail@exemplo.com",
      subject_label: "ASSUNTO: *",
      subject_ph: "Sobre o que é?",
      message_label: "MENSAGEM: *",
      message_ph: "Conte-me sobre seu projeto, ideia, ou apenas diga olá...",
      send: "ENVIAR MENSAGEM"
    }
  },
  en: {
    meta: { title: "Contact — Diogo" },
    nav: { brand: "Diogo Henrique", projects: "Projects", experience: "Experience", contact: "Contact" },
    contact: {
      form_title: "SEND ME A MESSAGE!",
      email_label: "EMAIL ADDRESS: *",
      email_ph: "you@example.com",
      subject_label: "SUBJECT: *",
      subject_ph: "What's this about?",
      message_label: "MESSAGE: *",
      message_ph: "Tell me about your project, idea, or just say hello...",
      send: "SEND MESSAGE"
    }
  }
};

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
