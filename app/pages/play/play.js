var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

// the canvas width & height, snake x & y, and the apple x & y, all need to be a multiples of the grid size in order for collision detection to work
// (e.g. 20 * 30 = 600)
var grid = 20;
var count = 0;

var playing = false;
var stopped = false;
var score = 0;

var snake = {
  x: 200,
  y: 200,

  dx: grid,
  dy: 0,

  cells: [],

  maxCells: 4
};
var apple = {
  x: 400,
  y: 400
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function loop() {
	if (playing) {
	requestAnimationFrame(loop);

	if (++count < 4) {
		return;
	}

	count = 0;
	context.clearRect(0,0,canvas.width,canvas.height);

	snake.x += snake.dx;
	snake.y += snake.dy;

	if (snake.x < 0) {
		snake.x = canvas.width - grid;
	}
	else if (snake.x >= canvas.width) {
		snake.x = 0;
	}

	if (snake.y < 0) {
		snake.y = canvas.height - grid;
	}
	else if (snake.y >= canvas.height) {
		snake.y = 0;
	}

	snake.cells.unshift({x: snake.x, y: snake.y});

	if (snake.cells.length > snake.maxCells) {
		snake.cells.pop();
	}

	context.fillStyle = '#cc2d2d';
	context.fillRect(apple.x, apple.y, grid-1, grid-1);

	context.fillStyle = '#03C988';
	snake.cells.forEach(function(cell, index) {

		context.fillRect(cell.x, cell.y, grid-1, grid-1);

		if (cell.x === apple.x && cell.y === apple.y) {
		snake.maxCells++;
		score++;
		updateScore();

		apple.x = getRandomInt(0, 30) * grid;
		apple.y = getRandomInt(0, 30) * grid;
		}

		for (var i = index + 1; i < snake.cells.length; i++) {
		if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
			snake.x = 200;
			snake.y = 200;
			snake.cells = [];
			snake.maxCells = 4;
			snake.dx = grid;
			snake.dy = 0;

			apple.x = getRandomInt(0, 30) * grid;
			apple.y = getRandomInt(0, 30) * grid;
			stopGame();
			displayFailure();
		}
		}
	});
	}
}
document.addEventListener('keydown', function(e) {

  // left arrow key
  if (e.which === 37 && snake.dx === 0) {
    snake.dx = -grid;
    snake.dy = 0;
  }
  // up arrow key
  else if (e.which === 38 && snake.dy === 0) {
    snake.dy = -grid;
    snake.dx = 0;
  }
  // right arrow key
  else if (e.which === 39 && snake.dx === 0) {
    snake.dx = grid;
    snake.dy = 0;
  }
  // down arrow key
  else if (e.which === 40 && snake.dy === 0) {
    snake.dy = grid;
    snake.dx = 0;
  }
});

function startGame() {
	stopped = false;
	const start = document.querySelector("#start");
	start.innerHTML = "Start";

	snake.x = 200;
	snake.y = 200;
	snake.cells = [];
	snake.maxCells = 4;
	snake.dx = grid;
	snake.dy = 0;

	apple.x = getRandomInt(0, 30) * grid;
	apple.y = getRandomInt(0, 30) * grid;
	
	const fail = document.querySelector("#fail");
	fail.style.opacity = "0";
	fail.style.animation = "";
	score = 0;
	const scr = document.querySelector("#scr");
	scr.innerHTML = "Score: " + score;
	if (!playing) {
		playing = true;
		requestAnimationFrame(loop);
	}
}

function stopGame() {
	cancelAnimationFrame(loop);
	playing = false;
	stopped = true;
	const start = document.querySelector("#start");
	start.innerHTML = "Reset";
}

function displayFailure() {
	const fail = document.querySelector("#fail");
	fail.style.animation = "fail 2s";
	setTimeout(() => {
		fail.style.opacity = 1;
		fail.style.animation = "";
	}, 2000); 
}

function updateScore() {
	const scr = document.querySelector("#scr");
	scr.innerHTML = "Score: " + score;
}
