const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const socket = require('socket.io');
const { setTimeout } = require('timers');
let router = express.Router();

//add the router
app.use('/', router);

app.use(express.static(__dirname + '/public'));

let visted = 0;

router.get('/', (req, res) => {
  if (visted === 0) {
    //On the initial visit of the page, it will show the listening page
    res.sendFile(path.join(__dirname + '/public/index.html'));
    visted = 1;
  }
  //Any '/' get requests after will trigger the server to first send hello, then send 50 messages
  else {
    res.sendFile(path.join(__dirname + '/public/firstmsg.html'));
    setTimeout(() => {
      io.emit('message', {
        message: 'First Message',
      });
    }, 100);
  }
});

router.get('/firstmsg', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/firstmsg.html'));
});

router.get('/history', (req, res) => {
  //send the 50 messages
  sendMessages();
  res.sendFile(path.join(__dirname + '/public/history.html'));
});

let port = process.env.PORT;
if (port == null || port == '') {
  port = 5050;
}

let server = app.listen(port, () => {
  console.log('Server started on port 5050');
}); //Server is tuning into the channel 5050

//Socket set up
let io = socket(server);

io.on('connection', (socket) => {
  console.log('Socket connection made', socket.id);
});

//Coordinate points to dictate the next message
//Global scope, so that x and y can be updated, initally (0,0)
let x = 0;
let y = 0;

function nextMessage(xCoord, yCoord) {
  return new Promise((resolve, reject) => {
    //1 for X and 2 for Y
    XorY = Math.floor(Math.random() * 2 + 1);
    if (XorY === 1) {
      //X direction chosen, randomize left or right
      //1 for left and 2 for right
      LorR = Math.floor(Math.random() * 2 + 1);
      //Left
      if (LorR === 1) x = xCoord - 1;
      else x = xCoord + 1; //Right
      //y value will remain unchanged
      y = yCoord;
    } else {
      //Y direction chosen, randomize up or down
      //1 for up and 2 for down
      UorD = Math.floor(Math.random() * 2 + 1);
      //Up
      if (UorD === 1) y = yCoord + 1;
      else y = yCoord - 1; //Down
      //x value will remain unchanged
      x = xCoord;
    }
    resolve([x, y]);
  });
}

async function sendMessages() {
  setTimeout(() => {
    io.emit('messages', {
      id: 1,
      message: '(' + 0 + ',' + 0 + ')',
    });
  }, 200);

  for (let i = 0; i < 49; i++) {
    let currentMessage = await nextMessage(x, y);
    setTimeout(() => {
      io.emit('messages', {
        id: i + 2,
        message: '(' + currentMessage[0] + ',' + currentMessage[1] + ')',
      });
    }, 200);
  }
}
