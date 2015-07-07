'use strict';

// Users service used for communicating with the users REST endpoint
angular.module('users').factory('Users', ['$resource',
	function($resource) {
		return $resource('users', {}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);


angular.module('users').factory('UserPreferences', [
	function () {

	    var factory = {};

	    factory.getUserPreferences = function () {
	        var userPreferences = {
	            sources: [
                            {
                                id: 'fda',
                                name: 'OpenFDA Drugs Data',
                                chosen: true
                            }/*,
						{
						id: 'fdafoods',
						name: 'OpenFDA Food Data',
						chosen: false
						},
					{
						id: 'fdadevices',
						name: 'OpenFDA Devices Data',
						chosen: false
					}*/
	            ],
	            searchTerms: ["GlaxoSmithKline"]
	        };

	        return userPreferences;
	    };

	    return factory;
	}


]);