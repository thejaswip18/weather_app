import React, { useState } from 'react';
import "./Weather.css";
import sun from "../assets/sun.png";
import humidity from "../assets/humidity.png";
import wind from "../assets/wind.png";
import description from "../assets/description.png"
import country from "../assets/country.png"

const Weather = () => {
    const [city, setCity] = useState("bangalore");
    const [weatherInfo, setWeatherInfo] = useState(null);

    const fetchdata = async () => {
        const apiKey = "6d5e498436f7100742b90c3e55350705";
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        try {
            const response = await fetch(apiUrl);
            const finalData = await response.json();
            if (finalData.cod === 200) {
                setWeatherInfo(finalData);
                console.log(finalData);
            } else {
                console.log("City not found");
            }
        } catch (error) {
            console.log("Error fetching data:", error);
        }
    };

    return (
        <div className='card'>
            <div className='search'>
                <input
                    type="text"
                    placeholder='Search'
                    onChange={(e) => setCity(e.target.value)}
                />
                <button onClick={fetchdata}>Get Data</button>
            </div>

            <img src={sun} alt="" className='sun' />
            {weatherInfo && (
                <>
                    <p className='temp'>{Math.round(weatherInfo.main.temp)} <sup>o</sup> C</p>
                    <p className='place'>{weatherInfo.name}</p>
                    <div className='data'>
                        <div className='col'>
                            <img src={humidity} alt="" />
                            <div className='display'>
                                <p>{weatherInfo.main.humidity} %</p>
                                <span>Humidity</span>
                            </div>
                        </div>
                        <div className='col'>
                            <img src={wind} alt="" />
                            <div className='display'>
                                <p>{weatherInfo.wind.speed} Km/h</p>
                                <span>Wind Speed</span>
                            </div>
                        </div>
                        <div className='col'>
                            <img src={description} alt="" />
                            <div className='display'>
                                <p>{weatherInfo.weather[0].description}</p>
                                <span>Weather Description</span>
                            </div>
                        </div>
                        <div className='col'>
                            <img src={country} alt="" />
                            <div className='display'>
                                <p>{weatherInfo.sys.country}</p>
                                <span>Country</span>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Weather;
