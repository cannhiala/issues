import React, {useState, useEffect} from 'react'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import axios from 'axios'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';


function Userinterface () {
  // User login
  //const userid = useContext(UserIDContext);
  const userid = 1;

  const [projects, setProjects] = useState([])
  const [projectStatus, setProjectStatus] = useState([{key: 'Open', name: 'Open'}, {key: 'Closed', name: 'Closed'}])
  console.log(projectStatus);
  const [owner, setOwner] = useState([])
  const [searchCondition, setSearchCondition] = useState({userIdLogin: userid, s_p_key: '', s_p_name : '', s_p_status: 'ALL', s_p_owner_id: 'ALL', s_p_startdate_from: '', s_p_startdate_to: '', s_p_enddate_from: '', s_p_enddate_to: ''})
  //const [startDate, setStartDate] = useState(new Date());
  //const [endDate, setEndDate] = useState(new Date());

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


  return (
    <div className="container">
    <div className="modal-header">
      <h1>Projects</h1>
    </div>
    <div className="modal-body">
      <form onSubmit={onSearch}>
        <div className="form-group row">
          <label htmlFor="inputKey" className="col-sm-2 col-form-label">Project Key</label>
          <input type="email"
          value={searchCondition.s_p_key}
          onChange={e => setSearchCondition({...searchCondition, s_p_key: e.target.value})}
          className="col-sm-2 form-control" id="inputKey"/>
          <label htmlFor="inputName" className="col-sm-2 col-form-label">Prject Name</label>
          <input type="email"
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
        				        <option value={obj.project_type_id} Key={key}>{obj.name}</option>
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
        				        <option value={obj.user_id} Key={key}>{obj.owner_fullname}</option>
                  ))
                }

        		</select>
        </div>
        <div className="form-group row">
          <label htmlFor="inputStartDateFrom" className="col-sm-2 col-form-label">Start Date</label>
          <div className="col-sm-3">
            <DatePicker
            id="inputStartDateFrom"
            className="col-sm-12 form-control"
            name="startDateFrom"
            //selected={searchCondition.s_p_startdate_from}
            //onChange={e => setSearchCondition({...searchCondition, s_p_startdate_from: e})}
            dateFormat="MM/dd/yyy"
             />
          </div>
          <label htmlFor="inputStartDateTo" className="col-sm-1 col-form-label">~</label>
          <div className="col-sm-3">
            <DatePicker
            id="inputStartDateTo"
            className="col-sm-12 form-control"
            name="startDateTo"
            //value={searchCondition.s_p_startdate_to}
            //onChange={e => setSearchCondition({...searchCondition, s_p_startdate_to: e})}
            dateFormat="MM/dd/yyy"
             />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputEndDateFrom" className="col-sm-2 col-form-label">End Date</label>
          <div className="col-sm-3">
            <DatePicker
            id="inputEndDateFrom"
            className="col-sm-12 form-control"
            name="startDateFrom"
            //value={searchCondition.s_p_enddate_from}
            //onChange={e => setSearchCondition({...searchCondition, s_p_enddate_from: e})}
            dateFormat="MM/dd/yyy"
             />
          </div>
          <label htmlFor="inputEndDateTo" className="col-sm-1 col-form-label">~</label>
          <div className="col-sm-3">
            <DatePicker
            id="inputEndDateTo"
            className="col-sm-12 form-control"
            name="startDateTo"
            //value={searchCondition.s_p_enddate_to}
            //onChange={e => setSearchCondition({...searchCondition, s_p_enddate_to: e})}
            dateFormat="MM/dd/yyy"
             />
          </div>
        </div>
          <button type="submit" className="btn btn-primary" onClick={onSearch} name="btnSearch">Search</button>
        </form>
      </div>
        <table id="projects" className="table table-striped table-bordered table-sm" cellspacing="0" width="100%">
          <thead>
            <tr>
              <th class="th-sm">Action</th>
              <th>Project Key</th>
              <th>Project Name</th>
              <th>Project Status</th>
              <th>Project Type</th>
              <th>Progess</th>
              <th>Owner</th>
              <th>Start Date</th>
              <th>End Date</th>
            </tr>
          </thead>
          <tbody>
            {
              projects.map((obj, key) => (
                <tr  key={key}>
                  <td>View issues</td>
                  <td>{obj.key}</td>
                  <td>{obj.name}</td>
                  <td>{obj.status}</td>
                  <td>{obj.project_type_name}</td>
                  <td>{obj.progress}%</td>
                  <td>{obj.owner_fullname}</td>
                  <td>{obj.start_date}</td>
                  <td>{obj.end_date}</td>
                </tr>
              ))
          }
          </tbody>
        </table>
          <BootstrapTable data={ projects } >
              <TableHeaderColumn dataField='key' isKey={ true } dataSort={ true }>Project Key</TableHeaderColumn>
              <TableHeaderColumn dataField='name' dataSort={ true }>Project Name</TableHeaderColumn>
              <TableHeaderColumn dataField='status' dataSort={ true }>Project Status</TableHeaderColumn>
              <TableHeaderColumn dataField='project_type_name' dataSort={ true }>Project Type</TableHeaderColumn>
              <TableHeaderColumn dataField='progress' dataSort={ true }>Progess</TableHeaderColumn>
              <TableHeaderColumn dataField='owner_fullname' dataSort={ true }>Owner</TableHeaderColumn>
              <TableHeaderColumn dataField='start_date' dataSort={ true }>Start Date</TableHeaderColumn>
              <TableHeaderColumn dataField='end_date' dataSort={ true }>End Date</TableHeaderColumn>
          </BootstrapTable>
    </div>
  )
}

export default Userinterface;
