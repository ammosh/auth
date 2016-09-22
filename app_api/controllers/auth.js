var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.register = function(req, res, next) {
  if (!req.body._name)
    return next(new Error("name is missing."));

  if (!req.body._email)
    return next(new Error("email is missing."));

  if (!req.body._password)
    return next(new Error("password is missing."));

  var user = new User();
  user._email = req.body._email;
  user._update_date = new Date();
  user._reg_date = new Date();

  user._personal_info = user._personal_info ? user._personal_info : {};
  user._personal_info._name = req.body._name;
  user._personal_info._bio = '';

  user.setPassword(req.body._password);

  user.save(function(err) {
    if (err) {
      return next(err);
    }
    var token = user.generateJwt();
    return res.status(200).json({
      "token": token,
      "message": "you registered successfully."
    });
  });
}


module.exports.login = function(req, res, next) {

  if (!req.body._email)
    return next(new Error("email is missing."));

  if (!req.body._password)
    return next(new Error("password is missing."));

  passport.authenticate('local', function(err, user, info) {
    var token;
    if (err) {
      return next(err);
    }
    if (user) {
      token = user.generateJwt();
      res.status(200);
      res.json({
        "token": token,
        "message": "you logged is successfully."
      });
    } else {
      return res.status(401).json(info);
    }
  })(req, res);
};
