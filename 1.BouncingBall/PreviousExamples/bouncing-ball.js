const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");
let radius = 20;
let color = "blue";
let g = 0.1; // acceleration by gravity
// initial values
let x = 50;
let y = 50;
let vx = 2;
let vy = 0;

const init = () => {
  setInterval(forEachTimeStep, 1000 / 60); // 60 fps
};

const forEachTimeStep = () => {
  vy += g; // gravity increasing vertical speed
  x += vx; // horizontal speed that increases horizontal position
  y += vy; // vertical speed increases verical pos

  // if ball hits the ground
  if (y > canvas.height - radius) {
    y = canvas.height - radius; // reposition
    vy *= -0.8; // reverse, then reduce vertical speed
  }
  if (x > canvas.width + radius) {
    // ball going off canvas
    x = -radius; // wrap it and bring back to starting pos
  }

  drawBall();
};

function drawBall() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI, true);
  ctx.closePath();
  ctx.fill();
}

init();
