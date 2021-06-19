const mongoose = require("mongoose");
const Kafka = require('node-rdkafka');
var app = require('express')();
var http = require('http').Server(app);
const port = 8000;
const dotenv = require('dotenv');
const {
  Messages
} = require('./src/models');
dotenv.config();
const {
  socketService
} = require("./src/services")


var consumer = new Kafka.KafkaConsumer({
  'group.id': 'kafka',
  'metadata.broker.list': 'localhost:9092',
}, {});


// Read from the librdtesting-01 topic... note that this creates a new stream on each call!
// var stream = Kafka.KafkaConsumer.createReadStream({
//   'group.id': process.env.groupID,
//   'metadata.broker.list': 'localhost:9092',
//   'fetch.message.max.bytes': 104857600
// }, {}, {
//   topics: ['test']
// });

consumer.connect();



// stream.on('data', function(data) {
//   console.log('Got message');
//   var buf = new Buffer(data.value, "binary");
//   var decodedMessage = JSON.parse(buf.toString());
//   if(decodedMessage.data){
//     //socket.emit('notification',decodedMessage);
//     let message = {
//       message:decodedMessage.data.Message,
//       ID: '1',
//       SID: 'session1'
//     }
//     Messages.create(message,(err, msg)=>{
//       if(err){
//         return
//       }
//       Messages.find({}, (e, messages)=> {
//         socket.emit('notification',messages);
//       })
//     });
//   }
//   else
//   {
//     Messages.find({}, (e, messages)=> {
//       socket.emit('notification',messages);
//     })
//   }
//   console.log(data.value.toString());
// });

/* stream.consumer.on('data', function(message) {
  console.log(message.value.toString());
})
 */

// consumer.connect();

consumer.on('ready', () => {
  console.log('consumer ready..')
  consumer.subscribe(['test']);
  consumer.consume();
  consumer.offsetsForTimes([{topic: 'test', partition: 0, offset: 1622659923847}], (err, data)=>{
    consumer.assign(data);
    data.forEach(e=>{
      consumer.seek(e,0,(error)=>{
        console.log("jj"+error);
      });
    });
    //consumer.poll();
    if(err)
    {
      console.log(err)
      return;
    }
    console.log('Got message offset');
    console.log('offset' + JSON.stringify(data));
  });
 }).on('data', function(data) {
  var buf = new Buffer(data.value, "binary");
  var decodedMessage = JSON.parse(buf.toString());
  //socket.emit('notification',decodedMessage);
  let message = {
    message:decodedMessage.data.Message,
    ID: '1',
    SID: 'session1'
  }
  Messages.create(message,(err, msg)=>{
    if(err){
      return
    }
    Messages.find({}, (e, messages)=> {
      socket.emit('notification',messages);
    })
  });
  console.log(decodedMessage);
});


const server = http.listen(process.env.consumerPORT, () => {
  console.log(`Server connection on  http://127.0.0.1:${process.env.consumerPORT}`);  // Server Connnected
});

console.log(process.env.MONGODB_URL)
/*======== Database connect===========*/
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URL, {
	useUnifiedTopology: true,
	useNewUrlParser: true,
  useCreateIndex: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
	console.log("connect mongodb");
});
/*======== Database connect===========*/

// Socket Layer over Http Server
const socket = socketService.useSocket(server, {
  cors: {
    origin: '*',
  }
});
