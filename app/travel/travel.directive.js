(function(){
  // custom date filter for ng-model
  angular.module("aswa").directive('formatteddate', function ($filter, settings) {
    return {
        link: function (scope, element, attrs, ctrl) {
            ctrl.$formatters.unshift(function (modelValue) {
                return $filter('date')(modelValue, settings.rootScope.date);
            });

            ctrl.$parsers.unshift(function (modelValue) {
                return modelValue; //$filter('date')(modelValue, settings.rootScope.date);
            });
        },
        restrict: 'A',
        require: 'ngModel'
    }
  });

  // custom urrency filter for ng-model - https://github.com/angular-ui/bootstrap/issues/1278
  angular.module("aswa").directive('amount', function ($filter, settings) {
    return {
        link: function (scope, element, attrs, ctrl) {
          //console.log('attrs', attrs, 'modelValue', modelValue);
            ctrl.$formatters.unshift(function (modelValue) {
                return $filter('currency')(modelValue, settings.rootScope.currency);
            });

            ctrl.$parsers.unshift(function (modelValue) {
                return modelValue;//$filter('currency')(modelValue, settings.rootScope.currency);
            });
        },
        restrict: 'A',
        require: 'ngModel'
    }
  });
  // closes here
  // -1 date issue fixed using below directive
angular.module("aswa").directive('ngBootstrapFix', function($filter) {
  return {
    require: 'ngModel',
    priority: 1,
    link: function($scope, $element, $attrs, ngModelCtrl) {
      ngModelCtrl.$parsers.push(function(viewValue) {
        viewValue = $filter('date')(viewValue, 'yyyy-MM-dd');
          return viewValue;
        });
        ngModelCtrl.$render = function() {
          var val = $filter('date')(ngModelCtrl.$viewValue, 'dd-MMM-yyyy');
          $element.val(val);
        };
      }
    };
});
// close the fix issue here

})();
