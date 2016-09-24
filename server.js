'use strict';

const express = require('express');
const app = express();
const routes = require('./routes/');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const RedisStore = require('connect-redis')(expressSession);
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
app.use(expressSession({
  store: new RedisStore(),
  secret: 'node-auth-with-passport',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new passportLocal.Strategy((username, password, done) => {
  //Grab user doc from db
  if ( password === password ) {
    done(null, { id: username, name: username });
  } else {
    done(null, null);
  }
}));

passport.serializeUser((user, done) => {
  done(user.id);
});

passport.deserializeUser((id, done) => {
  //Query database or cache here
  done({id: id, id: name});
});
/////////////////////////////////////////


/////////////////////////////////////////
//Routes
app.use(routes);

app.post('/', passport.authenticate('local'), (req, res) => {

  console.log("Test req.user", req.user);

  res.render('index', {
    isAuthenticated: req.isAuthenticated(),
    user: req.user
  })

});

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
