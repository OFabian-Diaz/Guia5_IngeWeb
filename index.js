const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
const paquetesRouter = require('./routes/paquetes.routes');
const repartidoresRouter = require('./routes/repartidores.routes');

app.use('/api/paquetes', paquetesRouter);
app.use('/api/repartidores', repartidoresRouter);


// Ruta base para probar
app.get('/', (req, res) => {
  res.json({ ok: true, api: 'Backend Logística', version: '1.0.0' });
});

// Variables del entorno
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

// Conexión a MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log(' Conectado a MongoDB');
    app.listen(PORT, () => console.log(` Servidor corriendo en http://localhost:${PORT}`));
  })
  .catch(err => console.error(' Error conectando a MongoDB:', err.message));
