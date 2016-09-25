(function() {
  angular
    .module('fitforlife')
    .controller('dialogCtrl', dialogCtrl);

  dialogCtrl.$inject = ['$uibModal', '$uibModalInstance', 'info'];

  function dialogCtrl($uibModal, $uibModalInstance, info) {
    console.log(info);
    var vm = this;
    vm.info = info ? info : {};
    vm.close = function(data) {
      $uibModalInstance.close(data);
    };
  }
})();
