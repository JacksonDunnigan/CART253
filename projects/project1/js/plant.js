// Defines the plant class
class Plant {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.startX = x;
    this.startY = y;
    this.size = size;
    this.growth = floor(random(0,2));
    this.maxGrowth = 4;
    this.minTimer = 500;
    this.maxTimer = 750;
    this.minWaterTimer = 350;
    this.maxWaterTimer = 900;
    this.maxWarningTimer = 750;
    this.warningTimer = 0;
    this.warning = false;
    this.timer = floor(random(this.minTimer/2, this.maxTimer));
    this.waterTimer = floor(random(this.minWaterTimer, this.maxWaterTimer));
    this.harvestable = false;
    this.needsWater = false;
    this.colliding = false;
    this.morphed = false;
    this.sprite = corn;


    // Physics
    this.xVelocity = 0;
    this.direction = 1;
    this.terminalXVelocity = 2;
  }

  // Moving logic
  move() {
    if (this.morphed == false) {
      if (this.harvestable == false) {
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
        }
      }

      // Harvest timer
      if (this.growth == 4 && this.harvestable == false) {
        this.warningTimer = this.maxWarningTimer;
        this.harvestable = true;
      }

      // Warning timer
      if (this.warningTimer > 0) {
        this.warningTimer -= 1;
      } if (this.warningTimer == 1 && (this.needsWater == true || this.harvestable == true)) {
        this.morphed = true;
        this.direction = random([-1, 1]);
        console.log(this.direction);
        //this.direction = 1;//int(random(directions));
      }

      // Player collision
      if (dist(this.x, this.y, player.x, player.y) <= this.size * 2 && dist(this.x, this.y + this.size, mouseX, mouseY) <= this.size * 2) {
        this.colliding = true;

        // Watering
        if (player.clicked == true && player.currentObject == 2 && this.needsWater == true) {
          player.clicked = false;
          this.needsWater = false;
          this.waterTimer = floor(random(this.minWaterTimer, this.maxWaterTimer));
          this.warning = false;
        }

        // Harvesting
        if (player.clicked == true && player.currentObject == 1 && this.harvestable == true) {
          player.clicked = false;
          this.harvestable = false;
          this.growth = 0;
          player.score += 1;
          this.waterTimer = floor(random(this.minWaterTimer, this.maxWaterTimer));
          this.timer = floor(random(this.minTimer, this.maxTimer));
          this.warning = false;
        }
      }
    } else if (this.morphed == true) {

        // Movement
        if (this.x + this.xVelocity >= width - this.size) {
          this.direction = -1;
        } else if (this.x + this.xVelocity <= this.size) {
          this.direction = 1;
        }
        this.xVelocity = this.terminalXVelocity * this.direction;
        this.x += this.xVelocity;

    }
  }
  // Draws the plant and alerts
  display() {

    // Draws sprites
    if (this.morphed == false) {

      image(this.sprite, this.x, this.y, this.size, this.size * 2 , this.growth * 32, 0, 32, 64);
      // Draws warnings and progress bars
      if (this.needsWater == true || this.harvestable == true) {
        push();

        if (this.needsWater == true) {
          image(waterAlert, this.x, this.y - 24 - (16 * (this.growth)), harvestAlert.width * 1.5, harvestAlert.height * 1.5);
        }
        if (this.harvestable == true) {
          image(harvestAlert, this.x, this.y - 24 - (16 * (this.growth)), harvestAlert.width * 1.5, harvestAlert.height * 1.5);
        }

        //picks color
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
          rect(this.x, this.y  - 8 - (16 * (this.growth - 3)), this.size * (this.warningTimer / this.maxWarningTimer), 8, 3);
        }
        pop();
      }
    }

    // Draws the morphed sprites
    if (this.morphed == true) {
      this.growth = 5;

      // Draws sprite and reflects it when needed
      if (this.xVelocity < 0) {
        push();
        scale(-1, 1);
        image(this.sprite, -this.x, this.y, this.size, this.size * 2 , this.growth * 32, 0, 32, 64);
        pop();
      } else if (this.xVelocity >= 0) {
        image(this.sprite, this.x, this.y, this.size, this.size * 2 , this.growth * 32, 0, 32, 64);
      }
    }
  }
}
