'use strict'

const util = require('util')
const mysql = require('mysql')
const db = require('./../db')

module.exports = {
	login: (req, res) => {
      let data = req.body
      console.log(data)
        let sql = 'SELECT * FROM users where user_name="' + data.username + '" and pass_word="' + data.password + '"'
        db.query(sql, (err, response) => {
            if (err) throw err
            res.json(response)
        })
    },
}
