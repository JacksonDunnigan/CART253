// Defines the plant class
class Plant {
  constructor(x, y, size, type) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.sprite = grass;
    this.tileIndex = type;
  }

  // Moving logic
  move() {

  }

  // Draws the shape
  display() {
    push();
    noStroke();
    rectMode(CORNER);
    //fill(3, 160, 98);
    image(this.sprite[this.tileIndex], this.x, this.y, this.size, this.size);
    //rect(this.x, this.y, this.size, this.size);
    pop();
  }
}
