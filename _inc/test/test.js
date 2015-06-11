//tests
describe('FormController', function() {

	var $controller, $scope, $httpBackend, countryRequestHandler, stateRequestHandler, saveEntryRequestHandler;

	beforeEach(function() {
		module('euiApp');
		module('templates');
		inject(function($rootScope, _$controller_, _$httpBackend_, _$templateCache_, _$compile_, _config_) {
			$scope = $rootScope.$new();
			$httpBackend = _$httpBackend_;
			$controller = _$controller_;
			$templateCache = _$templateCache_;
			$compile = _$compile_;
			config = _config_;
		});

		countryRequestHandler = $httpBackend.whenJSONP(config.geonamesApiUrl + '/countryInfoJSON?callback=JSON_CALLBACK&username=' + config.geonamesUser)
			.respond({
				"geonames":[  
			      	{  
						"continent":"EU",
						"capital":"Andorra la Vella",
						"languages":"ca",
						"geonameId":3041565,
						"south":42.42849259876837,
						"isoAlpha3":"AND",
						"north":42.65604389629997,
						"fipsCode":"AN",
						"population":"84000",
						"east":1.7865427778319827,
						"isoNumeric":"020",
						"areaInSqKm":"468.0",
						"countryCode":"AD",
						"west":1.4071867141112762,
						"countryName":"Andorra",
						"continentName":"Europe",
						"currencyCode":"EUR"
			      	}
		      	]
			});

		stateRequestHandler = $httpBackend.whenJSONP(config.geonamesApiUrl + '/childrenJSON?username=' + config.geonamesUser + '&geonameId=3041565&callback=JSON_CALLBACK')
			.respond({
				"totalResultsCount":2,
			   	"geonames":[  
			      	{  
						"countryId":"3041565",
						"adminCode1":"07",
						"countryName":"Andorra",
						"fclName":"country, state, region,...",
						"countryCode":"AD",
						"lng":"1.49414",
						"fcodeName":"first-order administrative division",
						"toponymName":"Andorra la Vella",
						"fcl":"A",
						"name":"Andorra la Vella",
						"fcode":"ADM1",
						"geonameId":3041566,
						"lat":"42.5045",
						"adminName1":"Andorra la Vella",
						"population":24211
			      	},
			      	{  
						"countryId":"3041565",
						"adminCode1":"02",
						"countryName":"Andorra",
						"fclName":"country, state, region,...",
						"countryCode":"AD",
						"lng":"1.65833",
						"fcodeName":"first-order administrative division",
						"toponymName":"Canillo",
						"fcl":"A",
						"name":"Canillo",
						"fcode":"ADM1",
						"geonameId":3041203,
						"lat":"42.58333",
						"adminName1":"Canillo",
						"population":5067
			      	}
		      	]
	      	});
		saveEntryRequestHandler = $httpBackend.whenPOST(config.parseApiUrl + '/classes/FormEntry')
			.respond({
				"createdAt":"2015-06-11T02:10:42.989Z",
				"objectId":"ofmEz5JqxF"
			});

	});

	afterEach(function() {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
   	});

	it('Should initialize a new form entry', function() {
		$httpBackend.expectJSONP(config.geonamesApiUrl + '/countryInfoJSON?callback=JSON_CALLBACK&username=' + config.geonamesUser);
		var controller = $controller('FormController', { $scope: $scope });
		$httpBackend.flush();
		expect($scope.formEntry).toBeDefined();
		expect($scope.formEntry.objectId).not.toBeDefined();
	});

	it('Should load the list of countries on init', function() {
		$httpBackend.expectJSONP(config.geonamesApiUrl + '/countryInfoJSON?callback=JSON_CALLBACK&username=' + config.geonamesUser);
		var controller = $controller('FormController', { $scope: $scope });
		$httpBackend.flush();
		expect($scope.countries).toBeDefined();
	});

	it('Should be able to load states based on a country ID', function() {
		$httpBackend.expectJSONP(config.geonamesApiUrl + '/childrenJSON?username=' + config.geonamesUser + '&geonameId=3041565&callback=JSON_CALLBACK');
		var controller = $controller('FormController', { $scope: $scope });
		$scope.formEntry.country = {geonameId: 3041565};
		$scope.updateStateList();
		$httpBackend.flush();
		expect($scope.states).toBeDefined();
	});

	it('Should create a new entry if no ObjectId is specified', function() {
		var controller = $controller('FormController', { $scope: $scope });
		var templateHtml = $templateCache.get('_inc/templates/form-fields.html');
		formElem = angular.element(templateHtml);
	    $compile(formElem)($scope);
	    $scope.$apply();
	    spyOn($scope, 'saveNewEntry');
		$scope.submitForm();
		$httpBackend.flush();
		expect($scope.saveNewEntry).toHaveBeenCalled();
	});

	it('Should update an entry if no ObjectId is specified', function() {
		var controller = $controller('FormController', { $scope: $scope });
		var templateHtml = $templateCache.get('_inc/templates/form-fields.html');
		formElem = angular.element(templateHtml);
	    $compile(formElem)($scope);
	    $scope.$apply();
	    spyOn($scope, 'updateEntry');
	    $scope.formEntry.setData({objectId: '12345'});
		$scope.submitForm();
		$httpBackend.flush();
		expect($scope.updateEntry).toHaveBeenCalled();
	});
});

describe('ResponsesController', function() {
	var $controller, $scope, $httpBackend, entryListRequestHandler, entryDeleteRequestHandler;

	beforeEach(function() {
		module('euiApp');
		inject(function($rootScope, _$controller_, _$httpBackend_, _Entry_) {
			$scope = $rootScope.$new();
			$controller = _$controller_;
			$httpBackend = _$httpBackend_;
			Entry = _Entry_;
		});

		entryListRequestHandler = $httpBackend.whenGET(config.parseApiUrl + '/classes/FormEntry')
			.respond({
				"results":[  
			      	{  
						"city":"Rochester",
						"country":{  
							"areaInSqKm":"9629091.0",
							"capital":"Washington",
							"continent":"NA",
							"continentName":"North America",
							"countryCode":"US",
							"countryName":"United States",
							"currencyCode":"USD",
							"east":-66.954811,
							"fipsCode":"US",
							"geonameId":6252001,
							"isoAlpha3":"USA",
							"isoNumeric":"840",
							"languages":"en-US,es-US,haw,fr",
							"north":49.388611,
							"population":"310232863",
							"south":24.544245,
							"west":-124.733253
				        },
			         	"createdAt":"2015-06-10T18:11:10.238Z",
			         	"email":"jd@bn.co",
			         	"firstName":"James",
			         	"lastName":"DeWitt",
			         	"objectId":"1gjujfMtog",
			         	"phone":"5856900730",
			         	"state":{  

				        },
			         	"streetAddress":"73 Drake Drive",
			         	"updatedAt":"2015-06-10T18:11:10.238Z",
			         	"zip":"14617"
			      	},
			      	{  
			         	"city":"Rochester",
				         "country":{  

				        },
			         	"createdAt":"2015-06-10T18:12:21.809Z",
			         	"email":"jd@bn.co",
			         	"firstName":"James",
			         	"lastName":"DeWitt",
			         	"objectId":"tw6XK6cK0Z",
			         	"phone":"5856900730",
			        	"state":{  

			         	},
			        	 "streetAddress":"73 Drake Drive",
			         	"updatedAt":"2015-06-10T18:12:21.809Z",
			         	"zip":"14617"
			      	}
		      	]
			});
		entryDeleteRequestHandler = $httpBackend.whenDELETE(config.parseApiUrl + '/classes/FormEntry/1gjujfMtog')
			.respond({});

	});

	afterEach(function() {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
   	});

   	it('Should request all form entries', function() {
   		$httpBackend.expectGET(config.parseApiUrl + '/classes/FormEntry');
   		var controller = $controller('ResponsesController', { $scope: $scope });
   		$httpBackend.flush();
   		expect($scope.responses).toBeDefined();
   		expect($scope.responses.length).toBe(2);
   	});

   	it('Should be able to select an object to edit', function() {
   		$httpBackend.expectGET(config.parseApiUrl + '/classes/FormEntry');
   		var controller = $controller('ResponsesController', { $scope: $scope });
   		$httpBackend.flush();
   		$scope.editEntry('1gjujfMtog');
   		var obj = Entry.retrieveObject();
   		expect(obj).toBeDefined();
   		expect(obj.firstName).toBe('James');
   	});

   	it('Should be able to delete an entry', function() {
   		$httpBackend.expectDELETE(config.parseApiUrl + '/classes/FormEntry/1gjujfMtog');
   		var controller = $controller('ResponsesController', { $scope: $scope });
   		$scope.deleteEntry('1gjujfMtog');
   		$httpBackend.flush();
   		expect($scope.responses.length).toBe(1);
   	});

});