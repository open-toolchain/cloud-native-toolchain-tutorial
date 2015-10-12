/*jslint node: true */
'use strict';

module.exports = {
  getApplicationById: getApplicationById,
  getAllApplications: getAllApplications,
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

// sample data
var APPS = [{
  id: 1234,
  name: 'Open Toolchain',
  lastUpdated: '2015-07-10T14:48:00',
  status: 'online',
}, {
  id: 1235,
  name: 'BizDevOps',
  lastUpdated: '2015-07-10T17:48:00',
  status: 'online',
}, {
  id: 1236,
  name: 'Deployment Advisor',
  lastUpdated: '2015-07-10T17:48:00',
  status: 'offline',
}, {
  id: 1237,
  name: 'Topology Analytics',
  lastUpdated: '2015-07-10T17:48:00',
  status: 'offline',
}, {
  id: 1238,
  name: 'Timeline Analytics',
  lastUpdated: '2015-07-10T18:48:00',
  status: 'online',
}, {
  id: 1239,
  name: 'Configuration Toolchain',
  lastUpdated: '2015-06-04T03:48:00',
  status: 'unknown',
}];
