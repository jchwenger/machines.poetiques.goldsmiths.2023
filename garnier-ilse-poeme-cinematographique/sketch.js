// --------------------------------------------------------------------------------
// Computational implementation of some aspects of
// *Poème cinématographique*, based on a scenario by Ilse Garnier
// Animation and montage: Albert Coma and Meritxell Martínez
// https://vimeo.com/183284925
//
// Jérémie Wenger, 2023
// With Iris Colomb, in the context of *Machines poétiques*: exploring textual
// systems through experimental French poetry, Goldsmiths College
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------
// draw text along a sine wave
// ---------------------------
// original inspiration by xinxin:
// - https://editor.p5js.org/xinxin/sketches/okGMvmxM
// - https://p5js.org/examples/math-sine-wave.html
// and GPT-4!

let xSpacing;   // distance between each horizontal location
let w;          // width of entire wave
let theta;      // start angle at 0
// let amplitude;  // height of wave
let period;     // how many pixels before the wave repeats
let dx;         // value for incrementing x
let yvalues;    // using an array to store height values for the wave
let waveOffset;
let waveSpeed;

let sentence;
let sentenceArray;
let repeatedSentenceArray;
// --------------------------------------------------------------------------------

let leCircle;
// --------------------------------------------------------------------------------

function setup() {
  createCanvas(710, 400);
  setupWave();
  textSize(24);

  leCircle = new blackedOutTextCircle('terre ');
}

function draw() {
  background(0);

  // helper lines
  push();
  stroke(255);
  line(width/2,0, width/2, height);
  line(0,height/2, width, height/2);
  pop();

  // renderWave(30, width/3, height/4, width - 30, period);
  // renderWave(sentence, 30, width/3, 155, height/4);
  // waveOffset -= 0.001;


  leCircle.draw(width/2, height/2, true);
}

function renderWave(x, y, amplitude, waveWidth, period) {
  push();
  let frequency = TWO_PI / period;
  let totalStrWidth = sentence.length * xSpacing;
  let xOffset = (frameCount * waveSpeed) % totalStrWidth;
  // console.log(xOffset, frameCount, waveWidth)

  textFont('Georgia');
  noStroke();
  fill(255);

  let xPos, yPos;
  for (let i = 0; i * xSpacing - xOffset <= waveWidth; i++) {
    xPos = x + (i * xSpacing) - xOffset;
    yPos = y + amplitude * sin(frequency * xPos);
    if (xPos >= x && xPos <= x + waveWidth) {
      text(sentence[i % sentence.length], xPos, yPos);
    }
  }
  pop();
}


function setupWave() {
  xSpacing = 20;
  // theta = 0.0;
  // amplitude = 75.0;
  period = 300;
  // w = width + 16;
  // dx = (TWO_PI / period) * xSpacing;
  // yvalues = new Array(floor(w / xSpacing));
  // waveOffset = 0;

  waveSpeed = .3;
  sentence = 'terre ';
  // sentenceArray = sentence.split("");

}

// function renderWave(sentence, x, y, waveWidth, amplitude=75) {
//   /*
//   * amplitude: height of wave
//   */

//   push();
//   textAlign(CENTER, CENTER);

//   // helper lines
//   stroke(255);
//   line(x,y - amplitude, x + waveWidth, y - amplitude);
//   line(x,y + amplitude, x + waveWidth, y + amplitude);

//   // Increment theta (try different values for
//   // 'angular velocity' here)
//   // theta += 0.02;

//   // // For every x value, calculate a y value with sine function
//   // let x = theta;
//   // for (let i = 0; i < yvalues.length; i++) {
//   //   yvalues[i] = sin(x) * amplitude;
//   //   x += dx;
//   // }

//   const interval = Math.floor(xSpacing * dx);
//   const quotient = Math.floor(waveWidth/interval);
//   // const remainder = interval % waveWidth;
//   // console.log(xSpacing * dx, interval, quotient, remainder);
//   const maxTextLength = quotient;
//   // const repeatedSentenceArray = new Array(quotient);
//   // for (let i = 0; i < repeatedSentenceArray.length; i++) {
//   //   repeatedSentenceArray[i] = sentenceArray[i % (sentenceArray.length - 1)];
//   // }
//   // console.log(quotient, remainder);
//   // console.log(repeatedSentenceArray);
//   // console.log(sentenceArray.slice(0, remainder));

//   textFont('Georgia');
//   noStroke();
//   fill(255);

//   let xPos = waveOffset;
//   let yPos = sin(xPos) * amplitude;
//   const offsetInterval = Math.floor(waveOffset / interval);
//   // console.log(waveOffset, offsetInterval);
//   let startIndex = 0 + offsetInterval;
//   let endIndex = maxTextLength + offsetInterval;
//   // A simple way to draw the wave with an ellipse at each location
//   for (let i = startIndex; i < endIndex; i++) {
//     // ellipse(i * xSpacing, amplitude / 2 + yvalues[i], 16, 16);
//     text(sentenceArray[i % (sentenceArray.length - 1)], x + xPos * xSpacing, y + yPos);
//     xPos += dx
//     yPos = sin(xPos) * amplitude;
//   }
//   pop();

// }

// define textAlongSine(t) {
// }

// gradually make text appear

// gradually make scattered letters of a text appear along a line

// scatter text around and behind circle
// words around a circle inspiration by
// - Allison Parrish: https://editor.p5js.org/allison.parrish/sketches/ryoVAen0m
// - enickles: https://editor.p5js.org/enickles/sketches/WNSKWx0Ap

// function blackedOutTextSetup() {
// }

class blackedOutTextCircle {
  constructor(
    sentence,
    numWords=80,
    radius = 150,
    randomTextRepeat = 3,
    randomCapsThreshold = .8,
    randomTextShuffleThreshold = .6
  ) {
    this.sentence = sentence;
    this.modifiedSentences = [];
    this.polarXs = [];
    this.polarYs = [];
    this.numWords = numWords;
    this.radius = radius;
    this.randomTextRepeat = randomTextRepeat;
    this.randomCapsThreshold = randomCapsThreshold;
    this.randomTextShuffleThreshold = randomTextShuffleThreshold;

    // calculate positions once
    let theta, polarX, polarY, isCaps;
    for (let i = 0; i < numWords; i++) {
      theta = map(i, 0, numWords, 0, TWO_PI);
      // if you want rotation, use something like this
      // theta = map(i + frameCount * 0.01, 0, numWords, 0, TWO_PI);
      polarX = radius * cos(theta);
      polarY = radius * sin(theta);

      // add random to the x (horizontal) dimension
      polarX = pepperWithRandom(polarX, 0.05);

      this.polarXs.push(polarX);
      this.polarYs.push(polarY);

      // modify the text in various ways
      let s = sentence;
      if (this.randomTextRepeat > 1) {
        s = s.repeat(Math.ceil(Math.random() * this.randomTextRepeat)); // minimum of one
      }
      if (Math.random() > this.randomCapsThreshold) {
        s = this.sentence.toUpperCase();
      }
      if (Math.random() > this.randomTextShuffleThreshold) {
       s = shuffle(this.sentence.split('')).join('');
      }
      this.modifiedSentences.push(s);

    }
    // console.log(this.polarXs, this.polarYs, this.capsSwitches);
    console.log(this.modifiedSentences);
  }

  draw(x, y) {

    push();

    fill(255);
    textSize(10);
    textFont('Courier New');
    textAlign(CENTER, CENTER);

    translate(x, y);

    for (let i = 0; i < this.numWords; i++) {
      push();
      translate(this.polarXs[i], this.polarYs[i]);
      text(this.modifiedSentences[i], 0, 0);
      pop();
    }

    fill(0);
    ellipseMode(RADIUS);
    ellipse(0,0, this.radius - 5);
    pop();
  }

}

function pepperWithRandom(x, wiggleFactor) {
  /*
   * pepperWithRandom(10, .2) yields numbers between 8.0 and 12.0
   * pepperWithRandom(10, .5) yields numbers between 5.0 and 15.0
  */
  const maxWiggle = x * wiggleFactor;
  const randomWiggle = (Math.random() - .5) * maxWiggle * 2; // from -maxWiggle to maxWiggle
  return x + randomWiggle;
}
// one word with letters appearing, then moving away left and right


// utils
// Fisher-Yates (aka Knuth) Shuffle: https://stackoverflow.com/a/2450976
function shuffle(array) {
  let currentIndex = array.length,  randomIndex;
  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}
