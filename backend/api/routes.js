'use strict';

module.exports = function(app) {
	let projectCtrl = require('./controllers/ProjectsController');

	app.route('/projects').get(projectCtrl.getProject);
	app.route('/owner').get(projectCtrl.getOwner);

};
