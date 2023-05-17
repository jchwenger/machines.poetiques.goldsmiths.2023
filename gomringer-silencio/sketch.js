// --------------------------------------------------------------------------------
// Eugene Gomringer, 'silencio', 1954
//
// Jérémie Wenger, 2023
// In the context of *Machines poétiques*: exploring textual systems through
// experimental French poetry, with Iris Colomb, Goldsmiths College
// --------------------------------------------------------------------------------

let N;
let halfN;
let margin;

let word;
let wLength;
let fontSize;
let lineHeight;

function setup() {

  N = 3;
  halfN = Math.floor(N/2);
  halfNPlus2 = Math.floor((N+2)/2);

  word = "silencio";

  margin = 50;
  createCanvas(700, 500);

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

  for (i = 0; i < N; i++) {
    for (j = 0; j < N + 2; j++) {
      if (i === halfN && j === halfNPlus2) {
        continue;
      } else {
        text(
          word,
          width/2 - halfN * wLength + wLength * i,
          height/2 - halfN * lineHeight + lineHeight * j
        );
      }
    }
  }
}
