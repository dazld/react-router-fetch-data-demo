"use strict";

var Promise = require('bluebird');
var _ = require('lodash');
var React = require('react');

// takes a bound render function
// returns a function that can be invoked when the Router has finished matching
module.exports = function makeController (render) {

    return function(Handler, state, store){

        var fetchingData = state.routes.filter(function(route){
            return route.handler.fetchData;
        }).reduce(function(fetchPromises, route){
            fetchPromises[route.name] = route.handler.fetchData(store, state.params);
            return fetchPromises;
        },{});

        return Promise.props(fetchingData).then(function(data){
            return React.createElement(Handler, {
                data: store
            }); 
        }).then(function(el){
            return {
                rendered: render(el),
                data: store
            };
        });

    };
};
