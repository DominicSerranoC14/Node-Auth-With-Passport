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
const facebookStrategy = require('passport-facebook');
const User = require('./models/user');
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
/////////////////////////////////////////


/////////////////////////////////////////
//Local Strategy with passport
passport.use(new passportLocal.Strategy((username, password, done) => {
  //Need to query db and add user if doesnt exist
  //Grab user doc from db
  if ( password === password ) {
    done(null, { _id: username, name: username });
  } else {
    done(null, null);
  }
}));
/////////////////////////////////////////


/////////////////////////////////////////
//Facebook strategy with passport
passport.use(new facebookStrategy.Strategy({
    clientID: '633086850185459',
    clientSecret: '332f3383576956033155c07269129ec0',
    callbackURL: "http://localhost:3000/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'photos', 'email']
  },
  (accessToken, refreshToken, profile, done) => {
    User.findOne({ facebookId: profile.id }, function (err, user) {
      if (!user) {
        console.log("No user");
        User.create({
          facebookId: profile.id,
          username: profile.displayName,
          profilePic: profile.photos[0].value
        })
        .then((user) => done(null, user))
        .catch(err);
      } else {
        done(null, user);
      }
    });
  }));
/////////////////////////////////////////


/////////////////////////////////////////
//Serializing Functions
passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  //Query database or cache here
  done(null, {id: id});
});
/////////////////////////////////////////


/////////////////////////////////////////
//Routes
app.use(routes);

app.post('/', passport.authenticate('local'), (req, res) => {
  res.render('index', {
    isAuthenticated: req.isAuthenticated(),
    user: req.user
  });
});

app.get('/auth/facebook', passport.authenticate('facebook'));


app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  (req, res) => {
    console.log("Test req.body.facebookId", req.body.facebookId);
    console.log("Test req.user.facebookId", req.user.facebookId);
    res.render('index', {
      isAuthenticated: req.isAuthenticated(),
      user: req.user
    });
});

app.get('/logout', (req, res) => {
  //Logout function is enabled with passport
  req.logout();
  res.redirect('/');
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
