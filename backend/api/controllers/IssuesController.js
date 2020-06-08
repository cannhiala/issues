'use strict'

const util = require('util')
const mysql = require('mysql')
const pool = require('./../pool')

module.exports = {
    issueGetProjectByKey: (req, res) => {
        let data = req.body
        let projectKey = data.projectKey

        if (projectKey == null || typeof (projectKey) == "undefined")
            return null;

        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query('call issue_getProjectByKey(?)', [projectKey], function (error, results, fields) {
                connection.release();
                if (error) throw error;

                res.json(results);
            })
        })
    },
    issueGetListStatuses: (req, res) => {
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query('call issue_getListStatuses()', function (error, results, fields) {
                connection.release();
                if (error) throw error;

                res.json(results);
            })
        })
    },
    issueGetUsersSameProjects: (req, res) => {
        let data = req.body
        let userId = data.userId

        if (userId == null || typeof (userId) == "undefined")
        return null;

        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query('call issue_getUsersSameProjects(?)', [userId], function (error, results, fields) {
                connection.release();
                if (error) throw error;

                res.json(results);
            })
        })
    }

}