import React, { useEffect, useState } from 'react'
import { NavLink } from "react-router-dom"
import { useHistory } from "react-router-dom";
import { getUser, removeUserSession } from './../utils/Common'

function Menu() {
  let history = useHistory();
  const [fullname, setName] = useState("")

  useEffect(() => {
    console.log(getUser().name)
    getUser() ? setName(getUser().name) : setName("")
  }, [])

  const onLogout = () => {
    removeUserSession();
    history.push('/login');
  }

  return (
    <header className="header navbar navbar-fixed-top" role="banner">
      <div className="container">
        <a className="navbar-brand" href="/home">
          <img width="40px" src="/assets/img/logo.png" alt="logo" />
          <strong> ISSUE</strong> TRACKING
        </a>
        <ul className="nav navbar-nav navbar-left hidden-xs hidden-sm">
          <li className="menu-item"><NavLink exact to="/home"> Home </NavLink></li>
          <li><NavLink exact to="/projects"> Projects </NavLink></li>
          <li><NavLink exact to="/issues"> Issues </NavLink></li>
        </ul>
        <ul className="nav navbar-nav navbar-right">
          <li><a href="#"><span className="glyphicon glyphicon-user"></span> {fullname}</a></li>
          <li><a href="#" onClick={onLogout}><span className="glyphicon glyphicon-log-out"></span> Logout </a></li>
        </ul>
      </div>
    </header>
  )
}

export default Menu;
