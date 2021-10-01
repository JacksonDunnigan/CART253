/**
Dodge-Em
Jackson Dunigan
*/

"use strict";


// Defines the player
let user = {
  x: 250,
  y: 600,
  size: 100,
  fill: 255
};

let numStatic = 750;
let maxBulletTimer = 15;
let currentTimer = 0;

let enemyTimer = {
  current: 100,
  maximumTimer: 100,
  minimumtimer: 40
};

let enemies = [];
let bullets = [];
let asteroid;
let spaceship;

// Preloads images
function preload() {
  asteroid =  loadImage('assets/images/asteroid.png');
  spaceship =  loadImage('assets/images/spaceship.png');

}

// Sets up the canvas
function setup() {
  createCanvas(700, 700);
  imageMode(CENTER);
  spaceship.resize(user.size * 1.25, user.size * 1.25);
  noCursor();
}

// Shooting
function mouseClicked() {
  if (currentTimer == 0){
    currentTimer = maxBulletTimer;
    bullets.push(new Bullet(user.x, user.y));
  }
}

// Drawing objects
function draw() {
  background(0);

  // Display static
  for (let i = 0; i < numStatic; i++) {
    let x = random(0, width);
    let y = random(0, height);
    stroke(255);
    point(x, y);
  }

  // Enemy spawning
  if (enemyTimer.current > 0) {
    enemyTimer.current -= 1;
  } else if (enemyTimer.current <= 0) {
    enemies.push(new Enemy(random(0, width), 0, random(60, 120)));
    enemyTimer.current = random(30,100);
    console.log(enemyTimer.minimumTimer, enemyTimer.maximumTimer);
  }

  // User movement
  user.x = mouseX;


  // Player enemy collision
  for (let i = 0; i < enemies.length; i++) {
    let d = dist(user.x, user.y, enemies[i].x, enemies[i].y);
    if (d < enemies[i].size / 2 + user.size / 2) {
      enemies.splice(0, enemies.length);
      enemyTimer.current = 120
      setup();
    }
  }

  // Bullet collision
  for (let i = 0; i < bullets.length; i++) {
    for (let j = 0; j < enemies.length; j++) {
      let d = dist(bullets[i].x, bullets[i].y, enemies[j].x, enemies[j].y);
      if (d < enemies[j].size / 2 + bullets[i].size / 2) {
        enemies.splice(j, 1);
        bullets.splice(i, 1);
      }
    }
  }

  // Displays the bullets
  if (currentTimer > 0) {
    currentTimer -= 1;
  }

  for (let i = 0; i < bullets.length; i++) {
    if (bullets[i].y <= 0){
      bullets.splice(i, 1);
    } else {
      bullets[i].move();
      bullets[i].display();
    }
  }

  // Displays user
  //fill(user.fill);

  image(spaceship, user.x, user.y);
  //ellipse(user.x, user.y, user.size);

  // Displays the enemy
  for (let i = 0; i < enemies.length; i++) {
    if (enemies[i].y > height) {
      enemies.splice(i, 1);
    } else {
      enemies[i].move();
      enemies[i].display();
    }
  }


}
