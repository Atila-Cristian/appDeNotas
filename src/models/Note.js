// en este archivo se define el modelo de las notas

const {Schema, model} = require('mongoose');

const noteSchema = new Schema({
  title: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

}, {
  timestamps: true // añade la fecha de creacion y actualizacion
})

module.exports = model('note', noteSchema);