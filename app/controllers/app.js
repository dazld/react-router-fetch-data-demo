"use strict";

var Promise = require('bluebird');
var _ = require('lodash');
var React = require('react');

var Locations = require('../collections/locations').Locations;
var SearchResults = require('../collections/search-results');


// takes a bound render function
// returns a function that can be invoked when the Router has finished matching
module.exports = function makeController (render) {

    return function(Handler, state, store){

        var fetchingData = {};

        if (state.params.locationId) {
            fetchingData.locations = store.locations.getOrFetch(state.params.locationId);
        }


        return Promise.props(fetchingData).then(function(data){
            console.log('fetched all data', data);
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
