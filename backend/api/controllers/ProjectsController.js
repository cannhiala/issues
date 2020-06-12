'use strict'

const util = require('util')
const mysql = require('mysql')
const db = require('./../db')

module.exports = {
    // get project list
    getProject: (req, res) => {
      let data = req.query
      let sql = 'SELECT \'View Issues\' as Action,tt.* FROM  '+
                	'(SELECT p.project_id, p.key, p.name, p.description, p.status, p.project_type_id, p.total_issues, p.progress, DATE_FORMAT(p.start_date, \'%d/%m/%Y\') as start_date, DATE_FORMAT(p.end_date, \'%d/%m/%Y\') as end_date, p.create_on, p.update_on, p.is_deleted, pt.name as project_type_name, m.user_id, m.owner, CONCAT_WS(\' \', u.first_name, u.last_name) AS owner_fullname  '+
                	'FROM projects p  '+
                	'LEFT JOIN project_types pt ON p.project_type_id = pt.project_type_id  '+
                	'LEFT JOIN members m ON p.project_id = m.project_id  '+
                	'INNER JOIN users u ON m.member_id = u.user_id  '+
                	'WHERE m.owner = 1 AND p.is_deleted = 1 AND m.is_deleted = 1 AND m.user_id = 1  '+
                	'UNION  '+
                	'Select tbl2.*, u.user_id, m.owner, CONCAT_WS(\' \', u.first_name, u.last_name) AS owner_fullname  from  '+
                		'(SELECT p.project_id, p.key, p.name, p.description, p.status, p.project_type_id, p.total_issues, p.progress, DATE_FORMAT(p.start_date, \'%d/%m/%Y\') as start_date, DATE_FORMAT(p.end_date, \'%d/%m/%Y\') as end_date, p.create_on, p.update_on, p.is_deleted,  pt.name as project_type_name  '+
                		'FROM projects p  '+
                		'LEFT JOIN project_types pt ON p.project_type_id = pt.project_type_id  '+
                		'LEFT JOIN members m ON p.project_id = m.project_id  '+
                		'INNER JOIN users u ON m.member_id = u.user_id  '+
                		'WHERE m.owner = 2 AND p.is_deleted = 1 AND m.is_deleted = 1 AND m.user_id = 1) tbl2  '+
                	'LEFT JOIN members m ON tbl2.project_id = m.project_id   '+
                	'INNER JOIN users u ON m.user_id = u.user_id  '+
                	'WHERE m.owner = 1 AND m.is_deleted = 1 AND m.is_deleted = 1 ) tt WHERE 1=1 '
                  if (data.s_p_key !== '') {sql = sql + ' AND tt.`key` like  "%'+ data.s_p_key +'%" ' }
                  if (data.s_p_name !== '') {sql = sql + ' AND tt.`name` like  "%'+ data.s_p_name +'%" ' }
                  if (data.s_p_status !== '' && data.s_p_status !== 'ALL') {sql = sql + ' AND tt.`status` like  "%'+ data.s_p_status +'%" ' }
                  if (data.s_p_owner_id !== '' && data.s_p_owner_id !== 'ALL') {sql = sql + ' AND tt.`user_id` = '+ data.s_p_owner_id +' AND tt.`owner` = 1 ' }
                  console.log("==========s_p_startdate_from======" + data.s_p_startdate_from);
                  if (data.s_p_startdate_from !== '') {sql = sql + ' AND tt.`start_date` >=" '+ data.s_p_startdate_from +'" ' }
                  console.log("==========s_p_startdate_to======" + data.s_p_startdate_to);
                  if (data.s_p_startdate_to !== '') {sql = sql + ' AND tt.`start_date` <= "'+ data.s_p_startdate_to +'" '}
                  console.log("==========s_p_enddate_from======" + data.s_p_enddate_from);
                  if (data.s_p_enddate_from !== '') {sql = sql + ' AND tt.`end_date` >="'+ data.s_p_enddate_from +'" ' }
                  console.log("==========s_p_enddate_to======" + data.s_p_enddate_to);
                  if (data.s_p_enddate_to !== '') {sql = sql + ' AND tt.`end_date` <="'+ data.s_p_enddate_to +'" ' }
                  sql = sql + ' ORDER BY tt.`update_on` ASC ';
                  //console.log("SQL here  ===  : " + sql);
        db.query(sql, (err, response) => {
            if (err) console.log(err);
            res.json(response)
        })
    },

    // get project detail
    getProjectDetail: (req, res) => {
        let data = req.query
        let sql = 'Select tbl2.*, u.user_id, m.owner, CONCAT_WS(\' \', u.first_name, u.last_name) AS owner_fullname  from '+
                		'(SELECT p.project_id, p.key, p.name, p.description, p.status, p.project_type_id, p.total_issues, p.progress, DATE_FORMAT(p.start_date, \'%d/%m/%Y\') as start_date, DATE_FORMAT(p.end_date, \'%d/%m/%Y\') as end_date, p.create_on, p.update_on, p.is_deleted,  pt.name as project_type_name  '+
                		'FROM projects p '+
                		'LEFT JOIN project_types pt ON p.project_type_id = pt.project_type_id '+
                		'LEFT JOIN members m ON p.project_id = m.project_id  '+
                		'INNER JOIN users u ON m.member_id = u.user_id  '+
                		'WHERE p.is_deleted = 1 AND m.is_deleted = 1 AND m.user_id = 1) tbl2  '+
                	'LEFT JOIN members m ON tbl2.project_id = m.project_id  '+
                	'INNER JOIN users u ON m.user_id = u.user_id  '+
                	'WHERE m.owner = 1 AND m.is_deleted = 1 AND m.is_deleted = 1  AND tbl2.project_id ='+ data.pId
        db.query(sql, (err, response) => {
            if (err) console.log(err);
            res.json(response)
        })
    },

    // get project Infor: project key, project name
    getProjectInfor: (req, res) => {
        let data = req.query
        let sql = 'SELECT p.key, p.name FROM projects p WHERE p.project_id ='+ data.pId
        db.query(sql, (err, response) => {
            if (err) console.log(err);
            res.json(response)
        })
    },

    getOwner: (req, res) => {
        let data = req.body
        let sql = 'SELECT distinct u.`user_id`, u.`first_name`, u.`last_name`, CONCAT_WS(\' \', u.first_name, u.last_name) AS owner_fullname '+
                  'FROM `issuestracking`.`users` u, `issuestracking`.`members` m '+
                  'WHERE u.`user_id` = m.`user_id` ' +
                  'AND m.`owner` = 1 AND u.`is_deleted` = 1 AND m.`is_deleted` = 1'
        db.query(sql, (err, response) => {
            if (err) console.log(err);
            res.json(response)
        })
    },

    // get Members without Owner
    getMembers: (req, res) => {
        let data = req.query
        let sql = 'select m.project_id, m.owner, u.user_id, CONCAT_WS(\' \', u.first_name, u.last_name) AS fullname  from members m  '+
                  'LEFT JOIN projects p ON p.project_id = m.project_id  '+
                  'INNER JOIN users u ON m.member_id = u.user_id  '+
                  'WHERE m.owner = 2 AND p.is_deleted = 1 AND m.is_deleted = 1  AND p.project_id ='+ data.pId
        db.query(sql, (err, response) => {
            if (err) console.log(err);
            res.json(response)
        })
    },

    // get Project type
    getProjectType: (req, res) => {
        let data = req.query
        let sql = 'SELECT pt.`project_type_id`, pt.`name`	'+
                  'FROM issuestracking.project_types pt	'+
                  'WHERE pt.`parent_id` = 0 and pt.`is_deleted` = 1 ORDER BY pt.`name`	'
        db.query(sql, (err, response) => {
            if (err) console.log(err);
            res.json(response)
        })
    },

    // get all user
    getUsers: (req, res) => {
        let sql = 'SELECT u.user_id, CONCAT_WS(\' \', u.first_name, u.last_name) AS fullname	'+
                  'FROM users u	'+
                  'WHERE u.`is_deleted` = 1 ORDER BY fullname	'
        db.query(sql, (err, response) => {
            if (err) console.log(err);
            res.json(response)
        })
    },

    // insert new project
    addUser: (req, res) => {
        let data = req.body;
        let sql = 'INSERT INTO `issuestracking`.`projects` '+
                  '(`key`, `name`, `description`, `status`, `project_type_id`, `total_issues`, `progress`, `start_date`, `end_date`, `create_on`, `update_on`, `is_deleted`) ' +
                  'VALUES (?, ?, ?, \'OPEN\', ? , 0, 0,  ?, ?, now() , now() , 1); '
        db.query(sql, [data.p_key, data.p_name, data.p_description, data.p_type_id, data.p_startdate, data.p_enddate], (err, response) => {
            if (err) console.log(err);
            console.log(data);
            res.json({message: '   Insert success!'})
        })
    },

    // insert new project
    delProject: (req, res) => {
        let data = req.body
        let delStatus = false
        let sqlProjects = 'Update projects p SET p.is_deleted = 2 WHERE p.project_id ='+ data.pId
        let sqlMembers = 'Update members m SET m.is_deleted = 2 WHERE m.project_id ='+ data.pId
        db.query(sqlProjects + ';' + sqlMembers, [data], (err, response) => {
            if (err) console.log(err);
            console.log(data);
            res.json(response)
            //res.json({message: ' Update success!'})
        })
    },

    // check projectkey is exist
    getProjectKey: (req, res) => {
        let data = req.query
        //console.log('getProjectKey ======' + JSON.stringify(data));
        let sql = 'SELECT p.key FROM projects p where p.key = "Pr-'+ data.pkey +'"'
        db.query(sql, (err, response) => {
            if (err) console.log(err);
            console.log('getProjectKey ======' + JSON.stringify(response));
            res.json(response)
        })
    }
}
