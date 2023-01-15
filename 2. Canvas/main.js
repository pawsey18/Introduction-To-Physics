let canvas = document.querySelector(".canvas");
let ball = new Ball(50, "#0000ff");
const ctx = canvas.getContext("2d");

ball.x = 100;
ball.y = 100;
ball.draw(ctx);
