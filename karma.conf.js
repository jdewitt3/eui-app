// Karma configuration

module.exports = function(config) {
  config.set({
	frameworks: ['jasmine'],
    files: [
    	'node_modules/angular/angular.js',
    	'node_modules/angular-mocks/angular-mocks.js',
    	'node_modules/angular-animate/angular-animate.js',
    	'node_modules/angular-route/angular-route.js',
   		'_inc/lib/lodash.min.js',
     	'_inc/js/**/*.js',
     	'_inc/test/*.js',
     	'_inc/templates/*.html'
    ],
    preprocessors: {
    	'**/*.html': ['ng-html2js']
	},
	plugins : [
	  'karma-jasmine',
	  'karma-ng-html2js-preprocessor',
	  'karma-phantomjs-launcher'
	],
	ngHtml2JsPreprocessor: {
	  // include beforeEach(module('templates')) in unit tests
	  moduleName: 'templates'
	},
    reporters: ['progress'],
    colors: true,
    browsers: ['PhantomJS'],
    captureTimeout: 60000,
    singleRun: true
  });
};
