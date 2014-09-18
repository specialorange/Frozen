'use strict';

/* globals Firebase */

angular.module('frozenApp')
.factory('ItemService', ['$firebase', function($firebase) {

	// ItemService constructor
	function ItemService() {
		this._ref = new Firebase('https://frozenapp.firebaseio.com/');
		this._sync = $firebase(this._ref);
		// download the data into a local object
		// this._syncObject = this._sync.items.$asObject();
		this._data = this._sync.$asObject();
		// <DEBUG>
		window.sync = this._sync;
		window.data = this._data;
		// </DEBUG>
	}

	// ItemService methods and fields
	ItemService.prototype = {

		onFirstLoad: function(callback) {
			this._data.$loaded().then(callback);
		},

		getItems: function() {
			// console.log(this._data.items);
			return this._data.items;
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
