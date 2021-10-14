// Defines the plant class
class Plant {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.growth = floor(random(0,2));
    this.maxGrowth = 4;
    this.minTimer = 600;
    this.maxTimer = 900;
    this.minWaterTimer = 300;
    this.maxWaterTimer = 1800;
    this.maxWarningTimer = 750;
    this.warningTimer = 0;
    this.timer = floor(random(this.minTimer, this.maxTimer));
    this.waterTimer = floor(random(this.minWaterTimer, this.maxWaterTimer));
    this.needsWater = false;
    this.colliding = false;
    this.sprite = corn;

  }

  // Moving logic
  move() {

    // Grow timer
    if (this.needsWater == false) {
      if (this.timer > 0) {
        this.timer -= 1;
      } else if (this.timer == 0) {
        this.growth = min(this.growth + 1, this.maxGrowth);
        this.timer = floor(random(this.minTimer, this.maxTimer));
      }
    }


    // Watering timer
    if (this.waterTimer > 0) {
      this.waterTimer -= 1;
    } else if (this.waterTimer == 0) {
      if (this.needsWater == false) {
        this.needsWater = true;
        this.warningTimer = this.maxWarningTimer;
      }
      this.waterTimer = floor(random(this.minTimer, this.maxTimer));
    }

    // Warning timer
    if (this.warningTimer > 0) {
      this.warningTimer -= 1;
    } else if (this.waterTimer <= 0) {
      this.needsWater = false;
    }


    // Player collision
    if (this.needsWater == true) {
      if (dist(this.x, this.y, player.x, player.y) <= this.size && dist(this.x, this.y + this.size, mouseX, mouseY) <= this.size) {
        this.colliding = true;
        if (mouseIsPressed === true) {
          this.needsWater = false;
          this.waterTimer = floor(random(this.minWaterTimer, this.maxWaterTimer));
        }
      }
    }
  }

  // Draws the plant and alerts
  display() {

    // Draws sprites
    image(this.sprite, this.x, this.y, this.size, this.size * 2 , this.growth * 32, 0, 32, 64);

    //Draws warnings and progress bars
    if (this.needsWater == true) {
      image(waterAlert, this.x, this.y - 52, waterAlert.width * 1.5, waterAlert.height * 1.5);

      //picks color
      push();
      var c;
      var timerPercent = this.warningTimer / this.maxWarningTimer;
      if (timerPercent > 0.6) {
         c = color(119, 198, 110);
      } else if (timerPercent > 0.3) {
         c = color(252, 247, 135);
      } else if (timerPercent <= 0.3) {
         c = color(197, 66, 69);
      }

      // Draws the progress bar
      fill(c);
      if (timerPercent > 0.05){
        rect(this.x, this.y +12, this.size * (this.warningTimer / this.maxWarningTimer), 8, 3);
      }
      pop();
    }
  }
}
