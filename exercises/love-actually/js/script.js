// Defines the user
let user = {
  x: 0,
  y: 0,
  size: 75,
  vx: 0,
  vy: 0,
  speed: 3,
  spawnDistance: 300
};

// Defines the enemy;
let enemy = [];

// Defines the game states
let state = `title`;

// Defines images
let grandma;

function preload(){
  grandma =  loadImage('assets/images/grandma.png');
}

function setup() {
  createCanvas(500,500);
  setupCircles();
}

// Generates enemies and separates circles from one another
function setupCircles() {

  user.x = constrain(mouseX, 0, width);;
  user.y = constrain(mouseY, 0, width);;
  var tempX = user.x;
  var tempY = user.y;
  while(dist(user.x, user.y, tempX, tempY) <= width *0.75) {
    tempX = user.x + random(-user.spawnDistance, user.spawnDistance);
    tempY = user.y + random(-user.spawnDistance, user.spawnDistance);
  }

  // Creates the enemy
  enemy.push(new Enemy(tempX, tempY, user.size * 1.5));
}

function draw() {
  background(0);

  if (state === `title`) {
    title();
  }
  else if (state === `simulation`) {
    simulation();
  }
  else if (state === `love`) {
    love();
  }
  else if (state === `sadness`) {
    sadness();
  }
}

function title() {
  push();
  textSize(64);
  fill(200,100,100);
  textAlign(CENTER,CENTER);
  text(`LOVE?`,width / 2,height / 2);
  pop();
}

function simulation() {
  move();
  //checkOffscreen();
  checkOverlap();
  display();
}

function love() {
  push();
  textSize(64);
  fill(255, 150, 150);
  textAlign(CENTER,CENTER);
  text(`LOVE!`, width/2, height/2);
  pop();
}

function sadness() {
  push();
  textSize(64);
  fill(150,150,255);
  textAlign(CENTER,CENTER);
  text(`:(`, width / 2, height / 2);
  pop();
}

function move() {

  // Moves the circles
  user.x = constrain(mouseX, 0, width);//+= circle1.vx;
  user.y = constrain(mouseY, 0, height);//+= circle1.vy;


  for (var i = 0; i < enemy.length; i++){
    enemy[i].move();
  }
}

// Check if the circles have gone offscreen
// function checkOffscreen() {
//   if (isOffscreen(user)) {
//     state = `sadness`;
//   }
// }
//
// function isOffscreen(circle) {
//   if (circle.x < 0 || circle.x > width || circle.y < 0 || circle.y > height) {
//     return true;
//   }
//   else {
//     return false;
//   }
// }

function checkOverlap() {
  // Check if the circles overlap
  for (var i = 0; i < enemy.length; i++){
    let d = dist(user.x, user.y, enemy[i].x, enemy[i].y - enemy[i].size * 0.2);
    if (d < user.size / 2 + enemy[i].size / 4) {
      state = `love`;
    }
  }
}

function display() {

  // Display the grandma
  for (var i = 0; i < enemy.length; i++){
    enemy[i].display();
  }

  // Displays the user
  ellipse(user.x, user.y, user.size);
}

// Controling game states
function mousePressed() {
  if (state === `title`) {
    state = `simulation`;
  } else if (state == `sadness` || state == `love`) {
    state = `title`;
    for (var i = 0; i < enemy.length; i++){
      enemy.splice(i);
    }
    setup();
  }
}
