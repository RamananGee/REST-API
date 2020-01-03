const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/api');
//Set up the express app

const app = express();

//connect to mongodb
mongoose.connect('mongodb://localhost/ninjago');
mongoose.Promise = global.Promise;

app.use(express.static('public'));

app.use(bodyParser.json());
//initialize routes
app.use('/api',routes);

//error handling middleware
app.use((err,req,res,next) => {
    // console.log(err);
    res.status(422).send({
        error: err.message
    });
});

//Listen for the Request

app.listen(process.env.port || 4000, ()=>{
    console.log('Port 4000 is listening for the request.');
});