import React, {useState, useEffect} from 'react'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import axios from 'axios'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import {  NavLink, useParams } from "react-router-dom"
import Modal from 'react-bootstrap/Modal'
import './Projects_Style.css';

function Project () {
  // session from context
  const userid = 1;

  // parameter check in these case: inserted, updated, deleted successfull. to show popup message.
  let { succes } = useParams();
  let { pId } = useParams();
  const [showISuccessPopup, setIShowSuccessPopup] = useState(false);
  const [showUSuccessPopup, setUShowSuccessPopup] = useState(false);
  const [showDSuccessPopup, setDShowSuccessPopup] = useState(false);
  const [projectInfor, setProjectInfor] = useState({pKey: '', pName: ''})

  //
  const [projects, setProjects] = useState([])
  const [owner, setOwner] = useState([])
  const [projectStatus, setProjectStatus] = useState([{key: 'Open', name: 'Open'}, {key: 'Closed', name: 'Closed'}])
  const [searchCondition, setSearchCondition] = useState({userIdLogin: userid, s_p_key: '', s_p_name : '', s_p_status: 'ALL', s_p_owner_id: 'ALL', s_p_startdate_from: '', s_p_startdate_to: '', s_p_enddate_from: '', s_p_enddate_to: ''})

  useEffect(() => {
     axios.get('http://localhost:3001/projects?userIdLogin=1&s_p_key='+searchCondition.s_p_key+'&s_p_name='+searchCondition.s_p_name+'&s_p_status='+searchCondition.s_p_status+'&s_p_owner_id='+searchCondition.s_p_owner_id+'&s_p_startdate_from='+searchCondition.s_p_startdate_from+'&s_p_startdate_to='+searchCondition.s_p_startdate_to+'&s_p_enddate_from='+searchCondition.s_p_enddate_from +'&s_p_enddate_to='+searchCondition.s_p_enddate_to+'').then(
         (res) => {
           console.log('Init Projects:',res);
           console.log('Init Projects data:',res.data);
           setProjects(res.data);
     }).catch((err) => { console.log('Axios Error:', err); })
  }, []);

  useEffect(() => {
     axios.get('http://localhost:3001/owner').then(
         (res) => {
           console.log('Get Owner:',res);
           console.log('Owner data:',res.data);
           setOwner(res.data);
     }).catch((err) => { console.log('Axios Error:', err); })
  }, []);

  useEffect(() => {
    if (succes === 'isucces' || succes === 'usucces' || succes === 'dsucces') {
      axios.get('http://localhost:3001/projectInfor?pId='+ pId).then(
          (res) => {
            console.log('Get projectInfor:',res);
            console.log('projectInfor data:',res.data);
            setProjectInfor({pKey: res.data[0].key, pName: res.data[0].name});
            console.log('projectInfor projectInfor:' +  projectInfor.pKey);
      }).catch((err) => { console.log('Axios Error:', err); })
    }
    switch (succes) {
      case 'isucces': return setIShowSuccessPopup(true)
      case 'usucces': return setUShowSuccessPopup(true)
      case 'dsucces': return setDShowSuccessPopup(true)
    }
  }, []);
  const onIShowSuccessClose = () => setIShowSuccessPopup(false);
  const onUShowSuccessClose = () => setUShowSuccessPopup(false);
  const onDShowSuccessClose = () => setDShowSuccessPopup(false);


  const onSearch  = function (e) {
    e.preventDefault()
      console.log('hand Estimate');
      axios.get('http://localhost:3001/projects?userIdLogin='+searchCondition.userIdLogin+'&s_p_key='+searchCondition.s_p_key+'&s_p_name='+searchCondition.s_p_name+'&s_p_status='+searchCondition.s_p_status+'&s_p_owner_id='+searchCondition.s_p_owner_id+'&s_p_startdate_to='+searchCondition.s_p_startdate_to+'&s_p_startdate_from='+searchCondition.s_p_startdate_from+'&s_p_enddate_to='+searchCondition.s_p_enddate_to+'&s_p_enddate_from='+searchCondition.s_p_enddate_from+'').then(
          (res) => {
            //setMessage('Insert successfull !')
            console.log('Search Projects:',res);
            console.log('Search Projects data:',res.data);
            setProjects(res.data);
      }).catch((err) => { console.log('Axios Error:', err); })
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

  return (
    <div className="container">
    <div className="modal-header">
      <h1>Projects</h1>
    </div>
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

      <form onSubmit={onSearch}>
        <div className="form-group row">
          <label htmlFor="inputKey" className="col-sm-2 col-form-label">Project Key</label>
          <input type="text"
          value={searchCondition.s_p_key}
          onChange={e => setSearchCondition({...searchCondition, s_p_key: e.target.value})}
          className="col-sm-2 form-control" id="inputKey"/>
          <label htmlFor="inputName" className="col-sm-2 col-form-label">Prject Name</label>
          <input type="text"
          value={searchCondition.s_p_name}
          onChange={e => setSearchCondition({...searchCondition, s_p_name: e.target.value})}
          className="col-sm-6 form-control" id="inputName"/>
        </div>
        <div className="form-group row">
          <label htmlFor="inputStatus" className="col-sm-2 col-form-label">Project Status</label>
          <select id="inputStatus"
              className="col-sm-2 form-control"
              name="projectStatus"
              value={searchCondition.s_p_status}
              onChange={e => setSearchCondition({...searchCondition, s_p_status: e.target.value})}
              defaultValue={'ALL'}
              >
        				<option value="ALL">ALL</option>
                {
                  projectStatus.map((obj, key) => (
        				        <option value={obj.key} key={key}>{obj.name}</option>
                  ))
                }

        		</select>
          <label htmlFor="inputOwner" className="col-sm-2 col-form-label">Owner</label>
          <select id="inputOwner"
              className="col-sm-2 form-control"
              name="projectOwner"
              value={searchCondition.s_p_owner_id}
              onChange={e => setSearchCondition({...searchCondition, s_p_owner_id: e.target.value})}
              defaultValue={'ALL'}
              >
        				<option value="ALL">ALL</option>
                {
                  owner.map((obj, key) => (
        				        <option value={obj.user_id} key={key}>{obj.owner_fullname}</option>
                  ))
                }

        		</select>
        </div>
        <div className="form-group row">
          <label htmlFor="inputStartDateFrom" className="col-sm-2 col-form-label">Start Date</label>
            <DatePicker
            id="inputStartDateFrom"
            className="col-sm-12 form-control"
            name="startDateFrom"
            selected={searchCondition.s_p_startdate_from}
            onChange={e => setSearchCondition({...searchCondition, s_p_startdate_from: e})}
            dateFormat="MM/dd/yyy"/>
          <label htmlFor="inputStartDateTo" className="col-sm-1 col-form-label">~</label>
            <DatePicker
            id="inputStartDateTo"
            className="col-sm-12 form-control"
            name="startDateTo"
            //value={searchCondition.s_p_startdate_to}
            //onChange={e => setSearchCondition({...searchCondition, s_p_startdate_to: e})}
            dateFormat="MM/dd/yyy" />
        </div>
        <div className="form-group row">
          <label htmlFor="inputEndDateFrom" className="col-sm-2 col-form-label">End Date</label>
            <DatePicker
            id="inputEndDateFrom"
            className="col-sm-12 form-control"
            name="startDateFrom"
            //value={searchCondition.s_p_enddate_from}
            //onChange={e => setSearchCondition({...searchCondition, s_p_enddate_from: e})}
            dateFormat="MM/dd/yyy" />
          <label htmlFor="inputEndDateTo" className="col-sm-1 col-form-label">~</label>
            <DatePicker
            id="inputEndDateTo"
            className="col-sm-12 form-control"
            name="startDateTo"
            //value={searchCondition.s_p_enddate_to}
            //onChange={e => setSearchCondition({...searchCondition, s_p_enddate_to: e})}
            dateFormat="MM/dd/yyy" />
        </div>
          <button type="submit" className="btn btn-primary" onClick={onSearch} name="btnSearch">Search</button>
        </form>
      </div>
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
  )
}

export default Project;
