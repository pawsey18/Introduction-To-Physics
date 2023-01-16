const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");
let radius = 20;
const color = "blue";
const numBalls = 2;
let g = 0.1; // acceleration by gravity
let interval;

// initial values
let x = 0;
let y = 0;
let vx = 0;
let vy = 0;

// create balls list
let balls = new Array();

let ball = new Ball(radius, color);

const init = () => {
  canvas.addEventListener(
    "mousedown",
    function () {
      canvas.addEventListener("mousemove", onDrag, false);
      canvas.addEventListener("mouseup", onDrop, false);
    },
    false
  );
  startAnimation();
};

function onDrag(event) {
  isDragging = true;
  ball.x = event.clientX;
  ball.y = event.clientY;
}
function onDrop() {
  isDragging = false;
  canvas.removeEventListener("mousemove", onDrag, false);
  canvas.removeEventListener("mouseup", onDrop, false);
}

const startAnimation = () => {
  for (let i = 0; i < numBalls; i++) {
    ball.x = 30;
    ball.y = canvas.height - radius;
    ball.vx = 2; //Math.random() * 5;
    ball.vy = 0; //(Math.random() - 0.5) * 4;
    ball.draw(ctx);
    balls.push(ball);
    //console.log("test");
  }
  interval = setInterval(forEachTimeStep, 1000 / 60); // 60 fps
};

const stopAnimation = () => {
  clearInterval(interval);
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
