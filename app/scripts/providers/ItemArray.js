'use strict';

angular.module('frozenApp')
.factory('ItemArray', function($FirebaseArray, Item) {
	return $FirebaseArray.$extendFactory({
		// change the added behavior to return Item objects
		$$added: function(snapshot) {
				
			console.log(item);
			console.log(item.isRed());
			this._process('child_added', item);
		},

		// override the update behavior to call Item.update()
		$$updated: function(snapshot) {
			// snapshot.name() is the firebase key
			this.$getRecord(snapshot.name()).update(snapshot);
		}
	});
});