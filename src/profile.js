import React from 'react';
import './App.css';
import { connect } from "react-redux";
import './reducer.js';
import {Redirect} from "react-router-dom";


class Profile extends React.Component {

  show =() => {
    return this.props.user? null : <Redirect to="/" />
  }

  handleDataUpdate= (e) => {

    e.preventDefault()
    console.log(this.props);
    
    let date = new Date(e.target[0].value)
    let time = e.target[1].checked? e.target[1].value : e.target[2].value
    let price = e.target[3].value

    // this.props.user.turnip_sell_prices.filter((price)=>{
    //   console.log((new Date(price.date)) === (new Date(Date.now())));
    //   console.log(this.props);
      
    //   debugger
    //   return (new Date(price.date)) === (new Date(Date.now()))
    //  })

    let priceData = {date: date, time: time, price: price, }


    fetch(`http://localhost:4000/api/v1/turnip_sell_prices`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        "Authorization": `jwt: ${localStorage.token}`
      },
      body: JSON.stringify(priceData),
    })
    .then(r=>r.json())
    .then(data=> {
      console.log(data);
      
    })


  }

  weekday= (date) => {

    let weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
    let day = (new Date(date)).getDay()
    return weekday[day]
  }

  


  render(){
    return(
        <div>
          {this.show()}
          <ul>
          {this.props.user && this.props.user.turnip_sell_prices && this.props.user.turnip_sell_prices.map((price) => {
           return (
             <li key = {price.id}>{this.weekday(price.date)}, {price.morning_price}, {price.afternoon_price}</li>
           )})
          }
          </ul>
          profile
          <br/>
          User Name: {this.props.user && this.props.user.username}

          <form onSubmit={this.handleDataUpdate}>
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
            <input type="radio" id="mmorning" name="time" value="morning"/>
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