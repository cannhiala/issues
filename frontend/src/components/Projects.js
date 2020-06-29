import React, {useState, useEffect} from 'react'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import axios from 'axios'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import {  NavLink, useParams } from "react-router-dom"
import Modal from 'react-bootstrap/Modal'
import './Projects_Style.css'
import { useHistory } from "react-router-dom"
import Moment from 'moment'
import Menu from './Menu'
import { getUser } from './../utils/Common'

function Project () {
  const url = 'http://localhost:3001/'
  const isucces = 'isucces'
  const usucces = 'usucces'
  const dsucces = 'dsucces'
  // session from context
  const userid = getUser().userId
  const history = useHistory()

  // parameter check in these case: inserted, updated, deleted successfull. to show popup message.
  const { success } = useParams()
  const { pId } = useParams()
  const [showISuccessPopup, setIShowSuccessPopup] = useState(false)
  const [showUSuccessPopup, setUShowSuccessPopup] = useState(false)
  const [showDSuccessPopup, setDShowSuccessPopup] = useState(false)
  const [projectInfor, setProjectInfor] = useState({pKey: '', pName: ''})

  //
  const [projects, setProjects] = useState([])
  const [owner, setOwner] = useState([])
  const [projectStatus, setProjectStatus] = useState([{key: 'Open', name: 'Open'}, {key: 'Closed', name: 'Closed'}])
  const [searchCondition, setSearchCondition] = useState({userIdLogin: userid, s_p_key: '', s_p_name : '', s_p_status: 'ALL', s_p_owner_id: 'ALL', s_p_startdate_from: '', s_p_startdate_to: '', s_p_enddate_from: '', s_p_enddate_to: ''})

  useEffect(() => {
     axios.get(url + 'projects?userIdLogin='+userid+'&s_p_key='+searchCondition.s_p_key+'&s_p_name='+searchCondition.s_p_name+'&s_p_status='+searchCondition.s_p_status+'&s_p_owner_id='+searchCondition.s_p_owner_id+'&s_p_startdate_from='+searchCondition.s_p_startdate_from+'&s_p_startdate_to='+searchCondition.s_p_startdate_to+'&s_p_enddate_from='+searchCondition.s_p_enddate_from +'&s_p_enddate_to='+searchCondition.s_p_enddate_to+'').then(
         (res) => {
            setProjects(res.data[0])
     }).catch((err) => { console.log('Axios Error:', err) })
  }, [])

  useEffect(() => {
     axios.get(url + 'owner').then(
         (res) => {
           setOwner(res.data)
     }).catch((err) => { console.log('Axios Error:', err) })
  }, [])

  useEffect(() => {
    if (success === isucces || success === usucces || success === dsucces) {
      axios.get(url + 'projectInfor?pId='+ pId).then(
          (res) => {
            setProjectInfor({pKey: res.data[0].key, pName: res.data[0].name})
      }).catch((err) => { console.log('Axios Error:', err) })
    }
    switch (success) {
      case isucces: return setIShowSuccessPopup(true)
      case usucces: return setUShowSuccessPopup(true)
      case dsucces: return setDShowSuccessPopup(true)
    }
  }, [])
  const onIShowSuccessClose = () => setIShowSuccessPopup(false)
  const onUShowSuccessClose = () => setUShowSuccessPopup(false)
  const onDShowSuccessClose = () => setDShowSuccessPopup(false)


  const onSearch  = function (e) {
      e.preventDefault()

      let startDateF = ((searchCondition.s_p_startdate_from !== '') ? Moment(searchCondition.s_p_startdate_from).format('YYYY/MM/DD') : '')
      let startDateT = ((searchCondition.s_p_startdate_to !== '') ? Moment(searchCondition.s_p_startdate_to).format('YYYY/MM/DD') : '')
      let endDateF = ((searchCondition.s_p_enddate_from !== '') ? Moment(searchCondition.s_p_enddate_from).format('YYYY/MM/DD') : '')
      let endDateT = ((searchCondition.s_p_enddate_to !== '') ? Moment(searchCondition.s_p_enddate_to).format('YYYY/MM/DD') : '')

      axios.get(url + 'projects?userIdLogin='+searchCondition.userIdLogin
      +'&s_p_key='+searchCondition.s_p_key
      +'&s_p_name='+searchCondition.s_p_name
      +'&s_p_status='+searchCondition.s_p_status
      +'&s_p_owner_id='+searchCondition.s_p_owner_id
      +'&s_p_startdate_from='+ startDateF
      +'&s_p_startdate_to='+ startDateT
      +'&s_p_enddate_from='+ endDateF
      +'&s_p_enddate_to='+ endDateT+'').then(
          (res) => {
              setProjects(res.data[0])
      }).catch((err) => { console.log('Axios Error:', err) })
  }

  const viewIssuesLink = function(cell, row) {
      return '<div><a href=issues/'+ row.project_id +'>View Issues</a></div>'
  }
  const projectKeyLink = function(cell, row) {
      let strLink = "/pDetail/" + row.project_id
      return <NavLink exact to={strLink}> {row.key} </NavLink>
  }

  const progress = function(cell, row) {
      return '<div>'+ row.progress +'% </div>'
  }

  const onCreateProject = function (e) {
      history.replace("/newProject")
  }
  return (
    <div id="container" className="fixed-header sidebar-closed">
        <div id="content">
            <div className="container">
                <div className="crumbs">
                    <ul className="breadcrumb"><b>Projects</b></ul>
                </div>
                <br /><br />
                <div className="modal-body">
                <Modal show={showISuccessPopup} onHide={onIShowSuccessClose} animation={false}>
                  <Modal.Header closeButton>
                    <Modal.Title>Inserted Success</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>Project: {projectInfor.pName} ({projectInfor.pKey}) had inserted successfull !</Modal.Body>
                </Modal>

                <Modal show={showUSuccessPopup} onHide={onUShowSuccessClose} animation={false}>
                  <Modal.Header closeButton>
                    <Modal.Title>Updated Success</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>Project: {projectInfor.pName} ({projectInfor.pKey}) had updated successfull !</Modal.Body>
                </Modal>

                <Modal show={showDSuccessPopup} onHide={onDShowSuccessClose} animation={false}>
                  <Modal.Header closeButton>
                    <Modal.Title>Deleted Success</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>Project: {projectInfor.pName} ({projectInfor.pKey}) had deleted successfull !</Modal.Body>
                </Modal>

                <form onSubmit={onSearch} autocomplete='off'>
                  <div className="form-group row">
                    <div className="col-xs-2 col-sm-2 col-lg-2">
                      <label htmlFor="inputKey" className="col-form-label">Project Key</label>
                    </div>
                    <div className="col-xs-3 col-sm-3 col-lg-3">
                      <input type="text"
                        value={searchCondition.s_p_key}
                        onChange={pKey => setSearchCondition({...searchCondition, s_p_key: pKey.target.value})}
                        className="form-control" id="inputKey"/>
                    </div>
                    <div className="col-xs-2 col-sm-2 col-lg-2">
                      <label htmlFor="inputName" className="col-form-label">Prject Name</label>
                    </div>
                    <div className="col-xs-3 col-sm-3 col-lg-3">
                      <input type="text"
                      value={searchCondition.s_p_name}
                      onChange={pName => setSearchCondition({...searchCondition, s_p_name: pName.target.value})}
                      className="form-control" id="inputName"/>
                    </div>
                  </div>

                  <div className="form-group row">
                    <div className="col-xs-2 col-sm-2 col-lg-2">
                      <label htmlFor="inputStatus" className="col-form-label">Project Status</label>
                    </div>
                    <div className="col-xs-3 col-sm-3 col-lg-3">
                      <select id="inputStatus"
                          className="form-control"
                          name="projectStatus"
                          value={searchCondition.s_p_status}
                          onChange={pStatus => setSearchCondition({...searchCondition, s_p_status: pStatus.target.value})}
                          defaultValue={'ALL'}
                          >
                    				<option value="ALL">ALL</option>
                            {
                              projectStatus.map((objStatus, key) => (
                    				        <option value={objStatus.key} key={key}>{objStatus.name}</option>
                              ))
                            }

                    		</select>
                    </div>
                    <div className="col-xs-2 col-sm-2 col-lg-2">
                      <label htmlFor="inputOwner" className="col-form-label">Owner</label>
                    </div>
                    <div className="col-xs-3 col-sm-3 col-lg-3">
                      <select id="inputOwner"
                          className="form-control"
                          name="projectOwner"
                          value={searchCondition.s_p_owner_id}
                          onChange={pOwner => setSearchCondition({...searchCondition, s_p_owner_id: pOwner.target.value})}
                          defaultValue={'ALL'}
                          >
                    				<option value="ALL">ALL</option>
                            {
                              owner.map((objOwner, key) => (
                    				        <option value={objOwner.user_id} key={key}>{objOwner.owner_fullname}</option>
                              ))
                            }

                    		</select>
                    </div>
                  </div>

                  <div className="form-group row">
                    <div className="col-xs-2 col-sm-2 col-lg-2">
                      <label htmlFor="inputStartDateFrom" className="col-form-label">Start Date</label>
                    </div>
                    <div className="col-xs-3 col-sm-3 col-lg-3">
                      <DatePicker
                      id="inputStartDateFrom"
                      className="form-control"
                      name="startDateFrom"
                      selected={searchCondition.s_p_startdate_from}
                      onChange={startDateFrom => setSearchCondition({...searchCondition, s_p_startdate_from: startDateFrom})}
                      dateFormat="MM/dd/yyy"/> &nbsp;&nbsp; ~ 	&nbsp;&nbsp;
                    </div>
                    <div className="col-xs-3 col-sm-3 col-lg-3">
                      <DatePicker
                      id="inputStartDateTo"
                      className="form-control"
                      name="startDateTo"
                      selected={searchCondition.s_p_startdate_to}
                      onChange={startdateto => setSearchCondition({...searchCondition, s_p_startdate_to: startdateto})}
                      dateFormat="MM/dd/yyy" />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-xs-2 col-sm-2 col-lg-2">
                      <label htmlFor="inputEndDateFrom" className="col-form-label">End Date</label>
                    </div>
                    <div className="col-xs-3 col-sm-3 col-lg-3">
                      <DatePicker
                      id="inputEndDateFrom"
                      className="form-control"
                      name="startDateFrom"
                      selected={searchCondition.s_p_enddate_from}
                      onChange={enddatefrom => setSearchCondition({...searchCondition, s_p_enddate_from: enddatefrom})}
                      dateFormat="MM/dd/yyy" />&nbsp;&nbsp; ~ 	&nbsp;&nbsp;
                    </div>
                    <div className="col-xs-3 col-sm-3 col-lg-3">
                      <DatePicker
                      className="form-control"
                      name="startDateTo"
                      selected={searchCondition.s_p_enddate_to}
                      onChange={enddateto => setSearchCondition({...searchCondition, s_p_enddate_to: enddateto})}
                      dateFormat="MM/dd/yyy" />
                    </div>
                  </div>
                    <button type="submit" className="btn btn-primary" onClick={onSearch} name="btnSearch">Search</button>
                  </form>
                </div>
                <button type="Button" className="btn btn-primary pull-right" onClick={onCreateProject} name="btnCreateProject">Create Project</button>
                <br/>
                <br/>
                <br/>
                <BootstrapTable data={ projects } trClassName='table table-striped table-bordered table-sm' pagination = {true}>
                    <TableHeaderColumn width={'11%'} dataField='project_id' dataFormat={viewIssuesLink} dataSort={ false }>Action</TableHeaderColumn>
                    <TableHeaderColumn width={'11%'} dataField='key' isKey={ true } dataFormat={projectKeyLink} dataSort={ true }>Project Key</TableHeaderColumn>
                    <TableHeaderColumn width={'15%'} dataField='name' dataSort={ true }>Project Name</TableHeaderColumn>
                    <TableHeaderColumn width={'13%'} dataField='status' dataSort={ true }>Project Status</TableHeaderColumn>
                    <TableHeaderColumn width={'12%'} dataField='project_type_name' dataSort={ true }>Project Type</TableHeaderColumn>
                    <TableHeaderColumn width={'9%'} dataField='progress' dataFormat={progress} dataSort={ true }>Progess</TableHeaderColumn>
                    <TableHeaderColumn width={'15%'} dataField='owner_fullname' dataSort={ true }>Owner</TableHeaderColumn>
                    <TableHeaderColumn width={'11%'} dataField='start_date' dataSort={ true }>Start Date</TableHeaderColumn>
                    <TableHeaderColumn width={'11%'} dataField='end_date' dataSort={ true }>End Date</TableHeaderColumn>
                </BootstrapTable>
            </div>
        </div>
    </div>
  )
}

export default Project
