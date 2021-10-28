"use strict";

let gravityForce = 0.0025;

let paddle;
let maxTimer = 5;
let timer = maxTimer;
let balls = [];
let numBalls = 5;
let currentBalls = 0;
let lives = 3;
let state = 'title';
let heart;
let fontPixel;

function preload() {
  heart = loadImage('assets/images/heart.png');
  fontPixel = loadFont('assets/ArcadeClassic.ttf');
}

function setup() {
  createCanvas(700,700);
  noCursor();
  textFont(fontPixel);
}

// Controling game states
function mousePressed() {

  if (state === `title`) {
    state = 'simulation';
    paddle = new Paddle(200,30);
    addBall();
  } else if (state === `gameover`) {
    state = `title`;
  }
}

// Adds a ball
function addBall() {
  if (currentBalls < numBalls) {
    let x = random(100, width - 100);
    let y = -50;
    let ball = new Ball(x,y);
    balls.push(ball);
    currentBalls += 1;
  }
}

// Simulation
function simulation() {
  paddle.move();
  paddle.display();

  // Timer
  if (frameCount % 60 == 0 && timer > 0) {
    timer --;
  }
  if (timer == 0) {
    timer = maxTimer;
    addBall();
  }

  // Health bar
  for (var i = 0; i < lives; i++){
    image(heart, i * 80 + 15, 25, 75,75);
  }

  // Balls
  for (let i = 0; i < balls.length; i++) {
    let ball = balls[i];
    if (ball.active) {
      ball.gravity(gravityForce);
      ball.move();
      ball.bounce(paddle);
      ball.display();
    }
  }

  // Game over state
  if (lives <= 0) {
    state = 'gameover';
    balls.splice();
  }
}

function title() {

  lives = 3;
  push();
  textSize(64);
  fill(230, 62, 98);
  textAlign(CENTER,CENTER);
  textSize(96);
  text(`Super Juggle \nMania`, width / 2, height * 0.4);
  textSize(44);
  text(`Insert Coin`, width / 2, height * .66);
  pop();
}

function gameOver() {
  push();
  textSize(64);
  fill(230, 62, 98);
  textAlign(CENTER,CENTER);
  textSize(96);
  text(`Game over`, width / 2, height * 0.4);
  pop();
}

function draw() {
  background(0);
  if (state === `title`) {
    title();
  } else if (state === `simulation`) {
    simulation();
  } else if (state === `gameover`) {
    gameOver();
  }
}
