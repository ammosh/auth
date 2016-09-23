// /* common localstorage */
// angular.module('fitforlife').factory('$localstorage', ['$window', function($window) {
//   return {
//     set: function(key, value) {
//       $window.localStorage[key] = value;
//     },
//     get: function(key) {
//       return $window.localStorage[key] || '';
//     },
//     setObject: function(key, value) {
//       $window.localStorage[key] = JSON.stringify(value);
//     },
//     getObject: function(key) {
//       if ($window.localStorage[key] != "undefined") {
//         var value = $window.localStorage[key];
//         if (value != undefined)
//           return JSON.parse(value);
//         else
//           return {};
//       }
//       return {};
//     },
//     remove: function(key) {
//       $window.localStorage.removeItem(key);
//     },
//     clear: function() {
//       $window.localStorage.clear();
//     }
//   }
// }]);
