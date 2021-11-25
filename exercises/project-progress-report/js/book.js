
// Class for the book object
class Book {
  constructor() {

    this.sprite = spriteBook;
    this.x = width - (this.sprite.width/4 * tileScale * 2);
    this.y = height - (this.sprite.height * tileScale * 1.5);
    this.width = this.sprite.width/3 * tileScale;
    this.height = this.sprite.height * tileScale;
    this.open = false;
    this.hover = false;
    this.mousePressed = false;
    soundClick.volume(0.3);
  }

  // Updates the book
  move() {

    // Interacting with the open menu
    if (this.open) {
      if (mouseX >= width / 8 && mouseX <= width * .825 + this.width &&
        mouseY >= height / 8 && mouseY <= height * .9) {

      } else {

        // Closes the menu if you click away
        if (this.mousePressed) {
          soundClick.play();
          this.hover = false;
          this.open = false;
        }
      }
    }


    // Opens the book
    if (mouseX >= this.x && mouseX <= this.x + this.width &&
      mouseY >= this.y && mouseY <= this.y + this.height) {

      // Highlights the book when the mouse hovers
      if (this.hover == false) {
        soundClick.play();
      }
      this.hover = true;
      if (this.mousePressed == true) {
        this.open = true;
      }

    } else {
      this.hover = false;
    }
  }

  // Draws the book on the screen
  display() {
    image(spriteBook, this.x, this.y, this.width, this.height, 0, 0, this.sprite.width / 3, this.sprite.height);
    fill(255);
    textSize(48);
    text('e', width*.923, height*.99);

    // Hover box
    if (this.hover == true) {
      push();
      fill(255, 255, 255, 50);
      noStroke();
      rect(this.x, this.y, this.width, this.height);
      pop();
    }

    // Draws the open book
    if (this.open == true) {
      push();
      stroke(28, 19, 24);
      strokeWeight(4);
      fill(59, 30, 32);
      rect(width / 8 - 32, height / 8 - 16, width * .75 + 64, height * .75 + 32, 8);
      stroke(122, 109, 100);
      fill(187, 164, 148);
      rect(width / 8, height/ 8, width * .75, height * .75);

      line(width / 2, height / 8, width / 2, height * .875 );
      pop();
    }
  }
}
