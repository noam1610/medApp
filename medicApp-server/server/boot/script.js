var mcflyLoopback = require('mcfly-loopback');
var config = require('../authentication-config');

module.exports = function enableAuthentication(server) {

    console.log('---------------------DDDD----------------');
    var User = require('loopback').User;
    User.greet = function() {
        console.log('YO');
    };
    console.log(User.login);

    User.remoteMethod(
        'greet', {
            accepts: {
                arg: 'msg',
                type: 'string'
            },
            returns: {
                arg: 'greeting',
                type: 'string'
            }
        }
    );
    console.log(User.login);


};
