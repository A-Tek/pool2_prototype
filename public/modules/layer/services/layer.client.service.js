'use strict';

angular.module('layer').factory('DataFactory', ['$http', '$resource',
	function ($http, $resource) {
		
	    var factory = {};

	    factory.getResults = function (sourceId, sourceName, searchTerm, currentPage) {
	        return $http.get('proxy?sourceId=' + sourceId + '&currentPage=' + currentPage + '&searchTerm=' + searchTerm, { data: { sourceId: sourceId, sourceName: sourceName, searchTerm: searchTerm }, cache: true, timeout: 20000 });
	    };


	    factory.getFDADetails = function (sourceId, recordId) {
	        return $http.get('proxy?sourceId=' + sourceId + '&recordId=' + recordId, { cache: true });
	    };


	    return factory;
	}
]);