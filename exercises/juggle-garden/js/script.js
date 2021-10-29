"use strict";

let gravityForce = 0.0025;

let paddle;
let maxTimer = 3;
let timer = maxTimer;
let balls = [];
let bombs = [];
let numBalls = 3;
let currentBalls = 0;
let lives = 3;
let state = 'title';
let heart;
let fontPixel;
let bomb;
let score = 0;
let winScore = 100;

function preload() {
  heart = loadImage('assets/images/heart.png');
  bomb = loadImage('assets/images/bomb.png');
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
  } else if (state === `win`) {
    state = `title`;
  }
}

// Adds a ball
function addBall() {
  let x = random(100, width - 100);
  let y = -50;
  if (currentBalls < numBalls) {

    let ball = new Ball(x,y);
    balls.push(ball);
    currentBalls += 1;
  } else {
    let enemy = new Enemy(x,y);
    bombs.push(enemy);
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

  // Bombs
  for (let i = 0; i < bombs.length; i++) {
    let bomb = bombs[i];
    if (bomb.active) {
      bomb.gravity(gravityForce);
      bomb.move();
      bomb.bounce(paddle);
      bomb.display();
    }
  }

  // Game over state
  if (lives <= 0) {
    state = 'gameover';
    for (let i = 0; i < balls.length;) {
      balls.splice(i);
    }
    for (let i = 0; i < bombs.length;) {
      bombs.splice(i);
    }
    score = 0;
    currentBalls = 0;
  }

  //score
  if (frameCount % 20 == 0) {
    score += 1;
    if (score >= winScore){
      state = 'win';
      for (let i = 0; i < balls.length;) {
        balls.splice(i);
      }
      for (let i = 0; i < bombs.length;) {
        bombs.splice(i);
      }
      score = 0;
      currentBalls = 0;
    }
  }

  push();
  textSize(40);
  fill(255, 255, 255);
  text('score  ' + score, width - 200, 65);
  pop();
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

function win() {
  push();
  textSize(64);
  fill(230, 62, 98);
  textAlign(CENTER,CENTER);
  textSize(96);
  text(`You win!`, width / 2, height * 0.4);
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
  } else if (state === `win`) {
    win();
  } else if (state === `gameover`) {
    gameOver();
  }
}
