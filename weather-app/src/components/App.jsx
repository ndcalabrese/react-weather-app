import WeatherCard from "./WeatherCard";
import ZipCodeForm from "./ZipCodeForm";
import React, { useState } from "react";

function App() {
    
    const [userInput, setUserInput] = useState({
        value: "",
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [weatherData, setWeatherData] = useState({});

    function handleSubmission(event, zip) {
        event.preventDefault();
        console.log(zip);
        setIsSubmitted(true);
        fetchWeather(zip);
    }

    function checkMaxChars(event) {
        let maxLength = 5;
        if (userInput.value.length > maxLength) {
            setUserInput({
                ...userInput,
                value: userInput.value.slice(0, maxLength),
            });
        } else {
            setUserInput({
                ...userInput,
                value: event.target.value,
            });
        }
    }

    // Yes, exposed API keys are poor practice
    const apiKey = "a26bdd763250fea9fb205ae29c93bddf";

    // Checks to see if more than 5 characters were entered into
    // the input box, and if true, removes the last character.
    // maxLength attribute does not work on number input boxes

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
                                currentConditions: data.current.weather[0].main,
                                todaysHigh: Math.round(data.daily[0].temp.max),
                                currentlyFeelsLike: Math.round(data.current.feels_like),
                                currentHumidity: data.current.humidity,
                                todaysLow: Math.round(data.daily[0].temp.min),
                            };
                            setWeatherData(extractedData);
                        });
                })
                .catch((error) => {
                    console.error("Request failed", error);
                });
        }

    return (
        <div className="app">
            <h1>Weather App</h1>
            <div id="form-container">
                <ZipCodeForm
                    onSubmit={handleSubmission}
                    userInput={userInput.value}
                    checkChars={(event) => checkMaxChars(event)}
                />
            </div>
            <WeatherCard
                isSubmitted={isSubmitted}
                weatherData={weatherData}
            />
        </div>
    );
}

export default App;
