const dict = {
  pt: {
    meta: { title: "Contato — Diogo" },
    nav: { brand: "Diogo Henrique", projects: "Projetos", experience: "Experiência", contact: "Contato" },
    project: {
        desc1: "O projeto GearUp tem como objetivo facilitar o gerenciamento de serviços automotivos por meio de uma plataforma web intuitiva e eficiente. A aplicação permite que clientes cadastrem seus veículos, agendem serviços com facilidade e acompanhem o andamento de seus atendimentos em tempo real. Já os funcionários também podem realizar cadastros de serviços, além de visualizar os agendamentos, atualizar o status dos serviços e salvar observações nos agendamentos. Além disso, o sistema oferece recursos de controle de peças e geração de relatórios mensais para auxiliar na tomada de decisões.",
        desc2: "O projeto “Atenas Buffet” visa solucionar problemas de desorganização enfrentados por buffets que utilizam métodos manuais ou limitados, como o WhatsApp, para gerenciar suas operações. Através de uma plataforma web moderna, o sistema integra processos essenciais, como solicitação de orçamento, personalização de cardápios, agendamento de eventos, seleção de garçons e coleta de feedback. Focado na eficiência, centralização de informações e personalização, o sistema melhora a experiência dos clientes e eleva a competitividade do Buffet Atenas no mercado de eventos."
    }
  },
  en: {
    meta: { title: "Contact — Diogo" },
    nav: { brand: "Diogo Henrique", projects: "Projects", experience: "Experience", contact: "Contact" },
    project: { 
      desc1: "The GearUp project aims to facilitate the management of automotive services through an intuitive and efficient web platform. The application allows customers to register their vehicles, easily schedule services, and track the progress of their appointments in real time. Employees can also register services, view schedules, update service statuses, and record notes on appointments. In addition, the system offers parts control features and generates monthly reports to support decision-making.",
      desc2: "The Athenas Buffet project seeks to address disorganization issues faced by buffets that rely on manual methods or limited tools, such as WhatsApp, to manage their operations. Through a modern web platform, the system integrates essential processes such as budget requests, menu customization, event scheduling, waiter selection, and feedback collection. Focused on efficiency, information centralization, and personalization, the system enhances the customer experience and increases Athenas Buffet’s competitiveness in the events market."
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
