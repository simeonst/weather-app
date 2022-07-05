import React, { Component } from "react";
import Forecast from "../Current/Current";
import Daily from "../Daily/Daily";
import Spinner from "../Spinner/Spinner";
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

    try {
      const data = await this.fetchWeatherData(selectedCity);
      this.setState({ loading: false, data: data });
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

      try {
        const data = await this.fetchWeatherData(newCity);
        this.setState({ loading: false, data: data, selectedCity: newCity });
      } catch (error) {
        console.log(error);
        this.setState({
          error: "Whoops, something went wrong, please try again later",
          loading: false,
        });
      }
    }
  };

  fetchWeatherData = async (selectedCity) => {
    const { lat, lon } = coordinates[selectedCity];
    const exclude = "minutely,hourly,alerts";
    const url = `${process.env.REACT_APP_API_URL}/onecall?lat=${lat}&lon=${lon}&exclude=${exclude}&units=metric&appid=${process.env.REACT_APP_API_KEY}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw Error(response.statusText);
    }

    const json = await response.json();
    return json;
  };

  render() {
    const { data, loading, error, selectedCity } = this.state;
    const { current, daily } = data;

    const renderForecast = () => {
      if (loading) {
        return (
          <div className="info">
            <Spinner />
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
          <span
            className={`city ${selectedCity === "VAN" ? "city--selected" : ""}`}
            onClick={() => this.handleCityClick("VAN")}
          >
            Vancouver
          </span>
          <span
            className={`city ${selectedCity === "TOR" ? "city--selected" : ""}`}
            onClick={() => this.handleCityClick("TOR")}
          >
            Toronto
          </span>
          <span
            className={`city ${selectedCity === "BEL" ? "city--selected" : ""}`}
            onClick={() => this.handleCityClick("BEL")}
          >
            Belgrade
          </span>
        </div>
        <div className="forecast">{renderForecast()}</div>
      </div>
    );
  }
}
