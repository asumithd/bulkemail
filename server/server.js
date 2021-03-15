const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const http = require('http').Server(app);
const path = require('path');



// parse requests of content-type - application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json());
app.use('/assets', express.static('assets'));



// allow-cors
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    // allow preflight
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});



// Error Handing in Middleware
app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500; // Sets a generic server error status code if none is part of the err
    if (err.shouldRedirect) {
        res.render('myErrorPage') // Renders a myErrorPage.html for the user
    } else {
        res.status(err.statusCode).send(err.message); // If shouldRedirect is not defined in our error, sends our original err data
    }
});


const dbConfig = require('./config/database.config.js');

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;


mongoose.connect(dbConfig.url, { useNewUrlParser: true });

mongoose.connection.on('error', function (error) {
    console.error('Database connection error:', error);
});

mongoose.connection.once('open', function () {
    console.log('Database connected');
});


mongoose.set('useCreateIndex', true);
const bulkmail = require('../server/app/controllers/bulkmail.controller');
app.post('/api/bulkmail', bulkmail.create);
app.get('/api/bulkmail', bulkmail.findAll);
app.get('/api/bulkmail/:id', bulkmail.findOne);
app.put('/api/bulkmail/:id', bulkmail.update);
app.delete('/api/bulkmail/:id', bulkmail.delete);


app.listen(3000, () => console.log('App listening port 3000'));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});

app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401);
        res.json({ "message": err.name + ": " + err.message });
    }
});




http.listen(4444);