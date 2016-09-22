(function() {
  angular
    .module('fitforlife')
    .controller('registerCtrl', registerCtrl);

  registerCtrl.$inject = ['$scope', '$location', 'authService', 'Notification'];

  function registerCtrl($scope, $location, authService, notify) {
    var vm = this;
    vm.user = {
      _name: '',
      _email: '',
      _password: '',
      _confirm_password: ''
    }
    vm.loading = false;
    vm.register = function() {
      vm.loading = true;
      authService.register(vm.user)
        .then(function(response) {
          console.log(response);
          notify.success({
            message: response.data.message,
            title: response.statusText
          });
          var dialog = document.querySelector('dialog');
          dialog.showModal();
          dialog.querySelector('.close-modal').addEventListener('click', function() {
            dialog.close();            
          });

        }).catch(function(err) {
          console.log(err);
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
