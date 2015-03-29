"use strict";
var React = require('react');
var Router = require('react-router');
var Promise = require('bluebird');
var routes = require('./routes/routes.jsx');
var makeAppController = require('./controllers/app');
var _ = require('lodash');


// init react touch events
if (('ontouchstart' in window)||(window.DocumentTouch && document instanceof DocumentTouch)){
    React.initializeTouchEvents(true);
}

// get app DOM container element
var appRoot = document.getElementById('app');

// create router based on required routes
var router = Router.create({
    location: Router.HistoryLocation,
    routes: routes
});

var boundRender = _.partialRight(React.render, appRoot);
var runController = makeAppController(boundRender);

router.run(function(Handler, state){
    console.log('router run called', state);

    runController(Handler, state).then(function(){
        console.log('render complete');
    }).catch(function(e){
        console.log(e);
    });
    
});



