const questionContainer = document.getElementById('question-container');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-button');
const scoreContainer = document.createElement('div');
document.body.appendChild(scoreContainer); // Append score container to body

let questions = [];

// Fetch the questions from questions.json
fetch('questions.json')
    .then(response => response.json())
    .then(data => {
        questions = data;
        startGame();
    });

function getRandomQuestions(num) {
    const shuffled = questions.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
}

let selectedQuestions = [];
let currentQuestionIndex = 0;
let score = 0; // Initialize score

function startGame() {
    selectedQuestions = getRandomQuestions(15);
    currentQuestionIndex = 0;
    score = 0; // Reset score
    nextButton.classList.add('hide');
    scoreContainer.innerHTML = ''; // Clear previous score
    showQuestion(selectedQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionContainer.innerText = question.question;
    answerButtons.innerHTML = '';
    question.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.innerText = answer;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(index === question.correct, button));
        answerButtons.appendChild(button);
    });
}

function selectAnswer(correct, button) {
    if (correct) {
        button.classList.add('correct');
        score++; // Increment score for correct answer
    } else {
        button.classList.add('wrong');
    }
    // Disable all buttons after an answer is selected
    Array.from(answerButtons.children).forEach(btn => {
        btn.disabled = true;
    });

    nextButton.classList.remove('hide');
}

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < selectedQuestions.length) {
        showQuestion(selectedQuestions[currentQuestionIndex]);
        nextButton.classList.add('hide');
    } else {
        showScore(); // Show final score
    }
});

function showScore() {
    questionContainer.innerHTML = `Quiz Complete! Your score: ${score} out of ${selectedQuestions.length}`;
    answerButtons.innerHTML = ''; // Clear answer buttons
    nextButton.classList.add('hide'); // Hide next button
}
