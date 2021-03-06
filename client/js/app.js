//angular core modules
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import uiGrid from 'angular-ui-grid';
import ngResource from 'angular-resource';
import ngMaterial from 'angular-material';
import ngFormly from 'angular-formly';
import formlyBootstrap from 'angular-formly-templates-bootstrap';
import ngGrowl from 'angular-growl-v2-webpack';

//controllers
import MainCtrl from './controllers/mainCtrl';
import GameQueuesListCtrl from './controllers/gameQueuesListCtrl';
import GameQueuesEditCtrl from './controllers/gameQueuesEditCtrl';

//services
import ApiService from './services/apiService';
import ModelFieldService from './services/modelFieldService';

//deps
require('lodash');
require("angular-xeditable");

//css
require('bootstrap/dist/css/bootstrap.min.css');
require('angular-ui-grid/ui-grid.min.css');
require('angular-growl-v2-webpack/src/growl.css');

export default angular.module('ms-as-ui', [
    uiRouter,
    uiGrid,
    `${uiGrid}.selection`,
    ngResource,
    ngMaterial,
    ngFormly,
    formlyBootstrap,
    'xeditable',
    ngGrowl
])
    .constant('ENV', {
        SERVICE_ROOT: process.env.SERVICE_ROOT,
        API_TOKEN: process.env.API_TOKEN
    })
    .config(/*@ngInject*/ ($stateProvider, $urlRouterProvider, $urlMatcherFactoryProvider, $httpProvider, formlyConfigProvider, growlProvider, ENV) => {
	$urlMatcherFactoryProvider.strictMode(false);

	$urlRouterProvider.otherwise('/404');

        $stateProvider.state('root', {
            abstract: true,
            url: '',
            template: '<div><div growl></div><ui-view/></div>'
        });

	$stateProvider.state('root.home', {
	    url: '',
	    templateUrl: '/public/templates/home.html',
            controller: 'MainCtrl',
            controllerAs: 'vm'
	});

        $stateProvider.state('root.game_queues', {
            abstract: true,
            url: '/game_queues',
            template: '<ui-view/>'
	});

        $stateProvider.state('root.game_queues.list', {
	    url: '',
	    templateUrl: '/public/templates/list.html',
            controller: 'GameQueuesListCtrl',
            controllerAs: 'vm'
	});

        $stateProvider.state('root.game_queues.edit', {
	    url: '/edit/:id',
	    templateUrl: '/public/templates/edit.html',
            controller: 'GameQueuesEditCtrl',
            controllerAs: 'vm'
	});

        $stateProvider.state('root.game_queues.add', {
	    url: '/add',
	    templateUrl: '/public/templates/edit.html',
            controller: 'GameQueuesEditCtrl',
            controllerAs: 'vm'
	});

        $httpProvider.defaults.headers.common.Authorization = `Token token=${ENV.API_TOKEN}`;

        growlProvider.globalTimeToLive(3000);
        growlProvider.globalDisableCountDown(true);
    })
    .controller('MainCtrl', MainCtrl)
    .controller('GameQueuesListCtrl', GameQueuesListCtrl)
    .controller('GameQueuesEditCtrl', GameQueuesEditCtrl)
    .factory('ApiService', ApiService)
    .factory('ModelFieldService', ModelFieldService)
    .name;