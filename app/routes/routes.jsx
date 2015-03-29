"use strict";

var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var Promise = require('bluebird');

// var Redirect = Router.Redirect;
// var RouteHandler = Router.RouteHandler;


// Components
var App = require('../components/app.jsx');


var Thing = React.createClass({
    mixins: [Router.State],
    getInitialState: function(){
        var params = this.getParams();
        return {
            data: this.props.data.locations.get(params.locationId)
        }
    },
    render: function() {
        return (
            <div>
                <h1>{this.state.data.name}</h1>
                <Router.Link to='root'>home</Router.Link>
            </div>
        );
    }

});

module.exports = Thing;

var routes = (
    <Route handler={App} path='/' name='root'>
        <Route handler={Thing} path=':locationId' name='location'></Route>
    </Route>
);

module.exports = routes;
