// --------------------------------------------------------------------------------
// Eugene Gomringer, 'silencio', 1954
//
// Jérémie Wenger, 2023
// With Iris Colomb, in the context of *Machines poétiques*: exploring textual
// systems through experimental French poetry, Goldsmiths College
// --------------------------------------------------------------------------------

// one photograph of the printed poem:
// https://nickm.com/post/2019/07/gomringers-silencio-an-unlikely-sonnet/comment-page-1/

// Ideas for further development:
// - can you think of another word that could also be used in this framework?
// - perhaps one could use translations of the word? How would the meaning of
//   the empty slot change in this case?
// - can you think of a version where the empty slots isn't always in the
//   centre? Either moves around on its own, or through interaction?
// - how hard would it be to try another shape, e.g. a triangle?

let margin;

let nRows;
let nColumns;

let blankRow;
let blankColumn;

let word;
let wLength;
let fontSize;
let lineHeight;

function setup() {

  nRows = 5;                             // TODO: one of the simplest tweaks: the
  nColumns = 3;                          // number of lines these two variables
  blankRow = Math.floor(nRows/2);        // determine where the missing word will be.
  blankColumn = Math.floor(nColumns/2);

  word = "silencio";

  margin = 50;
  createCanvas(700, 500);

  fill(0);                                   // TODO: can playing with the
  fontSize = 20;                             // various attributes of the
  textAlign(CENTER);                         // text (colour, size, font, etc.)
  textSize(fontSize);                        // be used to change the poetic
  textFont('Helvetica');                     // intent or effect of the piece?
  lineHeight = textAscent() + textDescent();
  wLength = textWidth(word) + 15;
}

function draw() {
  background(255);

  // loop through the columns
  for (i = 0; i < nColumns; i++) {
    // loop through the lines
    for (j = 0; j < nRows; j++) {
      // if we are in the middle, don't write
      if (i === blankColumn && j === blankRow) {
        continue;
      } else {
        text(  // we draw the text
          word,
          width/2 - blankColumn * wLength + wLength * i,
          height/2 - blankRow * lineHeight + lineHeight * j
        );
      }
    }
  }
}
