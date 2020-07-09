import React from 'react';
import { connect } from "react-redux";
import './reducer.js';
import './navbar.css';

class Navbar extends React.Component {

    handlelogout= () => {
        localStorage.token = ""
    }


    render(){
        return(
          <div>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/register">Register</a></li>
                <li><a href="/profile">Profile</a></li>
                {this.props.user? <li className="login" onClick={this.handlelogout}><a href="/" className="login" >Logout</a></li> : <li className="login"><a href="/" className="login" >Login</a></li>}
            </ul>
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(Navbar);