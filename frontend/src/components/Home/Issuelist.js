import React, { Component } from 'react';
import axios from 'axios';
import { Table} from 'react-bootstrap';
import { getUser } from './../../utils/Common'

class Issuelist extends Component {
      constructor(props) {

        super(props);
        this.state = {
          emps: [],
          userid: getUser().userId,
        }

      }

    getIssues() {
      axios.get('http://localhost:3001/myIssue?uId='+this.state.userid)
      .then(res => {
        const emps = res.data;
        this.setState({ emps });
        console.log(res.data);
          })
    }

    componentDidMount() {
        this.getIssues();
    }


    render(){
      const{error,emps}=this.state;
      if(error){
          return(
              <div>Error:{error.message}</div>
          )
      }
      else
      {
          return(
        <div>
                <Table className="table-responsive col-md-6">
                  <thead className="btn-secondary">
                    <tr>
                      <th>IssueType</th>
                      <th>IssueId</th>
                      <th>IssueName</th>
                      <th>IssueStatus</th>
                      <th>IssuePriority</th>
                      <th>ProjectName</th>
                      <th>DueDate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {emps.map(emp => (
                      <tr key={emp.id}>
                        <td>{emp.issuetype}</td>
                        <td>{emp.key}</td>
                        <td>{emp.name}</td>
                        <td>{emp.issuestatus}</td>
                        <td>{emp.issuepriority}</td>
                        <td>{emp.projectname}</td>
                        <td>{emp.duedate}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            )
      }
  }
}

    export default Issuelist;
