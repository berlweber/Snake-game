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
let lastMove;
let speed;
let randomCell;
let food;
let gameOver;

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
    gameField.columnsAmount = Math.floor(gameField.width / gameField.columnAndRowWidth);
    gameField.rowsAmount = Math.floor(gameField.hight / gameField.columnAndRowWidth);
	gameField.cellsAmount = gameField.columnsAmount * gameField.rowsAmount;
	
	/*if (gameField.Cells.length > 0){
		for (let i = 0; i > gameField.Cells.length; i++){
		gameFieldEl.firstChild.remove();
		}
		gameField.cells.length = 0;
		console.log('this is the cells array:',gameField.Cells);
		console.log('this is the gameField el:', gameFieldEl);
	}*/
	gameField.cells = [];
	for (let i = 0; i < gameField.cellsAmount; i++){
		const cell = document.createElement('div');
		gameField.cells.push(cell);
		gameFieldEl.appendChild(cell);
	};
	//gameField.cells.length = 0;
	//
}

setGameField();
/*const renderGameField = () => {
    gameFieldEl.style.gridTemplateColumns = `repeat(${gameField.columnsAmount}, ${gameField.columnAndRowWidth}px)`;
    gameFieldEl.style.gridTemplateRows = `repeat(${gameField.rowsAmount}, ${gameField.columnAndRowWidth}px)`;
    //gameFieldEl.style.width = `${gameField.adjustedWidth}`; need to update width to round grid tightly
    //gameFieldEl.style.hight = `${gameField.adjustedWidth}`; need to update width to round grid tightly
}*/

const setSnake = () => {
	direction = 'right';
	speed = 150;
	snake.forEach((el) => gameField.cells[el].classList.remove('snake'));
	snake.length = 0;
	snake.push(0, 1, 2);
	snake.forEach((element, i) => {
		gameField.cells[i + (gameField.columnsAmount * 10) + 10].classList.add('snake');
		snake[i] = i + (gameField.columnsAmount * 10) + 10;
	});
}

const createMsg = () => {
	if (!gameOver && !playing ) messageEl.innerHTML = `(Re)Start the game by pressing the start / stop button.<br>
														Navigate the snake with the arrow keys on your keyboard.<br>
														Eat as much as food as you can, without hitting the wall or yourself.<br>
														With each food you eat, the snake get longer AND moves faster.`
	if (gameOver) messageEl.innerHTML = `You hit the wall or yourself.<br>Your score is: ${score}.<br>Press the restart button to start again.`
}

const init = () => {
	score = 0;
	gameOver = false;
	if (food) {gameField.cells[randomCell].classList.remove('food');
	food = false}
	playing = false;
	pauseGame();
	setSnake();
	createMsg();
};



const adjustToWindow = () => {
    setGameField();
};

const startStopHandler = () => {
	playing = playing ? false : true;
	playing && !gameOver ? startGame() : pauseGame();
}

const startGame = () => {
	intervalId ??= setInterval(activeGame, speed);
	if (!food) placeFood();
}

const setDirection = (event) => {
	if (playing){
		if (event.key === 'ArrowUp' && lastMove !== 'down'){
			direction = 'up';
		} else if (event.key === 'ArrowDown' && lastMove !== 'up'){
			direction = 'down';
		} else if (event.key === 'ArrowRight' && lastMove !== 'left'){
			direction = 'right';
		} else if (event.key == 'ArrowLeft' && lastMove !== 'right'){
			direction = 'left';
		}
	}
}

const placeFood = () => {
	let max = 0;
	do {
		randomCell = Math.floor(Math.random() * gameField.cells.length);
		max++;
	}
	while (gameField.cells[randomCell].classList.contains('snake') && max < 99);
	gameField.cells[randomCell].classList.add('food');
	food = true;
}



const activeGame = () => {
	let head = snake[snake.length - 1];
		gameOverHandler();
	if (direction === 'right') {
		if (gameOver) return;
		gameField.cells[head + 1].classList.add('snake');
		gameField.cells[snake[0]].classList.remove('snake');
		for (let i = 0; i < snake.length - 1; i++){
			snake[i] = snake[i + 1];
		};
		snake[snake.length - 1] += 1;
		lastMove = 'right';
	} else if (direction === 'up') {
		if (gameOver) return;
		gameField.cells[head - gameField.columnsAmount].classList.add('snake');
		gameField.cells[snake[0]].classList.remove('snake');
		for (let i = 0; i < snake.length - 1; i++){
			snake[i] = snake[i + 1];
		};
		snake[snake.length - 1] -= gameField.columnsAmount;
		lastMove = 'up';
	} else if (direction === 'down') {
		if (gameOver) return;
		gameField.cells[head + gameField.columnsAmount].classList.add('snake');
		gameField.cells[snake[0]].classList.remove('snake');
		for (let i = 0; i < snake.length - 1; i++){
			snake[i] = snake[i + 1];
		};
		snake[snake.length - 1] += gameField.columnsAmount;
		lastMove = 'down';
	} else {
		if (gameOver) return;
		gameField.cells[head - 1].classList.add('snake');
		gameField.cells[snake[0]].classList.remove('snake');
		for (let i = 0; i < snake.length - 1; i++){
			snake[i] = snake[i + 1];
		};
		snake[snake.length - 1] -= 1;
		lastMove = 'left';
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
	speed -= 1;
	pauseGame();
	startGame();
	snake.unshift(snake[0]);
	console.log(speed);
}

const gameOverHandler = () => {
	if ((direction === 'right' && ((snake[snake.length - 1] + 1) % gameField.columnsAmount === 0  || 
			gameField.cells[snake[snake.length - 1] + 1].classList.contains('snake'))) ||
		(direction === 'up' && ((snake[snake.length - 1] - gameField.columnsAmount < 0) ||
			gameField.cells[snake[snake.length - 1] - gameField.columnsAmount].classList.contains('snake'))) ||
		(direction === 'left' && ((snake[snake.length - 1] - 1) % gameField.columnsAmount === (gameField.columnsAmount - 1) ||
			gameField.cells[snake[snake.length - 1] - 1].classList.contains('snake'))) ||
		(direction === 'down' && ((snake[snake.length - 1] + gameField.columnsAmount > gameField.cellsAmount) ||
			gameField.cells[snake[snake.length - 1] + gameField.columnsAmount].classList.contains('snake')))) {
		gameOver = true;
		playing = false;
		pauseGame();
		createMsg();
	}
}
//gameField.cells[(head + 1) % gameField.columnsAmount === 1].classList.add('snake')
/*gameField.cells.forEach((cell, i) => {
	if (i % gameField.columnsAmount === 0) cell.classList.add('snake');
});*/
init();
/*----------- Event Listeners ----------*/

//window.addEventListener("resize", adjustToWindow);
startStpBtn.addEventListener('click', startStopHandler);
resetBtn.addEventListener('click', init);
document.body.addEventListener('keydown', setDirection);