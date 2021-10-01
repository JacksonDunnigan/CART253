

"use strict";

// Declares the objects
let rectangles = [];
let shapeAmount = 5;

// Sets up the canvas
function setup() {
  createCanvas(500,500);

  // Creates the objects
  for (let i = 0; i < shapeAmount; i++) {
      rectangles.push(new Shape());
    }
}

// Checks if the user clicks the mouse
function mouseClicked() {
  for (let i = 0; i < rectangles.length; i++) {
    rectangles[i].mouseCheck();
  }
}

// Draws every element
function draw() {
  frameRate(60);
  background(255);
  
  // Updates and draws objects
  for (let i = 0; i < rectangles.length; i++) {
    rectangles[i].move();
    rectangles[i].display();
  }
}
