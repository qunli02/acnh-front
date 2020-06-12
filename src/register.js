import React from 'react';
import './App.css';

class Register extends React.Component {


  render(){
      return(
        <div>
        <form>
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


export default Register;
