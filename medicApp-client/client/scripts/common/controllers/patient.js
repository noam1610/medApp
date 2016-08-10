'use strict';
var controllername = 'patient';

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */

    var deps = ['$stateParams', app.name + '.patient', '$scope', '$filter'];

    function controller($stateParams, patient, $scope, $filter) {

        var vm = this;
        vm.controllername = fullname;
        vm.idPatient = $stateParams.id;

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

        $scope.toggleDropdown = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.status.isopen = !$scope.status.isopen;
        };

        vm.addDiagnostic = function(str) {
            vm.patient.visit.push({
                diagnostic: str,
                date: new Date().getTime()/1000
            });
        };

        vm.toUppercase = function(str){
            return $filter('uppercase')(str);
        };


        patient.getPatient(vm.idPatient)
            .then(function(patient) {
                vm.patient = patient[0];
                console.log(patient);
            });

    }

    controller.$inject = deps;
    app.controller(fullname, controller);
};
