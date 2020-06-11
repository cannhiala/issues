import React, {useState, useEffect} from 'react'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import axios from 'axios'

function CreateProject () {
  // User login
  //const userid = useContext(UserIDContext);
  let pId = 1;
  let username = 'Tang Van Can';
  const [user, setUser] = useState([])
  const [projectType, setProjectType] = useState([])
  const [userAutocomplete, setUserAutocomplete] = useState({userid: 0, fullname: 0})
  const [project, setProject] = useState({p_key: '', p_name: '', p_description: '', p_status: 'Open', p_type_id: '', p_total_issues: 0, p_progress: 0, p_startdate: '', p_enddate: ''})

  useEffect(() => {
     axios.get('http://localhost:3001/projectTypes').then(
         (res) => {
           console.log('Get Member of project:',res);
           console.log('Member data:',res.data[0]);
           setProjectType(res.data);
     }).catch((err) => { console.log('Axios Error:', err); })
  }, []);

  useEffect(() => {
     axios.get('http://localhost:3001/users').then(
         (res) => {
           console.log('Get Member of project:',res);
           console.log('Member data:',res.data[0]);
           setUser(res.data);
     }).catch((err) => { console.log('Axios Error:', err); })
  }, []);

  const onSave  = function (e) {
    e.preventDefault()
    console.log('hand Estimate');
  }
  const onBack  = function (e) {
    e.preventDefault()
    console.log('hand Estimate');
  }

  return (
    <div className="container">
      <div className="modal-header">
        <h1>Create Project</h1>
      </div>
      <div className="modal-body">
        <div className="form-group row">
          <button type="submit" className="btn btn-primary" onClick={onSave} name="btnDelProject">Save</button>&nbsp;&nbsp;
          <button type="submit" className="btn btn-primary" onClick={onBack} name="btnBack">Back</button>
        </div>
        <div className="form-group row">
          <label htmlFor="inputKey" className="col-sm-2 col-form-label">Project Key</label>
          <input type="text"
          value={project.p_key}
          onChange={e => setProject({...project, p_key: e.target.value})}
          className="col-sm-2 form-control" id="inputKey"/>
        </div>

        <div className="form-group row">
          <label htmlFor="inputName" className="col-sm-2 col-form-label">Prject Name</label>
          <input type="text"
          value={project.p_name}
          onChange={e => setProject({...project, p_name: e.target.value})}
          className="col-sm-6 form-control" id="inputName"/>
        </div>

        <div className="form-group row" >
          <label htmlFor="inputStatus" className="col-sm-2 col-form-label">Project Status:</label>
          <label className="col-sm-2 col-form-label">Open</label>
          <label htmlFor="inputType" className="col-sm-2 col-form-label">Project Type:</label>
          <select id="inputType"
              className="col-sm-4 form-control"
              name="projectType"
              value={project.p_type_id}
              onChange={e => setProject({...project, p_type_id: e.target.value})}
              defaultValue={'ALL'}>
                {
                  projectType.map((obj, key) => (
                        <option value={obj.project_type_id} Key={key}>{obj.name}</option>
                  ))
                }

            </select>
        </div>

        <div className="form-group row" >
          <label htmlFor="inputStartDate" className="col-sm-2 col-form-label">Start Date:</label>
            <DatePicker
            id="inputStartDate"
            className="col-sm-10 form-control"
            name="startDate"
            selected={project.p_startdate}
            onChange={e => setProject({...project, p_startdate: e})}
            dateFormat="MM/dd/yyy"/>

          <label htmlFor="inputEndDate" className="col-sm-2 col-form-label">End Date:</label>
            <DatePicker
            id="inputEndDate"
            className="col-sm-10 form-control"
            name="endDate"
            selected={project.p_enddate}
            onChange={e => setProject({...project, p_enddate: e})}
            dateFormat="MM/dd/yyy"/>
        </div>

        <div className="form-group row" >
          <label className="col-sm-2 col-form-label">Owner:</label>
          <label className="col-sm-10 col-form-label">{username}</label>
        </div>

        {userAutocomplete.userid}
        <div htmlFor="inputMember" className="form-group row" >
          <label className="col-sm-2 col-form-label">Members:</label>
          <Autocomplete className="pding"
          	id="combo-box-demo"
          	options={user}
            freeSolo
            onChange={(event, newValue) => {
              console.log(event);
              console.log(newValue.user_id);
              console.log(newValue.fullname);
              setUserAutocomplete({userid: newValue.user_id, fullname: newValue.fullname})
            }}
          	getOptionLabel={option => option.fullname}
          	style={{ width: 300 }}
          	renderInput={params => (
          		<TextField {...params} label="input user" variant="outlined" fullWidth />
          	)}
          />
        </div>
        <div className="form-group row" >
          <label htmlFor="inputDescription" className="col-sm-2 col-form-label">Description:</label>
          <textarea  type="text" rows="4" cols="50"
          value={project.p_description}
          onChange={e => setProject({...project, p_description: e.target.value})}
          className="col-sm-6 form-control" id="inputDescription"/>
        </div>
      </div>
    </div>
  )
}

export default CreateProject;
