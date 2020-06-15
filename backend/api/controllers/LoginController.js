'use strict'

var jwt = require('jsonwebtoken')
const utils = require('./../utils')
const mysql = require('mysql')
const db = require('./../db')
const { json } = require('body-parser')

module.exports = {
    login: (req, res) => {
        let data = req.body
        let sql = 'SELECT * FROM users where user_name="'
            + data.username
            + '" and pass_word="' + data.password + '"'
            + ' and is_deleted = 1'
        db.query(sql, (err, response) => {
            if (err) throw err

            if (response[0] == null)
                return res.status(401).json({
                    error: true,
                    message: "Invalid user."
                });

            let result = JSON.stringify(response)
            const token = utils.generateToken(result)
            const userObj = utils.getCleanUser(result)

            res.json({ user: userObj, token })
        })
    },
    verifyToken: (req, res) => {
        var token = req.body.token || req.query.token;
        if (!token) {
            return res.status(400).json({
                error: true,
                message: "Token is required."
            });
        }

        jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
            if (err) return res.status(401).json({
                error: true,
                message: "Invalid token."
            });

            let sql = 'SELECT * FROM users where user_id="'
                + user.userId
                + '" and is_deleted = 1'

            db.query(sql, (err, response) => {
                if (err) throw err

                if (response[0] == null)
                    return res.status(401).json({
                        error: true,
                        message: "Invalid user."
                    });

                let result = JSON.stringify(response)
                const token = utils.generateToken(result)
                const userObj = utils.getCleanUser(result)

                res.json({ user: userObj, token })
            })
        });
    }
}
