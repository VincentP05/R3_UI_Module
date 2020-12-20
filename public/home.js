//This page needs to listen to port 5050
let socket = io.connect('http://localhost:5050');

//Query DOM
let time = document.getElementById('time');
let historyList = document.getElementById('historyList');

let today = new Date();

//Response to 50 messages from server
//Listens to port 5050, and takes messages and stores them
let temp = 0;

socket.on('message', (data) => {
  //time for first message, "hello"
  time.innerHTML +=
    today.getMonth() +
    1 +
    '-' +
    today.getDate() +
    ' | ' +
    today.getHours() +
    ':' +
    today.getMinutes() +
    ':' +
    today.getSeconds() +
    ':' +
    today.getMilliseconds();
});

socket.on('messages', (data) => {
  //Displaying messages and storing them
  const messageItem = document.createElement('TR');
  let currentTime = new Date();
  let timeString =
    currentTime.getMonth() +
    1 +
    '-' +
    currentTime.getDate() +
    ' | ' +
    currentTime.getHours() +
    ':' +
    currentTime.getMinutes() +
    ':' +
    currentTime.getSeconds() +
    ':' +
    currentTime.getMilliseconds();
  messageItem.innerHTML =
    '<th>' +
    data.id +
    '</th>' +
    '<th>' +
    data.message +
    '</th>' +
    '<th>' +
    timeString +
    '</th>';

  historyList.className = 'list';
  historyList.appendChild(messageItem);
});

document.getElementById('history').onclick = function () {
  location.href = 'history';
};
