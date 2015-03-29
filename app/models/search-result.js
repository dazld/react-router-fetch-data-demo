var BaseModel = require('../lib/base-model');

var SearchResult = BaseModel.extend({
    extraProperties: 'allow'
});

module.exports = SearchResult;
