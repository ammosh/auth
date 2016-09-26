(function() {
  angular
    .module('fitforlife')
    .controller('cropCtrl', cropCtrl);

  cropCtrl.$inject = ['$scope', '$uibModal', '$uibModalInstance', 'image'];

  function cropCtrl($scope, $uibModal, $uibModalInstance, image) {
    var vm = this;
    vm.image = image;
    $uibModalInstance.rendered.then(function() {
      if (!vm.image || !vm.image._file || !vm.image._file.type.match('image.*')) {
        console.log("not a valid image.");
        return;
      }
      vm.imageData = '';
      var reader = new FileReader();
      var image = new Image() //document.getElementById("imageContent");
      vm.canvas = document.getElementById("imageCanvas");
      vm.ctx = vm.canvas.getContext("2d");
      vm.cropper;
      image.onload = function() {
        vm.canvas.width = 300;
        vm.canvas.height = (300 / image.width) * image.height;
        vm.ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, vm.canvas.width, vm.canvas.height);
        vm.cropper = $('#imageCanvas').cropper();
      };
      reader.onload = function(e) {
        image.src = e.target.result;
      };
      reader.readAsDataURL(vm.image._file);
    });
    vm.selection = null;
    vm.setSize = function(img, selection) {
      vm.selection = selection;
    }
    vm.close = function(data) {
      var canvas = $('#imageCanvas').cropper('getCroppedCanvas');
      var image = canvas.toDataURL();
      $uibModalInstance.close(image);
      $('#imageCanvas').cropper('destroy');
    };
  }

})();
