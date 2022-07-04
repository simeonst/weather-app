import React, { Component } from "react";
import Forecast from "../Current/Current";
import Daily from "../Daily/Daily";
import "./WeatherWrapper.scss";

export default class WeatherWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCity: {
        lat: 49.28,
        lon: -123.12,
      },
      data: [],
      loading: true,
      error: "",
    };
  }

  async componentDidMount() {
    const { lat, lon } = this.state.selectedCity;
    const exclude = "minutely,hourly,alerts";

    try {
      const url = `${process.env.REACT_APP_API_URL}/onecall?lat=${lat}&lon=${lon}&exclude=${exclude}&units=metric&appid=${process.env.REACT_APP_API_KEY}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw Error(response.statusText);
      }

      const json = await response.json();
      this.setState({ loading: false, data: json });
    } catch (error) {
      console.log(error);
      this.setState({
        error: "Whoops, something went wrong, please try again later",
        loading: false,
      });
    }
  }

  render() {
    const { data, loading, error } = this.state;
    const { current, daily } = data;

    const renderForecast = () => {
      if (loading) {
        return (
          <div className="info">
            <span>Loading...</span>
          </div>
        );
      }

      if (error) {
        return (
          <div className="info">
            <span>{error}</span>
          </div>
        );
      }

      return (
        <>
          <Forecast current={current} />
          <Daily daily={daily} />
        </>
      );
    };

    return (
      <div className="weather-wrapper">
        <div className="locations">
          <span>Ottawa</span>
          <span>Moscow</span>
          <span>Tokyo</span>
        </div>
        <div className="forecast">{renderForecast()}</div>
      </div>
    );
  }
}
