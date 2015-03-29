"use strict";

var Promise = require('bluebird');
var _ = require('lodash');
var React = require('react');

var Locations = require('../collections/locations').Locations;
var SearchResults = require('../collections/search-results');


// takes a bound render function
// returns a function that can be invoked when the Router has finished matching
module.exports = function makeController (render) {

    return function(Handler, state){

        var locations = new Locations();
        var searchResults = new SearchResults();

        var store = {
            locations: locations,
            searchResults: searchResults
        };

        var fetchingData = {};

        if (state.params.locationId) {
            fetchingData.locations = locations.getOrFetch(state.params.locationId);
        }


        return Promise.props(fetchingData).then(function(){

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
