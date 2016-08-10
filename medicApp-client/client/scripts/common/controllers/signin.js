'use strict';
var controllername = 'signin';

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
            $state.go('profile');
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
