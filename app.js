/**
 * Created by Patrick on 2/16/2016.
 */
var express = require('express');
var testAPI = express();
var app = express();



/*****************
 * Test API
 ****************/
testAPI.get('/', function (req, res) {
    console.log('Reached Test API')
    var date = new Date();
    res.send(date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds());
});

testAPI.listen(3000, function () {
    console.log('Test API listening on port 3000!');
});

/********************
 * Concurrency App
 *******************/

app.listen(3001, function () {
    console.log('Running concurrency test on port 3001!');
});

app.get('/', function (req, res) {
    var request = require('request');
    var concurrentLibrary = require('concurrentLibrary');
    concurrentLibrary.limit('43', function() {
        console.log('Callback succeded');
        request('http://localhost:3000/​', function(error, response, body) {
            if (error) {
                console.log(error);
            } else if (response.statusCode === 200) {
                console.log('200 okay, hurray!');
            }
        });
    });
    res.send("Success?");
});