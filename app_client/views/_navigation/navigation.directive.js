(function() {
  angular
    .module('fitforlife')
    .directive('navigation', navigation);

  function navigation() {
    return {
      restrict: 'EA',
      templateUrl: '/views/_navigation/navigation.template.html',
      controller: 'navigationCtrl as navvm'
    };
  }
})();
