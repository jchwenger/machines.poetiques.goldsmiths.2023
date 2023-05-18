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

let N;
let halfN;
let margin;

let word;
let wLength;
let fontSize;
let lineHeight;

function setup() {

  N = 3;                             // TODO: one of the simplest tweaks: the
  halfN = Math.floor(N/2);           // number of lines these two variables
  halfNPlus2 = Math.floor((N+2)/2);  // determine where the missing word will be.

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
  for (i = 0; i < N; i++) {
    // loop through the lines
    for (j = 0; j < N + 2; j++) {
      // if we are in the middle, don't write
      if (i === halfN && j === halfNPlus2) {
        continue;
      } else {
        text(  // we draw the text
          word,
          width/2 - halfN * wLength + wLength * i,
          height/2 - halfN * lineHeight + lineHeight * j
        );
      }
    }
  }
}
