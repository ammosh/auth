(function() {
  angular
    .module('fitforlife')
    .controller('profileCtrl', profileCtrl);

  profileCtrl.$inject = ['$scope', '$location', '$uibModal', 'authService', 'Notification'];

  function profileCtrl($scope, $location, $uibModal, authService, notify) {
    var vm = this;
    vm.user = {
      _name: '',
      _email: '',
      _password: '',
      _confirm_password: ''
    }


    $('#registration').validate({
      rules: {
        email: {
          required: true,
          email: true,
          maxlength: 100
        },
        name: {
          required: true,
          minlength: 2,
          maxlength: 40
        },

        password: {
          required: true,
          minlength: 8,
          maxlength: 25
        },
        confirm_password: {
          required: true,
          minlength: 8,
          maxlength: 25,
          equalTo: "#password"
        }
      }
    });


    vm.loading = false;
    vm.register = function() {
      if (!$('#registration').valid()) return;
      vm.loading = true;
      authService.register(vm.user)
        .then(function(response) {
          console.log(response);
          notify.success({
            message: response.data.message,
            title: response.statusText
          });

          var modalInstance = $uibModal.open({
            animation: true,
            backdrop: 'static',
            keyboard: false,
            templateUrl: '/views/_prompts/dialog.view.html',
            controller: 'dialogCtrl as vmd',
            size: 'sm',
            resolve: {
              info: function() {
                return {
                  _title: 'Awesome...',
                  _message: 'You registered successfully. Please login to get access.',
                  _confirm_label : "Let's Start!"
                };
              }
            }
          });
          modalInstance.result.then(function(data) {
            $location.path('login');
          }, function() {

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
