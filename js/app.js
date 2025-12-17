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
let speed;
let randomCell;
let food;

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
	direction = 'right';
	speed = 200;
	snake.push(0, 1, 2);
	snake.forEach((element, i) => {
		gameField.cells[i + (gameField.columnsAmount * 10) + 10].classList.add('snake');
		snake[i] = i + (gameField.columnsAmount * 10) + 10;
	});
}

const createMsg = () => {

}

const render = () => {
    
};

const init = () => {
	score = 0;
    setGameField();
	setSnake();
    render();
};

init();

const adjustToWindow = () =>{
    setGameField();
};

const startStopHandler = () => {
	playing = playing ? false : true;
	playing ? startGame() : pauseGame();
}

const startGame = () => {
	intervalId ??= setInterval(activeGame, speed);
	food ? true : placeFood();
}

const setDirection = (event) => {
	if (playing){
		if (event.key === 'ArrowUp' && direction !== 'down'){
			direction = 'up';
		} else if (event.key === 'ArrowDown' && direction !== 'up'){
			direction = 'down';
		} else if (event.key === 'ArrowRight' && direction !== 'left'){
			direction = 'right';
		} else if (event.key == 'ArrowLeft' && direction !== 'right'){
			direction = 'left';
		}
	}
}

const placeFood = () => {
	randomCell = Math.floor(Math.random() * gameField.cells.length);
	gameField.cells[randomCell].classList.add('food');
	food = true;
}



const activeGame = () => {
	let head = snake[snake.length - 1];
	if (direction === 'right') {
		gameField.cells[head + 1].classList.add('snake');
		gameField.cells[snake[0]].classList.remove('snake');
		for (let i = 0; i < snake.length - 1; i++){
			snake[i] = snake[i + 1];
		};
		snake[snake.length - 1] += 1;
	} else if (direction === 'up') {
		gameField.cells[head - gameField.columnsAmount].classList.add('snake');
		gameField.cells[snake[0]].classList.remove('snake');
		for (let i = 0; i < snake.length - 1; i++){
			snake[i] = snake[i + 1];
		};
		snake[snake.length - 1] -= gameField.columnsAmount;
	} else if (direction === 'down') {
		gameField.cells[head + gameField.columnsAmount].classList.add('snake');
		gameField.cells[snake[0]].classList.remove('snake');
		for (let i = 0; i < snake.length - 1; i++){
			snake[i] = snake[i + 1];
		};
		snake[snake.length - 1] += gameField.columnsAmount;
	} else {
		gameField.cells[head - 1].classList.add('snake');
		gameField.cells[snake[0]].classList.remove('snake');
		for (let i = 0; i < snake.length - 1; i++){
			snake[i] = snake[i + 1];
		};
		snake[snake.length - 1] -= 1;
	}
	if (gameField.cells[snake[snake.length -1]].classList.contains("food")) ateFood();//maybe move it in a seperate snake hits function
}

const pauseGame = () => {
	clearInterval(intervalId);
	intervalId = null;
}

const ateFood = () => {
	score += 10;
	gameField.cells[randomCell].classList.remove('food');
	placeFood();
	console.log(score);
}


/*----------- Event Listeners ----------*/

window.addEventListener("resize", adjustToWindow);
startStpBtn.addEventListener('click', startStopHandler);
document.body.addEventListener('keydown', setDirection);