var passport = require('passport');
var conCtrl = require('../config/mysql');
var crypto = require('crypto');
var pool = conCtrl.pool;

module.exports.register = function(req, res, next) {
    if (!req.body._name)
        return next(new Error("name is missing."));

    if (!req.body._email)
        return next(new Error("email is missing."));

    if (!req.body._password)
        return next(new Error("password is missing."));

    var auth = {};
    auth = conCtrl.setPassword(auth, req.body._password);

    var user = {
        _name: req.body._name,
        _email: req.body._email.toLowerCase(), // no case sensitive for email
        _security_question: req.body._security_question || '',
        _security_answer: req.body._security_answer ? conCtrl.getHash(req.body._security_answer.toLowerCase()) : '', // no case sensitive for securoty answer
        _salt: auth._salt,
        _hash: auth._hash,
        _latitude: req.body._latitude,
        _longitude: req.body._longitude,
        _bio: req.body._bio,
        _last_ip : (req.header('x-forwarded-for') ? req.header('x-forwarded-for').split(',')[0] : null) || req.connection.remoteAddress,
        _last_date: new Date()
    };

    pool.getConnection(function(err, connection) {
        if (err) {
            return next(err);
        }
        connection.query('insert into users set ?', user, function(err, result) {
            if (err) {
                connection.release();
                return next(err);
            };
            connection.release();
            if (result && result.insertId) {
                return res.status(200).json({
                    "userId": result.insertId,
                    "message": "you registered successfully."
                });
            } else {
                return next(new Error("user registration failed."));
            }
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
            token = conCtrl.generateJwt(user);
            res.status(200);
            res.json({
                "token": token,
                "message": "you logged in successfully."
            });
        } else {
            return res.status(401).json(info);
        }
    })(req, res);
};
