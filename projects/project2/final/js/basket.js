
// Class for the basket object
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
    this.inventoryColliding = false;
    this.currentSelection = 0;
    soundClick.volume(0.3);
  }

  // Updates the book
  move() {

    // Interacting with the open menu
    if (this.open) {
      if (mouseX >= width / 8 && mouseX <= width * .825 + this.width &&
        mouseY >= height / 8 && mouseY <= height * .9) {

        // Interact with items in the inventory
        var x = 0;
        var y = 0;
        for (var i = 0; i < player.inventory.length; i++) {
          if (i % 6 == 0) {
            x = 0;
            y += 1;
          } else {
            x += 1;
          }
          if (player.inventory[i] != null) {
            var currentMushroom = player.inventory[i];
            if (mouseX >= width * 0.275 + x * tileFinalSize * 1.51 && mouseX <= width * 0.275 + x * tileFinalSize * 1.51 + currentMushroom.spriteSize * 2
            && mouseY >= height * .115 + y * tileFinalSize * 1.57 && mouseY <= height * .115 + y * tileFinalSize * 1.57 + currentMushroom.spriteSize * 2) {
              this.currentSelection = i;

              if (this.inventoryColliding == false) {
                this.inventoryColliding = true;
                soundClick.play();
              }
            }
          }
        }

        // Hovering and sound logic
        x = 0;
        y = 0;
        var isColliding = false
        for (var i = 0; i < player.inventory.length; i++) {
          if (i % 6 == 0) {
            x = 0;
            y += 1;
          } else {
            x += 1;
          }

          if (player.inventory[i] != null) {
            if (mouseX >= width * 0.275 + x * tileFinalSize * 1.51 && mouseX <= width * 0.275 + x * tileFinalSize * 1.51 + currentMushroom.spriteSize * 2
            && mouseY >= height * .115 + y * tileFinalSize * 1.57 && mouseY <= height * .115 + y * tileFinalSize * 1.57 + currentMushroom.spriteSize * 2) {
                isColliding = true;
              }
            }
          }
        this.inventoryColliding = isColliding;

      // Closing the inventory
      } else {

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
      if (this.mousePressed == true && book.open == false) {
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
    text('1', width * .835, height-20);

    // Hover box
    if (this.hover == true) {
      push();
      fill(255, 255, 255, 50);
      stroke(255);
      strokeWeight(3);
      rect(this.x - this.sprite.width * (tileScale + 4.25) - 3, this.y - 5, this.sprite.width*4 + 6, this.height + 12, 8);
      pop();
    }

    // Draws the open basket
    if (this.open == true) {
      push();
      stroke(28, 19, 24);
      strokeWeight(4);
      fill(187, 164, 148);
      rect(width * .15 , height / 8 - 16, width * .725, height * .75 , 128);
      stroke(122, 109, 100);
      fill(59, 30, 32);
      rect(width * .175 , height *.14, width * .675, height * .675 , 96);
      strokeWeight(0);
      fill(50, 21, 23);
      rect(width * .2 , height *.175, width * .625, height * .6 , 80);
      textSize(40);
      fill(255);
      text('Inventory', width/2, height*.05);
      pop();


      // Draws the inventory
      var x = 0
      var y = 0

      // Draws inventory slots
      for (var i = 0; i < player.inventorySize; i++) {
        if (i % 6 == 0) {
          x = 0;
          y += 1;
        } else {
          x += 1;
        }
        push();
        fill(59, 30, 32);
        strokeWeight(0);

        rect(width * 0.275 + x * tileFinalSize*1.5, height * .115 + y * tileFinalSize*1.53, tileFinalSize*1.25, tileFinalSize*1.25, 8);
        pop();
      }
      x = 0
      y = 0

      // Draws the mushrooms
      for (var i = 0; i < player.inventory.length; i++) {
        var currentMushroom = player.inventory[i];

        // Draws mushrooms in rows
        if (i % 6 == 0) {
          x = 0;
          y += 1;
        } else {
          x += 1;
        }

        image(currentMushroom.sprite, width * 0.275 + x * tileFinalSize*1.51, height * .115 + y * tileFinalSize*1.57, currentMushroom.spriteSize * 2, currentMushroom.spriteSize * 2, currentMushroom.xIndex, currentMushroom.yIndex, 8, 8);
      }

      x = 0;
      y = 0;

      // Highlights inventory items
      for (var i = 0; i < player.inventory.length; i++) {

        if (i % 6 == 0) {
          x = 0;
          y += 1;
        } else {
          x += 1;
        }

        // Identifying mushrooms in iventory
        if (i == this.currentSelection && this.inventoryColliding == true) {
          var currentMushroom = player.inventory[i];

          push();
          strokeWeight(2);
          stroke(122, 109, 100);

          fill(187, 164, 148);
          rect(width * 0.275 + x * tileFinalSize*1.5 + tileFinalSize*1.5 , height * .115 + y * tileFinalSize*1.53, tileFinalSize*3, tileFinalSize*4, 8);

          var currentFeatures = "\n";
          if (mushroomSpecies[currentMushroom.genus][currentMushroom.species+1].length >= 3) {
            for (var i = 4; i<mushroomSpecies[currentMushroom.genus][currentMushroom.species+1].length; i++){

              currentFeatures += "-" + mushroomSpecies[currentMushroom.genus][currentMushroom.species+1][i] + "\n";
            }
          }

          textAlign(LEFT, TOP);
          fill(20);
          noStroke();
          textSize(16);
          text(currentFeatures, width * 0.297 + x * tileFinalSize*1.5 + tileFinalSize*1.5 , height * .115 + y * tileFinalSize*1.53);

          strokeWeight(2);
          stroke(255);
          noFill();
          rect(width * 0.275 + x * tileFinalSize*1.5, height * .115 + y * tileFinalSize*1.53, tileFinalSize*1.25, tileFinalSize*1.25, 8);

          pop();
        }

      }
    }
  }
}
