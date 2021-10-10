/**
Project 1
Jackson Dunnigan
*/

"use strict";
let size = 512;
let tileSize = 64;

// Defines objects
let player;
let tiles = [];

// Defines stuff before the game starts
function preload() {

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
  for (var y = 6; y < height / tileSize; y++) {
    for (var x = 0; x < width / tileSize; x++) {
      tiles[y][x] = new Tile(x * tileSize, y * tileSize, tileSize);
    }
  }

  tiles[5][5] = new Tile(5 * tileSize, 5 * tileSize, tileSize);
}

// Horizontal collision
function xCollision(x, y, size) {

}

// Vertical collision
function collision(xx, yy, size) {
  for (var y = 0; y < tiles.length; y++) {
    for (var x = 0; x < tiles[y].length; x++) {
      if (tiles[y][x] != null) {
        if (yy + size >= tiles[y][x].y && xx + size >= tiles[y][x].x && xx <= tiles[y][x].x + tiles[y][x].size) {
          return true;
          console.log(1);
        }
      }
    }
  }
  return false;
}

// Keyboard input
function keyPressed() {

  // Left movement
  if (keyCode === LEFT_ARROW || key === 'a') {
    //if (player.direction == 0) {
      player.direction = -1;
    //} else if (player.direction = 1){
    //  player.direction = 0;
    //}
  }

  // Right movement
  if (keyCode === RIGHT_ARROW || key === 'd') {
    //if (player.direction == 0) {
      player.direction = 1
    //} else if (player.direction = -1){
    //  player.direction = 0;
  //  }
  }

  //player.direction = right - left;

  // Jumping movement
  if (keyCode == 32) {
    if (player.jump == false) {
      player.jump = true;
      player.yVelocity = - player.terminalYVelocity;
    }
  }

}
function keyReleased() {

  player.direction = 0;
}


// Draws everything on the screen
function draw() {

  background(0);
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
