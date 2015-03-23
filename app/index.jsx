"use strict";
var React = require('react');
var Router = require('react-router');
var Promise = require('bluebird');

var routes = require('./routes/routes.jsx');

var router = Router.create({
    location: Router.HistoryLocation,
    routes: routes
});

if (('ontouchstart' in window)||(window.DocumentTouch && document instanceof DocumentTouch)){
    React.initializeTouchEvents(true);
}

var appRoot = document.getElementById('app');

router.run(function(Handler, state){
    console.log('router run called');

    var fetchingData = state.routes
            .filter((r) => r.handler.fetchData)
            .map((r) => r.handler.fetchData());

    Promise.all(fetchingData).then(function(data){
        React.render(<Handler params={state.params} data={data} />, appRoot);
    });

});



