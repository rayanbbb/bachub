Object.assign(translations.ar, {
    hero_kicker: "واجهة مراجعة ذكية",
    hero_intro: "تنظيم أخف للدروس والوطنيات والمساعد الذكي داخل واجهة مستقبلية وهادئة.",
    slides_kicker: "مسار سريع",
    slides_title: "سلايدز المراجعة",
    slides_desc: "تنقل بسرعة بين أهم أجزاء الموقع بواجهة أخف وتركيز أوضح.",
    slides_view_all: "عرض الكل",
    slides_category: "الفئات"
});

Object.assign(translations.fr, {
    hero_kicker: "Interface de revision intelligente",
    hero_intro: "Une organisation plus legere pour les cours, les examens nationaux et l'assistant IA dans une interface futuriste et calme.",
    slides_kicker: "Acces rapide",
    slides_title: "Slides de revision",
    slides_desc: "Passez rapidement entre les zones principales du site avec un rythme plus leger et plus clair.",
    slides_view_all: "Voir tout",
    slides_category: "Categorie"
});

Object.assign(translations.en, {
    hero_kicker: "Neural Revision Interface",
    hero_intro: "A lighter layout for lessons, national exams, and AI support inside a calm futuristic dashboard.",
    slides_kicker: "Quick Flow",
    slides_title: "Clean Study Slides",
    slides_desc: "Move through the main study areas with a lighter, more focused rhythm.",
    slides_view_all: "View All",
    slides_category: "Category"
});

Object.assign(translations.ar, {
    cadre_reference: "Cadre referentiel"
});

Object.assign(translations.fr, {
    cadre_reference: "Cadre referentiel"
});

Object.assign(translations.en, {
    cadre_reference: "Cadre Reference"
});

Object.assign(translations.ar, {
    tab_exams: "الامتحانات",
    course_label: "Cours",
    exercises_label: "Exercices"
});

Object.assign(translations.fr, {
    tab_exams: "Examens",
    course_label: "Cours",
    exercises_label: "Exercices"
});

Object.assign(translations.en, {
    tab_exams: "Exams",
    course_label: "Cours",
    exercises_label: "Exercices"
});

Object.assign(translations.ar, {
    ai_status_live: "AI / LIVE",
    ai_status_thinking: "AI / THINKING",
    ai_status_error: "AI / ERROR",
    ai_error_message: "AI mashi disponible daba. Chof wash Cloudflare Worker khddam w 3awd jarrab men ba3d chwya."
});

Object.assign(translations.fr, {
    ai_status_live: "AI / LIVE",
    ai_status_thinking: "AI / THINKING",
    ai_status_error: "AI / ERROR",
    ai_error_message: "L'assistant IA n'est pas disponible maintenant. Verifiez le Cloudflare Worker et reessayez dans un moment."
});

Object.assign(translations.en, {
    ai_status_live: "AI / LIVE",
    ai_status_thinking: "AI / THINKING",
    ai_status_error: "AI / ERROR",
    ai_error_message: "The AI assistant is unavailable right now. Check the Cloudflare Worker and try again in a moment."
});

const cadreReferences = {
    pc: "cadre-pdf/CDR EXAM NAT BAC 25 PC-PC Op FR.pdf",
    math: "cadre-pdf/CDR EXAM NAT BAC 25 MATHS.pdf",
    svt: "cadre-pdf/CDR EXAM NAT BAC 25 SVT-PC Op FR.pdf",
    english: "cadre-pdf/CDR EXAM NAT BAC 25 ANGLAIS.pdf"
};

subjectsData.pc.sem1 = [
    {
        title: "Suivi temporel d'une transformation chimique",
        pdf: "physique-pdf/resume-Suivi-temporel-dune-transformation-chimique-Vitesse-de-reaction-2bac-BIOF-Sciences-Mathematiques-AB-et-Sciences-Physiques-1.pdf"
    },
    {
        title: "Transformations lentes et rapides",
        pdf: "physique-pdf/resume-Transformations-lentes-et-transformations-rapides-2bac-BIOF-Sciences-Mathematiques-AB-et-Sciences-Physiques-2.pdf"
    },
    {
        title: "Ondes mecaniques progressives",
        pdf: true
    },
    {
        title: "Ondes mecaniques progressives periodiques",
        pdf: "physique-pdf/resume-Les-ondes-mecaniques-progressives-periodiques-2bac-BIOF-SVT-1.pdf"
    },
    {
        title: "Propagation d'une onde lumineuse",
        pdf: "physique-pdf/cours-La-propagation-dese-ondes-lumineuses-2bac-BIOF-SVT-1.pdf"
    },
    {
        title: "Transformations chimiques qui ont lieu dans les deux sens",
        pdf: "physique-pdf/resume-Les-transformations-chimiques-qui-seffectuent-dans-les-2-sens-2bac-BIOF-SVT-1.pdf"
    },
    {
        title: "Decroissance radioactive",
        pdf: "physique-pdf/cours-pc-2bac-sm-international-fr-4-2.pdf"
    },
    {
        title: "Noyaux, masse et energie",
        pdf: "physique-pdf/cours-pc-2bac-sm-international-fr-5-2.pdf"
    },
    {
        title: "Dipole RC",
        pdf: "physique-pdf/cours-Dipole-RC-2bac-BIOF-Sciences-Mathematiques-AB-et-Sciences-Physiques-1.pdf"
    },
    {
        title: "Dipole RL",
        pdf: "physique-pdf/cours-pc-2bac-sm-international-fr-7-1.pdf"
    },
    {
        title: "Reactions acido-basiques",
        pdf: "physique-pdf/resume-Les-transformations-liees-a-des-reactions-acide-base-2bac-BIOF-SVT-1.pdf"
    }
];

subjectsData.pc.sem2 = [
    {
        title: "Circuit RLC serie",
        pdf: "physique-pdf/cours-pc-2bac-sp-international-fr-8-1.pdf"
    },
    {
        title: "Evolution spontanee d'un systeme chimique",
        pdf: "physique-pdf/resume-Levolution-spontanee-dun-systeme-chimique-2bac-BIOF-SVT-1.pdf"
    },
    {
        title: "Circuit RLC force (alternatif)",
        pdf: true
    },
    {
        title: "Les piles et recuperation d'energie",
        pdf: true
    },
    {
        title: "Lois de Newton et chute libre verticale",
        pdf: "physique-pdf/resume-La-chute-libre-verticale-dun-solide-2bac-BIOF-SVT-1.pdf"
    },
    {
        title: "Mouvements plans (projectile et particule)",
        pdf: "physique-pdf/cours-pc-2bac-sp-international-fr-20-1.pdf"
    },
    {
        title: "Mouvement des satellites et planetes",
        pdf: "physique-pdf/cours-pc-2bac-sp-international-fr-21-1.pdf"
    },
    {
        title: "Les systemes mecaniques oscillants",
        pdf: "physique-pdf/cours-pc-2bac-science-international-fr-18-2.pdf"
    },
    {
        title: "Le mouvement de rotation d'un solide autour d'un axe fixe",
        pdf: "physique-pdf/cours-Le-mouvement-de-rotation-dun-solide-autour-dun-axe-fixe-2bac-BIOF-SVT-1.pdf"
    },
    {
        title: "Transformations forcees - Electrolyse",
        pdf: "physique-pdf/resume-Transformations-forcees-Electrolyse-2bac-BIOF-Sciences-Mathematiques-AB-et-Sciences-Physiques-1.pdf"
    },
    {
        title: "L'atome et la mecanique de Newton",
        pdf: true
    },
    {
        title: "Reactions d'esterification et d'hydrolyse",
        pdf: true
    },
    {
        title: "Support complementaire - Modulation d'amplitude",
        pdf: "physique-pdf/cours-pc-2bac-sm-international-fr-11-1.pdf"
    },
    {
        title: "Support complementaire - Cinematique vectorielle",
        pdf: "physique-pdf/cours-pc-2bac-sm-international-fr-18-1.pdf"
    },
    {
        title: "Support complementaire - Nomenclature des alcanes",
        pdf: "physique-pdf/cours-pc-2bac-sm-international-fr-29-1.pdf"
    }
];

subjectsData.math.sem1 = [
    {
        title: "Limites et continuite",
        pdf: "math-pdf/resume-Limites-et-continuite-2bac-biof-Sciences-Mathematiques-1.pdf"
    },
    {
        title: "Derivabilite et etude des fonctions",
        pdf: "math-pdf/resume-Derivation-et-etude-des-fonctions-2bac-biof-Sciences-Mathematiques-1.pdf"
    },
    {
        title: "Les suites numeriques",
        pdf: "math-pdf/resume-Suites-numeriques-2bac-biof-Sciences-Mathematiques-1.pdf"
    },
    {
        title: "Les fonctions primitives",
        pdf: "math-pdf/resume-Fonctions-primitives-2bac-biof-Sciences-Mathematiques-1.pdf"
    },
    {
        title: "Fonctions logarithmiques (Ln)",
        pdf: "math-pdf/resume-Fonctions-logarithmiques-2bac-biof-Sciences-Mathematiques-1.pdf"
    },
    {
        title: "Nombres complexes (partie 1)",
        pdf: "math-pdf/resume-Nombres-complexes-partie1-2bac-biof-Sciences-Mathematiques-1.pdf"
    }
];

subjectsData.math.sem2 = [
    {
        title: "Calcul Integral",
        pdf: "math-pdf/resume-Calcul-integral-2bac-biof-Sciences-Mathematiques-1.pdf"
    },
    {
        title: "Denombrement",
        pdf: "math-pdf/resume-Denombrement-2bac-Sciences-Physiques-et-svt-5.pdf"
    },
    {
        title: "Equations Differentielles",
        pdf: "math-pdf/resume-Equations-differentielles-2bac-biof-Sciences-Mathematiques-1.pdf"
    },
    {
        title: "Fonctions Exponentielles",
        pdf: "math-pdf/resume-Fonctions-exponentielles-2bac-biof-Sciences-Mathematiques-1 (1).pdf"
    },
    {
        title: "Geometrie dans l'espace",
        pdf: "math-pdf/resume-Geometrie-dans-lespace-2bac-Sciences-Physiques-et-svt-6.pdf"
    },
    {
        title: "Nombres Complexes",
        pdf: "math-pdf/resume-Nombres-complexes-partie1-2bac-biof-Sciences-Mathematiques-1.pdf"
    },
    {
        title: "Probabilites",
        pdf: "math-pdf/resume-Probabilites-2bac-biof-Sciences-Mathematiques-1.pdf"
    }
];

subjectsData.svt = {
    sem1: [
        {
            title: "Première partie: Consommation de la matière organique et flux d’énergie",
            pdf: "svt-pdf/Cours-Unit1-1.pdf"
        },
        {
            title: "Chapitre 2: Rôle du muscle squelettique strié dans la conversion de l’énergie",
            pdf: "svt-pdf/Cours-Unit1-2.pdf"
        },
        {
            title: "Deuxième partie: Nature et mécanisme de l’expression du matériel génétique et le génie génétique",
            pdf: "svt-pdf/Cours-Unit2-1.pdf"
        },
        {
            title: "Chapitre 2: Expression de l’information génétique",
            pdf: "svt-pdf/Cours-Unit2-2.pdf"
        },
        {
            title: "Chapitre 3: Transfert de l’information génétique au cours de la reproduction sexuée",
            pdf: "svt-pdf/Cours-Unit2-3.pdf"
        },
        {
            title: "Chapitre 4: Les lois statistiques de la transmission des caractères héréditaires chez les diploïdes",
            pdf: "svt-pdf/Cours-Unit2-4.pdf"
        }
    ],
    sem2: [
        {
            title: "Troisième partie: Utilisation des matières organiques et inorganiques",
            pdf: "svt-pdf/Cours-Unit3-1.pdf"
        },
        {
            title: "Chapitre 2: Les pollutions issues de la consommation des produits énergétiques, de l’utilisation de la matière organique et inorganique dans les industries chimiques, alimentaires et minérales",
            pdf: "svt-pdf/Cours-Unit3-2.pdf"
        },
        {
            title: "Chapitre 3: Les matières radioactives et l’énergie nucléaire",
            pdf: "svt-pdf/Cours-Unit3-3.pdf"
        },
        {
            title: "Chapitre 4: Contrôle de la qualité et de la salubrité des milieux naturels",
            pdf: "svt-pdf/Cours-Unit3-4.pdf"
        },
        {
            title: "Quatrième partie: Les phénomènes géologiques accompagnant la formation des chaînes de montagnes et leur relation avec la tectonique des plaques",
            pdf: "svt-pdf/Cours-Unit4-1.pdf"
        },
        {
            title: "Chapitre 2: Le métamorphisme et sa relation avec la tectonique des plaques",
            pdf: "svt-pdf/Cours-Unit4-2.pdf"
        },
        {
            title: "Chapitre 3: La granitisation et sa relation avec le métamorphisme",
            pdf: "svt-pdf/Cours-Unit4-3.pdf"
        }
    ],
    quizzes: []
};

wataniyatData.math = [
    { title: "2025 - Session Normale", pdf: "math-na/Examen National 2025 - Session Normal.pdf" },
    { title: "2025 - Session Rattrapage", pdf: "math-na/Examen National 2025 Session Rattrapage.pdf" },
    { title: "2024 - Session Normale", pdf: "math-na/Examen National 2024 - Session Normal.pdf" },
    { title: "2024 - Session Rattrapage", pdf: "math-na/Examen National 2024 - Session Rattrapage.pdf" },
    { title: "2023 - Session Normale", pdf: "math-na/Normal 2023.pdf" },
    { title: "2023 - Session Rattrapage", pdf: "math-na/Rattrapage 2023.pdf" },
    { title: "2022 - Session Normale", pdf: "math-na/Normal 2022.pdf" },
    { title: "2022 - Session Rattrapage", pdf: "math-na/Rattrapage 2022.pdf" },
    { title: "2021 - Session Normale", pdf: "math-na/Normal 2021.pdf" },
    { title: "2021 - Session Rattrapage", pdf: "math-na/Rattrapage 2021.pdf" },
    { title: "2020 - Session Normale", pdf: "math-na/Normal 2020.pdf" },
    { title: "2020 - Session Rattrapage", pdf: "math-na/Rattrapage 2020.pdf" }
];

wataniyatData.pc = [
    { title: "2024 - Session Normale", pdf: "physique-na/examen-national-physique-chimie-spc-2024-normale-sujet.pdf" },
    { title: "2024 - Session Rattrapage", pdf: "physique-na/examen-national-physique-chimie-spc-2024-rattrapage-sujet.pdf" },
    { title: "2023 - Session Normale", pdf: "physique-na/examen-national-physique-chimie-spc-2023-normale-sujet.pdf" },
    { title: "2023 - Session Rattrapage", pdf: "physique-na/examen-national-physique-chimie-spc-2023-rattrapage-sujet.pdf" },
    { title: "2022 - Session Normale", pdf: "physique-na/examen-national-physique-chimie-spc-2022-normale-sujet.pdf" },
    { title: "2022 - Session Rattrapage", pdf: "physique-na/examen-national-physique-chimie-spc-2022-rattrapage-sujet.pdf" },
    { title: "2021 - Session Normale", pdf: "physique-na/examen-national-physique-chimie-spc-2021-normale-sujet.pdf" },
    { title: "2021 - Session Rattrapage", pdf: "physique-na/examen-national-physique-chimie-spc-2021-rattrapage-sujet.pdf" },
    { title: "2020 - Session Normale", pdf: "physique-na/examen-national-physique-chimie-spc-2020-normale-sujet.pdf" },
    { title: "2020 - Session Rattrapage", pdf: "physique-na/examen-national-physique-chimie-spc-2020-rattrapage-sujet.pdf" }
];

wataniyatData.svt = [
    { title: "2025 - Session Normale", pdf: "svt-na/examen-national-svt-sciences-physiques-2025-normale-sujet.pdf" },
    { title: "2023 - Session Normale", pdf: "svt-na/examen-national-svt-sciences-physiques-2023-normale-sujet.pdf" },
    { title: "2023 - Session Rattrapage", pdf: "svt-na/examen-national-svt-sciences-physiques-2023-rattrapage-sujet.pdf" },
    { title: "2022 - Session Normale", pdf: "svt-na/examen-national-svt-sciences-physiques-2022-normale-sujet.pdf" },
    { title: "2022 - Session Rattrapage", pdf: "svt-na/examen-national-svt-sciences-physiques-2022-rattrapage-sujet.pdf" },
    { title: "2021 - Session Normale", pdf: "svt-na/examen-national-svt-sciences-physiques-2021-normale-sujet.pdf" },
    { title: "2021 - Session Rattrapage", pdf: "svt-na/examen-national-svt-sciences-physiques-2021-rattrapage-sujet.pdf" },
    { title: "2020 - Session Normale", pdf: "svt-na/examen-national-svt-sciences-physiques-2020-normale-sujet.pdf" },
    { title: "2020 - Session Rattrapage", pdf: "svt-na/examen-national-svt-sciences-physiques-2020-rattrapage-sujet.pdf" },
    { title: "2019 - Session Normale", pdf: "svt-na/examen-national-svt-sciences-physiques-2019-normale-sujet.pdf" },
    { title: "2019 - Session Rattrapage", pdf: "svt-na/examen-national-svt-sciences-physiques-2019-rattrapage-sujet.pdf" },
    { title: "2018 - Session Normale", pdf: "svt-na/examen-national-svt-sciences-physiques-2018-normale-sujet.pdf" },
    { title: "2018 - Session Rattrapage", pdf: "svt-na/examen-national-svt-sciences-physiques-2018-rattrapage-sujet.pdf" }
];

subjectsData.english = {
    sem1: [
        { title: "English - Reading Comprehension Essentials", pdf: true },
        { title: "English - Grammar and Tenses Review", pdf: true },
        { title: "English - Writing Paragraphs and Emails", pdf: true }
    ],
    sem2: [
        { title: "English - Essay Writing and Communication", pdf: true },
        { title: "English - Functions, Vocabulary, and Speaking", pdf: true },
        { title: "English - Exam Practice and Text Analysis", pdf: true }
    ],
    quizzes: [
        { title: "Quiz 1: English Grammar and Vocabulary", action: "startLiteraryQuiz('english')" }
    ]
};

subjectsData.philo = {
    sem1: [
        { title: "Philosophy - Consciousness and the Unconscious", pdf: true },
        { title: "Philosophy - Desire and Happiness", pdf: true }
    ],
    sem2: [
        { title: "Philosophy - Freedom and Responsibility", pdf: true },
        { title: "Philosophy - Truth, State, and Violence", pdf: true }
    ],
    quizzes: [
        { title: "Quiz 1: Philosophy Core Concepts", action: "startLiteraryQuiz('philosophy')" }
    ]
};

wataniyatData.english = [
    { title: "English - 2023 Session Normale", pdf: "eng-na/examen-anglais-2023-session-normale-sujet.pdf" },
    { title: "English - 2023 Session Rattrapage", pdf: "eng-na/examen-anglais-2023-session-rattrapage-sujet.pdf" },
    { title: "English - 2022 Session Normale", pdf: "eng-na/examen-anglais-2022-session-normale-sujet-1.pdf" },
    { title: "English - 2022 Session Rattrapage", pdf: "eng-na/examen-anglais-2022-session-rattrapage-sujet.pdf" },
    { title: "English - 2021 Session Normale", pdf: true },
    { title: "English - 2021 Session Rattrapage", pdf: "eng-na/examen-anglais-2021-session-rattrapage-sujet.pdf" },
    { title: "English - 2020 Session Normale", pdf: "eng-na/examen-anglais-2020-session-normale-sujet-1.pdf" },
    { title: "English - 2020 Session Rattrapage", pdf: true },
    { title: "English - 2019 Session Normale", pdf: "eng-na/examen-anglais-2019-session-normale-sujet.pdf" },
    { title: "English - 2019 Session Rattrapage", pdf: "eng-na/examen-anglais-2019-session-rattrapage-sujet.pdf" },
    { title: "English - 2018 Session Normale", pdf: "eng-na/examen-anglais-2018-session-normale-sujet.pdf" },
    { title: "English - 2018 Session Rattrapage", pdf: "eng-na/examen-anglais-2018-session-rattrapage-sujet.pdf" },
    { title: "English - 2017 Session Normale", pdf: "eng-na/examen-anglais-2017-session-normale-sujet-1.pdf" },
    { title: "English - 2017 Session Rattrapage", pdf: "eng-na/examen-anglais-2017-session-rattrapage-sujet-1.pdf" },
    { title: "English - 2016 Session Normale", pdf: "eng-na/examen-anglais-2016-session-normale-sujet-1.pdf" },
    { title: "English - 2016 Session Rattrapage", pdf: "eng-na/examen-anglais-2016-session-rattrapage-sujet-1.pdf" }
];

wataniyatData.philo = [
    { title: "Philosophy - 2023 Session Normale", pdf: "Philosophie-na/alflsfa-llshab-alalmia-oaltqnia-2023-aldora-alaadia-almodhoa.pdf" },
    { title: "Philosophy - 2023 Session Rattrapage", pdf: "Philosophie-na/alflsfa-llshab-alalmia-oaltqnia-2023-aldora-alistdrakia-almodhoa.pdf" },
    { title: "Philosophy - 2022 Session Normale", pdf: "Philosophie-na/alflsfa-llshab-alalmia-oaltqnia-2022-aldora-alaadia-almodhoa.pdf" },
    { title: "Philosophy - 2022 Session Rattrapage", pdf: "Philosophie-na/alflsfa-llshab-alalmia-oaltqnia-2022-aldora-alistdrakia-almodhoa.pdf" },
    { title: "Philosophy - 2021 Session Normale", pdf: "Philosophie-na/alflsfa-llshab-alalmia-oaltqnia-2021-aldora-alaadia-almodhoa.pdf" },
    { title: "Philosophy - 2021 Session Rattrapage", pdf: true },
    { title: "Philosophy - 2020 Session Normale", pdf: "Philosophie-na/alflsfa-llshab-alalmia-oaltqnia-2020-aldora-alaadia-almodhoa.pdf" },
    { title: "Philosophy - 2020 Session Rattrapage", pdf: "Philosophie-na/alflsfa-llshab-alalmia-oaltqnia-2020-aldora-alistdrakia-almodhoa.pdf" }
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

function buildPdfButtonMarkup(pdfPath) {
    if (pdfPath === true) {
        return `
            <button class="btn primary-btn" type="button" onclick="showPdfAlert()">
                <i class='bx bx-link-external'></i>
                ${translations[currentLang].btn_download}
            </button>
        `;
    }

    const safePath = String(pdfPath)
        .replace(/&/g, "&amp;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");

    return `
        <a class="btn primary-btn" href="${safePath}" target="_blank" rel="noopener noreferrer">
            <i class='bx bx-link-external'></i>
            ${translations[currentLang].btn_download}
        </a>
    `;
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

const courseExerciseOverrides = {
    math: {
        "Limites et continuite": "math-pdf/exo/exercices-Limites-et-continuite-2bac-Sciences-Physiques-et-svt-3.pdf"
    }
};

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function buildResourceButtonMarkup(pdfPath, label, modifier = "") {
    const buttonLabel = escapeHtml(label);
    const modifierClass = modifier ? ` ${modifier}` : "";

    if (pdfPath === true || !pdfPath) {
        return `
            <button class="resource-action-btn${modifierClass} is-placeholder" type="button" onclick="showPdfAlert()">
                <i class='bx bx-link-external'></i>
                <span>${buttonLabel}</span>
            </button>
        `;
    }

    const safePath = String(pdfPath)
        .replace(/&/g, "&amp;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");

    return `
        <a class="resource-action-btn${modifierClass}" href="${safePath}" target="_blank" rel="noopener noreferrer">
            <i class='bx bx-link-external'></i>
            <span>${buttonLabel}</span>
        </a>
    `;
}

function getExercisePdfPath(subject, item) {
    if (item.exercisePdf) {
        return item.exercisePdf;
    }

    if (item.exercisesPdf) {
        return item.exercisesPdf;
    }

    const subjectOverrides = courseExerciseOverrides[subject] || {};
    return subjectOverrides[item.title] || item.pdf || true;
}

function buildCourseAccordionMarkup(item, index) {
    const texts = translations[currentLang];
    const courseLabel = texts.course_label || "Cours";
    const exercisesLabel = texts.exercises_label || "Exercices";
    const itemTitle = escapeHtml(item.title);
    const coursePdf = item.coursePdf || item.pdf;
    const exercisesPdf = getExercisePdfPath(currentSubject, item);

    return `
        <article class="course-accordion-item${index === 0 ? " is-open" : ""}">
            <button class="course-accordion-trigger" type="button" aria-expanded="${index === 0 ? "true" : "false"}" onclick="toggleCourseAccordion(this)">
                <div class="course-accordion-copy">
                    <div class="item-icon">
                        <i class='bx bxs-file-pdf'></i>
                    </div>
                    <div class="course-accordion-text">
                        <strong>${itemTitle}</strong>
                        <span>${escapeHtml(currentSubject.toUpperCase())} / ${escapeHtml(currentCategory.toUpperCase())}</span>
                    </div>
                </div>
                <i class='bx bx-chevron-down course-accordion-arrow'></i>
            </button>

            <div class="course-accordion-panel">
                <div class="course-resource-actions">
                    ${buildResourceButtonMarkup(coursePdf, courseLabel)}
                    ${buildResourceButtonMarkup(exercisesPdf, exercisesLabel, "secondary")}
                </div>
            </div>
        </article>
    `;
}

function buildExamListMarkup(items) {
    return items.map((item) => `
        <div class="exam-list-item">
            <div class="item-copy">
                <div class="item-icon">
                    <i class='bx bx-medal'></i>
                </div>
                <span>${escapeHtml(item.title)}</span>
            </div>
            ${buildPdfButtonMarkup(item.pdf)}
        </div>
    `).join("");
}

function setCourseAccordionState(item, isOpen) {
    if (!item) {
        return;
    }

    const trigger = item.querySelector(".course-accordion-trigger");
    const panel = item.querySelector(".course-accordion-panel");
    item.classList.toggle("is-open", Boolean(isOpen));

    if (trigger) {
        trigger.setAttribute("aria-expanded", String(Boolean(isOpen)));
    }

    if (panel) {
        panel.style.maxHeight = isOpen ? `${panel.scrollHeight}px` : "0px";
    }
}

function syncCourseAccordionHeights() {
    document.querySelectorAll(".course-accordion-item").forEach((item) => {
        setCourseAccordionState(item, item.classList.contains("is-open"));
    });
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

    if (category === "exams") {
        const exams = wataniyatData[currentSubject] || [];
        if (exams.length === 0) {
            renderEmptyState(content);
            return;
        }

        content.innerHTML = buildExamListMarkup(exams);
        return;
    }

    if (!subjectData || !subjectData[category] || subjectData[category].length === 0) {
        renderEmptyState(content);
        return;
    }

    const items = [...subjectData[category]];

    if (category !== "quizzes" && cadreReferences[currentSubject]) {
        items.unshift({
            title: translations[currentLang].cadre_reference,
            pdf: cadreReferences[currentSubject],
            exercisePdf: true
        });
    }

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

    content.innerHTML = items.map((item, index) => buildCourseAccordionMarkup(item, index)).join("");
    requestAnimationFrame(syncCourseAccordionHeights);
};

toggleCourseAccordion = function (trigger) {
    const currentItem = trigger.closest(".course-accordion-item");
    const isOpen = currentItem.classList.contains("is-open");

    document.querySelectorAll(".course-accordion-item").forEach((item) => {
        setCourseAccordionState(item, false);
    });

    if (!isOpen) {
        setCourseAccordionState(currentItem, true);
    }
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
            ${buildPdfButtonMarkup(item.pdf)}
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
