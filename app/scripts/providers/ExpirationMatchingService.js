'use strict';

/* globals moment */

angular.module('frozenApp')
	.factory('ExpirationMatchingService', [function(){
		return {
			match: function(items) {
				var now = moment();
				var twoWeeksFromToday = moment(now).add('days', 14);
				var green = [];
				var yellow = [];
				var red = [];
				var item, currentItem, expiration;

				for (var i = 0; i < items.length; i++) {
					currentItem = items[i];

					// loop through the expiration dates
					for (var added in currentItem.dates) {
					    expiration = moment(currentItem.dates[added]);
					    item = {
					    	description: currentItem.description,
					    	measurement: currentItem.measurement,
					    	expiration: expiration.format('MM/DD/YYYY'),
					    	added: added
					    };

					    // if (expiration.isBefore(twoWeeksFromToday)) {
					    // 	green.push(item);
					    // } else if ((expiration.isSame(twoWeeksFromToday) || expiration.isAfter(twoWeeksFromToday)) && expiration.isBefore(now)) {
					    // 	yellow.push(item);
					    // } else if (expiration.isSame(now) || expiration.isAfter(now)) {
					    // 	red.push(item);
					    // } else {
					    // 	throw 'item ' + item + ' did not match any list';
					    // }
					    if (expiration.isSame(now) || expiration.isBefore(now)) {
					    	red.push(item);
					    } else if ((expiration.isBefore(twoWeeksFromToday) || expiration.isSame(twoWeeksFromToday)) && expiration.isAfter(now)) {
					    	yellow.push(item);
					    } else if (expiration.isAfter(twoWeeksFromToday)) {
					    	green.push(item);
					    }
					}

				}

				return {
					green: green,
					yellow: yellow,
					red: red
				};
			}
		};
	}]);