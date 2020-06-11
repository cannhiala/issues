import React, {useState, useEffect} from 'react'
import {  useParams } from "react-router-dom"
import { useHistory } from "react-router-dom";
import axios from 'axios'

function ProjectDetail () {

  let history = useHistory();

  let { pId } = useParams();
  const [projectDetail, setProjectDetail] = useState([])
  const [members, setMembers] = useState([])

  useEffect(() => {
     axios.get('http://localhost:3001/projectDetail?pId='+ pId).then(
         (res) => {
           console.log('Get ProjectDetail:',res);
           console.log('ProjectDetail data:',res.data[0]);
           setProjectDetail(res.data);
           console.log('projectDetail data:', projectDetail);
     }).catch((err) => { console.log('Axios Error:', err); })
  }, [pId]);

  useEffect(() => {
     axios.get('http://localhost:3001/members?pId='+ pId).then(
         (res) => {
           console.log('Get Member of project:',res);
           console.log('Member data:',res.data[0]);
           setMembers(res.data);
     }).catch((err) => { console.log('Axios Error:', err); })
  }, []);

  const onEditProject  = function (e) {
    e.preventDefault()
    console.log('hand Estimate');
  }
  const onDelProject  = function (e) {
    e.preventDefault()
    console.log('hand Estimate');
  }
  const onBack  = function (e) {
    e.preventDefault()
    history.push("/projects");
  }

  return (
    <div className="container">
      <div className="modal-header">
        <h1>Project Detail</h1>
      </div>

        {
          projectDetail.map((obj, key) => (
            <div className="modal-body">
              <div className="form-group row">
                <button type="submit" className="btn btn-primary" onClick={onEditProject} name="btnEditProject">Edit Project</button>&nbsp;&nbsp;
                <button type="submit" className="btn btn-primary" onClick={onDelProject} name="btnDelProject">Delete Project</button>&nbsp;&nbsp;
                <button type="submit" className="btn btn-primary" onClick={onBack} name="btnBack">Back</button>
              </div>
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Project Key:</label>
                <label className="col-sm-4 col-form-label">{obj.key}</label>
                <label className="col-sm-2 col-form-label">Progress:</label>
                <label className="col-sm-4 col-form-label">{obj.progress}%</label>
              </div>

              <div className="form-group row" >
                <label className="col-sm-2 col-form-label">Project Name:</label>
                <label className="col-sm-4 col-form-label">{obj.name}</label>
                <label className="col-sm-2 col-form-label">Total Isssue:</label>
                <label className="col-sm-1 col-form-label">{obj.total_issues}</label>
                <a className="col-sm-1 col-form-label" href="/overview">overview</a>
              </div>

              <div className="form-group row" >
                <label className="col-sm-2 col-form-label">Project Status:</label>
                <label className="col-sm-4 col-form-label">{obj.status}</label>
                <label className="col-sm-2 col-form-label">Project Type:</label>
                <label className="col-sm-4 col-form-label">{obj.project_type_name}</label>
              </div>
              <div className="form-group row" >
                <label className="col-sm-2 col-form-label">Start Date:</label>
                <label className="col-sm-4 col-form-label">{obj.start_date}</label>
                <label className="col-sm-2 col-form-label">End Date:</label>
                <label className="col-sm-4 col-form-label">{obj.end_date}</label>
              </div>
              <div className="form-group row" >
                <label className="col-sm-2 col-form-label">Owner:</label>
                <label className="col-sm-10 col-form-label">{obj.owner_fullname}</label>
              </div>


              <div className="form-group row" >
                <label className="col-sm-2 col-form-label">Members:</label>
                <label className="col-sm-10 col-form-label">
                  {
                    members.map((objm, key) => (
                    <a href="#"> {objm.fullname} </a>
                  ))
                  }
                </label>
              </div>
              <div className="form-group row" >
                <label className="col-sm-2 col-form-label">Description:</label>
                <label className="col-sm-10 col-form-label">{obj.description}</label>
              </div>
            </div>
            ))
          }
    </div>
  )
}

export default ProjectDetail;
