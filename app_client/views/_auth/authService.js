(function() {

  angular
    .module('fitforlife')
    .service('authService', authService);

  authService.$inject = ['$http'];

  function authService($http) {

    var register = function(user) {
      return $http.post('/api/register', user);
    }

    var login = function(user) {
      return $http.post('/api/login', user);
    }

    return {
      register: register,
      login: login
    };
  }
})();
