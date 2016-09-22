var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

passport.use(new LocalStrategy({
    usernameField: '_email',
    passwordField: '_password',
  },
  function(username, password, done) {
    User.findOne({
      email: username
    }, function(err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, {
          message: 'user or password is wrong.'
        });
      }
      if (!user.validPassword(password)) {
        return done(null, false, {
          message: 'user or password is wrong.'
        });
      }
      return done(null, user);
    });
  }
));
