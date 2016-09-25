angular.module('fitforlife', ['ngRoute', 'ngAnimate', 'ngSanitize', 'ngTouch', 'ui.bootstrap', 'ngMessages', 'angular-ladda', 'ui-notification', 'ngStorage']);

function config($routeProvider, $locationProvider, NotificationProvider) {
  NotificationProvider.setOptions({
    delay: 2000,
    startTop: 20,
    startRight: 10,
    verticalSpacing: 20,
    horizontalSpacing: 20,
    positionX: 'right',
    positionY: 'bottom'
  });

  $routeProvider
    .when('/register', {
      templateUrl: 'views/_auth/register.view.html',
      controller: 'registerCtrl',
      controllerAs: 'vm'
    }).when('/login', {
      templateUrl: 'views/_auth/login.view.html',
      controller: 'loginCtrl',
      controllerAs: 'vm'
    }).when('/home', {
      templateUrl: 'views/_home/home.view.html',
      controller: 'homeCtrl',
      controllerAs: 'vm'
    }).when('/feeds', {
      templateUrl: 'views/_feeds/feeds.view.html',
      controller: 'feedsCtrl',
      controllerAs: 'vm'
    }).when('/profile', {
      templateUrl: 'views/_profile/profile.view.html',
      controller: 'profileCtrl',
      controllerAs: 'vm'
    })
    .otherwise({
      redirectTo: '/home'
    });

  // use the HTML5 History API
  $locationProvider.html5Mode(true);
}

function run($rootScope, $location, $timeout, authService) {
  $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
    console.log("redirect to: " + $location.path());
    if (authService.isLoggedIn()) { // check if user is logged in
      // user is logged in
    } else {
      if ($location.path() != '/login' && $location.path() != '/register' && $location.path() != '/' && $location.path() != '/home') {
        $location.path('/home');
      }
    }
  });
}

angular.module('fitforlife').config(['$routeProvider', '$locationProvider', 'NotificationProvider', config])
  .run(['$rootScope', '$location', '$timeout', 'authService', run]);




$.validator.setDefaults({
  highlight: function(element) {
    $(element).closest('.form-group').removeClass('has-success').addClass('has-error')
    // $(element).parent().find('.form-control-feedback').removeClass('fa-check').addClass('fa-remove');
  },
  unhighlight: function(element) {
    $(element).closest('.form-group').removeClass('has-error').addClass('has-success');
    // $(element).parent().find('.form-control-feedback').removeClass('fa-remove').addClass('fa-check');
  },
  errorClass: 'error',
  errorPlacement: function(error, element) {
    if (element.parent('.input-group').length) {
      error.insertAfter(element.parent());
    } else {
      error.insertAfter($(element).parent().find('.form-control-feedback'));
    }
  }
});
