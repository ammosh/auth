var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var logger = require('morgan');
var lessMiddleware = require('less-middleware');

var conCtrl = require('./app_api/config/mysql');
require('./app_api/config/passport');

var routesApi = require('./app_api/routes/index');

var app = express();

app.use(favicon(__dirname + '/public/favicon.ico'));

app.use(logger('dev'));
app.use(bodyParser.json({
    limit: '4mb'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    limit: '4mb',
    extended: false
}));
app.use(cookieParser());
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'app_client')));
app.use(passport.initialize());

app.use('/api', routesApi);

app.use(function(req, res) {
    res.sendFile(path.join(__dirname, 'app_client', 'index.html'));
});

// TODO - remove the error for production
app.use(function(err, req, res, next) {
    res.status(err.status || 400);
    return res.json({
        message: err.message,
        error: err
    });
});


module.exports = app;