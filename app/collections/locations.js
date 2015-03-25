var Collection = require('ampersand-collection');
var restMixin = require('ampersand-collection-rest-mixin');
var Promise = require('bluebird');
var Model = require('ampersand-model');
var sync = require('ubiquisync');
var qs = require('querystring');
var path = require('path');

var Location = Model.extend({
    sync: sync,
    urlRoot: "http://api.openweathermap.org/data/2.5/weather",
    url: function() {

        var url = this.urlRoot + '?' + qs.stringify({
            id: this.get('id'),
            // APPID: config.APPID,
            units: 'metric'
        });

        return url;
    },
    extraProperties: 'allow'
});


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

module.exports.Location = Location;
module.exports.Locations = Locations;
