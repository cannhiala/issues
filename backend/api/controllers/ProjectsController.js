'use strict'

const util = require('util')
const mysql = require('mysql')
const db = require('./../db')

module.exports = {
    getProject: (req, res) => {
      let data = req.body
        let sql = 'SELECT * FROM (SELECT p.project_id, p.key, p.name, p.description, p.status, p.project_type_id, p.total_issues, p.progress, ' +
                  'DATE_FORMAT(p.start_date, \'%d/%m/%Y\') as start_date, DATE_FORMAT(p.end_date, \'%d/%m/%Y\') as end_date, p.create_on, p.update_on, p.is_deleted, m.user_id, m.owner, ' +
                  'CONCAT_WS(\' \', u.first_name, u.last_name) AS owner_fullname, pt.name as project_type_name ' +
                  'FROM projects p ' +
                  'LEFT JOIN project_types pt ON p.project_type_id = pt.project_type_id '+
                  'LEFT JOIN members m ON p.project_id = m.project_id ' +
                  'INNER JOIN users u ON m.member_id = u.user_id '+
                  'WHERE m.owner = 1 AND p.is_deleted = 1 AND m.is_deleted = 1 AND m.user_id = 1 ' +
                  'UNION ' +
                  'SELECT p.project_id, p.key, p.name, p.description, p.status, p.project_type_id, p.total_issues, p.progress, ' +
                  'DATE_FORMAT(p.start_date, \'%d/%m/%Y\') as start_date, DATE_FORMAT(p.end_date, \'%d/%m/%Y\') as end_date, p.create_on, p.update_on, p.is_deleted, m.user_id, m.owner, ' +
                  'CONCAT_WS(\' \', u.first_name, u.last_name) AS owner_fullname, pt.name as project_type_name ' +
                  'FROM projects p ' +
                  'LEFT JOIN project_types pt ON p.project_type_id = pt.project_type_id '+
                  'LEFT JOIN members m ON p.project_id = m.project_id ' +
                  'INNER JOIN users u ON m.member_id = u.user_id '+
                  'WHERE m.owner = 2 AND p.is_deleted = 1 AND m.is_deleted = 1 AND m.user_id = 1) tt '
        db.query(sql, (err, response) => {
            if (err) throw err
            res.json(response)
        })
    },
    getProjectStatus: (req, res) => {
      let data = req.body
        let sql = 'SELECT pt.`project_type_id`, pt.`name` ' +
                    'FROM issuestracking.project_types pt ' +
                    'WHERE pt.`parent_id` = 0 and pt.`is_deleted` = 1 ' +
                    'ORDER BY pt.`name`;'
        db.query(sql, (err, response) => {
            if (err) throw err
            res.json(response)
        })
    }
}
