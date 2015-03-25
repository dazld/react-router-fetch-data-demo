var Promise = require('bluebird');
var React = require('react');
var Router = require('react-router');



var App = React.createClass({
    statics: {
        fetchData: function(){
            // tell store what we need
        }
    },
    getInitialState: function(){
        // get data from store
        return {};
    },
    render: function() {
        console.log(this.props.data)
        var pars = {
            locationId: 2950159
        }
        return (
            <div>
                <Router.Link to="location" params={pars}>thing</Router.Link>
                <Router.RouteHandler data={this.props.data} />
            </div>
        );
    }

});

module.exports = App;
