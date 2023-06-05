// --------------------------------------------------------------------------------
// P5js + Node server with websockets and the OpenAI API
//
// Jérémie Wenger, 2023
// With Iris Colomb, in the context of *Machines poétiques*: exploring textual
// systems through experimental French poetry, Goldsmiths College
// --------------------------------------------------------------------------------

const { Configuration, OpenAIApi } = require('openai');
const fs = require('fs');

// Authentication, two ways: environment or a file
// -----------------------------------------------
// 1) local environment
//    for this, you need to define the variable in your terminal before launching node:
//    export OPENAI_API_KEY=...
let configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
// console.log(configuration);

// 2)
// Synchronous file read, cf. https://nodejs.dev/en/learn/reading-files-with-nodejs/ (and GPT :>)
if (!configuration.apiKey) {

  console.log('configuration through the environment variable failed, tying `secret.txt` file');

  function configureAPI() {
    try {
      const data = fs.readFileSync(__dirname + '/secret.txt');
      return new Configuration({
        apiKey: data.toString().trim(),
      });
    } catch (err) {
      console.error(err);
    }
  }
  configuration = configureAPI();
  // console.log(configuration);

  if (!configuration.apiKey) {
    console.log('---------------------------------------------------------------------------------');
    console.log('could not access the secret API key, please read `readme.md` on how to configure!');
    console.log('---------------------------------------------------------------------------------');
    process.exit(2);
  }

} else {

  console.log('configuration through the environment variable successful!');

}

const openai = new OpenAIApi(configuration);

// async function listEngines() {
//   return await openai.listEngines();
// }
// console.log('requesting engines');
// const response = listEngines();
// console.log(response);
// console.log('done');

// https://socket.io/get-started/chat#integrating-socketio
// See also Dan Shiffman's tutorial on Node & Websockets for more information
// https://www.youtube.com/watch?v=bjULmG8fqc8&list=PLRqwX-V7Uu6b36TzJidYfIYwTFEq3K5qH
const express = require('express');
const app = express();
const port = 3000;
const server = app.listen(port, () => {
    console.log(`it works. listening on port ${server.address().port}`);
}); // https://stackoverflow.com/a/4842885

// make our 'public' folder visible to the outside world
app.use(express.static('public'));

const socket = require('socket.io');
const io = socket(server);

io.on('connection', (socket) => {

  console.log(`connection! id: ${socket.id}`);
  // console.log(socket);

  io.emit('message', 'hello');
  // console.log('sent message');

  socket.on('completion request', (message, sock) => {
    console.log(`completion requested by user:`);
    console.log(message);
    sock('the server received your completion request');
    console.log('making request to the model...');
    requestCompletion(...Object.values(message))
      .then((response) => {
        // console.log(response); // see the full horror of the response object
        console.log(response.data.choices);
        const t = response.data.choices[0].text // TODO: OpenAI gives the option to get multiple responses for one request, to be explored!
        console.log('it answered!');
        io.emit('completion response', t);
      })
      .catch((e) => {
        io.emit('completion response', "");
        console.error(e);
      });
  });

  socket.on('chat request', (message, sock) => {
    console.log(`chat requested by user:`);
    console.log(message);
    sock('the server received your chat request');
    console.log('making request to the model...');
    requestMessage(...Object.values(message))
      .then((response) => {
        // console.log(response); // see the full horror of the response object
        console.log(response.data.choices);
        const t = response.data.choices[0].message.content;  // TODO: OpenAI gives the option to get multiple responses for one request, to be explored!
        console.log('it answered!');
        console.log(response.data.choices);
        io.emit('chat response', t);
      })
      .catch((e) => {
        io.emit('chat response', "");
        console.error(e);
      });
  });

  socket.on('image request', (message, sock) => {
    console.log(`image requested by user:`);
    console.log(message);
    sock('the server received your image request');
    console.log('making request to the model...');
    requestImage(...Object.values(message))
      .then((response) => {
        // console.log(response); // see the full horror of the response object
        const t = response.data.data[0];  // TODO: OpenAI gives the option to get multiple images for one request, to be explored!
        console.log('it answered!');
        console.log(response.data);
        io.emit('image response', t);
      })
      .catch((e) => {
        io.emit('image response', "");
        console.error(e);
      });
  });

});

// separate async function (required if we want to use the await keyword)
// this allows us to make a call to the API, and wait for it to respond
// without breaking our code
async function requestCompletion(
  prompt = 'Say this is a test',
  max_tokens = 7,
  temperature = 0.7,
) {
  // console.log('inside requestCompletion', prompt, max_tokens, temperature);
  return await openai.createCompletion({
    model: 'text-davinci-003', // TODO: search the documentation for various models, possibly allow the user to change this from the UI
    prompt: prompt,
    temperature: parseFloat(temperature),  // security checks
    max_tokens: parseInt(max_tokens),      // for the variable type
    n: 1, // TODO: the parameter for requesting more than one answer
  });
}

async function requestMessage(
  prompt = 'Say this is a test',
  system_prompt = 'You are William Shakespeare and speak like in the 1590s.',
  max_tokens = 7,
  temperature = 0.7,
) {
  // console.log('inside requestChat', prompt, system_prompt, max_tokens, temperature);
  return await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {role: "system", content: system_prompt},
      {role: "user", content: prompt}
    ],
    max_tokens: parseInt(max_tokens),     // security checks
    temperature: parseFloat(temperature), // for the variable type
    n: 1, // TODO: the parameter for requesting more than one answer
  });
}

async function requestImage(
  prompt = "The rainbow cyborg armageddon, Dutch oil painting, 1723, British Museum"
) {
  return await openai.createImage({
    prompt: prompt,
    n: 1,              // TODO: the number of images should be betwen 1 & 10 → add the appropriate field to the UI
    size: "256x256",  // TODO: add a way for users to change image sizes, possible choices: 256x256, 512x512, or 1024x1024
  });
}
