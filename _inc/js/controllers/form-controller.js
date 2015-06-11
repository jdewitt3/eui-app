euiApp.controller('FormController', ['$scope', '$http', '$timeout', '$location', 'geoFactory', 'Entry', 'config', 'NotificationsService', function($scope, $http, $timeout, $location, geoFactory, Entry, config, NotificationsService) {

	//init
	$scope.init = function() {
		//keep the form in this scope
		$scope.forms = {};

		//start with an empty form entry
		$scope.formEntry = new Entry.Entry();

		//if editing an existing entry, fill in the data
		$scope.formEntry.setData(Entry.retrieveObject());

		//get country list
		$scope.getCountries();

		//if editing, we need the state list too...
		if($scope.formEntry.country.geonameId) {
			$scope.updateStateList();
		}
	};

	//get countries
	$scope.getCountries = function() {
		geoFactory.getCountryList()
			.then(function(response) {
				//success
				$scope.countries = response;
			}, function(response) {
				//error
				NotificationsService.displayErrorMessage();
				console.log(response);
			});
	};

	//get states/provinces
	$scope.updateStateList = function() {
		geoFactory.getStateList($scope.formEntry.country.geonameId)
			.then(function(response) {
				//success
				$scope.states = response;
			}, function(response) {
				//error
				NotificationsService.displayErrorMessage();
				console.log(response);
			});
	};

	//submit the form
	$scope.submitForm = function(){
		if(!$scope.formEntry.objectId) {
			//save new
			$scope.saveNewEntry();
		} else {
			//update
			$scope.updateEntry();
		}
	};

	//save new
	$scope.saveNewEntry = function() {
		$scope.formEntry.save()
			.then(function() {
				//success
				NotificationsService.displaySubmitSuccessMessage();
				//reset form
				$scope.formEntry = new Entry.Entry();
				$scope.forms.contactForm.$setPristine();
				$scope.forms.contactForm.$setUntouched();
				$scope.forms.contactForm.$setValidity('forms.contactForm', false);
			}, function(response) {
				//error
				NotificationsService.displayErrorMessage();
				console.log(response);
			});
	};

	//update entry
	$scope.updateEntry = function() {
		$scope.formEntry.update()
			.then(function() {
				NotificationsService.displayUpdateSuccessMessage();
				$scope.goToResponses();
			}, function(response) {
				//error
				NotificationsService.displayErrorMessage();
				console.log(response);
				$scope.goToResponses();
			});
	};

	//switch view
	$scope.goToResponses = function() {
		$location.path('viewResponses');
	};

	//go
	$scope.init();

}]);