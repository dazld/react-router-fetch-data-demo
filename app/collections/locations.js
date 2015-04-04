var Collection = require('../lib/base-collection');
var Promise = require('bluebird');
var qs = require('querystring');
var path = require('path');

var Location = require('../models/location');


var Locations = Collection.extend({
    model: Location
});

module.exports = Locations;
