'use strict';

module.exports = function(app) {
	let userCtrl = require('./controllers/ProjectsController');
	let loginCtrl = require('./controllers/LoginController');

	app.route('/projects').post(userCtrl.post);
	app.route('/addProject').post(userCtrl.storeAdd).put(userCtrl.storeAdd);
	app.route('/updateProject').post(userCtrl.storeUp).put(userCtrl.storeUp);
	app.route('/login').post(loginCtrl.post);
};
