import React, { useState, useEffect } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import Moment from 'moment'
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import './../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import DatePicker from 'react-datepicker'
import './../../../node_modules/react-datepicker/dist/react-datepicker.css'
import './../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css'
import { getUser } from './../../utils/Common'

function AddIssue() {

    const initState = {
        userLoginId: getUser() ? getUser().userId : null,
        arrProject:[],
        arrIssueType:[],
        arrIssueStatus: [],
        arrAssignee: [],
        arrPriority: [],
        formInput: {
            iProjectKey: "",
            iIssueType: "1",
            iPhase: "",
            iIssueName: "",
            iDescription: EditorState.createEmpty(),
            iStatus: "1",
            iParentTask: "",
            iStartDate: "",
            iAssignee: "",
            iDueDate: "",
            iPriority: "2",
            iEstimate: ""
        }
    }

    const [arrProject, setProject] = useState(initState.arrProject)
    const [arrIssueType, setIssueType] = useState(initState.arrIssueType)
    const [arrPriority, setPriority] = useState(initState.arrPriority)
    const [arrAssignee, setAssignee] = useState(initState.arrAssignee)
    const [arrIssueStatus, setIssueStatus] = useState(initState.arrIssueStatus)

    const [inputPane, setInputPane] = useState(initState.formInput)

    useEffect(() => {
        if(initState.userLoginId == null)
            return
        
        fetch("http://localhost:3001/issueGetProjectByUser?sUserId=" + initState.userLoginId,
            {
                method: "GET"
            })
            .then(res => res.json())
            .then(
                (result) => {
                    setProject(result[0])
                },
                (error) => {
                    setProject([])
                })

        fetch("http://localhost:3001/issueGetListIssueCategories",
        {
            method: "GET"
        })
        .then(res => res.json())
        .then(
            (result) => {
                setIssueType(result[0])
            },
            (error) => {
                setIssueType([])
            })
        
        fetch("http://localhost:3001/issueGetListPriotities",
        {
            method: "GET"
        })
        .then(res => res.json())
        .then(
            (result) => {
                setPriority(result[0])
            },
            (error) => {
                setPriority([])
            })
        

    }, [initState.userLoginId])

    return (
        <div id="container" className="fixed-header sidebar-closed">
            <div id="content">
                <div className="container">
                    <div className="crumbs">
                        <ul className="breadcrumb"><b>Create Issue </b></ul>
                    </div>
                    <br />
                    <Form className="form-horizontal" onSubmit="">
                        <Row>
                            <Col md={8}>{'\u00A0'}</Col>
                            <Form.Label className="col-md-4 control-label">
                                <Button variant="success" type="Submit">{'\u00A0\u00A0'}Save{'\u00A0\u00A0'}</Button>
                                {'\u00A0\u00A0\u00A0'}
                                <Button variant="primary" type="Submit">{'\u00A0\u00A0'}Save and continue{'\u00A0\u00A0'}</Button>
                                {'\u00A0\u00A0\u00A0'}
                                <Button variant="inverse" type="Submit">{'\u00A0\u00A0'}Back{'\u00A0\u00A0'}</Button>
                            </Form.Label>
                            <Form.Group>
                                <Form.Label className="col-md-1 control-label">Project:</Form.Label>
                                <Col md={2}>
                                    <Form.Control
                                        as="select"
                                        id="iProjectKey"
                                        value={inputPane.iProjectKey}
                                        onChange={e => setInputPane({ ...inputPane, iProjectKey: e.target.value })}
                                    >
                                        <option value=""></option>
                                        {arrProject.map((projectitem, key) => (
                                            <option key={key} value={projectitem.key}>[{projectitem.key}] - {projectitem.name}</option>
                                        ))}
                                    </Form.Control>
                                </Col>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label className="col-md-1 control-label">Issue type:</Form.Label>
                                <Col md={2}>
                                    <Form.Control
                                        as="select"
                                        id="iIssueType"
                                        value={inputPane.iIssueType}
                                        onChange={e => setInputPane({ ...inputPane, iIssueType: e.target.value })}
                                    >
                                        {arrIssueType.map((issuetypeitem, key) => (
                                            <option key={key} value={issuetypeitem.issue_category_id}>{issuetypeitem.name}</option>
                                        ))}
                                    </Form.Control>
                                </Col>
                                <Form.Label className="col-md-4 control-label">Phase:</Form.Label>
                                <Col md={2}>
                                    <Form.Control
                                        as="select"
                                        id="iPhase"
                                        value={inputPane.iPhase}
                                        onChange={e => setInputPane({ ...inputPane, iPhase: e.target.value })}
                                    >
                                        <option value="">All</option>
                                    </Form.Control>
                                </Col>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label className="col-md-1 control-label">Issue name:</Form.Label>
                                <Col md={11}>
                                    <Form.Control
                                        type="text"
                                        id="sIssueName"
                                        value={inputPane.iIssueName}
                                        onChange={e => setInputPane({ ...inputPane, iIssueName: e.target.value })}
                                    />
                                </Col>
                            </Form.Group>
                            <div className="widget box">
                                <div className="widget-content">
                                    <Form.Group>
                                        <Form.Label className="col-md-1 control-label">Description:</Form.Label>
                                        <Col md={11}>
                                            <Editor
                                                wrapperClassName="wrapper-class"
                                                editorClassName="form-control ckeditor-input-class"
                                                toolbarClassName="toolbar-class"
                                                toolbar={{
                                                    inline: { inDropdown: true },
                                                    list: { inDropdown: true },
                                                    textAlign: { inDropdown: true },
                                                    link: { inDropdown: true },
                                                    history: { inDropdown: true },
                                                }}
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label className="col-md-1 control-label">Status:</Form.Label>
                                        <Form.Label style={{ textAlign: "left" }} className="col-md-2 control-label">
                                            <span className="label label-danger">Open</span>
                                        </Form.Label>
                                        <Form.Label className="col-md-4 control-label">Parent task:</Form.Label>
                                        <Col md={2}>

                                        </Col>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label className="col-md-1 control-label">Start date:</Form.Label>
                                        <Col md={2}>
                                            <DatePicker className="form-control" autoComplete="off"
                                                id="iStartDate"
                                                selected={inputPane.iStartDate}
                                                onChange={date => setInputPane({ ...inputPane, iStartDate: date })}
                                            />
                                        </Col>
                                        <Form.Label className="col-md-4 control-label">Assignee:</Form.Label>
                                        <Col md={2}>
                                            <Form.Control
                                                as="select"
                                                id="iAssignee"
                                                value={inputPane.iAssignee}
                                                onChange={e => setInputPane({ ...inputPane, iAssignee: e.target.value })}
                                            >
                                                <option value=""></option>

                                            </Form.Control>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label className="col-md-1 control-label">Due date:</Form.Label>
                                        <Col md={2}>
                                            <DatePicker className="form-control" autoComplete="off"
                                                id="iDueDate"
                                                selected={inputPane.iDueDate}
                                                onChange={date => setInputPane({ ...inputPane, iDueDate: date })}
                                            />
                                        </Col>
                                        <Form.Label className="col-md-4 control-label">Priority:</Form.Label>
                                        <Col md={2}>
                                            <Form.Control
                                                as="select"
                                                id="iPriority"
                                                value={inputPane.iPriority}
                                                onChange={e => setInputPane({ ...inputPane, iPriority: e.target.value })}
                                            >
                                                {arrPriority.map((priorityitem, key) => (
                                                        <option key={key} value={priorityitem.priority_id}>{priorityitem.name}</option>
                                                    ))}
                                            </Form.Control>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label className="col-md-1 control-label">Estimate(h):</Form.Label>
                                        <Col md={1}>
                                            <Form.Control
                                                type="text"
                                                id="iEstimate"
                                                value={inputPane.iEstimate}
                                                onChange={e => setInputPane({ ...inputPane, iEstimate: e.target.value })}
                                            />
                                        </Col>
                                        <Col md={3}>
                                            <span style={{ paddingTop: "5px", display: "inline-block", color: "red", fontSize: "small" }}>
                                                Suggest estimate this task, click here
                                            </span>
                                        </Col>
                                    </Form.Group>
                                </div>
                            </div>

                            <Col md={8}>{'\u00A0'}</Col>
                            <Form.Label className="col-md-4 control-label">
                                <Button variant="success" type="Submit">{'\u00A0\u00A0'}Save{'\u00A0\u00A0'}</Button>
                                {'\u00A0\u00A0\u00A0'}
                                <Button variant="primary" type="Submit">{'\u00A0\u00A0'}Save and continue{'\u00A0\u00A0'}</Button>
                                {'\u00A0\u00A0\u00A0'}
                                <Button variant="inverse" type="Submit">{'\u00A0\u00A0'}Back{'\u00A0\u00A0'}</Button>
                            </Form.Label>
                        </Row>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default AddIssue;