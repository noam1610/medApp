'use strict';
var controllername = 'search';

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */

    var deps = [app.name + '.patient', '$scope', '$filter'];

    function controller(patient, $scope, $filter) {
        var vm = this;
        vm.controllername = fullname;
        vm.search = '';

        vm.noResult = false;

        vm.convert = function timeConverter(unixTimestamp) {
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
        };

        $scope.$watch('vm.search', function() {
            patient.getAllPatient()
                .then(function(patients) {
                    vm.allPatients = patients;
                });
            vm.patients = vm.allPatients;
            vm.patients = $filter('filter')(vm.allPatients, {
                id: vm.search
            });
            if (vm.patients.length < 1) {
                vm.noResult = true;
            } else {
                vm.noResult = false;
            }

            // vm.patients = $filter('orderBy')(vm.allPatients, 'id');
            // vm.patients = $filter('filter')(vm.allPatients, username, vm.search);
        }, true);
        // $scope.$watch('vm.search', function(newValue, oldValue) {
        //     patient.getAllPatient()
        //         .then(function(patients) {
        //             vm.allPatients = patients;
        //         });
        //     vm.patients = $filter('filter')(vm.allPatients, username, vm.search);
        // });

    }

    controller.$inject = deps;
    app.controller(fullname, controller);
};
