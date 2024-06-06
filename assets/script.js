function getWeather(){
   const apiKey = "92c39c28b00faf2a7003a9133027497d"

fetch(`https://api.openweathermap.org/data/2.5/weather?q=Chicago&appid=${apiKey}&units=imperial`).then(res => res.json()).then(data => console.log(data))
}

document.body.addEventListener('load', getWeather())