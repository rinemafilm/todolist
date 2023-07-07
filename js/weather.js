const weather = document.querySelector('.weather')
const API_KEY = 'd484b22fd5f0a4485796359179d42fb3'

function getWeather(latitude, longitude){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}8&appid=${API_KEY}&units=metric`)
    .then(res => res.json())
    .then(data => {
        const temp = data.main.temp
        const city = data.name
        weather.innerHTML = `${temp}°C ${city}`
    })
        

}

function saveCoords(coords){
    localStorage.setItem('coords', JSON.stringify(coords))
}

function geoSucces(position){
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude
    const coords = {
        latitude,
        longitude
    }

    getWeather(latitude, longitude)
    saveCoords(coords)
}

function geoError(){
    console.log('위치 정보 허용 필요')
}

function askCoords(){
    //
}

function loadCoords(){
    const loadCoords = localStorage.getItem('coords')
    if(loadCoords === null){
        askCoords()
    } else {
        const parseCoords = JSON.parse(loadCoords)
        getWeather(parseCoords.latitude, parseCoords.longitude)
    }
}

function init(){
    navigator.geolocation.getCurrentPosition(geoSucces, geoError)

    loadCoords()
}

init()