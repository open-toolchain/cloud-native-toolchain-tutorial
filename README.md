# DevOps Tutorial Application

[DevOps](https://en.wikipedia.org/wiki/DevOps) promises to improve both development and operational efficiencies while enhancing partnership with customers.
More than doing the same things faster, DevOps relies on establishing a good delivery pipeline spanning from ideation to monitoring.
The DevOps Tutorial Application Project can get you started. It will create a new project in IBM DevOps, build it using the latest tools, deploy it to IBM Bluemix, and lay the foundation for test, scale and operations.

The application is a simple Node.js [Express 4](http://expressjs.com/) sample you can extend to implement your new offering today.
The various stages of the pipeline may require ids, trials, or subscriptions to independent service offering.
Each tool included an explanation of how to get and use IDs for each service.

Create your new IBM DevOps project now!

## Build

  - Use IDS to build.
  - Use IBM DevOps Services projects to build and deploy the application to the IBM Bluemix platform
  - Use GitHub for source control and code review
  - Use OSS linting tools
  - Use karma and PhantomJS for unit testing
  - Use SauceLabs for functional testing
  - Build and deploy to IBM Bluemix using the IDS pipeline and blue-green deployments on IBM Bluemix
  - Use SpeedCurve for performance testing


## Deploy

[![Deploy to Bluemix](https://bluemix.net/deploy/button.png)](https://bluemix.net/deploy?repository=https://github.com/oneibmcloud/devops-tutorial-1.git)

  - Edit the manifest.yml file in your ./bluemix directory.
  - Your Bluemix pipeline will need to have a Build and Deploy phase.  
  - The build phase should have a script that just does an `npm install`:

  ```
  #!/bin/bash
  npm install
  ```


## Collaborate

  - Use IDS Track and Plan for planning releases and tracking work


## Scale

  - Use Fastly to boost performance
  - Use Load Impact for site load test
  - Use [New Relic](docs/NewRelic.md) to monitor the site


## Accessing your api
  You can use curl from your local machine or just go to any of these links from your browser

    - https://[your-app-name].mybluemix.net/
    - https://[your-app-name].mybluemix.net/applications/ - test a get request to /applications/
    - https://[your-app-name].mybluemix.net/applications/1234 - test a get request to /applications/ with a parameter of 1234


## View the online documentation for your application
  - https://[your-app-name].mybluemix.net/docs


## References
  - https://github.com/swagger-api/swagger-node
  - http://robferguson.org/2015/06/06/build-your-microservices-api-with-swagger/
  - https://community.apigee.com/questions/4877/getting-started-with-swagger-node-apigee-127-and-s.html
