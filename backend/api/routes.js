'use strict';

module.exports = function(app) {
	let projectCtrl = require('./controllers/ProjectsController');

	app.route('/projects').get(projectCtrl.getProject);
	app.route('/owner').get(projectCtrl.getOwner);
	app.route('/projectDetail').get(projectCtrl.getProjectDetail);
	app.route('/projectInfor').get(projectCtrl.getProjectInfor);
	app.route('/members').get(projectCtrl.getMembers);
	app.route('/projectTypes').get(projectCtrl.getProjectType);
	app.route('/users').get(projectCtrl.getUsers);
	app.route('/addUser').post(projectCtrl.addUser);

};
