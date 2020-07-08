import React from 'react';
import './App.css';
import {Redirect} from "react-router-dom";

class Register extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault()
    let userName = e.target[0].value
    let password = e.target[1].value
    fetch('http://localhost:4000/api/v1/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        user: {
          username: userName,
          password: password,
        }
      })
    })
  .then(r => r.json())
  .then(data => {
    localStorage.token = data.jwt
  })
  
  }

  render(){
      return(
        
        <div>
          {true? <Redirect to="/profile" /> : null}
        <form onSubmit = {this.handleSubmit}>
        <h1>
        Register
        </h1>
          <label>
            ID:
            <input type="text" name="name" />
          </label>
          <br/>
          <label>
            Password:
            <input type="password" name="password" />
          </label>
          <br/>
          <input type="submit" value="Register" />
        </form>
        </div>
      )
    }
}


export default Register;
