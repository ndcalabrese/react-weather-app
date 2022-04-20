import WeatherData from "./WeatherData";
import React from "react";

function WeatherCard({ isSubmitted, zip }) {
    console.log(isSubmitted)
    if (isSubmitted) {
        // Yes, exposed API keys are poor practice
        const apiKey = "1fd90265a1a504e72f9d580f27492cd4";

        function fetchWeather(zip) {
            fetch(
                `https://api.openweathermap.org/geo/1.0/zip?zip=${zip},US&appid=${apiKey}`
            )
                .then((response) => response.json())
                .then((geoData) => {
                    const locationInfo = {
                        latitude: geoData.lat,
                        longitude: geoData.lon,
                        name: geoData.name,
                    };
                    return locationInfo;
                })
                .then((locationInfo) => {
                    fetch(
                        `https://api.openweathermap.org/data/2.5/onecall?lat=${locationInfo.latitude}&lon=${locationInfo.longitude}&units=imperial&exclude=hourly,minutely&appid=${apiKey}`
                    )
                        .then((response) => response.json())
                        .then((data) => {
                            data.name = locationInfo.name;
                            let extractedData = {
                                name: data.name,
                                date: data.current.dt,
                                currentTemp: Math.round(data.current.temp),
                                currentHumidity: data.current.humidity,
                                currentConditions: data.current.weather[0].main,
                                todaysHigh: Math.round(data.daily[0].temp.max),
                                todaysLow: Math.round(data.daily[0].temp.min),
                            };
                            renderWeatherData(extractedData);
                        });
                })
                .catch((error) => {
                    console.error("Request failed", error);
                });
        }

        function renderWeatherData(data) {
            console.log(data);
            return (<WeatherData data={data} />
            );
        }

        return (
            <div className="weather-card-container">
                <div className="weather-card-container-border">
                    <div className="weather-card-container-gradient">
                        <div className="weather-card-container-bg">
                            <div>{fetchWeather(zip)}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default WeatherCard;
