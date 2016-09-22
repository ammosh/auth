angular.module('fitforlife', ['ngRoute', 'ngMessages', 'angular-ladda', 'ui-notification']);

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
    })
    .otherwise({
      redirectTo: '/home'
    });

  // use the HTML5 History API
  $locationProvider.html5Mode(true);
}

function run($rootScope, $location, $timeout) {
  $rootScope.$on('$viewContentLoaded', function() {
    $timeout(function() {
      componentHandler.upgradeAllRegistered();
    });
  });
  $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
    console.log("redirect to: " + $location.path());
  });
}

angular.module('fitforlife').config(['$routeProvider', '$locationProvider', 'NotificationProvider', config])
  .run(['$rootScope', '$location', '$timeout', run]);
