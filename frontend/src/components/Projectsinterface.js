import React, {useState, useEffect} from 'react'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import axios from 'axios'

function Userinterface () {
  const [projects, setProjects] = useState([])
  const [projectStatus, setProjectStatus] = useState([])
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  useEffect(() => {
     axios.get('http://localhost:3001/projects').then(
         (res) => {
           console.log('Estimate response:',res);
           console.log('Estimate data:',res.data);
           setProjects(res.data)
     }).catch((err) => { console.log('Axios Error:', err); })
  }, []);

  useEffect(() => {
     axios.get('http://localhost:3001/projectStatus').then(
         (res) => {
           console.log('Estimate response:',res);
           console.log('Estimate data:',res.data);
           setProjectStatus(res.data)
     }).catch((err) => { console.log('Axios Error:', err); })
  }, []);

  useEffect(() => {
     axios.get('http://localhost:3001/projectStatus').then(
         (res) => {
           console.log('Estimate response:',res);
           console.log('Estimate data:',res.data);
           setProjectStatus(res.data)
     }).catch((err) => { console.log('Axios Error:', err); })
  }, []);


  return (
    <div className="container">
    <div className="modal-header">
      <h1>Projects</h1>
    </div>
    <div className="modal-body">
      <form>
        <div className="form-group row">
          <label htmlFor="inputKey" className="col-sm-2 col-form-label">Project Key</label>
          <input type="email" className="col-sm-2 form-control" id="inputKey"/>
          <label htmlFor="inputName" className="col-sm-2 col-form-label">Prject Name</label>
          <input type="email" className="col-sm-6 form-control" id="inputName"/>
        </div>
        <div className="form-group row">
          <label htmlFor="inputStatus" className="col-sm-2 col-form-label">Project Status</label>
          <select id="inputStatus"
              className="col-sm-2 form-control"
              name="projectStatus"
              defaultValue={'ALL'}
              >
        				<option value="ALL">ALL</option>
                {
                  projectStatus.map((obj, key) => (
        				        <option value={obj.project_type_id} Key={key}>{obj.name}</option>
                  ))
                }

        		</select>
          <label htmlFor="inputStatus" className="col-sm-2 col-form-label">Owner</label>
          <input type="text" className="col-sm-2 form-control" id="inputStatus"/>
        </div>
        <div className="form-group row">
          <label htmlFor="inputStartDateFrom" className="col-sm-2 col-form-label">Start Date</label>
          <div className="col-sm-3">
            <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
          </div>
          <label htmlFor="inputStartDateTo" className="col-sm-1 col-form-label">~</label>
          <div className="col-sm-3">
            <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputEndDateFrom" className="col-sm-2 col-form-label">End Date</label>
          <div className="col-sm-3">
            <DatePicker selected={endDate} onChange={date => setStartDate(date)} />
          </div>
          <label htmlFor="inputEndDateTo" className="col-sm-1 col-form-label">~</label>
          <div className="col-sm-3">
            <DatePicker selected={endDate} onChange={date => setStartDate(date)} />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Search</button>
        </form>
      </div>
        <table id="projects" className="table">
          <thead  className="btn-primary">
            <tr>
              <th>Action</th>
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
    </div>
  )
}

export default Userinterface;
