// controllers/paquetes.controller.js
const Paquete = require('../models/paquete.model');

const esObjectId = (id) => /^[0-9a-fA-F]{24}$/.test(id);

exports.crearPaquete = async (req, res) => {
  try {
    const nuevo = await Paquete.create(req.body);
    return res.status(201).json(nuevo);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: 'numeroGuia ya existe' });
    }
    return res.status(400).json({ message: err.message });
  }
};

exports.obtenerPaquetes = async (_req, res) => {
  const paquetes = await Paquete.find()
    .populate('repartidorAsignado', 'nombre identificacion');
  return res.json(paquetes);
};

exports.obtenerPaquetePorId = async (req, res) => {
  const { id } = req.params;
  const filtro = esObjectId(id) ? { _id: id } : { numeroGuia: id };
  const paquete = await Paquete.findOne(filtro)
    .populate('repartidorAsignado', 'nombre identificacion');
  if (!paquete) return res.status(404).json({ message: 'Paquete no encontrado' });
  return res.json(paquete);
};

exports.actualizarEstadoPaquete = async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;
  if (!estado) return res.status(400).json({ message: 'Falta el campo estado' });

  const filtro = esObjectId(id) ? { _id: id } : { numeroGuia: id };
  const actualizado = await Paquete.findOneAndUpdate(
    filtro,
    { $set: { estado } },
    { new: true, runValidators: true }
  );
  if (!actualizado) return res.status(404).json({ message: 'Paquete no encontrado' });
  return res.json(actualizado);
};
