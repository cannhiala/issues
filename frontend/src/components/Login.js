import React, { useState } from "react"
import axios from 'axios'
import './style.css';
import Homeinterface from './Home/Homeinterface';
import App from './../App';
import { useHistory } from "react-router-dom";

export const UsernNameContext = React.createContext()
export const UserIDContext = React.createContext()

function Login (props) {
  let history = useHistory();
  const [user, setUser] = useState({userid: 0, username: '', password: '', role: 0})
  const [isAuthenticated, userHasAuthenticated] = useState(false)
  const [err, setErr] = useState('')

  const onLogin = function(e) {
    if (user.username === "") {
      setErr('Username field is required')
    } else if (user.password === "") {
      setErr('Password field is required')
    } else {
      e.preventDefault()
      //console.log(JSON.stringify({user}))
      axios.post('http://localhost:3001/login', user).then(
            (res) => {
              if(res.status === 200) {
                if(res.data.length === 0) {
                  setErr('Username or Password is invalid')
                } else {
                  setUser({userid: res.data[0].USERID, username: res.data[0].user_name, password: res.data[0].pass_word, role: res.data[0].role})
                  userHasAuthenticated(true)
                  history.push("/home");
                }
              } else {
                const error = new Error(res.error)
                throw error
              }
          }).catch((err) => { console.log('Axios Error:', err); })
      }
  }

  const onLogout = function (e) {
    e.preventDefault()
    userHasAuthenticated(false)
  }

  return (
      <div className="container-fluid">
        {!isAuthenticated ? (
          <div class = "login-form">
          <form onSubmit={onLogin}>
            <h2 style={{ textAlign: 'center' }}>Issue Tracking</h2>
              <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    id="username"
                    className="form-control"
                    type="text"
                    name="username"
                    placeholder="Enter username"
                    value={user.username}
                    onChange={e => setUser({...user, username: e.target.value})}
                    required
                  />
              </div>
              <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    id="password"
                    className="form-control"
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={user.password}
                    onChange={e => setUser({...user, password: e.target.value})}
                    required
                  />
              </div>
              <div className="form-group">
                  <button type="submit" className="btn btn-primary btn-block">Login</button>
            </div>
          </form>
          </div>

        ) : (
          user.role === 2 ? (
              <>
                <UsernNameContext.Provider value={user.username}>
                  <UserIDContext.Provider value={user.userid}>
                    <App />
                  </UserIDContext.Provider>
                </UsernNameContext.Provider>
              </>
          ) : (
              <>
                <UsernNameContext.Provider value={user.username}>
                  <UserIDContext.Provider value={user.userid}>
                     <App />
                  </UserIDContext.Provider>
                </UsernNameContext.Provider>
              </>
          )
      )}
      <div class="footer-copyright text-center">© Copyright 2020-2020, FF Team </div>
    </div>
  )
}
export default Login;
