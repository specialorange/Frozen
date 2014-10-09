'use strict';

/* globals Firebase */

angular.module('frozenApp')
.factory('ItemFactory', function($firebase, ItemArray) {

	var url = 'https://frozenapp.firebaseio.com/items/';
	var fireRef = new Firebase(url);
	var sync = $firebase(fireRef, {arrayFactory: 'ItemArray'});
	window.sync = sync;
	var items = sync.$asArray();

	return items;
});