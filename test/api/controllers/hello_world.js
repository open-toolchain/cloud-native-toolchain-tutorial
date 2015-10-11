var should = require('should');
var request = require('supertest');
var server = require('../../../app');

process.env.A127_ENV = 'test';

describe('controllers', function() {

  describe('hello_world', function() {

    describe('GET /hello', function() {

      it('should return a default string', function(done) {

        request(server)
          .get('/hello')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            should.not.exist(err);

            res.body.should.eql('Hello, stranger!');

            done();
          });
      });

      it('should accept a name parameter', function(done) {

        request(server)
          .get('/hello')
          .query({
            name: 'Scott'
          })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            should.not.exist(err);

            res.body.should.eql('Hello, Scott!');

            done();
          });
      });
    });
  });
  describe('api', function() {

    describe('GET /applications', function() {
      it('should return a list of applications', function(done) {

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
    });

    describe('GET /applications/:id', function() {
      it('Should find an application by id', function(done) {

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
});
