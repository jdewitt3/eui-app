//define the app module
euiApp = angular.module('euiApp', ['ngAnimate', 'ngRoute']);

//config object
euiApp.constant('config', {
	parseAppId: "6ZnVevmNv2VzALQhRWjADH2SqQ5xkvr67LKOj7d7",
	parseApiKey: "oMhvYcxIT4OVqcA7RFLbQsVXDVMgqIOUHmtylPcw",
	parseApiUrl: "https://api.parse.com/1",
  geonamesUser: 'jdewitt3',
  geonamesApiUrl: 'https://api.geonames.org'
});


//routes
euiApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/viewForm', {
        templateUrl: '_inc/templates/form-fields.html',
        controller: 'FormController'
      }).
      when('/viewResponses', {
      	templateUrl: '_inc/templates/form-results.html',
        controller: 'ResponsesController'
      }).
      otherwise({
        redirectTo: '/viewForm'
      });
  }]);