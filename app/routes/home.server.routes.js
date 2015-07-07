'use strict';

module.exports = function(app) {
    // Root routing
    var core = require('../../app/controllers/home');
    app.route('/').get(core.index);
};