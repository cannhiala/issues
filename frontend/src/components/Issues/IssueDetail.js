import React, {useState, useEffect} from 'react'
import { NavLink, useHistory, useParams } from "react-router-dom"
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import { getUser } from './../../utils/Common'

function IssueDetail () {

  // let userid = getUser().userId
  // let history = useHistory()
  const url = 'http://localhost:3001/'
  let { issueId } = useParams()
  const userid = getUser().userId
  const history = useHistory()
  const [userAutocomplete, setUserAutocomplete] = useState({userid: 0, fullname: 0})
  const [issueDetail, setIssueDetail] = useState({p_Name: '', i_TypeId:'', i_TypeName:'', i_Key:'', i_Id: 0, i_DueDate: '', i_Status: '', i_Color: '', i_Title: '', i_CreateByName: '', i_CreateByTime: '', i_Description: '', i_Phase: '', i_ParentTask: '', i_Assign: '', i_Priority: '', i_StartDate: '', i_EstimateHour: ''})
  const [inputComment, setInputComment] = useState({issue_id: issueId, user_id: userid, comments: ''})
  const [issueNextIssue, setIssueNextIssue] = useState({n_id: '', n_key: '', n_name: ''})
  const [issuePreviousIssue, setIssuePreviousIssue] = useState({p_id: '', p_key: '', p_name:''})
  const [subIssues, setSubIssues] = useState([])
  const [issueComments, setIssueComments] = useState([])
  const [showDelConfirmPopup, setShowDelConfirmPopup] = useState(false)
  const [state, setState] = useState(false)

  useEffect(() => {
     axios.get(url + 'getIssueById?issueId='+ issueId).then(
         (res) => {
           if (res.status === 200) {
             if (res.data.length > 0) {
               setIssueDetail({p_Name: res.data[0][0].projectsname,
               i_TypeId: res.data[0][0].issue_category_id,
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
     axios.get(url + 'getSubIssues?parentId='+ issueId).then(
         (res) => {
           if (res.status === 200) {
             if (res.data.length > 0) {
               setSubIssues(res.data[0])
             }
           } else {
             const error = new Error(res.error)
             console.log('Get Issue Detail Error:', error)
           }
     }).catch((err) => { console.log('Axios Error:', err) })
  }, [issueId])

  useEffect(() => {
     axios.get(url + 'getPreviousIssue?issueId='+ issueId).then(
         (res) => {
           if (res.status === 200) {
             if (res.data.length > 0) {
               setIssuePreviousIssue({p_id: res.data[0][0].issue_id, p_key: res.data[0][0].key, p_name: res.data[0][0].name})
             }
           } else {
             console.log('Get Previous Issue Error:', res.error)
           }
     }).catch((err) => { console.log('Axios Error:', err) })
  }, [issueId])

  useEffect(() => {
     axios.get(url + 'getNextIssue?issueId='+ issueId).then(
         (res) => {
           if (res.status === 200) {
             if (res.data.length > 0) {
               setIssueNextIssue({n_id: res.data[0][0].issue_id, n_key: res.data[0][0].key, n_name: res.data[0][0].name})
             }
           } else {
             console.log('Get Next Issue Error:', res.error)
           }
     }).catch((err) => { console.log('Axios Error:', err) })
  }, [issueId])

  useEffect(() => {
     axios.get(url + 'getIssueCommentsById?issueId='+ issueId).then(
         (res) => {
           if (res.status === 200) {
             if (res.data.length > 0) {
               setIssueComments(res.data[0])
             }
           } else {
             const error = new Error(res.error)
             console.log('Get Issue Comments Error:', error)
           }
     }).catch((err) => { console.log('Axios Error:', err) })
  }, [state, issueId])

  const onPostComment = function (e) {
      e.preventDefault()
      axios.post(url + 'insertComment', inputComment).then(
            (res) => {
            if (res.status === 200) {
                  setState(true)
             } else if (res.status === 202) {

             } else {
              console.log('INSERT Comment eror: ', res.error)
            }
        }).catch((err) => { console.log('Axios Error:', err) })
    }

  const onDelConfirmPopup  = function (e) {
    setShowDelConfirmPopup(true)
  }

  const onDelIssue  = function (e) {
    e.preventDefault()
    axios.put(url + 'delIssue', {issueId}).then(
          (res) => {
            if(res.status === 200) {
                history.push("/issues/dsuccess/" + issueDetail.i_Key)
            } else {
                console.log('DELETE Issue Error:', res.error)
            }
      }).catch((err) => { console.log('DELETE Issue Error:', err) })
      setShowDelConfirmPopup(false)
  }

  const onDelConfirmClose = () => setShowDelConfirmPopup(false)

  const createNewIssue = function (e) {
      e.preventDefault()
      history.push("/addissue/")
  }

  const editIssue  = function (e) {
    e.preventDefault()
    history.push("/editIssue/"+issueDetail.i_Key)
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
                      <Button variant="secondary" onClick={onDelIssue}>
                          Yes
                        </Button>
                        <Button variant="primary" onClick={onDelConfirmClose}>
                          No
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </div>
                <div className="row text-right">
                  <NavLink exact to={'/issues'}>Back to list</NavLink>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  { issuePreviousIssue.p_id !== '' && issuePreviousIssue.p_id !== null ? (
                      <NavLink exact to={'/issueDetail/'+ issuePreviousIssue.p_id}> {issuePreviousIssue.p_key} - {issuePreviousIssue.p_name} </NavLink>
                  ):(<></>)}
                  &nbsp;|&nbsp;
                  { issueNextIssue.n_id !== '' && issueNextIssue.n_id !== null ? (
                    <NavLink exact to={'/issueDetail/'+ issueNextIssue.n_id}> {issueNextIssue.n_key} - {issueNextIssue.n_name} </NavLink>
                  ):(<></>)}
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </div>
                <div className="crumbs">
                    <ul className="breadcrumb"><b>Project: {issueDetail.p_Name}</b></ul>
                </div>
                <div className="row">
                    <div className="col-sm-3 col-md-3 col-lg-3">
                      <strong><span className={"pill pill-" + issueDetail.i_TypeId}>{issueDetail.i_TypeName}</span> : {issueDetail.i_Key}</strong>
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
                      <button type="submit" className="btn btn-primary" onClick={editIssue} name="btnDelProject">Edit Issue</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <button type="submit" className="btn btn-primary" onClick={createNewIssue} name="btnDelProject">Create SubIssue</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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
                      <li key={key2}><NavLink exact to={'/issueDetail/'+ subIssue.issue_id}>  {subIssue.key} {subIssue.name} </NavLink></li>
                    ))
                    }
                  </ol>
                </fieldset>
                <fieldset className="redo-fieldset ">
                  <legend className="reset-this redo-legend">Comments</legend>
                    {
                      issueComments.map((comment, key) => (
                      <div key={key}>
                          <div className="row">
                              <div className="col-sm-10 col-md-10 col-lg-10">
                                <a href="#">{comment.username}</a> <small><i>At {comment.create_on}</i></small>
                              </div>
                              <div className="col-sm-1 col-md-1 col-lg-1">
                                "Quote
                              </div>
                          </div>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>{comment.comments} </strong> <br/>
                      </div>
                    ))
                    }

                    <br/><br/>
                    <div className="text-right">
                      <button type="submit" className="btn btn-primary" onClick={onPostComment} name="btnPostComment">Post</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </div>
                    <br/>
                    <div className="col-sm-12 col-md-12 col-lg-12">
                      <textarea  type="text" rows="4" cols="50"
                      value={inputComment.comments}
                      onChange={comment => setInputComment({...inputComment, comments: comment.target.value})}
                      className="form-control" id="inputComment"/>
                    </div>
                </fieldset>
                <br/>
                <div className="row">
                    <div className="col-sm-6 col-md-6 col-lg-6">
                      <button type="submit" className="btn" onClick={onDelConfirmPopup} name="btnDelProject">Delete Issue</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </div>
                    <div className="text-right">
                      <button type="submit" className="btn btn-primary" onClick={editIssue} name="btnDelProject">Edit Issue</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <button type="submit" className="btn btn-primary" onClick={createNewIssue} name="btnDelProject">Create SubIssue</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </div>
                </div>
              </div>
        </div>
    </div>
  )
}

export default IssueDetail
