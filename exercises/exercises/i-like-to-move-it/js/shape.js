// Defines a shape class
class Shape {
  constructor() {
    this.size = 75;
    this.x = random(this.size, width - this.size);
    this.y = random(this.size, height * 0.5);
    this.terminalXVelocity = 10;
    this.terminalYVelocity = 12;
    this.xVelocity = random(-this.terminalXVelocity ,this.terminalXVelocity );
    this.yVelocity = 0;
    this.acceleration = 0.25;
    this.r = random(255);
    this.g = random(255);
    this.b = random(255);
  }

  // Moving logic
  move() {

    // Gravity
    if (this.y + this.size + this.yVelocity < height && this.y + this.yVelocity > 0) {
      this.yVelocity += this.acceleration;
    }

    // Side collision
    if (this.y + this.size + this.yVelocity >= height || this.y <= 0 ) {
      this.yVelocity *= -.99;
    }
    if (this.x + this.size + this.xVelocity >= width || this.x <= 0 ) {
      this.xVelocity *= -1;
    }

    // Moving
    if (abs(this.xVelocity) >= this.terminalXVelocity) {
      this.xVelocity = (this.xVelocity / abs(this.xVelocity)) * this.terminalXVelocity;
    }

    if (abs(this.yVelocity) >= this.terminalYVelocity) {
      this.yVelocity = (this.yVelocity / abs(this.yVelocity)) * this.terminalYVelocity;
    }

    // Changes position
    this.x += this.xVelocity;
    this.y += this.yVelocity;

    // Constrain
    this.x = constrain(this.x, 0, width - this.size);
    this.y = constrain(this.y, 0, height - this.size);
  }

  // Holding logic
  mouseCheck() {
    if ((mouseX >= this.x - this.size / 2)
    && (mouseX <= this.x + this.size * 1.5)
    && (mouseY >= this.y - this.size / 2)
    && (mouseY <= this.y + this.size * 1.5)) {

      this.xVelocity = (mouseX - (this.x + this.size / 2)) / abs(mouseX - (this.x + this.size / 2)) * this.terminalXVelocity;//random(-this.terminalXVelocity / 2, this.terminalXVelocity / 2);
      this.yVelocity = (mouseY - (this.y + this.size / 2)) / abs(mouseY - (this.y + this.size / 2)) * this.terminalYVelocity;//-random(this.terminalYVelocity);

    }
  }

  // Draws the shape
  display() {

      fill(this.r, this.g, this.b);
      let x1 = map(this.x, 0, width, width * 0.25, width * 0.75);
      let y1 = map(this.y, 0, height, height * 0.25, height * 0.75);
      //rect(x1, y1, this.size / 2, this.size / 2);
      rect(this.x, this.y, this.size, this.size);
    }
}
