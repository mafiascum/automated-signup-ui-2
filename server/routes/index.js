"use strict";

var express = require('express');
var router  = express.Router();

router.get('/', function(req, res) {
    res.render('index', {
        SERVICE_ROOT: process.env.SERVICE_ROOT,
        API_TOKEN: process.env.API_TOKEN
    });
});

module.exports = router;
