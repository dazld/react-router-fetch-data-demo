'use strict';

var express = require('express');
var proxy = require('express-http-proxy');

var redis = require('redis');
var client = redis.createClient();
var Promise = require('bluebird');

var getting = Promise.promisify(client.get, client);
var setting = Promise.promisify(client.set, client);

var weatherProxy = proxy('http://api.openweathermap.org', {
    filter: function(req, res) {
        return req.method === 'GET';
    },
    intercept: function(rsp, data, req, res, callback) {
        // rsp - original response from the target
        if (rsp.statusCode !== 200 || data.cod !== '200') {
            res.status(404); // openweather API sends 200s for just about everything,
                             // including missing data!
                             // so, need to set this up properly here. can remove it if
                             // they ever fix it on their end.   
            return callback(null, data);
        }
        console.log('[API] setting api cache for:', req.url);
        setting(req.url, data).then(function() {
            client.expire(req.url, 7200);
        }).finally(function(){
            callback(null, data);
        });

    }
});

var app = express();

app.use(function(req, res, next) {
    getting(req.url).then(function(val){
        if (val !== null) {
            console.log('[API] cache hit for ', req.url);
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(val);
        } else {
            console.log('[API] cache miss for ', req.url);
            weatherProxy(req, res, next);
        }
    }).catch(function(err){
        res.status(500).send(err);
    });
});


module.exports = app;
