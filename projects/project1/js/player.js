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
    this.sprite = playerSprite;

    this.spriteWidth = this.size * 1.5;
    this.spriteHeight = this.size * 2;
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
    if (verticalCollision(this.x, this.y + this.yVelocity, this.spriteWidth, this.spriteHeight)){
      if (this.yVelocity >= 0) {
        this.jump = false;
      }
      this.yVelocity = 0;

    } else {
      this.yVelocity += this.gravity;
    }

    if (horizontalCollision(this.x + this.xVelocity, this.y,  this.spriteWidth, this.spriteHeight)){
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

    // Teleport the edges
    if (this.x > width && this.direction == 1) {
      this.x = - this.size;
      this.y = Math.floor(this.y / this.size) * this.size - 5;
    }
    if (this.x < 0 && this.direction == -1) {
      this.x = width;
      this.y = Math.floor(this.y / this.size) * this.size - 5;
    }

    // Moves the circles
    this.x += this.xVelocity; //constrain(this.x + this.xVelocity, 0, width - this.size);
    this.y += this.yVelocity; //constrain(this.y + this.yVelocity, 0, height);
  }

  // Draws the shape
  display() {
    push();
    imageMode(CENTER);
    // Manages the current sprite
    var currentSprite;
    if (this.xVelocity != 0) {
      currentSprite = this.sprite[1];
    } else {
      currentSprite = this.sprite[0];
    }
    // Draws sprite and rotates
    if (this.xVelocity < 0) {
      push();
      scale(-1, 1);
      image(currentSprite, -this.x, this.y + this.spriteHeight / 2, this.spriteWidth, this.spriteHeight);
      pop();
    } else if (this.xVelocity >= 0) {
      image(currentSprite, this.x, this.y + this.spriteHeight / 2, this.spriteWidth, this.spriteHeight);
    }

    imageMode(CORNER);
    fill(50, 55, 100);


    //rect(this.x, this.y, this.size, this.size);
    pop();
  }
}
