mainApp.controller('prequalController', ['$scope', '$http', 'SingleQuestion', function($scope, $http, SingleQuestion){
	$scope.test = 2;
	$http.get('data.json').success(function(data) {
		$scope.json = data;
		$scope.current = 0;
		$scope.order = data.form.order;
		
		angular.forEach($scope.json.form.fields, function(field){
			if(field.value)
				$scope.user[field.name] = field.value
		});
		
		$scope.SingleQuestion = (function(){
		var self = {
			init: function(){
				$scope.steps = $scope.order.length;
				angular.forEach($scope.order, function(field, index){
					if (self.isValidElem(field)) {
						$scope.current = index;
		            }
				});
				
				angular.forEach($scope.order, function(field){
					$scope.$watch(function(){return $scope.user[field]}, function(newValue, oldValue) {
						if(newValue != oldValue){
							self.showNext()
						}
				    });
				});
				
				self.setProgressBarWidth()
			},
			isValidElem: function(field){
				if(!field)
					field = $scope.order[$scope.current]
				var result = true;
				if(angular.isArray(field)){
					for(var i = 0;i < field.length; i++){
						if(!$scope.user[field[i]]){
							result = false;
							break
						}
					}
				}else{
					if(!$scope.user[field])
						result = false
				}
				return result
			},
			showNext: function(){
				if(self.isValidElem())
					$scope.current++;
				self.setProgressBarWidth()
			},
			showPrevious: function(){
				$scope.current--;
				self.setProgressBarWidth()
			},
			getElement: function(index){
				if(index == undefined)
					index = $scope.current;
				return $scope.order[index]
			},
			setProgressBarWidth: function(){
				var width = Math.floor(($scope.current * 100) / $scope.steps);
				$scope.progressBarWidth = width
			},
			checkVisibility: function(name){
				if(angular.isArray($scope.order[$scope.current])){
					return $scope.order[$scope.current].indexOf(name) > -1
				}else{
					return name == $scope.order[$scope.current]
				}
			},
			hasError: function() {
		        return true
		    }
		}
		return self
	}());
	
	$scope.SingleQuestion.init();
		
	});
	
	$scope.user = {};
	
	
	$scope.click = function(){
		var responsePromise = $http.post("/json-test-data.jsp", $scope.user, {});
	};
	
}])