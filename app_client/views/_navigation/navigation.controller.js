(function() {

  angular
    .module('fitforlife')
    .controller('navigationCtrl', navigationCtrl);

  navigationCtrl.$inject = ['$location', 'authService'];

  function navigationCtrl($location, authService) {
    var vm = this;

    vm.checkLogin = function() {
      return authService.isLoggedIn()
    };
    vm.logout = function() {
      authService.logout();
      $location.path('login');
    }
    vm.currentUser = authService.currentUser();
  }

})();
