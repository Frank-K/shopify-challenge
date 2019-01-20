var express = require('express');
var pool = require('../database');
var router = express.Router();

/* GET all products. */
router.get('/product/all?', function(req, res, next) {
  if (req.query.available === 'true') {
    pool.query(`SELECT * from ${process.env.DB_TABLE} WHERE inventory_count > 0`, function (error, results, fields) {
      res.send(results);
    });
  } else {
    pool.query(`SELECT * from ${process.env.DB_TABLE}`, function (error, results, fields) {
      res.send(results);
    });
  }
});

/* GET specific product based on id provided. */
router.get('/product/:id', function(req, res, next) {
  pool.query(`SELECT * from ${process.env.DB_TABLE} WHERE id = ?`, [req.params.id], function (error, results, fields) {
    res.send(results[0]);
  });
});

/* POST a request to purchase a specific item in the store. */
router.post('/purchase', function(req, res, next) {
  pool.query(`UPDATE ${process.env.DB_TABLE} SET inventory_count = inventory_count - 1 WHERE id = ?`, [req.body.id], function (error, results, fields) {
    if (error || results.affectedRows == 0) {
      return res.status(400).json({'success': 0});
    }

    return res.json({'success': 1});
  });
});

module.exports = router;
