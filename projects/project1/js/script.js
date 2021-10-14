/**
Project 1
Jackson Dunnigan
lucky harvest is a retro arcade styled farming simulator
*/

"use strict";
let size = 672;
let tileSize = 48;


// Defines objects
let player;
let tiles = [];
let crops = [];


// Defines sprites
let logo;
let titleGrass;
let corn;
let waterAlert;
let grass = [];
let barn;
let playerSprite = [];
let buttons = [];

// Defines the font
let fontPixel;

// Variable to store the game state
let state;

// Defines stuff before the game starts
function preload() {

  // Loads the required font
  fontPixel = loadFont('assets/ArcadeClassic.ttf');

  // Loads all the required sprites
  grass[0] = loadImage('assets/images/grass/grass1.png');
  grass[1] = loadImage('assets/images/grass/grass2.png');
  grass[2] = loadImage('assets/images/grass/grass3.png');

  // Player sprites
  playerSprite[0] = loadImage('assets/images/player/player_idle_state1.png');
  playerSprite[1] = loadImage('assets/images/player/player_walking_state1.png');
  playerSprite[2] = loadImage('assets/images/player/player_idle_state2.png');
  playerSprite[3] = loadImage('assets/images/player/player_walking_state2.png');

  // Map sprites
  barn = loadImage('assets/images/barn.png');
  corn = loadImage('assets/images/corn.png');

  // Menu sprites
  logo = loadImage('assets/images/logo.png');
  waterAlert = loadImage('assets/images/water_alert.png');
  titleGrass = loadImage('assets/images/title_grass.png');
  buttons[0] = loadImage('assets/images/button1.png');
  buttons[1] = loadImage('assets/images/button2.png');
}

// Sets up the canvas
function setup() {
  createCanvas(size, size);
  textFont(fontPixel);
  setupScreen();
  state = `title`
}

// Sets up the screen
function setupScreen() {

  // Creates the player
  player = new Player(size * 0.667, tileSize * 9, tileSize);
  state = 'simulation';

  // Defines the floor
  for (var y = 0; y < height / tileSize; y++) {
    tiles[y] = [];
    for (var x = 0; x < width / tileSize; x++) {
      tiles[y].push(null);
    }
  }

  // Generates tiles on the floor
  for (var y = 11; y < height / tileSize; y++) {
    for (var x = 0; x < width / tileSize; x++) {
      tiles[y][x] = new Tile(x * tileSize, y * tileSize, tileSize);
    }
  }

  // Generates crops
  for (var x = 0; x < 6; x++) {
    crops.push(new Plant(64 + x * tileSize * 1.25, 9 * tileSize, tileSize));
  }

  // Gives each tile the proper sprite
  for (var y = 0; y < tiles.length; y++) {
    for (var x = 0; x < tiles[y].length; x++) {
      if (y > 0 && tiles[y-1][x] == null && tiles[y][x] != null) {
        tiles[y][x].tileIndex = 0;
      } else if (y > 2 && tiles[y-1][x] != null && tiles[y-2][x] != null && tiles[y][x] != null) {
        tiles[y][x].tileIndex = 2;
      } else if (tiles[y][x] != null && tiles[y-1][x] != null) {
        tiles[y][x].tileIndex = 1;
      }
    }
  }
}

// Vertical collision
function verticalCollision(xx, yy, spriteWidth, spriteHeight) {
  for (var y = 0; y < tiles.length; y++) {
    for (var x = 0; x < tiles[y].length; x++) {
      if (tiles[y][x] != null) {
        if (yy + spriteHeight >= tiles[y][x].y && yy < tiles[y][x].y + tiles[y][x].size && xx + spriteWidth -16 > tiles[y][x].x && xx + 16 < tiles[y][x].x + tiles[y][x].size) {
          return true;
        }
      }
    }
  }
  return false;
}

// Horizontal collision
function horizontalCollision(xx, yy, spriteWidth, spriteHeight) {
  for (var y = 0; y < tiles.length; y++) {
    for (var x = 0; x < tiles[y].length; x++) {
      if (tiles[y][x] != null) {
        if (xx + spriteWidth - 16 > tiles[y][x].x && xx + 16 < tiles[y][x].x + tiles[y][x].size && yy < tiles[y][x].y + tiles[y][x].size && yy + spriteHeight > tiles[y][x].y) {
          return true;
        }
      }
    }
  }
  return false;
}


// Title screen
function title() {

  push();
  noSmooth();
  image(logo, tileSize, tileSize, logo.width * 2, logo.height * 2);

  fill(61, 30, 48);
  textAlign(CENTER, CENTER);
  textSize(40);
  text(`insert coin`, width / 4, height * 0.3);

  // Draws crops
  image(corn, width * .05, height * 0.515, tileSize * 1.5, tileSize * 3, 64, 0, 32, 64);
  image(corn, width * .19, height * 0.515, tileSize * 1.5, tileSize * 3, 128, 0, 32, 64);
  image(corn, width * .33, height * 0.515, tileSize * 1.5, tileSize * 3, 32, 0, 32, 64);

  // Draws grass
  image(titleGrass, 0, height * 0.667, titleGrass.width * 2.5, titleGrass.height * 2.5);
  image(barn, width * 0.6, height * 0.3 + 6, barn.width * 2.5, barn.height * 2.5);
  image(playerSprite[0], width * 0.45, height * 0.5 - 8, playerSprite[0].width * 2.5, playerSprite[0].height * 2.5);
  pop();

  // Checks if any key is pressed. If so, the game will start
  if (keyIsPressed === true || mouseIsPressed === true) {
    state = 'simulation';
  }
}

// Main game loop
function simulation() {
    noSmooth();

    // Draws the tiles
    for (var y = 0; y < tiles.length; y++) {
      for (var x = 0; x < tiles[y].length; x++) {
        if (tiles[y][x] != null) {
          tiles[y][x].display();
        }
      }
    }

    // Draws the crops
    for (var x = 0; x < crops.length; x++) {
      crops[x].display();
      crops[x].move();
    }

    // Draws the barn
    image(barn, width - tileSize * 4, height - tileSize * 6.5, barn.width * (tileSize / 32), barn.height * (tileSize / 32));

    // Draws the player object
    player.move();
    player.display();

    // Outlines the current object being held
    push();
    strokeWeight(10);
    stroke(255, 223, 100);
    if (player.currentObject == 1) {
      rect(tileSize / 2, tileSize / 2, tileSize * 1.5, tileSize * 1.5, 5);
    } else if (player.currentObject == 2) {
      rect(tileSize * 2.5, tileSize / 2, tileSize * 1.5, tileSize * 1.5, 5);
    }
    pop();

    // Draws the buttons
    image(buttons[0], tileSize / 2, tileSize / 2, tileSize * 1.5, tileSize * 1.5);
    image(buttons[1], tileSize * 2.5, tileSize / 2, tileSize * 1.5, tileSize * 1.5);

}

// Draws everything on the screen
function draw() {
  background(136, 172, 151);

  if (state === `title`) {
    title();
  }
  else if (state === `simulation`) {
    simulation();
  }
}
