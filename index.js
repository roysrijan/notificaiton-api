const app = require("./src/app");
const dotenv = require('dotenv');
dotenv.config();
const {
    socketService
} = require("./src/services")

const server = app.listen(process.env.PORT, () => {
  console.log(`Server connection on  http://127.0.0.1:${process.env.PORT}`);  // Server Connnected
});

// Send Notification API
// app.post('/send-notification', bodyParser, (req, res) => {
//     const notify = { status:'OK', data: req.body};
//     socket.emit('notification', notify); // Updates Live Notification
//     res.send(notify);
// });

// Socket Layer over Http Server
// const socket = socketService.useSocket(server, {
//     cors: {
//       origin: '*',
//     }
// });

