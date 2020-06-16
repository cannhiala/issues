import React, {useState, useEffect} from 'react'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { useHistory } from "react-router-dom"
import './CreateProject_Style.css'
import axios from 'axios'
import Menu from './Menu'
import Moment from 'moment'

function CreateProject () {

  let history = useHistory();

  //get user infor from session(context)
  let userid = 1;
  let username = 'Tang Van Can';
  const [user, setUser] = useState([])
  const [projectType, setProjectType] = useState([])
  const [userAutocomplete, setUserAutocomplete] = useState({userid: 0, fullname: 0})
  const [project, setProject] = useState({p_key: '001', p_name: '', p_description: '', p_status: 'Open', p_type_id: 1, p_total_issues: 0, p_progress: 0, p_startdate: '', p_enddate: ''})
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
    e.preventDefault()
    if (project.p_key.trim() === '') {
        alert('Please input project key !');
        return false;
    } else {
       //onCheckProjectKey();
    }

    if ( project.p_name.trim() === '') {
        alert('Please input project name !');
        return false;
    }

     axios.post('http://localhost:3001/addUser', {project: {
                                                     p_key: 'Pr-'+ project.p_key,
                                                     p_name: project.p_name,
                                                     p_description: project.p_description,
                                                     p_status: project.p_status,
                                                     p_type_id: project.p_type_id,
                                                     p_total_issues: 0,
                                                     p_progress: 0,
                                                     p_startdate: Moment(project.p_startdate).format('YYYY-MM-DD'),
                                                     p_enddate: Moment(project.p_enddate).format('YYYY-MM-DD')},
                                                  members: members,
                                                  owner: userid}).then(
          (res) => {
            console.log('Axios:',res);
            console.log('Axios data:',res.data);
            history.push("/projects/isucces/");
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
    let isUserExists = false
    e.preventDefault()
    console.log("===============" + JSON.stringify(userAutocomplete));
    if (userAutocomplete.userid === 0) {
      alert('Please choose new user !')
      return false
    } else {
      let isUserExists = members.map(function(e) { return e.userid; }).indexOf(userAutocomplete.userid)
      if (isUserExists !== -1) {
        alert('User already exists. Please choose another user !')
        return false
      } else { setMembers(oldArray => [...oldArray, userAutocomplete]) }
    }
  }

  const onRemoveUser  = function (e, userId) {
    const newMembers = members.filter(user => user.userid !== userId);
    setMembers(newMembers)
  }

  return (
    <div>
      <h2>Create Project</h2>
      <hr/>
      <div className="modal-body">
        <form onSubmit={onSave}>
        <div className="form-group row text-right">
          <button type="submit" className="btn btn-primary" name="btnDelProject">Save</button>&nbsp;&nbsp;
          <button type="submit" className="btn btn-primary" onClick={onBack} name="btnBack">Back</button>
        </div>

        <div className="form-group row">
          <div className="col-xs-2"/>
          <div className="col-xs-2">
            <label htmlFor="inputKey" className="col-form-label">Project Key:</label>
          </div>
          <div>
            <label htmlFor="inputKey" className="col-prefix col-form-label">Pr-</label>
          </div>
          <div className="col-xs-3">
            <input type="text"
            value={project.p_key}
            onChange={pKey => setProject({...project, p_key: pKey.target.value})}
            className="form-control" id="inputKey"/>
          </div>
        </div>

        <div className="form-group row">
          <div className="col-xs-2"/>
          <div className="col-xs-2">
            <label htmlFor="inputName" className="col-form-label">Prject Name:</label>
          </div>
          <div className="col-xs-3">
            <input type="text"
            value={project.p_name}
            onChange={pName => setProject({...project, p_name: pName.target.value})}
            className="col-sm-10 col-lg-10 form-control" id="inputName"/>
          </div>
        </div>

      <fieldset className="form-group redo-fieldset ">
        <legend className="reset-this redo-legend">General</legend>
        <div className="form-group row" >
          <div className="col-xs-2">
            <label htmlFor="inputStatus" className="col-form-label">Project Status:</label>
          </div>
          <div className="col-xs-3">
            <label className="col-form-label">Open</label>
          </div>
          <div className="col-xs-2">
            <label htmlFor="inputType" className="col-form-label">Project Type:</label>
          </div>
          <div className="col-xs-3">
            <select id="inputType"
                className="form-control"
                name="projectType"
                value={project.p_type_id}
                onChange={pType => setProject({...project, p_type_id: pType.target.value})}>
                  {
                    projectType.map((projectType, key) => (
                          <option value={projectType.project_type_id} key={key}>{projectType.name}</option>
                    ))
                  }

              </select>
          </div>
        </div>

        <div className="form-group row" >
          <div className="col-xs-2">
            <label htmlFor="inputStartDate" className="col-form-label">Start Date:</label>
          </div>
          <div className="col-xs-3">
              <DatePicker
              id="inputStartDate"
              name={Moment}
              className="form-control"
              name="startDate"
              selected={project.p_startdate}
              onChange={startdate => setProject({...project, p_startdate: startdate})}
              dateFormat="MM/dd/yyyy"/>
          </div>
          <div className="col-xs-2">
            <label htmlFor="inputEndDate" className="col-enddate col-form-label">End Date:</label>
          </div>
          <div className="col-xs-3">
              <DatePicker
              id="inputEndDate"
              className="form-control"
              name="endDate"
              selected={project.p_enddate}
              onChange={enddate => setProject({...project, p_enddate: enddate})}
              dateFormat="MM/dd/yyy"/>
          </div>
        </div>
      </fieldset>

      <fieldset className="form-group redo-fieldset ">
        <legend className="reset-this redo-legend">Members</legend>
        <div className="form-group row" >
          <div className="col-xs-2">
            <label className="col-form-label">Owner:</label>
          </div>
          <div className="col-xs-3">
            <label className="col-form-label">{username}</label>
          </div>
        </div>

        <div className="form-group row" >
          <div className="col-xs-2">
            <label className="col-form-label">Members:</label>
          </div>
          <div className="col-xs-4">
            <Autocomplete className="pding"
            	id="combo-box-demo"
            	options={user}
              freeSolo
              onChange={(event, newUser) => {
                if (null !== newUser)
                  setUserAutocomplete({userid: newUser.user_id, fullname: newUser.fullname})
              }}
            	getOptionLabel={user => user.fullname}
            	renderInput={params => (
            		<TextField {...params} className="form-control" label="input user" variant="outlined" fullWidth />
            	)}/>
          </div>
          <div className="col-xs-1">
           <button type="button" className="btn btn-primary" onClick={onAddUser} name="btnBack">Add User</button>
          </div>
        </div>
        <div className="form-group row" >
            {
              members.map((user, key) => (
              <div className="col-xs-3" key={key}>
                {user.fullname} <button type="button" onClick={(e)=> onRemoveUser(e, user.userid)}>-</button>
              </div>
            ))
            }
        </div>
        </fieldset>
      <fieldset className="form-group redo-fieldset ">
        <legend className="reset-this redo-legend">Description</legend>
        <div className="form-group row" >
          <div className="col-xs-12">
            <textarea  type="text" rows="4" cols="50"
            value={project.p_description}
            onChange={description => setProject({...project, p_description: description.target.value})}
            className="form-control" id="inputDescription"/>
          </div>
        </div>
      </fieldset>
      </form>
      </div>
    </div>
  )
}

export default CreateProject;
