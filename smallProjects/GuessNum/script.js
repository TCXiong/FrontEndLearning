'use strict';

let screteNumber = Math.trunc(Math.random() * 20) + 1;

let score = 20;

let highest = 0;

const displayMessage = function (msg) {
  document.querySelector('.message').textContent = msg;
};

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);

  //check the guess number
  if (!guess) {
    displayMessage('No number!');

    //win
  } else if (guess === screteNumber) {
    document.querySelector('.number').textContent = screteNumber;
    document.querySelector('.message').textContent = displayMessage('Correct!');
    //change the css
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';
    if (score > highest) {
      highest = score;
      document.querySelector('.highscore').textContent = highest;
    }

    //Wrong ans
  } else if (guess !== screteNumber) {
    if (score > 1) {
      displayMessage(guess > screteNumber ? 'Too high!' : 'Too low!');
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      displayMessage('You lose!');
      document.querySelector('.score').textContent = 0;
    }
  }
});

//for reset the game
document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  screteNumber = Math.trunc(Math.random() * 20) + 1;
  displayMessage('Start guessing...');
  document.querySelector('.score').textContent = score;
  document.querySelector('.number').textContent = '?';
  document.querySelector('.guess').value = '';

  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
});
