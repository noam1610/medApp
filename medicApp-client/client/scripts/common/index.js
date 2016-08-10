'use strict';
require('angular-ui-router');
require('angular-ui-bootstrap');
require('lbServices');
var mcflyAngular = require('mcfly-angular');

var modulename = 'common';

module.exports = function(namespace) {

    var fullname = namespace + '.' + modulename;

    var angular = require('angular');
    var security = mcflyAngular.security();
    var app = angular.module(fullname, ['ui.router', 'ui.bootstrap', 'lbServices', security.name]);

    app.namespace = app.namespace || {};
    app.namespace.security = security.name;

    // inject:folders start
    require('./controllers')(app);
    require('./services')(app);
    // inject:folders end

    app.config(['LoopBackResourceProvider', function(LoopBackResourceProvider) {
        LoopBackResourceProvider.setUrlBase('http://localhost:3000/api');
    }]);

    var configRoutesDeps = ['$stateProvider', '$urlRouterProvider'];
    var configRoutes = function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('home', {
                url: '/',
                template: require('./views/home.html'),
                controller: fullname + '.home as vm'
            })
            .state('signin', {
                url: '/signin',
                template: require('./views/signin.html'),
                controller: fullname + '.signin as vm'
            })
            .state('profile', {
                url: '/profile',
                template: require('./views/profile.html'),
                controller: fullname + '.profile as vm',
                requiresLogin: true
            })
            .state('search', {
                url: '/search',
                template: require('./views/search.html'),
                controller: fullname + '.search as vm',
                requiresLogin: true
            })
            .state('create', {
                url: '/create',
                template: require('./views/create.html'),
                controller: fullname + '.create as vm',
                requiresLogin: true
            })
            .state('patient', {
                url: '/patient/:id',
                template: require('./views/patient.html'),
                controller: fullname + '.patient as vm',
                requiresLogin: true
            });
    };
    configRoutes.$inject = configRoutesDeps;
    app.config(configRoutes);

    var configMcflyDeps = [security.name + '.authenticationProvider'];
    var configMcfly = function(authenticationProvider) {
        var options = {
            baseUrl: 'http://localhost:3000/',
            apiPrefix: 'api'
        };
        authenticationProvider.init(options);
    };
    configMcfly.$inject = configMcflyDeps;
    app.config(configMcfly);
    return app;
};
