const app = require("./src/app");
const port = 3000;

const server = app.listen(port, () => {
  console.log(`Server connection on  http://127.0.0.1:${port}`);  // Server Connnected
});

// Send Notification API
app.post('/send-notification', bodyParser, (req, res) => {
    const notify = { status:'OK', data: req.body};
    socket.emit('notification', notify); // Updates Live Notification
    res.send(notify);
});

// Socket Layer over Http Server
const socket = require('socket.io')(server, {
    cors: {
      origin: '*',
    }
});
// On every Client Connection
socket.on('connection', socket => {
    console.log('Socket: client connected');
});
