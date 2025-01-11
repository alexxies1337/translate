let easyButton = document.querySelector('.difficulty-options button:nth-child(1)');
let mediumButton = document.querySelector('.difficulty-options button:nth-child(2)');
let hardButton = document.querySelector('.difficulty-options button:nth-child(3)');

easyButton.addEventListener('click', () => {
    console.log('Easy mode selected');
   
});

mediumButton.addEventListener('click', () => {
    console.log('Medium mode selected');
    
});

hardButton.addEventListener('click', () => {
    console.log('Hard mode selected');
  
});

const wordLists = {
    easy: { "cat": "кіт", "dog": "собака", "house": "дім", "red": "червоний", "blue": "синій" },
    medium: { "beautiful": "гарний", "difficult": "складний", "interesting": "цікавий", "happy": "щасливий", "sad": "сумний" },
    hard: { "acquiesce": "погоджуватися", "ephemeral": "короткий", "paradox": "парадокс", "ubiquitous": "повсюдний", "mellifluous": "мелодійний" }
};

let currentWord;
let currentDifficulty = "easy";
let correctAnswers = 0;
let totalQuestions = 0;
let wordsTranslated = {};

const englishTextarea = document.querySelector(".box:nth-child(1) textarea");
const ukrainianText = document.querySelector(".box:nth-child(2) textarea");
const notification = document.createElement("p");
notification.classList.add("notification");
document.querySelector(".box:nth-child(1)").appendChild(notification);
const scoreDisplay = document.createElement("p");
scoreDisplay.classList.add("score");
document.querySelector(".container").appendChild(scoreDisplay);

function setWord(word) {
    const titleCaseWord = word.charAt(0).toUpperCase() + word.slice(1); 
    englishTextarea.value = titleCaseWord;
    englishTextarea.readOnly = true;
    currentWord = word; 
    ukrainianText.value = "";
    notification.classList.remove("correct", "incorrect");
}

function checkAnswer() {
    const userAnswer = ukrainianText.value.trim().toLowerCase();
    const correctAnswer = wordLists[currentDifficulty][currentWord];

    if (userAnswer === correctAnswer) {
        notification.textContent = "Correct!";
        notification.classList.add("correct");
        notification.classList.remove("incorrect");
        correctAnswers++;
    } else {
        notification.textContent = `Incorrect. The correct translation is: ${correctAnswer}`;
        notification.classList.add("incorrect");
        notification.classList.remove("correct");
    }

    wordsTranslated[currentWord] = true;
    totalQuestions++;
    displayScore();
    if (Object.keys(wordsTranslated).length === Object.keys(wordLists[currentDifficulty]).length) {
        alert("All words translated for this difficulty!");
        wordsTranslated = {};
    } else {
        setNewWord();
    }
}

function setNewWord() {
    const words = wordLists[currentDifficulty];
    const untranslatedWords = Object.keys(words).filter(word => !wordsTranslated[word]);
    if (untranslatedWords.length === 0){
        return;
    }
    const randomIndex = Math.floor(Math.random() * untranslatedWords.length);
    setWord(untranslatedWords[randomIndex]);
}

function displayScore() {
    scoreDisplay.textContent = `Score: ${correctAnswers} / ${totalQuestions}`;
}

easyButton.addEventListener('click', () => {
    currentDifficulty = "easy";
    correctAnswers = 0;
    totalQuestions = 0;
    wordsTranslated = {};
    displayScore();
    setNewWord();
});

mediumButton.addEventListener('click', () => {
    currentDifficulty = "medium";
    correctAnswers = 0;
    totalQuestions = 0;
    wordsTranslated = {};
    displayScore();
    setNewWord();
});

hardButton.addEventListener('click', () => {
    currentDifficulty = "hard";
    correctAnswers = 0;
    totalQuestions = 0;
    wordsTranslated = {};
    displayScore();
    setNewWord();
});

ukrainianText.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        checkAnswer();
    }
});

displayScore();
setNewWord();

