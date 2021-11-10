// Defines the object class
class Objects {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.bboxX = x;
    this.bboxY = y;
    this.bboxWidth = tileFinalSize;
    this.bboxHeight = tileFinalSize;
    this.size = tileFinalSize;
    this.tileIndex = type;
    this.sprite = spriteSheet;
  }

  // Draws the tile
  display() {
    image(this.sprite, this.x, this.y, this.size, this.size, this.tileIndex * tileSize, 0, tileSize, tileSize);
  }
}

// Tree object
class Tree extends Objects {
   constructor(x, y, type) {
     super(x, y, type);
     this.bboxWidth = tileFinalSize * .45;
     this.bboxHeight = tileFinalSize / 3;
     this.bboxX = this.x + tileSize * tileScale * 1.3;
     this.bboxY = this.y + tileSize * tileScale * 3.25;
     this.sprite = spriteTree
   }

  display() {
    image(this.sprite, this.x, this.y, this.sprite.width * tileScale, this.sprite.height * tileScale);

  }
}

// Stump objects
class Stump extends Objects {
   constructor(x, y, type) {
     super(x, y, type);

     this.sprite = spriteStump;
     this.bboxWidth = this.sprite.width * tileScale - tileSize * 2;
     this.bboxHeight = tileSize;
     this.bboxX = this.x + tileSize;
     this.bboxY = this.y + tileSize * 2;
     this.tileIndex = type;
   }

  display() {
    image(this.sprite, this.x, this.y, this.sprite.width * tileScale, (this.sprite.height * tileScale) / 4, 0, this.tileIndex * tileSize, this.sprite.width, this.sprite.width / 4);
  }
}
