const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");
let radius = 20;
const color = "blue";
const numBalls = 10;
let g = 0.1; // acceleration by gravity

// initial values
let x = 50;
let y = 50;
let vx = Math.random() * 5;
let vy = (Math.random() - 0.5) * 4;

// create balls list
let balls = new Array();

const init = () => {
  for (let i = 0; i < numBalls; i++) {
    let ball = new Ball(radius, color);
    ball.x = 50;
    ball.y = 75;
    ball.vx = Math.random() * 5;
    ball.vy = (Math.random() - 0.5) * 4;
    ball.draw(ctx);
    balls.push(ball);
    console.log("test");
  }
  setInterval(forEachTimeStep, 1000 / 60); // 60 fps
};

const forEachTimeStep = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < numBalls; i++) {
    let ball = balls[i];
    ball.vy += g; // gravity increasing vertical speed
    ball.x += ball.vx; // horizontal speed that increases horizontal position
    ball.y += ball.vy; // vertical speed increases verical pos
    // if ball hits the ground
    if (ball.y > canvas.height - radius) {
      ball.y = canvas.height - radius; // reposition
      ball.vy *= -0.8; // reverse, then reduce vertical speed
    }

    // ball going off canvas
    if (ball.x > canvas.width + radius) {
      ball.x = -radius;
    }
    ball.draw(ctx);
  }
};

init();
