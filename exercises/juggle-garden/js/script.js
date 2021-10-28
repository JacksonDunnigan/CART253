"use strict";

let gravityForce = 0.0025;

let paddle;
let maxTimer = 2;
let timer = maxTimer;
let balls = [];
let numBalls = 5;
let currentBalls = 0;

function setup() {
  createCanvas(700,700);

  paddle = new Paddle(300,20);

  addBall();
}

function addBall() {
  if (currentBalls < numBalls) {
    let x = random(100, width - 100);
    let y = -50;
    let ball = new Ball(x,y);
    balls.push(ball);
    currentBalls += 1;
  }
}

function draw() {
  background(0);

  paddle.move();
  paddle.display();

  if (frameCount % 60 == 0 && timer > 0) {
    timer --;
  }
  if (timer == 0) {
    timer = maxTimer;
    addBall();
  }

  for (let i = 0; i < balls.length; i++) {
    let ball = balls[i];
    if (ball.active) {
      ball.gravity(gravityForce);
      ball.move();
      ball.bounce(paddle);
      ball.display();
    }
  }
}
