const playerOption = document.getElementsByClassName('player-option');
const playerScoreElement = document.getElementById('player-score');
const computerScoreElement = document.getElementById('computer-score');
const resetGameBtn = document.querySelector('.reset-game');
const showMessage = document.querySelector('h1');
const final = document.querySelector('h2');

const options = ['Rock', 'Paper', 'Scissors'];

let playerScore = 0;
let computerScore = 0;

function generateRandom() {
    return Math.floor(Math.random() * options.length);
}

function computerOption() {
    return options[generateRandom()];
}

function playerWon(player, computer) {
    if (player === 'Rock' && computer === 'Scissors' || player === 'Paper' && computer === 'Rock' || player === 'Scissors' && computer === 'Paper') {
        return true;
    }
    else {
        return false;
    }
}

function result(userOption) {
    const computerResult = computerOption();
    if (playerWon(userOption, computerResult)) {
        playerScore++;
        return `Player wins! ${userOption} beats ${computerResult}`;
    } else if (userOption == computerResult) {
        return `It's a tie! Both chose ${userOption}`;
    }
    else {
        computerScore++;
        return `Computer wins! ${computerResult} beats ${userOption}`;
    }
}

function showResult(userOption) {
    showMessage.textContent = result(userOption)
    playerScoreElement.textContent = playerScore
    computerScoreElement.textContent = computerScore
    if (playerScore === 5 && computerScore < 5) {
        showMessage.style.display = 'none';
        final.textContent = "Player Won";
        for (const playerOptionBtn of playerOption) {
            playerOptionBtn.style.pointerEvents = 'none';
            playerOptionBtn.style.opacity = '0.5'
        }
        resetGameBtn.style.display = 'flex'
    }
    if (playerScore < 5 && computerScore === 5) {
        showMessage.style.display = 'none';
        final.textContent = "Computer Won";
        for (const playerOptionBtn of playerOption) {
            playerOptionBtn.style.pointerEvents = 'none';
            playerOptionBtn.style.opacity = '0.5'
        }
        resetGameBtn.style.display = 'flex'
    }
}

function resetGame() {
    playerScore = 0;
    computerScore = 0;
    playerScoreElement.textContent = playerScore;
    computerScoreElement.textContent = computerScore;
    showMessage.innerText = '';
    showMessage.style.display = 'block';;
    final.innerText = '';
    resetGameBtn.style.display = 'none'
}

resetGameBtn.addEventListener('click', () => {
    resetGame()
    for (const playerOptions of playerOption) {
        playerOptions.style.pointerEvents = 'auto';
        playerOptions.style.opacity = '1'
    }
})

for (let i = 0; i < playerOption.length; i++) {
    const playerBtn = playerOption[i];
    playerBtn.addEventListener('click', () => {
        showResult(playerBtn.children[1].innerText)
    })
}