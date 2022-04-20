import WeatherCard from "./WeatherCard";
import ZipCodeForm from "./ZipCodeForm";
import React, { useState } from "react";

function App() {
    const [userInput, setUserInput] = useState({
        value: "",
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [submittedZip, setSubmittedZip] = useState({
        value: "",
    })

    // Checks to see if more than 5 characters were entered into
    // the input box, and if true, removes the last character.
    // maxLength attribute does not work on number input boxes
    function checkMaxChars(event) {
        let maxLength = 5;
        if (userInput.value.length > maxLength) {
            setUserInput({
                value: userInput.value.slice(0, maxLength),
            });
        } else {
            setUserInput({
                value: event.target.value,
            });
        }
    }

    function handleSubmission (event, zip) {
        event.preventDefault();
        setIsSubmitted(true);
        setSubmittedZip(zip);
    }

    return (
        <div className="App">
            <h1>Weather App</h1>
            <div id="form-container">
                <ZipCodeForm 
                    onSubmit={handleSubmission} 
                    userInput={userInput.value} 
                    checkChars={event => checkMaxChars(event)}
                />
            </div>
            <WeatherCard 
                isSubmitted={isSubmitted} 
                zip={submittedZip}
            />
        </div>
    );
}

export default App;
