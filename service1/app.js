const express = require('express');
const app = express();

app.listen(4000, (err) => {
    if(err) console.log(`Epic Error : ${err}`);
    else console.log(`Service1 up and running`);
});