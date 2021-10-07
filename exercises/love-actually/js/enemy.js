// Defines a shape class
class Enemy {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.vx = 0;
    this.vy = 0;
    this.acceleration = 0.25;
    this.terminalVelocity = 3;
    this.speed = 3;
    this.sprite = grandma;

  }

  // Moving logic
  move() {

    // Acceleration and terminal velocity
    if (mouseX > this.x + this.size / 2) {
      this.vx += this.acceleration;
    } else if (mouseX < this.x - this.size / 2) {
      this.vx -= this.acceleration;
    }
    if (mouseY > this.y + this.size / 2) {
      this.vy += this.acceleration;
    } else if (mouseY < this.y - this.size / 2) {
      this.vy -= this.acceleration;
    }

    this.vx = constrain(this.vx, -this.terminalVelocity, this.terminalVelocity);
    this.vy = constrain(this.vy, -this.terminalVelocity, this.terminalVelocity);

    // Moves the circles
    user.x = mouseX;//+= circle1.vx;
    user.y = mouseY;//+= circle1.vy;
    this.x += this.vx;
    this.y += this.vy;

    }

  // Draws the shape
  display() {

    imageMode(CENTER)

    // Draws sprite and rotates
    if (this.vx > 0) {
      push();
      scale(-1, 1);
      image(this.sprite, -this.x, this.y, this.size, this.size);
      pop();
    } else if (this.vx <= 0) {
      image(this.sprite, this.x, this.y, this.size, this.size);
    }
  }
}
