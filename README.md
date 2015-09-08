#DevOps Tutorial Application
This is a sample application that implements Swagger API and a handful useful  test frameworks.
<More detail needed here>

# Swagger Notes
The [status page app]( https://tutorial-app.mybluemix.net/) has a companion app called [tutorial-app-api]( https://tutorial-app-api.mybluemix.net/)  

To look at the code for this project you can create a new directory and then run
```
 git clone https://hub.jazz.net/git/oneibmcloud/tutorial-app-api
```

To create the API we used Swagger and some Swagger tools.

* [Swagger](http://swagger.io) - a specification for creating a REST API
* [swagger-node](https://github.com/swagger-api/swagger-node) - A Node module for using Swagger
* [swagger-editor](https://github.com/swagger-api/swagger-editor) - A web based UI for editing a swagger file
* [swagger-ui](https://github.com/swagger-api/swagger-ui) - Creates a user friendly view of your API

## How to use Swagger
A simple overveiw on how to use these tools can be used can be found at this blog post. This is highly recommended reading for creating your own api project:

http://robferguson.org/2015/06/06/build-your-microservices-api-with-swagger/


## Details on how tutorial-app-api was created

#### Create a new swagger project for your application
```
swagger project create status-api (choose express when prompted)
```
* this creates a 'status-api' directory which is the root of your swagger projec. You should also make this the root of your Bluemix app, i.e., your .git folder and manifest.yml files should be here

#### Start the swagger server
* Now you can start the app by running: `swagger project start status-api` in your terminal

#### Swagger Editor
* In a new terminal tab run: `swagger project edit` to start creating your API. This command will load a new browser window where you can edit your swagger file

#### Update your code
* Edit your api/controllers/*.js file to match up with what you specified in your swagger file
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

#### Deploy to Bluemix
* Create a manifest.yml file in your root directory (in the same directory as your package.json).  Example:

```
applications:
- disk_quota: 1024M
  host: status-staging-api
  name: status-staging-api
  command: node app.js
  path: .
  domain: oneibmcloud.com
  instances: 4
  memory: 256M
  env:
    NODE_ENV: staging
```
* your Bluemix pipeline will need to have a Build and Deploy phase.  
  * The build phase should have a script that just does an npm install:

  ```
  #!/bin/bash
  npm install
  ```

#### Accessing your api
* You can use curl from your local machine or just go to any of these links from your browser
  * https://tutorial-app-api.mybluemix.net/
  * https://tutorial-app-api.mybluemix.net/applications/ - test a get request to /applications/
  * https://tutorial-app-api.mybluemix.net/applications/1234 - test a get request to /applications/ with a parameter of 1234

#### View the online documentation for your application
* https://tutorial-app-api.mybluemix.net/docs

#### Reference
* https://github.com/swagger-api/swagger-node
* http://robferguson.org/2015/06/06/build-your-microservices-api-with-swagger/
* https://community.apigee.com/questions/4877/getting-started-with-swagger-node-apigee-127-and-s.html
