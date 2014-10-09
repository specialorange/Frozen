'use strict';

/* globals Firebase, moment */

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
            expires: $scope.newExpires.trim(),
            added: $scope.newAdded.trim()
        };
        
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

    $scope.removeItem = function(item) {
        console.log(item);
        $scope.items.$remove(item);
    };

    /* OLD CODE BELOW THIS LINE */

    $scope.items.$loaded().then(function(items) {

        var collectedItems = [];

        var now = moment();
        var twoWeeksFromToday = moment(now).add('days', 14);

        /**
         * CollectedItem class
         * represents an item type with several items that match the type
         * e.g. Brocolli 16oz would be a type
         */

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
            matches: function(item) {
                return ((item.description === this.description) && (item.measurement === this.measurement));
            },

            addItem: function(item) {
                this.items.push(item);
                this.quantity++;

                // set the dates to the first if it's not there yet
                    //                 if (!item.oldestExpirationDate) {
                    //                     item.oldestExpirationDate = expiration;
                    //                     item.oldestAddedDate = added;
                    //                 }

                    //                 if (expiration.isBefore(item.oldestExpirationDate)) {
                    //                     item.oldestExpirationDate = expiration;
                    //                     item.oldestAddedDate = added;
                    //                 }
                    //             }
                if (moment(item.expires).isBefore(this.expires)) {
                    this.expires = item.expires;
                    this.added = item.added;
                }
            },

            isRed: function() {
                var isRed = false;
                angular.forEach(this.items, function(item) {
                    if (moment(item.expires).isSame(now) || moment(item.expires).isBefore(now)) {
                        isRed = true;
                    }
                });
                console.log(this + ' is not red');
                return isRed;
            },

            isYellow: function() {
                var isYellow = false;
                angular.forEach(this.items, function(item) {
                    if ((moment(item.expires).isBefore(twoWeeksFromToday) || moment(item.expires).isSame(twoWeeksFromToday)) && moment(item.expires).isAfter(now)) {
                        isYellow = true;
                    }
                });
                return isYellow;
            },

            isGreen: function() {
                var isGreen = false;
                angular.forEach(this.items, function(item) {
                    if (moment(item.expires).isAfter(twoWeeksFromToday)) {
                        isGreen = true;
                    }
                });
                return isGreen;
            }
        };

        var collected = false;

        angular.forEach(items, function(item) {
            collected = false;
            angular.forEach(collectedItems, function(collectedItem) {
                if (collectedItem.matches(item)) {
                    collectedItem.addItem(item);
                    collected = true;
                    console.log('collected item ' + item);
                }
            });
            if (!collected) {
                collectedItems.push(new CollectedItem(item));
                console.log('pushed item ' + item);
            }
        });

        $scope.collectedItems = collectedItems;

    });


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
    } ])
    .filter('itemFilter', function () {
        return function (input) {

            var now = moment();
            var twoWeeksFromToday = moment(now).add('days', 14);

            angular.forEach(input, function(item) {
                
                item.isRed = function() {
                    return (moment(this.expires).isSame(now) || moment(this.expires).isBefore(now));
                };
                item.isYellow = function() {
                    return ((moment(this.expires).isBefore(twoWeeksFromToday) || moment(this.expires).isSame(twoWeeksFromToday)) && moment(this.expires).isAfter(now));
                };
                item.isGreen = function() {
                    return (moment(this.expires).isAfter(twoWeeksFromToday));
                };

            });

            return input;

            // var items = [];

            // function Item(item) {
            //     this.description = item.description;
            //     this.measurement = item.measurement;
            //     this.expires = item.expires;
            //     this.added = item.added;
            // }

            // angular.forEach(input, function(item, index) {
            //     items.push(new Item(item));
            // });

            // console.log(items);

            // return items;

        };
    })
    .filter('yellowItems', function () {
        return function (input) {

            var yellow = [];

            angular.forEach(input, function(item) {
                if (item.isYellow()) {
                    yellow.push(item);
                }
            });

            return yellow;

            // var items = [];

            // function Item(item) {
            //     this.description = item.description;
            //     this.measurement = item.measurement;
            //     this.expires = item.expires;
            //     this.added = item.added;
            // }

            // angular.forEach(input, function(item, index) {
            //     items.push(new Item(item));
            // });

            // console.log(items);

            // return items;

        };
    });