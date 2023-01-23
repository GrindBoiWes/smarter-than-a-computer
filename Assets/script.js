

var quizEl = document.getElementById("quiz");
var timerEl = document.getElementById("timer");
var choicesEl = document.getElementById("choices");
var submitBtn = document.getElementById("submit-score");
var startBtn = document.getElementById("start");
var initialsEl = document.getElementById("intials");
var feedbackEl = document.getElementById("feedback");

var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

function startQuiz() {
    var beginQuiz = document.getElementById("intro");
    beginQuiz.setAttribute("class", "hide");

    quizEl.removeAttribute("class");

    timerId = setInterval(clockTick, 1000);
    timerEl.textContent = time;

    getQuestions();
}

function getQuestions() {
    var currentQuestion = questions[currentQuestionIndex];

    var questionsEl = document.getElementById("questions");
    questionsEl.textContent = currentQuestion.title;

    choicesEl.innerHTML = "";

    currentQuestion.choices.forEach(function(choice, i){
        var choiceBtn = document.createElement("button");
        choiceBtn.setAttribute("class", "choice");
        choiceBtn.setAttribute("value", choice);

        choiceBtn.textContent = i + 1 + ". " + choice;

        choiceBtn.onclick = questionClick;
        choicesEl.appendChild(choiceBtn);
    });
}

function questionClick() {
    if (this.value !== questions[currentQuestionIndex].answer) {
        time -= 15;

        if (time < 0) {
            time = 0;
        }
     timerEl.textContent = time;
     feedbackEl.textContent = "Incorrect!";
     feedbackEl.style.color = "red";
     feedbackEl.style.fontSize = "250%";  
    } else {
        feedbackEl.textContent = "Correct!";
        feedbackEl.style.color = "purple";
        feedbackEl.style.fontSize = "250%";
    }

    feedbackEl.setAttribute("class", "feedback",);
    setTimeout(function() {
        feedbackEl.setAttribute('class', "feedback hide");
    }, 1000);

    currentQuestionIndex++;

    if (currentQuestionIndex === questions.length) {
        quizEnd();
    } else {
        getQuestions();
    }
}

function quizEnd() {
    clearInterval(timerId);

    var resultsEl = document.getElementById("quiz-results");
    resultsEl.removeAttribute("class");

    var finalScore = document.getElementById("final-score");
    finalScore.textContent = time;
    quizEl.setAttribute("class", "hide");
}

function clockTick() {
    time--;
    timerEl.textContent = "Time Remaining " + time;

    if (time <= 0) {
        quizEnd();
    }
}

function saveHighscore() {
    var initials = initialsEl.value.trim();

    if (initials !== "") {
        var highscores = 
        JSON.parse(window.localStorage.getItem("highscores")) || [];

        var newScore = {
            score: time,
            initials : initials
        };

        highscores.push(newScore);
        window.localStorage.setItem("highscores", JSON.stringify(highscores));

        window.location.href = "score.html";
    }
}

function checkForEnter(event) {
    if(event.key === "Enter") {
        saveHighscore();
    }
}

submitBtn.onclick = saveHighscore;

startBtn.onclick = startQuiz;

initialsEl.onkeyup = checkForEnter;