'use strict';

module.exports = function(app) {
	let projectCtrl = require('./controllers/ProjectsController');
	let loginCtrl = require('./controllers/LoginController');
	let myProjectCtrl = require('./controllers/MyProjectController');
	let myIssueCtrl = require('./controllers/MyIssueController');

	app.route('/projects').get(projectCtrl.get);
	app.route('/login').post(loginCtrl.post);
	app.route('/myProject').get(myProjectCtrl.get);
	app.route('/myIssue').get(myIssueCtrl.get);

};
