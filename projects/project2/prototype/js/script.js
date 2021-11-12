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
let mapSize = 256;

// Generation variables
let tiles = [];
let objects = [];
let grid = [];
let values = {
  spawn: 1,
  tree: 2,
  log: 3,
  stump: 4,
  mushroom: 5
};

// Player variables
let player;
let shadow;

// Sprites
let spriteGrass;
let spriteTree;
let spriteLog;
let spriteStump;
let spriteRock;
let spritePlayer;
let spriteShadow;
let spriteBook;
let spriteMushroom;

// Preloads sprites and audio
function preload() {
  spriteGrass = loadImage('assets/images/grass.png');
  spriteTree = loadImage('assets/images/tree.png');
  spriteStump = loadImage('assets/images/stump.png');
  spriteLog = loadImage('assets/images/log.png');
  spriteRock = loadImage('assets/images/rock.png');
  spritePlayer = loadImage('assets/images/player.png');
  spriteShadow = loadImage('assets/images/shadow.png');
  spriteMushroom = loadImage('assets/images/mushrooms.png');
  spriteBook = loadImage('assets/images/book.png');
}


// Sets up the canvas
function setup() {
  createCanvas(screenWidth, screenHeight);

  // Creates the player
  player = new Player(width / 2, height / 2);
  shadow = new Shadow(width / 2, height / 2);


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

  // Creates a spawn barrier
  var tempMap = mapSize / 2 + floor(width / tileFinalSize) / 2;
  for (var y = tempMap - 10; y < tempMap - 5; y++) {
    for (var x = tempMap - 10; x < tempMap - 5; x++) {
      grid[y][x] = values.spawn;
    }
  }

  // Generates the map
  for (var y = 0; y < mapSize; y++) {
    for (var x = 0; x < mapSize; x++) {

      //Generates tiles
      tiles[y][x] = new Tile((x - (mapSize/2) + floor(width / tileFinalSize) / 2) * tileFinalSize , (y - (mapSize/2) + floor(height / tileFinalSize) / 2) * tileFinalSize, tileFinalSize, floor(random(8)));

      var currentObject = floor(random(4));

      // Adds rocks on the edges
      if ((y == 0 && x % 2 == 0) || (x == 0 ) ||
      (x == mapSize - 2) || (x % 2 == 0 && y == mapSize - 1)) {
        objects[y][x] = new Rock((x - (mapSize/2) + floor(width / tileFinalSize) / 2) * tileFinalSize , (y - (mapSize/2) + floor(height / tileFinalSize) / 2) * tileFinalSize, 0);
        fillGrid(x, y, 2, 2, values.tree);
      }

      // Tree spawning
      else if (currentObject == 0 || x == 0 || y == 0 || x == mapSize - 2 || y == mapSize - 1) {
        if (canSpawn(x, y, 3, 4, 15)) {
          fillGrid(x, y, 3, 4, values.tree);
          objects[y][x] = new Tree((x - (mapSize/2) + floor(width / tileFinalSize) / 2) * tileFinalSize , (y - (mapSize/2) + floor(height / tileFinalSize) / 2) * tileFinalSize, 0);
        }
      }

      // Log spawning
      else if (currentObject == 1) {
        if (canSpawn(x, y, 5, 2, 35)) {
          fillGrid(x, y, 5, 2, values.log);
          objects[y][x] = new Log((x - (mapSize/2) + floor(width / tileFinalSize) / 2) * tileFinalSize , (y - (mapSize/2) + floor(height / tileFinalSize) / 2) * tileFinalSize, floor(random(3)));
        }
      }

      // Stump spawning
      else if (currentObject == 2) {
        if (canSpawn(x, y, 2, 1, 50)) {
          fillGrid(x, y, 2, 1, values.stump);
          objects[y][x] = new Stump((x - (mapSize/2) + floor(width / tileFinalSize) / 2) * tileFinalSize , (y - (mapSize/2) + floor(height / tileFinalSize) / 2) * tileFinalSize, 0);
        }
      }

      // Rock spawning
      else if (currentObject == 3) {
        if (canSpawn(x, y, 3, 3, 35)) {
          fillGrid(x, y, 3, 3, values.rock);
          objects[y][x] = new Rock((x - (mapSize/2) + floor(width / tileFinalSize) / 2) * tileFinalSize , (y - (mapSize/2) + floor(height / tileFinalSize) / 2) * tileFinalSize, 0);
        }
      }
    }
  }
}

// Fills the grid with values for object spawning
function fillGrid(x, y, w, h, value){
  for (var yy = y; yy < min(y + h, grid.length); yy++) {
    for (var xx = x; xx < min(x + w, grid[y].length); xx++) {
      grid[yy][xx] = values;
    }
  }
}

// Checks if a given area is spawnable for objects
function canSpawn(x, y, w, h, chance) {
  for (var yy = y; yy < y + h; yy++) {
    for (var xx = x; xx < x + w; xx++) {
      if (yy >= grid.length || xx >= grid[y].length || grid[yy][xx] != null) {
        return false;
      }
    }
  }
  if (floor(random(chance)) == 1) {
    return true;
  }
}

// Main game loop
function simulation() {
  noSmooth();
  background(51, 152, 76);



  // Player collision
  var xCollide = false;
  var yCollide = false;
  for (var y = 0; y < objects.length; y++) {
    for (var x = 0; x < objects[y].length; x++) {
      if (objects[y][x] != null) {
        xCollide = player.xCollision(objects[y][x]);
        yCollide = player.yCollision(objects[y][x]);
      }
    }
  }

  // Moving tiles
    for (var y = 0; y < tiles.length; y++) {
      for (var x = 0; x < tiles[y].length; x++) {


        // X collision
        if (xCollide == false) {
          if (objects[y][x] != null) {
            objects[y][x].x -= player.xVelocity;
            objects[y][x].bboxX -= player.xVelocity;
          }
          tiles[y][x].x -= player.xVelocity;
        }

        // Y collision
        if (yCollide == false) {
          if (objects[y][x] != null) {
            objects[y][x].y -= player.yVelocity;
            objects[y][x].bboxY -= player.yVelocity;
          }
          tiles[y][x].y -= player.yVelocity;
        }

        // Draws the tiles
        if (tiles[y][x] != null
          && tiles[y][x].x + tileFinalSize > 0 && tiles[y][x].x < width
          && tiles[y][x].y + tileFinalSize > 0 && tiles[y][x].y < height) {
          tiles[y][x].display();
        }
      }
    }



  // Draws the players
  player.move();
  shadow.display();
  var playerDraw = false;

  // Draws the objects
  for (var y = 0; y < tiles.length; y++) {
    for (var x = 0; x < tiles[y].length; x++) {

      if (objects[y][x] != null
        && objects[y][x].x + objects[y][x].sprite.width * tileScale > 0 && objects[y][x].x < width
        && objects[y][x].y + objects[y][x].sprite.height * tileScale > 0 && objects[y][x].y < height) {
        if (player.y + player.size / 2 <= objects[y][x].bboxY + objects[y][x].bboxHeight &&
          player.y + player.size / 2 >= objects[y][x].y &&
          player.x + player.size / 2 >= objects[y][x].x &&
          player.x - player.size / 2 <= objects[y][x].x + objects[y][x].sprite.width * tileScale) {
          player.display();
          playerDraw = true;
        }

        objects[y][x].display();
      }
    }
  }
  if (playerDraw == false) {
    player.display();
  }

  // User interface
  image(spriteBook, width - (spriteBook.width * tileScale * 2), height - (spriteBook.height * tileScale * 1.65), spriteBook.width * tileScale, spriteBook.height * tileScale);

}

// Draws everything on the screen
function draw() {
  simulation();

}
