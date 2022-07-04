import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Forecast.scss";
import Daily from "../Daily/Daily";
import Icon from "../Icon/Icon";

export default class Forecast extends Component {
  render() {
    const { current, daily } = this.props;
    const temp = current?.temp;
    const weather = current?.weather?.[0]?.main;
    const code = current?.weather?.[0]?.id;

    return (
      <div className="forecast">
        <div className="current">
          Today
          <div className="current-icon-wrap">
            {weather && <Icon weather={weather} code={code} />}
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
  }),
  daily: PropTypes.arrayOf(PropTypes.shape({})),
};
