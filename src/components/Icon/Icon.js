import PropTypes from "prop-types";
import React, { Component } from "react";
import atmosphere from "../../assets/icons/atmosphere.png";
import clouds from "../../assets/icons/clouds.png";
import drizzle from "../../assets/icons/drizzle.png";
import moon from "../../assets/icons/moon.png";
import rain from "../../assets/icons/rain.png";
import snow from "../../assets/icons/snow.png";
import sun from "../../assets/icons/sun.png";
import thunderstorm from "../../assets/icons/thunderstorm.png";

const getIcon = (code, isToday, isNight) => {
  if (code === 800) {
    if (isToday && isNight) {
      return moon;
    }
    return sun;
  }

  let icon = "";
  const codeGroup = code.toString()[0];
  switch (codeGroup) {
    case "2":
      icon = thunderstorm;
      break;
    case "3":
      icon = drizzle;
      break;
    case "5":
      icon = rain;
      break;
    case "6":
      icon = snow;
      break;
    case "7":
      icon = atmosphere;
      break;
    case "8":
      icon = clouds;
      break;
    default:
      icon = sun;
      break;
  }
  return icon;
};

export default class Icon extends Component {
  render() {
    const { size } = this.props;
    const imgSize = size === "lg" ? "150px" : "75px";

    const { code, weather } = this.props;
    const iconSrc = getIcon(code);

    return <img src={iconSrc} width={imgSize} height={imgSize} alt={weather} />;
  }
}

Icon.propTypes = {
  weather: PropTypes.string.isRequired,
  code: PropTypes.number.isRequired,
  size: PropTypes.oneOf(["sm", "lg"]),
  isToday: PropTypes.bool,
  isNight: PropTypes.bool,
};

Icon.defaultProps = {
  size: "lg",
  isToday: false,
  isNight: false,
};
