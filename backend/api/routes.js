'use strict';

module.exports = function(app) {
	let projectCtrl = require('./controllers/ProjectsController');
	// create by ThanhTV
	let loginCtrl = require('./controllers/LoginController');
	let myProjectCtrl = require('./controllers/MyProjectController');
	let myIssueCtrl = require('./controllers/MyIssueController');

	app.route('/projects').get(projectCtrl.get);
	app.route('/login').post(loginCtrl.post);
	app.route('/myProject').get(myProjectCtrl.get);
	app.route('/myIssue').get(myIssueCtrl.get);
	let issueCtrl = require('./controllers/IssuesController');

	app.route('/projects').get(projectCtrl.getProject);
	app.route('/owner').get(projectCtrl.getOwner);
	app.route('/projectDetail').get(projectCtrl.getProjectDetail);
	app.route('/projectInfor').get(projectCtrl.getProjectInfor);
	app.route('/members').get(projectCtrl.getMembers);
	app.route('/projectTypes').get(projectCtrl.getProjectType);
	app.route('/users').get(projectCtrl.getUsers);
	app.route('/addUser').post(projectCtrl.addUser);
	
	//issues route
	//create by Quanha
	app.route('/issueGetProjectByKey')
		.get(issueCtrl.issueGetProjectByKey);
	app.route('/issueGetListStatuses')
		.get(issueCtrl.issueGetListStatuses);
	app.route('/issueGetUsersSameProjects')
		.get(issueCtrl.issueGetUsersSameProjects);
	app.route('/issueGetListPriotities')
		.get(issueCtrl.issueGetListPriotities);
	app.route('/issueFilter')
		.get(issueCtrl.issueFilter);
};
