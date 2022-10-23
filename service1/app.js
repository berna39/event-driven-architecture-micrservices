const express = require('express');
const kafka = require('kafka-node');
const sequelize = require('sequelize');
const app = express();
app.use(express.json());

const doRun = async () => {
    const db = new sequelize(producer.env.POSTGRES_URL);
    const User = db.define('user', {
        name: sequelize.STRING,
        email: sequelize.STRING,
        password: sequelize.STRING
    });
    
    db.sync({ force: true});

    const client = new kafka.KafkaClient({kafkaHost: process.env.KAFKA_BOOTSTRAP_SERVER});
    const producer = new kafka.Producer(client);

    producer.on("ready", async () => {

        app.post('/user', async (req, res) => {
            producer.send([{topic: process.env.KAFKA_TOPIC, messages: JSON.stringify(req.body)}], async (err, data) => {
                if(err) console.log(err);
                else {
                    const user = await User.create(req.body);
                    res.send(user);
                }
            });
        });
    });
}

setTimeout(doRun, 10000);


app.listen(process.env.PORT, (err) => {
    if(err) console.log(`Epic Error : ${err}`);
    else console.log(`Service1 up and running`);
});