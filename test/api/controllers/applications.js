var should = require('should');
var request = require('supertest');
var server = require('../../../app');

process.env.A127_ENV = 'test';

describe('controller/applications', function() {

  describe('GET /', function() {

    it('should return a default string', function(done) {

      request(server)
        .get('/applications')
        .set('Accept', 'application/json')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          should.not.exist(err);
          res.body.length.should.eql(6);
          done();
        });
    });

    it('should accept an ID parameter', function(done) {

      request(server)
        .get('/applications/1234')
        .set('Accept', 'application/json')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          should.not.exist(err);
          res.body.name.should.eql('Open Toolchain');
          done();
        });
    });
  });
});
