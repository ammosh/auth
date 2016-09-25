(function() {

  angular
    .module('fitforlife')
    .service('authService', authService);

  authService.$inject = ['$http', '$window', '$localStorage'];

  function authService($http, $window, $localStorage) {

    var register = function(user) {
      return $http.post('/api/register', user);
    }

    var login = function(user) {
      return $http.post('/api/login', user);
    }

    var saveToken = function(token) {
      $localStorage.fitforlife_token = token;
    };

    var getToken = function() {
      return $localStorage.fitforlife_token;
    };

    var isLoggedIn = function() {
      var token = getToken();
      var payload;
      if (token) {
        payload = token.split('.')[1];
        payload = $window.atob(payload);
        payload = JSON.parse(payload);
        return payload.exp > Date.now() / 1000;
      } else {
        return false;
      }
    };

    var currentUser = function() {
      if (isLoggedIn()) {
        var token = getToken();
        var payload = token.split('.')[1];
        payload = $window.atob(payload);
        payload = JSON.parse(payload);
        return {
          _email: payload._email,
          _name: payload._name
        };
      }
    };

    logout = function() {
      $localStorage.fitforlife_token = null;
    };


    return {
      register: register,
      login: login,
      saveToken: saveToken,
      getToken: getToken,
      isLoggedIn: isLoggedIn,
      currentUser: currentUser,
      logout: logout
    };
  }
})();
