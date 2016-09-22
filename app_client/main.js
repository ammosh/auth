angular.module('fitforlife', ['ngRoute', 'ngMaterial', 'ngMdIcons', 'ngMessages', 'angular-ladda']);

function config($routeProvider, $locationProvider, $mdThemingProvider) {

  $mdThemingProvider.theme('default')
    .primaryPalette('blue', {
      'default': '500',
      'hue-1': '100',
      'hue-2': '600',
      'hue-3': 'A100'
    })

  .accentPalette('purple', {
    'default': '200' // use shade 200 for default, and keep all other shades the same
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
    })
    .otherwise({
      redirectTo: '/'
    });

  // use the HTML5 History API
  $locationProvider.html5Mode(true);
}

function run($rootScope, $location) {
  $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
    console.log("redirect to: " + $location.path());
  });
}

angular.module('fitforlife').config(['$routeProvider', '$locationProvider', '$mdThemingProvider', config])
  .run(['$rootScope', '$location', run]);
