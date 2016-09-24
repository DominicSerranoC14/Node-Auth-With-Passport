'use strict';

const { Router } = require('express');
const router = Router();
const Test = require('../models/test');
/////////////////////////////////////////


/////////////////////////////////////////
//Routes
router.get('/', (req, res) => {
  res.render('index');
});

// router.post('/', (req, res) => {
//   // Test.create(req.body)
//   // .then(() => res.render('index', {msg: 'Test message was sent to testdb -- check mongo shell'}))
//
// });
/////////////////////////////////////////


module.exports = router;
