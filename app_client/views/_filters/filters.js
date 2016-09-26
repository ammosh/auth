angular
  .module('fitforlife')
  .filter('capitalize', function() {
    return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
  })
  .filter('datetime', function() {
    return function(input) {
      if (!input) {
        return "";
      }
      var parsedDate = Date.parse(input);
      if (isNaN(input) && !isNaN(parsedDate)) {
        var _date = new Date(input);
        return _date.toLocaleString();
      } else {
        return input;
      }
    };
  }).filter('propsFilter', function() {
    return function(items, props) {
      var out = [];

      if (angular.isArray(items)) {
        var keys = Object.keys(props);

        items.forEach(function(item) {
          var itemMatches = false;

          for (var i = 0; i < keys.length; i++) {
            var prop = keys[i];
            var text = props[prop].toLowerCase();
            if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
              itemMatches = true;
              break;
            }
          }

          if (itemMatches) {
            out.push(item);
          }
        });
      } else {
        out = items;
      }
      return out;
    };
  });
