'use strict';

var SwaggerExpress = require('swagger-express-mw');
var SwaggerUi = require('swagger-tools/middleware/swagger-ui');
var express = require('express');
var app = require('express')();

module.exports = app; // for testing

var config = {
    appRoot: __dirname // required config
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
    if (err) {
        throw err;
    }

    // add swagger-ui
    app.use(new SwaggerUi(swaggerExpress.runner.swagger));
    app.use(express.static(__dirname+'/public'));

    // install middleware
    swaggerExpress.register(app);

    var port = process.env.VCAP_APP_PORT || 3001;
    app.listen(port);

    console.log('try this:\ncurl http://127.0.0.1:' + port + '/applications');
});
