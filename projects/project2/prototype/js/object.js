// Defines the object class
class Objects {
  constructor(x, y, size, type) {
    this.x = x;
    this.y = y;
    this.size = size;
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
  // constructor(x, y, size, type) {
  //   super(x, y, size, type);
  // }
  display() {
    image(spriteTree, this.x, this.y, spriteTree.width * tileScale, spriteTree.height * tileScale);
  }
}
