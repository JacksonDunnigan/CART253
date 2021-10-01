// Defines a shape class
class Enemy {
  constructor(x, y, size) {
    this.size = size;
    this.x = x;
    this.y = y;
    this.terminalXVelocity = 8;
    this.terminalYVelocity = 8;
    this.xVelocity = 0;
    this.yVelocity = 8;
    this.acceleration = 0.125;

    this.sprite = asteroid;
    this.sprite.resize(this.size, this.size);

  }

  // Moving logic
  move() {

    // Following the mouse
    if (mouseX > this.x + this.size / 2) {
      this.xVelocity += this.acceleration;
    } else if (mouseX < this.x - this.size / 2) {
      this.xVelocity -= this.acceleration;
    } else {
      this.xVelocity * 0.9
    }

    // Velocity capping
    if (abs(this.xVelocity) >= this.terminalXVelocity) {
      this.xVelocity = (this.xVelocity / abs(this.xVelocity)) * this.terminalXVelocity;
    }

    if (abs(this.yVelocity) >= this.terminalYVelocity) {
      this.yVelocity = (this.yVelocity / abs(this.yVelocity)) * this.terminalYVelocity;
    }

    // Changes position
    this.x += this.xVelocity;
    this.y += this.yVelocity;

  }


  // Draws the shape
  display() {
    push();
    noStroke();
    fill(this.r, this.g, this.b);
    image(this.sprite, this.x, this.y);
    pop();
  }
}
