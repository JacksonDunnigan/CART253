/**
Mona Lisa
Jackson Dunnigan

A program to recreate the majesty of the Mona Lisa and her enigmatic smile
*/

"use strict";


/**
Description of preload
*/
function preload() {

}


/**
Description of setup
*/
function setup() {
  createCanvas(400, 600);
  background(144, 209, 152);

  push();
  // Draw Mona's Hair
  noStroke();
  fill(50, 10, 10);
  ellipse(210, 180, 180, 240);

  // Draw Mona's Face
  fill(219, 195, 114);
  ellipse(200, 150, 110, 150);
  pop();

  // Draw Mona's Smile
  noFill();
  strokeWeight(4);
  stroke(255, 0, 0);
  arc(200, 50, 300, 300, 5.75 * PI / 4+ TWO_PI + PI, 6.25 * PI / 4 + PI, OPEN);

  // Draw Mona's eyes
  fill();
  ellipse(180,140,15,5);
  ellipse(220,140,15,5);

}


/**
Description of draw()
*/
function draw() {

}
