import React, { useContext } from 'react'
import Homelist from './Homelist';
import Issuelist from './Issuelist';
import { Table } from 'react-bootstrap';

function Homeinterface() {
  return (
    <div id="container" className="fixed-header sidebar-closed">
      <div id="content">
        <div className="container">
          <div className="crumbs">
            <ul className="breadcrumb"><b>Home</b></ul>
          </div>
          <br /><br />
          <div className="row">
            <div className="col-md-5">
              <div className="widget box">
                <div className="widget-header">
                  <h4>My Project</h4>
                </div>
                <div className="widget-content no-padding">
                  <Homelist />
                </div>
              </div>
            </div>
            <div className="col-md-7">
              <div className="widget box">
                <div className="widget-header">
                  <h4>My Project</h4>
                </div>
                <div className="widget-content no-padding">
                  <Issuelist />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Homeinterface;
