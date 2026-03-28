function toggleSettings() {
    let panel = document.getElementById("settingsPanel");

    if (panel.classList.contains("hidden")) {
        panel.classList.remove("hidden");
    } else {
        panel.classList.add("hidden");
    }
}

function setTheme(color) {
    document.documentElement.style.setProperty('--main-color', color);
    localStorage.setItem('theme', color);
}

document.addEventListener("DOMContentLoaded", function () {
    let saved = localStorage.getItem("theme");

    if (saved) {
        document.documentElement.style.setProperty('--main-color', saved);
    }
});

function saveName() {
    let name = document.getElementById("playerName").value;

    if (!name) return;

    localStorage.setItem("playerName", name);

    document.getElementById("welcome").innerHTML =
        "👋 " + name;
}

document.addEventListener("DOMContentLoaded", function () {
    let name = localStorage.getItem("playerName");

    if (name) {
        document.getElementById("welcome").innerHTML =
            "👋 " + name;

        document.getElementById("playerName").value = name;
    }
});











function logDevine(msg) {
    document.getElementById("devineOutput").innerHTML += msg + "<br>";
}

function clearDevine() {
    document.getElementById("devineOutput").innerHTML = "";
}

function logPFC(msg) {
    document.getElementById("pfcOutput").innerHTML += msg + "<br>";
}

function clearPFC() {
    document.getElementById("pfcOutput").innerHTML = "";
}

function logQuiz(msg) {
    document.getElementById("quizOutput").innerHTML += msg + "<br>";
}

function clearQuiz() {
    document.getElementById("quizOutput").innerHTML = "";
}

// 🔁 afficher un menu
function showMenu(id) {
    document.getElementById("main-menu").classList.add("hidden");

    document.querySelectorAll(".game-menu").forEach(menu => {
        menu.classList.add("hidden");
    });

    document.getElementById(id).classList.remove("hidden");

    document.getElementById("output").innerHTML = "";

    clearOutput();
}

// 🔙 retour menu principal
function backMenu() {
    document.querySelectorAll(".game-menu").forEach(menu => {
        menu.classList.add("hidden");
    });

    document.getElementById("main-menu").classList.remove("hidden");

    document.getElementById("output").innerHTML = "";

    clearOutput();
}

// 🎯 jeu 1
let secret = 0;
let essais = 10;
let gameOver = false;

function updateEssais() {
    document.getElementById("tries").innerHTML = "❤️ Essais : " + essais;
}

function devineNombre() {
    clearDevine();

    secret = Math.floor(Math.random() * 100) + 1;
    essais = 10;
    gameOver = false;

    logDevine("🎯 Devine un nombre entre 0 et 100");
    updateEssais();
}

function validerDevine() {

    if (gameOver) {
        logDevine("🔁 Le jeu est fini, clique sur Jouer pour recommencer.");
        return;
    }

    let guess = parseInt(document.getElementById("devineInput").value);

    if (isNaN(guess)) return;

    essais--;
    updateEssais();

    if (guess === secret) {
        logDevine("🎉 Gagné !");
        gameOver = true;
        return;
    }

    if (guess < secret) {
        logDevine("📉 Trop petit");
    } else {
        logDevine("📈 Trop grand");
    }

    if (essais <= 0) {
        logDevine("💀 Perdu ! Le nombre était " + secret);
        gameOver = true;
    }

    document.getElementById("devineInput").value = "";
}

// ✊ jeu 2
let scoreJ = 0;
let scoreIA = 0;

function pfc() {
    clearPFC();
    logPFC("✊ Pierre Feuille Ciseaux → premier à 3");
}

function playPFC(user) {
    clearPFC();

    let choix = ["pierre", "feuille", "ciseaux"];
    let ia = choix[Math.floor(Math.random() * 3)];

    if (user === ia) {
        logPFC("🤝 Égalité (IA: " + ia + ")");
    }
    else if (
        (user === "pierre" && ia === "ciseaux") ||
        (user === "feuille" && ia === "pierre") ||
        (user === "ciseaux" && ia === "feuille")
    ) {
        scoreJ++;
        logPFC("✅ Tu gagnes (" + scoreJ + "-" + scoreIA + ")");
    }
    else {
        scoreIA++;
        logPFC("❌ IA gagne (" + scoreJ + "-" + scoreIA + ")");
    }

    if (scoreJ === 3 || scoreIA === 3) {
        logPFC(scoreJ === 3 ? "🏆 VICTOIRE !" : "💀 DÉFAITE !");
        scoreJ = 0;
        scoreIA = 0;
    }
}

// 🧠 jeu 3
let questionIndex = 0;
let score = 0;

const questions = [
    { q: "Capitale de la France ?", r: "paris" },
    { q: "2 + 2 = ?", r: "4" },
    { q: "Couleur du ciel ?", r: "bleu" }
];

function logQuiz(msg) {
    document.getElementById("quizOutput").innerHTML += msg + "<br>";
}

function clearQuiz() {
    document.getElementById("quizOutput").innerHTML = "";
}

function startQuiz() {
    clearQuiz();
    questionIndex = 0;
    score = 0;

    logQuiz("🧠 QUIZ START !");
    showQuestion();
}

function showQuestion() {
    if (questionIndex >= questions.length) {
        logQuiz("🏁 FIN DU QUIZ");
        logQuiz("🎯 Score : " + score + "/" + questions.length);
        return;
    }

    logQuiz("❓ " + questions[questionIndex].q);
}

function validerQuiz() {
    let input = document.getElementById("quizInput");
    let answer = input.value.toLowerCase().trim();

    if (!answer) return;

    let correct = questions[questionIndex].r;

    if (answer === correct) {
        logQuiz("✅ Bonne réponse !");
        score++;
    } else {
        logQuiz("❌ Faux ! Réponse : " + correct);
    }

    input.value = "";
    questionIndex++;

    setTimeout(showQuestion, 300);
}







document.addEventListener("DOMContentLoaded", function () {
    let saved = localStorage.getItem('theme');

    if (saved) {
        document.documentElement.style.setProperty('--main-color', saved);
    }
});