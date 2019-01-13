var express = require('express');
var pool = require('../database');
var router = express.Router();

/* GET all products. */
router.get('/product/all?', function(req, res, next) {
  if (req.query.available === 'true') {
    pool.query('SELECT * from products WHERE inventory_count > 0', function (error, results, fields) {
      res.send(results);
    });
  } else {
    pool.query('SELECT * from products', function (error, results, fields) {
      res.send(results);
    });
  }
});

/* GET specific product based on id provided. */
router.get('/product/:id', function(req, res, next) {
  pool.query('SELECT * from products WHERE id = ?', [req.params.id], function (error, results, fields) {
    res.send(results);
  });
});

/* POST a request to purchase a specific item in the store. */
router.post('/purchase', function(req, res, next) {

});

module.exports = router;
