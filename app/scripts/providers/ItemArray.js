'use strict';

/* globals ItemUtils */

angular.module('frozenApp')
.factory('ItemArray', function($FirebaseArray, Item) {
	return $FirebaseArray.$extendFactory({
		// change the added behavior to return Item objects
		$$added: function(snapshot) {
			var item = new Item(snapshot);
			this._process('child_added', item);
		},

		// override the update behavior to call Item.update()
		$$updated: function(snapshot) {
			// snapshot.name() is the firebase key
			this.$getRecord(snapshot.name()).update(snapshot);
		},

		redCount: function() {
			
		},

		yellowCount: function() {
			var yellow = 0;
			var dates;
			angular.forEach(this.$list, function(item){
				dates = ItemUtils.yellowDates(item);
				for (var date in dates) {
				    if (dates.hasOwnProperty(date)) {
				       yellow++;
				    }
				}
			});
			return yellow;
		},

		greenCount: function() {

		}
	});
});