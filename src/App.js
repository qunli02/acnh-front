import React from 'react';
import './App.css';
import { connect } from "react-redux";

class App extends React.Component {

  render(){
      return(
        <div> Loading</div>
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
