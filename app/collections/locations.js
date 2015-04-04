var Collection = require('../lib/base-collection');
var restMixin = require('ampersand-collection-rest-mixin');
var Promise = require('bluebird');
var qs = require('querystring');
var path = require('path');

var Location = require('../models/location');


var Locations = Collection.extend(restMixin, {
    model: Location,
    getOrFetch: function(id, options, cb){
        options = options || {};
        cb = cb || function(){};
        var args = [].slice.call(arguments);

        var gof = restMixin.getOrFetch.bind(this);
        return new Promise(function(resolve, reject){
            return gof(id, options, function(err, model){
                if (err) {
                    cb(err, null);
                    reject(err);
                } else {
                    cb(null, model);
                    resolve(model);
                }
            });
        });
    }
});

module.exports = Locations;
