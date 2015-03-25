"use strict";
var React = require('react');
var Router = require('react-router');
var Promise = require('bluebird');

var routes = require('./routes/routes.jsx');

var Locations = require('./collections/locations').Locations;

var router = Router.create({
    location: Router.HistoryLocation,
    routes: routes
});

if (('ontouchstart' in window)||(window.DocumentTouch && document instanceof DocumentTouch)){
    React.initializeTouchEvents(true);
}

var appRoot = document.getElementById('app');
var locations = new Locations();

// this is pretty horrific, but trying something out
locations.getOrFetch = function(id, options, cb){
    return new Promise(function(resolve, reject){
        return Locations.prototype.getOrFetch.call(this, id, function(err, model){
            if (err) {
                reject(err);
            } else {
                resolve(model);
            }
        });
    }.bind(this));
}.bind(locations);

router.run(function(Handler, state){
    console.log('router run called', state);
    
    var fetchingData = [];
        if (state.params.locationId) {
            fetchingData.push(locations.getOrFetch(state.params.locationId));
        }

    Promise.all(fetchingData).then(function(data){
        React.render(<Handler params={state.params} data={data} />, appRoot);
    });

});



