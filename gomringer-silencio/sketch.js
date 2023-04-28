// --------------------------------------------------------------------------------
// Eugene Gomringer, 'silencio', 1954
//
// Jérémie Wenger, 2023
// --------------------------------------------------------------------------------

let N;
let halfN;
let margin;

let word;
let wLength;
let fontSize;
let lineHeight;

function setup() {

  N = 5;
  halfN = Math.floor(N/2);

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
    for (j = 0; j < N; j++) {
      if (i === halfN && j === halfN) {
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
