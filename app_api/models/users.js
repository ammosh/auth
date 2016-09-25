var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var ObjectId = mongoose.Types.ObjectId;

var userSchema = new mongoose.Schema({
  _email: {
    type: String,
    unique: true,
    required: true
  },
  _personal_info: {
    _name: {
      type: String,
      required: true
    },
    _bio: {
      type: String
    }
  },
  _instructor : {
    type: Boolean,
    default: false
  },
  _reg_date: {
    type: Date,
    default: Date.now
  },
  _update_date: {
    type: Date,
    default: Date.now
  },
  hash: {
    type: String,
    required: true
  },
  salt: {
    type: String,
    required: true
  }
});

userSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

userSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  return this.hash === hash;
};

userSchema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);
  return jwt.sign({
    _id: this._id,
    email: this.email,
    name: this.name,
    roles: this.roles,
    exp: parseInt(expiry.getTime() / 1000),
  }, process.env.FIT4LIFETOGO || 'EC8C6BA79C398');
};

mongoose.model('User', userSchema);
