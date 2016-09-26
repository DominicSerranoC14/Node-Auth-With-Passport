'use strict';

const { Router } = require('express');
const router = Router();
const Test = require('../models/user');
/////////////////////////////////////////


/////////////////////////////////////////
//Routes
router.get('/', (req, res) => {
  res.render('index');
});
/////////////////////////////////////////


module.exports = router;
