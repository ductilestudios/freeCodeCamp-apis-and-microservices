require('dotenv').config()
var express = require('express');
var bodyParser = require('body-parser');
var app = express();


console.log('Hello World');

app.use ('/public', express.static(__dirname + '/public'));

app.use(function (req, res, next) {
    console.log(req.method + " " + req.path + " - " + req.ip);
    next()
  })
  
app.use('/name', bodyParser.urlencoded({extended: false}));

app.get('/', function(req, res) {
    let absolutePath = __dirname + '/views/index.html';
    res.sendFile(absolutePath);
})

app.get('/json', function(req, res) {
    if (process.env.MESSAGE_STYLE == "uppercase") {
        res.json({"message": "HELLO JSON"});
    } else {
    res.json({"message": "Hello json"});
    }
})

app.get('/now', function(req, res, next) {
    req.time = new Date().toString();
    next();
}, function(req, res) {
    res.json({"time": req.time})
})

app.get('/:param/echo', function (req, res) {
    res.json({"echo": req.params.param});
})

app.route('/name')
    .get(function (req, res) {
        res.json({"name": req.query.first + " " + req.query.last});
    })
    .post(function (req, res) {
        res.json({"name": req.body.first + " " + req.body.last});
    }) 


























 module.exports = app;
