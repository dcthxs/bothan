let x, y;
let step = 0;
let points = [];
let maxSteps = 1000; // Increased maxSteps for faster animation
let holdFrames = 30; // Reduced holdFrames for shorter hold time
let holdCount = 0;
let smoothing = 0.03; // Adjust the smoothing factor for smoother animation

function setup() {
  createCanvas(200, 200);
  x = width / 2;
  y = height / 2;
  points = [
    [x, y - 50],
    [x - 40, y],
    [x - 40, y + 50],
    [x + 40, y + 50],
    [x + 40, y],
    [x, y - 50]
  ];
  
  // Draw the transparent background only once in setup
  background(0, 0); // Transparent background
}

function draw() {
  // Clear the canvas at the beginning of each frame
  clear();
  
  stroke(255, 152, 17);
  strokeWeight(6);
  noFill();
  
  translate(width / 2, height / 2);

  if (step < maxSteps) {
    beginShape();
    for (let i = 0; i <= points.length; i++) {
      let idx = map(step, 0, maxSteps, 0, points.length);
      if (i > idx) break;
      let curr = points[i % points.length];
      let next = points[(i + 1) % points.length];
      let x_interp = lerp(curr[0], next[0], step / maxSteps); // Interpolating x-coordinate
      let y_interp = lerp(curr[1], next[1], step / maxSteps); // Interpolating y-coordinate
      vertex(x_interp - x, y_interp - y);
    }
    endShape();
    step += smoothing * maxSteps; // Increased step for faster animation with smoothing
  } else {
    beginShape();
    for (let i = 0; i < points.length; i++) {
      vertex(points[i][0] - x, points[i][1] - y);
    }
    endShape();
    
    holdCount++;
    if (holdCount >= holdFrames) {
      step = 0; // Reset step to start the animation loop
      holdCount = 0;
    }
  }
}
