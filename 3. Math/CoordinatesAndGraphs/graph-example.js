let canvas = document.querySelector("canvas");
let context = canvas.getContext("2d");
let graph = new Graph(context, -4, 4, -10, 10, 275, 210, 450, 350);
graph.drawGrid(1, 0.2, 5, 1);
graph.drawAxes("x", "y");
let xA = new Array();
let yA = new Array();
for (let i = 0; i <= 100; i++) {
  xA[i] = (i - 50) * 0.08;
  yA[i] = f(xA[i]);
}
graph.plot(xA, yA, "#ff0000", false, true);
function f(x) {
  let y;
  //y = x*x - 2*x - 3;
  //y = -0.5 * Math.pow(x, 5) + 3 * Math.pow(x, 3) + x * x - 2 * x - 3;
  y = 0.2 * (x + 3.6) * (x + 2.5) * (x + 1) * (x - 0.5) * (x - 2) * (x - 3.5);
  return y;
}
let ball = new Ball(50, "blue");
ball.x = 100;
ball.y = 200;

function placeBall() {
  ball = new Ball(6, "#0000ff");
  ball.x = xA[0] / xscal + xorig;
  ball.y = -yA[0] / yscal + yorig;
  ball.draw(context);
}

function setupTimer() {
  idInterval = setInterval(moveBall, 1000 / 60);
}
function moveBall() {
  ball.x = xA[n] / xscal + xorig;
  ball.y = -yA[n] / yscal + yorig;
  context.clearRect(0, 0, canvas.width, canvas.height);
  ball.draw(context);
  n++;
  if (n == xA.length) {
    clearInterval(idInterval);
  }
}
