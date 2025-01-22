const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy

const User = require('../models/User')

//funcion para poder logear al usuario
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'

}, async (email, password, done) => {

  //validacion del maill
 const user = await User.findOne({email})
  if(!user) {
   return done(null, false, { message: 'Usuario no registrado'})
  } else {
    //validacion de la contraseña
    const match = await user.matchPassword(password)
    if(match){
      return done(null, user);
    } else {
      return done(null, false, { message: 'Contraseña incorrecta' })
    }

  }
  
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
})

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
      done(err, user);
  })
});