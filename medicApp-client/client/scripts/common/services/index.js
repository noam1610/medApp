'use strict';

module.exports = function(app) {
    // inject:start
    require('./doctor')(app);
    require('./patient')(app);
    // inject:end
};