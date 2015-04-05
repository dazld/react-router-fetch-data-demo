var Model = require('../lib/base-model');

var qs = require('querystring');
var path = require('path');

/* 

templateData: function(){
        var _ret = {};
        var data = this.toJSON();

        _ret.temp = data.main.temp.toFixed(0);
        _ret.temp_max = data.main.temp_max.toFixed(0);
        _ret.temp_min = data.main.temp_min.toFixed(0);
        _ret.cc = data.country;
        _ret.wind = {
            speed: data.wind.speed,
            direction: data.wind.deg
        };
        _ret.daytime = {
            rise: moment(data.sys.sunrise * 1000).fromNow(),
            set: moment(data.sys.sunset * 1000).fromNow()
        }
        _ret.name = data.name;

        return _ret;
    },

*/

var Location = Model.extend({
    urlRoot: "http://localhost:8080/api/data/2.5/weather",
    derived: {
        "temp": {
            deps: ['main'],
            fn: function(){
                return this.main.temp.toFixed();
            }
        },
        "temp_max": {
            deps: ['main'],
            fn: function(){
                return this.main.temp_max.toFixed();
            }
        },
        "temp_min": {
            deps: ['main'],
            fn: function(){
                return this.main.temp_min.toFixed();
            }
        }
    },
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
