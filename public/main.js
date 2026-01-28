'use strict';

// Declaro variables para el html
const imgHtml = document.getElementById("img");
const temp = document.getElementById("temp");
const weather = document.getElementById("weather");

// Función para sacar los datos del tiempo
async function getData(lat, lon) {
    
    try {
        const response = await fetch(`http://localhost:3000/api/tiempo?lat=${lat}&lon=${lon}`);

        if (!response.ok) {
            throw new Error('Error al obtener los datos del backend');
        }

        const result = await response.json();

        // Imprimir temperatura en html
        temp.innerHTML = 'Temperatura: ' + Math.round(result.current.temp) + 'º Celsius';
        // Imprimir tiempo en html
        weather.innerHTML = 'Nubosidad: ' + result.current.weather[0].description;
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