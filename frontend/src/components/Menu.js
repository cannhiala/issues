import React, { useContext } from 'react'
import { UsernNameContext } from './Login'
import { NavLink } from "react-router-dom"
import { useHistory } from "react-router-dom";
import { removeUserSession } from './../utils/Common'

function Menu() {
  let history = useHistory();
  const username = useContext(UsernNameContext);

  const onLogout = () => {
    removeUserSession();
    history.push('/login');
  }

  return (
    <div>
      <nav class="navbar navbar-inverse">
        <div class="container-fluid">
          <ul class="nav navbar-nav">
            <li class="active"><NavLink exact to="/home"> Home </NavLink></li>
            <li><NavLink exact to="/projects"> Projects </NavLink></li>
            <li><NavLink exact to="/issues"> Issues </NavLink></li>
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <li><a href="#"><span class="glyphicon glyphicon-user"></span> {username}</a></li>
            <li><a href="#" onClick={onLogout}><span class="glyphicon glyphicon-log-out"></span> Logout </a></li>
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default Menu;
