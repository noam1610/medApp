'use strict';

var mcflyLoopback = require('mcfly-loopback');
module.exports = function(server) {
    mcflyLoopback.autoupdate(server);
};