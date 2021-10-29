
class Enemy {

  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.ax = 0;
    this.ay = 0;
    this.maxSpeed = 10;
    this.size = 40;
    this.active = true;
  }

  gravity(force) {
    this.ay += + force;
  }

  move() {
    this.vx += this.ax;
    this.vy += this.ay;

    this.vx = constrain(this.vx, -this.maxSpeed, this.maxSpeed);
    this.vy = constrain(this.vy, -this.maxSpeed, this.maxSpeed);

    if (this.x + this.vx >= width || this.x + this.vx <= 0) {
      this.vx *= -1;
    }


    this.x += this.vx;
    this.y += this.vy;


  }

  bounce(paddle) {
    if (this.x + this.vx > paddle.x - paddle.width/2 &&
        this.x + this.vx < paddle.x + paddle.width/2 &&
        this.y + this.vy + this.size/2 > paddle.y - paddle.height/2 &&
        this.y + this.vy - this.size/2 < paddle.y + paddle.height/2) {

      // Bounce
      currentBalls -= 1;
      lives -= 1;
      this.active = false;
    }
  }

  display() {
    push();
    fill(255,50,50);
    stroke(0);
    image(bomb, this.x, this.y, 100, 100);
    pop();
  }

}
