
// Class for the book object
class Basket {
  constructor() {
    // Drawing
    this.sprite = spriteBasket;
    this.x = width - (this.sprite.width/4 * tileScale * 2);
    this.y = height - (this.sprite.height * tileScale * 1.5);
    this.width = this.sprite.width/3 * tileScale;
    this.height = this.sprite.height * tileScale;

    // Ineractive
    this.open = false;
    this.hover = false;
    this.mousePressed = false;
    soundClick.volume(0.3);

    // Pages
    this.textColor = color(85, 76, 70);
    this.currentPage = 0;
    this.maxPage = 21;
    this.currentFamily = 0;
    this.currentGenus = 0;
    this.pageAmount = 10;
  }

  // Updates the book
  move() {

    // Interacting with the open menu
    if (this.open) {
      if (mouseX >= width / 8 && mouseX <= width * .825 + this.width &&
        mouseY >= height / 8 && mouseY <= height * .9) {

        // Goes to the next page
        if (mouseX >= width * .82 && mouseX <= width * .82 + spriteArrow.width * tileScale &&
            mouseY >= height * .8 && mouseY <= height * .8 + spriteArrow.height * tileScale &&
            this.currentPage < this.maxPage) {

          if (this.mousePressed) {
            this.mousePressed = false;
            soundClick.play();
            this.currentPage += 1;
            this.currentGenus += 1;

            if (this.currentGenus >= mushroomSpecies[this.currentFamily].length-1){
              this.currentFamily += 1;
              this.currentGenus = 0;
            }
          }
        }
        // Goes to the previous page
        if (mouseX >= width * .18 - spriteArrow.width * tileScale && mouseX <= width * .18 &&
            mouseY >= height * .8 && mouseY <= height * .8 + spriteArrow.height * tileScale &&
            this.currentPage > 0) {

            if (this.mousePressed) {
              this.mousePressed = false;
              soundClick.play();
              this.currentPage -= 1;
              this.currentGenus -= 1;

              if (this.currentGenus < 0){
                this.currentFamily -= 1;
                this.currentGenus = mushroomSpecies[this.currentFamily].length-2;
              }
            }
        }

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
    if (mouseX >= this.x - this.sprite.width * (tileScale + 4.25) && mouseX <= this.x - this.sprite.width * tileScale &&
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

  // Draws the basket on the screen
  display() {
    image(this.sprite, this.x - this.sprite.width * (tileScale + 4.25), this.y, this.sprite.width * tileScale, this.height);

    fill(255);
    textSize(28);
    text('1', width * .8275, height+4);

    // Hover box
    if (this.hover == true) {
      push();
      fill(255, 255, 255, 50);
      stroke(255);
      //noFill();
      strokeWeight(3);
      //noStroke();//mouseX >= this.x - this.sprite.width * (tileScale + 4.25) && mouseX <= this.x - this.sprite.width * tileScale
      rect(this.x - this.sprite.width * (tileScale + 4.25) - 3, this.y - 5, this.sprite.width*4 + 6, this.height + 12, 8);
      pop();
    }

    // Draws the open basket
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
