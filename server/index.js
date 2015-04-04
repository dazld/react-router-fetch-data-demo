'use strict';

var path = require('path');

// enable jsx in node
require('node-jsx').install({
    extension: '.jsx'
});

var React = require('react');
var express = require('express');
var cookieParser = require('cookie-parser');
var expressLayouts = require('express-ejs-layouts');
var Router = require('react-router');

var makeController = require('../app/controllers/app');

var routes = require('../app/routes/routes.jsx');
var api = require('./api');
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', 'layout');
app.use('/api', api);
app.use(cookieParser());
app.use(expressLayouts);
app.use(express.static(path.join(__dirname, '..', 'static')));



var runController = makeController(React.renderToString.bind(React));

app.use(function(req,res){

    var makeStore = require('../app/stores/all');
    var appStore = makeStore();

    var router = Router.create({
        onAbort: function(options){
            var destination = options.to || '/';

            res.redirect(302, destination);
            console.log('Redirecting to:', destination);
        },
        onError: function(err){
            // console.log('onerror:', err);
            throw err;
        },
        routes: routes,
        location: req.url
    });

    router.run(function(Handler, state) {

        runController(Handler, state, appStore).then(function(result){
            res.render('main', {
                content: result.rendered,
                data: JSON.stringify(result.data)
            });
        }).catch(function(err){
            console.log(err.message);
            throw err;
        });

    });
});

app.listen(8080, function(){
    console.log('app up on 8080');
});


