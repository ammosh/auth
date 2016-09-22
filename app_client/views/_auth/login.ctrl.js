(function() {
  angular
    .module('fitforlife')
    .controller('loginCtrl', loginCtrl);

  loginCtrl.$inject = ['$scope', '$location', '$timeout', 'authService', 'Notification'];

  function loginCtrl($scope, $location, $timeout, authService, notify) {
    var vm = this;
    vm.auth = {
      _email: '',
      _password: '',
    }
    vm.loading = false;
    vm.login = function() {
      vm.loading = true;
      authService.login(vm.auth)
        .then(function(response) {
          notify.success({
            message: response.data.message,
            title: response.statusText
          });
          $timeout(function() {
            $location.path('feed');
          }, 500);

        }).catch(function(err) {
          notify.error({
            message: err.data.message,
            title: err.statusText
          });
        }).finally(function() {
          vm.loading = false;
        });
    }
  }
})();
