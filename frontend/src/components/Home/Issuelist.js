import React, { Component, useState, useEffect } from 'react'
import axios from 'axios'
import { getUser } from './../../utils/Common'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import {  NavLink } from "react-router-dom"

function Issuelist () {

  const [issues, setIssues] = useState([])
  const userid = getUser().userId

  useEffect(() => {
      axios.get('http://localhost:3001/myIssue?uId='+userid)
      .then(res => {
        if (null !== res.data)
            setIssues(res.data)
          }).catch((err) => { console.log('Projects Error: ', err) })
    }, [userid])


    const issueTypeDataFormat = function(cell, row) {
        return (
            <span className={"pill pill-" + row.issue_category_id}>{row.issuetype}</span>
        )
    }

    const issueStatusFormat = function(cell, row) {
        return (
            <span className={"pill-status pill-status-" + row.issue_status_id}>{row.issuestatus}</span>
        )
    }

    const issueIdFormat = function(cell, row) {
        return (
            <NavLink exact to={'/issueDetail/'+ row.issue_id}> {row.key} </NavLink>
        )
    }

  return (
        <div>
          <BootstrapTable data={ issues } trClassName='table table-striped table-bordered table-sm' pagination = {true}>
              <TableHeaderColumn width={'11%'} dataField='issuetype' dataFormat={issueTypeDataFormat} dataSort={ false }>Issue Type</TableHeaderColumn>
              <TableHeaderColumn width={'15%'} dataField='key' dataFormat={issueIdFormat} isKey={ true } dataSort={ true }>Issue Key</TableHeaderColumn>
              <TableHeaderColumn width={'13%'} dataField='name' dataSort={ true }>Issue Name</TableHeaderColumn>
              <TableHeaderColumn width={'12%'} dataField='issuestatus' dataFormat={issueStatusFormat} dataSort={ true }>Issue Status</TableHeaderColumn>
              <TableHeaderColumn width={'15%'} dataField='issuepriority' dataSort={ true }>Issue Priority</TableHeaderColumn>
              <TableHeaderColumn width={'13%'} dataField='projectname' dataSort={ true }>Project Name</TableHeaderColumn>
              <TableHeaderColumn width={'12%'} dataField='duedate' dataSort={ true }>Due Date</TableHeaderColumn>
              <TableHeaderColumn hidden={true} dataField='issue_category_id'>Issue type Id</TableHeaderColumn>
              <TableHeaderColumn hidden={true} dataField='issue_id'>Project Id</TableHeaderColumn>
              <TableHeaderColumn hidden={true} dataField='issue_status_id'>Project Status Id</TableHeaderColumn>
          </BootstrapTable>
        </div>
      )
}

export default Issuelist;
