// main.js

// Establish connection with the server
const socket = io();

// Elements
const messageInput = document.getElementById('message');
const usernameInput = document.getElementById('username');
const messagesDiv = document.getElementById('messages');
const sendBtn = document.getElementById('sendBtn');

// Emit message to server on click
sendBtn.addEventListener('click', () => {
  const message = messageInput.value;
  const username = usernameInput.value;

  if (message && username) {
    // Send the message with username to the server
    socket.emit('chat message', `${username}: ${message}`);
    messageInput.value = ''; // Clear the input after sending
  } else {
    alert('Please enter both a username and message');
  }
});

// Listen for messages from the server
socket.on('chat message', (msg) => {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message');
  messageElement.textContent = msg;
  messagesDiv.appendChild(messageElement);

  // Scroll to the bottom of the chat
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
});
