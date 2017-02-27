//angular core modules
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import uiGrid from 'angular-ui-grid';

import ngResource from 'angular-resource';
import ngMaterial from 'angular-material';
import ngFormly from 'angular-formly';
import formlyBootstrap from 'angular-formly-templates-bootstrap';

//controllers
import MainCtrl from './controllers/mainCtrl';
import GameQueuesListCtrl from './controllers/gameQueuesListCtrl';
import GameQueuesEditCtrl from './controllers/gameQueuesEditCtrl';

//services
import ApiService from './services/apiService';

//deps
require('lodash');
require("angular-xeditable");

//css
require('bootstrap/dist/css/bootstrap.min.css');
require('angular-ui-grid/ui-grid.min.css');

angular.module('ms-as-ui', [
    uiRouter,
    uiGrid,
    `${uiGrid}.selection`,
    ngResource,
    ngMaterial,
    ngFormly,
    formlyBootstrap,
    'xeditable'
])
    .config(/*@ngInject*/ ($stateProvider, $urlRouterProvider, $urlMatcherFactoryProvider, $httpProvider, formlyConfigProvider, API_TOKEN) => {
	$urlMatcherFactoryProvider.strictMode(false);

	$urlRouterProvider.otherwise('/404');

	$stateProvider.state('root', {
	    url: '',
	    templateUrl: '/public/templates/home.html',
            controller: 'MainCtrl',
            controllerAs: 'vm'
	});

        $stateProvider.state('game_queues', {
            abstract: true,
            url: '/game_queues',
            template: '<ui-view/>'
	});

        $stateProvider.state('game_queues.list', {
	    url: '',
	    templateUrl: '/public/templates/list.html',
            controller: 'GameQueuesListCtrl',
            controllerAs: 'vm'
	});

        $stateProvider.state('game_queues.edit', {
	    url: '/edit/:id',
	    templateUrl: '/public/templates/edit.html',
            controller: 'GameQueuesEditCtrl',
            controllerAs: 'vm'
	});

        $stateProvider.state('game_queues.add', {
	    url: '/add',
	    templateUrl: '/public/templates/edit.html',
            controller: 'GameQueuesEditCtrl',
            controllerAs: 'vm'
	});

        $httpProvider.defaults.headers.common.Authorization = `Token token=${API_TOKEN}`;
    })
    .controller('MainCtrl', MainCtrl)
    .controller('GameQueuesListCtrl', GameQueuesListCtrl)
    .controller('GameQueuesEditCtrl', GameQueuesEditCtrl)
    .factory('ApiService', ApiService);