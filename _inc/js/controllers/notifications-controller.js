euiApp.controller('NotificationsController', ['$scope', 'NotificationsService', function($scope, NotificationsService) {

	//display the notifications
	var updateSubmitSuccess = function() {
		$scope.showSubmitSuccessMessage = NotificationsService.showSubmitSuccessMessage;
	};

	var updateUpdateSuccess = function() {
		$scope.showUpdateSuccessMessage = NotificationsService.showUpdateSuccessMessage;
	};

	var updateDeleteSuccess = function() {
		$scope.showDeleteSuccessMessage = NotificationsService.showDeleteSuccessMessage;
	};

	var updateError = function() {
		$scope.showErrorMessage = NotificationsService.showErrorMessage;
	};

	//watch for changes
	NotificationsService.registerObserverCallback(updateSubmitSuccess);
	NotificationsService.registerObserverCallback(updateUpdateSuccess);
	NotificationsService.registerObserverCallback(updateDeleteSuccess);
	NotificationsService.registerObserverCallback(updateError);

}]);