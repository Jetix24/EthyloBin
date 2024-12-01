const express = require('express');
const cors = require('cors');
const compostajeRoute = require('./src/route'); // Asegúrate de que la ruta sea correcta
const app = express();

// Configura CORS
app.use(cors());

// Configura las rutas
app.use('/api', compostajeRoute);

// Inicia el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});