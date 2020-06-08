'use strict';

module.exports = function(app) {
	let projectCtrl = require('./controllers/ProjectsController');

	app.route('/projects').get(projectCtrl.get);

};
