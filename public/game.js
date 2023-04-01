// set up the canvas element
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;

// ball properties
let ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  speedX: 3,
  speedY: 5,
  size: 30,
};

// paddles properties
let paddle = {
  height: 150,
  width: 30,
  speed: 40,
};
let player1Y = canvas.height / 2 - paddle.height / 2;
let player2Y = canvas.height / 2 - paddle.height / 2;

// score properties
let scores = {
  player1: 0,
  player2: 0,
};

// key event handlers for moving the paddles
document.addEventListener("keydown", ({ code }) => {
  if (code === "KeyW" && player1Y > 0) {
    player1Y -= paddle.speed;
  } else if (code === "KeyS" && player1Y < canvas.height - paddle.height) {
    player1Y += paddle.speed;
  } else if (code === "Numpad8" && player2Y > 0) {
    player2Y -= paddle.speed;
  } else if (code === "Numpad2" && player2Y < canvas.height - paddle.height) {
    player2Y += paddle.speed;
  } else if (code === "KeyP") {
    togglePause();
  }
});

//pause or resume the game
let paused = false;
function togglePause() {
  paused = !paused;
}

// game main execution
function render() {
  if (paused) {
    requestAnimationFrame(render);
    return;
  }
  // Movement of the ball
  ball.x += ball.speedX;
  ball.y += ball.speedY;

  // top-bottom wall collision detection
  if (ball.y < ball.size || ball.y > canvas.height - ball.size) {
    ball.speedY = -ball.speedY;
  }

  // padels collision detection
  if (
    ball.x < (paddle.width + ball.size) &&
    ball.y > player1Y &&
    ball.y < player1Y + paddle.height
  ) {
    ball.speedX = -ball.speedX;
  } else if (
    ball.x > canvas.width - paddle.width - ball.size &&
    ball.y > player2Y &&
    ball.y < player2Y + paddle.height
  ) {
    ball.speedX = -ball.speedX;
  }

  // left-right wall collision detection
  if (ball.x < ball.size) {
    scores.player2++;
    resetBall();
  } else if (ball.x > canvas.width - ball.size) {
    scores.player1++;
    resetBall();
  }

  // draw the elements on canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "red";
  ctx.fillRect(0, player1Y, paddle.width, paddle.height);
  ctx.fillStyle = "blue";
  ctx.fillRect(canvas.width - paddle.width, player2Y, paddle.width, paddle.height);
  ctx.beginPath();
  ctx.fillStyle = "yellow";
  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
  ctx.fill();
  ctx.font = "30px Arial";
  ctx.fillStyle = "white";
  ctx.fillText(scores.player1.toString(), canvas.width / 4, 50);
  ctx.fillText(scores.player2.toString(), (canvas.width / 4) * 3, 50);

  requestAnimationFrame(render);
}

render();

// reset elements
function resetBall() {
    //reset ball
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.speedX = -ball.speedX;
    ball.speedY = Math.random() < 0.5 ? -5 : 5;

    //reset padels
    player1Y = canvas.height / 2 - paddle.height / 2;
    player2Y = canvas.height / 2 - paddle.height / 2;
  }
