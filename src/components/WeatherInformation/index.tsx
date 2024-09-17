import React from "react";
import { useWeatherInformation } from "../WeatherInformation/weatherInformationContext";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "./index.module.scss";
import { WeatherInformationContextType } from "../../types";


function WeatherInformation() {
  const { currentData, currentAirQuality }: WeatherInformationContextType = useWeatherInformation();

  function showAsTemperature(temp: number): string {
    return `${Math.round(temp)}°C`
  }

  const hasData = (): boolean => {
    return (Object.keys(currentData).length > 0) && currentData.cod === 200;
  };

  const backgroundImage = () => {
    const knownWeather = ["clouds", "rain", "clear", "snow"]
    if(currentData?.weather && knownWeather.includes(currentData?.weather[0]?.main.toLowerCase())) {
      return `${currentData?.weather[0]?.main.toLowerCase()}.jpg`
    }

    return "clear.jpg";
  }

  const attire = () => {
    if(currentData?.weather[0]?.main === "Rain") {
      return "Rain coat"
    }

    if(currentData?.weather[0]?.main === "Snow" || currentData.main.temp < 40) {
      return "Heavy Jacket"
    }

    if(currentData.main.temp > 70) {
      return "Flipflops"
    }

    return "Casual"
  }

  const customStyle = {
    backgroundImage: `url(/images/${backgroundImage()})`,
  }

  return (
    <Row
      className={`${styles.detailsRow} py-5`}
      style={customStyle}
    >
      {hasData() &&
        <Col className={styles.details} xs={12}>
          <h3>{currentData.name}</h3>
          <h2 key={currentData.main.temp}>{showAsTemperature(currentData.main.temp)}</h2>
          <p className="text-capitalize">{currentData.weather[0].description}</p>
          <div className="mb-3">
            <span>H: {showAsTemperature(currentData.main.temp_max)}</span>
            <span>L: {showAsTemperature(currentData.main.temp_min)}</span>
          </div>

          <div>
            <span>Wear: {attire()}</span>
            {currentAirQuality! > 3 &&
              <p>Air Quality is poor, wear a facemask!</p>
            }
          </div>
        </Col>
      }

      {currentData?.cod === "404" &&
        <Col className={styles.details} xs={12}>
          <h3 className="text-capitalize">{currentData.message}</h3>
        </Col>
      }
    </Row>
  )
}

export default WeatherInformation;
