import React, { Fragment } from "react";
import "./App.css";
import { connect } from "react-redux";
import "./reducer.js";

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
            let sortedPrice =
              user &&
              user.turnip_sell_prices &&
              user.turnip_sell_prices.sort((a, b) => {
                return new Date(a.date) - new Date(b.date);
              });
            let onlySeven =
              sortedPrice &&
              sortedPrice.filter((price) => {
                return (
                  new Date(Date.now()) - new Date(price.date) <
                    (new Date(Date.now()).getDay() + 1) * 86400000 &&
                  new Date(Date.now()) - new Date(price.date) >= 0
                );
              });
            let showNow = onlySeven;
            if (showNow != null) {
              for (let i = 0; i < 7; i++) {
                if (!showNow[i] || new Date(showNow[i].date).getDay() !== i) {
                  showNow.splice(i, 0, {
                    date: new Date(
                      new Date(Date.now()) -
                        (new Date(Date.now()).getDay() - i) * 86400000
                    ),
                  });
                } else {
                }
              }
            }
            return (
              <Fragment key={user.id}>
                {user.username}
                <table>
                  <thead>
                    <tr>
                      <th id="dividedCell">
                        <div className="c1">Time</div>
                        <div className="c2">Date</div>
                      </th>
                      {user &&
                        user.turnip_sell_prices &&
                        showNow.map((price) => {
                          return (
                            <th
                              key={price.date}
                              className={this.weekday(price.date)}
                            >
                              {this.exactDate(price.date)}{" "}
                              {this.weekday(price.date)}
                            </th>
                          );
                        })}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>morning price</th>
                      {user &&
                        user.turnip_sell_prices &&
                        showNow.map((price) => {
                          return (
                            <th
                              key={price.date}
                              className={this.weekday(price.date)}
                            >
                              {price.morning_price}
                            </th>
                          );
                        })}
                    </tr>
                  </tbody>
                  <tbody>
                    <tr>
                      <th>Afternoon price</th>
                      {user &&
                        user.turnip_sell_prices &&
                        showNow.map((price) => {
                          return (
                            <th
                              key={price.date}
                              className={this.weekday(price.date)}
                            >
                              {price.afternoon_price}
                            </th>
                          );
                        })}
                    </tr>
                  </tbody>
                </table>

                <br />
              </Fragment>
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
