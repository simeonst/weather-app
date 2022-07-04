import PropTypes from "prop-types";
import React, { Component } from "react";
import "./Daily.scss";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default class Daily extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nextDays: [],
    };
  }

  componentDidMount() {
    const date = new Date();
    const currDay = date.getDay();
    const nextFour = [];
    for (let i = 1; i < 5; i++) {
      nextFour.push(days[(currDay + i) % 7]);
    }
    this.setState({ nextDays: nextFour });
  }

  render() {
    const { nextDays } = this.state;
    const { daily } = this.props;
    console.log(daily);

    if (!nextDays.length) {
      return <div>Loading...</div>;
    }

    return (
      <div className="daily">
        {nextDays.map((day, i) => {
          const dayData = daily?.[i + 1];
          const dayWeather = dayData?.weather?.[0]?.main;
          const dayTemp = dayData?.temp?.day;

          return (
            <div className="day">
              <span>{day}</span>
              {dayWeather && <span>{dayWeather}</span>}
              {dayTemp && <span>{Math.round(dayTemp)}°</span>}
            </div>
          );
        })}
      </div>
    );
  }
}

Daily.propTypes = {
  daily: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};
