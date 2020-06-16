'use strict'

const util = require('util')
const mysql = require('mysql')
const db = require('./../db')

module.exports = {
	myproject: (req, res) => {
      let data = req.body
      console.log(data)
        let sql = 'SELECT projects.key as projectkey,projects.name as projectname,projects.status as projectstatus,project_types.name as projecttype FROM `projects` INNER JOIN project_types ON projects.project_type_id = project_types.project_type_id'
        db.query(sql, (err, response) => {
            if (err) throw err
            res.json(response)
        })
    },
    myissue: (req, res) => {
			let data = req.query
      let sql = 'SELECT `issues`.`issue_id`, '+
              		'`issues`.`project_id`, '+
              		'`issue_categories`.`name` `issuetype`, '+
              		'`issues`.`key`, '+
              		'`issues`.`name`, '+
                  '`projects`.`name` `projectname`, '+
              		'`issue_statuses`.`name` `issuestatus`, '+
              		'DATE_FORMAT(`issues`.`duedate`,\'%m/%d/%Y\') `duedate`, '+
              		'`issue_priorities`.`name` `issuepriority` '+
              	'FROM `issues` '+
              		'INNER JOIN `projects` ON `issues`.`project_id` = `projects`.`project_id` '+
                      'LEFT JOIN `issue_categories` ON `issues`.`issue_category_id` = `issue_categories`.`issue_category_id` '+
                      'LEFT JOIN `project_types` ON `issues`.`projec_type_id` = `project_types`.`project_type_id` '+
                      'LEFT JOIN `issue_statuses` ON `issues`.`issue_status_id` = `issue_statuses`.`issue_status_id` '+
                      'LEFT JOIN `issue_priorities` ON `issues`.`priority_id` = `issue_priorities`.`priority_id` '+
                      'LEFT JOIN `users` u1 ON `issues`.`assgned_id` = u1.`user_id` '+
                      'LEFT JOIN `users` u2 ON `issues`.`createby_id` = u2.`user_id` '+
              	'WHERE `issues`.`is_deleted` = 1 '+
              		'AND `projects`.`is_deleted` = 1 '+
                      'AND `issues`.`createby_id` =  ' + data.uId
        db.query(sql, (err, response) => {
            if (err) throw err
            res.json(response)
        })
    },
}
