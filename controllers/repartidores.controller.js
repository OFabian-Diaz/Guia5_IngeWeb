// controllers/repartidores.controller.js
const Repartidor = require('../models/repartidor.model');

exports.obtenerUbicaciones = async (_req, res) => {
  const lista = await Repartidor.find({}, { _id: 0, nombre: 1, ubicacionActual: 1 });
  return res.json(lista);
};

// (Opcional para tus pruebas: crear un repartidor)
exports.crearRepartidor = async (req, res) => {
  try {
    const rep = await Repartidor.create(req.body);
    return res.status(201).json(rep);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
