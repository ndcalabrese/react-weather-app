function Date ({unixDate}) {
    const ms = unixDate * 1000;
    const longDate = new Date(ms);
    let dateOptions = {
        day: "numeric",
        weekday: "long",
        year: "numeric",
        month: "long",
    }
    const shortDate = longDate.toLocaleString("en-US", dateOptions);
    return (
        <p>{shortDate}</p>
        );
}

export default Date;