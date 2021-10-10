// Defines the player class
class Tile {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;

  }

  // Moving logic
  move() {

  }

  // Draws the shape
  display() {
    push();
    noStroke();
    rectMode(CORNER);
    fill(3, 160, 98);
    rect(this.x, this.y, this.size, this.size);
    pop();
  }
}
