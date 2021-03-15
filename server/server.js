const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const app = express();
const http = require('http').Server(app);
const path = require('path');
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))

app.use(bodyParser.json({ limit: '50mb' }));
app.use('/assets', express.static('assets'));

app.use(express.static(path.join(__dirname, 'dist')));
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});



app.use(function(err, req, res, next) {
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


mongoose.connect(dbConfig.url, { useNewUrlParser: true,  useUnifiedTopology: true  });

mongoose.connection.on('error', function(error) {
    console.error('Database connection error:', error);
});

mongoose.connection.once('open', function() {
    console.log('Database connected');
});


mongoose.set('useCreateIndex', true);


require('./app/routes/index.js')(app);




app.listen(5000, () => console.log('App listening port 5000'));

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});

app.use(function(err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401);
        res.json({ "message": err.name + ": " + err.message });
    }
});


http.listen(5555);