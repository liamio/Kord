const menuContainer = document.getElementById('menu-container');
const chatContainer = document.getElementById('chat-container');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const startButton = document.getElementById('start-button');
const usernameInput = document.getElementById('username'); // Get the username input

let username = '';
let room = '';
let isOwner = false; // Track if the user is the owner

startButton.addEventListener('click', startChat);

function startChat() {
  username = usernameInput.value; // Get username from input
  room = document.getElementById('room').value;

  // Check if username is "Liamio" and set owner status
  if (username.trim().toLowerCase() === 'liamio') {
    isOwner = true;
  } else {
    // If username is already taken in online mode (replace with your logic)
    if (isUsernameTaken(username)) { 
      username = 'Impersonater'; // Update username if taken
      isOwner = false;
    } 
  }

  // Set username to "Anonymous" if it's empty
  if (username.trim() === '') {
    username = 'Anonymous';
  }

  if (room.trim() !== '') {
    menuContainer.style.display = 'none';
    chatContainer.style.display = 'block';
    messageInput.style.display = 'block';
    sendButton.style.display = 'block';

    sendButton.addEventListener('click', sendMessage);
    messageInput.addEventListener('keyup', (event) => {
      if (event.key === 'Enter') {
        sendMessage();
      }
    });
  } else {
    alert('Please enter a room name.');
  }
}

function sendMessage() {
  const message = messageInput.value;
  if (message.trim() !== '') {
    if (message.startsWith('/version')) {
      addChatMessage('bot', 'The current version of the website is 1.0');
    } else {
      addChatMessage(username, message); 
      // ... (rest of your sendMessage logic)
    }
    messageInput.value = '';
  }
}

function addChatMessage(sender, message) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message');
  messageElement.classList.add(sender);

  // Add the "owner" class if the user is the owner
  if (isOwner) {
    messageElement.classList.add('owner'); 
  }

  messageElement.innerHTML = `
    <span class="sender">${sender}:</span>
    <span class="message-text">${message}</span>
  `;
  chatContainer.appendChild(messageElement);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Placeholder function - You will need to implement this based on your online mode
function isUsernameTaken(username) {
  // This is just a placeholder - you need to implement this based on your online mode
  // This example just checks if the username is already in the chat, but you might need
  // to fetch from a database or server.
  const existingUsers = ['Liamio']; // Replace this with your actual online user list
  return existingUsers.includes(username.toLowerCase());
}
