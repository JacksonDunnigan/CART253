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

    // Keyboard input
    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
      this.direction = 1;
    } else if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
      this.direction = -1;
    } else {
      this.direction = 0;
    }

    // Jumping movement
    if (keyIsDown(32) && this.jump == false && this.yVelocity == 0) {
      this.jump = true;
      this.yVelocity = - this.terminalYVelocity;
    }

    // Input
    this.xVelocity += this.direction * this.acceleration;

    // Collision
    if (verticalCollision(this.x, this.y + this.yVelocity, this.size)){
      if (this.yVelocity > 0) {
        this.jump = false;
      }
      this.yVelocity = 0;

    } else {
      this.yVelocity += this.gravity;
    }

    if (horizontalCollision(this.x + this.xVelocity, this.y, this.size)){
      this.xVelocity = 0;
    }


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
    this.x = constrain(this.x + this.xVelocity, 0, width - this.size);
    this.y = constrain(this.y + this.yVelocity, 0, height);
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
