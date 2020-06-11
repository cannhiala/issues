import React, {useContext} from 'react'
import Homelist from './Homelist';
import Issuelist from './Issuelist';
import { Button, Table} from 'react-bootstrap';
import {UsernNameContext} from './Login'
import Login from './Login';
import Homeinterface from './Homeinterface';
function Menu () {

  const username = useContext(UsernNameContext);
  console.log(username);
  return (
    <div>
      <nav class="navbar navbar-inverse">
        <div class="container-fluid">
            <ul class="nav navbar-nav">
              <li class="active"><a href="#">Home</a></li>
              <li><a href="#">Projects</a></li>
              <li><a href="#">Issues</a></li>
            </ul>
            <ul class="nav navbar-nav navbar-right">
                <li><a href="#"><span class="glyphicon glyphicon-user"></span> {username}</a></li>
                <li><a href="onClick={onLogout}"><span class="glyphicon glyphicon-log-out"></span> Logout </a></li>
            </ul>
        </div>
      </nav>
    </div>
  )
}

export default Menu;
