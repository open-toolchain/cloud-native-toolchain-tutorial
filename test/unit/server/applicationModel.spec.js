/********************************************************** {COPYRIGHT-TOP} ****
 * Licensed Materials - Property of IBM
 *
 * (C) Copyright IBM Corp. 2014 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication, or
 * disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 ********************************************************* {COPYRIGHT-END} ****/
/*jshint expr: true*/

var path = require('path');
var appHome = path.join(process.cwd(), 'app');
global.appHome = appHome;

var rewire = require('rewire');
var chai = require('chai');
var expect = chai.expect;

chai.config.includeStack = false;

var rewire_revert = false;


describe('Application Model', function() {

  var applicationModel = rewire('../../../api/models/application');

  before(function() {
    // mock DB results using rewire
    applicationModel.__set__('APPS', [{
      id: 8888,
      name: 'Cool Beans',
      lastUpdated: '2015-10-09T04:04:00',
      status: 'online'
    }, {
      id: 9999,
      name: 'My Test App',
      lastUpdated: '2015-11-09T14:14:00',
      status: 'online'
    }]);
  });

  describe("application model", function() {
    describe("#getAllApplications()", function() {
      it("respond with all applications", function() {
        var apps = applicationModel.getAllApplications();
        expect(apps.length).to.equal(2);
      });
    });

    describe("#getApplicationById", function() {
      it("respond with matching application", function() {
        var apps = applicationModel.getApplicationById(8888);
        expect(apps.id).to.equal(8888);
      });
    });
  });
});
