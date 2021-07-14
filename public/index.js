const portElement = document.querySelector('h3');
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
let raf;

canvas.width = innerWidth;
canvas.height = innerHeight;

const ballcount = Math.floor(randomIntFromRange(3, 15));
let balls = [];

function updatePort() {
  fetch('/getport')
    .then((response) => response.json())
    .then((data) => (portElement.innerHTML = `Running on port: ${data.port}`));
}

function randomIntFromRange(min, max) {
  return Math.random() * (max - min) + min;
}

function Ball(x, y, radius, color, vx, vy) {
  this.position = { x, y };
  this.radius = radius;
  this.color = color;
  this.vx = vx;
  this.vy = vy;
  this.draw = () => {
    c.beginPath();
    c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, true);
    c.closePath();
    c.fillStyle = this.color;
    c.fill();
  };
}

for (let i = 0; i < ballcount; i++) {
  const radius = randomIntFromRange(10, 30);
  const x = randomIntFromRange(radius, canvas.width - radius);
  const y = randomIntFromRange(radius, canvas.height - radius);

  const vx = randomIntFromRange(-4, 4);
  const vy = randomIntFromRange(-4, 4);

  balls.push(new Ball(x, y, radius, 'rgb(255, 143, 143)', vx, vy));
}

function draw() {
  c.clearRect(0, 0, canvas.width, canvas.height);
  balls.forEach((ball) => {
    ball.draw();
    if (
      ball.position.x - ball.radius <= 0 ||
      ball.position.x + ball.radius >= canvas.width
    ) {
      ball.vx = -ball.vx;
    }
    if (
      ball.position.y - ball.radius <= 0 ||
      ball.position.y + ball.radius >= canvas.height
    ) {
      ball.vy = -ball.vy;
    }

    ball.position.x += ball.vx;
    ball.position.y += ball.vy;
  });

  raf = window.requestAnimationFrame(draw);
}

draw();

window.onresize = () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
};

document.body.onload = updatePort;
