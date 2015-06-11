euiApp.controller('ResponsesController', ['$scope', '$http', '$timeout', '$location', 'geoFactory', 'Entry', 'config', 'NotificationsService', function($scope, $http, $timeout, $location, geoFactory, Entry, config, NotificationsService) {

	//get entry listing
	$scope.init = function() {
		Entry.getAllEntries()
		.then(function(response) {
			$scope.responses = response.results;
		}, function(response) {
			NotificationsService.displayErrorMessage();
			console.log(response);
		});
	};

	//edit existing entry
	$scope.editEntry = function(objectId) {
		var objectToEdit = _.findWhere($scope.responses, {objectId: objectId});
		//send the already loaded entry to edit to the other controller
		Entry.storeObject(objectToEdit);
		$scope.goToForm();
	};

	//delete an entry
	$scope.deleteEntry = function(objectId) {
		Entry.deleteEntry(objectId)
			.then(function() {
				_.remove($scope.responses, {
				    objectId: objectId
				});
				NotificationsService.displayDeleteSuccessMessage();
				var el = document.body.querySelector('tr[data-objectId="' + objectId + '"]');
				if(el) {
					el.remove();
				}
			}, function(response) {
				NotificationsService.displayErrorMessage();
				console.log(response);
			});
	};

	//switch views
	$scope.goToForm = function() {
		$location.path('viewForm');
	};

	//go
	$scope.init();

}]);