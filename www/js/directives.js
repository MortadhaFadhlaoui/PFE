angular.module('starter.directives', [])

.directive('blankDirective', [function(){

}])

.directive('dateField', [function($filter) {
  return {
      require: 'ngModel',
      link: function(scope, element, attrs, ngModelController) {
           ngModelController.$parsers.push(function(data) {

              //View -> Model
              var date = Date.parseExact(data,'yyyy-MM-dd');

              // if the date field is not a valid date 
              // then set a 'date' error flag by calling $setValidity
              ngModelController.$setValidity('date', date!=null);
              return date == null ? undefined : date;
           });
           ngModelController.$formatters.push(function(data) {
              //Model -> View
              return $filter('date')(data, "yyyy-MM-dd");
           });    
       }
    }
}]);