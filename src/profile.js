import React from "react";
import "./App.css";
import { connect } from "react-redux";
import "./reducer.js";
import { Redirect } from "react-router-dom";

class Profile extends React.Component {
  state = {
    allPrice: false,
  };

  showall = () => {
    this.setState({
      allPrice: !this.state.allPrice,
    });
  };

  show = () => {
    return this.props.user ? null : <Redirect to="/login" />;
  };

  handleDataUpdate = (e) => {
    e.preventDefault();

    let date = new Date(e.target[0].value);
    let time = e.target[1].checked ? e.target[1].value : e.target[2].value;
    let price = e.target[3].value;

    let priceData = { date: date, time: time, price: price };

    fetch(`http://localhost:4000/api/v1/turnip_sell_prices`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `jwt: ${localStorage.token}`,
      },
      body: JSON.stringify(priceData),
    })
      .then((r) => r.json())
      .then((data) => {
        this.props.handlesellprice(data);
      });
  };

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
    let sortedPrice =
      this.props.user &&
      this.props.user.turnip_sell_prices &&
      this.props.user.turnip_sell_prices.sort((a, b) => {
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
    let showNow = this.state.allPrice ? sortedPrice : onlySeven;
    if (showNow != null && this.state.allPrice === false) {
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
      <div>
        {this.show()}
        <table>
          <thead>
            <tr>
              <th id="dividedCell">
                <div className="c1">Time</div>
                <div className="c2">Date</div>
              </th>
              {this.props.user &&
                this.props.user.turnip_sell_prices &&
                showNow.map((price) => {
                  return (
                    <th key={price.date} className={this.weekday(price.date)}>
                      {this.exactDate(price.date)} {this.weekday(price.date)}
                    </th>
                  );
                })}
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>morning price</th>
              {this.props.user &&
                this.props.user.turnip_sell_prices &&
                showNow.map((price) => {
                  return (
                    <th key={price.date} className={this.weekday(price.date)}>
                      {price.morning_price}
                    </th>
                  );
                })}
            </tr>
          </tbody>
          <tbody>
            <tr>
              <th>Afternoon price</th>
              {this.props.user &&
                this.props.user.turnip_sell_prices &&
                showNow.map((price) => {
                  return (
                    <th key={price.date} className={this.weekday(price.date)}>
                      {price.afternoon_price}
                    </th>
                  );
                })}
            </tr>
          </tbody>
        </table>
        <button onClick={this.showall}>view all price</button> <br />
        profile
        <br />
        User Name: {this.props.user && this.props.user.username}
        <form onSubmit={this.handleDataUpdate}>
          <h1>Turnip price</h1>
          <label>
            Date:
            <input type="date" name="date" />
          </label>
          <br />
          <label>Time:</label>
          <input type="radio" id="morning" name="time" value="morning" />
          <label htmlFor="afternoon">Morning</label>
          <input type="radio" id="afternoon" name="time" value="afternoon" />
          <label htmlFor="afternoon">Afternoon</label>
          <br />
          <label>
            Price:
            <input type="number" name="price" />
          </label>
          <br />
          <input type="submit" value="add/change" />
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handlesellprice: (sellPrice) => {
      dispatch({ type: "SELLPRICE", data: sellPrice });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
