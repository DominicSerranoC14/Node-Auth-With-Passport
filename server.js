'use strict';

const express = require('express');
const app = express();
const routes = require('./routes/');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const { connect } = require('./db/database.js');
const passport = require('passport');
const passportLocal = require('passport-local');
/////////////////////////////////////////


/////////////////////////////////////////
//Middle ware
app.set('view engine', 'pug');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(passport.initialize());
app.use(passport.session());
/////////////////////////////////////////


/////////////////////////////////////////
//Routes
app.use(routes);
/////////////////////////////////////////


/////////////////////////////////////////
connect()
  .then(() => {
    app.listen(port, () => {
      console.log(`Express server listening on port ${port}`);
    });
  })
  .catch(console.error);
/////////////////////////////////////////
