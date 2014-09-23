'use strict';

/* globals Firebase */

angular.module('frozenApp')
.factory('ItemService', ['$firebase', function($firebase) {

	function Item(item) {
		this.description = item.description;
		this.measurement = item.measurement;
		this.expires = item.expires;
		this.added = item.added;
	}

	Item.prototype = {

	};

	// ItemService constructor
	function ItemService() {
		this._ref = new Firebase('https://frozenapp.firebaseio.com/');
		this._sync = $firebase(this._ref);
		// download the data into a local object
		// this._syncObject = this._sync.items.$asObject();
		this._data = this._sync.$asObject();
		this._promise = this._data.$loaded();
		// <DEBUG>
		window.sync = this._sync;
		window.data = this._data;
		// </DEBUG>
	}

	// ItemService methods and fields
	ItemService.prototype = {

		/* Accessors ~~~~ */

		items: function() {
			return this._promise.then(function(data) {
				return data.items;
			});
			// return this._data.items;
		},

		collectedItems: function() {

			// utility class used to model an item that represents a collection of like items

			function CollectedItem(item) {
				this.description = item.description;
				this.measurement = item.measurement;
				this.expires = item.expires;
				this.added = item.added;

				this.quantity = 0;
				this.items = [];

				this.addItem(item);
			}

			CollectedItem.prototype = {
				matches: function(description, measurement) {
					return ((description === this.description) && (measurement === this.measurement));
				},

				addItem: function(item) {
					this.items.push(item);
					this.quantity++;
				}
			};

			var item;
			var items = this.items();

			var collection = [];

			console.log(items);

			// loop through items
			for (var i = 0; i < items.length; i++) {
				item = items[i];

				// if we don't have a collection yet, make one with our first item
				if (collection.length === 0) {
					collection.push(new CollectedItem(item));
				} else {
					// loop through collection
					for (var j = 0; j < collection.length; j++) {
						// see if we have a collected item that matches
						if (collection[j].matches(item.description, item.measurement)) {
							// yes: add to the collected item
							collection[j].addItem(item);
						} else {
							collection.push(new CollectedItem(item));
						}
					}
				}

				
			}

			return collection;
		},

		/* Events ~~~~~~~ */

		onChange: function(callback) {
			this._data.$loaded().then(callback);
		}

		
	};

	return new ItemService();

	
	// synchronize the object with a three-way data binding
	// click on `index.html` above to see it used in the DOM!
	// syncObject.$bindTo($scope, 'data');

	 // return {
	 //       getItems: function() {
	 //            var deferred = $q.defer();
	 //            $http.get('data/data.json').success(function(data) {
	 //                deferred.resolve(data);
	 //            }).error(function(){
	 //                deferred.reject();
	 //            });

	 //            return deferred.promise;

	 //        // This also works
	 //        //since $http.get returns a promise,
	 //        //and promise.then() also returns a promise
	 //        //that resolves to whatever value is returned in it's
	 //        //callback argument, we can return that.
	 //        // return $http.get('data/data.json').then(function(result) {
	 //        //   return result.data;
	 //        // });
	 //       }
	 // };
}]);
