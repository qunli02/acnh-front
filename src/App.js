import React from 'react';
import './App.css';
import { Route, Switch, Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import Login from './login';
import Register from './register';
import Profile from './profile';

class App extends React.Component {

  state

  render(){
      return(
        <div>
          asdsadaf
          <Switch>
            <Route exact path="/" render={()=><Login/>} />
            <Route exact path="/register" render={()=><Register/>} />
            <Route exact path="/profile" render={()=><Profile/>} />
          </Switch>
        </div>
      )
    }
}

function mapStateToProps(state){
  return{
    login: state.login
  }
}

function mapDispatchToProps(dispatch){
  return{
    handleplayers: (login) => {
      dispatch({type: "LOGIN", data: login})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
