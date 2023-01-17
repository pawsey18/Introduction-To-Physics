let canvas = document.querySelector(".canvas");
//let ball = new Ball(50, "#0000ff");
const context = canvas.getContext("2d");

// context.strokeStyle = "#0000ff";
// context.lineWidth = 2;
// context.beginPath();
// context.moveTo(50, 50);
// context.lineTo(150, 50);
// context.lineTo(150, 200);
// context.lineTo(50, 200);
// context.lineTo(50, 50);
// context.stroke();
// context.fillStyle = "#00ff00";
// context.fill();

gradient = context.createLinearGradient(0, 0, 0, 500);
gradient.addColorStop(0, "green");
gradient.addColorStop(1, "black");
context.fillStyle = gradient;
context.fillRect(0, 0, 700, 500);
gradient1 = context.createRadialGradient(350, 250, 5, 350, 250, 50);
gradient1.addColorStop(0, "green");
gradient1.addColorStop(1, "black");
context.fillStyle = gradient1;
context.arc(350, 250, 50, 0, 2 * Math.PI, true);
context.fill();
