// Defines the player class
class Player {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.jump = false;
    this.direction = 0;
    this.xVelocity = 0;
    this.yVelocity = 0;
    this.acceleration = 0.25;
    this.terminalXVelocity = 4;
    this.terminalYVelocity = 12;
    this.gravity = 0.5;
  }

  // Moving logic
  move() {

    // Collision
    if (collision(this.x + this.xVelocity, this.y + this.yVelocity, this.size)){
      this.yVelocity = 0;
      this.jump = false;
    } else {
      this.yVelocity += this.gravity;
    }

    // Input
    this.xVelocity += this.direction * this.acceleration;

    // Deceleration
    if (this.direction == 0) {
      if (this.xVelocity > this.acceleration) {
        this.xVelocity -= this.acceleration;
      } else if (this.xVelocity < -this.acceleration) {
        this.xVelocity += this.acceleration;
      } else {
        this.xVelocity = 0;
      }
    }

    // Capping velocity
    this.xVelocity = constrain(this.xVelocity, -this.terminalXVelocity, this.terminalXVelocity);
    this.yVelocity = constrain(this.yVelocity, -this.terminalYVelocity, this.terminalYVelocity);

    // Moves the circles
    this.x += this.xVelocity;
    this.y += this.yVelocity;
  }

  // Draws the shape
  display() {

    push();
    rectMode(CORNER);
    fill(50, 55, 100);
    rect(this.x, this.y, this.size, this.size);
    pop();
  }
}
