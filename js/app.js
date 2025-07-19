const questionList = [
    new Question("1- Which is the JavaScript package management application ?", { A: "Node.js", B: "TypeScript", C: "Nuget", D: "Npm" }, "D"),
    new Question("2- Which one is not evaluated within the scope of FrontEnd ?", { A: "Css", B: "HTML", C: "JavaScript", D: "SQL" }, "D"),
    new Question("3- Which one is evaluated within the scope of BackEnd ?", { A: "Node.js", B: "TypeScript", C: "Angular", D: "React" }, "A"),
    new Question("4- Which one does not use the JavaScript programming language ?", { A: "React", B: "Angular", C: "Vue.js", D: "Asp.net" }, "D")
];

const quiz = new Quiz(questionList);
const ui = new UI();

ui.btnStart.addEventListener("click", function() {
    startTimer(10);
    startTimerLine();
    ui.quiz_box.classList.add("active");
    ui.button_box.classList.remove("active");
    ui.showQuestion(quiz.bringQuestion());
    ui.showNumberQuestion(quiz.questionIndex + 1, quiz.questions.length);
    ui.btnNext.classList.remove("show");
});

ui.btnNext.addEventListener("click", function() {
    if(quiz.questions.length != quiz.questionIndex) {
        startTimer(10);
        startTimerLine();
        ui.showQuestion(quiz.bringQuestion());
        ui.showNumberQuestion(quiz.questionIndex + 1, quiz.questions.length);
        ui.btnNext.classList.remove("show");
    } else {
        ui.score_box.classList.add("active");
        ui.quiz_box.classList.remove("active");
        ui.showScore(quiz.correctAnswerNumber, quiz.questions.length);
    }
});

function optionSelected(e) {
    clearInterval(counter);
    clearInterval(counterLine);
    let selectedElement = e.target;

    if(selectedElement.nodeName == "SPAN") {
        selectedElement = selectedElement.parentElement;
    }

    const answer = e.target.textContent[0];
    const question = quiz.bringQuestion();

    if(question.checkTheAnswer(answer)) {
        quiz.correctAnswerNumber += 1;
        selectedElement.classList.add("correct");
        selectedElement.insertAdjacentHTML("beforeend", ui.correctIcon);
    } else {
        selectedElement.classList.add("incorrect");
        selectedElement.insertAdjacentHTML("beforeend", ui.incorrectIcon);
    }

    quiz.questionIndex += 1;
    ui.disableAllOption();
    ui.btnNext.classList.add("show");
}

ui.btnQuit.addEventListener("click", function() {
    window.location.reload();
});

ui.btnReplay.addEventListener("click", function() {
    quiz.questionIndex = 0;
    quiz.correctAnswerNumber = 0;
    // start button
    ui.btnStart.click();
    ui.score_box.classList.remove("active");
});

let counter;
function startTimer(time) {
    counter = setInterval(timer, 1000);

    function timer() {
        ui.timeSecond.textContent = time;
        time--;

        if(time < 0) {
            clearInterval(counter);
            ui.timeText.textContent = "The time is over";

            ui.disableAllOption();
            quiz.questionIndex += 1;

            ui.btnNext.classList.add("show");
        }
    }
}

let counterLine;
function startTimerLine() {
    let line_width = 0;

    counterLine = setInterval(timer, 20);

    function timer() {
        line_width += 1;

        ui.timeLine.style.width = line_width + "px";

        if(line_width > 549) {
            clearInterval(counterLine);
        }
    }
}