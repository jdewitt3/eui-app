euiApp.factory('Entry', ['$http', '$q', 'config', function($http, $q, config) {

	var service = {};

	//store an object to edit in the form view
	var objectStore = {};

	//constructor for a new empty form entry
	service.Entry = function() {
		var defaultData = {
			firstName: '',
			lastName: '',
			streetAddress: '',
			city: '',
			zip: '',
			country: {},
			state: {},
			phone: '',
			email: ''
		};
		//set default data
		this.setData(defaultData);
	};

	//entry class methods
	service.Entry.prototype = {
		setData: function(data) {
			angular.extend(this, data);
		},
		save: function() {
			var deferred = $q.defer();
			$http({method: 'POST', url: config.parseApiUrl + '/classes/FormEntry', headers: { 'X-Parse-Application-Id': config.parseAppId, 'X-Parse-REST-API-Key': config.parseApiKey, 'Content-Type': 'application/json'}, data: this})
			.success(function(data) {
				deferred.resolve(data);
			}).error(function(data) {
				deferred.reject(data);
			});

			return deferred.promise;
		},
		update: function() {
			var deferred = $q.defer();
			$http({method: 'PUT', url: config.parseApiUrl + '/classes/FormEntry/' + this.objectId, headers: { 'X-Parse-Application-Id': config.parseAppId, 'X-Parse-REST-API-Key': config.parseApiKey, 'Content-Type': 'application/json'}, data: this})
			.success(function(data) {
				deferred.resolve(data);
			}).error(function(data) {
				deferred.reject(data);
			});

			return deferred.promise;
		}
	};

	//service methods
	//get entry listing
	service.getAllEntries = function() {
		var deferred = $q.defer();
		$http({method: 'GET', url: config.parseApiUrl + '/classes/FormEntry', headers: { 'X-Parse-Application-Id': config.parseAppId, 'X-Parse-REST-API-Key': config.parseApiKey, 'Content-Type': 'application/json'}})
		.success(function(data) {
			deferred.resolve(data);
		}).error(function(data) {
			deferred.reject(data);
		});

		return deferred.promise;
	};

	service.storeObject = function(obj) {
		objectStore = obj;
	};

	service.retrieveObject = function() {
		//send back object then clear the store
		var obj = _.clone(objectStore);
		objectStore = {};
		return obj;
	};

	//delete an entry by id
	service.deleteEntry = function(id) {
		var deferred = $q.defer();
		$http({method: 'DELETE', url: config.parseApiUrl + '/classes/FormEntry/' + id, headers: { 'X-Parse-Application-Id': config.parseAppId, 'X-Parse-REST-API-Key': config.parseApiKey, 'Content-Type': 'application/json'}, data: this})
		.success(function(data) {
			deferred.resolve(data);
		}).error(function(data) {
			deferred.reject(data);
		});

		return deferred.promise;
	};
	
	//return methods
	return service;

}]);