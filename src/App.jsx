import { useState } from "react";
import "./App.css";

import searchIcon from "./assets/search.png";
import clearIcon from "./assets/clear.png";
import cloudIcon from "./assets/cloud.png";
import drizzleIcon from "./assets/drizzle.png";
import rainIcon from "./assets/rain.png";
import windIcon from "./assets/wind.png";
import snowIcon from "./assets/snow.png";
import humidityIcon from "./assets/humidity.png";

const WeatherDetails = ({ icon, temp, city, country, lat, lng, humidity, windSpeed }) => {
  return (
    <>
      <div className="image">
        <img src={icon} alt="Weather Icon" />
      </div>
      <div className="temp">{temp} °C</div>
      <div className="location">{city}</div>
      <div className="country">{country}</div>
      <div className="cord">
        <div>
          <span className="lat">Latitude: </span>
          <span>{lat}</span>
        </div>
        <div>
          <span className="lng">Longitude: </span>
          <span>{lng}</span>
        </div>
      </div>
      <div className="data-container">
        <div className="element">
          <img src={humidityIcon} alt="Humidity Icon" className="icon" />
          <div className="data">
            <div className="humidity-percent">{humidity}%</div>
            <div className="text">Humidity</div>
          </div>
        </div>

        <div className="element">
          <img src={windIcon} alt="Wind Icon" className="icon" />
          <div className="data">
            <div className="wind-speed">{windSpeed} km/h</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </>
  );
};

function App() {
  const api_key = "eb8a1722c54a869f3b1d3fbbb6bc2c44";

  const [text, setText] = useState("Chennai");
  const [icon, setIcon] = useState(snowIcon);
  const [temp, setTemp] = useState(0);
  const [city, setCity] = useState("Chennai");
  const [country, setCountry] = useState("IN");
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [humidity, setHumidity] = useState(50);
  const [windSpeed, setWindSpeed] = useState(5);
  const [cityNotFound, setCityNotFound] = useState(false);
  const [loading, setLoading] = useState(false);

  const search = async () => {
    setLoading(true);
    setCityNotFound(false);
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=metric`;

    try {
      let res = await fetch(url);
      let data = await res.json();
      if (data.cod === "404") {
        setCityNotFound(true);
        setLoading(false);
      } else {
        setCity(data.name);
        setCountry(data.sys.country);
        setLat(data.coord.lat);
        setLng(data.coord.lon);
        setTemp(data.main.temp);
        setHumidity(data.main.humidity);
        setWindSpeed(data.wind.speed);
        setIcon(getWeatherIcon(data.weather[0].main));
        setLoading(false);
      }
    } catch (error) {
      console.error("An error occurred: ", error.message);
      setLoading(false);
    }
  };

  const getWeatherIcon = (weatherCondition) => {
    switch (weatherCondition) {
      case "Clouds":
        return cloudIcon;
      case "Drizzle":
        return drizzleIcon;
      case "Rain":
        return rainIcon;
      case "Snow":
        return snowIcon;
      case "Clear":
        return clearIcon;
      default:
        return snowIcon;
    }
  };

  const handleCity = (e) => {
    setText(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") search();
  };

  return (
    <div className="container">
      <div className="input-container">
        <input
          type="text"
          className="cityInput"
          placeholder="Search City"
          onChange={handleCity}
          value={text}
          onKeyDown={handleKeyDown}
        />
        <div className="search-icon" onClick={search}>
          <img src={searchIcon} alt="search" />
        </div>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : cityNotFound ? (
        <div>City not found. Please try again.</div>
      ) : (
        <WeatherDetails
          icon={icon}
          temp={temp}
          city={city}
          country={country}
          lat={lat}
          lng={lng}
          humidity={humidity}
          windSpeed={windSpeed}
        />
      )}

      <p className="copyright">
        Designed by <span><a href="https://www.gobalakrishnan.co/">Gobala Krishnan</a></span>
      </p>
    </div>
  );
}

export default App;
