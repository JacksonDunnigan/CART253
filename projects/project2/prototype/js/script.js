/**
Foraging Simulator
Jacksn Dunnigan

This is a game where you identify and forage plants and mushrooms in the forest in order to survive
*/

"use strict";

// Formating variables
let screenWidth = 1200;
let screenHeight = 800;
let tileSize = 16
let tileScale = 4;
let tileFinalSize = tileSize * tileScale;

// Generation variables
let tiles = [];
let objects = [];
let grid = [];
let values = {
  tree: 1,
  stump: 2,
  mushroom: 3
};

// Sprites
let spriteSheet;
let spriteTree;

// Preloads sprites and audio
function preload() {
  spriteSheet = loadImage('assets/images/sprite_sheet.png');
  spriteTree = loadImage('assets/images/tree.png');
}


// Sets up the canvas
function setup() {
  createCanvas(screenWidth, screenHeight);

  // Defines the tile and object arrays
  for (var y = 0; y < height / tileFinalSize; y++) {
    tiles[y] = [];
    objects[y] = [];
    grid[y] = [];
    for (var x = 0; x < width / tileFinalSize; x++) {
      objects[y].push(null);
      tiles[y].push(null);
      grid[y].push(null);
    }
  }

  // Generates tiles
  for (var y = 0; y < height / tileFinalSize; y++) {
    for (var x = 0; x < width / tileFinalSize; x++) {
      tiles[y][x] = new Tile(x * tileFinalSize, y * tileFinalSize, tileFinalSize, floor(random(8)));
    }
  }

  // Generates trees
  for (var y = 0; y < height / tileFinalSize; y++) {
    for (var x = 0; x < width / tileFinalSize; x++) {

      // Checks if the area is free to spawn a tree
      var canSpawnTree = true;
      for (var yy = y; yy < min(y + 4, grid.length); yy++) {
        for (var xx = x; xx < min(x + 3, grid[y].length); xx++) {
          if (grid[yy][xx] != null) {
            canSpawnTree = false;
            break;
          }
        }
      }

      // Adds the tree
      if (floor(random(25)) == 1 && canSpawnTree == true) {
        for (var yy = y; yy < min(y + 4, grid.length); yy++) {
          for (var xx = x; xx < min(x + 3, grid[y].length); xx++) {
            grid[yy][xx] = values.tree;
          }
        }
        objects[y][x] = new Tree(x * tileFinalSize, y * tileFinalSize, tileFinalSize, 0);
      }
    }
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
      if (objects[y][x] != null) {
        objects[y][x].display();
      }
    }
  }

  // Draws the objects
  for (var y = 0; y < tiles.length; y++) {
    for (var x = 0; x < tiles[y].length; x++) {
      if (objects[y][x] != null) {
        objects[y][x].display();
      }
    }
  }
}

// Draws everything on the screen
function draw() {
  background(51, 152, 76);
  simulation();
}
