// Defines a shape class
class Enemy {
  constructor(x, y, size, cursed) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.vx = 0;
    this.vy = 0;
    this.cursed = cursed;
    this.cursedTimer = 0;
    this.timer = false;
    this.maxCursedTimer = 240;
    this.acceleration = 0.25;
    this.terminalVelocity = 3;
    this.sprite = grandmaArt;
    this.monsterSprite = monsterArt;
    this.targetXAmount = random(-150, 150);
    this.targetYAmount = random(-150, 150);

    this.targetX = 0;
    this.targetY = 0;

  }

  // Moving logic
  move() {

    // Logic for the secret ending
    if (this.cursed == false) {

      this.targetX = mouseX + this.targetXAmount;
      this.targetY = mouseY + this.targetYAmount;

    } else {

      this.targetX = width / 2;
      this.targetY = height / 4;

      if (dist(this.x, this.y, this.targetX, this.targetY) <= this.size/4 && this.cursedTimer == 0 && this.timer == false) {
        this.cursedTimer = this.maxCursedTimer;
        this.timer = true;
      }
      this.cursedTimer = max(this.cursedTimer - 1, 0);

      if (this.cursedTimer <= 0 && this.timer == true) {
        this.timer = false;
        this.cursed = false;
        user.secretEnding = true;
        this.sprite = this.monsterSprite;
      }
    }


    // Acceleration and terminal velocity
    if (this.targetX > this.x) {
      this.vx += this.acceleration;
    } else if (this.targetX < this.x) {
      this.vx -= this.acceleration;
    } else if (cursed){
        this.vx = 0;
    }
    if (this.targetY > this.y) {
      this.vy += this.acceleration;
    } else if (this.targetY < this.y) {
      this.vy -= this.acceleration;
    } else if (cursed) {
        this.vy = 0;
    }

    this.vx = constrain(this.vx, -this.terminalVelocity, this.terminalVelocity);
    this.vy = constrain(this.vy, -this.terminalVelocity, this.terminalVelocity);

    // Moves the circles
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
