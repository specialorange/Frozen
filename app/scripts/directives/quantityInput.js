'use strict';

angular.module('frozenApp')
.directive('quantityInput', [function(){
	// Runs during compile
	return {
		// name: '',
		// priority: 1,
		// terminal: true,
		scope: {
			quantity: "=model"
		}, // {} = isolate, true = child, false/undefined = no change
		controller: function($scope, $element, $attrs, $transclude) {
			$scope.quantityUp = function() {
				$scope.quantity = $scope.quantity + 1;
				$scope.validateQuantity();
			};

			$scope.quantityDown = function() {
				$scope.quantity = $scope.quantity - 1;
				$scope.validateQuantity();
			};

			$scope.validateQuantity = function() {
				// handle the no quantity case
				if (!$scope.quantity) {
					$scope.quantity = 1;
				}

				// handle decimals
				$scope.quantity = Math.round($scope.quantity);
			};
		},
		// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		restrict: 'AE', // E = Element, A = Attribute, C = Class, M = Comment
		// template: '',
		templateUrl: 'views/_quantityInput.html',
		// replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		link: function($scope, $element, $attrs) {
			
		}

	};
}]);