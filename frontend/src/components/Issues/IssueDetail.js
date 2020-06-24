import React, {useState, useEffect} from 'react'
import {  useParams } from "react-router-dom"
import { useHistory } from "react-router-dom"
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import { getUser } from './../../utils/Common'

function IssueDetail () {

  // let userid = getUser().userId
  // let history = useHistory()
  let issueId = 1
  //let overviewLink = "/pOverview/" + pId
  const [userAutocomplete, setUserAutocomplete] = useState({userid: 0, fullname: 0})
  const [issueDetail, setIssueDetail] = useState({p_Name: '', i_TypeName:'', i_Key:'', i_Id: 0, i_DueDate: '', i_Status: '', i_Color: '', i_Title: '', i_CreateByName: '', i_CreateByTime: '', i_Description: '', i_Phase: '', i_ParentTask: '', i_Assign: '', i_Priority: '', i_StartDate: '', i_EstimateHour: ''})
  const [subIssues, setSubIssues] = useState([])
  const [showDelConfirmPopup, setShowDelConfirmPopup] = useState(false)
  //const [members, setMembers] = useState([])
  //const [showDelConfirmPopup, setShowDelConfirmPopup] = useState(false)

  useEffect(() => {
     axios.get('http://localhost:3001/getIssueById?issueId='+ issueId).then(
         (res) => {
           if (res.status === 200) {
             if (res.data.length > 0) {
               setIssueDetail({p_Name: res.data[0][0].projectsname,
               i_TypeName: res.data[0][0].issuetypename,
               i_Key: res.data[0][0].key,
               i_Id: res.data[0][0].issue_id,
               i_DueDate: res.data[0][0].duedate,
               i_Status: res.data[0][0].status,
               i_Color: res.data[0][0].color,
               i_Title: res.data[0][0].name,
               i_CreateByName: res.data[0][0].createby,
               i_CreateByTime: res.data[0][0].create_on,
               i_Description: res.data[0][0].description,
               i_Phase: res.data[0][0].phase,
               i_ParentTask: res.data[0][0].parent_name,
               i_Assign: res.data[0][0].assignee,
               i_Priority: res.data[0][0].priority,
               i_StartDate: res.data[0][0].startdate,
               i_EstimateHour: res.data[0][0].estimated_hours})
             }
           } else {
             const error = new Error(res.error)
             console.log('Get Issue Detail Error:', error)
           }
     }).catch((err) => { console.log('Axios Error:', err) })
  }, [issueId])

  useEffect(() => {
     axios.get('http://localhost:3001/getSubIssues?parentId='+ issueId).then(
         (res) => {
           if (res.status === 200) {
             if (res.data.length > 0) {
               console.log('=====:', JSON.stringify(res.data))
               console.log('=====:', res.data[0])
               setSubIssues(res.data[0])
             }
           } else {
             const error = new Error(res.error)
             console.log('Get Issue Detail Error:', error)
           }
     }).catch((err) => { console.log('Axios Error:', err) })
  }, [subIssues])

  const onDelConfirmPopup  = function (e) {
    setShowDelConfirmPopup(true)
  }

  const onDelConfirmClose = () => setShowDelConfirmPopup(false)

  const onBack  = function (e) {
    e.preventDefault()
    // history.push("/projects")
  }

  return (
    <div id="container" className="fixed-header sidebar-closed">
        <div id="content">
            <div className="container">
                <div className="popup-message">
                  <Modal show={showDelConfirmPopup} onHide={onDelConfirmClose} animation={false}>
                    <Modal.Header closeButton>
                      <Modal.Title>Confirm</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Do you want to delete this issues !</Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={onBack}>
                          Yes
                        </Button>
                        <Button variant="primary" onClick={onDelConfirmClose}>
                          No
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </div>
                <div className="row text-right">
                  <a href="#" >Back to list</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <a href="#" >Previous issues</a>&nbsp;|&nbsp;<a href="#" >Next issues</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </div>
                <div className="crumbs">
                    <ul className="breadcrumb"><b>Project: {issueDetail.p_Name}</b></ul>
                </div>
                <div className="row">
                    <div className="col-sm-3 col-md-3 col-lg-3">
                      <strong>{issueDetail.i_TypeName} : {issueDetail.i_Key}</strong>
                    </div>
                    <div className="row text-right">
                      <label className="col-form-label text-danger">Due Date {issueDetail.i_DueDate}</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <strong style={{minWidth: "125px", display: "inline-block",
                                      padding: "1px 8px", backgroundColor: issueDetail.i_Color,
                                      textAlign: "center", whiteSpace: "nowrap",
                                      borderRadius: "20px", marginTop: "3px"}}>{issueDetail.i_Status}</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6 col-md-6 col-lg-6">
                        <h3><strong>{issueDetail.i_Title} </strong></h3>
                    </div>
                    <div className="text-right">
                      <button type="submit" className="btn btn-primary" onClick={onBack} name="btnDelProject">Edit Issue</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <button type="submit" className="btn btn-primary" onClick={onBack} name="btnDelProject">Create SubIssue</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </div>
                </div>
                <fieldset className="redo-fieldset ">
                  <div className="row">
                    <div className="col-sm-6 col-md-6 col-lg-6">
                      <label className="col-sm-3 col-form-label text-right">Created by:</label>
                      <div className="col-sm-9">
                        <label className="col-form-label">{issueDetail.i_CreateByName}</label><br/><small><i>At {issueDetail.i_CreateByTime}</i></small>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6 col-md-6 col-lg-6">
                      <label className="col-sm-3 col-form-label text-right">Description:</label>
                      <label className="col-sm-9 col-form-label">{issueDetail.i_Description}</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6 col-md-6 col-lg-6">
                      <label className="col-sm-3 col-form-label text-right">Phase:</label>
                      <label className="col-sm-9 col-form-label">{issueDetail.i_Phase}</label>
                    </div>
                    <div className="col-sm-6 col-md-6 col-lg-6">
                      <label className="col-sm-3 col-form-label text-right">Parent Task:</label>
                      <label className="col-sm-9 col-form-label">{issueDetail.i_ParentTask}</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6 col-md-6 col-lg-6">
                      <label className="col-sm-3 col-form-label text-right">Assign:</label>
                      <a href="#" className="col-sm-9">{issueDetail.i_Assign}</a>
                    </div>
                    <div className="col-sm-6 col-md-6 col-lg-6">
                      <label className="col-sm-3 col-form-label text-right">Priority:</label>
                      <label className="col-sm-9 col-form-label">{issueDetail.i_Priority}</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6 col-md-6 col-lg-6">
                      <label className="col-sm-3 col-form-label text-right">Start Date:</label>
                      <label className="col-sm-9 col-form-label">{issueDetail.i_StartDate}</label>
                    </div>
                    <div className="col-sm-6 col-md-6 col-lg-6">
                      <label className="col-sm-3 col-form-label text-right">Estimate(h):</label>
                      <label className="col-sm-9 col-form-label">{issueDetail.i_EstimateHour}</label>
                    </div>
                  </div>
                </fieldset>
                <fieldset className="redo-fieldset ">
                  <legend className="reset-this redo-legend">Attachments</legend>
                </fieldset>
                <fieldset className="redo-fieldset ">
                  <legend className="reset-this redo-legend">Sub Issues</legend>
                  <strong>{issueDetail.i_TypeName} : {issueDetail.i_Key}</strong>
                  <ol>
                    {
                      subIssues.map((subIssue, key2) => (
                      <li key={key2}><a href="#">  {subIssue.key} {subIssue.name} </a></li>
                    ))
                    }
                  </ol>
                </fieldset>
                <fieldset className="redo-fieldset ">
                  <legend className="reset-this redo-legend">Comments</legend>
                </fieldset>
                <br/>
                <div className="row">
                    <div className="col-sm-6 col-md-6 col-lg-6">
                      <button type="submit" className="btn" onClick={onDelConfirmPopup} name="btnDelProject">Delete Issue</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </div>
                    <div className="text-right">
                      <button type="submit" className="btn btn-primary" onClick={onBack} name="btnDelProject">Edit Issue</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <button type="submit" className="btn btn-primary" onClick={onBack} name="btnDelProject">Create SubIssue</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </div>
                </div>
              </div>
        </div>
    </div>
  )
}

export default IssueDetail
