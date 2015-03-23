"use strict";

var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
// var Redirect = Router.Redirect;
// var RouteHandler = Router.RouteHandler;


// Components
var App = require('../components/app.jsx');


var Thing = React.createClass({
    statics: {
        fetchData: function(){
            return new Promise(function(resolve, reject){
                setTimeout(resolve.bind(null, 1), 1000);
            });
        }
    },
    render: function() {
        return (
            <div>another thing</div>
        );
    }

});

module.exports = Thing;

var routes = (
    <Route handler={App} path='/' name='root'>
        <Route handler={Thing} path=':id' name='other' />
    </Route>
);

module.exports = routes;
