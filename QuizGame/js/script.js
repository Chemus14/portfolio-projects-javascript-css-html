'use strict';

// Data to test
const categories = ['History', 'Biology', 'Sports', 'Science'];

const questions = [
  {
    question:
      'What is the best football player in the history asdasdasda sdsads asdasd ?',
    answers: ['Pele', 'Zidane', 'Maradona', 'Di Stefano'],
    trueAnswer: 0,
    category: 'Sports',
  },
  {
    question: 'What year had been discovered America?',
    answers: ['1765', '1487', '1492', '1502'],
    trueAnswer: 2,
    category: 'History',
  },
  {
    question: 'Who is the responsible of this formula? ( E = MC2 )',
    answers: ['Newton', 'Albert Eistein', 'Pitagoras', 'Sheldon Cooper'],
    trueAnswer: 1,
    category: 'Science',
  },
  {
    question: 'What kind of animal is the being human?',
    answers: ['Mammals', 'Birds', 'Fish', 'Insects'],
    trueAnswer: 0,
    category: 'Biology',
  },
];

let userName = '';
const numQuestions = 4;
let correctAnswers = 0;
// Selecting elements
let cont = 0;
let htmlList = '';
const question = document.querySelector('.qg-question > h1');
const answers = document.querySelectorAll('.qg-answer');
const userNameInput = document.querySelector('.qg-input-name');
const btnName = document.querySelector('.qg-btn-name');
const quizContainer = document.querySelector('.quiz');
const userNameContainer = document.querySelector('.qg-ct-username');
const info = document.querySelector('.info');
const btnNext = document.querySelector('.next');
const containerUsername = document.querySelector('.qg-content-username');

quizContainer.style.display = 'none';

//generate list last games
const listLastGames = function () {
  // Retrieve data from localStorage and parse it
  const data = JSON.parse(localStorage.getItem('gameInfo'));
  if (data === null) return;
  htmlList += `<div class="qg-list-players">
    <h2>Last Games</h2><ul>`;
  data.forEach(element => {
    htmlList += `
    <li><p>${element.playerName}  </p><span class="n-games">${element.correctAnswers}✅</span></li>`;
  });
  htmlList += `</ul></div>`;
  containerUsername.insertAdjacentHTML('beforeend', htmlList);
};
listLastGames();

//Submitting the username
btnName.addEventListener('click', e => {
  e.preventDefault();
  if (userNameInput.value === '') return;
  userName = userNameInput.value;
  userName = userName.charAt(0).toUpperCase() + userName.slice(1);
  userNameContainer.style.display = 'none';
  quizContainer.style.display = 'block';
  // Check if all questions have been answered

  fillQuiz(questions);
  fillInfo(userName, numQuestions, correctAnswers);
  verifyAnswers(answers);
  fillInfo(userName, numQuestions, correctAnswers);

  btnNext.addEventListener('click', handleNextButtonClick);
});

const fillQuiz = function (questions) {
  question.innerHTML = questions[cont].question;
  answers.forEach((element, key) => {
    element.innerHTML = `<p>${questions[cont].answers[key]}</p>`;
  });
};

// Filling up the info under the answers

const fillInfo = function (name, numberQuestions, correctAnswers) {
  let html = '';
  html += `<p>Name: <span>${name.charAt(0).toUpperCase()}${name.slice(
    1
  )}</span></p>
  <p>Numbers of Questions: <span>${
    cont < 4 ? cont + 1 : cont
  }</span> of <span>${numberQuestions}</span></p>
            <p>Questions ✅: <span>${correctAnswers}</span></p>`;

  info.innerHTML = html;

  // Remove the following line
  // btnNext.classList.add('disabled-button');
  btnNext.disabled = true;
};

const verifyAnswers = function (answersd) {
  answersd.forEach(element => {
    element.addEventListener('click', () => {
      const ans = element.querySelector('p').textContent;
      const trueAnswerIndex = questions[cont].trueAnswer;
      element.classList.remove('answer');

      if (ans === questions[cont].answers[trueAnswerIndex]) {
        element.classList.add('true-answer');
        correctAnswers++;
        cont++;
      } else {
        element.classList.add('wrong-answer');
        cont++;
      }

      if (cont === numQuestions) {
        resultsLocalStorage(userName, correctAnswers);
        fillInfo(userName, numQuestions, correctAnswers);

        // Remove the following line
        // btnNext.classList.remove('disabled-button');
        btnNext.disabled = false;
        btnNext.innerHTML =
          '<button type="button" value="Play Again" class="btn-next">Play Again</button>';
        btnNext.removeEventListener('click', handleNextButtonClick);
        btnNext.addEventListener('click', handlePlayAgainButtonClick);
      }
      // Remove the following line
      btnNext.classList.remove('disabled-button');
      btnNext.disabled = false;
    });
  });
};

const handleNextButtonClick = function (e) {
  e.preventDefault();
  if (cont > numQuestions) return;
  answers.forEach(ans => {
    if (!ans.classList.contains('answer')) {
      ans.classList.add('answer');
      ans.classList.remove('true-answer');
      ans.classList.remove('wrong-answer');
    }
  });
  fillQuiz(questions);
  fillInfo(userName, numQuestions, correctAnswers);
};

const handlePlayAgainButtonClick = function (e) {
  e.preventDefault();
  cont = 0;
  correctAnswers = 0;
  userNameInput.value = '';
  btnNext.disabled = true;
  btnNext.innerHTML =
    '<button type="button" value="Loading..." class="btn-next">Loading...</button><div id="loading-bar"></div>';

  // Display the loading bar
  const loadingBar = document.querySelector('#loading-bar');
  loadingBar.style.width = '0%';

  // Simulate a delay before showing the content
  setTimeout(() => {
    // Reset the loading bar
    loadingBar.style.width = '100%';

    // Show the necessary content
    userNameContainer.style.display = 'flex';
    quizContainer.style.display = 'none';
    btnNext.innerHTML =
      '<button type="button" value="Next" class="btn-next">Next</button>';
    btnNext.disabled = false;
    btnNext.removeEventListener('click', handlePlayAgainButtonClick);
    btnNext.addEventListener('click', handleNextButtonClick);
    // Reset answer display
    answers.forEach(ans => {
      ans.classList.remove('true-answer');
      ans.classList.remove('wrong-answer');
    });
  }, 2000); // Adjust the delay time as needed
};

const resultsLocalStorage = function (playerName, correctAnswers) {
  const gameInfo = {
    playerName: playerName,
    correctAnswers: correctAnswers,
  };

  // Retrieve existing data from localStorage
  let data = JSON.parse(localStorage.getItem('gameInfo')) || [];

  // Add the new gameInfo to the data array
  data.push(gameInfo);

  // Save the updated data back to localStorage
  localStorage.setItem('gameInfo', JSON.stringify(data));
};
