import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Current.scss";
import Icon from "../Icon/Icon";

export default class Current extends Component {
  render() {
    const { current } = this.props;

    const temp = current?.temp;
    const weather = current?.weather?.[0]?.main;
    const code = current?.weather?.[0]?.id;

    const { dt, sunrise, sunset } = current;
    const isNight = dt < sunrise || dt > sunset;

    return (
      <div className="current">
        Today
        <div className="current__row">
          {weather && (
            <Icon weather={weather} code={code} isNight={isNight} isToday />
          )}
          <div className="current__data">
            {temp && <span className="current__temp">{Math.round(temp)}°</span>}
            {weather && <span>{weather}</span>}
          </div>
        </div>
      </div>
    );
  }
}

Current.propTypes = {
  current: PropTypes.shape({
    temp: PropTypes.number.isRequired,
    weather: PropTypes.array,
  }).isRequired,
};
