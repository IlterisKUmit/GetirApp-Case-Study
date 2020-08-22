var express = require('express');
var router = express.Router();

/* Redirect to app page. */
router.get('/', function(req, res, next) {
  res.redirect('/getir');
});

module.exports = router;
