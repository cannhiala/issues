import React, { useState, useEffect } from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import Moment from 'moment'
import './../../../node_modules/react-datepicker/dist/react-datepicker.css'
import './../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css'
import { getUser } from './../../utils/Common'

function IssueSearchForm() {

    const initState = {
        error: { type: "", msg: "" },
        tableoption: {
            defaultSortName: 'update_on',
            defaultSortOrder: 'desc'
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
        console.log(filterParams.toString())
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

    return (
        <div>
            <Form onSubmit={filterIssue}>
                <Container fluid>
                    <Row>
                        <Col sm={1}><Form.Label>Project key</Form.Label></Col>
                        <Col sm={2}>
                            <Form.Control
                                type="text"
                                id="sProjectKey"
                                value={searchCondition.sProjectKey}
                                onChange={e => setSearchCondition({ ...searchCondition, sProjectKey: e.target.value })}
                            />
                        </Col>
                        <Col sm={1}><Form.Label>Project name</Form.Label></Col>
                        <Col sm={4}>
                            <Form.Control
                                type="text"
                                id="sProjectName"
                                value={searchCondition.sProjectName}
                                onChange={e => setSearchCondition({ ...searchCondition, sProjectName: e.target.value })}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={1}><Form.Label>Issue name</Form.Label></Col>
                        <Col sm={7}>
                            <Form.Control
                                type="text"
                                id="sIssueName"
                                value={searchCondition.sIssueName}
                                onChange={e => setSearchCondition({ ...searchCondition, sIssueName: e.target.value })}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={1}><Form.Label>Issue id</Form.Label></Col>
                        <Col sm={2}>
                            <Form.Control
                                type="text"
                                id="sIssueId"
                                value={searchCondition.sIssueId}
                                onChange={e => setSearchCondition({ ...searchCondition, sIssueId: e.target.value })}
                            />
                        </Col>
                        <Col sm={1}><Form.Label>Assignee</Form.Label></Col>
                        <Col sm={2}>
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
                        <Col sm={1}><Form.Label>Priority</Form.Label></Col>
                        <Col sm={2}>
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
                    </Row>
                    <Row>
                        <Col sm={1}><Form.Label>Start date</Form.Label></Col>
                        <Col sm={2}>
                            <DatePicker
                                id="sStartDateFrom"
                                selected={searchCondition.sStartDateFrom}
                                onChange={date => setSearchCondition({ ...searchCondition, sStartDateFrom: date })}
                            />
                        </Col>
                        <Col sm={2}>
                            <DatePicker
                                id="sStartDateTo"
                                selected={searchCondition.sStartDateTo}
                                onChange={date => setSearchCondition({ ...searchCondition, sStartDateTo: date })}
                            />
                        </Col>
                        <Col sm={4}><Form.Label>(Enter in MM/DD/YYYY format))</Form.Label></Col>
                    </Row>
                    <Row>
                        <Col sm={1}><Form.Label>Due date</Form.Label></Col>
                        <Col sm={2}>
                            <DatePicker
                                id="sDueDateFrom"
                                selected={searchCondition.sDueDateFrom}
                                onChange={date => setSearchCondition({ ...searchCondition, sDueDateFrom: date })}
                            />
                        </Col>
                        <Col sm={2}>
                            <DatePicker
                                id="sDueDateTo"
                                selected={searchCondition.sDueDateTo}
                                onChange={date => setSearchCondition({ ...searchCondition, sDueDateTo: date })}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={1}><Form.Label>Issue status</Form.Label></Col>
                        <Col sm={7}>
                            <div onChange={e => setSearchCondition({ ...searchCondition, sissueStatusSelected: e.target.value })} className="mb-3">
                                <Form.Check inline label="All" defaultChecked name="issueStatusGroup" type="radio" value="" id="issueStatus-All" />
                                {arrIssueStatus.map((statusitem, key) => (
                                    <Form.Check key={key} inline label={statusitem.name} name="issueStatusGroup" type="radio" value={statusitem.issue_status_id} id={`issueStatus-${statusitem.issue_status_id}`} />
                                ))}
                                <Form.Check inline label="Not Closed" name="issueStatusGroup" type="radio" value="NotClosed" id="issueStatus-NotClosed" />
                            </div>
                        </Col>
                    </Row>
                </Container>
                <Container fluid>
                    <Row>
                        <Col>
                            <Button variant="primary" type="Submit">Create issue</Button>
                        </Col>
                    </Row>
                </Container>
            </Form>
            <Container fluid>
                <BootstrapTable data={issueList} pagination={true} options={initState.tableoption} striped hover>
                    <TableHeaderColumn dataField='issuetypename' dataSort={true}>Issue type</TableHeaderColumn>
                    <TableHeaderColumn isKey dataField='key' dataSort={true}>Issue id</TableHeaderColumn>
                    <TableHeaderColumn dataField='name' dataSort={true}>Issue name</TableHeaderColumn>
                    <TableHeaderColumn dataField='phase' dataSort={true}>Phase</TableHeaderColumn>
                    <TableHeaderColumn dataField='status' dataSort={true}>Issue status</TableHeaderColumn>
                    <TableHeaderColumn dataField='projectskey' dataSort={true}>Project key</TableHeaderColumn>
                    <TableHeaderColumn dataField='projectsname' dataSort={true}>Project name</TableHeaderColumn>
                    <TableHeaderColumn dataField='assignee' dataSort={true}>Assignee</TableHeaderColumn>
                    <TableHeaderColumn dataField='priority' dataSort={true}>Priority</TableHeaderColumn>
                    <TableHeaderColumn dataField='startdate' dataSort={true}>Start date</TableHeaderColumn>
                    <TableHeaderColumn dataField='duedate' dataSort={true}>Due date</TableHeaderColumn>
                    <TableHeaderColumn dataField='startdate' dataSort={true}>Start date</TableHeaderColumn>
                    <TableHeaderColumn dataField='update_on' dataSort={true}>Updated date</TableHeaderColumn>
                    <TableHeaderColumn dataField='createby' dataSort={true}>Created by</TableHeaderColumn>
                </BootstrapTable>
            </Container>
        </div>
    );

}

export default IssueSearchForm;
