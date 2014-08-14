'use strict';

/**
 * @ngdoc function
 * @name frozenApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the frozenApp
 */
angular.module('frozenApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
