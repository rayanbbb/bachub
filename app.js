// ====== TRANSLATIONS DATA ====== //
const translations = {
    ar: {
        title: "منصة باكالوريا التميز - 2BAC PC",
        sidebar_logo: "BacHub",
        nav_home: "الرئيسية",
        nav_subjects: "المواد",
        nav_wataniyat: "الامتحانات الوطنية",
        nav_ai: "المساعد الذكي (AI)",
        home_greeting: "مرحباً بك، أستاذ المستقبل! 🚀",
        home_countdown: "الوقت المتبقي للإمتحان الوطني:",
        time_day: "يوم",
        time_hour: "ساعة",
        time_minute: "دقيقة",
        subject_pc: "الفيزياء والكيمياء",
        subject_pc_desc: "معامل 7 (المادة الأساسية)",
        subject_math: "الرياضيات",
        subject_math_desc: "معامل 7",
        subject_svt: "علوم الحياة والأرض",
        subject_svt_desc: "معامل 5",
        subject_english: "الإنجليزية",
        subject_english_desc: "اللغة الإنجليزية",
        subject_philo: "الفلسفة",
        subject_philo_desc: "مادة الفلسفة",
        btn_review: "راجع الآن",
        subjects_title: "المواد 📚",
        subjects_desc: "اختار المادة باش يبانو لك الدروس والكويزات ديولها",
        tab_svt: "علوم الحياة والأرض",
        tab_sem1: "الدورة الأولى",
        tab_sem2: "الدورة الثانية",
        tab_quizzes: "كويزات الاختبار",
        tab_exams: "الامتحانات",
        wataniyat_title: "الامتحانات الوطنية 🎓",
        wataniyat_desc: "الوطنيات السابقة مقسمة حسب المواد لتسهيل المراجعة",
        empty_lessons: "قريبا غنحطو دروس هاد المادة...",
        btn_download: "تحميل",
        quiz_q1: "السؤال 1 (PC): شنو هي الوحدة العالمية ديال \"النشاط الإشعاعي\" (Activité Radioactive)؟",
        quiz_a: "A - المول (Mol)",
        quiz_b: "B - البيكريل (Bq)",
        quiz_c: "C - الجول (J)",
        quiz_wrong: "جواب غالط، زيد فكر مزيان!",
        quiz_correct: "جواب صحيح! برافو 👏",
        quiz_correct_desc: "الوحدة العالمية للنشاط الإشعاعي هي البكريل (Becquerel - Bq).",
        quiz_correct_sub: "حيت 1Bq كيعني تفتت واحد فالثانية (1 désintégration par seconde).",
        btn_return: "رجع للدروس",
        ai_title: "المساعد الذكي للوطني 🤖",
        ai_desc: "سول أي حاجة مافهمتيهاش، وأنا نشرحها ليك بالتفصيل!",
        ai_placeholder: "اكتب السؤال ديالك هنا (مثلا: شرح ليا المكاملة بالأجزاء)...",
        ai_welcome: "أش خبارك؟ أنا المساعد الذكي ديالك. شنو الدرس لي بغيتيني نشرح ليك اليوم ف PC ولا الماط؟",
        ai_mock_reply: "أنا دابا غير فالمرحلة التجريبية (Mock) 😊. من بعد غنربطوني مع الـ API باش نولي أستاذ الذكاء الاصطناعي.",
        alert_pdf: "من بعد غنربطو هاد البوطون مع ملفات PDF ديالك 🎉"
    },
    fr: {
        title: "Plateforme d'Excellence Bac - 2BAC PC",
        sidebar_logo: "BacHub",
        nav_home: "Accueil",
        nav_subjects: "Matières",
        nav_wataniyat: "Examens Nationaux",
        nav_ai: "Assistant IA",
        home_greeting: "Bienvenue, Futur Bachelier ! 🚀",
        home_countdown: "Temps restant avant l'Examen National :",
        time_day: "Jour",
        time_hour: "Heure",
        time_minute: "Minute",
        subject_pc: "Physique-Chimie",
        subject_pc_desc: "Coefficient 7 (Matière principale)",
        subject_math: "Mathématiques",
        subject_math_desc: "Coefficient 7",
        subject_svt: "SVT",
        subject_svt_desc: "Coefficient 5",
        subject_english: "Anglais",
        subject_english_desc: "Langue Anglaise",
        subject_philo: "Philosophie",
        subject_philo_desc: "Matière de Philosophie",
        btn_review: "Réviser",
        subjects_title: "Matières 📚",
        subjects_desc: "Choisissez la matière pour voir les cours et quiz",
        tab_svt: "SVT",
        tab_sem1: "1er Semestre",
        tab_sem2: "2ème Semestre",
        tab_quizzes: "Quiz & Tests",
        tab_exams: "Examens",
        wataniyat_title: "Examens Nationaux 🎓",
        wataniyat_desc: "Examens nationaux précédents par matière",
        empty_lessons: "Le contenu de cette matière sera bientôt disponible...",
        btn_download: "Télécharger",
        quiz_q1: "Question 1 (PC) : Quelle est l'unité internationale de l'\"Activité Radioactive\" ?",
        quiz_a: "A - La Mole (Mol)",
        quiz_b: "B - Le Becquerel (Bq)",
        quiz_c: "C - Le Joule (J)",
        quiz_wrong: "Mauvaise réponse, réfléchissez bien !",
        quiz_correct: "Bonne réponse ! Bravo 👏",
        quiz_correct_desc: "L'unité internationale de l'activité radioactive est le Becquerel (Bq).",
        quiz_correct_sub: "Car 1Bq signifie une désintégration par seconde.",
        btn_return: "Retour aux cours",
        ai_title: "Assistant National IA 🤖",
        ai_desc: "Posez vos questions et je vous expliquerai en détail !",
        ai_placeholder: "Écrivez votre question ici...",
        ai_welcome: "Comment allez-vous ? Je suis votre Assistant IA. Que voulez-vous que je vous explique aujourd'hui ?",
        ai_mock_reply: "Je suis actuellement en phase de test (Mock) 😊. Plus tard, je serai connecté à l'API.",
        alert_pdf: "Ce bouton sera bientôt lié à vos fichiers PDF 🎉"
    },
    en: {
        title: "Bac Excellence Platform - 2BAC PC",
        sidebar_logo: "BacHub",
        nav_home: "Home",
        nav_subjects: "Subjects",
        nav_wataniyat: "National Exams",
        nav_ai: "AI Assistant",
        home_greeting: "Welcome, Future Graduate! 🚀",
        home_countdown: "Time remaining until the National Exam:",
        time_day: "Day",
        time_hour: "Hour",
        time_minute: "Minute",
        subject_pc: "Physics-Chemistry",
        subject_pc_desc: "Coefficient 7 (Core subject)",
        subject_math: "Mathematics",
        subject_math_desc: "Coefficient 7",
        subject_svt: "Life & Earth Sciences",
        subject_svt_desc: "Coefficient 5",
        subject_english: "English",
        subject_english_desc: "English Language",
        subject_philo: "Philosophy",
        subject_philo_desc: "Philosophy Subject",
        btn_review: "Review Now",
        subjects_title: "Subjects 📚",
        subjects_desc: "Select a subject to view its courses and quizzes",
        tab_svt: "Life & Earth Sci",
        tab_sem1: "Semester 1",
        tab_sem2: "Semester 2",
        tab_quizzes: "Quizzes & Tests",
        tab_exams: "Exams",
        wataniyat_title: "National Exams 🎓",
        wataniyat_desc: "Past national exams grouped by subject",
        empty_lessons: "Content for this subject will be available soon...",
        btn_download: "Download",
        quiz_q1: "Question 1 (PC): What is the international unit for \"Radioactive Activity\"?",
        quiz_a: "A - Mole (Mol)",
        quiz_b: "B - Becquerel (Bq)",
        quiz_c: "C - Joule (J)",
        quiz_wrong: "Wrong answer, think again!",
        quiz_correct: "Correct answer! Well done 👏",
        quiz_correct_desc: "The international unit for radioactive activity is the Becquerel (Bq).",
        quiz_correct_sub: "Because 1Bq means one disintegration per second.",
        btn_return: "Return to lessons",
        ai_title: "National AI Assistant 🤖",
        ai_desc: "Ask anything you don't understand!",
        ai_placeholder: "Type your question here...",
        ai_welcome: "How are you? I'm your AI Assistant. What would you like me to explain today?",
        ai_mock_reply: "I'm currently in a testing phase (Mock) 😊. Later, I'll be connected to an API.",
        alert_pdf: "This button will be linked to your PDF files soon 🎉"
    }
};

let currentLang = 'en';
let currentSubject = 'pc';
let currentCategory = 'sem1';
let currentWataniyatSubject = 'pc';

function translatePage() {
    const texts = translations[currentLang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (texts[key]) el.innerHTML = texts[key];
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (texts[key]) el.placeholder = texts[key];
    });
}

function setLang(lang) {
    currentLang = lang;
    const htmlRoot = document.getElementById('html-root');
    htmlRoot.setAttribute('lang', lang);
    htmlRoot.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

    document.querySelectorAll('.lang-switcher button').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`lang-${lang}`).classList.add('active');

    translatePage();
    
    // Refresh views to translate dynamically rendered content
    const activeViewId = document.querySelector('.view.active-view').id;
    if (activeViewId === 'lessons') {
        showCategory(currentCategory);
    } else if (activeViewId === 'wataniyat') {
        showWataniyat(currentWataniyatSubject);
    }
}

// Navigation logic
const navItems = document.querySelectorAll('.nav-links li');
const views = document.querySelectorAll('.view');
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navItems.forEach(nav => nav.classList.remove('active'));
        views.forEach(view => {
            view.classList.remove('active-view');
            view.classList.add('hidden-view');
        });
        item.classList.add('active');
        const targetId = item.getAttribute('data-target');
        const targetView = document.getElementById(targetId);
        targetView.classList.remove('hidden-view');
        targetView.classList.add('active-view');
        
        // Setup initial tabs on nav
        if (targetId === 'lessons') {
            showSubject(currentSubject);
        } else if (targetId === 'wataniyat') {
            showWataniyat(currentWataniyatSubject);
        }
    });
});

function goTo(viewId, subject) {
    const targetLink = document.querySelector(`[data-target="${viewId}"]`);
    if(targetLink) targetLink.click();
    if (viewId === 'lessons' && subject) showSubject(subject);
}

// Countdown
const currentYear = new Date().getFullYear();
const examDate = new Date(`June 4, ${currentYear} 08:00:00`).getTime();
function updateCountdown() {
    const now = new Date().getTime();
    const distance = examDate - now;
    if (distance < 0) {
        document.getElementById('days').innerText = "00";
        document.getElementById('hours').innerText = "00";
        document.getElementById('minutes').innerText = "00";
        return;
    }
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    document.getElementById('days').innerText = days.toString().padStart(2, '0');
    document.getElementById('hours').innerText = hours.toString().padStart(2, '0');
    document.getElementById('minutes').innerText = minutes.toString().padStart(2, '0');
}
setInterval(updateCountdown, 1000);
updateCountdown();

// Subjects Data Structure
const subjectsData = {
    'pc': {
        'sem1': [
            { title: "Suivi temporel d'une transformation chimique", pdf: true },
            { title: "Ondes mécaniques progressives", pdf: true },
            { title: "Ondes mécaniques progressives périodiques", pdf: true },
            { title: "Propagation d'une onde lumineuse", pdf: true },
            { title: "Transformations chimiques qui ont lieu dans les deux sens", pdf: true },
            { title: "Décroissance radioactive", pdf: true },
            { title: "Noyaux, masse et énergie", pdf: true },
            { title: "Dipôle RC", pdf: true },
            { title: "Dipôle RL", pdf: true },
            { title: "Réactions acido-basiques", pdf: true }
        ],
        'sem2': [
            { title: "Circuit RLC série", pdf: true },
            { title: "Evolution spontanée d'un système chimique", pdf: true },
            { title: "Circuit RLC forcé (Alternatif)", pdf: true },
            { title: "Les piles et récupération d'énergie", pdf: true },
            { title: "Lois de Newton & Chute verticale", pdf: true },
            { title: "Mouvements plans (Projectile & Particule)", pdf: true },
            { title: "Mouvement des satellites et planètes", pdf: true },
            { title: "Les systèmes mécaniques oscillants", pdf: true },
            { title: "L'atome et la mécanique de Newton", pdf: true },
            { title: "Réactions d'estérification et d'hydrolyse", pdf: true }
        ],
        'quizzes': [
            { title: "Quiz 1: التحولات النووية والنشاط الإشعاعي", action: "startQuiz()" }
        ]
    },
    'math': {
        'sem1': [
            { title: "Limites et Continuité", pdf: true },
            { title: "Dérivabilité et Etude des fonctions", pdf: true },
            { title: "Les Suites Numériques", pdf: true },
            { title: "Les Fonctions Primitives", pdf: true },
            { title: "Fonctions Logarithmiques (Ln)", pdf: true },
            { title: "Nombres Complexes (Partie 1)", pdf: true }
        ],
        'sem2': [
            { title: "Calcul Intégral", pdf: 'math-pdf/resume-Calcul-integral-2bac-biof-Sciences-Mathematiques-1.pdf' },
            { title: "Dénombrement", pdf: 'math-pdf/resume-Denombrement-2bac-Sciences-Physiques-et-svt-5.pdf' },
            { title: "Equations Différentielles", pdf: 'math-pdf/resume-Equations-differentielles-2bac-biof-Sciences-Mathematiques-1.pdf' },
            { title: "Fonctions Exponentielles", pdf: 'math-pdf/resume-Fonctions-exponentielles-2bac-biof-Sciences-Mathematiques-1 (1).pdf' },
            { title: "Géométrie dans l'espace", pdf: 'math-pdf/resume-Geometrie-dans-lespace-2bac-Sciences-Physiques-et-svt-6.pdf' },
            { title: "Nombres Complexes (Partie 2)", pdf: 'math-pdf/resume-Nombres-complexes-partie1-2bac-biof-Sciences-Mathematiques-1.pdf' },
            { title: "Probabilités", pdf: 'math-pdf/resume-Probabilites-2bac-biof-Sciences-Mathematiques-1.pdf' }
        ],
        'quizzes': []
    },
    'svt': {
        'sem1': [
            { title: "Consommation de la Matière Organique (ATP)", pdf: true },
            { title: "Rôle du muscle strié squelettique", pdf: true },
            { title: "L'information Génétique: Nature et mécanisme", pdf: true },
            { title: "Transfert de l'information génétique (Méiose, Fécondation)", pdf: true },
            { title: "Lois statistiques de transmission", pdf: true }
        ],
        'sem2': [
            { title: "Utilisation des matières organiques et inorganiques (Pollution)", pdf: true }
        ],
        'quizzes': []
    },
    'english': {
        'sem1': [],
        'sem2': [],
        'quizzes': []
    },
    'philo': {
        'sem1': [],
        'sem2': [],
        'quizzes': []
    }
};

const wataniyatData = {
    'pc': [
        { title: "2024 - Session Normale", pdf: 'physique-na/examen-national-physique-chimie-spc-2024-normale-sujet.pdf' },
        { title: "2024 - Session Rattrapage", pdf: 'physique-na/examen-national-physique-chimie-spc-2024-rattrapage-sujet.pdf' },
        { title: "2023 - Session Normale", pdf: 'physique-na/examen-national-physique-chimie-spc-2023-normale-sujet.pdf' },
        { title: "2023 - Session Rattrapage", pdf: 'physique-na/examen-national-physique-chimie-spc-2023-rattrapage-sujet.pdf' },
        { title: "2022 - Session Normale", pdf: 'physique-na/examen-national-physique-chimie-spc-2022-normale-sujet.pdf' },
        { title: "2022 - Session Rattrapage", pdf: 'physique-na/examen-national-physique-chimie-spc-2022-rattrapage-sujet.pdf' },
        { title: "2021 - Session Normale", pdf: 'physique-na/examen-national-physique-chimie-spc-2021-normale-sujet.pdf' },
        { title: "2021 - Session Rattrapage", pdf: 'physique-na/examen-national-physique-chimie-spc-2021-rattrapage-sujet.pdf' },
        { title: "2020 - Session Normale", pdf: 'physique-na/examen-national-physique-chimie-spc-2020-normale-sujet.pdf' },
        { title: "2020 - Session Rattrapage", pdf: 'physique-na/examen-national-physique-chimie-spc-2020-rattrapage-sujet.pdf' }
    ],
    'math': [
        { title: "2025 - Session Normale", pdf: 'math-na/Examen National 2025 - Session Normal.pdf' },
        { title: "2025 - Session Rattrapage", pdf: 'math-na/Examen National 2025 Session Rattrapage.pdf' },
        { title: "2024 - Session Normale", pdf: 'math-na/Examen National 2024 - Session Normal.pdf' },
        { title: "2024 - Session Rattrapage", pdf: 'math-na/Examen National 2024 - Session Rattrapage.pdf' },
        { title: "2023 - Session Normale", pdf: 'math-na/Normal 2023.pdf' },
        { title: "2023 - Session Rattrapage", pdf: 'math-na/Rattrapage 2023.pdf' },
        { title: "2022 - Session Normale", pdf: 'math-na/Normal 2022.pdf' },
        { title: "2022 - Session Rattrapage", pdf: 'math-na/Rattrapage 2022.pdf' },
        { title: "2021 - Session Normale", pdf: 'math-na/Normal 2021.pdf' },
        { title: "2021 - Session Rattrapage", pdf: 'math-na/Rattrapage 2021.pdf' },
        { title: "2020 - Session Normale", pdf: 'math-na/Normal 2020.pdf' },
        { title: "2020 - Session Rattrapage", pdf: 'math-na/Rattrapage 2020.pdf' }
    ],
    'svt': [
        { title: "2025 - Session Normale", pdf: 'svt-na/examen-national-svt-sciences-physiques-2025-normale-sujet.pdf' },
        { title: "2023 - Session Normale", pdf: 'svt-na/examen-national-svt-sciences-physiques-2023-normale-sujet.pdf' },
        { title: "2023 - Session Rattrapage", pdf: 'svt-na/examen-national-svt-sciences-physiques-2023-rattrapage-sujet.pdf' },
        { title: "2022 - Session Normale", pdf: 'svt-na/examen-national-svt-sciences-physiques-2022-normale-sujet.pdf' },
        { title: "2022 - Session Rattrapage", pdf: 'svt-na/examen-national-svt-sciences-physiques-2022-rattrapage-sujet.pdf' },
        { title: "2021 - Session Normale", pdf: 'svt-na/examen-national-svt-sciences-physiques-2021-normale-sujet.pdf' },
        { title: "2021 - Session Rattrapage", pdf: 'svt-na/examen-national-svt-sciences-physiques-2021-rattrapage-sujet.pdf' },
        { title: "2020 - Session Normale", pdf: 'svt-na/examen-national-svt-sciences-physiques-2020-normale-sujet.pdf' },
        { title: "2020 - Session Rattrapage", pdf: 'svt-na/examen-national-svt-sciences-physiques-2020-rattrapage-sujet.pdf' },
        { title: "2019 - Session Normale", pdf: 'svt-na/examen-national-svt-sciences-physiques-2019-normale-sujet.pdf' },
        { title: "2019 - Session Rattrapage", pdf: 'svt-na/examen-national-svt-sciences-physiques-2019-rattrapage-sujet.pdf' },
        { title: "2018 - Session Normale", pdf: 'svt-na/examen-national-svt-sciences-physiques-2018-normale-sujet.pdf' },
        { title: "2018 - Session Rattrapage", pdf: 'svt-na/examen-national-svt-sciences-physiques-2018-rattrapage-sujet.pdf' }
    ],
    'english': [
        { title: "English - 2023 Session Normale", pdf: 'eng-na/examen-anglais-2023-session-normale-sujet.pdf' },
        { title: "English - 2023 Session Rattrapage", pdf: 'eng-na/examen-anglais-2023-session-rattrapage-sujet.pdf' },
        { title: "English - 2022 Session Normale", pdf: 'eng-na/examen-anglais-2022-session-normale-sujet-1.pdf' },
        { title: "English - 2022 Session Rattrapage", pdf: 'eng-na/examen-anglais-2022-session-rattrapage-sujet.pdf' },
        { title: "English - 2021 Session Normale", pdf: true },
        { title: "English - 2021 Session Rattrapage", pdf: 'eng-na/examen-anglais-2021-session-rattrapage-sujet.pdf' },
        { title: "English - 2020 Session Normale", pdf: 'eng-na/examen-anglais-2020-session-normale-sujet-1.pdf' },
        { title: "English - 2020 Session Rattrapage", pdf: true },
        { title: "English - 2019 Session Normale", pdf: 'eng-na/examen-anglais-2019-session-normale-sujet.pdf' },
        { title: "English - 2019 Session Rattrapage", pdf: 'eng-na/examen-anglais-2019-session-rattrapage-sujet.pdf' },
        { title: "English - 2018 Session Normale", pdf: 'eng-na/examen-anglais-2018-session-normale-sujet.pdf' },
        { title: "English - 2018 Session Rattrapage", pdf: 'eng-na/examen-anglais-2018-session-rattrapage-sujet.pdf' },
        { title: "English - 2017 Session Normale", pdf: 'eng-na/examen-anglais-2017-session-normale-sujet-1.pdf' },
        { title: "English - 2017 Session Rattrapage", pdf: 'eng-na/examen-anglais-2017-session-rattrapage-sujet-1.pdf' },
        { title: "English - 2016 Session Normale", pdf: 'eng-na/examen-anglais-2016-session-normale-sujet-1.pdf' },
        { title: "English - 2016 Session Rattrapage", pdf: 'eng-na/examen-anglais-2016-session-rattrapage-sujet-1.pdf' }
    ],
    'philo': [
        { title: "Philosophy - 2023 Session Normale", pdf: 'Philosophie-na/alflsfa-llshab-alalmia-oaltqnia-2023-aldora-alaadia-almodhoa.pdf' },
        { title: "Philosophy - 2023 Session Rattrapage", pdf: 'Philosophie-na/alflsfa-llshab-alalmia-oaltqnia-2023-aldora-alistdrakia-almodhoa.pdf' },
        { title: "Philosophy - 2022 Session Normale", pdf: 'Philosophie-na/alflsfa-llshab-alalmia-oaltqnia-2022-aldora-alaadia-almodhoa.pdf' },
        { title: "Philosophy - 2022 Session Rattrapage", pdf: 'Philosophie-na/alflsfa-llshab-alalmia-oaltqnia-2022-aldora-alistdrakia-almodhoa.pdf' },
        { title: "Philosophy - 2021 Session Normale", pdf: 'Philosophie-na/alflsfa-llshab-alalmia-oaltqnia-2021-aldora-alaadia-almodhoa.pdf' },
        { title: "Philosophy - 2021 Session Rattrapage", pdf: true },
        { title: "Philosophy - 2020 Session Normale", pdf: 'Philosophie-na/alflsfa-llshab-alalmia-oaltqnia-2020-aldora-alaadia-almodhoa.pdf' },
        { title: "Philosophy - 2020 Session Rattrapage", pdf: 'Philosophie-na/alflsfa-llshab-alalmia-oaltqnia-2020-aldora-alistdrakia-almodhoa.pdf' }
    ]
};

function showSubject(topic) {
    currentSubject = topic;
    const tabs = document.querySelectorAll('#lessons .subject-tabs .tab-btn');
    tabs.forEach(t => t.classList.remove('active'));
    document.querySelector(`#lessons .tab-btn[onclick="showSubject('${topic}')"]`).classList.add('active');

    // Default to semester 1 on subject change
    showCategory('sem1');
}

function showCategory(category) {
    currentCategory = category;
    const innerTabs = document.querySelectorAll('.inner-tab-btn');
    innerTabs.forEach(t => t.classList.remove('active'));
    document.querySelector(`.inner-tab-btn[onclick="showCategory('${category}')"]`).classList.add('active');

    const strip = document.getElementById('subject-prog-strip');
    if (strip) strip.style.display = ['exams', 'quizzes'].includes(category) ? 'none' : '';

    const contentDiv = document.getElementById('subject-content');
    contentDiv.innerHTML = '';

    if (subjectsData[currentSubject] && subjectsData[currentSubject][category]) {
        const items = subjectsData[currentSubject][category];
        if (items.length > 0) {
            items.forEach((item, idx) => {
                if (category === 'quizzes') {
                    contentDiv.innerHTML += `
                        <div class="quiz-card" onclick="${item.action}">
                            <h4><i class='bx bx-play-circle'></i> ${item.title}</h4>
                            <p>${translations[currentLang].btn_review || 'Lancer le quiz'}</p>
                        </div>
                    `;
                } else {
                    const buttonMarkup = item.pdf === true
                        ? `<button class="btn primary-btn" style="width:auto; padding:0.5rem 1rem; font-size:0.82rem;" type="button" onclick="alert('${translations[currentLang].alert_pdf}')">
                                <i class='bx bx-link-external'></i> ${translations[currentLang].btn_download}
                           </button>`
                        : `<a class="btn primary-btn" style="width:auto; padding:0.5rem 1rem; font-size:0.82rem;" href="${String(item.pdf).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;")}" target="_blank" rel="noopener noreferrer">
                                <i class='bx bx-link-external'></i> ${translations[currentLang].btn_download}
                           </a>`;
                    const p = _progressCache[toCourseKey(currentSubject, category, idx)] || {};
                    contentDiv.innerHTML += `
                        <div class="lesson-item">
                            <div style="display:flex; align-items:center; gap: 12px; flex:1; min-width:0;">
                                <i class='bx bxs-file-pdf' style="color: #f87171; font-size: 1.6rem; flex-shrink:0;"></i>
                                <span>${item.title}</span>
                            </div>
                            <div class="progress-checks">
                                <label class="check-pill">
                                    <input type="checkbox" ${p.cours ? 'checked' : ''} onchange="toggleProgress('${currentSubject}','${category}',${idx},'cours',this.checked)">
                                    <i class="bx bx-book-open"></i> Cours
                                </label>
                                <label class="check-pill">
                                    <input type="checkbox" ${p.exercices ? 'checked' : ''} onchange="toggleProgress('${currentSubject}','${category}',${idx},'exercices',this.checked)">
                                    <i class="bx bx-pencil"></i> Exercices
                                </label>
                                <label class="check-pill">
                                    <input type="checkbox" ${p.examen ? 'checked' : ''} onchange="toggleProgress('${currentSubject}','${category}',${idx},'examen',this.checked)">
                                    <i class="bx bx-award"></i> Examen
                                </label>
                            </div>
                            ${buttonMarkup}
                        </div>
                    `;
                }
            });
        } else {
            contentDiv.innerHTML = `<h3 style="text-align:center; color: var(--text-muted); margin-top:2rem;" data-i18n="empty_lessons">${translations[currentLang].empty_lessons}</h3>`;
        }
    }
    updateSubjectPageProgress();
}

function showWataniyat(topic) {
    currentWataniyatSubject = topic;
    const tabs = document.querySelectorAll('#wataniyat .tab-btn');
    tabs.forEach(t => t.classList.remove('active'));
    document.querySelector(`#wataniyat .tab-btn[onclick="showWataniyat('${topic}')"]`).classList.add('active');

    const contentDiv = document.getElementById('wataniyat-content');
    contentDiv.innerHTML = '';
    
    if (wataniyatData[topic] && wataniyatData[topic].length > 0) {
        wataniyatData[topic].forEach(item => {
            const buttonMarkup = item.pdf === true
                ? `<button class="btn primary-btn" style="width:auto; padding:0.5rem 1rem; font-size:0.82rem;" type="button" onclick="alert('${translations[currentLang].alert_pdf}')">
                        <i class='bx bx-link-external'></i> ${translations[currentLang].btn_download}
                   </button>`
                : `<a class="btn primary-btn" style="width:auto; padding:0.5rem 1rem; font-size:0.82rem;" href="${String(item.pdf).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;")}" target="_blank" rel="noopener noreferrer">
                        <i class='bx bx-link-external'></i> ${translations[currentLang].btn_download}
                   </a>`;
            contentDiv.innerHTML += `
                <div class="wataniyat-card">
                    <div style="display:flex; align-items:center; gap: 12px;">
                        <i class='bx bx-medal' style="color: #fbbf24; font-size: 1.5rem; flex-shrink:0;"></i>
                        <span>${item.title}</span>
                    </div>
                    ${buttonMarkup}
                </div>
            `;
        });
    } else {
        contentDiv.innerHTML = `<h3 style="text-align:center; color: var(--text-muted); margin-top:2rem;" data-i18n="empty_lessons">${translations[currentLang].empty_lessons}</h3>`;
    }
}

// Chat Logic
const sendBtn = document.getElementById('send-btn');
const chatInput = document.getElementById('chat-input');
const chatMessages = document.getElementById('chat-messages');
const chatStatusBadge = document.querySelector('.chat-status');
const AI_PROXY_URL = 'https://bachub-ai-proxy.bacfjib.workers.dev';
let chatHistory = [];
let chatBusy = false;

function addMessage(text, isUser) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${isUser ? 'user-message' : 'ai-message'}`;
    msgDiv.innerHTML = `${!isUser ? "<i class='bx bx-bot'></i>" : ""}<div class="text">${text}</div>`;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function setChatStatus(mode) {
    if (!chatStatusBadge) return;
    chatStatusBadge.dataset.state = mode;

    const labels = {
        idle: translations[currentLang].ai_status_live || 'AI / LIVE',
        loading: translations[currentLang].ai_status_thinking || 'AI / THINKING',
        error: translations[currentLang].ai_status_error || 'AI / ERROR'
    };

    chatStatusBadge.textContent = labels[mode] || labels.idle;
}

async function handleChatSend() {
    if (chatBusy) return;
    const text = String(chatInput.value).trim();
    if (!text) return;

    chatBusy = true;
    addMessage(text, true);
    chatHistory.push({ role: 'user', content: text });
    chatInput.value = '';
    setChatStatus('loading');

    try {
        const payload = {
            message: text,
            history: chatHistory,
            lang: currentLang
        };

        console.log('Sending to Worker:', JSON.stringify(payload));

        const response = await fetch(AI_PROXY_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error || 'AI request failed');
        }

        const reply = typeof data.reply === 'string' ? data.reply.trim() : '';
        if (!reply) {
            throw new Error('Empty AI reply');
        }

        addMessage(reply, false);
        chatHistory.push({ role: 'assistant', content: reply });
        setChatStatus('idle');
    } catch (error) {
        const fallback = translations[currentLang].ai_error_message || 'The AI assistant is not available right now. Check your worker deployment and try again.';
        addMessage(fallback, false);
        setChatStatus('error');
    } finally {
        chatBusy = false;
    }
}

sendBtn.addEventListener('click', handleChatSend);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleChatSend();
});

// ====== SMART STUDY PLANNER ====== //
async function generateStudyPlan() {
    const dateInput = document.getElementById('planner-exam-date');
    const outputDiv = document.getElementById('planner-output');
    const btn = document.getElementById('planner-btn');
    const spinner = document.getElementById('planner-spinner');

    const examDate = dateInput?.value;
    if (!examDate) {
        outputDiv.innerHTML = '<p style="color:#f87171;text-align:center;">Please select your exam date.</p>';
        return;
    }

    const daysLeft = Math.max(1, Math.ceil((new Date(examDate) - new Date()) / 86400000));

    const progress = {
        physics:    calcSubjectProgress('pc'),
        math:       calcSubjectProgress('math'),
        svt:        calcSubjectProgress('svt'),
        english:    calcSubjectProgress('english'),
        philosophy: calcSubjectProgress('philo'),
    };

    btn.disabled = true;
    spinner.style.display = 'inline-block';
    outputDiv.innerHTML = '';

    try {
        const res = await fetch(`${AI_PROXY_URL}/plan`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ daysLeft, progress }),
        });
        const data = await res.json();
        if (!res.ok || !data.plan) throw new Error(data.error || 'No plan returned');
        renderStudyPlan(data.plan);
    } catch (err) {
        outputDiv.innerHTML = `<p style="color:#f87171;text-align:center;">Could not generate plan. Try again.</p>`;
    } finally {
        btn.disabled = false;
        spinner.style.display = 'none';
    }
}

function renderStudyPlan(plan) {
    const outputDiv = document.getElementById('planner-output');
    const priorityColors = { high: 'priority-high', medium: 'priority-medium', low: 'priority-low' };
    outputDiv.innerHTML = plan.map(day => `
        <div class="plan-day-card panel-surface">
            <h3 class="plan-day-title">${day.day}</h3>
            <div class="plan-sessions">
                ${(day.sessions || []).map(s => `
                    <div class="session-item ${priorityColors[s.priority] || ''}">
                        <div class="session-meta">
                            <span class="session-subject">${s.subject}</span>
                            <span class="session-duration">${s.duration}</span>
                        </div>
                        <p class="session-task">${s.task}</p>
                    </div>
                `).join('')}
            </div>
            ${day.tip ? `<p class="plan-day-tip">💡 ${day.tip}</p>` : ''}
        </div>
    `).join('');
}

// Quiz Execution
function startQuiz() {
    const qc = document.getElementById('subject-content');
    const texts = translations[currentLang];
    qc.innerHTML = `
        <div style="padding: 1.5rem;">
            <h3 style="margin-bottom: 1.75rem; font-size:1.15rem; font-weight:700; color: #c4b5fd;" data-i18n="quiz_q1">${texts.quiz_q1}</h3>
            <div style="display:flex; flex-direction:column; gap:10px; max-width:560px; direction:ltr;">
                <button class="quiz-option" onclick="wrongAnswer()">${texts.quiz_a}</button>
                <button class="quiz-option" onclick="correctAnswer()">${texts.quiz_b}</button>
                <button class="quiz-option" onclick="wrongAnswer()">${texts.quiz_c}</button>
            </div>
        </div>
    `;
}

function correctAnswer() {
    const qc = document.getElementById('subject-content');
    const texts = translations[currentLang];
    qc.innerHTML = `
        <div style="text-align:center; padding: 2rem;">
            <i class='bx bxs-check-circle' style="font-size: 6rem; color: var(--accent); margin-bottom: 1rem;"></i>
            <h2 style="color:var(--accent);" data-i18n="quiz_correct">${texts.quiz_correct}</h2>
            <p style="margin-top: 1rem; color: var(--text-main); font-size: 1.2rem;" data-i18n="quiz_correct_desc">${texts.quiz_correct_desc}</p>
            <p style="margin-top: 0.5rem; color: var(--text-muted);" data-i18n="quiz_correct_sub">${texts.quiz_correct_sub}</p>
            <button class="btn primary-btn" style="width: auto; margin-top: 2rem; padding: 1rem 3rem;" onclick="showCategory('quizzes')" data-i18n="btn_return">${texts.btn_return}</button>
        </div>
    `;
}

function wrongAnswer() {
    alert(translations[currentLang].quiz_wrong);
}

// ====== PROGRESS TRACKING ====== //
const TRACKABLE_CATS = ['sem1', 'sem2'];
let _progressCache = {};
let _currentUserId = null;

function toCourseKey(subject, cat, idx) {
    return `${subject}_${cat}_${idx}`;
}

function calcSubjectProgress(subject) {
    let total = 0, checked = 0;
    TRACKABLE_CATS.forEach(cat => {
        const items = (subjectsData[subject] && subjectsData[subject][cat]) || [];
        items.forEach((_, idx) => {
            const p = _progressCache[toCourseKey(subject, cat, idx)] || {};
            total += 3;
            checked += (p.cours ? 1 : 0) + (p.exercices ? 1 : 0) + (p.examen ? 1 : 0);
        });
    });
    return total > 0 ? Math.round((checked / total) * 100) : 0;
}

function updateSubjectPageProgress() {
    const pct = calcSubjectProgress(currentSubject);
    const bar = document.getElementById('subject-prog-bar');
    const span = document.getElementById('subject-prog-pct');
    if (bar) bar.style.setProperty('--w', `${pct}%`);
    if (span) span.textContent = `${pct}%`;
}

function updateAllProgressBars() {
    ['pc', 'math', 'svt', 'english', 'philo'].forEach(subject => {
        const pct = calcSubjectProgress(subject);
        const bar = document.getElementById(`home-prog-bar-${subject}`);
        const span = document.getElementById(`home-pct-${subject}`);
        if (bar) bar.style.setProperty('--w', `${pct}%`);
        if (span) span.textContent = `${pct}%`;
    });
    updateSubjectPageProgress();
}

let _progressLoaded = false;

async function initProgress() {
    // Step 1: render page immediately from getSession()
    try {
        const { data: { session } } = await window.supabaseClient.auth.getSession();
        if (session?.user) {
            _currentUserId = session.user.id;
            await loadProgressFromDB();
        } else {
            loadProgressFromStorage();
        }
        _progressLoaded = true;
    } catch (e) {
        loadProgressFromStorage();
        _progressLoaded = true;
    }

    // Step 2: listen for login/logout — skip INITIAL_SESSION, already handled above
    window.supabaseClient.auth.onAuthStateChange(async (event, session) => {
        if (event === 'INITIAL_SESSION') return;
        if (event === 'SIGNED_OUT') {
            _currentUserId = null;
            _progressCache = {};
            updateAllProgressBars();
            const isLessonsActive = document.getElementById('lessons')?.classList.contains('active-view');
            if (isLessonsActive && !['quizzes', 'exams'].includes(currentCategory)) {
                showCategory(currentCategory);
            }
        } else if (session?.user) {
            _currentUserId = session.user.id;
            await loadProgressFromDB();
        } else {
            _currentUserId = null;
            loadProgressFromStorage();
        }
    });
}

async function loadProgressFromDB() {
    try {
        const { data, error } = await window.supabaseClient
            .from('user_progress')
            .select('course_key, cours, exercices, examen')
            .eq('user_id', _currentUserId);
        if (error) throw error;
        _progressCache = {};
        (data || []).forEach(row => {
            _progressCache[row.course_key] = {
                cours: !!row.cours,
                exercices: !!row.exercices,
                examen: !!row.examen
            };
        });
    } catch (e) {
        console.warn('Could not load progress from Supabase:', e.message);
        loadProgressFromStorage();
        return;
    }
    updateAllProgressBars();
    const isLessonsActive = document.getElementById('lessons')?.classList.contains('active-view');
    if (isLessonsActive && !['quizzes', 'exams'].includes(currentCategory)) {
        showCategory(currentCategory);
    }
}

function loadProgressFromStorage() {
    try {
        const raw = localStorage.getItem('bachub_progress');
        _progressCache = raw ? JSON.parse(raw) : {};
    } catch (e) {
        _progressCache = {};
    }
    updateAllProgressBars();
}

async function toggleProgress(subject, cat, idx, field, checked) {
    const key = toCourseKey(subject, cat, idx);
    if (!_progressCache[key]) _progressCache[key] = { cours: false, exercices: false, examen: false };
    _progressCache[key][field] = checked;

    updateAllProgressBars();

    if (_currentUserId) {
        try {
            await window.supabaseClient.from('user_progress').upsert({
                user_id: _currentUserId,
                subject,
                course_key: key,
                cours: _progressCache[key].cours,
                exercices: _progressCache[key].exercices,
                examen: _progressCache[key].examen,
                updated_at: new Date().toISOString()
            }, { onConflict: 'user_id,course_key' });
        } catch (e) {
            console.warn('Could not save progress to Supabase:', e.message);
        }
    } else {
        try {
            localStorage.setItem('bachub_progress', JSON.stringify(_progressCache));
        } catch (e) {}
    }
}

// Expose progress data for AI Study Planner
function getProgressSummary() {
    const summary = {};
    ['pc', 'math', 'svt', 'english', 'philo'].forEach(subject => {
        summary[subject] = {
            percentage: calcSubjectProgress(subject),
            courses: {}
        };
        TRACKABLE_CATS.forEach(cat => {
            const items = (subjectsData[subject] && subjectsData[subject][cat]) || [];
            items.forEach((item, idx) => {
                const key = toCourseKey(subject, cat, idx);
                summary[subject].courses[key] = {
                    title: item.title,
                    ...((_progressCache[key]) || { cours: false, exercices: false, examen: false })
                };
            });
        });
    });
    return summary;
}
window.getProgressSummary = getProgressSummary;

// Initial Boot
document.addEventListener("DOMContentLoaded", () => {
    translatePage();
    showSubject('pc');
    const welcomeMessage = document.querySelector('#chat-messages .ai-message .text');
    if (welcomeMessage) {
        chatHistory = [{ role: 'assistant', content: welcomeMessage.textContent.trim() }];
    }
    setChatStatus('idle');
    initProgress();
});
