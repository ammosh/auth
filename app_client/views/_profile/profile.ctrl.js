(function() {
  angular
    .module('fitforlife')
    .controller('profileCtrl', profileCtrl);

  profileCtrl.$inject = ['$scope', '$location', '$uibModal', 'authService', 'Notification'];

  function profileCtrl($scope, $location, $uibModal, authService, notify) {
    var vm = this;
    vm.user = {
      _bio: ''
    }
    vm.selectPic = function() {
      $('#profilePic').click();
    }
    $scope.$watch('vm.profilePic', function() {
      if (vm.profilePic) {
        var modalInstance = $uibModal.open({
          animation: true,
          backdrop: 'static',
          keyboard: false,
          templateUrl: '/views/_crop/crop.view.html',
          controller: 'cropCtrl as vmd',
          resolve: {
            image: function() {
              return {
                _file: vm.profilePic
              };
            }
          }
        });
        modalInstance.result.then(function(data) {
          if (data) {
            $("#userPic").attr("src", data);
          }
          $('#profilePic').val('');
        }, function() {

        });
      }
    });
  }
})();
