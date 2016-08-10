'use strict';
var controllername = 'home';

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */

    var deps = ['$rootScope', '$state', app.namespace.security + '.authentication'];

    function controller($rootScope, $state, authentication) {
        var vm = this;
        vm.controllername = fullname;
        vm.providers = [];
        vm.authenticate = authentication.authenticate;
        vm.signIn = function() {

            $rootScope.username = vm.username;
            $state.go('profile');
        };

        vm.enter = function(param) {
            vm.authenticate(param);
        };
        authentication.configuredProviders
            .then(function(data) {
                vm.providers = data;
                vm.signIn();
            });
    }
    controller.$inject = deps;
    app.controller(fullname, controller);
};
