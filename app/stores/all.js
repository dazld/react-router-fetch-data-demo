var Locations = require('../collections/locations');
var SearchResults = require('../collections/search-results');

module.exports = function(){
    
    var locations = new Locations();
    var searchResults = new SearchResults();

    return {
        locations: locations,
        searchResults: searchResults
    };

};
