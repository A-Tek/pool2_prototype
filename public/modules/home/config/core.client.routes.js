'use strict';

// Setting up route
angular.module('home').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/layer');

		// Home state routing
		//$stateProvider.
		//state('home', {
		//	url: '/',
		//	templateUrl: 'modules/core/views/home.client.view.html'
		//});
	}
]);