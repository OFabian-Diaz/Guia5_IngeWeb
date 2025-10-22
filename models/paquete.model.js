const { Schema, model, Types } = require('mongoose');

// Subesquema para historial de ubicaciones
const ubicacionSchema = new Schema({
  lat: { type: Number, required: true },
  lon: { type: Number, required: true },
  fecha: { type: Date, default: Date.now }
}, { _id: false });

// Subesquema para remitente y destinatario
const personaSchema = new Schema({
  nombre: { type: String, required: true },
  direccion: { type: String, required: true },
  telefono: { type: String, required: true }
}, { _id: false });

// Subesquema para dimensiones del paquete
const dimensionesSchema = new Schema({
  alto: { type: Number, required: true },
  ancho: { type: Number, required: true },
  largo: { type: Number, required: true },
  peso: { type: Number, required: true }
}, { _id: false });

// Esquema principal del Paquete
const paqueteSchema = new Schema({
  numeroGuia: { type: String, required: true, unique: true },
  remitente: { type: personaSchema, required: true },
  destinatario: { type: personaSchema, required: true },
  dimensiones: { type: dimensionesSchema, required: true },
  estado: {
    type: String,
    enum: ['En bodega', 'En ruta', 'Entregado', 'Incidencia'],
    default: 'En bodega'
  },
  repartidorAsignado: { type: Types.ObjectId, ref: 'Repartidor' },
  historialUbicaciones: { type: [ubicacionSchema], default: [] }
}, { timestamps: true });

module.exports = model('Paquete', paqueteSchema);
