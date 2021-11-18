// Defines the object class
class Objects {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.sprite = spriteGrass;
    this.bboxWidth = tileSize;//
    this.bboxHeight = tileSize;
    this.bboxX = this.x + tileSize;
    this.bboxY = this.y + tileSize * 2;
    this.tileIndex = type;
    this.objectType = 'object';
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

     this.sprite = spriteTree
     this.bboxWidth = tileFinalSize * .45;
     this.bboxHeight = tileFinalSize / 3;
     this.bboxX = this.x + tileSize * tileScale * 1.3;
     this.bboxY = this.y + tileSize * tileScale * 3.25;
   }

  display() {
    image(this.sprite, this.x, this.y, this.sprite.width * tileScale, this.sprite.height * tileScale);

  }
}

// Log object
class Log extends Objects {
   constructor(x, y, type) {
     super(x, y, type);
     this.sprite = spriteLog;
     this.bboxX = this.x + tileSize;
     this.bboxY = this.y - tileSize /2;
     this.bboxWidth = this.sprite.width * tileScale - tileSize * 2;
   }

  display() {
    image(this.sprite, this.x, this.y, this.sprite.width * tileScale, (this.sprite.height * tileScale) / 4, 0, this.tileIndex * tileSize, this.sprite.width, this.sprite.width / 4);
  }
}

// Stump object
class Stump extends Objects {
   constructor(x, y, type) {
     super(x, y, type);
     this.sprite = spriteStump;
     this.bboxY = this.y + tileSize ;
     this.bboxWidth = this.sprite.width * tileScale - tileSize * 2;

   }

  display() {
    image(this.sprite, this.x, this.y, this.sprite.width * tileScale, this.sprite.height * tileScale);
  }
}

// Rock object
class Rock extends Objects {
   constructor(x, y, type) {
     super(x, y, type);

     this.sprite = spriteRock;
     this.bboxWidth = this.sprite.width * tileScale - tileSize * 2;
     this.bboxHeight = this.sprite.height * tileScale / 3;

   }

  display() {
    image(this.sprite, this.x, this.y, this.sprite.width * tileScale, this.sprite.height * tileScale);
  }
}
