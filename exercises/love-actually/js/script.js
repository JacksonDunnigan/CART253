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
  cursed: false,
  secretEnding: false,
  warningMessage: false
};

let door = {
  x: 75,
  y: 100,
  size: 75
};

// Defines the enemy;
let enemy = [];

// Defines the game states
let state = `title`;

// Defines images
let grandmaArt;
let monsterArt;
let doorArt;
let playerArt;
let floorArt;
let fontPixel;

function preload(){
  grandmaArt = loadImage('assets/images/grandma.png');
  floorArt = loadImage('assets/images/floor.png');
  monsterArt = loadImage('assets/images/monster.png');
  playerArt = loadImage('assets/images/kid.png');
  doorArt = loadImage('assets/images/door.png');
  fontPixel = loadFont('assets/ArcadeClassic.ttf');
}

function setup() {
  createCanvas(500,500);
  floorArt.resize(50, 50);
  doorArt.resize(100, 100);
  noCursor();
  setupCircles();
  textFont(fontPixel);
}

// Generates enemies and separates circles from one another
function setupCircles() {

  user.x = mouseX//constrain(mouseX, 0, width);
  user.y = mouseY//constrain(mouseY, 0, width);
  var tempX = user.x;
  var tempY = user.y;
  for (var i = 0; i < user.grandmaCount; i ++) {

    while(dist(user.x, user.y, tempX, tempY) <= width *0.75) {
      tempX = user.x + random(-user.spawnDistance, user.spawnDistance);
      tempY = user.y + random(-user.spawnDistance, user.spawnDistance);
    }

    // Creates the enemy
    enemy.push(new Enemy(tempX, tempY, user.size * 1.5, user.cursed));
    tempX = user.x;
    tempY = user.y;
  }
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
  else if (state === `secret`) {
    secret();
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
  checkDoorCollision();
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

function secret() {
  push();
  textSize(64);
  fill(255, 150, 150);
  textAlign(CENTER,CENTER);
  text(`GRANDMA\nATE YOU`, width/2, height/2);
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
  user.x = constrain(mouseX, 0, width);
  user.y = constrain(mouseY, 0, height);

  for (var i = 0; i < enemy.length; i++){
    enemy[i].move();
  }
}

//Checks for door collision
function checkDoorCollision() {

  let d = dist(user.x, user.y, door.x, door.y);
  if (d < user.size / 2) {
    state = `sadness`;
  }
}


function checkOverlap() {
  // Check if the circles overlap
  for (var i = 0; i < enemy.length; i++){
    let d = dist(user.x, user.y, enemy[i].x, enemy[i].y - enemy[i].size * 0.2);
    if (d < user.size / 2) {
      if (user.secretEnding == false){
        state = `love`;
      } else {
        state = `secret`;
      }
    }
  }
}

function display() {

  // Tiled floor
  for (var y = 0; y < height / floorArt.height + 1; y++) {
    for (var x = 0; x < width / floorArt.width + 1; x++) {
      image(floorArt, x * floorArt.width, y * floorArt.height);
    }
  }

  //draws the door
  image(doorArt, door.x, door.y);

  // Display the grandma
  for (var i = 0; i < enemy.length; i++){
    enemy[i].display();
  }

  // Displays the user
  image(playerArt, user.x, user.y, user.size * 1.5, user.size * 1.5);

}

// Controling game states
function mousePressed() {

  if (state === `title`) {
    if (user.grandmaCount > 1) {
      user.warningMessage = true;
    }

    if (user.grandmaCount >= 4) {
      user.cursed = true;
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
  } else if (state == `secret`) {
    state = `title`;
    for (var i = 0; i < enemy.length; i++){
      enemy.splice(i);
    }
    user.cursed = false;
    user.secretEnding = false;
    user.grandmaCount = 1;
    setup();
  }
}
