const GameEndEvent = 'gameEnd';
const GameStartEvent = 'gameStart';

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

	const userName = localStorage.getItem('userName');
	broadcastEvent(userName, GameStartEvent, {});
	
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
	saveScore(score);
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

async function saveScore(score) {
    const userName = localStorage.getItem('userName');
    const date = new Date().toLocaleDateString();
    const newScore = { name: userName, score: score, date: date };

    try {
		const response = await fetch('/api/score', {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify(newScore),
		});

		// Store what the service gave us as the high scores
		const scores = await response.json();
		localStorage.setItem('scores', JSON.stringify(scores));
		broadcastEvent(userName, GameEndEvent, score);
    } catch {
		// If there was an error then just track scores locally
		this.updateScoresLocal(newScore);
    }
}

function updateScoresLocal(newScore) {
    let scores = [];
    const scoresText = localStorage.getItem('scores');
    if (scoresText) {
      	scores = JSON.parse(scoresText);
    }

    let found = false;
    for (const [i, prevScore] of scores.entries()) {
		if (newScore > prevScore.score) {
			scores.splice(i, 0, newScore);
			found = true;
			break;
		}
    }

    if (!found) {
     	scores.push(newScore);
    }

    if (scores.length > 10) {
      	scores.length = 10;
    }

    localStorage.setItem('scores', JSON.stringify(scores));
}

// Functionality for peer communication using WebSocket

function configureWebSocket() {
	const protocol = location.protocol === 'http:' ? 'ws' : 'wss';
	this.socket = new WebSocket(`${protocol}://${location.host}/ws`);
	this.socket.onopen = (event) => {
		displayMsg('system', 'game', 'connected');
	};
	this.socket.onclose = (event) => {
		displayMsg('system', 'game', 'disconnected');
	};
	this.socket.onmessage = async (event) => {
		const msg = JSON.parse(await event.data.text());
		if (msg.type === GameEndEvent) {
		displayMsg('player', msg.from, `scored ${msg.value.score}`);
		} else if (msg.type === GameStartEvent) {
		displayMsg('player', msg.from, `started a new game`);
		}
	};
}

function displayMsg(cls, from, msg) {
	const chatText = document.querySelector('#player-messages');
	chatText.innerHTML =
		`<div class="event"><span class="${cls}-event">${from}</span> ${msg}</div>` + chatText.innerHTML;
}

function broadcastEvent(from, type, value) {
	const event = {
		from: from,
		type: type,
		value: value,
	};
	this.socket.send(JSON.stringify(event));
}

const playerNameEl = document.querySelector('.player-name');
playerNameEl.textContent = localStorage.getItem('userName');

configureWebSocket();