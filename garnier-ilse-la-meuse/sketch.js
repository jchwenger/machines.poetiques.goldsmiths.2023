// --------------------------------------------------------------------------------
// Ilse Garnier, *La Meuse*. Paris : André Silvaire, 1991.
//
// Jérémie Wenger, 2023
// In the context of *Machines poétiques*: exploring textual systems through
// experimental French poetry, with Iris Colomb, Goldsmiths College
// --------------------------------------------------------------------------------

// a very interesting article (in French, unfortunately) with many a beautiful
// and inspirational example of visual poetry
// https://journals.openedition.org/interfaces/2009?lang=en

let word;

let waveHalfWidth;
let nSteps;
let verticalOffset;
let waveHeight;
let waveStep;

function setup() {
  createCanvas(700, 500);

  word = 'flotter';

  waveHalfWidth = 4;
  nSteps = 14;
  verticalOffset = height/2;
  waveHeight = 100;
  waveStep = (waveHalfWidth * 2)/nSteps;

  textFont('Courier');
  textSize(10);
  fill(255);
}

function draw() {
  background(137, 155, 167);
  // fill(0);
  // line(0, height/2, width, height/2);
  // line(width/2, 0, width/2, height);
  push();
  noFill();
  let x, y;
  let invertSigmoid;
  for (let i = -waveHalfWidth; i < waveHalfWidth; i+=waveStep) {
    // x = map(i, -waveHalfWidth, waveHalfWidth, 20, width - 150);
    // y = - gaussian(i) * 200 + verticalOffset;
    // x = sigmoid(i);
    // x = map(x, 1, 0, 20, width - 150);
    x = map(i, -waveHalfWidth, waveHalfWidth, 20, width - 150);
    invertSigmoid = 1-sigmoid(i, 2); // flip the sigmoid: 0 goes to 1, 1 to 0
    y = map(invertSigmoid, 0, 1, verticalOffset, verticalOffset + waveHeight);
    // if (frameCount % 1000 === 0) {
    //  console.log(`x: ${x}, sigmoid(x): ${sigmoid(x)}, y: ${y}`);
    // }
    // text(word, x, y);
    // stroke(0);
    // ellipse(x, y, 5);
    // text(word, x, y);

    const eps = 0.001;
    const iMapped = map(i, -waveHalfWidth, waveHalfWidth, eps, 1 - eps);
    const al = 2.6;
    x = map(logistic(iMapped, al), logistic(eps), logistic(1-eps), 20, width - 150);
    // stroke(255,0,0);
    // ellipse(x, y, 5);
    fill(0);
    text(word, x, y);
  }
  pop();
}

function sigmoid(x, alpha = 1) {
  return 1 / (1 + Math.exp(alpha * x));
}

function logistic(x, alpha = 1) {
  return alpha * Math.log(x/(1 - x))
}

function gaussian(x, mu=0, sigma=1) {
  return (1/(sigma*Math.sqrt(2*PI))) * Math.exp(-1/2 * (x - mu) ** 2 / sigma ** 2)
}
