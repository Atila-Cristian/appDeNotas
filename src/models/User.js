//en este archivo se define el modelo de los usuarios, se emcripta la constraseña y se compara

const {schema, model} = require('mongoose');
const bcryptjs = require('bcryptjs');

const userSchema = new schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

model.exports = model('User', userSchema);


// sifrado de contraseña
userSchema.methods.ecryptedPassword = async password => {
  const salt = await bcryptjs.genSalt(5) // genera el salt
  return await bcryptjs.hash(password, salt); //retorna el password sifrado
}

// comparar contraseñas ingresadas con la de la base de datos
userSchema.mathods.matchPassword = async function(password){
 return await bcryptjs.compare(password, this.password)
}

