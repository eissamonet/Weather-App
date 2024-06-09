//state
let currentCity = "Chicago";
let units = "imperial";

//selectors
let city = document.querySelector('.weather-city');
let datetime = document.querySelector('.weather-datetime');
let weather_forecast = document.querySelector('.weather_forecast');
let weather_temp = document.querySelector('.weather_temp');
let weather_icon = document.querySelector('.weather_icon');
let weather_minmax = document.querySelector('.weather_minmax');
let weather_realfeel = document.querySelector('.weather_realfeel');
let weather_humidity = document.querySelector('.weather_humidity');
let weather_wind = document.querySelector('.weather_wind');
let weather_pressure = document.querySelector('.weather_pressure')



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
function convertCountryCode(country){
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
    weather_forecast.innerHTML = `<p>${data.weather[0].main}`
    weather_temp.innerHTML = `${data.main.temp.toFixed()}°F`
    weather_icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png"/>`
    weather_minmax.innerHTML = `<p>Min: ${data.main.temp_min.toFixed()}°F | Max: ${data.main.temp_max.toFixed()}°F`
    weather_realfeel.innerHTML = `${data.main.feels_like.toFixed()}°F`
    weather_humidity.innerHTML = `${data.main.humidity}%`
    weather_wind.innerHTML = `${data.wind.speed} m/s`
    weather_pressure.innerHTML = `${data.main.pressure} hPa`
})
}

document.body.addEventListener('load', getWeather())

