/*-------------- Constants -------------*/
//msg cost here
const highScore = [];//for level-up
const gameField = {};
const snake = [];

/*---------- Variables (state) ---------*/
let playing;
let score;
let intervalId;
let direction;

/*----- Cached Element References  -----*/
const startStpBtn = document.querySelector('#strt-stp');
const resetBtn = document.querySelector('#reset');
const gameFieldEl = document.querySelector('#game-field');
const gameFieldCells = gameFieldEl.children;
const messageEl = document.querySelector('#message');

/*-------------- Functions -------------*/
/*const createGrid () => {
	
}*/
const setGameField = () => {
    gameField.width = gameFieldEl.clientWidth;
    gameField.hight = gameFieldEl.clientHeight;
    gameField.columnAndRowWidth = 10;
    gameField.adjustedWidth = gameField.width - (gameField.width % gameField.columnAndRowWidth);
    gameField.adjustedHeight = gameField.hight - (gameField.hight % gameField.columnAndRowWidth);
    gameField.columnsAmount = Math.floor(gameField.width / gameField.columnAndRowWidth);//to be removed
    gameField.rowsAmount = Math.floor(gameField.hight / gameField.columnAndRowWidth);
		gameField.cellsAmount = gameField.columnsAmount * gameField.rowsAmount;
		gameField.cells = [];
		/*if (gameFieldCells.length > 0){
			gameFieldCells.array.forEach(element => {
				element.remove();
			});
		}*/
		for (let i = 0; i < gameField.cellsAmount; i++){
			const cell = document.createElement('div');
			gameField.cells.push(cell);
			gameFieldEl.appendChild(cell);
		};
		//console.log(gameFieldCells);
}

/*const renderGameField = () => {
    gameFieldEl.style.gridTemplateColumns = `repeat(${gameField.columnsAmount}, ${gameField.columnAndRowWidth}px)`;
    gameFieldEl.style.gridTemplateRows = `repeat(${gameField.rowsAmount}, ${gameField.columnAndRowWidth}px)`;
    //gameFieldEl.style.width = `${gameField.adjustedWidth}`; need to update width to round grid tightly
    //gameFieldEl.style.hight = `${gameField.adjustedWidth}`; need to update width to round grid tightly
}*/

const setSnake = () => {
	snake.push(0, 1, 2);
	snake.forEach((element, i) => {
		gameField.cells[i + (gameField.columnsAmount * 10) + 10].classList.add('snake');

	});
}

const createMsg = () => {

}

const render = () => {
    
};

const init = () => {
    setGameField();
		setSnake()
    render();
};

init();

const adjustToWindow = () =>{
    setGameField();
};

const startGame = () => {
	intervalId ??= setInterval(activeGame, 200);
}

const activeGame = () => {
	direction = 'right';
	if (direction === 'right') {

	} else if (direction === 'up') {
		
	} else if (direction === 'left') {
		
	} else {

	}
}

const pauseGame = () => {
	clearInterval(intervalId);
	intervalId = null;
}
/*----------- Event Listeners ----------*/

window.addEventListener("resize", adjustToWindow);
