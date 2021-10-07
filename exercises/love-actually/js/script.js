// Defines the user
let user = {
  x: 0,
  y: 0,
  size: 75,
  vx: 0,
  vy: 0,
  speed: 3,
  spawnDistance: 300,
  grandmaCount: 1,
  warningMessage: false
};

// Defines the enemy;
let enemy = [];

// Defines the game states
let state = `title`;

// Defines images
let grandma;
let player;
let floor;
let fontPixel;
function preload(){
  grandma = loadImage('assets/images/grandma.png');
  floor = loadImage('assets/images/floor.png');
  player = loadImage('assets/images/kid.png');

  fontPixel = loadFont('assets/ArcadeClassic.ttf');
}

function setup() {
  createCanvas(500,500);
  floor.resize(50, 50);
  noCursor();
  setupCircles();
  textFont(fontPixel);
}

// Generates enemies and separates circles from one another
function setupCircles() {

  user.x = constrain(mouseX, 0, width);
  user.y = constrain(mouseY, 0, width);
  var tempX = user.x;
  var tempY = user.y;
  for (var i = 0; i < user.grandmaCount; i ++) {

    while(dist(user.x, user.y, tempX, tempY) <= width *0.75) {
      tempX = user.x + random(-user.spawnDistance, user.spawnDistance);
      tempY = user.y + random(-user.spawnDistance, user.spawnDistance);
    }

    // Creates the enemy
    enemy.push(new Enemy(tempX, tempY, user.size * 1.5));
    tempX = user.x;
    tempY = user.y;
  }
}

function draw() {
  background(0);

  // Tiled floor
  if (state === `simulation`){
    for (var y = 0; y < height / floor.height + 1; y++) {
      for (var x = 0; x < width / floor.width + 1; x++) {
        image(floor, x * floor.width, y * floor.height);
      }
    }
  }

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
  fill(200, 100, 100);
  textAlign(CENTER,CENTER);
  if (user.grandmaCount > 1 && user.warningMessage == false) {
    text(`LOOK WHAT\nYOUVE DONE!`, width / 2, height / 2);
  } else {
    text(`DONT LET\nGRANDMA\nKISS YOU!`, width / 2, height / 2);
  }
  pop();
}

function simulation() {
  move();
  checkOffscreen();
  checkOverlap();
  display();
}

function love() {
  push();
  textSize(64);
  fill(255, 150, 150);
  textAlign(CENTER,CENTER);
  text(`YOU  LOSE!`, width/2, height/2);
  pop();
}

function cursed() {
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

  if (user.grandmaCount > 1) {
    text(`DONT GET TO\n5 GRANDMAS!`, width / 2, height / 2);
  } else {
    text(`NO ESCAPING\nGRANDMA!`, width / 2, height / 2);
  }
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

//Check if the circles have gone offscreen
function checkOffscreen() {
  if (isOffscreen(user)) {
    state = `sadness`;
  }
}

function isOffscreen(circle) {
  if (circle.x < -100 || circle.x > width + 100 || circle.y < -100 || circle.y > height + 100) {
    return true;
  }
  else {
    return false;
  }
}

function checkOverlap() {
  // Check if the circles overlap
  for (var i = 0; i < enemy.length; i++){
    let d = dist(user.x, user.y, enemy[i].x, enemy[i].y - enemy[i].size * 0.2);
    if (d < user.size / 2) {
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
  image(player, user.x, user.y, user.size * 1.5, user.size * 1.5);

}

// Controling game states
function mousePressed() {

  //if (isOffscreen(user) == false) {

    if (state === `title`) {
      if (user.grandmaCount > 1) {
        user.warningMessage = true;
      }
      state = `simulation`;
    } else if (state == `sadness`) {

      user.grandmaCount = min(user.grandmaCount + 1, 5);
      state = `title`;
      for (var i = 0; i < enemy.length; i++) {
        enemy.splice(i);
      }
      setup();
    } else if (state == `love`) {
      state = `title`;
      for (var i = 0; i < enemy.length; i++){
        enemy.splice(i);
      }
      setup();
    }
  //}
}
