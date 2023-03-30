// Connect to server using WebSocket
const socket = new WebSocket('ws://localhost:8080');

// When connection is established
socket.onopen = function(event) {
  console.log('WebSocket connection established.');
};

// When message is received from server
socket.onmessage = function(event) {
  const message = JSON.parse(event.data);
  displayMessage(message);
};

// When error occurs
socket.onerror = function(event) {
  console.error('WebSocket error:', event);
};

// When connection is closed
socket.onclose = function(event) {
  console.log('WebSocket connection closed.');
};

// Send message to server
function sendMessage(message) {
  socket.send(JSON.stringify(message));
}

// Display message in chat UI
function displayMessage(message) {
  const chatMessages = document.getElementById('chat-messages');
  const messageElement = document.createElement('div');
  messageElement.innerText = message.username + ': ' + message.text;
  chatMessages.appendChild(messageElement);
}

// Send message when user clicks send button or presses enter key
const sendButton = document.getElementById('send-button');
const messageInput = document.getElementById('message-input');
sendButton.addEventListener('click', function() {
  const messageText = messageInput.value;
  if (messageText.trim()) {
    const message = {
      username: 'User 1',
      text: messageText
    };
    sendMessage(message);
    displayMessage(message);
    messageInput.value = '';
  }
});
messageInput.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    const messageText = messageInput.value;
    if (messageText.trim()) {
      const message = {
        username: 'User 1',
        text: messageText
      };
      sendMessage(message);
      displayMessage(message);
      messageInput.value = '';
    }
  }
});