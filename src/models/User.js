//en este archivo se define el modelo de los usuarios, se emcripta la constraseña y se compara

const { Schema, model } = require('mongoose');
const bcryptjs = require('bcryptjs');

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

// cifrado de contraseña
userSchema.methods.encryptPassword = async function (password) {
  const salt = await bcryptjs.genSalt(5); // genera el salt
  return await bcryptjs.hash(password, salt); // retorna el password cifrado
};

// comparar contraseñas ingresadas con la de la base de datos
userSchema.methods.matchPassword = async function (password) {
  return await bcryptjs.compare(password, this.password);
};

module.exports = model('User', userSchema);
