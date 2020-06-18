import React, { Component, useState, useEffect } from 'react'
import axios from 'axios'
import { getUser } from './../../utils/Common'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'

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

  return (
        <div>
          <BootstrapTable data={ issues } trClassName='table table-striped table-bordered table-sm' pagination = {true}>
              <TableHeaderColumn width={'11%'} dataField='issuetype' dataSort={ false }>Issue Type</TableHeaderColumn>
              <TableHeaderColumn width={'15%'} dataField='key' isKey={ true } dataSort={ true }>Issue Key</TableHeaderColumn>
              <TableHeaderColumn width={'13%'} dataField='name' dataSort={ true }>Issue Name</TableHeaderColumn>
              <TableHeaderColumn width={'12%'} dataField='issuestatus' dataSort={ true }>Issue Status</TableHeaderColumn>
              <TableHeaderColumn width={'15%'} dataField='issuepriority' dataSort={ true }>Issue Priority</TableHeaderColumn>
              <TableHeaderColumn width={'13%'} dataField='projectname' dataSort={ true }>Project Name</TableHeaderColumn>
              <TableHeaderColumn width={'12%'} dataField='duedate' dataSort={ true }>Due Date</TableHeaderColumn>
          </BootstrapTable>
        </div>
      )
}

export default Issuelist;
