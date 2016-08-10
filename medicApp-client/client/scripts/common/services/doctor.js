'use strict';
var servicename = 'doctor';

module.exports = function(app) {

    var dependencies = ['$q'];

    function service($q) {

        var profile = {
            firstname: 'israel',
            lastname: 'Chetboun',
            numberPatient: '1034',
            lastVisite: '1438862267',
            country: 'Israel',
            mail: 'test@mail.com'
        };

        var getProfile = function() {
            var deferred = $q.defer();
            deferred.resolve(profile);
            return deferred.promise;
        };

        return {
            getProfile: getProfile
        };

    }

    service.$inject = dependencies;
    app.service(app.name + '.' + servicename, service);

};
