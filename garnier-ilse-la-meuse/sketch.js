// --------------------------------------------------------------------------------
// Ilse Garnier, *La Meuse*. Paris : André Silvaire, 1991.
//
// Jérémie Wenger, 2023
// With Iris Colomb, in the context of *Machines poétiques*: exploring textual
// systems through experimental French poetry, Goldsmiths College
// --------------------------------------------------------------------------------

// a very interesting article (in French, unfortunately) with many a beautiful
// and inspirational example of visual poetry
// https://journals.openedition.org/interfaces/2009?lang=en

// Ideas for further development:
// - first, one could get familiar with the different functions, and how they
//   work (beware, the last one has a bit of math in there, just skip that if
//   you are not interested);
// - the system to switch between the different function is more here for the
//   purpose of the demo, and doesn't necessarily need to be there;
// - second, it might be interesting to try and incorporate some animation,
//   perhaps importing some ideas from `garnier-ilse-poeme-cinematographique`?
// - note on efficiency: this sketch does a lot of useless calculations as it
//   recomputes the positions every time the functions are called: one could
//   imagine instead writing the same functionality but with classes, so
//   turning the slope into an object that does the calculation once when
//   instantiated, and then only loops through the array of positions to draw
//   the text

let word;

let slopeIndex;
let slopeFunctions;

function setup() {
  createCanvas(850, 450);

  fill(255);
  textSize(13);
  textFont('Courier');

  word = 'flotter';

  slopeIndex = 0;
  slopeFunctions = [slope1, slope2, slope3];
}

function draw() {
  background(137, 155, 167);

  // helperGrid();

  // using a switch here would allow for different arguments to be passed to the various fuctions
  switch (slopeIndex) {
    case 0:
      slopeFunctions[slopeIndex](word);
      break;
    case 1:
      slopeFunctions[slopeIndex](word);
      break;
    case 2:
      slopeFunctions[slopeIndex](word);
      break;
  }

}

// helpers
function helperGrid() {
  push();
  stroke(255);
  line(0, height/2, width, height/2);
  line(width/2, 0, width/2, height);
  pop();
}

function slope1(
  word,
  startX = 10,
  startY = height/2 - 30,
  endX = width - 70,
  nRepetitions = 14,
  slopeHeight = 140,
  startSlopeX= width/3,
  endSlopeX= width*2/3,
) {

  push();

  // //helpers
  //stroke(0);
  //line(startX, startY, startSlopeX, startY);
  //line(startSlopeX, startY, endSlopeX, startY + slopeHeight);
  //line(endSlopeX, startY + slopeHeight, endX, startY + slopeHeight);

  let x = startX;
  let y = startY;
  let intervalX = (endX - startX)/nRepetitions;
  let leftI = 0;
  while (leftI * intervalX < startSlopeX - intervalX) {
    leftI++;
  }
  let rightI = nRepetitions;
  while (rightI * intervalX > endSlopeX) {
    rightI--;
  }
  let intervalY = (slopeHeight)/(rightI - leftI);
  // console.log(`endX - startX: ${endX - startX} | intervalX: ${intervalX} | leftI: ${leftI} | rightI: ${rightI} | intervalY: ${intervalY}`);

  // // helpers
  // stroke(255);
  // line(leftI * intervalX, startY - 10, leftI * intervalX, startY + 10)
  // line(rightI * intervalX, startY + slopeHeight - 10, rightI * intervalX, startY + slopeHeight + 10)

  noStroke();
  fill(0);
  for (let i = 0; i < nRepetitions; i++) {
    x = i * intervalX;
    if (x < startSlopeX) {       // before the slope
      y = startY;
    } else if (x > endSlopeX) {  // after the slope
      y = startY + slopeHeight;
    } else {                     // during the slope: we use the x position and map it!
      y = map(x, leftI * intervalX, rightI * intervalX, startY, startY + slopeHeight);
    }
    text(word, startX + x, y);
  }

  pop();

}

function slope2(
  word,
  startX = 10,
  startY = height/2 - 30,
  endX = width - 70,
  nRepetitions = 14,
  waveHeight = 140,
  slopeFactor = 1, // TODO: tweaking this will affect how steep the sigmoid slope is
  slopeOffset = 0, // TODO: tweaking this will shift where the slope occurs (horizontally)
) {

  push();

  // // helpers
  // stroke(255);
  // line(startX, startY - textAscent(), endX, startY - textAscent());
  // line(startX, startY + waveHeight + textDescent(), endX, startY + waveHeight + textDescent());

  fill(0);
  noStroke();
  textAlign(LEFT);

  let x, y;
  let invertSigmoid;
  const halfRepetitions = Math.floor(nRepetitions/2);

  for (let i = -halfRepetitions; i < halfRepetitions; i++) {

    // if we repeat the word evenly horizontally, a simple map will do
    x = map(i, -halfRepetitions, halfRepetitions - 1, startX, endX - textWidth(word));

    // we use the sigmoid to compute the vertical position along the wave
    invertSigmoid = 1 - sigmoid(i + slopeOffset, slopeFactor); // flip the sigmoid: 0 goes to 1, 1 to 0
    // invertSigmoid = sigmoid(i);                             // TODO: try the reversed version
    y = map(invertSigmoid, 0, 1, startY, startY + waveHeight);

    text(word, x, y);
  }
  pop();
}

function slope3(
  word,
  startX = 10,
  startY = height/2 - 30,
  endX = width - 70,
  nRepetitions = 14,
  waveHeight = 140,
  slopeFactor = .5,  // TODO: tweaking this will affect how steep the sigmoid slope is
  slopeOffset = 0,   // TODO: tweaking this will shift where the slope occurs (horizontally)
  eps = .6,          // TODO: tweaking this factor will change how the repetitions are spread or concentrated
) {

  push();

  // // helpers
  // stroke(255);
  // line(startX, startY - textAscent(), endX, startY - textAscent());
  // line(startX, startY + waveHeight + textDescent(), endX, startY + waveHeight + textDescent());

  fill(0);
  noStroke();
  textAlign(LEFT);

  let x, y;
  let iTan;
  let invertSigmoid;
  const halfRepetitions = Math.floor(nRepetitions/2);

  const minusHPIeps = -HALF_PI + eps;
  const HPIminusEps = HALF_PI - eps;
  const tanLeftLimit = Math.tan(minusHPIeps);
  const tanRightLimit = Math.tan(HPIminusEps);

  for (let i = -halfRepetitions; i < halfRepetitions; i++) {

    // in this case, we want to huddle the words in the middle, so that there
    // are more of them in the middle of the slope rather than in the
    // extremities – how do we do that? What we want is something like
    // interpolation, but a nonlinear version of it: I thought I could use the
    // tangent function which is shaped like a sigmoid and flipped vertically: (see:
    // https://mathbooks.unl.edu/PreCalculus/images/imagesChap13/tangentgraph.png),
    //
    // - first, we map the i of our loop to be in the range ]-PI/2,PI/2[;
    // - then, we use the built-in Math.tan and map it again to the full width
    //   (this will have the effect of pushing the words more towards the
    //   middle of the interval, a bit like an ease-in and -out in animation)
    iTan = map(i, -halfRepetitions, halfRepetitions - 1, minusHPIeps, HPIminusEps);
    x = map(Math.tan(iTan), tanLeftLimit, tanRightLimit, startX, endX - textWidth(word));

    // we use the sigmoid to compute the vertical position along the wave
    invertSigmoid = 1 - sigmoid(i + slopeOffset, slopeFactor); // flip the sigmoid: 0 goes to 1, 1 to 0
    // invertSigmoid = sigmoid(i);                             // TODO: try the reversed version
    y = map(invertSigmoid, 0, 1, startY, startY + waveHeight);

    text(word, x, y);
  }
  pop();
}

// --------------------------------------------------------------------------------
// interaction

// using arrow keys or numbers to switch between functions
function keyPressed() {
  switch (key) {
    case '1':
      slopeIndex = 0;
      return;
    case '2':
      slopeIndex = 1;
      return;
    case '3':
      slopeIndex = 2;
      return;
    case ' ':
      slopeIndex = mod(slopeIndex + 1, slopeFunctions.length);
      return;
  }

  switch (keyCode) {
    case UP_ARROW:
      slopeIndex = mod(slopeIndex - 1, slopeFunctions.length);
      return;
    case LEFT_ARROW:
      slopeIndex = mod(slopeIndex - 1, slopeFunctions.length);
      return;
    case DOWN_ARROW:
      slopeIndex = mod(slopeIndex + 1, slopeFunctions.length);
      return;
    case RIGHT_ARROW:
      slopeIndex = mod(slopeIndex + 1, slopeFunctions.length);
      return;
  }
}

// --------------------------------------------------------------------------------
// math utils

// fix for the modulo (%) annoyance with negative numbers
// from: https://stackoverflow.com/a/17323608
function mod(n, m) {
  return ((n % m) + m) % m;
}

function logistic(x, alpha = 1) {
  return alpha * Math.log(x/(1 - x))
}

function sigmoid(x, alpha = 1) {
  return 1 / (1 + Math.exp(alpha * x));
}
