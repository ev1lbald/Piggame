'use strict';

// Elements
const score0Element = document.querySelector('#score--0');
const score1Element = document.getElementById('score--1');
const current0Element = document.querySelector('#current--0')
const diceElement = document.querySelector('.dice')
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');


//Game Conditions
score0Element.textContent = 0;
score1Element.textContent = 0;
diceElement.classList.add('hidden');

let totalScores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let isPlaying = true;

const SwitchActivePlayer = function () {
    currentScore = 0
    document.getElementById(`current--${activePlayer}`).textContent = currentScore
    activePlayer = activePlayer === 0 ? 1 : 0;
}


// Dice roll
btnRoll.addEventListener('click', function () {
    if (isPlaying) {
        // Generating diceNumber
        const diceNumber = Math.trunc(Math.random() * 6) + 1

        // Outputing Dice
        diceElement.classList.remove('hidden');

        diceElement.src = `dice${diceNumber}.png`

        // Adding score to sum of scores
        if (diceNumber !== 1) {
            currentScore += diceNumber;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore

        } else {
            SwitchActivePlayer()

            //Switching styles
            player0Element.classList.toggle('player--active')
            player1Element.classList.toggle('player--active')

        }
    }
})

// Save score
btnHold.addEventListener('click', function () {
    if (isPlaying) {

        //Add current score to total score
        totalScores[activePlayer] += currentScore
        document.getElementById(`score--${activePlayer}`).textContent = totalScores[activePlayer]

        //If total score >100, player wins, if not switch player

        if (totalScores[activePlayer] >= 10) {
            isPlaying = false
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            diceElement.classList.add('hidden');
        } else {
            SwitchActivePlayer()
        }
    }
})

//New Game
const returnToTheBeginning = function () {
    currentScore = 0
    document.getElementById(`current--${activePlayer}`).textContent = 0
    document.getElementById(`score--${activePlayer}`).textContent = 0
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner');
}

btnNew.addEventListener('click', function () {
    totalScores = [0, 0]
    returnToTheBeginning()
    SwitchActivePlayer()
    returnToTheBeginning()
    isPlaying = true
    document.querySelector(`.player--${0}`).classList.add('player--active');
})
