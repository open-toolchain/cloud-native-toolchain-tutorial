/*jslint node: true */
'use strict';

var applicationModel = require ('../models/application');

module.exports = {
  applications: applications,
};

/* return a list of applications */
function applications(req, res) {
  // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
  if (req.swagger.params && req.swagger.params.appId) {
    var appId = req.swagger.params.appId.value;
    var appData = applicationModel.getApplicationById(appId);

    res.json(appData);
  } else {
    var apps = applicationModel.getAllApplications();
    res.json(apps);
  }
}
