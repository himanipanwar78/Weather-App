import React, { useState } from 'react';
import axios from 'axios';

function Weather() {
  const [city, setCity] = useState(''); // For storing city input
  const [weather, setWeather] = useState(null); // For storing weather data
  const [error, setError] = useState(''); // For handling errors

  const handleChange = (event) => {
    setCity(event.target.value);
  };

  const fetchWeather = async () => {
    if (!city) {
      setError('Please enter a city name.');
      return;
    }

    setError(''); // Clear previous errors
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=22302a59c59c1993de9764335df2f5d9&units=metric`
      );
      setWeather(response.data); // Save weather data
    } catch (error) {
      setError('Error fetching weather data. Please check the city name.');
      setWeather(null); // Clear weather data on error
    }
  };

  const handleClick = () => {
    fetchWeather();
  };

  return (
    <div className="container">
      <h1>Weather App</h1>
      <div className="sub-container">
        <input
          type="text"
          placeholder="Enter Your City"
          value={city}
          onChange={handleChange}
        />
        <button onClick={handleClick}>Get Weather</button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {weather && (
        <div className="weather-info">
          <h3>{weather.name}</h3>
          <p>Temperature is {weather.main.temp}°C</p>
          <p>{weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

export default Weather;
