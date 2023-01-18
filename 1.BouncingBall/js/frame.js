let canvas = document.querySelector(".canvas");
let ctx = canvas.getContext("2d");
let ball;
let t;
let dt;

const init = () => {
  ball = new Ball(20, "blue");
  ball.x = 50;
  ball.y = 50;
  ball.vx = 200;
  ball.draw(ctx);
  t = new Date().getTime();
  animFrame();
};
const animFrame = () => {
  requestAnimationFrame(animFrame, canvas);
  forEachTimeStep();
};
const forEachTimeStep = () => {
  dt = (new Date().getTime() - t) / 1000; // time elapsed in seconds since last call
  t = new Date().getTime(); // reset t
  ball.x += ball.vx * dt;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ball.draw(ctx);
};

init();
