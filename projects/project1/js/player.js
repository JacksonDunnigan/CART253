// Defines the player class
class Player {
  constructor(x, y, size) {

    // Physics variables
    this.x = x;
    this.y = y;
    this.jump = false;
    this.direction = 0;
    this.xVelocity = 0;
    this.yVelocity = 0;
    this.acceleration = 0.25;
    this.terminalXVelocity = 4;
    this.terminalYVelocity = 12;
    this.gravity = 0.5;

    // Sprite variables
    this.size = size;
    this.sprite = playerSprite;
    this.spriteWidth = this.size * 1.5;
    this.spriteHeight = this.size * 2;

    // Other variables
    this.currentObject = 1;
  }

  // Moving and interaction logic
  move() {

    // Switches items
    if (keyIsDown(49)) {
      this.currentObject = 1;
    } else if (keyIsDown(50)) {
      this.currentObject = 2;
    }


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
      this.yVelocity = - this.terminalYVelocity * 0.75;
    }

    // Adds acceleration to the velocity
    this.xVelocity += this.direction * this.acceleration;

    // Tile collision
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


    // Adds deceleration to the velocity
    if (this.direction == 0) {
      if (this.xVelocity > this.acceleration) {
        this.xVelocity -= this.acceleration;
      } else if (this.xVelocity < -this.acceleration) {
        this.xVelocity += this.acceleration;
      } else {
        this.xVelocity = 0;
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
    this.x = constrain(this.x + this.xVelocity, this.size/2, width - this.size/2);
    this.y += this.yVelocity;//constrain(this.y + this.yVelocity, 0, height);
  }

  // Draws the player
  display() {

    push();
    imageMode(CENTER);
    noSmooth();

    // Manages the current sprite
    var currentSprite;
    if (this.xVelocity != 0) {
      smooth();
      if (this.currentObject == 1) {
        currentSprite = this.sprite[1];
      } else if (this.currentObject == 2) {
        currentSprite = this.sprite[3];
      }
    } else {
      if (this.currentObject == 1) {
        currentSprite = this.sprite[0];
      } else if (this.currentObject == 2) {
        currentSprite = this.sprite[2];
      }
    }

    // Draws sprite and reflects it when needed
    if (this.xVelocity < 0) {
      push();
      scale(-1, 1);
      image(currentSprite, -this.x, this.y + this.spriteHeight / 2, currentSprite.width * 1.5, currentSprite.height * 1.5);
      pop();
    } else if (this.xVelocity >= 0) {
      image(currentSprite, this.x, this.y + this.spriteHeight / 2, currentSprite.width * 1.5, currentSprite.height * 1.5);
    }

    pop();
  }
}
