const socket = io('http://localhost:3000')
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')
messageContainer.scrollTop=messageContainer.scrollHeight; 

const name = prompt('What is your name?')
appendMessage('You joined',"adminmessage")
socket.emit('new-user', name)

socket.on('chat-message', data => {
  appendMessage(`${data.name}: ${data.message}`,"othermessage")
})

socket.on('user-connected', name => {
  appendMessage(`${name} connected`, "adminmessage")
})

socket.on('user-disconnected', name => {
  appendMessage(`${name} disconnected`, "adminmessage")
})

messageForm.addEventListener('submit', e => {
  e.preventDefault()
  const message = messageInput.value
  appendMessage(`You: ${message}`, "yourmessage")
  socket.emit('send-chat-message', message)
  messageInput.value = ''
})

function appendMessage(message, cname) {
  const outerDiv = document.createElement('div')
  if (cname == "adminmessage"){
    outerDiv.className = "outerdiv admin"
  }
  else{
    outerDiv.className="outerdiv"
  }

  const messageElement = document.createElement('div')
  messageElement.innerText = message
  messageElement.className=cname;
  outerDiv.append(messageElement);
  messageContainer.append(outerDiv);
}