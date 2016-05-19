const User = require('../models/user');
const jwt = require('jwt-simple');
const config = require('../config');


function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);//sub = subject == who this belongs to
}

exports.login = function(req, res, next) {
  //user already logged in and passport assigns user to req in done callback
  res.send({ token: tokenForUser(req.user) });
}

