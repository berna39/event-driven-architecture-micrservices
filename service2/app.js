const express = require('express');
const kafka = require('kafka-node');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());

const doRun = () => {
    
}

setTimeout(doRun, 10000);


app.listen(process.env.PORT, (err) => {
    if(err) console.log(`Epic Error : ${err}`);
    else console.log(`Service2 up and running`);
});