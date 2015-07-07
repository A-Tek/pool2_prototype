'use strict';

angular.module('home').controller('HeaderController', ['$scope', '$rootScope', '$location', 'Authentication', 'Menus', 'UserPreferences',
	function ($scope, $rootScope, $location, Authentication, Menus, UserPreferences) {
	    $scope.authentication = Authentication;
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function () {
		    $scope.isCollapsed = false;
		    changeHeaderName();
		});


	



		function getUserPreferences() {
		    $rootScope.userPreferences = UserPreferences.getUserPreferences();
		}

		getUserPreferences();

	}


]);