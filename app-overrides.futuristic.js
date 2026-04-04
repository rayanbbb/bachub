Object.assign(translations.ar, {
    hero_kicker: "واجهة مراجعة ذكية",
    hero_intro: "تنظيم أخف للدروس والوطنيات والمساعد الذكي داخل واجهة مستقبلية وهادئة.",
    slides_kicker: "مسار سريع",
    slides_title: "سلايدز المراجعة",
    slides_desc: "تنقل بسرعة بين أهم أجزاء الموقع بواجهة أخف وتركيز أوضح."
});

Object.assign(translations.fr, {
    hero_kicker: "Interface de revision intelligente",
    hero_intro: "Une organisation plus legere pour les cours, les examens nationaux et l'assistant IA dans une interface futuriste et calme.",
    slides_kicker: "Acces rapide",
    slides_title: "Slides de revision",
    slides_desc: "Passez rapidement entre les zones principales du site avec un rythme plus leger et plus clair."
});

Object.assign(translations.en, {
    hero_kicker: "Neural Revision Interface",
    hero_intro: "A lighter layout for lessons, national exams, and AI support inside a calm futuristic dashboard.",
    slides_kicker: "Quick Flow",
    slides_title: "Clean Study Slides",
    slides_desc: "Move through the main study areas with a lighter, more focused rhythm."
});

subjectsData.philo = {
    sem1: [
        { title: "English - Reading Comprehension Essentials", pdf: true },
        { title: "English - Grammar and Tenses Review", pdf: true },
        { title: "English - Writing Paragraphs and Emails", pdf: true },
        { title: "Philosophy - Consciousness and the Unconscious", pdf: true },
        { title: "Philosophy - Desire and Happiness", pdf: true }
    ],
    sem2: [
        { title: "English - Essay Writing and Communication", pdf: true },
        { title: "English - Functions, Vocabulary, and Speaking", pdf: true },
        { title: "English - Exam Practice and Text Analysis", pdf: true },
        { title: "Philosophy - Freedom and Responsibility", pdf: true },
        { title: "Philosophy - Truth, State, and Violence", pdf: true }
    ],
    quizzes: [
        { title: "Quiz 1: English Grammar and Vocabulary", action: "startLiteraryQuiz('english')" },
        { title: "Quiz 2: Philosophy Core Concepts", action: "startLiteraryQuiz('philosophy')" }
    ]
};

wataniyatData.philo = [
    { title: "English - 2023 Session Normale", pdf: true },
    { title: "Philosophy - 2023 Session Normale", pdf: true },
    { title: "English - 2022 Session Normale", pdf: true },
    { title: "Philosophy - 2022 Session Normale", pdf: true }
];

const literaryQuizzes = {
    english: {
        question: "English: Which sentence works best as a formal opening in an exam essay?",
        options: [
            { text: "A - Hey teacher, I wanna talk about technology.", correct: false },
            { text: "B - Nowadays, technology plays a central role in our daily lives.", correct: true },
            { text: "C - Technology is cool and stuff.", correct: false }
        ],
        title: "Correct answer!",
        description: "A strong English exam answer starts with a clear and formal opening sentence.",
        subtext: "Use accurate grammar, linked ideas, and a short conclusion to score better."
    },
    philosophy: {
        question: "Philosophy: Which concept is most connected to choice and responsibility?",
        options: [
            { text: "A - Freedom", correct: true },
            { text: "B - Chance", correct: false },
            { text: "C - Habit", correct: false }
        ],
        title: "Correct answer!",
        description: "Freedom is tied to human choice, responsibility, and moral judgment.",
        subtext: "In philosophy, good answers define the concept then discuss its limits and implications."
    }
};

function renderEmptyState(container) {
    container.innerHTML = `
        <div class="empty-state">
            <i class='bx bx-folder-open'></i>
            <p data-i18n="empty_lessons">${translations[currentLang].empty_lessons}</p>
        </div>
    `;
}

function showPdfAlert() {
    alert(translations[currentLang].alert_pdf);
}

function buildPdfAction(pdfPath) {
    return pdfPath === true ? "showPdfAlert()" : `window.open('${pdfPath}', '_blank')`;
}

function renderQuizLayout(question, optionsMarkup) {
    return `
        <div class="quiz-screen">
            <div class="quiz-header">
                <h3 class="quiz-title">${question}</h3>
            </div>
            <div class="quiz-options">
                ${optionsMarkup}
            </div>
        </div>
    `;
}

function renderQuizResultLayout(title, description, subtext) {
    return `
        <div class="quiz-result">
            <i class='bx bxs-check-circle'></i>
            <h2>${title}</h2>
            <p>${description}</p>
            <p>${subtext}</p>
            <button class="btn primary-btn" type="button" onclick="showCategory('quizzes')">${translations[currentLang].btn_return}</button>
        </div>
    `;
}

showLiteraryResult = function (topic) {
    const quiz = literaryQuizzes[topic];
    if (!quiz) {
        return;
    }

    const content = document.getElementById("subject-content");
    content.innerHTML = renderQuizResultLayout(quiz.title, quiz.description, quiz.subtext);
};

startLiteraryQuiz = function (topic) {
    const quiz = literaryQuizzes[topic];
    if (!quiz) {
        return;
    }

    const content = document.getElementById("subject-content");
    const optionsMarkup = quiz.options.map((option) => `
        <button
            class="quiz-option"
            type="button"
            onclick="${option.correct ? `showLiteraryResult('${topic}')` : "wrongAnswer()"}"
        >
            ${option.text}
        </button>
    `).join("");

    content.innerHTML = renderQuizLayout(quiz.question, optionsMarkup);
};

showSubject = function (topic) {
    currentSubject = topic;
    document.querySelectorAll("#lessons .subject-tabs .tab-btn").forEach((tab) => {
        tab.classList.remove("active");
    });

    const targetTab = document.querySelector(`#lessons .tab-btn[onclick="showSubject('${topic}')"]`);
    if (targetTab) {
        targetTab.classList.add("active");
    }

    showCategory("sem1");
};

showCategory = function (category) {
    currentCategory = category;
    document.querySelectorAll(".inner-tab-btn").forEach((tab) => {
        tab.classList.remove("active");
    });

    const activeInnerTab = document.querySelector(`.inner-tab-btn[onclick="showCategory('${category}')"]`);
    if (activeInnerTab) {
        activeInnerTab.classList.add("active");
    }

    const content = document.getElementById("subject-content");
    const subjectData = subjectsData[currentSubject];
    content.innerHTML = "";

    if (!subjectData || !subjectData[category] || subjectData[category].length === 0) {
        renderEmptyState(content);
        return;
    }

    const items = subjectData[category];

    if (category === "quizzes") {
        content.innerHTML = items.map((item, index) => `
            <div class="quiz-card" onclick="${item.action}">
                <div class="quiz-card__content">
                    <div class="quiz-badge">${String(index + 1).padStart(2, "0")}</div>
                    <div>
                        <h4>${item.title}</h4>
                        <p>${translations[currentLang].btn_review}</p>
                    </div>
                </div>
                <button class="btn secondary-btn" type="button">${translations[currentLang].btn_review}</button>
            </div>
        `).join("");
        return;
    }

    content.innerHTML = items.map((item) => `
        <div class="lesson-item">
            <div class="item-copy">
                <div class="item-icon">
                    <i class='bx bxs-file-pdf'></i>
                </div>
                <span>${item.title}</span>
            </div>
            <button class="btn primary-btn" type="button" onclick="${buildPdfAction(item.pdf)}">
                <i class='bx bx-download'></i>
                ${translations[currentLang].btn_download}
            </button>
        </div>
    `).join("");
};

showWataniyat = function (topic) {
    currentWataniyatSubject = topic;
    document.querySelectorAll("#wataniyat .tab-btn").forEach((tab) => {
        tab.classList.remove("active");
    });

    const targetTab = document.querySelector(`#wataniyat .tab-btn[onclick="showWataniyat('${topic}')"]`);
    if (targetTab) {
        targetTab.classList.add("active");
    }

    const content = document.getElementById("wataniyat-content");
    const items = wataniyatData[topic] || [];
    content.innerHTML = "";

    if (items.length === 0) {
        renderEmptyState(content);
        return;
    }

    content.innerHTML = items.map((item) => `
        <div class="wataniyat-card">
            <div class="item-copy">
                <div class="item-icon">
                    <i class='bx bx-medal'></i>
                </div>
                <span>${item.title}</span>
            </div>
            <button class="btn primary-btn" type="button" onclick="${buildPdfAction(item.pdf)}">
                <i class='bx bx-download'></i>
                ${translations[currentLang].btn_download}
            </button>
        </div>
    `).join("");
};

addMessage = function (text, isUser) {
    const message = document.createElement("div");
    message.className = `message ${isUser ? "user-message" : "ai-message"}`;

    if (!isUser) {
        const icon = document.createElement("i");
        icon.className = "bx bx-bot";
        message.appendChild(icon);
    }

    const textBlock = document.createElement("div");
    textBlock.className = "text";
    textBlock.textContent = text;
    message.appendChild(textBlock);

    chatMessages.appendChild(message);
    chatMessages.scrollTop = chatMessages.scrollHeight;
};

startQuiz = function () {
    const texts = translations[currentLang];
    const content = document.getElementById("subject-content");

    content.innerHTML = renderQuizLayout(
        texts.quiz_q1,
        `
            <button class="quiz-option" type="button" onclick="wrongAnswer()">${texts.quiz_a}</button>
            <button class="quiz-option" type="button" onclick="correctAnswer()">${texts.quiz_b}</button>
            <button class="quiz-option" type="button" onclick="wrongAnswer()">${texts.quiz_c}</button>
        `
    );
};

correctAnswer = function () {
    const texts = translations[currentLang];
    const content = document.getElementById("subject-content");

    content.innerHTML = renderQuizResultLayout(
        texts.quiz_correct,
        texts.quiz_correct_desc,
        texts.quiz_correct_sub
    );
};

function setupSliderControls() {
    const track = document.getElementById("slides-track");
    if (!track || track.dataset.ready === "true") {
        return;
    }

    track.dataset.ready = "true";
    const controls = document.querySelectorAll(".slide-control");

    controls.forEach((button) => {
        button.addEventListener("click", () => {
            const firstCard = track.querySelector(".slide-card");
            const step = firstCard ? firstCard.getBoundingClientRect().width + 18 : 280;
            const direction = button.dataset.slideDirection === "next" ? 1 : -1;

            track.scrollBy({
                left: step * direction,
                behavior: "smooth"
            });
        });
    });
}

function setupHeroParallax() {
    const scene = document.getElementById("hero-scene");
    if (!scene || scene.dataset.ready === "true") {
        return;
    }

    scene.dataset.ready = "true";

    scene.addEventListener("mousemove", (event) => {
        const rect = scene.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width - 0.5) * 12;
        const y = ((event.clientY - rect.top) / rect.height - 0.5) * 12;

        scene.style.setProperty("--pointer-x", `${x}px`);
        scene.style.setProperty("--pointer-y", `${y}px`);
        scene.style.setProperty("--pointer-x-soft", `${x * 0.45}px`);
        scene.style.setProperty("--pointer-y-soft", `${y * 0.45}px`);
    });

    scene.addEventListener("mouseleave", () => {
        scene.style.setProperty("--pointer-x", "0px");
        scene.style.setProperty("--pointer-y", "0px");
        scene.style.setProperty("--pointer-x-soft", "0px");
        scene.style.setProperty("--pointer-y-soft", "0px");
    });
}

function initFuturisticHome() {
    setupSliderControls();
    setupHeroParallax();
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initFuturisticHome);
} else {
    initFuturisticHome();
}
