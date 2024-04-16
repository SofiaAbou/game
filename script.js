
let btnRef = document.querySelectorAll(".button-game");
let popupRef = document.querySelector(".popup");
let newgameBtn = document.getElementById("new-game");
let startBtn = document.getElementById("start");
let msgRef = document.getElementById("message");

let rePattern = [
    [0, 1, 2],
    [0, 3, 6],
    [2, 5, 8],
    [6, 7, 8],
    [3, 4, 5],
    [1, 4, 7],
    [0, 4, 8],
    [2, 4, 6],
];

let boardState = Array.from({ length: 9 }, () => ""); // Array stato del gioco
let xTurno = true;
let gameEnd = false;

btnRef.forEach((element, index) => {
    element.addEventListener("click", () => {
        if (!gameEnd && !boardState[index]) {
            if (xTurno) {
                element.innerText = "X";
                boardState[index] = "X";
            } else {
                element.innerText = "O";
                boardState[index] = "O";
            }
            xTurno = !xTurno;


            let segno = checkWinner();
            
            let img = document.createElement("img");
            let imag ="./img/vincita.png";
            img.src = imag;
            if (segno) {
                gameEnd = true;
                displayMessage(`"${segno}" HAI VINTO!`, imag);
            } else if (count === 9) {
                gameEnd = true;
                displayMessage("pareggio!!!...");
            } /*else {
                displayMessage("errore"); 
            }*/
        }
    });
});

function checkWinner() {
    for (let pattern of rePattern) {
        let [a, b, c] = pattern;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            return boardState[a];
        }
    }
    return null;
}

function displayMessage(message) {
    msgRef.innerText = message;
    popupRef.classList.remove("hide");
}

newgameBtn.addEventListener("click", () => {
    resetGame();
});

startBtn.addEventListener("click", () => {
    startGame();
});

function resetGame() {
    btnRef.forEach((button, index) => {
        button.innerText = "";
        button.disabled = false;
        boardState[index] = "";
    });
    popupRef.classList.add("hide");
    xTurno = true;
    gameEnd = false;
    count = 0;
}

function startGame() {
    resetGame();
}