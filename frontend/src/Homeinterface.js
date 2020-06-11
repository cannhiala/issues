import React, {useContext} from 'react'
import Homelist from './Homelist';
import Issuelist from './Issuelist';
import { Button, Table} from 'react-bootstrap';
import Menu from './Menu';

function Homeinterface () {
  return (
    <div>
      <Menu />

      <h2>HOME</h2>
      <hr></hr>
        <div id="block_container">
        <div id="1">
        <h4>My Project</h4> 
        <Table>
          <th><Homelist /></th>
        </Table>
        </div>  
            &emsp;
            &emsp;
            &emsp;
            &emsp;
            <div id="2">
          <h4>My Issue</h4> 
          <Table>  
          <th><Issuelist /></th>
        </Table>
        </div>
        </div>
    </div>
  )
}
export default Homeinterface;
