import React, { Component } from 'react';
import axios from 'axios';
import { Table} from 'react-bootstrap';



    class Issuelist extends Component {
      constructor(props) {
        super(props);
        this.state = {
          emps: [],
        }

      }

    getIssues() {
      axios.get('http://localhost:3001/myIssue')
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
                        <td>{emp.issueid}</td>
                        <td>{emp.issuename}</td>
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
