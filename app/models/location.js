var Model = require('../lib/base-model');

var qs = require('querystring');
var path = require('path');

var Location = Model.extend({
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

module.exports = Location;
