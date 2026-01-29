'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());

const API_KEY = process.env.API_KEY;
// Sirve los archivos estáticos de la carpeta public
app.use(express.static(path.join(__dirname, 'public')));

// Ruta raíz: devuelve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });

app.get('/api/tiempo', async (req, res) => {
    try {
        console.log('Query recibida:', req.query);
        // Sacar lat y lon de la query del req
        const { lat, lon } = req.query;

        // Compruebo que existan lat y lon
        if (!lat || !lon) {
            return res.status(400).json({ error: 'Faltan lat o lon' });
        }

        // Construir URL para OpenWeather
        const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&lang=es&units=metric&appid=${API_KEY}`;

        const resultado = await fetch(url);

        if (!resultado.ok) {
            const errorData = await resultado.text();
            console.error('Error de OpenWeather API:', resultado.status, errorData);
            throw new Error(`Error al llamar a OpenWeather API: ${resultado.status}`);
        }

        const datos = await resultado.json();

        // Envio datos al frontend
        res.json(datos);

    } catch (error) {
        console.error('Error en /api/tiempo:', error.message);
        res.status(500).json({ error: 'Error interno del servidor', message: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`App running on port http://localhost:${PORT}/api/tiempo`);
});