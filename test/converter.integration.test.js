'use strict';

var app = require('../app'),
  request = require('supertest'),
  expect = require('chai').expect,
  sinon = require('sinon'),
  testHtmlFiles = require('./testHtmlFiles');

const htmlFiles = testHtmlFiles.getFiles();

describe('File Converter API endpoint Integration Tests', function () {
  describe('#POST /convert/pdf', function () {
    it('should get OK response and a pdf array', function (done) {
      request(app)
        .post('/convert/pdf')
        .send(htmlFiles)
        .expect(200)
        .end(function (err, res) {
          if (err) {
            done(err);
          }
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.exist;
          expect(res.body).to.be.an('array');
          expect(res.body.length).to.equal(3);
          expect(res.body[0].fileName).to.exist;
          expect(res.body[0].data).to.exist;
          done();
        });
    });
  });
});
