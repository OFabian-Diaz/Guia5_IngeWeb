// routes/repartidores.routes.js
const { Router } = require('express');
const { obtenerUbicaciones, crearRepartidor } = require('../controllers/repartidores.controller');

const router = Router();

router.get('/ubicaciones', obtenerUbicaciones);
router.post('/', crearRepartidor); // opcional: útil para insertar datos de prueba

module.exports = router;
