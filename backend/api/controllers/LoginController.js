'use strict'

var jwt = require('jsonwebtoken')
const utils = require('./../utils')
const pool = require('./../pool')


module.exports = {
    login: (req, res) => {
        let data = req.body
        let sql = 'SELECT * FROM users where user_name="'
            + data.username
            + '" and pass_word="' + data.password + '"'
            + ' and is_deleted = 1'
        pool.getConnection(function (err, connection) {
            if (err)
                return res.status(400).json({
                    error: true,
                    message: "db connection error."
                })

            connection.query(sql, function (err, response) {
                connection.release()
                if (err)
                    return res.status(400).json({
                        error: true,
                        message: "db execute error."
                    })

                if (response[0] == null)
                    return res.status(401).json({
                        error: true,
                        message: "Invalid user."
                    })

                let result = JSON.stringify(response)
                const token = utils.generateToken(result)
                const userObj = utils.getCleanUser(result)

                res.json({ user: userObj, token })
            })
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

            pool.getConnection(function (err, connection) {
                if (err)
                    return res.status(400).json({
                        error: true,
                        message: "db connection error."
                    })

                connection.query(sql, (err, response) => {
                    connection.release()
                    if (err)
                        return res.status(400).json({
                            error: true,
                            message: "db execute error."
                        })

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
            })

        });
    }
}
