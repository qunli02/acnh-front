import React from 'react';
import './App.css';
import {Redirect, Link} from "react-router-dom";
import { connect } from "react-redux";
import './reducer.js';


class Login extends React.Component {


  handleSubmit = (e) =>{
    e.preventDefault()
    let username = e.target[0].value
    let password = e.target[1].value
    let user = {user:{
      username: username,
      password: password
    }}
    fetch(`http://localhost:4000/api/v1/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(user),
    })
    .then(r=>r.json())
    .then(data=> {
      if(data.message){
        alert(data.message)
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
            <label>
              ID:
              <input type="text" name="name" />
            </label>
            <br/>
            <label>
              Password:
              <input type="text" name="password" />
            </label>
            <br/>
            <input type="submit" value="Log in" />
          </form>
          <Link to="/register" className="button" >
          <button>Register</button>
          </Link>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login)