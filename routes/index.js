var express = require('express');
var mysql = require('mysql');
require('dotenv').config();
var router = express.Router();

var pool  = mysql.createPool({
  connectionLimit : 10,
  host            : process.env.DB_HOST,
  user            : process.env.DB_USER,
  password        : process.env.DB_PASS,
  database        : process.env.DB
});

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

module.exports = router;
