const express = require('express');
const kafka = require('kafka-node');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());

const doRun = async () => {

    mongoose.connect(process.env.MONGO_URL, (err) => {
        if(err) console.log(`Epic error : ${err}`);
    });

    const User = mongoose.model('user', {
        name: String,
        email: String,
        password: String
    });

    const client = new kafka.KafkaClient({kafkaHost: process.env.KAFKA_BOOTSTRAP_SERVER});
    const consumer = new kafka.Consumer(client, [{topic: process.env.KAFKA_TOPIC}], { autoCommit: false });
    
    consumer.on("message", async (message) => {
        const user = new User(JSON.parse(message.value));
        console.log(`New message from kafka : ${message.value}`);
        await user.save();
    });
}

setTimeout(doRun, 1000);


app.listen(process.env.PORT, (err) => {
    if(err) console.log(`Epic Error : ${err}`);
    else console.log(`Service2 up and running`);
});