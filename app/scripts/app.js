'use strict';

/**
 * @ngdoc overview
 * @name frozenApp
 * @description
 * # frozenApp
 *
 * Main module of the application.
 */
angular
	.module('frozenApp', [
		'ngAnimate',
		'ngCookies',
		'ngResource',
		'ngRoute',
		'ngSanitize',
		'ngTouch',
		'angularMoment',
		'firebase'
	])
	.config(function ($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'views/main.html',
				controller: 'MainCtrl'
			})
			// .when('/about', {
			//   templateUrl: 'views/about.html',
			//   controller: 'AboutCtrl'
			// })
			.otherwise({
				redirectTo: '/'
			});
	});