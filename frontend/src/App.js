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
import IssueSearchForm from './components/Issues/IssueSearchForm'
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
        <PrivateRoute exact path='/'>
          <Menu />
          <Home />
        </PrivateRoute>
        <PrivateRoute exact path='/home'>
          <Menu />
          <Home />
        </PrivateRoute>
        <PrivateRoute exact path='/projects'>
          <Menu />
          <Projects />
        </PrivateRoute>
        <PrivateRoute exact path='/projects/:succes/:pId'>
          <Menu />
          <Projects />
        </PrivateRoute>
        <PrivateRoute exact path='/pDetail/:pId'>
          <Menu />
          <ProjectDetail />
        </PrivateRoute>
        <PrivateRoute exact path='/newProject'>
          <Menu />
          <CreateProject />
        </PrivateRoute>
        <PrivateRoute exact path='/issues'>
          <Menu />
          <IssueSearchForm />
        </PrivateRoute>
        <PrivateRoute exact path='/addIssue'>
          <Menu />
          <AddIssue />
        </PrivateRoute>
      </Switch>
    </div>
  );
}

export default App;
