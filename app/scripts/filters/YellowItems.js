'use strict';

angular.module('frozenApp')
.filter('yellowItems', function () {
    return function (items) {

    	return items.filter(function(item) {
    		return item.hasYellow();
    	});

    	// console.log(items);

    	// var yellow = [];

    	// function MockItem(realItem, expires, added) {
    	// 	this.$item = realItem;
    	// 	this.expires = function() {
    	// 		return moment(expires);
    	// 	};
    	// 	this.added = function() {
    	// 		return moment(added);
    	// 	};
    	// 	this.description = function() {
    	// 		return this.$item.description();
    	// 	};
    	// 	this.measurement = function() {
    	// 		return this.$item.measurement();
    	// 	};
    	// }

    	// items.$loaded(function(items) {
    	// 	for (var item in items) {
    	// 		console.log(item);
    	// 		angular.forEach(item.data.dates, function(expires, added){
    	// 			if (item._yellowDate(expires)) {
    	// 				yellow.push(new MockItem(item, expires, added));
    	// 			}
    	// 		});
    	// 	}
    	// });

    	// return yellow;

    };
});