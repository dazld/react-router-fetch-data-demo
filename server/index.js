"use strict";

var path = require('path');
// enable jsx in node

require('node-jsx').install({
    extension: '.jsx'
});

var React = require('react');
var express = require('express');
var cookieParser = require('cookie-parser');
var expressLayouts = require('express-ejs-layouts');
var Router = require('react-router');
var Promise = require('bluebird');

var routes = require('../app/routes/routes.jsx');
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', 'layout');
app.disable('etag');
app.disable('view cache');
app.use(cookieParser());
app.use(expressLayouts);
app.use(express.static(path.join(__dirname, '..', 'static')));

var Locations = require('../app/collections/locations').Locations;

app.use('/favicon.ico', function(req, res){
    res.send(404);
});

app.use(function(req,res){

    var locations = new Locations();

    var router = Router.create({
        onAbort: function(options){
            var destination = options.to || '/';

            res.redirect(302, destination);
            console.log('Redirecting to:', destination);
        },
        onError: function(err){
            console.log('onerror:', err);
            throw err;
        },
        routes: routes,
        location: req.url
    });

    router.run(function(Handler, state) {

        //  we know which route, we know what params
        var handler = React.createFactory(Handler);

        // console.log(state)
        // var fetchingData = state.routes.filter(function(r){
        //     return r.handler.fetchData;
        // }).map(function(r){
        //     return r.handler.fetchData();
        // });

        console.log(state.params);

        var fetchingData = [];
        if (state.params.locationId) {
            fetchingData.push(locations.getOrFetch(state.params.locationId));
        }

        Promise.all(fetchingData).then(function(data){
            var content = React.renderToString(handler({
                data: data
            }));

            res.render('main', {
                content: content
            });    
        });

        
    });
});

app.listen(8080, function(){
    console.log('app up on 8080');
});


