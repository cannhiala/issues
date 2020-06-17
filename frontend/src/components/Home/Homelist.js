import React, { Component, useState, useEffect } from 'react'
import axios from 'axios'
import { getUser } from './../../utils/Common'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import {  NavLink } from "react-router-dom"

function Homelist () {

  const [projects, setProjects] = useState([])
  const userid = getUser().userId

  useEffect(() => {
          axios.get('http://localhost:3001/myProject?uId='+userid).then(
              (res) => {
                if (null !== res.data)
                    setProjects(res.data)
          }).catch((err) => { console.log('Projects Error: ', err) })
  }, [userid])

  const pOvewviewLink = function(cell, row) {
      let strLink = "/pOverview/" + row.project_id
      return <NavLink exact to={strLink}> Overview </NavLink>
  }

  return (
            <div>
              <BootstrapTable data={ projects } trClassName='table table-striped table-bordered table-sm' pagination = {true}>
                  <TableHeaderColumn width={'11%'} dataField='project_id' isKey={ true } dataFormat={pOvewviewLink} dataSort={ false }></TableHeaderColumn>
                  <TableHeaderColumn width={'11%'} dataField='key' dataSort={ false }>Project Key</TableHeaderColumn>
                  <TableHeaderColumn width={'15%'} dataField='name' dataSort={ true }>Project Name</TableHeaderColumn>
                  <TableHeaderColumn width={'13%'} dataField='status' dataSort={ true }>Project Status</TableHeaderColumn>
                  <TableHeaderColumn width={'12%'} dataField='projecttype' dataSort={ true }>Project Type</TableHeaderColumn>
              </BootstrapTable>
            </div>
  )
}
export default Homelist
