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
  .controller('MainCtrl', [ '$scope', 'ItemService', 'ExpirationMatchingService', function ($scope, ItemService, ExpirationMatchingService) {
    ItemService.getItems()
        .then(function(data) {
            // var moment = window.moment;

            // loop through the items
            for (var i = 0; i < data.items.length; i++) {
                var item = data.items[i];
                var quantity = 0;
                var expiration, added;

                // loop through the expiration dates
                for (var key in item.dates) {
                    quantity++;

                    // parse the dates with moment.js
                    added = moment(key, 'MM/DD/YYYY');
                    expiration = moment(item.dates[key], 'MM/DD/YYYY');

                    // set the dates to the first if it's not there yet
                    if (!item.oldestExpirationDate) {
                        item.oldestExpirationDate = expiration;
                        item.oldestAddedDate = added;
                    }

                    if (expiration.isBefore(item.oldestExpirationDate)) {
                        item.oldestExpirationDate = expiration;
                        item.oldestAddedDate = added;
                    }
                }

                item.quantity = quantity;
            }
            
            // match the items to ok, expires soon, and expired lists
            var lists = ExpirationMatchingService.match(data.items);
            console.log(lists);

            $scope.green = lists.green;
            $scope.yellow = lists.yellow;
            $scope.red = lists.red;

            $scope.allItems = data.items;
        });
    } ]);
