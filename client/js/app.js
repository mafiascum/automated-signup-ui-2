import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngResource from 'angular-resource';
import ngMaterial from 'angular-material';
import ngFormly from 'angular-formly';
import formlyBootstrap from 'angular-formly-templates-bootstrap';

import MainCtrl from './controllers/mainCtrl';

require('lodash');
require("angular-xeditable");

angular.module('ms-as-ui', [
    uiRouter,
    ngResource,
    ngMaterial,
    ngFormly,
    formlyBootstrap,
    'xeditable'
])
    .config(['$stateProvider', '$urlRouterProvider', '$urlMatcherFactoryProvider', '$httpProvider', 'formlyConfigProvider',
	     function($stateProvider, $urlRouterProvider, $urlMatcherFactoryProvider, $httpProvider, formlyConfigProvider) {
		 $urlMatcherFactoryProvider.strictMode(false);

		 $urlRouterProvider.otherwise('/404');

		 $stateProvider.state('root', {
		     url: '',
		     templateUrl: '/public/templates/home.html',
                     controller: 'MainCtrl',
                     controllerAs: 'vm'
		 });                 
	     }])
    .controller('MainCtrl', MainCtrl);