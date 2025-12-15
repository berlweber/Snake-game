/*-------------- Constants -------------*/
const highScore = [];//for level-up

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
console.log(snakeEl);

/*-------------- Functions -------------*/


/*----------- Event Listeners ----------*/

