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

          <form>
          <h1>
            Turnnip price
          </h1>
            <label>
              Date:
              <input type="date" name="date" />
            </label>
            <br/>
            <label>
              Time:
              
            </label>
            <input type="radio" id="mmorningale" name="time" value="morning"/>
            <label for="afternoon">Morning</label>
            <input type="radio" id="afternoon" name="time" value="afternoon"/>
            <label for="afternoon">Afternoon</label><br/>            
            <label>
              Price:
              <input type="number" name="price" />
            </label>
            <br/>
            <input type="submit" value="add/change" />
          </form>

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