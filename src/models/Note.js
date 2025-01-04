// en este archivo se define el modelo de las notas

const {schema, model} = require('mongoose');

const noteSchema = new schema({
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

module.export = model('note', noteSchema);