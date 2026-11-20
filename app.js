
const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];

let lang = localStorage.getItem("qodra_lang") || "ar";

const translations = {
  ar: {
    welcomeTag: "مساحة نموّك الشخصي",
    heroTitle: "كل إنسان عندو قدرة يقدر يطوّرها.",
    heroText: "اكتشف إمكانياتك، تعلّم مهارات جديدة، وحوّل أفكارك إلى خطوات عملية.",
    startBtn: "ابدأ مع QODRA AI",
    yourSpace: "مساحتك",
    dashboard: "لوحة التطور",
    activeGoals: "أهداف نشيطة",
    completedGoals: "أهداف مكتملة",
    yourJourney: "يوم في رحلتك",
    explore: "استكشف",
    toolsTitle: "أدوات QODRA",
    aiDesc: "مساعدك الذكي للتفكير والتخطيط",
    learnTitle: "تعلّم",
    learnDesc: "طوّر مهارة جديدة",
    goalsTitle: "أهدافي",
    goalsDesc: "حوّل الطموح إلى عمل",
    discoverTitle: "اكتشف قدراتك",
    discoverDesc: "اكتشف نقاط قوتك",
    quote: "التغيير الكبير يبدأ بخطوة صغيرة، واليوم فرصة جديدة للبداية.",
    assistantTitle: "المساعد الذكي",
    demoNotice: "QODRA AI متصل بالمساعد الذكي.",
    helloMsg: "مرحبا! أنا QODRA. شنو بغيتي تطوّر أو تحقق اليوم؟",
    myGoals: "أهدافي",
    goalsIntro: "كتب هدف صغير وخدم عليه خطوة بخطوة.",
    addGoal: "+ أضف هدف",
    learningPath: "مسارات التعلم",
    learnIntro: "اختار مجالاً وابدأ بخطوة بسيطة.",
    languageSkill: "تعلم اللغات",
    languageDetail: "10 دقائق يومياً لبناء عادة جديدة",
    digitalSkill: "المهارات الرقمية",
    digitalDetail: "ابدأ بأساسيات الحاسوب والإنترنت",
    thinkingSkill: "التفكير وحل المشاكل",
    thinkingDetail: "تعلم تقسيم المشكلة إلى خطوات",
    projectSkill: "إنشاء المشاريع",
    projectDetail: "حوّل فكرة إلى نموذج أولي",
    discoverPrompt: "شنو الحاجة اللي كتستمتع تديرها؟",
    discoverText: "فكر في الأشياء اللي كتحب والمهارات اللي عندك.",
    saveReflection: "حفظ التأمل",
    home: "الرئيسية",
    discoverShort: "اكتشف"
  },
  en: {
    welcomeTag: "Your personal growth space",
    heroTitle: "Every person has potential worth developing.",
    heroText: "Discover your strengths, learn new skills, and turn ideas into practical steps.",
    startBtn: "Start with QODRA AI",
    yourSpace: "YOUR SPACE",
    dashboard: "Your growth dashboard",
    activeGoals: "Active goals",
    completedGoals: "Completed goals",
    yourJourney: "Day in your journey",
    explore: "EXPLORE",
    toolsTitle: "QODRA tools",
    aiDesc: "Your intelligent thinking partner",
    learnTitle: "Learn",
    learnDesc: "Develop a new skill",
    goalsTitle: "My goals",
    goalsDesc: "Turn ambition into action",
    discoverTitle: "Discover your strengths",
    discoverDesc: "Discover what you do well",
    quote: "Big change starts with a small step.",
    assistantTitle: "AI Assistant",
    demoNotice: "QODRA AI is connected to the intelligent assistant.",
    helloMsg: "Hello! I'm QODRA. What would you like to achieve today?",
    myGoals: "My goals",
    goalsIntro: "Write a small goal and work on it step by step.",
    addGoal: "+ Add goal",
    learningPath: "Learning paths",
    learnIntro: "Choose an area and start with one small step.",
    languageSkill: "Learn languages",
    languageDetail: "10 minutes a day",
    digitalSkill: "Digital skills",
    digitalDetail: "Computer and internet basics",
    thinkingSkill: "Thinking and problem solving",
    thinkingDetail: "Break problems into steps",
    projectSkill: "Build projects",
    projectDetail: "Turn an idea into a prototype",
    discoverPrompt: "What activity do you enjoy?",
    discoverText: "Reflect on your interests and strengths.",
    saveReflection: "Save reflection",
    home: "Home",
    discoverShort: "Discover"
  },
  fr: {
    welcomeTag: "Votre espace de développement",
    heroTitle: "Chaque personne possède un potentiel à développer.",
    heroText: "Découvrez vos forces, apprenez et transformez vos idées en actions.",
    startBtn: "Commencer avec QODRA AI",
    yourSpace: "VOTRE ESPACE",
    dashboard: "Votre tableau de progression",
    activeGoals: "Objectifs actifs",
    completedGoals: "Objectifs terminés",
    yourJourney: "Jour de votre parcours",
    explore: "EXPLORER",
    toolsTitle: "Outils QODRA",
    aiDesc: "Votre partenaire intelligent",
    learnTitle: "Apprendre",
    learnDesc: "Développer une compétence",
    goalsTitle: "Mes objectifs",
    goalsDesc: "Transformer l'ambition en action",
    discoverTitle: "Découvrez vos forces",
    discoverDesc: "Identifiez vos points forts",
    quote: "Le grand changement commence par un petit pas.",
    assistantTitle: "Assistant intelligent",
    demoNotice: "QODRA AI est connecté à l'assistant intelligent.",
    helloMsg: "Bonjour ! Je suis QODRA. Que souhaitez-vous accomplir ?",
    myGoals: "Mes objectifs",
    goalsIntro: "Écrivez un petit objectif et avancez étape par étape.",
    addGoal: "+ Ajouter",
    learningPath: "Parcours d'apprentissage",
    learnIntro: "Choisissez un domaine et commencez simplement.",
    languageSkill: "Apprendre les langues",
    languageDetail: "10 minutes par jour",
    digitalSkill: "Compétences numériques",
    digitalDetail: "Les bases de l'informatique et d'Internet",
    thinkingSkill: "Réflexion et résolution",
    thinkingDetail: "Décomposer un problème en étapes",
    projectSkill: "Créer des projets",
    projectDetail: "Transformer une idée en prototype",
    discoverPrompt: "Quelle activité aimez-vous faire ?",
    discoverText: "Réfléchissez à vos intérêts et vos forces.",
    saveReflection: "Enregistrer",
    home: "Accueil",
    discoverShort: "Découvrir"
  }
};

function applyLang() {
  const t = translations[lang] || translations.ar;

  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

  $$("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    if (t[key]) el.textContent = t[key];
  });

  $("#langBtn").textContent =
    lang === "ar" ? "ع / EN" :
    lang === "en" ? "EN / FR" : "FR / ع";

  $("#chatInput").placeholder =
    lang === "ar" ? "كتب سؤالك هنا..." :
    lang === "fr" ? "Écrivez votre question..." :
    "Write your question...";
}

function showView(name) {
  $("main").classList.toggle("hidden", name !== "home");

  $$(".view").forEach(v => v.classList.add("hidden"));

  if (name !== "home") {
    const view = $("#" + name + "View");
    if (view) view.classList.remove("hidden");
  }

  $$(".nav-item").forEach(b => {
    b.classList.toggle("active", b.dataset.go === name);
  });

  if (name === "goals") renderGoals();

  window.scrollTo({ top: 0, behavior: "smooth" });
}

$$("[data-go]").forEach(btn => {
  btn.addEventListener("click", () => showView(btn.dataset.go));
});

$("#langBtn").addEventListener("click", () => {
  lang = lang === "ar" ? "en" : lang === "en" ? "fr" : "ar";
  localStorage.setItem("qodra_lang", lang);
  applyLang();
});

const goalKey = "qodra_goals";

function getGoals() {
  try {
    return JSON.parse(localStorage.getItem(goalKey) || "[]");
  } catch {
    return [];
  }
}

function saveGoals(goals) {
  localStorage.setItem(goalKey, JSON.stringify(goals));
  renderGoals();
  updateStats();
}

function renderGoals() {
  const list = $("#goalList");
  const goals = getGoals();

  list.innerHTML = "";

  if (!goals.length) {
    const empty = document.createElement("p");
    empty.className = "muted";
    empty.textContent = "مازال ما ضفتي حتى هدف. البداية بهدف واحد كافية.";
    list.appendChild(empty);
    return;
  }

  goals.forEach(goal => {
    const row = document.createElement("div");
    row.className = "goal-item" + (goal.done ? " done" : "");

    const check = document.createElement("input");
    check.type = "checkbox";
    check.checked = goal.done;

    check.addEventListener("change", () => {
      goal.done = check.checked;
      saveGoals(goals);
    });

    const label = document.createElement("span");
    label.textContent = goal.text;

    const del = document.createElement("button");
    del.className = "delete-goal";
    del.textContent = "×";
    del.setAttribute("aria-label", "Delete");

    del.addEventListener("click", () => {
      saveGoals(goals.filter(g => g.id !== goal.id));
    });

    row.append(check, label, del);
    list.appendChild(row);
  });
}

$("#goalForm").addEventListener("submit", e => {
  e.preventDefault();

  const input = $("#goalInput");
  const value = input.value.trim();

  if (!value) return;

  const goals = getGoals();

  goals.unshift({
    id: Date.now(),
    text: value,
    done: false
  });

  saveGoals(goals);
  input.value = "";
});

function updateStats() {
  const goals = getGoals();

  $("#goalCount").textContent =
    goals.filter(g => !g.done).length;

  $("#doneCount").textContent =
    goals.filter(g => g.done).length;

  const startKey = "qodra_start_date";
  let start = localStorage.getItem(startKey);

  if (!start) {
    start = new Date().toISOString();
    localStorage.setItem(startKey, start);
  }

  const days = Math.max(
    1,
    Math.floor((Date.now() - new Date(start).getTime()) / 86400000) + 1
  );

  $("#dayCount").textContent = days;
}

function addMessage(message, type) {
  const el = document.createElement("div");
  el.className = "message " + type;
  el.textContent = message;

  $("#chatBox").appendChild(el);
  $("#chatBox").scrollTop = $("#chatBox").scrollHeight;

  return el;
}

let chatHistory = [];

async function askQodra(question) {
  const loading = addMessage("QODRA كيتفكر...", "bot");

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: question,
        language: lang,
        history: chatHistory.slice(-10)
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "AI service error");
    }

    const answer = data.reply || data.response;

    if (!answer) {
      throw new Error("No answer received");
    }

    loading.textContent = answer;

    chatHistory.push(
      { role: "user", content: question },
      { role: "assistant", content: answer }
    );

  } catch (error) {
    console.error("QODRA AI:", error);

    loading.textContent =
      "سمح ليا، ما قدرناش نتاصلو بالمساعد الذكي دابا. تأكد من إعداد خدمة AI وحاول مرة أخرى.";
  }
}

$("#chatForm").addEventListener("submit", async e => {
  e.preventDefault();

  const input = $("#chatInput");
  const question = input.value.trim();

  if (!question) return;

  addMessage(question, "user");
  input.value = "";

  await askQodra(question);
});

$("#strengthBtn").addEventListener("click", () => {
  const value = $("#strengthInput").value.trim();

  if (!value) {
    $("#savedMsg").textContent = "كتب شي حاجة أولاً.";
    return;
  }

  localStorage.setItem("qodra_reflection", value);
  $("#savedMsg").textContent =
    "تم حفظ تأملك بنجاح على هذا الهاتف.";
});

$("#strengthInput").value =
  localStorage.getItem("qodra_reflection") || "";

const today = new Date();

$("#todayLabel").textContent = today.toLocaleDateString(
  lang === "ar" ? "ar-MA" :
  lang === "fr" ? "fr-FR" : "en-US",
  { day: "numeric", month: "short" }
);

if ("serviceWorker" in navigator &&
    location.protocol.startsWith("http")) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js")
      .catch(error => console.error("Service Worker:", error));
  });
}

applyLang();
updateStats();
