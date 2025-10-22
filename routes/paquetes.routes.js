// routes/paquetes.routes.js
const { Router } = require('express');
const {
  crearPaquete,
  obtenerPaquetes,
  obtenerPaquetePorId,
  actualizarEstadoPaquete
} = require('../controllers/paquetes.controller');

const router = Router();

router.post('/', crearPaquete);
router.get('/', obtenerPaquetes);
router.get('/:id', obtenerPaquetePorId);       
router.put('/:id', actualizarEstadoPaquete);   

module.exports = router;
