'use strict'

const util = require('util')
const mysql = require('mysql')
const pool = require('./../pool')

module.exports = {
    issueGetProjectByKey: (req, res) => {
        let projectKey = req.query.projectKey

        if (projectKey == null || typeof (projectKey) == "undefined")
            return res.status(400).json({
                error: true,
                message: "projectKey parameter is required."
            })

        pool.getConnection(function (err, connection) {
            if (err)
                return res.status(400).json({
                    error: true,
                    message: "db connection error."
                })
            connection.query('call issue_getProjectByKey(?)', [projectKey], function (error, results, fields) {
                connection.release()
                if (error)
                    return res.status(400).json({
                        error: true,
                        message: "db execution error."
                    })

                res.json(results);
            })
        })
    },
    issueGetListStatuses: (req, res) => {
        pool.getConnection(function (err, connection) {
            if (err)
                return res.status(400).json({
                    error: true,
                    message: "db connection error."
                })
            connection.query('call issue_getListStatuses()', function (error, results, fields) {
                connection.release()
                if (error)
                    return res.status(400).json({
                        error: true,
                        message: "db execution error."
                    })
                res.json(results)
            })
        })
    },
    issueGetUsersSameProjects: (req, res) => {
        let userId = req.query.userId

        if (userId == null || typeof (userId) == "undefined")
            return res.status(400).json({
                error: true,
                message: "userId parameter is required."
            })

        pool.getConnection(function (err, connection) {
            if (err)
                return res.status(400).json({
                    error: true,
                    message: "db connection error."
                })
            connection.query('call issue_getUsersSameProjects(?)', [userId], function (error, results, fields) {
                connection.release()
                if (error)
                    return res.status(400).json({
                        error: true,
                        message: "db execution error."
                    })

                res.json(results);
            })
        })
    },
    issueGetListPriotities: (req, res) => {
        pool.getConnection(function (err, connection) {
            if (err)
                return res.status(400).json({
                    error: true,
                    message: "db connection error."
                })
            connection.query('call issue_getListPriotities()', function (error, results, fields) {
                connection.release()
                if (error)
                    return res.status(400).json({
                        error: true,
                        message: "db execution error."
                    })

                res.json(results)
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
            if (err)
                return res.status(400).json({
                    error: true,
                    message: "db connection error."
                })
            connection.query('call issue_filter(?,?,?,?,?,?,?,?,?,?,?)'
                , [projectKey, projectName, issueId, issueName, assignee, priority, startFrom
                    , startTo, dueFrom, dueTo, status]
                , function (error, results, fields) {
                    connection.release()
                    if (error)
                        return res.status(400).json({
                            error: true,
                            message: "db execution error."
                        })
                    res.json(results)
                })
        })
    },
    issueGetListIssueCategories: (req, res) => {
        pool.getConnection(function (err, connection) {
            if (err)
                return res.status(400).json({
                    error: true,
                    message: "db connection error."
                })
            connection.query('call issue_getListIssueCategories()', function (error, results, fields) {
                connection.release()
                if (error)
                    return res.status(400).json({
                        error: true,
                        message: "db execution error."
                    })

                res.json(results)
            })
        })
    },
    issueGetListPhaseByProjectKey: (req, res) => {
        let projectKey = req.query.sProjectKey

        if (projectKey == null || typeof (projectKey) == "undefined")
            return res.status(400).json({
                error: true,
                message: "projectKey parameter is required."
            })

        pool.getConnection(function (err, connection) {
            if (err)
                return res.status(400).json({
                    error: true,
                    message: "db connection error."
                })
            connection.query('call issue_getListPhaseByProjectKey(?)'
                , [projectKey]
                , function (error, results, fields) {
                    connection.release();
                    if (error)
                        return res.status(400).json({
                            error: true,
                            message: "db execution error."
                        })
                    res.json(results)
                })
        })
    },
    issueGetProjectUserAssign: (req, res) => {
        let projectKey = req.query.sProjectKey

        if (projectKey == null || typeof (projectKey) == "undefined")
            return res.status(400).json({
                error: true,
                message: "projectKey parameter is required."
            })

        pool.getConnection(function (err, connection) {
            if (err)
                return res.status(400).json({
                    error: true,
                    message: "db connection error."
                })
            connection.query('call issue_getProjectUserAssign(?)'
                , [projectKey]
                , function (error, results, fields) {
                    connection.release()
                    if (error)
                        return res.status(400).json({
                            error: true,
                            message: "db execution error."
                        })
                    res.json(results)
                })
        })
    },
    issueGetProjectByUser: (req, res) => {
        let userId = req.query.sUserId

        if (userId == null || typeof (userId) == "undefined")
            return res.status(400).json({
                error: true,
                message: "userId parameter is required."
            })

        pool.getConnection(function (err, connection) {
            if (err)
                return res.status(400).json({
                    error: true,
                    message: "db connection error."
                })
            connection.query('call issue_getProjectByUser(?)'
                , [userId]
                , function (error, results, fields) {
                    connection.release()
                    if (error)
                        return res.status(400).json({
                            error: true,
                            message: "db execution error."
                        })
                    res.json(results);
                })
        })
    },
    issueGetListParentIssues: (req, res) => {
        let projectKey = req.query.sProjectKey
        let searchKey = req.query.sSearchKey

        pool.getConnection(function (err, connection) {
            if (err)
                return res.status(400).json({
                    error: true,
                    message: "db connection error."
                })
            connection.query('call issue_getListParentIssues(?,?)'
                , [projectKey, searchKey]
                , function (error, results, fields) {
                    connection.release()
                    if (error)
                        return res.status(400).json({
                            error: true,
                            message: "db execution error."
                        })
                    res.json(results)
                })
        })
    },
    issueInsert: (req, res) => {
        let data = req.body

        let projectKey = data.projectkey
        let issueType = data.issuetype ? data.issuetype : null
        let phase = data.phase ? data.phase : null
        let issueName = data.issuename ? data.issuename.trim().substring(0, 255) : ""
        let description = data.description
        let status = data.status ? data.status : null
        let parentTask = data.parenttask ? data.parenttask : null
        let startDate = data.startdate ? data.startdate : null
        let assignee = data.assignee ? data.assignee : null
        let dueDate = data.duedate ? data.duedate : null
        let priority = data.priority ? data.priority : null
        let estimate = data.estimate ? data.estimate : null
        let loginUserId = data.loginuserid ? data.loginuserid : null

        if (projectKey == "" || typeof (projectKey) == "undefined")
            return res.status(400).json({
                error: true,
                message: "projectkey parameter is required."
            })

        if (issueName == "" || typeof (issueName) == "undefined")
            return res.status(400).json({
                error: true,
                message: "issuename parameter is required."
            })

        if (loginUserId == null || typeof (loginUserId) == "undefined")
            return res.status(400).json({
                error: true,
                message: "loginuserid parameter is required."
            })

        pool.getConnection(function (err, connection) {
            if (err)
                return res.status(400).json({
                    error: true,
                    message: "db connection error."
                })
            connection.query('call issue_insert(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @output); select @output issuekey;'
                , [projectKey
                    , phase
                    , issueType
                    , issueName
                    , description
                    , parentTask
                    , startDate
                    , dueDate
                    , estimate
                    , loginUserId
                    , assignee
                    , priority]
                , function (error, results, fields) {
                    connection.release()
                    if (error) {
                        console.log(error)
                        return res.status(400).json({
                            error: true,
                            message: "db execution error."
                        })
                    }

                    res.json(results[3])
                })
        })
    },
    issueUpdate: (req, res) => {
        let data = req.body

        let projectKey = data.projectkey
        let issueType = data.issuetype ? data.issuetype : null
        let phase = data.phase ? data.phase : null
        let issueKey = data.issuekey ? data.issuekey.trim().substring(0, 20) : ""
        let issueName = data.issuename ? data.issuename.trim().substring(0, 255) : ""
        let description = data.description
        let status = data.status ? data.status : null
        let parentTask = data.parenttask ? data.parenttask : null
        let startDate = data.startdate ? data.startdate : null
        let assignee = data.assignee ? data.assignee : null
        let dueDate = data.duedate ? data.duedate : null
        let priority = data.priority ? data.priority : null
        let estimate = data.estimate ? data.estimate : null
        let loginUserId = data.loginuserid ? data.loginuserid : null

        if (projectKey == "" || typeof (projectKey) == "undefined")
            return res.status(400).json({
                error: true,
                message: "projectkey parameter is required."
            })

        if (issueKey == "" || typeof (issueKey) == "undefined")
            return res.status(400).json({
                error: true,
                message: "issuekey parameter is required."
            })

        if (issueName == "" || typeof (issueName) == "undefined")
            return res.status(400).json({
                error: true,
                message: "issuename parameter is required."
            })

        if (loginUserId == null || typeof (loginUserId) == "undefined")
            return res.status(400).json({
                error: true,
                message: "loginuserid parameter is required."
            })

        pool.getConnection(function (err, connection) {
            if (err)
                return res.status(400).json({
                    error: true,
                    message: "db connection error."
                })
            connection.query('call issue_update(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
                , [projectKey
                    , phase
                    , issueType
                    , issueKey
                    , issueName
                    , description
                    , status
                    , parentTask
                    , startDate
                    , dueDate
                    , estimate
                    , loginUserId
                    , assignee
                    , priority]
                , function (error, results, fields) {
                    connection.release()
                    if (error) {
                        console.log(error)
                        return res.status(400).json({
                            error: true,
                            message: "db execution error."
                        })
                    }

                    res.json({
                        issuekey: issueKey
                    })
                })
        })
    },
    issueGetIssueByKey: (req, res) => {
        let issueKey = req.query.sIssueKey ? req.query.sIssueKey : ""
        let userId = req.query.sUserId ? req.query.sUserId : -1

        pool.getConnection(function (err, connection) {
            if (err)
                return res.status(400).json({
                    error: true,
                    message: "db connection error."
                })
            connection.query('call issue_getIssueByKey(?,?)'
                , [issueKey, userId]
                , function (error, results, fields) {
                    connection.release()
                    if (error)
                        return res.status(400).json({
                            error: true,
                            message: "db execution error."
                        })
                    res.json(results)
                })
        })
    },
	getIssueById: (req, res) => {
        let issueId = req.query.issueId
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query('call issue_getIssueById(?)', [issueId]
                , function (error, results, fields) {
                    connection.release();
                    if (error) throw error;
                    res.json(results);
                })
        })
    },
    getSubIssues: (req, res) => {
        let parentId = req.query.parentId
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query('call issue_getSubIssues(?)', [parentId]
                , function (error, results, fields) {
                    connection.release();
                    if (error) throw error;
                    res.json(results);
                })
        })
    },
    getIssueCommentsById: (req, res) => {
        let issueId = req.query.issueId
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query('call issue_getIssueCommentsById(?)', [issueId]
                , function (error, results, fields) {
                    connection.release();
                    if (error) throw error;
                    res.json(results);
                })
        })
    },

    insertComment: (req, res) => {
        let data = req.body

        let issue_id = data.issue_id
        let user_id = data.user_id
        let comment = data.comments
        console.log("",data);
        if (comment == "" || typeof (comment) == "undefined")
            return res.status(202).json({
                error: true,
                message: "Please input your comment first!"
            })

        pool.getConnection(function (err, connection) {
            if (err)
                return res.status(202).json({
                    error: true,
                    message: "db connection error."
                })
            connection.query('call insert_comment(?, ?, ?)'
                , [issue_id
                    , user_id
                    , comment]
                , function (error, response, fields) {
                    connection.release()
                    if (error) {
                        console.log(error)
                        return res.status(202).json({
                            error: true,
                            message: "db execution error."
                        })
                    }
                    res.json({
                        status: 200,
                        message: "Insert comment success !"
                    })
                })
        })
    },

    getNextIssue: (req, res) => {
        let issueId = req.query.issueId
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query('call issue_next(?)', [issueId]
                , function (error, results, fields) {
                    connection.release();
                    if (error) throw error;
                    res.json(results);
                })
        })
    },

    getPreviousIssue: (req, res) => {
        let issueId = req.query.issueId
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query('call issue_previous(?)', [issueId]
                , function (error, results, fields) {
                    connection.release();
                    if (error) throw error;
                    res.json(results);
                })
        })
    },
}
