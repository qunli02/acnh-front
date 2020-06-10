import React from 'react';
import './App.css';
import {Redirect, Link} from "react-router-dom";


class Login extends React.Component {


  handleSubmit = (e) =>{
    e.preventDefault()
    console.log(e.target[0].value);
    console.log(e.target[1].value);
  }

  render(){
      return(
        <div>
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
          <button onClick={() => <Redirect push to="/somewhere/else"/> }>Register</button>
        </div>
      )
    }
}


export default Login;
