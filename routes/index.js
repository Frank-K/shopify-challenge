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

/* GET home page. */
router.get('/', function(req, res, next) {
  pool.query('SELECT * from products', function (error, results, fields) {
    res.send(results);
  });
});

module.exports = router;
