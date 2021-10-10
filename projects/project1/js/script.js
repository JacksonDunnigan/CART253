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

  tiles[2][3] = new Tile(2 * tileSize, 3 * tileSize, tileSize);
  tiles[5][5] = new Tile(5 * tileSize, 5 * tileSize, tileSize);
}

// Horizontal collision
function xCollision(x, y, size) {

}

// Vertical collision
function verticalCollision(xx, yy, size) {
  for (var y = 0; y < tiles.length; y++) {
    for (var x = 0; x < tiles[y].length; x++) {
      if (tiles[y][x] != null) {
        if (yy + size >= tiles[y][x].y && yy <= tiles[y][x].y + tiles[y][x].size && xx + size > tiles[y][x].x && xx < tiles[y][x].x + tiles[y][x].size) {
          return true;
        }
      }
    }
  }
  return false;
}

// horizontal collision
function horizontalCollision(xx, yy, size) {
  for (var y = 0; y < tiles.length; y++) {
    for (var x = 0; x < tiles[y].length; x++) {
      if (tiles[y][x] != null) {
        if (xx + size >= tiles[y][x].x && xx <= tiles[y][x].x + tiles[y][x].size && yy < tiles[y][x].y + tiles[y][x].size && yy + size > tiles[y][x].y) {
          return true;
        }
      }
    }
  }
  return false;
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
