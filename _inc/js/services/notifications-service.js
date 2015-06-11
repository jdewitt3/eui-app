euiApp.factory('NotificationsService', ['$timeout', function($timeout) {

	//service to allow any controller to display a notification
	var service = {
			showSubmitSuccessMessage: false,
			showUpdateSuccessMessage: false,
			showDeleteSuccessMessage: false,
			showErrorMessage: false
		},
		observerCallbacks = [];

	var notifyObservers = function(){
	    angular.forEach(observerCallbacks, function(callback){
	      	callback();
		});
	};

	service.registerObserverCallback = function(callback){
		observerCallbacks.push(callback);
	};

	service.displaySubmitSuccessMessage = function() {
		console.log('success');
		service.showSubmitSuccessMessage = true;
		notifyObservers();
		$timeout(function() { service.showSubmitSuccessMessage = false; notifyObservers(); }, 3000); 
	};

	service.displayUpdateSuccessMessage = function() {
		service.showUpdateSuccessMessage = true;
		notifyObservers();
		$timeout(function() { service.showUpdateSuccessMessage = false; notifyObservers(); }, 3000); 
	};

	service.displayErrorMessage = function() {
		service.showErrorMessage = true;
		notifyObservers();
		$timeout(function() { service.showErrorMessage = false; notifyObservers(); }, 3000); 		
	};

	service.displayDeleteSuccessMessage = function() {
		service.showDeleteSuccessMessage = true;
		notifyObservers();
		$timeout(function() { service.showDeleteSuccessMessage = false; notifyObservers(); }, 3000); 		
	};

	return service;

}]);