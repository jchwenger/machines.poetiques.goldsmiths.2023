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

let poemIndex;
let poemFunctions;

function setup() {
  createCanvas(500, 500);

  word1 = 'rythmes'; // TODO: in the current sketch, I use words as global variables.
  word2 = 'et';      // you could instead pass them as function arguments!
  word3 = 'silence';

  poemIndex = 1;

  whiteSpace = 40;

  textFont('Courier');
  textSize(16);
  fill(0);

  poemFunctions = [
    poem1,
    poem2,
    poem3
  ];

}

function draw() {
  background(255);

  // selecting the current poem function and calling it
  poemFunctions[poemIndex]();
}

// using arrow keys or numbers to switch between poems
function keyPressed() {
  switch (key) {
    case '1':
      poemIndex = 0;
      return;
    case '2':
      poemIndex = 1;
      return;
    case '3':
      poemIndex = 2;
      return;
    case ' ':
      poemIndex = mod(poemIndex + 1, poemFunctions.length);
      return;
  }

  switch (keyCode) {
    case UP_ARROW:
      poemIndex = mod(poemIndex - 1, poemFunctions.length);
      return;
    case LEFT_ARROW:
      poemIndex = mod(poemIndex - 1, poemFunctions.length);
      return;
    case DOWN_ARROW:
      poemIndex = mod(poemIndex + 1, poemFunctions.length);
      return;
    case RIGHT_ARROW:
      poemIndex = mod(poemIndex + 1, poemFunctions.length);
      return;
  }
}

// --------------------------------------------------------------------------------
// poem functions

function poem1() {
  // Beware, word1 & word2 must have the same number of letters
  // TODO: adapt the code so that it works with words of different lengths?
  // (This will have aesthetic/visual consequences, how do you handle those?)

  // left word
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

  // left word
  textAlign(LEFT);
  for (let i = 0; i < word3.length; i++){
    // top right
    text(word3.slice(0, word3.length - i), width/2 + whiteSpace, height/2 - word3.length * textLeading() + i*textLeading());
    // bottom right
    text(word3.slice(0, i + 1), width/2 + whiteSpace, height/2 + (i + 1) * textLeading());
  }
}

function poem2() {
  // This poem has really two very different processes going on, a rather simple one
  // for the bottom left, and a more elaborate one for the upper right. Can you understand
  // the mechanism of the upper right triangle, and perhaps change the code so that you can
  // control the shapes of the two triangles at will (using variables that you pass as arguments
  // of the function?

  // bottom left triangle
  textAlign(LEFT);

  const w3 = (word3 + ' ').repeat(2);
  for (let i = 0; i < w3.length; i++) {
    text(w3.slice(0, i), 100, 100 + i * textLeading());
  }

  // upper right triangle
  // the principle for this is, for each line:
  // - move three letters to the right (rythme → thme)
  // - shift the beginning of the line by two letters
  //   while keeping the end fixed (each line is shorter
  //   than the previous one by two)
  textAlign(RIGHT);

  // TODO: what can be tweaked/turned into variables:
  // - the initial repetitions of the baseWord (4)
  // - the step size for i (skip the number of letters)
  // - the step size for windowWidth (how fast the line reduces)
  const baseWord = word1 + ' ';
  let wordRepeated = (baseWord).repeat(4);
  const originalWidth = textWidth(wordRepeated);
  let windowWidth = wordRepeated.length - 1;

  // wordDisplayed will be what we write to the screen (↓ removing the last space)
  let wordDisplayed = wordRepeated.slice(wordRepeated.length - 1);

  let i = 0;
  while (wordDisplayed.length > 0) {
    // console.log(`'${wordDisplayed}' | i: ${i}, windowWidth: ${windowWidth}, added: ${i + windowWidth}, wordRepeated.length: ${wordRepeated.length}`);

    if (i + windowWidth > wordRepeated.length) { // as we slide, we need to expand wordRepeated by baseWord
      wordRepeated += baseWord;                  // whenever i + windowWidth is bigger than its length
    }

    // use the index and windowWidth to slide the appropriate length
    wordDisplayed = wordRepeated.slice(i, i + windowWidth);
    text(wordDisplayed, 100 + originalWidth, 100 + (i/3 - 1) * textLeading());

    i += 3;            // we shift to the right by three letters
    windowWidth -= 2;  // we reduce the line by two letters
  }

}

function poem3() {
  // Beware, word1 & word2 must have the same number of letters
  // TODO: adapt the code so that it works with words of different lengths?
  // (This will have aesthetic/visual consequences, how do you handle those?)

  // left word
  textAlign(RIGHT);
  for (let i = 0; i < word1.length; i++){
    // top left
    text(word1.slice(word1.length - i - 1), width/2 - whiteSpace, height/2 - (word1.length - 1) * textLeading() + i * textLeading());
    // bottom left
    if (i > 0) text(word1.slice(i), width/2 - whiteSpace, height/2 + i * textLeading());
    // ↑ hack: if we draw the middle word twice it appears bold
  }

  // central word
  textAlign(CENTER);
  text(word2, width/2, height/2);

  // right word
  textAlign(LEFT);
  for (let i = 0; i < word3.length; i++){
    // top right
    text(word3.slice(0, i + 1), width/2 + whiteSpace, height/2 - (word3.length - 1) * textLeading() + i * textLeading());
    // bottom right
    if (i > 0) text(word3.slice(0, word3.length - i), width/2 + whiteSpace, height/2 + i * textLeading());
    // ↑ hack: if we draw the middle word twice it appears bold
  }
}

// fix for the modulo (%) annoyance with negative numbers
// from: https://stackoverflow.com/a/17323608
function mod(n, m) {
  return ((n % m) + m) % m;
}

