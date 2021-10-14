// Defines the plant class
class Plant {
  constructor(x, y, size, startingGrowth) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.growth = startingGrowth;
    this.timer = 0;
    this.sprite = corn;

  }

  // Moving logic
  move() {

  }

  // Draws the shape
  display() {
    push();
    image(this.sprite, this.x, this.y, this.size, this.size * 2 , this.growth * 32, 0, 32, 64);
    //image(this.sprite[this.growth], this.x, this.y, this.size, this.size);
    pop();
  }
}
