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
    gameField.ColumnsAmount = Math.floor(gameField.width / gameField.columnAndRowWidth);
    gameField.rowsamount = Math.floor(gameField.hight / gameField.columnAndRowWidth);
}
setGameField();


const createMsg = () => {

}

const init = () => {

}
/*----------- Event Listeners ----------*/

