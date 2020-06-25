import React, { useState, useEffect, useCallback } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import Moment from 'moment'
import { EditorState, ContentState, convertFromRaw, convertToRaw } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import { AsyncTypeahead } from 'react-bootstrap-typeahead'
import DatePicker from 'react-datepicker'
import { getUser } from './../../utils/Common'
import { useHistory, useParams } from 'react-router-dom'
import './../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import './../../../node_modules/react-datepicker/dist/react-datepicker.css'
import './../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css'


function AddIssue() {
    let history = useHistory()
    let { pissueKey } = useParams()

    const initState = {
        apiUrl: "http://localhost:3001",
        userLoginId: getUser() ? getUser().userId : null,
        arrProject: [],
        arrIssueType: [],
        arrPhase: [],
        arrIssueStatus: [],
        arrAssignee: [],
        arrPriority: [],
        arrParentTask: [],
        formInput: {
            iProjectKey: "",
            iIssueType: "1",
            iPhase: "",
            iIssueKey: "",
            iIssueName: "",
            iDescription: EditorState.createEmpty(),
            iDescriptionRaw: "",
            iStatus: "1",
            iParentTask: "",
            iStartDate: "",
            iAssignee: "",
            iDueDate: "",
            iPriority: "2",
            iEstimate: ""
        },
        formValidate: {
            iProjectKeyErr: "",
            iIssueNameErr: "",
            iEstimateErr: ""
        }
    }

    const [isParentTaskLoading, setIsParentTaskLoading] = useState(false);
    const [arrProject, setProject] = useState(initState.arrProject)
    const [arrIssueType, setIssueType] = useState(initState.arrIssueType)
    const [arrPriority, setPriority] = useState(initState.arrPriority)
    const [arrAssignee, setAssignee] = useState(initState.arrAssignee)
    const [arrPhase, setPhase] = useState(initState.arrPhase)
    const [arrParentTask, setParentTask] = useState(initState.arrParentTask)
    const [arrIssueStatus, setIssueStatus] = useState(initState.arrIssueStatus)

    const [inputPane, setInputPane] = useState(initState.formInput)
    const [valid, setValid] = useState(true)
    const [validatePane, setValidatePane] = useState(initState.formValidate)

    const [editForm, setEditForm] = useState(false)

    useEffect(() => {
        if (initState.userLoginId == null)
            return

        if (typeof (pissueKey) !== "undefined" && pissueKey !== "") {
            setEditForm(true)

            fetch(initState.apiUrl + "/issueGetListStatuses",
                {
                    method: "GET"
                })
                .then(res => res.json())
                .then(
                    (result) => {
                        setIssueStatus(result[0])
                    },
                    (error) => {
                        setIssueStatus([])
                    })

            fetch(initState.apiUrl + "/issueGetIssueByKey?sIssueKey="
                + pissueKey
                + "&sUserId=" + initState.userLoginId,
                {
                    method: "GET"
                })
                .then(res => res.json())
                .then(
                    (result) => {
                        const issueData = result[0]
                        issueData.map((data) => {

                            fetch(initState.apiUrl + "/issueGetListPhaseByProjectKey?sProjectKey=" + data.project_key,
                                {
                                    method: "GET"
                                })
                                .then(res => res.json())
                                .then(
                                    (result) => {
                                        setPhase(result[0])
                                    },
                                    (error) => {
                                        setPhase([])
                                    })

                            fetch(initState.apiUrl + "/issueGetProjectUserAssign?sProjectKey=" + data.project_key,
                                {
                                    method: "GET"
                                })
                                .then(res => res.json())
                                .then(
                                    (result) => {
                                        setAssignee(result[0])
                                    },
                                    (error) => {
                                        setAssignee([])
                                    })

                            setInputPane({
                                ...inputPane,
                                iProjectKey: data.project_key,
                                iIssueType: data.issue_category_id,
                                iPhase: data.projec_type_id,
                                iIssueKey: data.key,
                                iIssueName: data.name,
                                iDescription: data.description ?
                                    EditorState.createWithContent(convertFromRaw(JSON.parse(data.description))) :
                                    EditorState.createEmpty(),
                                iDescriptionRaw: data.description,
                                iStatus: data.issue_status_id,
                                iParentTask: data.parent_id,
                                iStartDate: data.startdate ? (new Date(data.startdate)) : "",
                                iAssignee: data.assgned_id,
                                iDueDate: data.duedate ? (new Date(data.duedate)) : "",
                                iPriority: data.priority_id,
                                iEstimate: data.estimated_hours,
                            })
                        })

                    },
                    (error) => {
                        //setIssueStatus([])
                    })

        }

        fetch(initState.apiUrl + "/issueGetProjectByUser?sUserId=" + initState.userLoginId,
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

        fetch(initState.apiUrl + "/issueGetListIssueCategories",
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

        fetch(initState.apiUrl + "/issueGetListPriotities",
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

    }, [initState.userLoginId, initState.apiUrl, pissueKey])

    const onProjectChange = function (val) {
        setInputPane({ ...inputPane, iProjectKey: val })

        if (val === "") {
            setAssignee([])
            setPhase([])
            return
        }

        setValidatePane({
            ...validatePane
            , iProjectKeyRequired: true
        })

        fetch(initState.apiUrl + "/issueGetListPhaseByProjectKey?sProjectKey=" + val,
            {
                method: "GET"
            })
            .then(res => res.json())
            .then(
                (result) => {
                    setPhase(result[0])
                },
                (error) => {
                    setPhase([])
                })

        fetch(initState.apiUrl + "/issueGetProjectUserAssign?sProjectKey=" + val,
            {
                method: "GET"
            })
            .then(res => res.json())
            .then(
                (result) => {
                    setAssignee(result[0])
                },
                (error) => {
                    setAssignee([])
                })
    }

    const handleParentTaskSearch = useCallback((query) => {

        if (inputPane.iProjectKey === "")
            return

        setIsParentTaskLoading(true)
        fetch(initState.apiUrl + "/issueGetListParentIssues?sProjectKey="
            + inputPane.iProjectKey
            + "&sSearchKey=" + query,
            {
                method: "GET"
            })
            .then(res => res.json())
            .then(
                (result) => {
                    let searchArr = result[0]
                    const arrParentTask = searchArr.map((i) => ({
                        issue_id: i.issue_id.toString(),
                        key: i.key,
                        name: i.name,
                        itemdisplay: i.key + " - " + i.name
                    }));
                    setParentTask(arrParentTask)
                    setIsParentTaskLoading(false)
                },
                (error) => {
                    setParentTask([])
                    setIsParentTaskLoading(false)
                })
    }, [inputPane.iProjectKey, initState.apiUrl])

    const onEditorStateChange = function (text) {
        let rawText = JSON.stringify(convertToRaw(text.getCurrentContent()))
        setInputPane({ ...inputPane, iDescription: text, iDescriptionRaw: rawText })
    }

    const iParentTaskChange = function (onSelected) {
        let parentTask = onSelected[0]
        parentTask ?
            setInputPane({ ...inputPane, iParentTask: parentTask.issue_id }) :
            setInputPane({ ...inputPane, iParentTask: "" })
    }

    const assigntomyself = function (e) {
        e.preventDefault()

        if (inputPane.iProjectKey.trim().length !== 0)
            setInputPane({ ...inputPane, iAssignee: initState.userLoginId })
    }

    const saveIssue = function (e) {
        e.preventDefault()

        //Validate data
        let validate_form = true
        let projectKeyErr = ""
        let issueNameErr = ""
        let estimateErr = ""

        if (inputPane.iProjectKey.trim().length === 0) {
            validate_form = false
            projectKeyErr = <label className="has-error help-block">This field is required.</label>
        }

        if (inputPane.iIssueName.trim().length === 0) {
            validate_form = false
            issueNameErr = <label className="has-error help-block">This field is required.</label>
        } else if (inputPane.iIssueName.trim().length > 255) {
            validate_form = false
            issueNameErr = <label className="has-error help-block">Please enter at least 255 characters.</label>
        }

        if (inputPane.iEstimate.length !== 0 && !isNormalInteger(inputPane.iEstimate)) {
            validate_form = false
            estimateErr = <label className="has-error help-block">Please enter only digits.</label>
        }

        setValidatePane({
            ...validatePane
            , iProjectKeyErr: projectKeyErr
            , iIssueNameErr: issueNameErr
            , iEstimateErr: estimateErr
        })

        setValid(validate_form)

        if (validate_form === true) {

            const saveObj = {
                projectkey: inputPane.iProjectKey.trim().substring(0, 20),
                issuetype: parseInt(inputPane.iIssueType),
                phase: parseInt(inputPane.iPhase),
                issuekey: inputPane.iIssueKey.trim().substring(0, 20),
                issuename: inputPane.iIssueName.trim().substring(0, 255),
                description: inputPane.iDescriptionRaw,
                status: parseInt(inputPane.iStatus),
                parenttask: parseInt(inputPane.iParentTask),
                startdate: inputPane.iStartDate ? Moment(inputPane.iStartDate).format('YYYY-MM-DD') : null,
                assignee: parseInt(inputPane.iAssignee),
                duedate: inputPane.iDueDate ? Moment(inputPane.iDueDate).format('YYYY-MM-DD') : null,
                priority: parseInt(inputPane.iPriority),
                estimate: parseInt(inputPane.iEstimate),
                loginuserid: parseInt(initState.userLoginId)
            }

            editForm ?
                (
                    fetch(initState.apiUrl + "/issueUpdate",
                        {
                            method: "POST",
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(saveObj)
                        })
                        .then(res => res.json())
                        .then(
                            (result) => {
                                const outputIssueKey = result.issuekey
                                history.push("/issues/usuccess/" + outputIssueKey)
                            },
                            (error) => {
                                console.log(error)
                            })
                ) :
                (
                    fetch(initState.apiUrl + "/issueInsert",
                        {
                            method: "POST",
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(saveObj)
                        })
                        .then(res => res.json())
                        .then(
                            (result) => {
                                const outputIssueKey = result[0].issuekey
                                history.push("/issues/isuccess/" + outputIssueKey)
                            },
                            (error) => {
                                console.log(error)
                            })
                )
        }
    }

    const isNormalInteger = function (str) {
        return /^\+?(0|[1-9]\d*)$/.test(str)
    }

    return (
        <div id="container" className="fixed-header sidebar-closed">
            <div id="content">
                <div className="container">
                    <div className="crumbs">
                        <ul className="breadcrumb">
                            <b>{editForm ? ("Edit Issue: " + inputPane.iIssueKey) : "Create Issue"} </b>
                        </ul>
                    </div>
                    <br />
                    <Form className="form-horizontal">
                        <Row>
                            <Form.Group>
                                <Col md={8}>{'\u00A0'}</Col>
                                <Form.Label className="col-md-4 control-label">
                                    <Button variant="success" type="Submit" onClick={saveIssue}>{'\u00A0\u00A0'}Save{'\u00A0\u00A0'}</Button>
                                    {
                                        editForm ? "" :
                                            (
                                                <span>
                                                    {'\u00A0\u00A0\u00A0'}
                                                    <Button variant="primary" type="Submit">{'\u00A0\u00A0'}Save and continue{'\u00A0\u00A0'}</Button>
                                                </span>
                                            )
                                    }

                                    {'\u00A0\u00A0\u00A0'}
                                    <Button variant="inverse" type="Submit">{'\u00A0\u00A0'}Back{'\u00A0\u00A0'}</Button>
                                </Form.Label>
                            </Form.Group>
                            {
                                valid ?
                                    "" :
                                    (
                                        <Form.Group>
                                            <Col md={12}>
                                                <div className="alert alert-danger">
                                                    <strong>Error! </strong>
                                                    Form validation has failed, please reinput red item blow!
                                                </div>
                                            </Col>
                                        </Form.Group>
                                    )
                            }
                            <Form.Group>
                                <Form.Label className="col-md-1 control-label">Project:</Form.Label>
                                <Col md={2}>
                                    <Form.Control
                                        as="select"
                                        id="iProjectKey"
                                        maxLength="20"
                                        className={validatePane.iProjectKeyErr.length === 0 ? "" : "input-error"}
                                        value={inputPane.iProjectKey}
                                        onChange={e => onProjectChange(e.target.value)}
                                    >
                                        <option value=""></option>
                                        {arrProject.map((projectitem, key) => (
                                            <option key={key} value={projectitem.key}>[{projectitem.key}] - {projectitem.name}</option>
                                        ))}
                                    </Form.Control>
                                    {validatePane.iProjectKeyErr}
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
                                        <option value=""></option>
                                        {arrPhase.map((phaseitem, key) => (
                                            <option key={key} value={phaseitem.project_type_id}>{phaseitem.name}</option>
                                        ))}
                                    </Form.Control>
                                </Col>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label className="col-md-1 control-label">Issue name:</Form.Label>
                                <Col md={11}>
                                    <Form.Control
                                        type="text"
                                        id="iIssueName"
                                        maxLength="255"
                                        value={inputPane.iIssueName}
                                        className={validatePane.iIssueNameErr.length === 0 ? "" : "input-error"}
                                        onChange={e => setInputPane({ ...inputPane, iIssueName: e.target.value })}
                                    />
                                    {validatePane.iIssueNameErr}
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
                                                editorState={inputPane.iDescription}
                                                onEditorStateChange={onEditorStateChange}
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
                                            {
                                                editForm ?
                                                    (
                                                        <Form.Control
                                                            as="select"
                                                            id="iStatus"
                                                            value={inputPane.iStatus}
                                                            onChange={e => setInputPane({ ...inputPane, iStatus: e.target.value })}
                                                        >
                                                            {arrIssueStatus.map((statusitem, key) => (
                                                                <option key={key} value={statusitem.issue_status_id}>{statusitem.name}</option>
                                                            ))}
                                                        </Form.Control>
                                                    ) : <span className="label label-danger">Open</span>
                                            }



                                        </Form.Label>
                                        <Form.Label className="col-md-4 control-label">Parent task:</Form.Label>
                                        <Col md={3}>
                                            <AsyncTypeahead
                                                id="iParentTask"
                                                labelKey="itemdisplay"
                                                isLoading={isParentTaskLoading}
                                                minLength={1}
                                                onSearch={handleParentTaskSearch}
                                                options={arrParentTask}
                                                placeholder="Input task id or task name"
                                                onChange={iParentTaskChange}
                                                renderMenuItemChildren={(option, props) => (
                                                    <div title={option.itemdisplay}>
                                                        {option.itemdisplay.length > 40 ?
                                                            (option.itemdisplay.substring(0, 40) + "...") :
                                                            option.itemdisplay}
                                                    </div>
                                                )}
                                            />
                                            <i className="icon-search field-icon"></i>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label className="col-md-1 control-label">Start date:</Form.Label>
                                        <Col md={2}>
                                            <DatePicker className="form-control" autoComplete="off"
                                                id="iStartDate"
                                                minDate={new Date('1-01-1990')}
                                                maxDate={new Date('1-01-2100')}
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
                                                {arrAssignee.map((assigneeitem, key) => (
                                                    <option key={key} value={assigneeitem.user_id}>{assigneeitem.first_name} {assigneeitem.last_name}</option>
                                                ))}
                                            </Form.Control>
                                        </Col>
                                        <Col md={2}>
                                            <button className="btn assign-my-self-btn" onClick={assigntomyself}>
                                                <i className="icon-user"></i>
                                                <strong>Assign to myself</strong>
                                            </button>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label className="col-md-1 control-label">Due date:</Form.Label>
                                        <Col md={2}>
                                            <DatePicker className="form-control" autoComplete="off"
                                                id="iDueDate"
                                                minDate={new Date('1-01-1990')}
                                                maxDate={new Date('1-01-2100')}
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
                                                maxLength="4"
                                                className={validatePane.iEstimateErr.length === 0 ? "" : "input-error"}
                                                value={inputPane.iEstimate}
                                                onChange={e => setInputPane({ ...inputPane, iEstimate: e.target.value })}
                                            />
                                            {validatePane.iEstimateErr}
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
                                <Button variant="success" type="Submit" onClick={saveIssue} >{'\u00A0\u00A0'}Save{'\u00A0\u00A0'}</Button>
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
