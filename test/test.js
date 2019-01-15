require('dotenv').config();

var assert = require('assert');
var expect = require('chai').expect;
var chai = require('chai');
var chaiHttp = require('chai-http');
var pool = require('../database');

var app = 'http://localhost:3000';

chai.use(chaiHttp);

describe('Routes', function() {
  describe('/product/all', function() {
    it('should return 401 when no api key is present in header', function(done) {
      chai.request(app)
          .get('/product/all')
          .end(function(err, res) {
            expect(res).to.have.status(401);
            done();
          });
    });

    it('should return 200 with ALL items when api key is sent in header', function(done) {
      chai.request(app)
          .get('/product/all')
          .set('X-API-KEY', 'atLgzBRp4eHn90Dntx393n2QPlzrVscO')
          .end(function(err, res) {
            expect(res).to.have.status(200);
            expect(res.body).with.lengthOf(6);
            done();
          });
    });

    it('should return 200 with ALL AVAILABLE items', function(done) {
      chai.request(app)
          .get('/product/all?available=true')
          .set('X-API-KEY', 'atLgzBRp4eHn90Dntx393n2QPlzrVscO')
          .end(function(err, res) {
            expect(res).to.have.status(200);
            expect(res.body).with.lengthOf(5);
            res.body.forEach(function(element) {
              expect(element['inventory_count']).to.not.equal(0);
            });
            done();
          });
    });

    it('should return 200 with ALL items when value for available query is invalid', function(done) {
      chai.request(app)
          .get('/product/all?available=invalid')
          .set('X-API-KEY', 'atLgzBRp4eHn90Dntx393n2QPlzrVscO')
          .end(function(err, res) {
            expect(res).to.have.status(200);
            expect(res.body).with.lengthOf(6);
            done();
          });
    });

    it('should return 200 with ALL items when query is invalid', function(done) {
      chai.request(app)
          .get('/product/all?invalid=true')
          .set('X-API-KEY', 'atLgzBRp4eHn90Dntx393n2QPlzrVscO')
          .end(function(err, res) {
            expect(res).to.have.status(200);
            expect(res.body).with.lengthOf(6);
            done();
          });
    });
  });

  
  describe('/product/:id', function() {
    it('should return 401 when no api key is present in header', function(done) {
      chai.request(app)
          .get('/product/1')
          .end(function(err, res) {
            expect(res).to.have.status(401);
            done();
          });
    });

    it('should return 200 with item when valid id is given', function(done) {
      chai.request(app)
          .get('/product/1')
          .set('X-API-KEY', 'atLgzBRp4eHn90Dntx393n2QPlzrVscO')
          .end(function(err, res) {
            expect(res).to.have.status(200);
            expect(res.body).with.lengthOf(1);
            expect(res.body[0]['title']).to.equal('T-Shirt');
            expect(res.body[0]['price']).to.equal(9.99);
            expect(res.body[0]['inventory_count']).to.equal(10);
            done();
          });
    });

    it('should return 200 with empty array when id doesn\'t exist', function(done) {
      chai.request(app)
          .get('/product/20')
          .set('X-API-KEY', 'atLgzBRp4eHn90Dntx393n2QPlzrVscO')
          .end(function(err, res) {
            expect(res).to.have.status(200);
            expect(res.body).with.lengthOf(0);
            done();
          });
    });

    it('should return 200 with empty array when id is invalid', function(done) {
      chai.request(app)
          .get('/product/asdf')
          .set('X-API-KEY', 'atLgzBRp4eHn90Dntx393n2QPlzrVscO')
          .end(function(err, res) {
            expect(res).to.have.status(200);
            expect(res.body).with.lengthOf(0);
            done();
          });
    });
  });


  describe('/purchase', function() {
    it('should return 401 when no api key is present in header', function(done) {
      chai.request(app)
          .post('/purchase')
          .send({id: 1})
          .end(function(err, res) {
            expect(res).to.have.status(401);
            done();
          });
    });

    it('should return 200 with success when valid data is sent', function(done) {
      chai.request(app)
          .post('/purchase')
          .set('X-API-KEY', 'atLgzBRp4eHn90Dntx393n2QPlzrVscO')
          .send({id: 2})
          .end(function(err, res) {
            expect(res).to.have.status(200);
            expect(res.body.success).to.equal(1);

            // pool.query('SELECT * from products WHERE id=2', function (error, results, fields) {
            //   expect(results[0].inventory_count).to.equal(4);
            //   done();
            // });

            done();
          });
    });

    it('should return 400 with not successful when invalid id is sent', function(done) {
      chai.request(app)
          .post('/purchase')
          .set('X-API-KEY', 'atLgzBRp4eHn90Dntx393n2QPlzrVscO')
          .send({id: 20})
          .end(function(err, res) {
            expect(res).to.have.status(400);
            expect(res.body.success).to.equal(0);

            // pool.query('SELECT * from products WHERE id=2', function (error, results, fields) {
            //   expect(results[0].inventory_count).to.equal(4);
            //   done();
            // });

            done();
          });
    });

    it('should return 400 with not successful when invalid key is sent in body', function(done) {
      chai.request(app)
          .post('/purchase')
          .set('X-API-KEY', 'atLgzBRp4eHn90Dntx393n2QPlzrVscO')
          .send({invalid: 1})
          .end(function(err, res) {
            expect(res).to.have.status(400);
            expect(res.body.success).to.equal(0);

            // pool.query('SELECT * from products WHERE id=2', function (error, results, fields) {
            //   expect(results[0].inventory_count).to.equal(4);
            //   done();
            // });

            done();
          });
    });

    it('should return 400 with not successful when invalid key and id is sent in body', function(done) {
      chai.request(app)
          .post('/purchase')
          .set('X-API-KEY', 'atLgzBRp4eHn90Dntx393n2QPlzrVscO')
          .send({invalid: 'invalid'})
          .end(function(err, res) {
            expect(res).to.have.status(400);
            expect(res.body.success).to.equal(0);

            // pool.query('SELECT * from products WHERE id=2', function (error, results, fields) {
            //   expect(results[0].inventory_count).to.equal(4);
            //   done();
            // });

            done();
          });
    });

    it('should return 400 with not successful when item with no inventory is purchased', function(done) {
      chai.request(app)
          .post('/purchase')
          .set('X-API-KEY', 'atLgzBRp4eHn90Dntx393n2QPlzrVscO')
          .send({id: 6})
          .end(function(err, res) {
            expect(res).to.have.status(400);
            expect(res.body.success).to.equal(0);

            // pool.query('SELECT * from products WHERE id=2', function (error, results, fields) {
            //   expect(results[0].inventory_count).to.equal(4);
            //   done();
            // });

            done();
          });
    }); 
  });
});
