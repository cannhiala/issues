'use strict'

const util = require('util')
const mysql = require('mysql')
const pool = require('./../pool')

module.exports = {
    issueGetProjectByKey: (req, res) => {
        let projectKey = req.query.projectKey

        if (projectKey == null || typeof (projectKey) == "undefined")
            return res.json(null);

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
        let userId = req.query.userId

        if (userId == null || typeof (userId) == "undefined")
            return res.json(null);

        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query('call issue_getUsersSameProjects(?)', [userId], function (error, results, fields) {
                connection.release();
                if (error) throw error;

                res.json(results);
            })
        })
    },
    issueGetListPriotities: (req, res) => {
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query('call issue_getListPriotities()', function (error, results, fields) {
                connection.release();
                if (error) throw error;

                res.json(results);
            })
        })
    },
    issueFilter: (req, res) => {
        let projectKey = req.query.sProjectKey
        let projectName = req.query.sProjectName
        let issueId = req.query.sIssueId
        let issueName = req.query.sIssueName
        let assignee = req.query.sAssigneeSelected
        let priority = req.query.sPrioritySelected
        let startFrom = req.query.sStartDateFrom
        let startTo = req.query.sStartDateTo
        let dueFrom = req.query.sDueDateFrom
        let dueTo = req.query.sDueDateTo
        let status = req.query.sissueStatusSelected

        assignee = assignee == null ? -1 : assignee
        priority = priority == null ? -1 : priority
        status = status == null ? "" : status

        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query('call issue_filter(?,?,?,?,?,?,?,?,?,?,?)'
                , [projectKey, projectName, issueId, issueName, assignee, priority, startFrom
                    , startTo, dueFrom, dueTo, status]
                , function (error, results, fields) {
                    connection.release();
                    if (error) throw error;
                    res.json(results);
                })
        })
    },
    issueGetListIssueCategories: (req, res) => {
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query('call issue_getListIssueCategories()', function (error, results, fields) {
                connection.release();
                if (error) throw error;

                res.json(results);
            })
        })
    },
    issueGetListPhaseByProjectKey: (req, res) => {
        let projectKey = req.query.sProjectKey

        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query('call issue_getListPhaseByProjectKey(?)'
                , [projectKey]
                , function (error, results, fields) {
                    connection.release();
                    if (error) throw error;
                    res.json(results);
                })
        })
    },
    issueGetProjectUserAssign: (req, res) => {
        let projectKey = req.query.sProjectKey

        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query('call issue_getProjectUserAssign(?)'
                , [projectKey]
                , function (error, results, fields) {
                    connection.release();
                    if (error) throw error;
                    res.json(results);
                })
        })
    },


}