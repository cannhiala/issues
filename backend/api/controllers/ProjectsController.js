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
                	'LEFT JOIN users u ON m.user_id = u.user_id  '+
                	'WHERE m.owner = 1 AND p.is_deleted = 1 AND m.is_deleted = 1 AND m.user_id = '+data.userIdLogin+' '+
                	'UNION  '+
                	'Select tbl2.*, u.user_id, m.owner, CONCAT_WS(\' \', u.first_name, u.last_name) AS owner_fullname  from  '+
                		'(SELECT p.project_id, p.key, p.name, p.description, p.status, p.project_type_id, p.total_issues, p.progress, DATE_FORMAT(p.start_date, \'%d/%m/%Y\') as start_date, DATE_FORMAT(p.end_date, \'%d/%m/%Y\') as end_date, p.create_on, p.update_on, p.is_deleted,  pt.name as project_type_name  '+
                		'FROM projects p  '+
                		'LEFT JOIN project_types pt ON p.project_type_id = pt.project_type_id  '+
                		'LEFT JOIN members m ON p.project_id = m.project_id  '+
                		'LEFT JOIN users u ON m.member_id = u.user_id  '+
                		'WHERE m.owner = 2 AND p.is_deleted = 1 AND m.is_deleted = 1 AND m.user_id = '+data.userIdLogin+') tbl2  '+
                	'LEFT JOIN members m ON tbl2.project_id = m.project_id   '+
                	'LEFT JOIN users u ON m.user_id = u.user_id  '+
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
                  sql = sql + ' ORDER BY tt.`update_on` DESC ';
                  //console.log("SQL here  ===  : " + sql);
        db.query(sql, (err, response) => {
            if (err) console.log(err);
            res.json(response)
        })
    },

    // get project detail
    getProjectDetail: (req, res) => {
        let data = req.query
        let sql = 'Select DISTINCT tbl2.*, u.user_id, m.owner, CONCAT_WS(\' \', u.first_name, u.last_name) AS owner_fullname  from '+
                		'(SELECT p.project_id, p.key, p.name, p.description, p.status, p.project_type_id, p.total_issues, p.progress, DATE_FORMAT(p.start_date, \'%d/%m/%Y\') as start_date, DATE_FORMAT(p.end_date, \'%d/%m/%Y\') as end_date, p.create_on, p.update_on, p.is_deleted,  pt.name as project_type_name  '+
                		'FROM projects p '+
                		'LEFT JOIN project_types pt ON p.project_type_id = pt.project_type_id '+
                		'LEFT JOIN members m ON p.project_id = m.project_id  '+
                		'LEFT JOIN users u ON m.member_id = u.user_id  '+
                		'WHERE p.is_deleted = 1 AND m.is_deleted = 1) tbl2  '+
                	'LEFT JOIN members m ON tbl2.project_id = m.project_id  '+
                	'LEFT JOIN users u ON m.user_id = u.user_id  '+
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
                  'INNER JOIN users u ON m.user_id = u.user_id  '+
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
        let data = req.query
        let sql = 'SELECT u.user_id, CONCAT_WS(\' \', u.first_name, u.last_name) AS fullname	'+
                  'FROM users u	'+
                  'WHERE u.`is_deleted` = 1 AND u.user_id != '+ data.uId +' ORDER BY fullname	'
        db.query(sql, (err, response) => {
            if (err) console.log(err);
            res.json(response)
        })
    },

    // insert new project
    addProject: (req, res) => {
        let data = req.body
        let project = data.project
        let members = data.members
        let owner_id = data.owner
        let startDate = project.p_startdate !== '' ? '"'+project.p_startdate+'"' : null
        let endDate = project.p_enddate !== '' ? '"'+project.p_enddate+'"' : null

        let insProject = 'INSERT INTO `issuestracking`.`projects` '+
                   '(`key`, `name`, `description`, `status`, `project_type_id`, `total_issues`, `progress`, `start_date`, `end_date`, `create_on`, `update_on`, `is_deleted`) ' +
                   'VALUES ("'+ project.p_key + '", "'+ project.p_name + '", "'+ project.p_description + '", \'OPEN\', '+project.p_type_id+' , 0, 0,  '+startDate+' , '+endDate+', now() , now() , 1); '
        let insMember = '';
        for (let key in members) {
          insMember += 'INSERT INTO `issuestracking`.`members` '+
                        '(`project_id`, `user_id`, `owner`, `create_on`, `is_deleted`) ' +
                        'VALUES ((SELECT project_id FROM projects p WHERE p.key="'+ project.p_key + '"), '+members[key].userid+', 2, now(), 1); '
        }
        insMember += 'INSERT INTO `issuestracking`.`members` '+
                      '(`project_id`, `user_id`, `owner`, `create_on`, `is_deleted`) ' +
                      'VALUES ((SELECT project_id FROM projects p WHERE p.key="'+ project.p_key + '"), '+owner_id+', 1, now(), 1); '
        db.query(insProject + insMember, [], (err, response) => {
            if (err) {
              console.log('Inserted Project Error!');
              console.log(err)
              res.json(response)
            } else {
              console.log('Inserted Project success!');
              res.json(response)
            }
        })
    },

    // insert new project
    updProject: (req, res) => {
        let data = req.body
        let project = data.project
        let members = data.members
        let startDate = project.p_startdate !== '' ? '"'+project.p_startdate+'"' : null
        let endDate = project.p_enddate !== '' ? '"'+project.p_enddate+'"' : null

        let updProject = 'UPDATE `issuestracking`.`projects` '+
                            'SET '+
                            '`key` = "'+ project.p_key + '", '+
                            '`name` = "'+ project.p_name + '", '+
                            '`description` = "'+ project.p_description + '", '+
                            '`status` = "'+ project.p_status + '", '+
                            '`project_type_id` = '+project.p_type_id+', '+
                            '`start_date` = '+startDate+', '+
                            '`end_date` = '+endDate+', '+
                            '`update_on` = now() '+
                            'WHERE `project_id` = '+ project.p_id +'; '
        let delMember = 'DELETE FROM `issuestracking`.`members` m WHERE m.project_id = '+ project.p_id +' AND m.owner = 2; '
        let insMember = '';
        console.log("MEMber ========== ", members);
        for (let key in members) {
          insMember += 'INSERT INTO `issuestracking`.`members` '+
                        '(`project_id`, `user_id`, `owner`, `create_on`, `is_deleted`) ' +
                        'VALUES ('+ project.p_id +', '+members[key].userid+', 2, now(), 1); '
        }
        db.query(updProject + delMember + insMember, [], (err, response) => {
          if (err) {
            console.log('Updated Project Error!');
            console.log(err)
            res.json(response)
          } else {
            console.log('Updated Project success!');
            res.json(response)
          }
        })
    },

    // del new project
    delProject: (req, res) => {
        let data = req.body
        let delStatus = false
        let sqlProjects = 'Update projects p SET p.is_deleted = 2 WHERE p.project_id ='+ data.pId
        let sqlMembers = 'Update members m SET m.is_deleted = 2 WHERE m.project_id ='+ data.pId
        db.query(sqlProjects + ';' + sqlMembers, [data], (err, response) => {
            if (err) console.log(err);
            // console.log(data);
            res.json(response)
            console.log('Deleted Project success!');
            //res.json({message: ' Update success!'})
        })
    },

    // check projectkey is exist
    getProjectKey: (req, res) => {
        let data = req.query
        //console.log('getProjectKey ======' + JSON.stringify(data));
        let sql = 'SELECT p.project_id, p.key FROM projects p where p.key = "Pr-'+ data.pkey +'"'
        db.query(sql, (err, response) => {
            if (err) console.log(err);
            console.log('getProjectKey ======' + JSON.stringify(response));
            res.json(response)
        })
    },

    // get project infor for update
    getProjectForUpdate: (req, res) => {
        let data = req.query
        let sql = 'SELECT p.project_id, p.key, p.name, p.status, p.project_type_id, DATE_FORMAT(p.start_date, \'%Y-%m-%d\') as start_date, DATE_FORMAT(p.end_date, \'%Y-%m-%d\') as end_date, p.description '+
                  'FROM issuestracking.projects p '+
                  'WHERE p.is_deleted = 1 AND p.project_id='+ data.pId
        db.query(sql, (err, response) => {
            if (err) console.log(err);
            res.json(response)
        })
    },

    getUserForUpdate: (req, res) => {
        let data = req.query
        let sql = 'SELECT m.user_id as userid, CONCAT_WS(\' \', u.first_name, u.last_name) AS fullname FROM issuestracking.members m  '+
                  'LEFT JOIN users u ON m.user_id = u.user_id '+
                  'WHERE m.project_id = '+ data.pId + ' AND m.user_id <> '+ data.uId
        db.query(sql, (err, response) => {
            if (err) console.log(err);
            res.json(response)
        })
    },
    // Project overview pie chart
    getPieChart: (req, res) => {
        let data = req.query
        let sql = 'SELECT IFNULL(i.Amount,0) as y, ist.name as label, ist.color as color FROM issue_statuses ist '+
                    'LEFT JOIN (SELECT issue_status_id, COUNT(issue_status_id) as Amount '+
                    	   'FROM `issues` '+
                    	   'WHERE is_deleted = 1 AND project_id ='+ data.pId +
                    	   ' GROUP BY issue_status_id) i ON i.issue_status_id = ist.issue_status_id  '+
                    ' WHERE ist.is_deleted = 1 '
        db.query(sql, (err, response) => {
            if (err) console.log(err);
            res.json(response)
        })
    },

    // Project overview Stacked chart
    getStackedChart: (req, res) => {
        let data = req.query
        let sql = 'SELECT ist.*, pt.name FROM (SELECT IFNULL(i.Amount,0) as y, ist.name as label, ist.color as color, projec_type_id FROM issue_statuses ist ' +
                    'LEFT JOIN (SELECT issue_status_id, COUNT(issue_status_id) as Amount, projec_type_id ' +
                    	   'FROM `issues` ' +
                    	   'WHERE is_deleted = 1 AND project_id =1 ' +
                    	    'GROUP BY issue_status_id) i ON i.issue_status_id = ist.issue_status_id ' +
                     'WHERE ist.is_deleted = 1) ist ' +
                  'LEFT JOIN (SELECT pt.project_type_id, pt.name FROM issuestracking.project_types pt ' +
                  				'INNER JOIN (SELECT pt.project_type_id, pt.name FROM issuestracking.project_types pt ' +
                  							'LEFT JOIN projects p ON p.project_type_id = pt.project_type_id ' +
                  							'WHERE p.project_id = 1 and pt.is_deleted = 1) pt2 ' +
                  				'ON pt2.project_type_id = pt.parent_id ' +
                  				'WHERE pt.is_deleted = 1) pt ' +
                  'ON pt.project_type_id =  ist.projec_type_id; '
        db.query(sql, (err, response) => {
            if (err) console.log(err);
            res.json(response)
        })
    },

    getStackedChartProjectType: (req, res) => {
        let data = req.query
        let sql = 'SELECT pt.project_type_id, pt.name FROM issuestracking.project_types pt '+ 
                  				'INNER JOIN (SELECT pt.project_type_id, pt.name FROM issuestracking.project_types pt '+
                  							'LEFT JOIN projects p ON p.project_type_id = pt.project_type_id '+
                  							'WHERE p.project_id = 1 and pt.is_deleted = 1) pt2 '+
                  				'ON pt2.project_type_id = pt.parent_id '+
                  				'WHERE pt.is_deleted = 1'
        db.query(sql, (err, response) => {
            if (err) console.log(err);
            res.json(response)
        })
    }
}
