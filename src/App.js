import React from 'react';
import './App.css';
import { Route, Switch, Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import Login from './login';
import Register from './register';

class App extends React.Component {



  render(){
      return(
        <div>
          asdsadaf
          <Switch>
            <Route exact path="/" render={()=><Login/>} />
            <Route exact path="/register" render={()=><Register/>} />
          </Switch>
        </div>
      )
    }
}

function mapStateToProps(state){
  return{
  }
}

function mapDispatchToProps(dispatch){
  return{
    handleplayers: (players) => {
      dispatch({type: "PLAYERS", data: players})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
