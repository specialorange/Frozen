'use strict';

/**
 * @ngdoc function
 * @name frozenApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the frozenApp
 */
angular.module('frozenApp')
  .controller('MainCtrl', [ '$scope', 'ItemService', function ($scope, ItemService) {
    ItemService.getItems()
    	.then(function(data) {
    		for (var i = 0; i < data.items.length; i++) {
    			var item = data.items[i];
    			var quantity = 0;
    			var oldestExpirationDate, oldestAddedDate;
    			for (var expiration in item.dates) {
    				quantity++;
    				var added = item.dates[expiration];
    			}
    			item.quantity = quantity;
    		};
    		// for (var item in data.items) {
    			
    		// }
    		$scope.allItems = data.items;
    	});
  } ]);
