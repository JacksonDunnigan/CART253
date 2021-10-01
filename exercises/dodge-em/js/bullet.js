class Bullet {
  constructor(x, y) {
    this.size = 10;
    this.x = x;
    this.y = y;
    this.yVelocity = -20;
    this.r = 173;
    this.g = 216;
    this.b = 230;
  }

  // Moving logic
  move() {
    this.y += this.yVelocity;
  }

  // Draws the shape
  display() {
    noStroke();
      fill(this.r, this.g, this.b);
      ellipse(this.x, this.y, this.size);
    }
}
