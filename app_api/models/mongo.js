var mongoose = require('mongoose');
var gracefulShutdown;
var dbURI = process.env.MONGOLAB_URI ? process.env.MONGODB_URI : 'mongodb://localhost:27017/fit4life';
mongoose.connect(dbURI);

mongoose.connection.on('connected', function() {
  console.log('mongoose connected to ' + dbURI);
});
mongoose.connection.on('error', function(err) {
  console.log('mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function() {
  console.log('mongoose disconnected');
});

gracefulShutdown = function(msg, callback) {
  mongoose.connection.close(function() {
    console.log('mongoose disconnected through ' + msg);
    callback();
  });
};

process.once('SIGUSR2', function() {
  gracefulShutdown('nodemon restart', function() {
    process.kill(process.pid, 'SIGUSR2');
  });
});

process.on('SIGINT', function() {
  gracefulShutdown('app termination', function() {
    process.exit(0);
  });
});

process.on('SIGTERM', function() {
  gracefulShutdown('Heroku app termination', function() {
    process.exit(0);
  });
});


require('./users');
