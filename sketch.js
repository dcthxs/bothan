let x, y;
let step = 0;
let points = [];
let maxSteps = 1000;
let holdFrames = 30;
let holdCount = 0;
let smoothing = 0.02;

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
  background(0, 0);
}

function draw() {
  clear();
  stroke(255, 152, 17);
  strokeWeight(7);
  noFill();
  translate(width / 2, height / 2);

  if (step < maxSteps) {
    beginShape();
    for (let i = 0; i <= points.length; i++) {
      let idx = map(step, 0, maxSteps, 0, points.length);
      if (i > idx) break;
      let [currX, currY] = points[i % points.length];
      let [nextX, nextY] = points[(i + 1) % points.length];
      let x_interp = lerp(currX, nextX, step / maxSteps);
      let y_interp = lerp(currY, nextY, step / maxSteps);
      vertex(x_interp - x, y_interp - y);
    }
    endShape();
    step += smoothing * maxSteps;
  } else {
    beginShape();
    for (let i = 0; i < points.length; i++) {
      let [px, py] = points[i];
      vertex(px - x, py - y);
    }
    endShape();

    if (holdCount === 0) {
      // Pause for 5 seconds (5000 milliseconds)
      setTimeout(function() {
        step = 0;
        holdCount = 0;
      }, 5000);
    }
    holdCount++;
  }
}
