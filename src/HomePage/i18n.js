// ===== 1) DICIONÁRIO (troque pelos seus textos) =====
const dict = {
  pt: {
    meta: { title: "Portfólio — Diogo" },
    nav: { brand: "Diogo Henrique", projects: "Projetos", experience: "Experiência", contact: "Contato" },
    profile: { name: "Diogo Henrique Moreira da Silva", role: "Engenheiro de Software" },
    contact: { title: "Contato" },
    about: {
      heading: "Um pouco sobre mim",
      body: "Olá! Meu nome é Diogo Henrique, sou estudante de Engenharia de Software grande interesse pelo desenvolvimento de software, em especial na área do backend. Tenho experiência prática com Java, Html e Tailwind CSS, além de conhecimentos sólidos em bancos de dados SQL e suporte técnico. Durante minha trajetória acadêmica e profissional, atuei no desenvolvimento de soluções web, implementação de funcionalidades e suporte tecnico. Também possuo uma base em estruturas de dados, algoritmos e resolução de problemas, o que me ajuda a lidar com desafios técnicos de forma eficiente. Estou em constante aprendizado e busco sempre oportunidades para aplicar minhas habilidades em projetos inovadores e colaborativos, onde posso crescer como profissional e contribuir ativamente para o sucesso da equipe."
    },
    education: {
      heading: "Educação",
      institution: "PONTIFÍCIA UNIVERSIDADE CATÓLICA DE MINAS GERAIS (PUC MINAS)",
      desc: "Bacharelado em Engenharia de Software – Previsão de Conclusão: 2027. O curso de Engenharia de Software na PUC Minas me proporciona uma formação completa, focada em todo o ciclo de desenvolvimento de software. A grade curricular abrange desde  linguagens de programação e estruturas de dados até arquitetura de software, gestão de projetos e metodologias ágeis,  preparando-me para criar soluções robustas e escaláveis."
    },
    experience: {
      heading: "Experiência",
      role: "Estágio - Suporte Técnico - Phelcon",
      desc: "Atuação em suporte técnico e acompanhamento de rotinas de TI, contribuindo para a estabilidade e o desempenho de sistemas, além de interação com usuários e times para resolução de incidentes e melhoria de processos."
    }
  },
  en: {
    meta: { title: "Portfolio — Diogo" },
    nav: { brand: "Diogo Henrique", projects: "Projects", experience: "Experience", contact: "Contact" },
    profile: { name: "Diogo Henrique Moreira da Silva", role: "Software Engineer" },
    contact: { title: "Contact" },
    about: {
      heading: "A little about me",
      body: "Hello! My name is Diogo Henrique, and I am a Software Engineering student with a strong interest in software development, especially in backend development. I have hands-on experience with Java, HTML, and Tailwind CSS, as well as solid knowledge of SQL databases and technical support. Throughout my academic and professional journey, I have contributed to the development of web solutions, implementation of new features, and technical support. I also have a foundation in data structures, algorithms, and problem-solving, which enables me to tackle technical challenges efficiently. I am constantly learning and always seeking opportunities to apply my skills in innovative and collaborative projects, where I can grow as a professional and actively contribute to the success of the team."
    },
    education: {
      heading: "Education",
      institution: "PONTIFICAL CATHOLIC UNIVERSITY OF MINAS GERAIS (PUC MINAS)",
      desc: "Performed technical support and monitored IT routines, contributing to the stability and performance of systems, while interacting with users and teams to resolve incidents and improve processes."
    },
    experience: {
      heading: "Experience",
      role: "Intern — Tech Support — Phelcon",
      desc: "Work in technical support and monitoring of IT routines, contributing to the stability and performance of systems, as well as interacting with users and teams to resolve incidents and improve processes."
    }
  }
};

// ========== HELPERS ==========
const getByPath = (obj, path) =>
  path.split(".").reduce((o, k) => (o && o[k] !== undefined ? o[k] : undefined), obj);

function applyTranslations(bundle) {
  // troca textos
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const val = getByPath(bundle, key);
    if (val !== undefined) el.textContent = val;
  });

  // troca placeholders
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    const val = getByPath(bundle, key);
    if (val !== undefined) el.setAttribute("placeholder", val);
  });

  // troca titles (tooltip)
  document.querySelectorAll("[data-i18n-title]").forEach((el) => {
    const key = el.getAttribute("data-i18n-title");
    const val = getByPath(bundle, key);
    if (val !== undefined) el.setAttribute("title", val);
  });

  // troca aria-label (acessibilidade)
  document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
    const key = el.getAttribute("data-i18n-aria");
    const val = getByPath(bundle, key);
    if (val !== undefined) el.setAttribute("aria-label", val);
  });

  // troca <title> da página (se tiver data-i18n)
  const titleEl = document.querySelector("title[data-i18n]");
  if (titleEl) {
    const key = titleEl.getAttribute("data-i18n");
    const val = getByPath(bundle, key);
    if (val !== undefined) document.title = val;
  }
}

// atualiza o botão de troca de idioma
function updateLangButton(lang) {
  const btn = document.getElementById("lang-toggle");
  if (!btn) return;
  if (lang === "pt") {
    btn.textContent = "EN"; // mostra EN se está em PT
    btn.setAttribute("data-next-lang", "en");
  } else {
    btn.textContent = "PT"; // mostra PT se está em EN
    btn.setAttribute("data-next-lang", "pt");
  }
}

// troca idioma e salva
function setLanguage(lang) {
  // aqui você vai chamar seu dicionário
  const bundle = dict[lang] || dict.pt; // dict vem de outro arquivo
  applyTranslations(bundle);
  document.documentElement.lang = lang === "en" ? "en" : "pt-BR";
  localStorage.setItem("lang", lang);

  updateLangButton(lang);
}

// inicializa
(function initI18n() {
  const saved = localStorage.getItem("lang");
  const fallback = navigator.language && navigator.language.startsWith("en") ? "en" : "pt";
  const currentLang = saved || fallback;
  setLanguage(currentLang);

  const toggleBtn = document.getElementById("lang-toggle");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", (e) => {
      const nextLang = e.target.getAttribute("data-next-lang");
      setLanguage(nextLang);
    });
  }
})();
