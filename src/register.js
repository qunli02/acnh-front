import React from 'react';
import './App.css';
import {Redirect} from "react-router-dom";
import { connect } from "react-redux";
import './reducer.js';

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
    if (data.error){
      alert(data.error)
    }else{
      localStorage.setItem("token",data.jwt)
      this.props.handleuser(data.user)
    }
    
    
  })
  
  }

  render(){
      return(
        
        <div>
          {this.props.user? <Redirect to="/profile" /> : null }
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


function mapStateToProps(state){
  return{
    user: state.user
  }
}

function mapDispatchToProps(dispatch){
  return{
    handleuser: (login) => {
      dispatch({type: "LOGIN", data: login})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);