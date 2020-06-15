<<<<<<< HEAD
import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"
import axios from 'axios'
import PrivateRoute from './utils/PrivateRoute'
import PublicRoute from './utils/PublicRoute'
import { getToken, removeUserSession, setUserSession } from './utils/Common'

=======
import React, { useState, useContext } from 'react';
import {Switch, Route, Redirect } from "react-router-dom";
>>>>>>> 0c18affe7e5074a769da2124a0a4c3adbb254def
import Menu from './components/Menu'
import Login from './components/Login'
import Home from './components/Home/Homeinterface'
import ProjectDetail from './components/ProjectDetail'
import Projects from './components/Projects'
import CreateProject from './components/CreateProject'
import IssueSearchForm from './components/Issues/IssueSearchForm'




function App() {
<<<<<<< HEAD
  const [isAuthen, setAuth] = useState(true)

  useEffect(() => {
    const token = getToken()
    if (!token) {
      return
    }

    axios.get(`http://localhost:3001/verifyToken?token=${token}`).then(response => {
      setUserSession(response.data.token, response.data.user);
      setAuth(true);
    }).catch(error => {
      removeUserSession();
      setAuth(false);
    });


  })

  return (
    <div className="container">
      {
        isAuthen ? <Menu /> : <div className="navMenu"></div>
      }
=======
  const [isAuthenticated, userHasAuthenticated] = useState(false)



  return (
    <div className="container">
      
>>>>>>> 0c18affe7e5074a769da2124a0a4c3adbb254def
      <Switch>
        <PublicRoute path='/login' component={Login} />
        <PrivateRoute exact path='/' component={Home} />
        <PrivateRoute exact path='/home' component={Home} />
        <PrivateRoute exact path='/projects' component={Projects} />
        <PrivateRoute exact path='/projects/:succes/:pId' component={Projects} />
        <PrivateRoute exact path='/pDetail/:pId' component={ProjectDetail} />
        <PrivateRoute exact path='/newProject' component={CreateProject} />
        <PrivateRoute exact path='/issues' component={IssueSearchForm} />
      </Switch>
    </div>
  );
}

export default App;
