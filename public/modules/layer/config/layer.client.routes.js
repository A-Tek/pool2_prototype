'use strict';


//Setting up route
angular.module('layer').config(['$stateProvider',
	function($stateProvider) {
		// Cards state routing
	    $stateProvider.

        state('mainlayers', {
            url: '/layer?searchTermAll',
            templateUrl: 'modules/layer/views/layer.client.view.html'
        }).


        state('detailedlayer', {
            url: '/layer/detail?sourceId&recordId&searchTerm',
            templateUrl: 'modules/layer/views/detailed.layer.client.view.html'
        }).

		state('dailyMedlayer', {
			url: '/layer/daily/:searchTerm',
			templateUrl: 'modules/layer/views/daily.layer.client.view.html'
		});
	}
]);