// script.js

// Get DOM elements
const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");
const chatWindow = document.getElementById("chat-window");
const toggleChat = document.getElementById("toggle-chat");
const chatbotBox = document.getElementById("chatbot-box");
const closeChat = document.getElementById("close-chat");
const closeToggle = document.getElementById("close-toggle");

// Apply transitions for slide effect
chatbotBox.style.transition = "opacity 0.3s ease, transform 0.3s ease";
chatbotBox.style.opacity = 0;
chatbotBox.style.transform = "translateY(20px)";

// Add pointer cursor to toggle and close icons
toggleChat.style.cursor = "pointer";
closeChat.style.cursor = "pointer";

// Load saved chat history from localStorage when page loads
window.onload = () => {
  const saved = localStorage.getItem("chatHistory");
  if (saved) chatWindow.innerHTML = saved;
  chatWindow.scrollTop = chatWindow.scrollHeight;
};

// Event listener for sending message via button click or Enter key
sendBtn.addEventListener("click", () => sendMessage());
userInput.addEventListener("keypress", e => {
  if (e.key === "Enter") sendMessage();
});

// Show chatbot box when toggle icon is clicked (not the close icon), and hide toggle icon
toggleChat.addEventListener("click", (e) => {
  if (!e.target.classList.contains("close-icon")) {
    const iconRect = toggleChat.getBoundingClientRect();
    chatbotBox.classList.remove("hidden");

    const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
    const left = clamp(iconRect.left, 0, window.innerWidth - chatbotBox.offsetWidth);
    const top = clamp(iconRect.top, 0, window.innerHeight - chatbotBox.offsetHeight);

    chatbotBox.style.left = `${left-50}px`;
    chatbotBox.style.top = `${top-30}px`;
    chatbotBox.style.right = "auto";
    chatbotBox.style.bottom = "auto";
    chatbotBox.style.position = "fixed";
    chatbotBox.style.opacity = 1;
    chatbotBox.style.transform = "translateY(0)";
    toggleChat.style.display = "none";
  }
});

// Hide chatbot box and show toggle icon again
closeChat.addEventListener("click", () => {
  chatbotBox.style.opacity = 0;
  chatbotBox.style.transform = "translateY(20px)";
  setTimeout(() => {
    chatbotBox.classList.add("hidden");
    toggleChat.style.display = "flex";
  }, 300);
});

// Hide the floating toggle button when its close icon is clicked
closeToggle.addEventListener("click", () => {
  toggleChat.style.display = "none";
});

// Handle sending user message and generating bot reply
function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;
  addUserMessage(message);
  userInput.value = "";
  setTimeout(() => addBotMessage(getBotReply(message)), 600);
}

// Append user message to chat window
function addUserMessage(msg) {
  const div = document.createElement("div");
  div.className = "user-message";
  div.innerText = msg;
  chatWindow.appendChild(div);
  updateScroll();
  saveHistory();
}

// Append bot message to chat window
function addBotMessage(msg) {
  const div = document.createElement("div");
  div.className = "bot-message";
  div.innerHTML = msg;
  chatWindow.appendChild(div);
  updateScroll();
  saveHistory();
}

// Scroll to bottom of chat window
function updateScroll() {
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

// Save current chat history to localStorage
function saveHistory() {
  localStorage.setItem("chatHistory", chatWindow.innerHTML);
}

// Simulate bot reply based on user input
function getBotReply(input) {
  input = input.toLowerCase();
  if (input.includes("hello") || input.includes("hi")) {
    return "Hello! 👋 How can I help you today?";
  } else if (input.includes("latest post") || input.includes("recent blog")) {
    return "Check out our <a href='/blog/latest' target='_blank'>latest blog post</a>!";
  } else if (input.includes("about")) {
    return "This blog shares insights on tech, health, travel, and lifestyle.";
  } else if (input.includes("contact")) {
    return "You can contact us <a href='contact.html' target='_blank'>here</a>.";
  } else if (input.includes("categories")) {
    return "Explore our blog <a href='/categories' target='_blank'>Categories</a>.";
    
  }
  else if (input.includes("email")) {
    return "Our email is <a href='https://mail.google.com/mail/?view=cm&fs=1&to=sheikhjunaed705@gmail.com' target='_blank'>sheikhjunaed705@gmail.com</a>.";
    
  }
  else {
    return "I'm still learning. Try asking about <strong>'latest post'</strong>, <strong>'contact'</strong>, or <strong>'categories'</strong>.";
  }
}

// Drag functionality for chatbot toggle button and chatbot box
let isDragging = false;
let offsetX, offsetY;

function enableDragging(element) {
  element.addEventListener("mousedown", (e) => {
    isDragging = true;
    offsetX = e.clientX - element.getBoundingClientRect().left;
    offsetY = e.clientY - element.getBoundingClientRect().top;
    document.body.style.userSelect = "none";
  });
}

document.addEventListener("mousemove", (e) => {
  if (isDragging) {
    let x = e.clientX - offsetX;
    let y = e.clientY - offsetY;
    const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
    x = clamp(x, 0, window.innerWidth - chatbotBox.offsetWidth);
    y = clamp(y, 0, window.innerHeight - chatbotBox.offsetHeight);

    chatbotBox.style.left = `${x}px`;
    chatbotBox.style.top = `${y}px`;
    chatbotBox.style.right = "auto";
    chatbotBox.style.bottom = "auto";
    chatbotBox.style.position = "fixed";
  }
});

document.addEventListener("mouseup", () => {
  isDragging = false;
  document.body.style.userSelect = "auto";
});

enableDragging(toggleChat);
enableDragging(chatbotBox);




chatbotBox.addEventListener("touchstart", (e) => {
  isDragging = true;
  const touch = e.touches[0];
  offsetX = touch.clientX - chatbotBox.getBoundingClientRect().left;
  offsetY = touch.clientY - chatbotBox.getBoundingClientRect().top;
  document.body.style.userSelect = "none";
}, { passive: false });

document.addEventListener("touchmove", (e) => {
  if (isDragging) {
    const touch = e.touches[0];
    let x = touch.clientX - offsetX;
    let y = touch.clientY - offsetY;
    const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
    x = clamp(x, 0, window.innerWidth - chatbotBox.offsetWidth);
    y = clamp(y, 0, window.innerHeight - chatbotBox.offsetHeight);
    chatbotBox.style.left = `${x}px`;
    chatbotBox.style.top = `${y}px`;
    chatbotBox.style.right = "auto";
    chatbotBox.style.bottom = "auto";
    chatbotBox.style.position = "fixed";
  }
}, { passive: false });

document.addEventListener("touchend", () => {
  isDragging = false;
  document.body.style.userSelect = "auto";
});
