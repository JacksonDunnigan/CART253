class Paddle {

  constructor(w,h) {
    this.width = w;
    this.height = h;
    this.x = 0;
    this.y = height - this.height/2;
  }

  move() {

    // Keyboard input
    // if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
    //   this.x += 10;
    // } else if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
    //   this.x -= 10;
    // }

    // Changes position
    this.x = mouseX;
    //this.x = constrain(this.x, this.width/2, width - this.width/2);
  }

  display() {
    push();
    fill(255);
    noStroke();
    rectMode(CENTER);
    rect(this.x,this.y,this.width,this.height);
    pop();
  }

}
