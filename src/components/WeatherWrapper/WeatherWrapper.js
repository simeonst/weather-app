import React, { Component } from "react";
import Forecast from "../Current/Current";
import Daily from "../Daily/Daily";
import "./WeatherWrapper.scss";

const coordinates = {
  VAN: {
    lat: 49.2827,
    lon: -123.1207,
  },
  TOR: {
    lat: 43.6532,
    lon: -79.3832,
  },
  BEL: {
    lat: 44.8125,
    lon: 20.4612,
  },
};

export default class WeatherWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCity: "VAN",
      data: [],
      loading: true,
      error: "",
    };
  }

  async componentDidMount() {
    const { selectedCity } = this.state;
    const { lat, lon } = coordinates[selectedCity];
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

  handleCityClick = async (newCity) => {
    const { selectedCity } = this.state;
    if (newCity !== selectedCity) {
      this.setState({ loading: true, error: "" });
      const { lat, lon } = coordinates[newCity];
      const exclude = "minutely,hourly,alerts";

      try {
        const url = `${process.env.REACT_APP_API_URL}/onecall?lat=${lat}&lon=${lon}&exclude=${exclude}&units=metric&appid=${process.env.REACT_APP_API_KEY}`;
        const response = await fetch(url);

        if (!response.ok) {
          throw Error(response.statusText);
        }

        const json = await response.json();
        this.setState({ loading: false, data: json, selectedCity: newCity });
      } catch (error) {
        console.log(error);
        this.setState({
          error: "Whoops, something went wrong, please try again later",
          loading: false,
        });
      }
    }

    return;
  };

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
          <span onClick={() => this.handleCityClick("VAN")}>Vancouver</span>
          <span onClick={() => this.handleCityClick("TOR")}>Toronto</span>
          <span onClick={() => this.handleCityClick("BEL")}>Belgrade</span>
        </div>
        <div className="forecast">{renderForecast()}</div>
      </div>
    );
  }
}
