import React, { useState, useContext } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Menu from './components/Menu'
import Login, { UserIDContext } from './components/Login'
import Home from './components/Home/Homeinterface';
import ProjectDetail from './components/ProjectDetail';
import Projects from './components/Projects';
import CreateProject from './components/CreateProject';
import IssueSearchForm from './components/Issues/IssueSearchForm'


function App() {

  const userId = useContext(UserIDContext);
  const [isAuthenticated, userHasAuthenticated] = useState(false)

  console.log('isAuthenticated: ', isAuthenticated)
  
  return (
    <div className="container">
      {!isAuthenticated ? <Redirect to="/login" /> : <Menu />}
      <Switch>
        <Route exact path='/login'>
          <Login isAuthenticated={isAuthenticated} />
        </Route>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/projects">
          <Projects />
        </Route>
        <Route exact path="/projects/:succes/:pId">
          <Projects />
        </Route>
        <Route path="/pDetail/:pId">
          <ProjectDetail />
        </Route>
        <Route path="/newProject">
          <CreateProject />
        </Route>
        <Route exact path="/issues">
          <IssueSearchForm />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
