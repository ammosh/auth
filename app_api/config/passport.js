var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var conCtrl = require('./mysql');
var pool = conCtrl.pool; // mysql pool


passport.use(new LocalStrategy({
        usernameField: '_email',
        passwordField: '_password',
    },
    function(username, password, done) {
        pool.getConnection(function(err, connection) {
            if (err) {
                connection.release();
                return done(err);
            }
            connection.query('select * from users where _email = ?', [username], function(err, users) {
                connection.release();
                if (err) {
                    return done(err);
                }
                if (!users || users.length == 0) {
                    return done(null, false, {
                        message: 'usernme or password is wrong.'
                    });
                } else if (users.length == 1) {
                    if (!conCtrl.validPassword(users[0], password)) {
                        return done(null, false, {
                            message: 'usernme or password is wrong.'
                        });
                    }
                    // if credentials are correct, return the user object
                    return done(null, users[0]);
                } else {
                    return done(null, false, {
                        message: 'something went wrong.'
                    });
                }
            });
        });

    }
));