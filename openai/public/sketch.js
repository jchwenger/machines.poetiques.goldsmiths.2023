// --------------------------------------------------------------------------------
// P5js + Node server with websockets and the OpenAI API
//
// Jérémie Wenger, 2023
// With Iris Colomb, in the context of *Machines poétiques*: exploring textual
// systems through experimental French poetry, Goldsmiths College
// --------------------------------------------------------------------------------

let bgColor; // the background, used in setup, draw & when resetting the sketch
const margin = 20;

const socket = io();

function setup() {
  createCanvas(400, 700);
  textFont('Helvetica');
  textSize(20);
  fill(0);
  textAlign(CENTER);
  // const response = requestText();
  // console.log(response);
  createUI();

  bgColor = color(255, 254, 242)
  background(bgColor);

}

function draw() {

}

function keyPressed() {
  if (key === '¬') {
    toggleUI();
  }
}

// --------------------------------------------------------------------------------
// display functions

function displayResponse(message, completion=false) {

  background(bgColor);

  fill(0);
  textSize(14);
  textAlign(LEFT);
  textFont('Georgia');

  if (completion) {
    // in completion mode, fill both sketch and input with prompt + answer
    const promptTextarea = document.getElementsByName('prompt')[0];
    const prompt = promptTextarea.value;
    text(`${prompt}${message}`, margin, margin, width - 2 * margin);
    promptTextarea.value = `${prompt}${message}`;
  } else {
    // in chat mode, we only display the text in the sketch
    text(message, margin, margin, width - 2 * margin);
  }
}

function displayImage(message) {

  background(bgColor);

  // console.log(`inside displayImage, message:`);
  // console.log(message);
  const img = createImg(message.url, img => {
    image(img, margin, margin, img.width, img.height);
  }); // using the callback & an anonymous function: https://p5js.org/reference/#/p5/loadImage
  img.hide(); // weirdly, having this inside the callback results in a glitch
}

// --------------------------------------------------------------------------------
// request functions

function requestCompletion() {
  const form = document.getElementById('request-form');
  const data = new FormData(form);
  console.log('requesting completion');
  socket.emit('completion request', {
      'prompt': data.get('prompt'),
      'max_tokens': data.get('max-tokens'),
      'temperature': data.get('temperature'),
    }, (response) => console.log(response));
}

function requestChat() {
  const form = document.getElementById('request-form');
  const data = new FormData(form);
  console.log('requesting chat');
  console.log(form);
  socket.emit('chat request', {
    'prompt': data.get('prompt'),
    'system_prompt': data.get('system'),
    'max_tokens': data.get('max-tokens'),
    'temperature': data.get('temperature'),
  }, (response) => console.log(response));
}

function requestImage() {
  const form = document.getElementById('request-form');
  const data = new FormData(form);
  console.log('requesting image');
  console.log(form);
    socket.emit('image request', {
      'prompt': data.get('prompt'),
    }, (response) => console.log(response));
}

// --------------------------------------------------------------------------------
// interact with server / make requests to OpenAI

socket.on('completion response', (message) => {
  console.log('completion response:');
  console.log(message);
  displayResponse(message, true);
});

socket.on('chat response', (message) => {
  console.log('chat response:');
  console.log(message);
  displayResponse(message);
});

socket.on('image response', (message) => {
  console.log('image response:');
  console.log(message);
  displayImage(message);
});

// --------------------------------------------------------------------------------
// UI with text boxes, buttons, etc.
// partial inspiration from here: https://www.geeksforgeeks.org/how-to-create-a-form-dynamically-with-the-javascript/

function createUI() {

  const UI = document.createElement('div');
  UI.setAttribute('id', 'ui');

  const title = document.createElement('h1');
  title.innerHTML = 'Control panel';

  // form
  const form = document.createElement('form');
  form.setAttribute('id', 'request-form');

  // base prompt ---------------------------------------
  const promptDiv = document.createElement('div');
  promptDiv.setAttribute('id', 'textarea-container');

  const prompt = document.createElement('textarea');
  prompt.setAttribute('type', 'text');
  prompt.setAttribute('name', 'prompt');
  prompt.setAttribute('rows', '10');
  prompt.setAttribute('cols', '50');

  const promptLabel = document.createElement('label');
  promptLabel.innerHTML = 'prompt';

  promptDiv.appendChild(promptLabel);
  promptDiv.appendChild(prompt);

  // system prompt -------------------------------------
  const systemDiv = document.createElement('div');
  systemDiv.setAttribute('id', 'textarea-container');

  const system = document.createElement('textarea');
  system.setAttribute('type', 'text');
  system.setAttribute('name', 'system');
  system.setAttribute('rows', '10');
  system.setAttribute('cols', '50');

  const systemLabel = document.createElement('label');
  systemLabel.innerHTML = 'system prompt';

  systemDiv.appendChild(systemLabel);
  systemDiv.appendChild(system);

  // parameters ----------------------------------------
  const parametersDiv = document.createElement('div');
  parametersDiv.setAttribute('id', 'parameters-container');

  // temperature
  const temperature = document.createElement('input');
  temperature.setAttribute('type', 'number');
  temperature.setAttribute('min', '0.1');
  temperature.setAttribute('max', '2.0');
  temperature.setAttribute('step', '0.1');
  temperature.setAttribute('name', 'temperature');
  temperature.setAttribute('value', '0.7');
  temperature.setAttribute('placeholder', '0.7');

  const temperatureLabel = document.createElement('label');
  temperatureLabel.innerHTML = 'temperature';

  const maxTokens = document.createElement('input');
  maxTokens.setAttribute('type', 'number');
  maxTokens.setAttribute('min', '1');
  maxTokens.setAttribute('max', '256');
  maxTokens.setAttribute('step', '1');
  maxTokens.setAttribute('name', 'max-tokens');
  maxTokens.setAttribute('value', '7');
  maxTokens.setAttribute('placeholder', '7');

  const maxTokensLabel = document.createElement('label');
  maxTokensLabel.innerHTML = 'max tokens';

  parametersDiv.appendChild(maxTokensLabel);
  parametersDiv.appendChild(maxTokens);
  parametersDiv.appendChild(temperatureLabel);
  parametersDiv.appendChild(temperature);

  // buttons -------------------------------------------
  const buttonsDiv = document.createElement('div');
  buttonsDiv.setAttribute('id', 'buttons');

  // completion button
  const completionButton = document.createElement('button');
  completionButton.setAttribute('type', 'button');
  completionButton.setAttribute('content', 'completion');
  completionButton.setAttribute('id', 'completion-button');
  completionButton.textContent = 'completion';
  completionButton.addEventListener('click', () => requestCompletion());

  // chat button
  const chatButton = document.createElement('button');
  chatButton.setAttribute('type', 'button');
  chatButton.setAttribute('content', 'chat');
  completionButton.setAttribute('id', 'chat-button');
  chatButton.textContent = 'chat';
  chatButton.addEventListener('click', () => requestChat());

  // img button
  const imgButton = document.createElement('button');
  imgButton.setAttribute('type', 'button');
  imgButton.setAttribute('content', 'image');
  completionButton.setAttribute('id', 'img-button');
  imgButton.textContent = 'image';
  imgButton.addEventListener('click', () => requestImage());

  // reset button
  const resetButton = document.createElement('button');
  resetButton.setAttribute('type', 'reset');
  resetButton.setAttribute('content', 'reset');
  resetButton.textContent = 'reset';
  resetButton.addEventListener('click', () => background(bgColor));

  buttonsDiv.appendChild(completionButton);
  buttonsDiv.appendChild(chatButton);
  buttonsDiv.appendChild(imgButton);
  buttonsDiv.appendChild(resetButton);

  // build form & ui -----------------------------------

  // append the elements to the form
  form.appendChild(promptDiv);
  form.appendChild(systemDiv);
  form.appendChild(parametersDiv);
  form.appendChild(buttonsDiv);

  // append the form to the body
  UI.appendChild(title);
  UI.appendChild(form);

  // append to the body
  document.body.appendChild(UI);
}

function toggleUI() {
  const ui = document.getElementById('ui');
  if (ui.style.display === 'none') {
    ui.style.display = 'block';
  } else {
    ui.style.display = 'none';
  }
}
