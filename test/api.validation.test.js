'use strict';

var app = require('../app'),
  request = require('supertest'),
  expect = require('chai').expect,
  sinon = require('sinon');

describe('File Converter API Validation Tests', function () {
  describe('#POST /convert/pdf with no body', function () {
    it('should get 400 response and a Bad Request message', function (done) {
      request(app)
        .post('/convert/pdf')
        .send()
        .expect(400)
        .end(function (err, res) {
          if (err) {
            done(err);
          }
          expect(res.statusCode).to.equal(400);
          expect(res.text).equals('Bad Request');
          done();
        });
    });
  });

  describe('#POST /convert/pdf with no file array', function () {
    it('should get 400 response and a Bad Request message', function (done) {
      request(app)
        .post('/convert/pdf')
        .send({
          fileName: 'index.html',
          data:
            'PGh0bWw+CiAgPGhlYWQ+CiAgICA8dGl0bGU+VGVzdDE8L3RpdGxlPgogICAgPHN0eWxlIHR5cGU9InRleHQvY3NzIj4KICAgICAgPC',
        })
        .expect(400)
        .end(function (err, res) {
          if (err) {
            done(err);
          }
          expect(res.statusCode).to.equal(400);
          expect(res.text).equals('Bad Request');
          done();
        });
    });
  });

  describe('#POST /convert/pdf with no file name', function () {
    it('should get 400 response and a Bad Request message', function (done) {
      request(app)
        .post('/convert/pdf')
        .send({
          fileName: '',
          data:
            'PGh0bWw+CiAgPGhlYWQ+CiAgICA8dGl0bGU+VGVzdDE8L3RpdGxlPgogICAgPHN0eWxlIHR5cGU9InRleHQvY3NzIj4KICAgICAgPC',
        })
        .expect(400)
        .end(function (err, res) {
          if (err) {
            done(err);
          }
          expect(res.statusCode).to.equal(400);
          expect(res.text).equals('Bad Request');
          done();
        });
    });
  });

  describe('#POST /convert/pdf with no file data', function () {
    it('should get 400 response and a Bad Request message', function (done) {
      request(app)
        .post('/convert/pdf')
        .send({
          fileName: 'index.html',
          data: '',
        })
        .expect(400)
        .end(function (err, res) {
          if (err) {
            done(err);
          }
          expect(res.statusCode).to.equal(400);
          expect(res.text).equals('Bad Request');
          done();
        });
    });
  });
});
