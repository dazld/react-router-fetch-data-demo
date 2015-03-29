"use strict";

var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var Promise = require('bluebird');


// Components
var App = require('../components/app.jsx');
var Location = require('../components/location.jsx');

var routes = (
    <Route handler={App} path='/' name='root'>
        <Route handler={Location} path=':locationId' name='location'></Route>
    </Route>
);

module.exports = routes;
