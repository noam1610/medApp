var _ = require('lodash');

module.exports = function(Doctor) {

    Doctor.beforeRemote('**', function(ctx, inst, next) {
        console.log('Doctor method called', ctx.methodString);
        console.log('Model instance affected called', inst.id);
        next();
    });

    Doctor.changeUser = function(collection, cb) {
        var User = require('loopback').User;
        console.log('------collection-------', collection);
        var ID = collection.id;
        console.log('-----------ID----------', ID);
        var myUser = {};
        User.findById(ID)

        .then(function(userData) {
            console.log('-----userData-------', userData);
            console.log('------userData.__data-------', userData.__data);
            var result = _.assign(userData.__data, collection);
            console.log('-----result-------', result);

            User.update({
                    'id': ID
                }, result)
                .then(function(data) {
                    console.log('--------data/newModel------', data);
                }, function(err) {
                    console.log('--------err/newModel------', err);
                });

        }, function(err) {
            console.log('-_-_-_-_-_-_erreur-_-_-_-_-_-_', err);
        });

        cb(null, myUser);
    };

    Doctor.remoteMethod(
        'changeUser', {
            http: {
                path: '/changeUser',
                verb: 'post'
            },
            accepts: [{
                arg: 'collection',
                type: 'object'
            }],
            returns: {
                arg: 'myUser',
                type: 'json'
            }
        }
    );

};
