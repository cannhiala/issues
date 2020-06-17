'use strict';

module.exports = function (app) {
	let loginCtrl = require('./controllers/LoginController');
	let homeCtrl = require('./controllers/HomeController');
	let projectCtrl = require('./controllers/ProjectsController');
	let issueCtrl = require('./controllers/IssuesController');

	//Login&Home route
	//create by ThanhTV
	app.route('/login').post(loginCtrl.login);
	app.route('/verifyToken').get(loginCtrl.verifyToken);
	app.route('/myProject').get(homeCtrl.myproject);
	app.route('/myIssue').get(homeCtrl.myissue);

	//projects route
	//create by CanTV
	app.route('/projects').get(projectCtrl.getProject);
	app.route('/owner').get(projectCtrl.getOwner);
	app.route('/projectDetail').get(projectCtrl.getProjectDetail);
	app.route('/projectInfor').get(projectCtrl.getProjectInfor);
	app.route('/members').get(projectCtrl.getMembers);
	app.route('/projectTypes').get(projectCtrl.getProjectType);
	app.route('/users').get(projectCtrl.getUsers);
	app.route('/addUser').post(projectCtrl.addUser);
	app.route('/delProject').put(projectCtrl.delProject);
	app.route('/checkPKey').get(projectCtrl.getProjectKey);
	app.route('/pForUpdate').get(projectCtrl.getProjectForUpdate);
	app.route('/uForUpdate').get(projectCtrl.getUserForUpdate);

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
	app.route('issueGetListIssueCategories')
		.get(issueCtrl.issueGetListIssueCategories);
	app.route('issueGetListPhaseByProjectKey')
		.get(issueCtrl.issueGetListPhaseByProjectKey);
	app.route('issueGetProjectUserAssign')
		.get(issueCtrl.issueGetProjectUserAssign);

};
