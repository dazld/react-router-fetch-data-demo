/* global process */
"use strict";

var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('webpack');
var spawn = require('child_process').spawn;
var node;

var webpackConfig = require('./webpack.config');

webpackConfig.debug = true;
webpackConfig.devtool = 'source-map';

var compiler = webpack(webpackConfig);



gulp.task('assets', function(){
    gulp.src('./assets/**/*')
        .pipe(gulp.dest('./static'));
});

gulp.task('client', function(cb){
    compiler.run(function(err, stats){
        if (err) {
            throw new gutil.PluginError('client', err);
        }
        gutil.log('[client]', stats.toString({
            colors: true
        }));
        cb();
    });
});


gulp.task('server', ['assets','client'], function(){
    if (node) {
        node.kill();
    }
    node = spawn('node', ['server'], {stdio: 'inherit'});
    node.on('close', function(code){
        if (code === 8) {
            console.log('Error detected, waiting for changes...');
        } else {
            console.log('node closed: ', code);
        }
    });
});


gulp.task('default', ['server', 'watch']);


gulp.task('watch', function(){
    gulp.watch(['./app/**/*', './server/**/*','./assets/**/*'], ['server']).on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});


// clean up if an error goes unhandled.
process.on('exit', function() {
    if (node) {
        node.kill();
    }
});
