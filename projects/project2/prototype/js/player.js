// Defines the player class
class Player {
  constructor(x, y) {

    // Physics variables
    this.x = x;
    this.y = y;
    this.xVelocity = 0;
    this.yVelocity = 0;
    this.acceleration = 0.25;
    this.terminalXVelocity = 3;
    this.terminalYVelocity = 3;
    this.xDirection = 0;
    this.yDirection = 0;
    //this.xCollide = false;
    //this.yCollide = false;

    // Visual variables
    this.sprite = spritePlayer;

    this.size = this.sprite.width * tileScale /2;
    this.spriteWidth = this.sprite.width * tileScale;
    this.spriteHeight = this.sprite.height * tileScale;
  }


  // Moving and interaction logic
  move() {

    //var obj = objects[floor(this.y / this.size)][floor((this.x + this.xVelocity + this.size) / this.size)];

    // Keyboard input

    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)){// && this.xCollide == false) {
      this.xDirection = 1;
    } else if (keyIsDown(LEFT_ARROW) || keyIsDown(65)){ //&& this.xCollide == false) {
      this.xDirection = -1;
    } else {
      this.xDirection = 0;
    }


    if (keyIsDown(UP_ARROW) || keyIsDown(87)) {// && this.yCollide == false) {
      this.yDirection = -1;
    } else if (keyIsDown(DOWN_ARROW) || keyIsDown(83)){ //&& this.yCollide == false) {
      this.yDirection = 1;
    } else {
      this.yDirection = 0;
    }

    // Adds acceleration to the velocity
    this.xVelocity += this.xDirection * this.acceleration;
    this.yVelocity += this.yDirection * this.acceleration;

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

  }

  xCollision(obj) {
    if (this.xDirection != 0 &&
      this.x + this.size / 2 + this.xVelocity >= obj.bboxX &&
      this.x - this.size / 2 + this.xVelocity <=  obj.bboxX + obj.bboxWidth &&
      this.y - this.size / 2 + this.yVelocity <= obj.bboxY + obj.bboxHeight &&
      this.y + this.size / 2 + this.yVelocity >= obj.bboxY) {
      this.xVelocity = 0;
      //this.xCollide = true;
      return true;
    }

    //this.xCollide = false;
    return false;
  }

  yCollision(obj) {
    if (this.yDirection != 0 &&
      this.y + this.size + this.yVelocity * 2 >= obj.bboxY &&
      this.y + this.yVelocity <=  obj.bboxY + obj.bboxHeight &&
      this.x + this.xVelocity <= obj.bboxX + obj.bboxWidth &&
      this.x + this.size + this.xVelocity * 2 >= obj.bboxX) {
      this.yVelocity = 0;
      //this.yCollide = true;
      return true;
    }
    //this.yCollide = false;
    return false;

  }

  // Draws the player
  display() {

    push();
    noSmooth();
    imageMode(CENTER);
    image(this.sprite, this.x, this.y, this.spriteWidth, this.spriteHeight);
    //rect(this.x, this.y, this.size, this.size);
    pop();
  }
}

// Shadow object
class Shadow {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.spriteWidth = spriteShadow.width * tileScale;
    this.spriteHeight= spriteShadow.height * tileScale;
  }


  // Draws the shadow
  display() {
    push();
    imageMode(CENTER);
    image(spriteShadow, this.x + tileSize/8, this.y + this.spriteHeight * 2, this.spriteWidth, this.spriteHeight);
    pop();
  }
}
