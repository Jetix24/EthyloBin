const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/compostaje', async (req, res) => {
  try {
    const response = await axios.get('http://192.168.251.199:5000/compostaje');
    console.log('Datos obtenidos:', response.data); // Imprime los datos en consola
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data:', error); // Imprime el error en consola
    res.status(500).send('Error fetching data');
  }
});

module.exports = router;