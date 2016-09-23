// /* common sessionStorage */
// angular.module('fitforlife').factory('$sessionStorage', ['$window', function($window) {
//   return {
//     set: function(key, value) {
//       $window.sessionStorage[key] = value;
//     },
//     get: function(key) {
//       return $window.sessionStorage[key] || '';
//     },
//     setObject: function(key, value) {
//       $window.sessionStorage[key] = JSON.stringify(value);
//     },
//     getObject: function(key) {
//       if ($window.sessionStorage[key] != "undefined") {
//         var value = $window.sessionStorage[key];
//         if (value != undefined)
//           return JSON.parse(value);
//         else
//           return {};
//       }
//       return {};
//     },
//     remove: function(key) {
//       $window.sessionStorage.removeItem(key);
//     },
//     clear: function() {
//       $window.sessionStorage.clear();
//     }
//   }
// }]);
