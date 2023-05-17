// --------------------------------------------------------------------------------
// P5js + Node server with websockets and the OpenAI API
//
// Jérémie Wenger, 2023
// In the context of *Machines poétiques*: exploring textual systems through
// experimental French poetry, with Iris Colomb, Goldsmiths College
// --------------------------------------------------------------------------------

// const { Configuration, OpenAIApi } = require('openai');
// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);
// const response = await openai.createCompletion({
//   model: 'text-davinci-003',
//   prompt: 'Say this is a test',
//   temperature: 0,
//   max_tokens: 7,
// });

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

  socket.on('request', (message) => {
    console.log(`chat message! ${message}`);
    io.emit('message', 'diblah');
  });

});
