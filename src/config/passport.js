const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/User');

// Función para logear al usuario
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  // Validación del email
  const user = await User.findOne({ email });
  if (!user) {
    return done(null, false, { message: 'User not registered.' });
  } else {
    // Validación de la contraseña
    const match = await user.matchPassword(password);
    if (match) {
      return done(null, user);
    } else {
      return done(null, false, { message: 'Incorrect password.' });
    }
  }
}));

// Serialización del usuario
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialización del usuario
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id); // Usando async/await
    if (!user) {
      return done(new Error('User not found'), null); // Manejo si no se encuentra el usuario
    }
    done(null, user);
  } catch (err) {
    done(err, null); // Si ocurre un error en la consulta
  }
});
