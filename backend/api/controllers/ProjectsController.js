'use strict'

const util = require('util')
const mysql = require('mysql')
const db = require('./../db')

module.exports = {
    post: (req, res) => {
      let data = req.body
        let sql = 'SELECT * FROM est_estimation where USERID ="' +  data.userid + '"'
        db.query(sql, (err, response) => {
            if (err) throw err
            res.json(response)
        })
    },

    storeAdd: (req, res) => {
        let data = req.body;
        console.log('Insert Data')
        console.log(data)
        let sql = 'INSERT INTO est_estimation SET ?'
        db.query(sql, [data], (err, response) => {
            if (err) throw err
            res.json({message: 'Insert success!'})
        })
    },

    storeUp: (req, res) => {
        let data = req.body;
        console.log('Update Data')
        console.log(data)
        let sql = 'UPDATE est_estimation SET ACTUALVALUE="' + data.actualvalue + '" WHERE ESTIMATIONID= "' + data.estimationid + '"'
        db.query(sql, [data], (err, response) => {
            if (err) throw err
            res.json({message: 'Update success!'})
        })
    }
}
