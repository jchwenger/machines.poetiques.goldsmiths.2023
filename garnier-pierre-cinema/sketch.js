// --------------------------------------------------------------------------------
// Pierre Garnier, 'Dalle funéraire spatialiste', from *Cimetière spatialiste*, 1973
//
// Jérémie Wenger, 2023
// With Iris Colomb, in the context of *Machines poétiques*: exploring textual
// systems through experimental French poetry, Goldsmiths College
// --------------------------------------------------------------------------------

// a very interesting article (in French, unfortunately) with many a beautiful
// and inspirational example of visual poetry
// https://journals.openedition.org/interfaces/2009?lang=en

let word;
let repeatedWord;
let font;

let xInit;
let yInit;
let horizontalRepeat;
let jaggedScheme;
let charWidth;

function setup() {
  createCanvas(500, 700);

  textFont('Courier');
  textSize(10);
  textLeading(9);
  charWidth = textWidth('m');
  fill(0);

  horizontalRepeat = 6

  word  = "cinéma";
  repeatedWord = word.repeat(horizontalRepeat);

  xInit = 120;
  yInit = 70;

  jaggedScheme = [
    { 'length': 13, 'direction': 'right' },
    { 'length': 7, 'direction': 'left' },
    { 'length': 4, 'direction': 'right' },
    { 'length': 11, 'direction': 'left' },
    { 'length': 9, 'direction': 'right' },
    { 'length': 7, 'direction': 'left' },
    { 'length': 8, 'direction': 'right' },
  ];
}

function draw() {
  background(233, 232, 227);

  // draw the main text
  xCurrent = xInit;
  yCurrent = yInit;
  for (scheme of jaggedScheme) {
    for (let i = 0; i < scheme.length; i++) {
      text(repeatedWord, xCurrent, yCurrent); // .repeat: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat
      // move one char left or right
      if (scheme.direction === 'right') {
        xCurrent += charWidth;
      } else if (scheme.direction === 'left'){
        xCurrent -= charWidth;
      }
      yCurrent += textLeading(); // next line
    }
  }

  // draw the comment
  text('Dalle funéraire spatialiste', 250, height - 50);
}
