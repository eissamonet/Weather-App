//state
let currentCity = "Chicago";
let units = "imperial";

//selectors
let city = document.querySelector('.weather-city');
let datetime = document.querySelector('.weather-datetime');
let weatherForecast = document.querySelector('.weather-forecast');

function convertTime(timeStamp, timezone){
    const convertTimeZone = timezone / 3600; //convert to hours

    const date = new Date(timeStamp * 1000);

    const options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        timeZone: `Etc/GMT${convertTimeZone >= 0? '-' : '+'}${Math.abs(convertTimeZone)}`,
        hour12: true,
    }
    return date.toLocaleString('en-US', options)
}

//convert country code to name
function convertCountryCode(state){
    let regionNames = new Intl.DisplayNames(['en'], {type: 'region'});
    return regionNames.of(country)
}


function getWeather(){
   const apiKey = "92c39c28b00faf2a7003a9133027497d"

fetch(`https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${apiKey}&
units=${units}`).then(res => res.json()).then
(data => {
    city.innerHTML = `${data.name}, ${convertCountryCode(data.sys.country)}`
    datetime.innerHTML = convertTime(data.dt, data.timezone);
})
}

document.body.addEventListener('load', getWeather())

