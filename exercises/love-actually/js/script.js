// Defines the circles
let user = {
  x: 150,
  y: 150,
  size: 100,
  vx: 0,
  vy: 0,
  speed: 3
};

let circle2 = {
  x: 0,
  y: 0,
  size: 100,
  vx: 0,
  vy: 0,
  acceleration: 0.25,
  terminalVelocity: 3,
  speed: 3
};

let state = `title`; // Can be: title, simulation, love, sadness

function setup() {
  createCanvas(500,500);
  setupCircles();
}

function setupCircles() {
  // Position circles separated from one another
  user.x = mouseX
  user.y = mouseY

  while(dist(user.x, user.y, circle2.x, circle2.y) <= width / 2) {
    console.log(circle2.x, circle2.y);
    circle2.x = user.x + random(-500, 500);
    circle2.y = user.y + random(-500, 500);
  }


}

function draw() {
  background(0);

  if (state === `title`) {
    title();
  }
  else if (state === `simulation`) {
    simulation();
  }
  else if (state === `love`) {
    love();
  }
  else if (state === `sadness`) {
    sadness();
  }
}

function title() {
  push();
  textSize(64);
  fill(200,100,100);
  textAlign(CENTER,CENTER);
  text(`LOVE?`,width/2,height/2);
  pop();
}

function simulation() {
  move();
  checkOffscreen();
  checkOverlap();
  display();
}

function love() {
  push();
  textSize(64);
  fill(255,150,150);
  textAlign(CENTER,CENTER);
  text(`LOVE!`,width/2,height/2);
  pop();
}

function sadness() {
  push();
  textSize(64);
  fill(150,150,255);
  textAlign(CENTER,CENTER);
  text(`:(`,width/2,height/2);
  pop();
}

function move() {

  // Acceleration and terminal velocity
  if (user.x > circle2.x + circle2.size / 2) {
    circle2.vx += circle2.acceleration;
  } else if (user.x < circle2.x - circle2.size / 2) {
    circle2.vx -= circle2.acceleration;
  }
  if (user.y > circle2.y + circle2.size / 2) {
    circle2.vy += circle2.acceleration;
  } else if (user.y < circle2.y - circle2.size / 2) {
    circle2.vy -= circle2.acceleration;
  }

  circle2.vx = constrain(circle2.vx, -circle2.terminalVelocity, circle2.terminalVelocity);
  circle2.vy = constrain(circle2.vy, -circle2.terminalVelocity, circle2.terminalVelocity);

  // Moves the circles
  user.x = mouseX;//+= circle1.vx;
  user.y = mouseY;//+= circle1.vy;
  circle2.x += circle2.vx;
  circle2.y += circle2.vy;
}

// Check if the circles have gone offscreen
function checkOffscreen() {
  if (isOffscreen(user)) {
    state = `sadness`;
  }
}

function isOffscreen(circle) {
  if (circle.x < 0 || circle.x > width || circle.y < 0 || circle.y > height) {
    return true;
  }
  else {
    return false;
  }
}

function checkOverlap() {
  // Check if the circles overlap
  let d = dist(user.x,user.y,circle2.x,circle2.y);
  if (d < user.size/2 + circle2.size/2) {
    state = `love`;
  }
}

function display() {
  // Display the circles
  ellipse(user.x, user.y, user.size);
  ellipse(circle2.x,circle2.y,circle2.size);
}

// Controling game states
function mousePressed() {
  if (state === `title`) {
    state = `simulation`;
  } else if (state == `sadness` || state == `love`) {
    state = `title`;
    setup();
  }
}
