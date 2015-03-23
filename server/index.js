

var path = require('path');
// enable jsx in node

require('node-jsx').install({
    extension: '.jsx',
    harmony: true
});

var React = require('react');
var express = require('express');
var cookieParser = require('cookie-parser');
var expressLayouts = require('express-ejs-layouts');
var Router = require('react-router');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', 'layout');
app.disable('etag');
app.disable('view cache');
app.use(cookieParser());
app.use(expressLayouts);
app.use('/static', express.static(path.join(__dirname, '..', 'static')));

app.use(function(req,res){
    res.render('main', {
        content: 'hey there'
    });
});

app.listen(8080, function(){
    console.log('app up on 8080');
});


