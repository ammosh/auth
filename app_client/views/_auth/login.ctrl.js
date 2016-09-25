(function() {
  angular
    .module('fitforlife')
    .controller('loginCtrl', loginCtrl);

  loginCtrl.$inject = ['$scope', '$location', '$localStorage', '$timeout', 'authService', 'Notification'];

  function loginCtrl($scope, $location, $localStorage, $timeout, authService, notify) {
    var vm = this;
    vm.user = {
      _email: '',
      _password: '',
    }


    $('#login').validate({
      rules: {
        email: {
          required: true,
          email: true,
          maxlength: 100
        },
        password: {
          required: true,
          minlength: 8,
          maxlength: 25
        }
      }
    });


    vm.loading = false;
    vm.login = function() {
      if (!$('#login').valid()) return;
      vm.loading = true;
      authService.login(vm.user)
        .then(function(response) {
          notify.success({
            message: response.data.message,
            title: response.statusText
          });
          authService.saveToken(response.data.token);
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
