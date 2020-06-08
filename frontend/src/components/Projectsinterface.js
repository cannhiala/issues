import React, {useState, useContext, useEffect} from 'react'
import {UsernNameContext} from './Home'
import {UserIDContext} from './Home'
import axios from 'axios'

function Userinterface () {
  //console.log('aaaa')
  //console.log(useContext(UsernNameContext));
  const username = useContext(UsernNameContext);
  const userid = useContext(UserIDContext);

  const [estimations, setEstimations] = useState([])
  const [estimationI, setEstimationI] = useState({estimationid: 0,userid: userid,language: '',framework: '',type: '',tasklevel: '',devexperience: 0, estimationvalue: null, actualvalue: null})
  const [isUpdate, setIsUpdate] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    console.log('hand useEffect to load Estimation List');
    console.log(isUpdate);
    const params =  {userid}
    axios.post('http://localhost:3001/estimations', params).then(
          (res) => {
            if(res.status === 200) {
                console.log('Axios:',res)
                console.log('Axios data:',res.data)
                setEstimations(res.data)
            } else {
              const error = new Error(res.error)
              throw error
            }
        }).catch((err) => { console.log('Axios Error:', err); })
  }, [message, isUpdate, userid]);

  const onAddorEditValue = function (e) {
    e.preventDefault()
    if (!isUpdate) {
      console.log('hand onAdd Estimation');
      // validation
      if (estimationI.language.trim() === '') {
        alert('Please choose a language !');
        return false;
      } else if ( estimationI.framework === '') {
        alert('Please choose a framework !');
        return false;
      } else if ( estimationI.type === '') {
        alert('Please choose a type of Task !');
        return false;
      } else if ( estimationI.tasklevel === '') {
        alert('Please choose a level of Task !');
        return false;
      } else if ( estimationI.devexperience === 0) {
        alert('Please choose a Year\'s experience number!');
        return false;
      } else if ( estimationI.estimationValue === null) {
        alert('Please click button Estimate first !');
        return false;
      }
      axios.post('http://localhost:3001/addEstimation', estimationI).then(
          (res) => {
            setMessage('Insert successfull !')
            console.log('Axios:',res);
            console.log('Axios data:',res.data);
      }).catch((err) => { console.log('Axios Error:', err); })
    } else {
      if ( estimationI.actualvalue === null) {
        alert('Please input actual value !');
        return false;
      }
      console.log('hand on Update Estimation');
      console.log(estimationI)
      axios.put('http://localhost:3001/upEstimation', estimationI).then(
          (res) => {
            setMessage('Update successfull !')
            console.log('Axios:',res);
            console.log('Axios data:',res.data);
      }).catch((err) => { console.log('Axios Error:', err); })
    }
  }

  const onEstimate  = function (e) {
    e.preventDefault()
      console.log('hand Estimate');
      // validation
      if (estimationI.language.trim() === '') {
        alert('Please choose a language !');
        return false;
      } else if ( estimationI.framework === '') {
        alert('Please choose a framework !');
        return false;
      } else if ( estimationI.type === '') {
        alert('Please choose a type of Task !');
        return false;
      } else if ( estimationI.tasklevel === '') {
        alert('Please choose a level of Task !');
        return false;
      } else if ( estimationI.devexperience === 0) {
        alert('Please choose a Year\'s experience number!');
        return false;
      } else if ( estimationI.estimationValue === null) {
        alert('Please click button Estimate first !');
        return false;
      }

      axios.get('http://localhost:3000/?language='+estimationI.language+'&framework='+estimationI.framework+'&type='+estimationI.type+'&tasklevel='+estimationI.tasklevel+'&devlevel='+estimationI.devexperience+'&alg=linear').then(
          (res) => {
            //setMessage('Insert successfull !')
            console.log('Estimate response:',res);
            console.log('Estimate data:',res.data);
            setEstimationI({...estimationI, estimationvalue: Math.round(res.data)}
      }).catch((err) => { console.log('Axios Error:', err); })
  }

  const onLoadEdit = function (objEdit, e) {
    console.log('hand load Estimation to Update');
    setEstimationI({estimationid: objEdit.ESTIMATIONID,userid: objEdit.USERID,language: objEdit.LANGUAGE,framework: objEdit.FRAMEWORK,type: objEdit.TYPE,tasklevel: objEdit.TASKLEVEL,devexperience: objEdit.DEVEXPERIENCE, estimationvalue: objEdit.ESTIMATIONVALUE, actualvalue: objEdit.ACTUALVALUE});
    setIsUpdate(true)
  }

  return (
    <div className="container">
        Xin chao User: {username}
        <h1>Estitmation List</h1>
        <table id="estimations" className="table">
          <thead  className="btn-primary">
            <tr>
              <th>LANGUAGE</th>
              <th>FRAMEWORK</th>
              <th>TYPE</th>
              <th>TASKLEVEL</th>
              <th>DEVEXPERIENCE</th>
              <th>ESTIMATIONVALUE</th>
              <th>ACTUALVALUE</th>
              <th>#</th>
            </tr>
          </thead>
          <tbody>
            {
              estimations.map(obj => (
                <tr>
                  <td>{obj.LANGUAGE}</td>
                  <td>{obj.FRAMEWORK}</td>
                  <td>{obj.TYPE}</td>
                  <td>{obj.TASKLEVEL}</td>
                  <td>{obj.DEVEXPERIENCE}</td>
                  <td>{obj.ESTIMATIONVALUE}</td>
                  <td>{obj.ACTUALVALUE}</td>
                  <td><button type="button" onClick={() => {onLoadEdit(obj)}}>Edit</button>  </td>
                </tr>
              ))
          }
          </tbody>
        </table>
        <h2> Input new Estimation </h2>
        <p>{message}</p>
        <form onSubmit={onAddorEditValue}>
          <div className="form-row">
            <div className="form-group col-md-2 mb-3">
        			<label htmlFor="language">Language:</label>
            </div>
            <div className="form-group col-md-3 mb-3">
        			<select
              id="language"
              className="form-control"
              name="language"
              value={estimationI.language}
              onChange={e => setEstimationI({...estimationI, language: e.target.value})}
              defaultValue={'DEFAULT'}
              disabled={isUpdate}
              >
        				<option value="DEFAULT">(Please select a Language)</option>
        				<option value="JAVA">JAVA</option>
        				<option value="C#">C#</option>
        				<option value="PHP">PHP</option>
        				<option value="PYTHON">PYTHON</option>
        				<option value="JAVASCRIPT">JAVASCRIPT</option>
        			</select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-2 mb-3">
        			<label htmlFor="framework">Framework:</label>
            </div>
            <div className="form-group col-md-3 mb-3">
        			<select
              id="framework"
              className="form-control"
              name="framework"
              value={estimationI.framework}
              onChange={e => setEstimationI({...estimationI, framework: e.target.value})}
              defaultValue={'DEFAULT'}
              disabled={isUpdate}
              >
        				<option selected value="DEFAULT">(Please select a Framework)</option>
        				<option value="MVC">MVC</option>
        				<option value="NODEJS">NODEJS</option>
        				<option value="VUE JS">VUE JS</option>
                <option value="REACT JS">REACT JS</option>
        				<option value="ANGULAR JS">ANGULAR JS</option>
        			</select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-2 mb-3">
        			<label htmlFor="type">Type:</label>
            </div>
            <div className="form-group col-md-3 mb-3">
        			<select
              id="type"
              className="form-control"
              name="type"
              value={estimationI.type}
              onChange={e => setEstimationI({...estimationI, type: e.target.value})}
              defaultValue={'DEFAULT'}
              disabled={isUpdate}
              >
        				<option selected value="DEFAULT">(Please select a Screen type)</option>
        				<option value="INPUT">INPUT</option>
        				<option value="LIST">LIST</option>
        				<option value="DETAIL">DETAIL</option>
        				<option value="SEARCH">SEARCH</option>
        			</select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-2 mb-3">
        			<label htmlFor="taskLevel">Task Level:</label>
            </div>
            <div className="form-group col-md-3 mb-3">
        			<select
              id="taskLevel"
              className="form-control"
              name="taskLevel"
              value={estimationI.tasklevel}
              onChange={e => setEstimationI({...estimationI, tasklevel: e.target.value})}
              defaultValue={'DEFAULT'}
              disabled={isUpdate}
              >
        				<option selected value="DEFAULT">(Please select a Task Level)</option>
        				<option value="VERY COMPLEX">VERY COMPLEX</option>
        				<option value="COMPLEX">COMPLEX</option>
        				<option value="MEDIUM">MEDIUM</option>
        				<option value="SIMPLE">SIMPLE</option>
        			</select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-2 mb-3">
        			<label htmlFor="devExperience">Dev Experience :</label>
            </div>
            <div className="form-group col-md-3 mb-3">
        			<select
              id="devExperience"
              className="form-control"
              name="devExperience"
              value={estimationI.devexperience}
              onChange={e => setEstimationI({...estimationI, devexperience: e.target.value})}
              defaultValue={'DEFAULT'}
              disabled={isUpdate}
              >
        				<option selected value="DEFAULT">(Please select a experience)</option>
        				<option value="1">1</option>
        				<option value="1.5">1.5</option>
        				<option value="2">2</option>
        				<option value="2.5">2.5</option>
        				<option value="3">3</option>
        				<option value="3.5">3.5</option>
        				<option value="4">4</option>
        				<option value="4.5">4.5</option>
        			</select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-2 mb-3">
        			<label htmlFor="estimationValue">Estimation(hour):</label>
            </div>
            <div className="form-group col-md-3 mb-3">
        			<input
              id="estimationValue"
              className="form-control"
              type="text" name="estimationValue"
              value={estimationI.estimationvalue}
              onChange={e => setEstimationI({...estimationI, estimationvalue: e.target.value})}
              disabled={isUpdate}
              required
              />
            </div>
          </div>


            {isUpdate ? (
            <div className="form-row">
              <div className="col-md-3 mb-3">
          			<label htmlFor="actualValue">Actual(hour):</label>
              </div>
              <div className="form-group col-md-3 mb-3">
          			<input
                id="actualValue"
                className="form-control"
                type="text" name="actualValue"
                value={estimationI.actualvalue}
                onChange={e => setEstimationI({...estimationI, actualvalue: e.target.value})}
                required
                />
          		</div>
            </div>
            ) : (<> </>)}
            <div className="form-row">
            <div className="form-group col-md-2 mb-3">
            </div>
              <div className="form-group col-md-1 mb-3">
                <input type="button" className="btn btn-primary" onClick={onEstimate} name="estimate" value="Estimate"/>
              </div>
              <div className="form-group col-md-1 mb-3">
        			  <input type="submit" className="btn btn-primary" name="submit" value="Submit" />
              </div>
            </div>
        </form>
    </div>
  )
}

export default Userinterface;
