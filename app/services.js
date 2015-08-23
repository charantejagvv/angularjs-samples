mainApp.factory("SingleQuestion", ['$rootScope', function($rootScope){
	var defaults = {
		$scope: null,
        callback: {},
        current: -1,
        steps: 0,
        history_back: false,
        auto_submit: true,
	};
	return {
		init: function($scope){
			//angular.extend(this, options);
			this.steps = $scope.order.length;
			this.$scope = $scope;
			var singleQuestion = this;
			angular.forEach($scope.order, function(field, index){
				if (singleQuestion.hasError(field) || !singleQuestion.isValid(field)) {
					$scope.current = index;
	            }
			});
			
			this.setProgressBarWidth()
		},
		isValid: function(field){
			if(this.$scope.user[field])
				return true;
			return false
		},
		showNext: function(){
			
		},
		showPrevious: function(){
			
		},
		getElement: function(index){
			if(index == undefined)
				index = this.current;
			return this.order[index]
		},
		setProgressBarWidth: function(){
			var width = Math.floor((this.$scope.current * 100) / this.steps);
			this.$scope.progressBarWidth = width
		},
		hasError: function() {
	        /*var result = false;
	        $elems.each(function() {
	            var $el = $(this);
	            if ($.trim($el.find('.error').text()).length > 5) {
	                result = true;
	                return false;
	            }
	        });*/
	        return true
	    }
	}
}]);