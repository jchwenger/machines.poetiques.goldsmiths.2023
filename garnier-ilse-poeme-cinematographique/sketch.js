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
// (from 0'44)
// original inspiration by xinxin (Qianqian Ye?):
// - https://editor.p5js.org/xinxin/sketches/okGMvmxM
// - https://p5js.org/examples/math-sine-wave.html
// and GPT-4!
let laWave;
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------
// a black circle with words in the circumference
// ----------------------------------------------
// (at 5'26 and after)
// words around a circle inspiration by:
// - Allison Parrish: https://editor.p5js.org/allison.parrish/sketches/ryoVAen0m
// - enickles: https://editor.p5js.org/enickles/sketches/WNSKWx0Ap
let leCircle;
// --------------------------------------------------------------------------------

let animationsIndex;

function setup() {
  createCanvas(800, 500);

  animationsIndex = 0;

  laWave = new textWave('terre ');
  laWaveBackward = new textWave('terre ',
    amplitude = 80,
    period = 500,
    xSpacing = 30,
    speed = .3,
    mode = 'backward',
    tSize = 35,
  );
  leCircle = new blackedOutTextCircle('terre ');
}

function draw() {
  background(0);

  // helper lines
  // push();
  // stroke(255);
  // line(width/2,0, width/2, height);
  // line(0,height/2, width, height/2);
  // pop();

  if (animationsIndex === 0) {
    laWave.draw(30, width/3, 50);
  } else if (animationsIndex === 1) {
    laWaveBackward.draw(width-30, height - 50);
  } else if (animationsIndex === 2) {
    leCircle.draw(width/2, height/2, true);
  }
}

function keyPressed() {
  if (key === ' ') {
    animationsIndex = (animationsIndex + 1) % 2;
  }
}

// --------------------------------------------------------------------------------
// Text displayed along a sine wave

class textWave {

  constructor(
    sentence,
    amplitude = 40,
    period = 300,
    xSpacing = 20,
    speed = .3,
    mode = 'forward',
    tSize = 24,
  ) {
    this.sentence = sentence;
    this.amplitude = amplitude;
    this.period = period;
    this.frequency = TWO_PI / period;
    this.xSpacing = xSpacing;
    this.speed = speed;
    this.mode = mode;
    this.offset = 0;
    this.textSize = tSize;
  }

  // TODO: for efficiency's sake, it might be good to consider a mechanism
  // that prevents these loops from drawing beyond a certain width (e.g. the screen)?
  draw(x, y) {

    push();

    // // helper lines
    // noFill();
    // stroke(255);
    // line(x,y - this.amplitude, x + this.offset, y - this.amplitude);
    // line(x,y + this.amplitude, x + this.offset, y + this.amplitude);
    // ellipse(x, y, 5, 5);

    textSize(this.textSize);
    textFont('Georgia');
    textAlign(CENTER, CENTER);

    fill(255);
    noStroke();

    if (this.mode === 'backward') {

      let xPos = x + this.offset;
      let yPos = sin(this.frequency * xPos) * this.amplitude;

      let i = 0;
      const xStart = x - this.xSpacing;
      while (xPos < xStart) {
        text(this.sentence[mod(i, this.sentence.length)], xPos, y + yPos); // TODO: here we display the text character by character: one could imagine
        xPos += this.xSpacing;                                             // adding transformations, like color/brightness, pepperWithRandom, or simply
        yPos = sin(this.frequency * xPos) * this.amplitude;                // randomly remove a character every so often
        i++;
      }
      this.offset -= this.speed;

    } else {

      let xPos = x + this.offset;
      let yPos = sin(this.frequency * xPos) * this.amplitude;

      let i = this.sentence.length - 1;
      const xStart = x - this.xSpacing;
      while (xPos > xStart) {
        text(this.sentence[mod(i, this.sentence.length)], x + xPos, y + yPos);  // TODO: same comment as above
        xPos -= this.xSpacing;
        yPos = sin(this.frequency * xPos) * this.amplitude;
        i--;
      }
      this.offset += this.speed;
    }


    pop();
  }

}


// --------------------------------------------------------------------------------
// The black circle with words, 5'26 and after

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
      // -------------------------------
      // repeat the text
      let s = sentence;
      if (this.randomTextRepeat > 1) {
        s = s.repeat(Math.ceil(Math.random() * this.randomTextRepeat)); // minimum of one
      }
      // sometimes change it to upper case
      if (Math.random() > this.randomCapsThreshold) {
        s = this.sentence.toUpperCase();
      }
      // sometimes shuffle the letters
      if (Math.random() > this.randomTextShuffleThreshold) {
       s = shuffle(this.sentence.split('')).join('');
      }
      this.modifiedSentences.push(s);

    }
    // console.log(this.polarXs, this.polarYs, this.capsSwitches);
    // console.log(this.modifiedSentences);
  }

  draw(x, y) {

    push();

    fill(255);
    textSize(10);
    textFont('Courier New');
    textAlign(CENTER, CENTER);

    translate(x, y);

    // first draw the words around the circle
    for (let i = 0; i < this.numWords; i++) {
      push();
      translate(this.polarXs[i], this.polarYs[i]);
      text(this.modifiedSentences[i], 0, 0);
      pop();
    }

    // then draw the circle on top
    fill(0);
    ellipseMode(RADIUS);
    ellipse(0,0, this.radius - 5);
    pop();
  }

}

// --------------------------------------------------------------------------------
// utils

function pepperWithRandom(x, wiggleFactor) {
  /*
   * pepperWithRandom(10, .2) yields numbers between 8.0 and 12.0
   * pepperWithRandom(10, .5) yields numbers between 5.0 and 15.0
  */
  const maxWiggle = x * wiggleFactor;
  const randomWiggle = (Math.random() - .5) * maxWiggle * 2; // from -maxWiggle to maxWiggle
  return x + randomWiggle;
}

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

// fix for the modulo (%) annoyance with negative numbers
// from: https://stackoverflow.com/a/17323608
function mod(n, m) {
  return ((n % m) + m) % m;
}
