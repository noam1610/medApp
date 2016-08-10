'use strict';

module.exports = function(app) {
    // inject:start
    require('./create')(app);
    require('./home')(app);
    require('./patient')(app);
    require('./profile')(app);
    require('./search')(app);
    require('./signin')(app);
    // inject:end
};