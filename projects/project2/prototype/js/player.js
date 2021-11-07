// Defines the player class
class Player {
  constructor(x, y, size) {

    // Physics variables
    this.x = x;
    this.y = y;
    this.size = size;
    this.xVelocity = 0;
    this.yVelocity = 0;
    this.acceleration = 0.25;
    this.terminalXVelocity = 3;
    this.terminalYVelocity = 3;
    this.xDirection = 0;
    this.yDirection = 0;
    this.xCollide = false;
    this.yCollide = false;
  }


  // Moving and interaction logic
  move() {

    //var obj = objects[floor(this.y / this.size)][floor((this.x + this.xVelocity + this.size) / this.size)];

    // Keyboard input

    if ((keyIsDown(RIGHT_ARROW) || keyIsDown(68)) && this.xCollide == false) {
      this.xDirection = 1;
    } else if ((keyIsDown(LEFT_ARROW) || keyIsDown(65)) && this.xCollide == false) {
      this.xDirection = -1;
    } else {
      this.xDirection = 0;
    }


    if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
      this.yDirection = -1;
    } else if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
      this.yDirection = 1;
    } else {
      this.yDirection = 0;
    }

    // Adds acceleration to the velocity
    this.xVelocity += this.xDirection * this.acceleration;
    this.yVelocity += this.yDirection * this.acceleration;

    // Tile collision
    // if (floor(this.x / , )
    // if (verticalCollision(this.x, this.y + this.yVelocity, this.spriteWidth, this.spriteHeight)) {
    //   this.yVelocity = 0;
    // }
    //
    // if (horizontalCollision(this.x + this.xVelocity, this.y,  this.spriteWidth, this.spriteHeight)) {
    //   this.xVelocity = 0;
    // }

    // Adds deceleration to the velocity
    if (this.xDirection == 0) {
      if (this.xVelocity > this.acceleration) {
        this.xVelocity -= this.acceleration;
      } else if (this.xVelocity < -this.acceleration) {
        this.xVelocity += this.acceleration;
      } else {
        this.xVelocity = 0;
      }
    }

    if (this.yDirection == 0) {
      if (this.yVelocity > this.acceleration) {
        this.yVelocity -= this.acceleration;
      } else if (this.yVelocity < -this.acceleration) {
        this.yVelocity += this.acceleration;
      } else {
        this.yVelocity = 0;
      }
    }
    // Capping the x velocity
    this.xVelocity = constrain(this.xVelocity, -this.terminalXVelocity, this.terminalXVelocity);
    this.yVelocity = constrain(this.yVelocity, -this.terminalYVelocity, this.terminalYVelocity);

    // Teleports you when you walk off the edge
    // if (this.x > width && this.direction == 1) {
    //   this.x = - this.size;
    //   this.y = Math.floor(this.y / this.size) * this.size - 5;
    // }
    // if (this.x < 0 && this.direction == -1) {
    //   this.x = width;
    //   this.y = Math.floor(this.y / this.size) * this.size - 5;
    // }

    // Adds velocity to the current coordinates
    //this.x += this.xVelocity;
    //this.y += this.yVelocity;
  }

  xCollision(obj) {
    if (this.xDirection != 0 &&
      this.x + this.size + this.xVelocity >= obj.x &&
      this.x + this.xVelocity <=  obj.x + obj.size &&
      this.y + this.yVelocity <= obj.y + obj.size &&
      this.y + this.size + this.yVelocity >= obj.y) {
      this.xVelocity = 0;
      this.xCollide = true;
      return true;
    }

    this.xCollide = false;
    return false;
  }

  yCollision(obj) {
    if (this.yDirection != 0 &&
      this.y + this.size + this.yVelocity >= obj.y &&
      this.y + this.yVelocity <=  obj.y + obj.size &&
      this.x + this.yVelocity <= obj.x + obj.size &&
      this.x + this.size + this.xVelocity >= obj.y) {
      this.yVelocity = 0;
      this.yCollide = true;
      return true;
    }

    this.yCollide = false;
    return false;
  }

  // Draws the player
  display() {

    push();
    noSmooth();
    rect(this.x, this.y, this.size, this.size);
    pop();
  }
}
