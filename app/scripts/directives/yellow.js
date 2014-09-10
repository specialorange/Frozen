'use strict';

/* globals $ */

angular.module('frozenApp')
	.directive('yellow', function(){
		// Runs during compile
		return {
			// name: '',
			// priority: 1,
			// terminal: true,
			// scope: {}, // {} = isolate, true = child, false/undefined = no change
			// controller: function($scope, $element, $attrs, $transclude) {},
			// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
			restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
			// template: '',
			templateUrl: 'views/header/_yellow.html',
			// replace: true,
			// transclude: true,
			// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
			link: function($scope, element){
				$(element).popover({
					container: $(document.body),
					placement: 'bottom',
					title: 'Expiring Soon',
					trigger: 'click', // focus hides the popover on the next click
					html: true,
					content: function() {
						return $('#yellow-popover-content').html();
					}
					//  data-container="body" data-toggle="popover" data-placement="bottom" data-content="yellow-popover-content"
				});
			}
		};
	});