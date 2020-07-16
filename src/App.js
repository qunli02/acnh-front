import React from 'react';
import './App.css';
import { Route, Switch, Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import Login from './login';
import Register from './register.js';
import Profile from './profile.js';
import Navbar from './navbar.js';
import Home from './home.js';

class App extends React.Component {

  componentDidMount(){
    const token = localStorage.token
    if(token){
      fetch("http://localhost:4000/api/v1/profile",{
        headers: {
          "Authorization": `jwt: ${token}`
        }
      })
      .then(r => r.json())
      .then(data => {
        this.props.handleuser(data.user)
      })
    }

    fetch("http://localhost:4000/api/v1/users")
    .then(r => r.json())
    .then(data => {
        this.props.handleAllUser(data)
    })

  }

  render(){
      return(
        <div>
          <Navbar/>
          <Switch>
            <Route exact path="/" render={()=><Home/>} />
            <Route exact path="/login" render={()=><Login/>} />
            <Route exact path="/register" render={()=><Register/>} />
            <Route exact path="/profile" render={()=><Profile/>} />
          </Switch>
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
    },
    handleAllUser: (allUsers) => {
      dispatch({type: "ALLUSERS", data: allUsers})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
