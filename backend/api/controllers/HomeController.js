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
      let data = req.body
      console.log(data)
        let sql = 'SELECT issue_categories.name as issuetype,issues.issue_id as issueid,issues.name as issuename,issue_statuses.name as issuestatus,issue_priorities.name as issuepriority,projects.name as projectname,issues.duedate FROM `issues` INNER JOIN issue_categories ON issues.issue_category_id = issue_categories.issue_category_id INNER JOIN issue_statuses ON issue_statuses.issue_status_id = issues.issue_status_id INNER JOIN issue_priorities ON issue_priorities.priority_id = issues.priority_id INNER JOIN projects ON projects.project_id = issues.project_id'
        db.query(sql, (err, response) => {
            if (err) throw err
            res.json(response)
        })
    },
}
