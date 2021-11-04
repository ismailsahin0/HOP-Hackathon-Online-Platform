const chatForm =document.getElementById('chat-form');
const chatMessages= document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

// Get username and room from URL
/*const {username,room}=Qs.parse(location.search, {
    ignoreQueryPrefix: true
});*/

// Get username and room from Token
const {username,room} = getUserFromToken();

const socket = io();

//Join chatroom
socket.emit('joinRoom', {username,room});

// Get room and users
socket.on('roomUsers', ({room,users})=> {
    outputRoomName(room);
    outputUsers(users);
});


//Message from server
socket.on('message', message => {
    outputMessage(message);
    //Scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

//Message submit
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //Get message text
    const msg= e.target.elements.msg.value;
    
    //Emit message to server
    socket.emit('chatMessage', msg);

    //Clear input
    e.target.elements.msg.value= '';
    e.target.elements.msg.focus();
});

function getUserFromToken(){
    //here we will get values from token
    const params = new URLSearchParams(window.location.search);
    var user = params.get('username');
    var room = params.get('room');
    if(user==null){
        user = 'ismail';
    }
    if(room==null){
        room = 'javascript';
    }
    return {username:user,room :'javascript'};
}

function outputMessage(message){
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `	<p class="meta"> ${message.username} <span>${message.time}</span></p>
    <p class="text">
      ${message.text}
    </p>`;
    document.querySelector('.chat-messages').appendChild(div);
    if(message.username==username){
        div.classList.add('myMessage');
    }
}

// Add room name to DOM
function outputRoomName(room){
    roomName.innerText = room;
}

// Add users to DOM
function outputUsers(users) {
    
    userList.innerHTML =` ${users.map(user => `<li>${user.username}</li>`).join('')}`;

}