import PropTypes from "prop-types";
import React, { Component } from "react";
import Icon from "../Icon/Icon";
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

    return (
      <div className="days">
        {nextDays.map((day, i) => {
          const dayData = daily?.[i + 1];
          const weatherCode = dayData?.weather?.[0]?.id;
          const dayWeather = dayData?.weather?.[0]?.main;
          const dayTemp = dayData?.temp?.max;

          return (
            <div className="days__day" key={day}>
              <span className="days__name">{day}</span>
              {weatherCode && (
                <Icon weather={dayWeather} code={weatherCode} size="sm" />
              )}
              {dayTemp && (
                <span className="days__temp">{Math.round(dayTemp)}°</span>
              )}
            </div>
          );
        })}
      </div>
    );
  }
}

Daily.propTypes = {
  daily: PropTypes.arrayOf(PropTypes.shape({})),
};
