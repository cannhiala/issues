import React, {useState, useEffect} from 'react'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useHistory } from "react-router-dom";
import axios from 'axios'
import Menu from './Menu';

function CreateProject () {

  let history = useHistory();
  let username = 'Tang Van Can';
  const [user, setUser] = useState([])
  const [projectType, setProjectType] = useState([])
  const [userAutocomplete, setUserAutocomplete] = useState({userid: 0, fullname: 0})
  const [project, setProject] = useState({p_key: '001', p_name: '', p_description: '', p_status: 'Open', p_type_id: '', p_total_issues: 0, p_progress: 0, p_startdate: '', p_enddate: ''})
  const [members, setMembers] = useState([])

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
    if (project.p_key.trim() === '') {
        alert('Please input project key !');
        return false;
    }
    if ( project.p_name.trim() === '') {
        alert('Please input project name !');
        return false;
    } else {
       //onCheckProjectKey();
    }

     axios.post('http://localhost:3001/addUser', project).then(
          (res) => {
            //setMessage('Insert successfull !')
            console.log('Axios:',res);
            console.log('Axios data:',res.data);
          //  history.push("projects/isucces/");
      }).catch((err) => { console.log('Axios Error:', err); })
  }

  const onCheckProjectKey  = function (e) {
    axios.get('http://localhost:3001/checkPKey?pkey='+project.p_key).then(
          (res) => {
            if(res.status === 200) {
                console.log('PROJECT PROJECT KEY success:',res.data)
            } else {
              const error = new Error(res.error)
              console.log('Check PROJECT KEY Error:', error);
            }
      }).catch((err) => { console.log('Check PROJECT KEY Error:', err); })
  }

  const onBack  = function (e) {
    e.preventDefault()
    history.push("/projects");
  }

  const onAddUser  = function (e) {
    e.preventDefault()
    setMembers(oldArray => [...oldArray, userAutocomplete]);
    console.log('onAddUser members ' +  JSON.stringify(members));
  }

  const onRemoveUser  = function (index) {
    console.log('onRemoveUser index ' +  index);
    console.log('onRemoveUser members ' +  JSON.stringify(members));
  }

  return (
    <div className="container">
    <Menu/>
      <h2>Create Project</h2>
      <hr/>
      <div className="modal-body">
        <form onSubmit={onSave}>
        <div className="form-group  form-inline col-md-12">
          <button type="submit" className="btn btn-primary" name="btnDelProject">Save</button>&nbsp;&nbsp;
          <button type="submit" className="btn btn-primary" onClick={onBack} name="btnBack">Back</button>
        </div>
        <div className="form-group  form-inline col-md-12">
          <label htmlFor="inputKey" className="col-sm-2 col-form-label">Project Key:</label>
          <label htmlFor="inputKey" className="col-sm-1 col-form-label">Pr-</label>
          <input type="text"
          value={project.p_key}
          onChange={e => setProject({...project, p_key: e.target.value})}
          className="col-sm-2 form-control" id="inputKey"/>
        </div>

        <div className="form-group form-inline col-md-12">
          <label htmlFor="inputName" className="col-sm-2 col-form-label">Prject Name:</label>
          <input type="text"
          value={project.p_name}
          onChange={e => setProject({...project, p_name: e.target.value})}
          className="col-sm-6 form-control" id="inputName"/>
        </div>

        <div className="form-group  form-inline col-md-12" >
          <label htmlFor="inputStatus" className="col-sm-2 col-form-label">Project Status:</label>
          <label className="col-sm-2 col-form-label">Open</label>
          <label htmlFor="inputType" className="col-sm-2 col-form-label">Project Type:</label>
          <select id="inputType"
              className="col-sm-4 form-control"
              name="projectType"
              value={project.p_type_id}
              onChange={e => setProject({...project, p_type_id: e.target.value})}>
                {
                  projectType.map((obj, key) => (
                        <option value={obj.project_type_id} key={key}>{obj.name}</option>
                  ))
                }

            </select>
        </div>

        <div className="form-group form-inline col-sm-12 col-md-12 col-lg-12" >
          <label htmlFor="inputStartDate" className="col-sm-2 col-form-label">Start Date:</label>
          <div className="col-sm-4">
            <DatePicker
            id="inputStartDate"
            className="form-control"
            name="startDate"
            selected={project.p_startdate}
            onChange={e => setProject({...project, p_startdate: e})}
            dateFormat="MM/dd/yyy"/>
          </div>
          <label htmlFor="inputEndDate" className="col-sm-2 col-form-label">End Date:</label>
          <div className="col-sm-4">
            <DatePicker
            id="inputEndDate"
            className="form-control"
            name="endDate"
            selected={project.p_enddate}
            onChange={e => setProject({...project, p_enddate: e})}
            dateFormat="MM/dd/yyy"/>
          </div>
        </div>

        <div className="form-group  form-inline col-md-12" >
          <label className="col-sm-2 col-form-label">Owner:</label>
          <label className="col-sm-10 col-form-label">{username}</label>
        </div>


        <div htmlFor="inputMember" className="form-group  form-inline col-md-12" >
          <label className="col-sm-2 col-form-label">Members:</label>
          <div className="col-sm-5">
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
          	)}/>
           </div>
           <button type="button" className="btn btn-primary" onClick={onAddUser} name="btnBack">Add User</button>
          <br/>
          <label className="col-form-label">
            {
              members.map((objm, key) => (
              <p key={key}>
                {objm.fullname} <button type="button" onClick={onRemoveUser(members.indexOf(objm))}>remove user</button>
              </p>
            ))
            }
          </label>
        </div>
        <div className="form-group  form-inline col-md-12" >
          <label htmlFor="inputDescription" className="col-sm-2 col-form-label">Description:</label>
          <textarea  type="text" rows="4" cols="50"
          value={project.p_description}
          onChange={e => setProject({...project, p_description: e.target.value})}
          className="col-sm-6 form-control" id="inputDescription"/>
        </div>
      </form>
      </div>
    </div>
  )
}

export default CreateProject;
