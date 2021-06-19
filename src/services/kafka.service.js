const KafkaService = {
    sendRecord: ({ data, producer}, callback = () => {}) => {
        const event = {
          // attach timestamp and send data to kafka
            timestamp: new Date(),
            data: data
        };

        const buffer =  Buffer.from(JSON.stringify(event));
        //console.log(event);
        // Create a new payload
        const record = [
            {
                topic: "streaming-data",
                messages: buffer,
                attributes: 1 /* Use GZip compression for the payload */
            }
        ];

        //Send record to Kafka and log result/error
        producer.send(record, callback);
    }
};

module.exports = KafkaService