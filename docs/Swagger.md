# Swagger Notes

To create the API, we used Swagger and some Swagger tools.

* [Swagger](http://swagger.io) - a specification for creating a REST API
* [swagger-node](https://github.com/swagger-api/swagger-node) - A Node module for using Swagger
* [swagger-editor](https://github.com/swagger-api/swagger-editor) - A web based UI for editing a swagger file
* [swagger-ui](https://github.com/swagger-api/swagger-ui) - Creates a user friendly view of your API

## How to use Swagger
A simple overview on how to use these tools can be found at the blog post below. This is highly recommended reading for creating your own api project:

http://robferguson.org/2015/06/06/build-your-microservices-api-with-swagger/


## Details on how tutorial-app API was created

#### Create a new swagger project for your application
```
swagger project create sample-api (choose express when prompted)
```
* this creates a 'sample-api' directory which is the root of your swagger project. You should also make this the root of your Bluemix app, i.e., your .git folder and manifest.yml files should be here

#### Start the swagger server
* Now you can start the app by running: `swagger project start sample-api` in your terminal

#### Swagger Editor
* In a new terminal tab run: `swagger project edit` to start creating your API. This command will load a new browser window where you can edit your swagger file

#### Update your code
* Edit your api/controllers/*.js files to match up with what you specified in your swagger file
* Edit your your app.js file.  For example:

```
'use strict';

var SwaggerExpress = require('swagger-express-mw');
var SwaggerUi = require('swagger-tools/middleware/swagger-ui');
var app = require('express')();

module.exports = app; // for testing

var config = {
  appRoot: __dirname // required config
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // add swagger-ui -- this creates the human readable version of your api by going to localhost:port/docs/
  app.use(SwaggerUi(swaggerExpress.runner.swagger));

  // install middleware
  swaggerExpress.register(app);

  var port = process.env.VCAP_APP_PORT || 3001; //make Bluemix happy
  app.listen(port);

  console.log('try this:\ncurl http://127.0.0.1:' + port + '/applications');
});

```
