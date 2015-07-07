'use strict';

angular.module('layer').controller('LayerController', ['$scope', '$rootScope', '$stateParams', '$q', 'DataFactory', '$location', 'UserPreferences',
	function ($scope, $rootScope, $stateParams, $q, DataFactory, $location, UserPreferences) {
	    var currentPage = 1;
	    var nextColumnIndexToReceiveCard = 0;
        
	    if (!$rootScope.userPreferences) {
	        $rootScope.userPreferences = UserPreferences.getUserPreferences();
	    }

		getInitialData();

		function getInitialData() {
			if ($rootScope.columns && $rootScope.columns.length > 0) {
				$scope.columns = $rootScope.columns;
				$rootScope.cardsScrollPos ? $(window).scrollTop($rootScope.cardsScrollPos) : $(window).scrollTop(0);
				$rootScope.cardsCurrentPage ? currentPage = $rootScope.cardsCurrentPage : currentPage = 1;
				$scope.showLoadMoreButton = !$rootScope.hideLoadMoreButton;
				if ($rootScope.searchTermAll) {
					$scope.showSearchType = true;
				}
				else {
					$scope.showSearchType = false;
				}
			}
			else {
				getResultsFromAPIs(1);
			}
		}

		function getResultsFromAPIs(page) {
	        var apiResults = [];
	        var searchTerm = '';
	        $scope.showPreLoader = true;
	        $scope.showLoadMoreButton = false;

	        if ($rootScope.searchTermAll) {
	            searchTerm = '"' + $rootScope.searchTermAll + '"';
	            $scope.showSearchType = true;
	        }
	        else {
	            $scope.showSearchType = false;
	            for (var i = 0; i < $rootScope.userPreferences.searchTerms.length; i++) {
	                searchTerm += '"' + $rootScope.userPreferences.searchTerms[i] + '" OR '
	            }
	            searchTerm = searchTerm.substring(0, searchTerm.length - 4);
	        }
	        



	        for (var i = 0; i < $rootScope.userPreferences.sources.length; i++) {
	            if ($rootScope.userPreferences.sources[i].chosen || $rootScope.searchTermAll) {
	                var sourceId = $rootScope.userPreferences.sources[i].id;
	                var sourceName = $rootScope.userPreferences.sources[i].name;

	                if (sourceId == 'fda') {
						var preventEmptyResponseSearchTerm = searchTerm;
						preventEmptyResponseSearchTerm += ' OR "741AE689-9A31-2CAB-5A68-4BA650BE4EFB"'
						apiResults.push(DataFactory.getResults(sourceId, sourceName, preventEmptyResponseSearchTerm, currentPage));
					}
	                else {
	                    apiResults.push(DataFactory.getResults(sourceId, sourceName, searchTerm, page));
	                }

	            }
	        }



	        $q.all(apiResults)
                .then(function (results) {
                    var mixedCardsCollection = [];
                    var noMoreResults = false;



                    for (var i = 0; i < results.length; i++) {

						addResultsToCollection(mixedCardsCollection, results[i])
                    }

                    mixedCardsCollection = shuffleCards(mixedCardsCollection);

                    for (var i = 0; i < mixedCardsCollection.length; i++) {

                    }

                    outputMixedCards(mixedCardsCollection);


                })
                .catch(function (results) {

                    outputMixedCards([]);
                    if (currentPage > 1) {
                        alert("Results not found");
                    }
                    else {
                        alert("Results not found");
                    }
                })
	    }

		 $scope.moveNext = function () {
	        currentPage++;
			getResultsFromAPIs(currentPage);
	    };


	    $(window).on('scroll', function () {
	        if ($scope.okSaveScroll) {
	            $rootScope.cardsScrollPos = parseInt($(window).scrollTop());
	        }
	    });


	    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            $scope.okSaveScroll = false;
        })

	    $scope.$on('$stateChangeSuccess', function () {
	        $scope.okSaveScroll = true;
	    });



	    function addResultsToCollection(mixedCardsCollection, results)
	    {

	        switch (results.config.data.sourceId) {

				case "fda":
					addFDADetails(mixedCardsCollection, results);
					break;

	        }
	    }


	    function addFDADetails(mixedCardsCollection, results)
	    {
	        var data = results.data;
	        var processedRecords = [];
	        var fullTitle = '';
	        var fullDescription = '';

	        for (var i = 0; i < data.results.length; i++) {
	            if (data.results[i].openfda.spl_set_id) {
	                processedRecords.push(data.results[i]);
	            }
	        }

	        for (var i = 0; i < processedRecords.length; i++) {
	            fullTitle = '';
	            fullDescription = '';

	            if (processedRecords[i].openfda.brand_name) {
	                fullTitle = processedRecords[i].openfda.brand_name.toString() + ' ';
	            }
	            if (processedRecords[i].openfda.generic_name && processedRecords[i].openfda.generic_name.toString().toLowerCase() != processedRecords[i].openfda.brand_name.toString().toLowerCase()) {
	                fullTitle += '(' + processedRecords[i].openfda.generic_name + ') ';
	            }
	            if (processedRecords[i].openfda.manufacturer_name) {
	                fullTitle += '[' + processedRecords[i].openfda.manufacturer_name.toString() + ']';
	            }

	            if (processedRecords[i].indications_and_usage && processedRecords[i].indications_and_usage.toString().toLowerCase() != 'INDICATIONS AND USAGE:') {
	                fullDescription = processedRecords[i].indications_and_usage.toString();
	            }
	            if (fullDescription.length == 0 && processedRecords[i].description) {
	                fullDescription = processedRecords[i].description.toString();
	            }

	            mixedCardsCollection.push({
	                id: processedRecords[i].openfda.spl_set_id.toString(),
	                sourceId: results.config.data.sourceId,
	                sourceName: "OpenFDA Drugs Data",
	                title: fullTitle,
	                description: shortenText(fullDescription)
	            });
	        }
	    }



	    function shuffleCards(array) {
	        var currentIndex = array.length, temporaryValue, randomIndex;

	        // While there remain elements to shuffle...
	        while (0 !== currentIndex) {

	            // Pick a remaining element...
	            randomIndex = Math.floor(Math.random() * currentIndex);
	            currentIndex -= 1;

	            // And swap it with the current element.
	            temporaryValue = array[currentIndex];
	            array[currentIndex] = array[randomIndex];
	            array[randomIndex] = temporaryValue;
	        }

	        return array;
	    }


	    function outputMixedCards(mixedCardsCollection) {
	        var totalRecords = mixedCardsCollection.length;
	        var remainder = totalRecords % 3;
	        var columnSize = (totalRecords - remainder) / 3;

	        var columns = [
                            {
                                collection: [],
                            },
                            {
                                collection: [],
                            },
                            {
                                collection: [],
                            }
	        ];

	        if (!$scope.columns) {
	            $scope.columns = columns;
	        }


	        var currentColumnIndex = nextColumnIndexToReceiveCard;
	        for (var i = 0; i < totalRecords; i++) {
	            $scope.columns[currentColumnIndex].collection.push(mixedCardsCollection[i]);
	            currentColumnIndex++
	            if (currentColumnIndex == 3) {
	                currentColumnIndex = 0;
	            }
	            nextColumnIndexToReceiveCard = currentColumnIndex;
	        }

	        $scope.showPreLoader = false;
	        if (mixedCardsCollection.length > 0)
	        {
	            $scope.showLoadMoreButton = true;
	            $rootScope.hideLoadMoreButton = false;
	        }
	        else {
	            $scope.showLoadMoreButton = false;
	            $rootScope.hideLoadMoreButton = true;
	        }
	        
	        $rootScope.columns = $scope.columns;
	        $rootScope.cardsCurrentPage = currentPage;

	    }


	    $scope.searchAll = function (term) {
	        $rootScope.columns = undefined;
	        $rootScope.searchTermAll = term;
	        $rootScope.columns = undefined;
	        $scope.columns = undefined;
			getResultsFromAPIs(1);
	    };


	    $scope.searchBasedOnPreferences = function myfunction() {
	        $scope.searchAllTerm = "";
	        $rootScope.columns = undefined;
	        $rootScope.searchTermAll = undefined;
	        $scope.columns = undefined;
	        currentPage = 1;
			getResultsFromAPIs(1);
	    }


	    function removeHTMLTags(s) {
	        var rex = /(<([^>]+)>)/ig;

	        return s.replace(rex, "");
	    }


	    function shortenText(s) {
	        if(s.length > 300)
	        {
	            s = s.substring(0, 300) + '...';
	        }
            
	        return s;
	    }



	    $(document).ready(function () {

	        $(".search-reset").hide();
	        $(".search-input").keyup(function () {
	            if ($(this).val().length != 0) {
	                $(".search-reset").show();
	            } else {
	                $(".search-reset").hide();
	            }
	        });
	        $('.search-input').keydown(function (e) {
	            if (e.keyCode == 27) {
	                $(this).val("");
	                $(".search-reset").hide();
	            }
	            if (e.keyCode == 13) {
	                var searchInput = $('.search-input').val();
	                if (searchInput != '')
	                    $(".search_submit").trigger("click")
	            }
	        });


	        $(".search-reset").click(function (event) {
	            $(".search-reset").hide();
	            $(".search-input").val("");
	        });
	        $(document.body).on('click', '.dropdown-menu li', function (event) {
	            var $target = $(event.currentTarget);

	            $target.closest('.btn-group')
                   .find('[data-bind="label"]').text($target.text())
                      .end()
                   .children('.dropdown-toggle').dropdown('toggle');

	            return false;

	        });
	    });



	}
]);