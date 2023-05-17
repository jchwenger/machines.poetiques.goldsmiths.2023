// --------------------------------------------------------------------------------
// P5js + Node server with websockets and the OpenAI API
//
// Jérémie Wenger, 2023
// In the context of *Machines poétiques*: exploring textual systems through
// experimental French poetry, with Iris Colomb, Goldsmiths College
// --------------------------------------------------------------------------------

// import { Configuration, OpenAIApi } from "openai";
// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);

const socket = io();

function setup() {
  createCanvas(700, 400);
  textFont("Helvetica");
  textSize(20);
  fill(0);
  textAlign(CENTER);
  // const response = requestText();
  // console.log(response);
}

function draw() {
  background(95, 250, 67);
  // text(response, 20, 20);
  // console.log(response);
  text("BLAH", width/2, height/2);
}

function keyPressed() {
  if (key === ' ') {
    console.log('requesting!');
    socket.emit('request', 'blah', (response) => console.log(response));
  }
}

socket.on('message', (msg) => console.log(msg));

// requestText = async () => {
//    return await openai.createCompletion({
//     model: "text-davinci-003",
//     prompt: "Say this is a test",
//     temperature: 0,
//     max_tokens: 7,
//   });
// }
