import React from 'react';
import './App.css';
import { connect } from "react-redux";
import './reducer.js';
import {Redirect} from "react-router-dom";


class Profile extends React.Component {

  show =() => {
    return this.props.user? null : <Redirect to="/" />
  }

  render(){
    return(
        <div>
          {this.show()}
          profile
          <br/>
          User Name: {this.props.user && this.props.user.username}

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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);