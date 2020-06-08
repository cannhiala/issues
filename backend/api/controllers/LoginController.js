'use strict'

const util = require('util')
const mysql = require('mysql')
const db = require('./../db')

module.exports = {
    post: (req, res) => {
      let data = req.body
      console.log(data)
        let sql = 'SELECT * FROM est_user where USERNAME="' + data.username + '" and PASSWORD="' + data.password + '"'
        db.query(sql, (err, response) => {
            if (err) throw err
            res.json(response)
        })
    },
}
