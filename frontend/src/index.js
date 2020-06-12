import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//import './index.css';
//import App from './App';
import Login from './components/Login'
import ProjectDetail from './components/ProjectDetail';
import Projects from './components/Projects';
import CreateProject from './components/CreateProject';
import IssueSearchForm from './components/Issues/IssueSearchForm'
import * as serviceWorker from './serviceWorker';


ReactDOM.render(
  <Router>
    <div>
      <Switch>
        <Route exact path="/">
          <Login />
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
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
