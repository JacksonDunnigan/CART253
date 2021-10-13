// Defines the tile class
class Tile {
  constructor(x, y, size, type) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.sprite = grass;
    this.tileIndex = type;
  }
  
  // Draws the tile
  display() {
    push();
    noStroke();
    rectMode(CORNER);
    image(this.sprite[this.tileIndex], this.x, this.y, this.size, this.size);
    pop();
  }
}