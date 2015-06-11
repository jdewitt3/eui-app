euiApp.factory('geoFactory', ['$http', '$q', 'config', function($http, $q, config) {

	//service to get data from geonames API
	var service = {};

	//get top level listing of all countries
	service.getCountryList = function() {
		var deferred = $q.defer();
		$http.jsonp(config.geonamesApiUrl + '/countryInfoJSON?callback=JSON_CALLBACK&username=' + config.geonamesUser)
			.success(function(response) {
				deferred.resolve(response.geonames);
			}).error(function() {
				deferred.reject('Unable to contact GeoNames');
			});
		return deferred.promise;
	};

	//get list of states/provinces/regions for selected country
	service.getStateList = function(geonameId) {
		var deferred = $q.defer();
		$http.jsonp(config.geonamesApiUrl + '/childrenJSON?username=' + config.geonamesUser + '&geonameId=' + geonameId + '&callback=JSON_CALLBACK')
			.success(function(response) {
				deferred.resolve(response.geonames);
			}).error(function() {
				deferred.reject('Unable to contact GeoNames');
			});
		return deferred.promise;
	};

	//return methods
	return service;

}]);