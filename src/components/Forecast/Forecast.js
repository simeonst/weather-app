import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Forecast.scss";
import Daily from "../Daily/Daily";

export default class Forecast extends Component {
  render() {
    const { current, daily } = this.props;
    const temp = current?.temp;
    const weather = current?.weather?.[0]?.main;

    return (
      <div className="forecast">
        <div className="current">
          Today
          <div className="current-icon-wrap">
            {weather && <span>image</span>}
            <div className="current-data">
              {temp && <span>{Math.round(temp)}°</span>}
              {weather && <span>{weather}</span>}
            </div>
          </div>
        </div>
        <Daily daily={daily} />
      </div>
    );
  }
}

Forecast.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  current: PropTypes.shape({
    temp: PropTypes.number.isRequired,
    weather: PropTypes.array,
  }).isRequired,
  daily: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};
