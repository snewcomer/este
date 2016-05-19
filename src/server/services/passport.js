import passport from 'passport';
import User from '../models/user';
import config from '../config';
import LocalStrategy from 'passport-local';
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const localOptions =  { 'usernameField': 'email' };
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {//assumes username and password
  //verify username/password and call done with user otherwise call false 
  User.findOne({ email: email }, function(err, user) {
    if (err) { return done(err); }
    if (!user) { return done(null, false); }

    //compare passwords
    user.comparePassword(password, function(err, isMatch) {
      if (err) { return done(err); }
      if (!isMatch) { return done(null, false); }
      return done(null, user);//puts user on req object
    }) 
  });
});

const jwtOptions = { 
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {//payload - decoded jwt token, done callback depending on if we are successfull
  //see if user id in payload exists in db, call done if none exists
  User.findById(payload.sub, function(err, user) {
    if (err) { return done(err, false); }

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

passport.use(jwtLogin);
passport.use(localLogin);

