import React, { Component } from "react";
import Forecast from "../Forecast/Forecast";
import "./WeatherWrapper.scss";

export default class WeatherWrapper extends Component {
  render() {
    return (
      <div className="weather-wrapper">
        <div className="locations">
          <span>Ottawa</span>
          <span>Moscow</span>
          <span>Tokyo</span>
        </div>
        <Forecast />
      </div>
    );
  }
}
