'use strict';

angular.module('layer').controller('PreferencesController', ['$scope', '$rootScope', '$stateParams', '$location', 'DataFactory', 'UserPreferences',
	function ($scope, $rootScope, $stateParams, $location, DataFactory, UserPreferences) {


	    function init() {

	        if (!$rootScope.userPreferences) {
	            $rootScope.userPreferences = UserPreferences.getUserPreferences();
	        }

	        $scope.sources = $rootScope.userPreferences.sources;
	        $scope.searchTerms = $rootScope.userPreferences.searchTerms;
	    }

	    init();

	    $scope.changeSources = function (sourceId, chosen) {
			if (sourceId=='fdafoods')
			{
				alert("This datasource is not configured")
				chosen=false;
			}
			if (sourceId=='fdadevices')
			{
				alert("This datasource is not configured")
				chosen=false;
			}
			console.log(sourceId);
			console.log(chosen);
	        for (var i = 0; i < $scope.sources.length; i++) {
	            if ($scope.sources[i].id == sourceId) {
	                $scope.sources[i].chosen = chosen;
	            }
	        }
	    };

	    $scope.deleteSearchTerm = function (index) {
	        $scope.searchTerms.splice(index, 1);
	    };

	    $scope.addSearchTerm = function (term) {
	        var dup = false;
	        $scope.searchTermToAdd = '';

	        for (var i = 0; i < $scope.searchTerms.length; i++) {
	            if ($scope.searchTerms[i] == term) {
	                dup = true;
	                break;
	            }
	        }

	        if (dup) return false;

	        $scope.searchTerms.push(term);
	        $scope.searchTermToAdd = '';
	    };

	    $scope.savePreferences = function (sourceId, chosen) {
	        $rootScope.userPreferences.sources = $scope.sources;
	        $rootScope.columns = undefined;
	        $location.url("/layer");
	    };

	}
]);