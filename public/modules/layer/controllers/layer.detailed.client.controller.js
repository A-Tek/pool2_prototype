

'use strict';

angular.module('layer').controller('DetailedlayerController', ['$scope', '$rootScope', '$stateParams', 'DataFactory',
	function ($scope, $rootScope, $stateParams, DataFactory) {


	    var detailedRecordData = [];



		getDetails();

		function getDetails() {

			$(window).scrollTop(0);

			for (var i = 0; i < $rootScope.userPreferences.sources.length; i++) {

				if ($rootScope.userPreferences.sources[i].id == $stateParams.sourceId) {
					$scope.sourceName = $rootScope.userPreferences.sources[i].name;
					console.log("source name is here " + $rootScope.userPreferences.sources[i].name);
				}
			}

			var singleRecordApiParam = $stateParams.recordId;
			if ($stateParams.sourceId == 'medlinePlusConnect') {
				singleRecordApiParam = $stateParams.searchTerm;
			}

			$scope.showPreLoader = true;

			DataFactory.getFDADetails($stateParams.sourceId, singleRecordApiParam)
				.success(function (data) {

					switch ($stateParams.sourceId) {
						case "dailyMed":
							fillInFDADrugs(data.results[0]);
							break;
						case "fda":
							fillInFDADrugs(data.results[0]);
							break;

					}

					$scope.detailedRecordData = detailedRecordData;

					$scope.showDetailedCardContainer = true;

					$scope.showPreLoader = false;

					console.log("success getting a detailed record");

				})
				.error(function (data, status, headers, config) {
					console.log("an error occured getting a detailed record");
				});
		}



	    function fillInFDADrugs(record) {
	        var fullTitle = '';

	        if (record.openfda.brand_name) {
	            fullTitle = record.openfda.brand_name.toString() + ' ';
	        }
	        if (record.openfda.generic_name && record.openfda.generic_name.toString().toLowerCase() != record.openfda.brand_name.toString().toLowerCase()) {
	            fullTitle += '(' + record.openfda.generic_name + ') ';
	        }
	        if (record.openfda.manufacturer_name) {
	            fullTitle += '[' + record.openfda.manufacturer_name.toString() + ']';
	        }

	        detailedRecordData = [
                {
                    name: "Title",
                    value: fullTitle,
                    mainDisplay: false
                }
	        ]

	        if (record.information_for_patients) {
	            detailedRecordData.push({
	                name: "Information for Patients",
	                value: record.information_for_patients,
	                mainDisplay: true
	            });
	        }


	        if (record.indications_and_usage) {
	            detailedRecordData.push({
	                name: "Indications and Usage",
	                value: record.indications_and_usage,
	                mainDisplay: true
	            });
	        }

	        if (record.contraindications) {
	            detailedRecordData.push({
	                name: "Contraindications",
	                value: record.contraindications,
	                mainDisplay: true
	            });
	        }

	        if (record.how_supplied) {
	            detailedRecordData.push({
	                name: "How Supplied",
	                value: record.how_supplied,
	                mainDisplay: true
	            });
	        }

	        if (record.pharmacokinetics) {
	            detailedRecordData.push({
	                name: "Pharmacokinetics",
	                value: record.pharmacokinetics,
	                mainDisplay: true
	            });
	        }

	        if (record.dosage_and_administration) {
	            detailedRecordData.push({
	                name: "Dosage and Administration",
	                value: record.dosage_and_administration,
	                mainDisplay: true
	            });
	        }


	        if (record.storage_and_handling) {
	            detailedRecordData.push({
	                name: "Storage and Handling",
	                value: record.storage_and_handling,
	                mainDisplay: true
	            });
	        }

	        if (record.description) {
	            detailedRecordData.push({
	                name: "Description",
	                value: record.description,
	                mainDisplay: true
	            });
	        }


	        if (record.warnings_and_cautions) {
	            detailedRecordData.push({
	                name: "Warnings and Cautions",
	                value: record.warnings_and_cautions,
	                mainDisplay: true
	            });
	        }


	        if (record.pediatric_use) {
	            detailedRecordData.push({
	                name: "Pediatric Use",
	                value: record.pediatric_use,
	                mainDisplay: true
	            });
	        }


	        if (record.recent_major_changes) {
	            detailedRecordData.push({
	                name: "Recent Major Changes",
	                value: record.recent_major_changes,
	                mainDisplay: true
	            });
	        }


	        if (record.geriatric_use) {
	            detailedRecordData.push({
	                name: "Geriatric Use",
	                value: record.geriatric_use,
	                mainDisplay: true
	            });
	        }


	        if (record.adverse_reactions) {
	            detailedRecordData.push({
	                name: "Adverse Reactions",
	                value: record.adverse_reactions,
	                mainDisplay: true
	            });
	        }

	        if (record.overdosage) {
	            detailedRecordData.push({
	                name: "Overdosage",
	                value: record.overdosage,
	                mainDisplay: true
	            });
	        }


	        if (record.drug_interactions) {
	            detailedRecordData.push({
	                name: "Drug Interactions",
	                value: record.drug_interactions,
	                mainDisplay: true
	            });
	        }


	        if (record.nonclinical_toxicology) {
	            detailedRecordData.push({
	                name: "Nonclinical Toxicology",
	                value: record.nonclinical_toxicology,
	                mainDisplay: true
	            });
	        }


	        if (record.use_in_specific_populations) {
	            detailedRecordData.push({
	                name: "Use in Specific Populations",
	                value: record.use_in_specific_populations,
	                mainDisplay: true
	            });
	        }


	        if (record.use_in_specific_populations) {
	            detailedRecordData.push({
	                name: "Use in Specific Populations",
	                value: record.use_in_specific_populations,
	                mainDisplay: true
	            });
	        }


	        if (record.clinical_studies) {
	            detailedRecordData.push({
	                name: "Clinical Studies",
	                value: record.clinical_studies,
	                mainDisplay: true
	            });
	        }

	        detailedRecordData.push({
	            name: "NLM DailyMed Details",
	            value: formatURL('http://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=' + $stateParams.recordId),
	            mainDisplay: true
	        });

	    }




	    function formatURL(url) {

            return '<a class="field_link" target="_blank" href='+ url +'>'+ url +'</a>';
	    }


	}
]);