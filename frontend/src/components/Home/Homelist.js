import React, { Component } from 'react';
import axios from 'axios';
import { Button, Table} from 'react-bootstrap';



    class Homelist extends Component {

      constructor(props) {
        super(props);
        this.state = {
          emps: [],
        }

      }

    getProjects() {
      axios.get('http://localhost:3001/myProject')
      .then(res => {
        const emps = res.data;
        this.setState({ emps });
        console.log(res.data);
          })
    }

    componentDidMount() {
        this.getProjects();
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
                      <th></th>
                      <th>ProjectKey</th>
                      <th>ProjectName</th>
                      <th>ProjectStatus</th>
                      <th>ProjectType</th>
                    </tr>
                  </thead>
                  <tbody>
                    {emps.map(emp => (
                      <tr key={emp.id}>
                        <td><button className="btn btn-outline-primary">Overview</button></td>
                        <td>{emp.projectkey}</td>
                        <td>{emp.projectname}</td>
                        <td>{emp.projectstatus}</td>
                        <td>{emp.projecttype}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
            </div>
            )
      }
  }
}

    export default Homelist;
