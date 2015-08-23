// Radio button directive
mainApp.directive("radioInTable", function(){
	return {
		restrict: 'E',
		scope: {
			fieldname: '=',
			options: '=',
			user: '='
		},
		template: '<div class="radio" ng-click="updateModel(fieldname, option.value)" ng-class="{myclass: option.value == user[fieldname]}" ng-repeat="option in options" ng-bind-html="option.label | preseveHtml"></div>',
		link: function(scope, element, attrs){
			scope.updateModel = function(fieldName, value) {
                scope.user[fieldName] = value;
            }
		}
	}
});

// Handle Textbox change event on blur
mainApp.directive('onChange', function() {
    return {
        restrict: 'A',
        scope:true,
        link: function(scope, element, attrs){
            element.bind('blur', function() {
                var currentValue = element.val();                
                if(scope.onChange !== currentValue){
                    scope.$apply(function(){
                        scope.onChange = currentValue;
                    });
                }
            });
        }
    }      
});