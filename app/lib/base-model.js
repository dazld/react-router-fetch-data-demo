var Model = require('ampersand-model');
var sync = require('ubiquisync-redis');

var BaseModel = Model.extend({
    sync: sync
});

module.exports = BaseModel;
