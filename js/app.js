/*-------------- Constants -------------*/
//msg cost here
const highScore = [];//for level-up
const gameField = {};
/*---------- Variables (state) ---------*/
let playing;
let score;
let timerId;

/*----- Cached Element References  -----*/
const startStpBtn = document.querySelector('#strt-stp');
const resetBtn = document.querySelector('#reset');
const gameFieldEl = document.querySelector('#game-field');
const snakeEl = document.querySelector('#snake');
const messageEl = document.querySelector('#message');
console.log(gameFieldEl);
console.log(snakeEl);

/*-------------- Functions -------------*/
const setGameField = () => {
    gameField.width = gameFieldEl.clientWidth;
    gameField.hight = gameFieldEl.clientHeight;
    gameField.columnAndRowWidth = 10;
    gameField.adjustedWidth = gameField.width - (gameField.width % gameField.columnAndRowWidth);
    gameField.adjustedHeight = gameField.hight - (gameField.hight % gameField.columnAndRowWidth);
    gameField.columnsAmount = Math.floor(gameField.width / gameField.columnAndRowWidth);
    gameField.rowsamount = Math.floor(gameField.hight / gameField.columnAndRowWidth);
}

const renderGameField = () => {
    gameFieldEl.style.gridTemplateColumns = `repeat(${gameField.columnsAmount}, ${gameField.columnAndRowWidth}px)`;
    gameFieldEl.style.gridTemplateRows = `repeat(${gameField.rowsamount}, ${gameField.columnAndRowWidth}px)`;
    //gameFieldEl.style.width = `${gameField.adjustedWidth}`; need to update width to round grid tightly
    //gameFieldEl.style.hight = `${gameField.adjustedWidth}`; need to update width to round grid tightly
}

const createMsg = () => {

}

const render = () => {
    renderGameField();
};

const init = () => {
    setGameField();
    render();
};

init();

const adjustToWindow = () =>{
    setGameField();
    renderGameField();
};
/*----------- Event Listeners ----------*/

window.addEventListener("resize", adjustToWindow);