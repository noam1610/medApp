'use strict';
var controllername = 'profile';
var _ = require('lodash');

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */

    var deps = [app.name + '.doctor', 'Doctor', 'User', 'satellizer.storage', app.namespace.security + '.authentication'];

    function controller(doctor, Doctor, User, storage, authentication) {
        var vm = this;
        vm.controllername = fullname;
        vm.edit = false;
        vm.fields = [
            ['test', 'suite'],
            ['test', 'suite']
        ];

        vm.update = {};
        vm.myprofile = authentication.getProfile();
        // vm.profilestring = storage.get('$mcfly$profile');
        // vm.myprofile = JSON.parse(vm.profilestring);
        vm.reload = function() {
            User.findById({
                    'id': vm.myprofile.id
                })
                .$promise
                .then(function(profile) {
                    vm.myprofile = profile;
                    console.log(profile);
                });

        };

        function timeConverter(unixTimestamp) {
            var a = new Date(unixTimestamp * 1000);
            var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            var year = a.getFullYear();
            var month = months[a.getMonth()];
            var date = a.getDate();
            var hour = a.getHours();
            var min = a.getMinutes();
            var sec = a.getSeconds();
            var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
            return time;
        }

        vm.save = function() {
            vm.edit = false;
            vm.update.id = vm.myprofile.id;
            console.log(vm.update);

            Doctor.changeUser({
                'collection': vm.update
            });

            vm.reload();
        };

        vm.reload();

        // doctor.getProfile()
        //     .then(function(profile) {
        //         vm.myprofile = profile;
        //         vm.myprofile.lastVisite = timeConverter(profile.lastVisite);
        //     });
    }

    controller.$inject = deps;
    app.controller(fullname, controller);
};
