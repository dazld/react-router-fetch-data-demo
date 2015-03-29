var BaseCollection = require('../lib/base-collection');
var SearchResult = require('../models/search-result');

var qs = require('querystring');
var path = require('path');


var SearchResults = BaseCollection.extend({
    model: SearchResult,
    url: function(){

        var searchTerm = encodeURIComponent(this.searchTerm);

        return 'http://api.openweathermap.org/data/2.5/find?q='+searchTerm+'&type=like';
    },
    parse: function(data){
        console.log(data);
        return data;
    }
});


module.exports = SearchResults;



