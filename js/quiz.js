function Quiz(questions) {
    this.questionIndex = 0;
    this.correctAnswerNumber = 0;
    this.questions = questions;
}

Quiz.prototype.bringQuestion = function() {
    return this.questions[this.questionIndex];
}