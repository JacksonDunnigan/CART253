/**
Project 1
Jackson Dunnigan
*/

"use strict";
let size = 672;
let tileSize = 48;

// Defines objects
let player;
let tiles = [];
let grass = [];
let playerSprite = [];

// Defines stuff before the game starts
function preload() {
  grass[0] = loadImage('assets/images/grass1.png');
  grass[1] = loadImage('assets/images/grass2.png');
  grass[2] = loadImage('assets/images/grass3.png');

  playerSprite[0] = loadImage('assets/images/player_idle.png');
  playerSprite[1] = loadImage('assets/images/player_walking.png');
}
// Sets up the canvas
function setup() {
  createCanvas(size, size);

  // Creates the player
  player = new Player(size/2, 0, tileSize);

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

  //tiles[2][7] = new Tile(2 * tileSize, 7 * tileSize, tileSize);
  //tiles[5][9] = new Tile(5 * tileSize, 9 * tileSize, tileSize);


  // Chooses tile types
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

// Draws everything on the screen
function draw() {

  background(136, 172, 151);
  player.move();
  player.display();

  // Draws the tiles
  for (var y = 0; y < tiles.length; y++) {
    for (var x = 0; x < tiles[y].length; x++) {
      if (tiles[y][x] != null) {
        tiles[y][x].display();
      }
    }
  }
}
