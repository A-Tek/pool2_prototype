'use strict';

(function() {

	describe('Layer Controller Tests', function() {

		var LayerController,
			scope,
			$httpBackend,
			$stateParams,
			$location;


		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));


		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {

			scope = $rootScope.$new();


			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;


			LayerController = $controller('LayerController', {
				$scope: scope
			});
		}));

		it('Should do some controller test', inject(function() {

		}));
	});
}());