'use strict'

const util = require('util')
const mysql = require('mysql')
const db = require('./../db')

module.exports = {
    get: (req, res) => {
      let data = req.body
      console.log(data)
        let sql = 'SELECT projects.key as projectkey,projects.name as projectname,projects.status as projectstatus,project_types.name as projecttype FROM `projects` INNER JOIN project_types ON projects.project_type_id = project_types.project_type_id'
        db.query(sql, (err, response) => {
            if (err) throw err
            res.json(response)
        })
    },
}
