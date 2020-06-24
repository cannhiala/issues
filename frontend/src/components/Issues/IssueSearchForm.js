import React, { useState, useEffect } from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { NavLink, useHistory } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import Moment from 'moment'
import './../../../node_modules/react-datepicker/dist/react-datepicker.css'
import './../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css'
import { getUser } from './../../utils/Common'

function IssueSearchForm() {
    let history = useHistory()


    const initState = {
        error: { type: "", msg: "" },
        tableoption: {
            defaultSortName: 'update_on',
            defaultSortOrder: 'desc',
            onRowClick: function (row) {
                //alert(`You click row id: ${row.key}`);
                history.push("/issues/usucess/" + row.key)
            }
        },
        userLoginId: getUser().userId,
        arrIssueStatus: [],
        arrAssignee: [],
        arrPriority: [],
        formSearch: {
            sProjectKey: "",
            sProjectName: "",
            sIssueName: "",
            sIssueId: "",
            sAssigneeSelected: 3,
            sPrioritySelected: "",
            sStartDateFrom: "",
            sStartDateTo: "",
            sDueDateFrom: "",
            sDueDateTo: "",
            sissueStatusSelected: ""
        }
    }

    const [arrPriority, setPriority] = useState(initState.arrPriority)
    const [arrAssignee, setAssignee] = useState(initState.arrAssignee)
    const [arrIssueStatus, setIssueStatus] = useState(initState.arrIssueStatus)
    const [searchCondition, setSearchCondition] = useState(initState.formSearch)
    const [defaultSearch, setDefaultSearch] = useState(true)
    const [issueList, setIssueList] = useState([])

    const filter = function () {
        let filterParams = new URLSearchParams()
        for (let key in searchCondition) {
            if (searchCondition[key] === "")
                continue
            if (key.indexOf("Date") > 0)
                filterParams.append(key, Moment(searchCondition[key]).format('YYYY-MM-DD'))
            else
                filterParams.append(key, searchCondition[key])
        }
        fetch("http://localhost:3001/issueFilter?" + filterParams.toString(),
            {
                method: "GET"
            })
            .then(res => res.json())
            .then(
                (result) => {
                    setIssueList(result[0])
                },
                (error) => {
                    setIssueList([])
                })
    }

    useEffect(() => {
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

        fetch("http://localhost:3001/issueGetListStatuses",
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
        fetch("http://localhost:3001/issueGetUsersSameProjects?userId=" + initState.userLoginId,
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

        fetch("http://localhost:3001/issueFilter?sAssigneeSelected=" + initState.userLoginId,
            {
                method: "GET"
            })
            .then(res => res.json())
            .then(
                (result) => {
                    setIssueList(result[0])
                },
                (error) => {
                    setIssueList([])
                })
    }, [initState.userLoginId])

    const filterIssue = function (e) {
        e.preventDefault()
        filter()
    }

    const formSearchClick = function (e) {
        e.preventDefault()
        if (defaultSearch)
            setDefaultSearch(false)
        else
            setDefaultSearch(true)
    }

    const issueTypeDataFormat = function(cell, row) {
        return (
            <span className={"pill pill-" + row.issue_category_id}>{row.issuetypename}</span>
        )
    }

    const issueIdFormat = function(cell, row) {
        return (
            <NavLink exact to={'/'}> {row.key} </NavLink>
        )
    }

    const issueStatusFormat = function(cell, row) {
        return (
            <span className={"pill-status pill-status-" + row.issue_status_id}>{row.status}</span>
        )
    }
    
    const projectsKeyFormat  = function(cell, row) {
        return (
            <NavLink exact to={'/pDetail/' + row.project_id}> {row.projectskey} </NavLink>
        )
    }

    const updateOnFormat  = function(cell, row) {
        return (
            Moment(row.update_on).format('MM/DD/YYYY')
        )
    }

    const createNewIssue = function (e) {
        e.preventDefault()
        history.push("/addissue/")
    }

    return (
        <div id="container" className="fixed-header sidebar-closed">
            <div id="content">
                <div className="container">
                    <div className="crumbs">
                        <ul className="breadcrumb"><b>Issues</b></ul>
                    </div>
                    <br /><br />
                    <Form className="form-horizontal" onSubmit={filterIssue}>
                        <Row>
                            <Col md={12}>
                                <div className="widget box">
                                    <div className="widget-header">
                                        <h4>Search condition</h4>
                                        <div className="toolbar no-padding">
                                            <div className="btn-group">
                                                <span onClick={formSearchClick} className="btn btn-xs widget-collapse">
                                                    {
                                                        defaultSearch ? "Click here to expand" : "Click here to collapse"
                                                    }
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="widget-content">
                                        <div className={defaultSearch ? "defaultSearch" : "advanceSearch"}>
                                            <Form.Group>
                                                <Form.Label className="col-md-1 control-label">ProjectKey</Form.Label>
                                                <Col md={2}>
                                                    <Form.Control
                                                        type="text"
                                                        id="sProjectKey"
                                                        value={searchCondition.sProjectKey}
                                                        onChange={e => setSearchCondition({ ...searchCondition, sProjectKey: e.target.value })}
                                                    />
                                                </Col>
                                                <Form.Label className="col-md-1 control-label">ProjectName</Form.Label>
                                                <Col md={5}>
                                                    <Form.Control
                                                        type="text"
                                                        id="sProjectName"
                                                        value={searchCondition.sProjectName}
                                                        onChange={e => setSearchCondition({ ...searchCondition, sProjectName: e.target.value })}
                                                    />
                                                </Col>
                                            </Form.Group>
                                            <Form.Group>
                                                <Form.Label className="col-md-1 control-label">Issue name</Form.Label>
                                                <Col md={8}>
                                                    <Form.Control
                                                        type="text"
                                                        id="sIssueName"
                                                        value={searchCondition.sIssueName}
                                                        onChange={e => setSearchCondition({ ...searchCondition, sIssueName: e.target.value })}
                                                    />
                                                </Col>
                                            </Form.Group>
                                            <Form.Group>
                                                <Form.Label className="col-md-1 control-label">Issue id</Form.Label>
                                                <Col md={2}>
                                                    <Form.Control
                                                        type="text"
                                                        id="sIssueId"
                                                        value={searchCondition.sIssueId}
                                                        onChange={e => setSearchCondition({ ...searchCondition, sIssueId: e.target.value })}
                                                    />
                                                </Col>
                                                <Form.Label className="col-md-1 control-label">Assignee</Form.Label>
                                                <Col md={2}>
                                                    <Form.Control
                                                        as="select"
                                                        id="sAssignee"
                                                        value={searchCondition.sAssigneeSelected}
                                                        onChange={e => setSearchCondition({ ...searchCondition, sAssigneeSelected: e.target.value })}
                                                    >
                                                        <option value="">All</option>
                                                        {arrAssignee.map((assigneeitem, key) => (
                                                            <option key={key} value={assigneeitem.user_id}>{assigneeitem.username}</option>
                                                        ))}
                                                    </Form.Control>
                                                </Col>
                                                <Form.Label className="col-md-1 control-label">Priority</Form.Label>
                                                <Col md={2}>
                                                    <Form.Control
                                                        as="select"
                                                        id="sPriority"
                                                        value={searchCondition.sPrioritySelected}
                                                        onChange={e => setSearchCondition({ ...searchCondition, sPrioritySelected: e.target.value })}
                                                    >
                                                        <option value="">All</option>
                                                        {arrPriority.map((priorityitem, key) => (
                                                            <option key={key} value={priorityitem.priority_id}>{priorityitem.name}</option>
                                                        ))}
                                                    </Form.Control>
                                                </Col>
                                            </Form.Group>
                                            <Form.Group>
                                                <Form.Label className="col-md-1 control-label">Start date</Form.Label>
                                                <Col md={2}>
                                                    <DatePicker className="form-control" autoComplete="off"
                                                        id="sStartDateFrom"
                                                        selected={searchCondition.sStartDateFrom}
                                                        onChange={date => setSearchCondition({ ...searchCondition, sStartDateFrom: date })}
                                                    />
                                                </Col>
                                                <Form.Label className="col-md-1 control-label">~</Form.Label>
                                                <Col md={2}>
                                                    <DatePicker className="form-control" autoComplete="off"
                                                        id="sStartDateTo"
                                                        selected={searchCondition.sStartDateTo}
                                                        onChange={date => setSearchCondition({ ...searchCondition, sStartDateTo: date })}
                                                    />
                                                </Col>
                                                <span><i>(Enter in MM/DD/YYYY format)</i></span>
                                            </Form.Group>
                                            <Form.Group>
                                                <Form.Label className="col-md-1 control-label">Due date</Form.Label>
                                                <Col md={2}>
                                                    <DatePicker className="form-control" autoComplete="off"
                                                        id="sDueDateFrom"
                                                        selected={searchCondition.sDueDateFrom}
                                                        onChange={date => setSearchCondition({ ...searchCondition, sDueDateFrom: date })}
                                                    />
                                                </Col>
                                                <Form.Label className="col-md-1 control-label">~</Form.Label>
                                                <Col md={2}>
                                                    <DatePicker className="form-control" autoComplete="off"
                                                        id="sDueDateTo"
                                                        selected={searchCondition.sDueDateTo}
                                                        onChange={date => setSearchCondition({ ...searchCondition, sDueDateTo: date })}
                                                    />
                                                </Col>
                                            </Form.Group>
                                        </div>
                                        <Form.Group>
                                            <Form.Label className="col-md-1 control-label">Issue status</Form.Label>
                                            <Col md={7}>
                                                <div onChange={e => setSearchCondition({ ...searchCondition, sissueStatusSelected: e.target.value })} className="mb-3">
                                                    <Form.Check className="radio-inline" inline label="All" defaultChecked name="issueStatusGroup" type="radio" value="" id="issueStatus-All" />
                                                    {arrIssueStatus.map((statusitem, key) => (
                                                        <Form.Check key={key} inline className="radio-inline" label={statusitem.name} name="issueStatusGroup" type="radio" value={statusitem.issue_status_id} id={`issueStatus-${statusitem.issue_status_id}`} />
                                                    ))}
                                                    <Form.Check inline className="radio-inline" label="Not Closed" name="issueStatusGroup" type="radio" value="NotClosed" id="issueStatus-NotClosed" />
                                                </div>
                                            </Col>
                                        </Form.Group>
                                        <Form.Group>
                                            <Col md={1}></Col>
                                            <Col md={2}><Button variant="primary" type="Submit">{'\u00A0\u00A0'}Search{'\u00A0\u00A0'}</Button></Col>
                                        </Form.Group>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Form>
                    <Row>
                        <Col md={10}></Col>
                        <Col md={2} style={{ textAlign: "right" }}>
                            <Button variant="primary" type="Submit" onClick={createNewIssue}>
                                {'\u00A0\u00A0'}Create issue{'\u00A0\u00A0'}
                            </Button>
                        </Col>                        
                    </Row>
                    <br />
                    <Row>
                        <Col md={12} style={{ overflowX: "auto" }}>
                            <div style={{ width: "2500px" }}>
                                <BootstrapTable data={issueList} pagination={true} options={initState.tableoption} striped hover tableBodyClass='table-cursor'>
                                    <TableHeaderColumn hidden={true} dataField='issue_category_id'>Issue type Id</TableHeaderColumn>
                                    <TableHeaderColumn width={'5%'} dataField='issuetypename' dataAlign='center' dataFormat={issueTypeDataFormat} dataSort={true}>Issue type</TableHeaderColumn>
                                    <TableHeaderColumn width={'5%'} isKey dataField='key' dataSort={true} dataFormat={issueIdFormat}>Issue id</TableHeaderColumn>
                                    <TableHeaderColumn dataField='name' dataSort={true}>Issue name</TableHeaderColumn>
                                    <TableHeaderColumn width={'6%'} dataField='phase' dataSort={true}>Phase</TableHeaderColumn>
                                    <TableHeaderColumn hidden={true} dataField='issue_status_id'>Project Status Id</TableHeaderColumn>
                                    <TableHeaderColumn width={'5%'} dataField='status' dataAlign='center' dataFormat={issueStatusFormat} dataSort={true}>Issue status</TableHeaderColumn>
                                    <TableHeaderColumn hidden={true} dataField='project_id'>Project Id</TableHeaderColumn>
                                    <TableHeaderColumn width={'5%'} dataField='projectskey' dataSort={true} dataFormat={projectsKeyFormat}>Project key</TableHeaderColumn>
                                    <TableHeaderColumn width={'12%'} dataField='projectsname' dataSort={true}>Project name</TableHeaderColumn>
                                    <TableHeaderColumn width={'6%'} dataField='assignee' dataSort={true}>Assignee</TableHeaderColumn>
                                    <TableHeaderColumn width={'4%'} dataField='priority' dataSort={true}>Priority</TableHeaderColumn>
                                    <TableHeaderColumn width={'6%'} dataField='startdate' dataAlign='center' dataSort={true}>Start date</TableHeaderColumn>
                                    <TableHeaderColumn width={'6%'} dataField='duedate' dataAlign='center' dataSort={true}>Due date</TableHeaderColumn>
                                    <TableHeaderColumn width={'6%'} dataField='startdate' dataAlign='center' dataSort={true}>Start date</TableHeaderColumn>                                    
                                    <TableHeaderColumn width={'6%'} dataField='update_on' dataAlign='center' dataSort={true} dataFormat={updateOnFormat}>Updated date</TableHeaderColumn>
                                    <TableHeaderColumn width={'6%'} dataField='createby' dataSort={true}>Created by</TableHeaderColumn>
                                </BootstrapTable>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    );

}

export default IssueSearchForm;
