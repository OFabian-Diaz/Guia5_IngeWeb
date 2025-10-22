const { Schema, model } = require('mongoose');

const repartidorSchema = new Schema({
  nombre: { type: String, required: true },
  identificacion: { type: String, required: true, unique: true },
  ubicacionActual: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number], // [longitud, latitud]
      required: true
    }
  }
}, { timestamps: true });

// Índice geoespacial (para consultas de ubicación)
repartidorSchema.index({ ubicacionActual: '2dsphere' });

module.exports = model('Repartidor', repartidorSchema);
