var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({message: "Hello from the server!"});
});

router.get('/:linkedin/:company', (req, res, next) => {
  console.log('hello from server');
  const { linkedin, company } = req.params;
  res.json({ linkedin, company });
});

module.exports = router;
