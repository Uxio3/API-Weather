'use strict';
// Mi api key
const api_key = "60d91f0bc581897b038b5d37b7cc2450";
// Declaro variables para el html
const imgHtml = document.getElementById("img");
const temp = document.getElementById("temp");
const weather = document.getElementById("weather");
// Función para sacar los datos del tiempo
async function getData(lat, lon) {
    const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&lang=es&units=metric&appid=${api_key}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();

        // Imprimir temperatura en html
        temp.innerHTML = Math.round(result.current.temp) + 'º Celsius';
        // Imprimir tiempo en html
        weather.innerHTML = result.current.weather[0].description;
        // Saco el ícono del tiempo
        const img = `https://openweathermap.org/img/wn/${result.current.weather[0].icon}@2x.png`;
        imgHtml.src = img;


    } catch (error) {
        console.error(error.message);
    }
}
// Función para sacar la ubicación del dispositivo y llamada a la función getData()
navigator.geolocation.getCurrentPosition(position => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    getData(lat, lon);
});