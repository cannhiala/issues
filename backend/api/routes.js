'use strict';

module.exports = function (app) {
	let userCtrl = require('./controllers/ProjectsController');
	let loginCtrl = require('./controllers/LoginController');
	let issueCtrl = require('./controllers/IssuesController');

	app.route('/projects').post(userCtrl.post);
	app.route('/addProject').post(userCtrl.storeAdd).put(userCtrl.storeAdd);
	app.route('/updateProject').post(userCtrl.storeUp).put(userCtrl.storeUp);
	app.route('/login').post(loginCtrl.post);

	//issues route
	//create by Quanha
	app.route('/issueGetProjectByKey')
		.get(issueCtrl.issueGetProjectByKey)
		.post(issueCtrl.issueGetProjectByKey)
		.put(issueCtrl.issueGetProjectByKey);
	app.route('/issueGetListStatuses')
		.get(issueCtrl.issueGetListStatuses)
		.post(issueCtrl.issueGetListStatuses)
		.put(issueCtrl.issueGetListStatuses);
	app.route('/issueGetUsersSameProjects')
		.get(issueCtrl.issueGetUsersSameProjects)
		.post(issueCtrl.issueGetUsersSameProjects)
		.put(issueCtrl.issueGetUsersSameProjects);

};
