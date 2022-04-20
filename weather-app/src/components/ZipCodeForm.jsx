function ZipCodeForm({ onSubmit, userInput, checkChars}) {

    return (
        <form id="zip-input-form" onSubmit={(event) => onSubmit(event, userInput)}>
            <input
                id="text-box"
                type="number"
                inputMode="numeric"
                placeholder="5-Digit ZIP code"
                onChange={checkChars}
                value={userInput}
            />
            <button id="search-button" type="submit">
                Search
            </button>
        </form>
    );
}

export default ZipCodeForm;


