var mysql = require("mysql");
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var db = {
    connectionLimit: 100, // number of connections to mysql
    host: (process.env.MYSQL_URL ? process.env.MYSQL_URL : "localhost"),
    user: (process.env.DB_USER ? process.env.DB_USER : "root"),
    password: (process.env.DB_PASS ? process.env.DB_PASS : "root"),
    database: (process.env.MYSQL_DB_NAME ? process.env.MYSQL_DB_NAME : "auth"),
    migrate: 'safe',
    debug: false
}
module.exports.db = db;

var pool = mysql.createPool(db);
module.exports.pool = pool;

module.exports.validPassword = function(user, password) {
    user = user ? user : {};
    var hash = crypto.pbkdf2Sync(password, user._salt, 1000, 64).toString('hex');
    return user._hash === hash;
};

module.exports.setPassword = function(user, password) {
    user = user ? user : {};
    user._salt = crypto.randomBytes(16).toString('hex');
    user._hash = crypto.pbkdf2Sync(password, user._salt, 1000, 64).toString('hex');
    return user;
};

module.exports.generateJwt = function(user) {
    user = user ? user : {};
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
    return jwt.sign({
        _userId: user._userId,
        _email: user._email,
        _name: user._name,
        _last_ip: user._last_ip,
        _exp: parseInt(expiry.getTime() / 1000),
    }, process.env.SECURE_KEY || "HDO0a3uIR4n1y2n7436wYn82PLjJgP2q");
};

module.exports.getHash = function(str) {
    return crypto.createHash('md5').update(str).digest('hex');
}