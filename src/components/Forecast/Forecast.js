import React, { Component } from "react";
import "./Forecast.scss";

export default class Forecast extends Component {
  render() {
    return (
      <div className="forecast">
        <div className="current">Today</div>
        <div className="next-days">
          <div className="day">Day +1</div>
          <div className="day">Day +2</div>
          <div className="day">Day +3</div>
          <div className="day">Day +4</div>
        </div>
      </div>
    );
  }
}
