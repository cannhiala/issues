import React, { useEffect } from 'react'
import { Switch } from "react-router-dom"
import axios from 'axios'
import PrivateRoute from './utils/PrivateRoute'
import PublicRoute from './utils/PublicRoute'
import { getToken, removeUserSession, setUserSession } from './utils/Common'

import Menu from './components/Menu'
import Login from './components/Login'
import Home from './components/Home/Homeinterface'
import ProjectDetail from './components/ProjectDetail'
import Projects from './components/Projects'
import CreateProject from './components/CreateProject'
import EditProject from './components/EditProject'
import ProjectOverview from './components/ProjectOverview'
import IssueSearchForm from './components/Issues/IssueSearchForm'
import IssueDetail from './components/Issues/IssueDetail'
import AddIssue from './components/Issues/AddIssue'

function App() {

  useEffect(() => {
    const token = getToken()
    if (!token) {
      return
    }

    axios.get(`http://localhost:3001/verifyToken?token=${token}`).then(response => {
      setUserSession(response.data.token, response.data.user);
    }).catch(error => {
      removeUserSession();
    });
  })

  return (
    <div className="_app">
      <Switch>
        <PublicRoute path='/login' component={Login} />
        <PrivateRoute exact path='/' component={Home} />
        <PrivateRoute exact path='/home' component={Home} />
        <PrivateRoute exact path='/projects' component={Projects} />
        <PrivateRoute exact path='/projects/:success/:pId' component={Projects} />
        <PrivateRoute exact path='/pDetail/:pId' component={ProjectDetail} />
        <PrivateRoute exact path='/newProject' component={CreateProject} />
        <PrivateRoute exact path='/pEdit/:pId' component={EditProject} />
        <PrivateRoute exact path='/pOverview/:pId' component={ProjectOverview} />
        <PrivateRoute exact path='/issueDetail/:issueId' component={IssueDetail} />
        <PrivateRoute exact path='/issues' component={IssueSearchForm} />
        <PrivateRoute exact path='/issues/:success/:issuekey' component={IssueSearchForm} />
        <PrivateRoute exact path='/addIssue' component={AddIssue} />
        <PrivateRoute exact path='/addIssue/:type/:pissueKey' component={AddIssue} />
        <PrivateRoute exact path='/editIssue/:pissueKey' component={AddIssue} />
      </Switch>
    </div>
  );
}

export default App;
