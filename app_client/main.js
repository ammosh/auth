angular.module('fitforlife', ['ngRoute', 'ngMessages', 'angular-ladda', 'ui-notification', 'ngStorage']);

function config($routeProvider, $locationProvider, NotificationProvider) {
  NotificationProvider.setOptions({
    delay: 2000,
    startTop: 20,
    startRight: 10,
    verticalSpacing: 20,
    horizontalSpacing: 20,
    positionX: 'center',
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
    })
    .otherwise({
      redirectTo: '/home'
    });

  // use the HTML5 History API
  $locationProvider.html5Mode(true);
}

function run($rootScope, $location, $timeout, authService) {
  $rootScope.$on('$viewContentLoaded', function() {
    $timeout(function() {
      componentHandler.upgradeAllRegistered();
    });
  });
  $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
    console.log("redirect to: " + $location.path());
    if (authService.isLoggedIn()) { // check if user is logged in
      // user is logged in
      console.log("logged in");
    } else {
      if (($location.path() != '/login' && $location.path() != '/register' && $location.path() != '/')) {
        $location.path('/');
      }
    }
  });
}

angular.module('fitforlife').config(['$routeProvider', '$locationProvider', 'NotificationProvider', config])
  .run(['$rootScope', '$location', '$timeout', 'authService', run]);
