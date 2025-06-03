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

  // TODO: one of the simplest tweaks: the number of lines these two variables
  // determine where the missing word will be.
  nRows = 5;                             
  nColumns = 3;                          
  blankRow = Math.floor(nRows/2);        
  blankColumn = Math.floor(nColumns/2);

  word = "silencio";

  margin = 50;
  createCanvas(700, 500);

  // TODO: can playing with the various attributes of the text (colour, size,
  // font, etc.) be used to change the poetic intent or effect of the piece?
  fill(0);                                   
  fontSize = 20;                             
  textAlign(CENTER);                         
  textSize(fontSize);                        
  textFont('Helvetica');                     
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
