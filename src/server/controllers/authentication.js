const User = require('../models/user');
const jwt = require('jwt-simple');
const config = require('../config');


function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);//sub = subject == who this belongs to
}

exports.login = function(req, res, next) {
  //user already logged in and passport assigns user to req in done callback
  res.status(200).json({ token: tokenForUser(req.user) }).end();
}

//request piped to here
exports.signup = function(req, res, next){
  const email = req.body.email;
  const password = req.body.password;
  if(!email || !password) {
    return res.status(422).send({ error: 'You must supply email or password'});
  }
  User.findOne({ email: email }, function(err, existingUser) {
    if(err){ return next(err); }
    if(existingUser) {
      return res.status(422).send({ error: 'Email is in use'});
    }
    const user = new User({//in memeory db record
      email: email,
      password: password
    });
    user.save(function(err) {
      if(err) { return next(err); }
      res.json({token: tokenForUser(user)});
    });
  });
}
