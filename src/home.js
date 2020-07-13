import React from 'react';
import './App.css';
import { connect } from "react-redux";
import './reducer.js';
import {Redirect} from "react-router-dom";


class Home extends React.Component {

  render(){

    return(
        <div>
          roar
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
    
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);