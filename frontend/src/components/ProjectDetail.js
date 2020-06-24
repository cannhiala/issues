import React, {useState, useEffect} from 'react'
import {  useParams } from "react-router-dom"
import { useHistory } from "react-router-dom"
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import { getUser } from './../utils/Common'

function ProjectDetail () {
  const url = 'http://localhost:3001/'
  const userid = getUser().userId
  const history = useHistory()
  const { pId } = useParams()
  let overviewLink = "/pOverview/" + pId
  const [projectDetail, setProjectDetail] = useState([])
  const [members, setMembers] = useState([])
  const [showDelConfirmPopup, setShowDelConfirmPopup] = useState(false)

  useEffect(() => {
     axios.get(url + 'projectDetail?pId='+ pId).then(
         (res) => {
           setProjectDetail(res.data)
     }).catch((err) => { console.log('Axios Error:', err) })
  }, [pId])

  useEffect(() => {
     axios.get(url + 'members?pId='+ pId).then(
         (res) => {
           setMembers(res.data)
     }).catch((err) => { console.log('Axios Error:', err) })
  }, [])

  const onEditProject  = function (e) {
    e.preventDefault()
    history.push("/pEdit/"+pId)
  }
  const onDelConfirmPopup  = function (e) {
    setShowDelConfirmPopup(true)
    //history.push("/projects/dsucces/")
  }

  const onDelProject  = function (e) {
    axios.put(url + 'delProject', {pId}).then(
          (res) => {
            if(res.status === 200) {
                // console.log('DELETE PROJECT success:',res.data)
                history.push("/projects/dsucces/"+pId)
            } else {
              console.log(res.error)
            }
      }).catch((err) => { console.log('DELETE PROJECT Error:', err) })
      setShowDelConfirmPopup(false)
  }
  const onDelConfirmClose = () => setShowDelConfirmPopup(false)

  const onBack  = function (e) {
    e.preventDefault()
    history.push("/projects")
  }

  return (
    <div id="container" className="fixed-header sidebar-closed">
        <div id="content">
            <div className="container">
                <div className="crumbs">
                    <ul className="breadcrumb"><b>Project Detail</b></ul>
                </div>
                <br /><br />
                <div className="popup-message">
                  <Modal show={showDelConfirmPopup} onHide={onDelConfirmClose} animation={false}>
                    <Modal.Header closeButton>
                      <Modal.Title>Confirm</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Do you want to delete this project !</Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={onDelProject}>
                          Yes
                        </Button>
                        <Button variant="primary" onClick={onDelConfirmClose}>
                          No
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </div>
                {
                  projectDetail.map((pDetail, key) => (
                    <div className="modal-body" key={key}>
                      <div className="form-group row">
                        { userid === pDetail.user_id ? (
                        <button type="submit" className="btn btn-primary" onClick={onEditProject} name="btnEditProject">Edit Project</button>
                        ):(<></>)}
                        &nbsp;&nbsp;
                        { userid === pDetail.user_id ? (
                          <button type="submit" className="btn btn-primary" onClick={onDelConfirmPopup} name="btnDelProject">Delete Project</button>
                        ):(<></>)}
                        &nbsp;&nbsp;<button type="submit" className="btn btn-primary" onClick={onBack} name="btnBack">Back</button>
                      </div>
                      <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Project Key:</label>
                        <label className="col-sm-4 col-form-label">{pDetail.key}</label>
                        <label className="col-sm-2 col-form-label">Progress:</label>
                        <label className="col-sm-4 col-form-label">{pDetail.progress}%</label>
                      </div>

                      <div className="form-group row" >
                        <label className="col-sm-2 col-form-label">Project Name:</label>
                        <label className="col-sm-4 col-form-label">{pDetail.name}</label>
                        <label className="col-sm-2 col-form-label">Total Isssue:</label>
                        <label className="col-sm-1 col-form-label">{pDetail.total_issues}</label>
                        <a className="col-sm-1 col-form-label" href={overviewLink} >overview</a>
                      </div>

                      <div className="form-group row" >
                        <label className="col-sm-2 col-form-label">Project Status:</label>
                        <label className="col-sm-4 col-form-label">{pDetail.status}</label>
                        <label className="col-sm-2 col-form-label">Project Type:</label>
                        <label className="col-sm-4 col-form-label">{pDetail.project_type_name}</label>
                      </div>
                      <div className="form-group row" >
                        <label className="col-sm-2 col-form-label">Start Date:</label>
                        <label className="col-sm-4 col-form-label">{pDetail.start_date}</label>
                        <label className="col-sm-2 col-form-label">End Date:</label>
                        <label className="col-sm-4 col-form-label">{pDetail.end_date}</label>
                      </div>
                      <div className="form-group row" >
                        <label className="col-sm-2 col-form-label">Owner:</label>
                        <label className="col-sm-10 col-form-label">{pDetail.owner_fullname}</label>
                      </div>


                      <div className="form-group row" >
                        <label className="col-sm-2 col-form-label">Members:</label>
                        <label className="col-sm-10 col-form-label">
                          {
                            members.map((member, key2) => (
                            <a href="#" key={key2}> {member.fullname} </a>
                          ))
                          }
                        </label>
                      </div>
                      <div className="form-group row" >
                        <label className="col-sm-2 col-form-label">Description:</label>
                        <label className="col-sm-10 col-form-label">{pDetail.description}</label>
                      </div>
                    </div>
                    ))
                  }
              </div>
        </div>
    </div>
  )
}

export default ProjectDetail
