const socketService = require("./socket.service");

//======= Send Notificaiton =======
exports.sendNotification = async (body) => {
    const notify = body;
    KafkaService.sendRecord(notify); // Updates Live Notification
    return notify;
};


// var kafka = require('kafka-node');
// const kclient = new kafka.KafkaClient("localhost:9092", "my-client-id", {
//     sessionTimeout: 300,
//     spinDelay: 100,
//     retries: 2
// });

// const producer = new kafka.HighLevelProducer(kclient);
// producer.on("ready", function() {
//     console.log("Kafka Producer is connected and ready.");
// });

// // For this demo we just log producer errors to the console.
// producer.on("error", function(error) {
//     console.error(error);
// });

// const KafkaService = {
//     sendRecord: (data, callback = () => {}) => {
//         const event = {
//           // attach timestamp and send data to kafka
//             timestamp: new Date(),
//             data: data
//         };

//         const buffer = new Buffer.from(JSON.stringify(event));
//         console.log(event);
//         // Create a new payload
//         const record = [
//             {
//                 topic: "test",
//                 messages: buffer,
//                 attributes: 1 /* Use GZip compression for the payload */
//             }
//         ];

//         //Send record to Kafka and log result/error
//         producer.send(record, callback);
//     }
// };

/* var count = 0
setInterval(() => {
  // collect data from sensor and publish to kafka topic at regular interval
  KafkaService.sendRecord({data: Math.random()});
}, 3000); */


// Send Notification API
// app.post('/send-notification', bodyParser, (req, res) => {
//     const notify = { status:'OK', data: req.body};
//     //socket.emit('notification', notify); // Updates Live Notification
//     KafkaService.sendRecord(notify);
//     res.send(notify);
// });

// Our producer with its Kafka brokers
// This call returns a new writable stream to our topic 'topic-name'

const Kafka = require('node-rdkafka');
var stream = Kafka.Producer.createWriteStream({
    'metadata.broker.list': 'localhost:9092',
  }, {}, {
    topic: 'test'
  });
  
  // NOTE: MAKE SURE TO LISTEN TO THIS IF YOU WANT THE STREAM TO BE DURABLE
  // Otherwise, any error will bubble up as an uncaught exception.
  stream.on('error', function (err) {
    // Here's where we'll know if something went wrong sending to Kafka
    console.error('Error in our kafka stream');
    console.error(err);
  })

  const KafkaService = {
    sendRecord: (data, callback = () => {}) => {
        const event = {
          // attach timestamp and send data to kafka
            timestamp: new Date(),
            data: data
        };
        const buffer = new Buffer.from(JSON.stringify(event));
        // Writes a message to the stream
        var queuedSuccess = stream.write(buffer, callback);
        if (queuedSuccess) {
            console.log('We queued our message!');
          } else {
            // Note that this only tells us if the stream's queue is full,
            // it does NOT tell us if the message got to Kafka!  See below...
            console.log('Too many messages in our queue already');
          }
    }
};


//======= Show Notificaiton =======
exports.historyNotification = async () => {
  const notify = null;
  KafkaService.sendRecord(notify); // Updates Live Notification
  return notify;
};

