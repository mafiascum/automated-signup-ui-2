'use strict';

var httpProxy = require('http-proxy');

var proxy = httpProxy.createProxyServer();
var host = process.env.APP_HOST || 'localhost';

var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.all('/public/*', function (req, res) {
    proxy.web(req, res, {
        target: 'http://' + host + ':3001'
    });
});

app.set('views', 'templates');
app.set('view engine', 'pug');

app.use('/', require('./routes/index'));

app.listen(3000, ()=> {
    console.log('app is listening on port 3000');
});

proxy.on('error', function(e) {
    console.log('Could not connect to proxy: ', e);
});
