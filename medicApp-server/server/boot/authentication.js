var mcflyLoopback = require('mcfly-loopback');
var config = require('../authentication-config');

module.exports = function enableAuthentication(server) {
    // enable authentication
    server.enableAuth();
    mcflyLoopback.authentication(server, config);
};
