'use strict';

/* globals moment */

/**
 * @ngdoc function
 * @name frozenApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the frozenApp
 */
angular.module('frozenApp')
  .controller('MainCtrl', [ '$scope', '$firebase', 'Item', 'ItemArray', 'ItemFactory', function ($scope, $firebase, Item, ItemArray, ItemFactory) {

    window.Item = Item;
    window.ItemArray = ItemArray;

    $scope.items = ItemFactory;

    window.items = $scope.items;
    window.$$$scope = $scope;

    $scope.addItem = function() {
        var item = {
            description: $scope.newDescription.trim(),
            measurement: $scope.newMeasurement.trim(),
            dates: {}
        };

        var expires = moment($scope.newExpires.trim()).format('YYYY-MM-DD');
        var added = moment($scope.newAdded.trim()).format('YYYY-MM-DD');

        item.dates[added] = expires;
        
        if (!$scope.newDescription.length || !$scope.newMeasurement.length || !$scope.newExpires.length ||!$scope.newAdded.length) {
            return;
        }
        $scope.items.$add(item);
        // $scope.new-description = '';
        // $scope.new-measurement = '';
        // $scope.new-quantity = '';
        // $scope.new-expires = '';
        // $scope.new-added = '';
    };

    $scope.saveItem = function(item) {
        $scope.items.$save(item);
    };

    $scope.removeItem = function(item) {
        console.log(item);
        $scope.items.$remove(item);
    };

    $scope.bulletExpiryClass = function(item) {
        console.log(item);
        if (item.hasRed()) {
            return 'text-danger';
        } else if (item.hasYellow()) {
            return 'text-warning';
        } else {
            return 'hidden';
        }
    };

    $scope.yellowDates = function(item) {
        var dates = item.data.dates;
        var yellow = {};
        var expires;

        for (var added in dates) {
            expires = dates[added];
            if (item._yellowDate(expires)) {
                yellow[added] = expires;
            }
        }

        return yellow;
    };

    $scope.prepopulateAddedDate = function() {
        if (!$scope.newAdded) {
            $scope.newAdded = moment().format('MM/DD/YYYY');
        }
    };

    $scope.prepopulateQuantity = function() {
        if (!$scope.newQuantity) {
            $scope.newQuantity = 1;
        }
    };

    $scope.quantityUp = function() {
        if (!$scope.newQuantity) {
            $scope.newQuantity = 1;
        } else {
            if (($scope.newQuantity) < 1) {
                $scope.newQuantity = 1;
            } else {
                $scope.newQuantity = $scope.newQuantity + 1;
            }
        }
    };

    $scope.quantityDown = function() {
        if (!$scope.newQuantity) {
            $scope.newQuantity = 1;
        } else {
            if (($scope.newQuantity - 1) < 1) {
                $scope.newQuantity = 1;
            } else {
                $scope.newQuantity = $scope.newQuantity - 1;
            }
        }
    };


    /* OLD CODE BELOW THIS LINE */


    // $scope.data = ItemService;

    // ItemService.getItems()
    //     .then(function(data) {
    //         // var moment = window.moment;

    //         // loop through the items
    //         for (var i = 0; i < data.items.length; i++) {
    //             var item = data.items[i];
    //             var quantity = 0;
    //             var expiration, added;

    //             // loop through the expiration dates
    //             for (var key in item.dates) {
    //                 quantity++;

    //                 // parse the dates with moment.js
    //                 added = moment(key, 'MM/DD/YYYY');
    //                 expiration = moment(item.dates[key], 'MM/DD/YYYY');

    //                 // set the dates to the first if it's not there yet
    //                 if (!item.oldestExpirationDate) {
    //                     item.oldestExpirationDate = expiration;
    //                     item.oldestAddedDate = added;
    //                 }

    //                 if (expiration.isBefore(item.oldestExpirationDate)) {
    //                     item.oldestExpirationDate = expiration;
    //                     item.oldestAddedDate = added;
    //                 }
    //             }

    //             item.quantity = quantity;
    //         }
            
    //         // match the items to ok, expires soon, and expired lists
    //         var lists = ExpirationMatchingService.match(data.items);

    //         $scope.green = lists.green;
    //         $scope.yellow = lists.yellow;
    //         $scope.red = lists.red;

    //         $scope.unexpired = lists.unexpired;
    //         $scope.expired = lists.expired;

    //         $scope.allItems = data.items;
    //     });
    } ]);
    // .filter('itemFilter', function () {
    //     return function (input) {

    //         var now = moment();
    //         var twoWeeksFromToday = moment(now).add('days', 14);

    //         angular.forEach(input, function(item) {
                
    //             item.isRed = function() {
    //                 return (moment(this.expires).isSame(now) || moment(this.expires).isBefore(now));
    //             };
    //             item.isYellow = function() {
    //                 return ((moment(this.expires).isBefore(twoWeeksFromToday) || moment(this.expires).isSame(twoWeeksFromToday)) && moment(this.expires).isAfter(now));
    //             };
    //             item.isGreen = function() {
    //                 return (moment(this.expires).isAfter(twoWeeksFromToday));
    //             };

    //         });

    //         return input;

    //         // var items = [];

    //         // function Item(item) {
    //         //     this.description = item.description;
    //         //     this.measurement = item.measurement;
    //         //     this.expires = item.expires;
    //         //     this.added = item.added;
    //         // }

    //         // angular.forEach(input, function(item, index) {
    //         //     items.push(new Item(item));
    //         // });

    //         // console.log(items);

    //         // return items;

    //     };
    // })
    // .filter('yellowItems', function () {
    //     return function (input) {

    //         var yellow = [];

    //         angular.forEach(input, function(item) {
    //             if (item.isYellow()) {
    //                 yellow.push(item);
    //             }
    //         });

    //         return yellow;

    //         // var items = [];

    //         // function Item(item) {
    //         //     this.description = item.description;
    //         //     this.measurement = item.measurement;
    //         //     this.expires = item.expires;
    //         //     this.added = item.added;
    //         // }

    //         // angular.forEach(input, function(item, index) {
    //         //     items.push(new Item(item));
    //         // });

    //         // console.log(items);

    //         // return items;

    //     };
    // });