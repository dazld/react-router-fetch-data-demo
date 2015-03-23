var React = require('react');
var Router = require('react-router');

var App = React.createClass({
    statics: {
        fetchData: function(){
            return new Promise(function(resolve, reject){
                setTimeout(resolve.bind(null, 0), 1000);
            });
        }
    },
    render: function() {
        return (
            <div><Router.RouteHandler /></div>
        );
    }

});

module.exports = App;
