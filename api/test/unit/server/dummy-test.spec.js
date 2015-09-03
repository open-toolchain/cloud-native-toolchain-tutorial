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

describe('my test suite', function() {
  beforeEach(function() {

  });

  afterEach(function() {

  });

  it('test case', function(done) {
    expect(true).to.be.equal(true);
    done();
  });

});
