/*jslint node: true */
'use strict';

module.exports = {
  applications: applications,
};

/* return a single application object */
function getApplicationById(appId) {

  var foundApp = {};

  for (var i = 0; i < APPS.length; i++) {
    if (APPS[i].id == appId) {
      foundApp = APPS[i];
    }
  }

  return foundApp;
}

function getAllApplications() {
  return APPS;
}

/* return a list of applications */
function applications(req, res) {
  // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
  if (req.swagger.params && req.swagger.params.appId) {
    var appId = req.swagger.params.appId.value;
    var appData = getApplicationById(appId);

    res.json(appData);
  } else {
    var apps = getAllApplications();
    res.json(apps);
  }
}

// sample data
var APPS = [
  {
    id: 1234,
    name: 'Open Toolchain',
    lastUpdated: '2015-07-10T14:48:00',
    status: 'online',
  },
  {
    id: 1235,
    name: 'BizDevOps',
    lastUpdated: '2015-07-10T17:48:00',
    status: 'online',
  },
  {
    id: 1236,
    name: 'Deployment Advisor',
    lastUpdated: '2015-07-10T17:48:00',
    status: 'offline',
  },
  {
    id: 1237,
    name: 'Topology Analytics',
    lastUpdated: '2015-07-10T17:48:00',
    status: 'offline',
  },
  {
    id: 1238,
    name: 'Timeline Analytics',
    lastUpdated: '2015-07-10T18:48:00',
    status: 'online',
  },
  {
    id: 1239,
    name: 'Configuration Toolchain',
    lastUpdated: '2015-06-04T03:48:00',
    status: 'unknown',
  },
];
