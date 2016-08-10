'use strict';
var servicename = 'patient';

module.exports = function(app) {

    var dependencies = ['$q', '$filter'];

    function service($q, $filter) {

        var patients = [{
            firstname: 'noam',
            lastname: 'benlolo',
            id: '3234495092',
            visit: [{
                diagnostic: 'heart',
                date: '1138862267'
            }, {
                diagnostic: 'respiration',
                date: '1288862267'
            }]
        }, {
            firstname: 'isaac',
            lastname: 'cohen',
            id: '6234495092',
            visit: [{
                diagnostic: 'heart',
                date: '1138862267'
            }, {
                diagnostic: 'respiration',
                date: '1288862267'
            }]
        }, {
            firstname: 'israel',
            lastname: 'chetboun',
            id: '1234895092',
            visit: [{
                diagnostic: 'heart',
                date: '1138862267'
            }, {
                diagnostic: 'respiration',
                date: '1288862267'
            }]
        }, {
            firstname: 'jais',
            lastname: 'bitton',
            id: '1234888892',
            visit: [{
                diagnostic: 'heart',
                date: '1138862267'
            }, {
                diagnostic: 'respiration',
                date: '1288862267'
            }]
        }, {
            firstname: 'avner',
            lastname: 'abergel',
            id: '1234495092',
            visit: [{
                diagnostic: 'heart',
                date: '1138862267'
            }, {
                diagnostic: 'respiration',
                date: '1288862267'
            }]
        }, {
            firstname: 'ךשלכדג',
            lastname: 'לדחגכידגכ',
            id: '1234495092',
            visit: [{
                diagnostic: 'heart',
                date: '1138862267'
            }, {
                diagnostic: 'respiration',
                date: '1288862267'
            }]
        }, {
            firstname: 'bill',
            lastname: 'gates',
            id: '1234495092',
            visit: [{
                diagnostic: 'heart',
                date: '1138862267'
            }, {
                diagnostic: 'respiration',
                date: '1288862267'
            }]
        }];

        var getAllPatient = function() {
            var deferred = $q.defer();
            deferred.resolve(patients);
            return deferred.promise;
        };

        var getPatient = function(id) {
            var deferred = $q.defer();

            var patient = $filter('filter')(patients, {
                id: id
            });
            deferred.resolve(patient);
            return deferred.promise;
        };

        return {
            getAllPatient: getAllPatient,
            getPatient: getPatient
        };

    }

    service.$inject = dependencies;
    app.service(app.name + '.' + servicename, service);

};
