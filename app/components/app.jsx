var Promise = require('bluebird');
var React = require('react');
var Router = require('react-router');

var App = React.createClass({
    statics: {
        fetchData: function(){
            return new Promise(function(resolve, reject){
                console.log('promise called');
                setTimeout(resolve.bind(null, 0), 1000);
            });
        },
        willTransitionTo: function(transition, params, query, cb){
            App.fetchData().then(function(){
                console.log('wtt finished')
            }).then(cb);
        }
    },
    render: function() {
        return (
            <div>
                <Router.Link to="/thing">thing</Router.Link>
                <Router.RouteHandler data={this.props.data} />
            </div>
        );
    }

});

module.exports = App;
