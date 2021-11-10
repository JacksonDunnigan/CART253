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
let mapSize = 32;

// Generation variables
let tiles = [];
let objects = [];
let grid = [];
let values = {
  spawn: 1,
  tree: 2,
  stump: 3,
  mushroom: 4
};

// Player variables
let player;

// Sprites
let spriteSheet;
let spriteTree;
let spriteStump;

// Preloads sprites and audio
function preload() {
  spriteSheet = loadImage('assets/images/sprite_sheet.png');
  spriteTree = loadImage('assets/images/tree.png');
  spriteStump = loadImage('assets/images/stump.png');
}


// Sets up the canvas
function setup() {
  createCanvas(screenWidth, screenHeight);

  // Creates the player
  player = new Player(width / 2, height / 2, tileFinalSize);


  // Defines the tile and object arrays
  for (var y = 0; y < mapSize; y++) {
    tiles[y] = [];
    objects[y] = [];
    grid[y] = [];
    for (var x = 0; x < mapSize; x++) {
      objects[y].push(null);
      tiles[y].push(null);
      grid[y].push(null);
    }
  }


  for (var y = mapSize / 2 + 5; y < mapSize / 2 + 10; y++) {
    for (var x = mapSize / 2 + 5; x < mapSize / 2 + 10; x++) {
      grid[x][y] = values.spawn;
    }
  }

  // Generates tiles
  for (var y = 0; y < mapSize; y++) {
    for (var x = 0; x < mapSize; x++) {
      tiles[y][x] = new Tile((x - (mapSize/2)) * tileFinalSize , (y - (mapSize/2)) * tileFinalSize, tileFinalSize, floor(random(8)));
    }
  }

  // Generates trees and stumps
  for (var y = 0; y < mapSize; y++) {
    for (var x = 0; x < mapSize; x++) {

      var currentObject = floor(random(2));

      // Adds the stump
      if (currentObject == 0) {

        // Checks if the area is free to spawn a stump
        var canSpawnStump = true;
        for (var yy = y; yy < y + 1; yy++) {
          for (var xx = x; xx < x + 5; xx++) {
            if (yy >= grid.length || xx >= grid[y].length || grid[yy][xx] != null) {
              canSpawnStump = false;
              break;
            }
          }
        }
        // Adds the stump
        if (floor(random(35)) == 1 && canSpawnStump == true && dist(x * tileFinalSize, y * tileFinalSize, player.x, player.y) > tileFinalSize * 5) {
          for (var yy = y; yy < min(y + 1, grid.length); yy++) {
            for (var xx = x; xx < min(x + 5, grid[y].length); xx++) {
              grid[yy][xx] = values.stump;
            }
          }
          objects[y][x] = new Stump((x - (mapSize/2)) * tileFinalSize, (y - (mapSize/2)) * tileFinalSize, floor(random(5)));
        }

      // Adds trees
      } else if (currentObject == 1) {

        // Checks if the area is free to spawn a tree
        var canSpawnTree = true;
        for (var yy = y; yy < y + 4; yy++) {
          for (var xx = x; xx < x + 3; xx++) {
            if (yy >= grid.length || xx >= grid[y].length || grid[yy][xx] != null) {
              canSpawnTree = false;
              break;
            }
          }
        }

        // Adds the tree
        if (floor(random(25)) == 1 && canSpawnTree == true && dist(x * tileFinalSize, y * tileFinalSize, player.x, player.y) > tileFinalSize * 5) {
          for (var yy = y; yy < min(y + 4, grid.length); yy++) {
            for (var xx = x; xx < min(x + 3, grid[y].length); xx++) {
              grid[yy][xx] = values.tree;
            }
          }
          objects[y][x] = new Tree((x - (mapSize/2)) * tileFinalSize, (y - (mapSize/2)) * tileFinalSize, 0);
        }
      }
    }
  }
}


// Main game loop
function simulation() {
  noSmooth();

  // Player collision
  for (var y = 0; y < objects.length; y++) {
    for (var x = 0; x < objects[y].length; x++) {
      if (objects[y][x] != null) {
        player.xCollision(objects[y][x]);
        player.yCollision(objects[y][x]);
      }
    }
  }

  // Moving tiles
    for (var y = 0; y < tiles.length; y++) {
      for (var x = 0; x < tiles[y].length; x++) {


        // X collision
        if (player.xCollide == false) {
          if (objects[y][x] != null) {
            objects[y][x].x -= player.xVelocity;
            objects[y][x].bboxX -= player.xVelocity;
          }
          tiles[y][x].x -= player.xVelocity;
        }

        // Y collision
        if (player.yCollide == false) {
          if (objects[y][x] != null) {
            objects[y][x].y -= player.yVelocity;
            objects[y][x].bboxY -= player.yVelocity;
          }
          tiles[y][x].y -= player.yVelocity;
        }

        // Draws the tiles
        if (tiles[y][x] != null) {
          tiles[y][x].display();
        }
      }
    }



  // Draws the players
  player.move();
  var playerDraw = false;

  // Draws the objects
  for (var y = 0; y < tiles.length; y++) {
    for (var x = 0; x < tiles[y].length; x++) {
      if (objects[y][x] != null) {
        if (player.y + player.size <= objects[y][x].bboxY + objects[y][x].bboxHeight &&
          player.y + player.size >= objects[y][x].y &&
          player.x + player.size >= objects[y][x].x &&
          player.x <= objects[y][x].x + objects[y][x].sprite.width * tileScale) {
          player.display();
          playerDraw = true;
        }
        objects[y][x].display();
      }
    }
  }
  if (playerDraw == false){
    player.display();
  }
}

// Draws everything on the screen
function draw() {
  background(51, 152, 76);
  simulation();
}
