function WeatherCard({ isSubmitted, weatherData }) {
    function decodeUnixDate (unixDate, timezone) {
        const ms = unixDate * 1000;
        const longDate = new Date(ms);
        let dateOptions = {
            day: "numeric",
            weekday: "long",
            year: "numeric",
            month: "long",
            hour: "2-digit",
            minute: "2-digit",
            timeZone: timezone,
        }
        const shortDate = longDate.toLocaleString("en-US", dateOptions);
        return shortDate;
    }
    
    if (isSubmitted) {
        return (
            <div className="weather-card-container">
                <div className="weather-card-container-border">
                    <div className="weather-card-container-gradient">
                        <div className="weather-card-container-bg">
                            <div id="location-weather">
                                <div className="location-navbar">
                                    <div className="location-heading">
                                        <h2 className="location-name">
                                            {weatherData.name}
                                        </h2>
                                        <p className="weather-location-date">
                                            {decodeUnixDate(weatherData.date, weatherData.timezone)}
                                        </p>
                                    </div>
                                </div>
                                <div className="location-body">
                                    <div className="location-temperature">
                                        <p className="current-temp">
                                            Currently: {weatherData.currentTemp}{" "}
                                            &#176;F, Feels Like: {weatherData.currentlyFeelsLike} &#176;F
                                        </p>
                                    </div>
                                    <div className="location-conditions">
                                        <p className="current-condition">
                                            Current Conditions: {weatherData.currentConditions}
                                        </p>
                                        <p className="high-low-temp">
                                            Today's High: {weatherData.todaysHigh}{" "}
                                            &#176;F
                                        </p>
                                        <p className="high-low-temp">
                                            Today's Low: {weatherData.todaysLow} &#176;F
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default WeatherCard;
