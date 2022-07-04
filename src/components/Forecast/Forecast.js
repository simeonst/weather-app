import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Forecast.scss";
import Daily from "../Daily/Daily";
import Icon from "../Icon/Icon";

export default class Forecast extends Component {
  render() {
    const { loading, error, current, daily } = this.props;

    if (loading || error) {
      return (
        <div className="forecast--loading">
          {loading && <span>Loading...</span>}
          {error && <span>{error}</span>}
        </div>
      );
    }

    const temp = current?.temp;
    const weather = current?.weather?.[0]?.main;
    const code = current?.weather?.[0]?.id;
    console.log(current);

    const { dt, sunrise, sunset } = current?.dt;
    const isNight = dt > sunrise && dt < sunset;

    return (
      <>
        <div className="current">
          Today
          <div className="current-icon-wrap">
            {weather && (
              <Icon weather={weather} code={code} isNight={isNight} isToday />
            )}
            <div className="current-data">
              {temp && <span>{Math.round(temp)}°</span>}
              {weather && <span>{weather}</span>}
            </div>
          </div>
        </div>
        <Daily daily={daily} />
      </>
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
