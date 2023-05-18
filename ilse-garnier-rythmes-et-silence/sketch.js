// --------------------------------------------------------------------------------
// Ilse Garnier, three pieces from 'Rythmes et silences', in  *Jazz pour les
// yeux, anthologie de poésie spatiale*, Editions L’herbe qui tremble, 2011
//
// Jérémie Wenger, 2023
// With Iris Colomb, in the context of *Machines poétiques*: exploring textual
// systems through experimental French poetry, Goldsmiths College
// --------------------------------------------------------------------------------

// pictures available here:
// https://poezibao.typepad.com/poezibao/2011/05/anthologie-permanente-ilse-garnier.html

let word1;
let word2;
let word3;

let whiteSpace;

function setup() {
  createCanvas(500, 500);

  word1 = 'rythmes';
  word2 = 'et';
  word3 = 'silence';

  whiteSpace = 40;

  textFont('Courier');
  textSize(16);
  fill(0);

}

function draw() {
  background(255);
  // poem1();
  poem2();
}

function poem1() {
  // beware, word1 & word2 must have the same number of letters
  textAlign(RIGHT);
  for (let i = 0; i < word1.length; i++){
    // top left
    text(word1.slice(i), width/2 - whiteSpace, height/2 - word1.length * textLeading() + i*textLeading());
    // bottom left
    text(word1.slice(word1.length - i - 1), width/2 - whiteSpace, height/2 + (i + 1) * textLeading());
  }

  // central word
  textAlign(CENTER);
  text(word2, width/2, height/2);

  textAlign(LEFT);
  for (let i = 0; i < word3.length; i++){
    // top right
    text(word3.slice(0, word3.length - i), width/2 + whiteSpace, height/2 - word3.length * textLeading() + i*textLeading());
    // bottom right
    text(word3.slice(0, i + 1), width/2 + whiteSpace, height/2 + (i + 1) * textLeading());
  }
}

function poem2() {
  const w3 = (word3 + ' ').repeat(2);

  // bottom left triangle
  textAlign(LEFT);
  for (let i = 0; i < w3.length; i++) {
    text(w3.slice(0, i), 100, 100 + i * textLeading());
  }

  // upper right triangle
  textAlign(RIGHT);

  const w1 = word1 + ' ';
  const w1b = (word1 + ' ').repeat(6);
  const w1c = (word1 + ' ').repeat(4);
  let windowWidth = w1c.length - 1;
  let ww = w1b;
  // for (let i = 0; i < w1b.length; i += 3) {
  let i = 0;
  while (ww.length > 0) {
    ww = w1b.slice(i, i + windowWidth);
    // let j = 0;
    // while (ww.length < (w1b.length  - i*2/3)) {
    //   const m = j % w1.length;
    //   ww = `${ww}${w1.slice(m, m+1)}`;
    //   j += 1;
    // }
    // ww = ww.slice(0, ww.length-1);
    text(ww, 100 + textWidth(w1c), 100 + (i/3 - 1) * textLeading());
    i += 3;
    windowWidth -= 2;
  }

}

function poem3() {
}
