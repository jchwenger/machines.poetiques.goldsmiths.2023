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

// Ideas for further development:
// - if you wanted to make some of the occurrences of the word disappear, like
//   in 'silencio', how would you go about doing that? (Hint: you would have to
//   implement a loop that draws a line by writing words one after the other,
//   instead of printing a repeated string as I did. Another option would be to
//   change the way you prepare the prepared string, by adding spaces (or other
//   characters) instead of the word at the desired location.
// - maybe you would like to add movement to the sketch? A nice trick for
//   oscillations is to use Math.sin(frameCount) or Math.cos(frameCount),
//   tweaking frequency (speed) like so: Math.sin(frameCount/freq); and the size
//   of the resulting number like so: Math.sin(frameCount) * scaling

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
  repeatedWord = word.repeat(horizontalRepeat); // .repeat: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat

  xInit = 120;
  yInit = 70;

  // TODO: do you need this 'direction' attribute, if one only ever goes the
  // opposite direction at each section (right always after left, left always
  // after right) ?
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
      text(repeatedWord, xCurrent, yCurrent);
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
