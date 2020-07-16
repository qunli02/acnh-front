import React from "react";
import "./App.css";
import { connect } from "react-redux";
import "./reducer.js";
import { Redirect } from "react-router-dom";

class Home extends React.Component {
  weekday = (date) => {
    let weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
    let day = new Date(date).getDay();
    return weekday[day];
  };

  exactDate = (date) => {
    return new Date(date).toLocaleString("en-US", {
      dateStyle: "short",
    });
  };

  render() {
    return (
      <div>
        <h1>Home</h1>
        {this.props.allUsers &&
          this.props.allUsers.map((user) => {
            let sortedPrice = user.turnip_sell_prices.sort((a, b) => {
              return new Date(a.date) - new Date(b.date);
            });
            return (
              <>
                {" "}
                {user.username},{" "}
                {
                  <ul>
                    {sortedPrice.map((price) => {
                      return (
                        <li key={price.id}>
                          {this.exactDate(price.date)}{" "}
                          {this.weekday(price.date)}, {price.morning_price},{" "}
                          {price.afternoon_price}
                        </li>
                      );
                    })}
                  </ul>
                }{" "}
                <br />{" "}
              </>
            );
          })}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    allUsers: state.allUsers,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
