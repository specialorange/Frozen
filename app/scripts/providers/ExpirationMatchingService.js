'use strict';

/* globals moment, $ */

angular.module('frozenApp')
	.factory('ExpirationMatchingService', [function(){
		return {
			match: function(items) {
				var now = moment();
				var twoWeeksFromToday = moment(now).add('days', 14);
				var green = [];
				var yellow = [];
				var red = [];
				var unexpired = [];
				var expired = [];
				var item, currentItem, expiration;

				function ItemModel(description, measurement, expiration, added) {
					this.description = description;
					this.measurement = measurement;
					this.expiration = expiration;
					this.added = added;
					this.isRed = function() {
						return (this.expiration.isSame(now) || this.expiration.isBefore(now));
					};
					this.isYellow = function() {
						return ((this.expiration.isBefore(twoWeeksFromToday) || this.expiration.isSame(twoWeeksFromToday)) && this.expiration.isAfter(now));
					};
					this.isGreen = function() {
						return (this.expiration.isAfter(twoWeeksFromToday));
					};
				}

				for (var i = 0; i < items.length; i++) {
					currentItem = items[i];

					// loop through the expiration dates
					for (var added in currentItem.dates) {
					    expiration = moment(currentItem.dates[added]);

					    item = new ItemModel(currentItem.description, currentItem.measurement, expiration, added);

					    // if (expiration.isBefore(twoWeeksFromToday)) {
					    // 	green.push(item);
					    // } else if ((expiration.isSame(twoWeeksFromToday) || expiration.isAfter(twoWeeksFromToday)) && expiration.isBefore(now)) {
					    // 	yellow.push(item);
					    // } else if (expiration.isSame(now) || expiration.isAfter(now)) {
					    // 	red.push(item);
					    // } else {
					    // 	throw 'item ' + item + ' did not match any list';
					    // }
					    if (item.isRed()) {
					    	red.push(item);
					    	if ($.inArray(currentItem, expired) === -1) { expired.push(currentItem); }
					    } else if (item.isYellow()) {
					    	yellow.push(item);
					    	if ($.inArray(currentItem, unexpired) === -1) { unexpired.push(currentItem); }
					    } else if (item.isGreen()) {
					    	green.push(item);
					    	if ($.inArray(currentItem, unexpired) === -1) { unexpired.push(currentItem); }
					    } else {
					    	throw 'item ' + item + 'did not match any list';
					    }

					    // if (expiration.isSame(now) || expiration.isBefore(now)) {
					    // 	red.push(item);
					    // 	if ($.inArray(currentItem, expired) === -1) { expired.push(currentItem); }
					    // } else if ((expiration.isBefore(twoWeeksFromToday) || expiration.isSame(twoWeeksFromToday)) && expiration.isAfter(now)) {
					    // 	yellow.push(item);
					    // 	// $.inArray is a polyfill, returns -1 if not found in the array
					    // 	if ($.inArray(currentItem, unexpired) === -1) { unexpired.push(currentItem); }
					    // } else if (expiration.isAfter(twoWeeksFromToday)) {
					    // 	green.push(item);
					    // 	if ($.inArray(currentItem, unexpired) === -1) { unexpired.push(currentItem); }
					    // }
					}

				}

				return {
					green: green,
					yellow: yellow,
					red: red,
					unexpired: unexpired,
					expired: expired
				};
			}
		};
	}]);