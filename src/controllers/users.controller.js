const usersCtrl = {};

const passport = require('passport');
const User = require('../models/User'); // Importa el modelo de usuarios


// Renderizar el formulario de registro
usersCtrl.renderSignUpForm = (req, res) => {
  res.render('users/signup');
};

// Validaciones de las contraseñas y registro de usuario
usersCtrl.signup = async (req, res) => {
  const errors = [];
  const { name, email, password, confirm_password } = req.body;

  console.log(req.body);

  // Validaciones de contraseñas
  if (password !== confirm_password) {
    errors.push({ text: 'Passwords do not match' });
  }
  if (password.length < 4) {
    errors.push({ text: 'Password must be at least 4 characters.' });
  }

  // Si hay errores, renderizar el formulario con los errores
  if (errors.length > 0) {
    return res.render('users/signup', { 
      errors,
      name,
      email
    });
  }

  // Verificar si el email ya está registrado
  const emailUser = await User.findOne({ email: email });
  if (emailUser) {
    req.flash('error_msg', 'The email is already in use');
    return res.redirect('/users/signin');
  }

  // Crear y guardar un nuevo usuario
  const newUser = new User({ name, email, password });
  newUser.password = await newUser.encryptPassword(password);
  await newUser.save();

  // Confirmar el registro y redirigir al formulario de inicio de sesión
  req.flash('success_msg', 'You are registered');
  return res.redirect('/users/signin');
};

// Renderizar el formulario de inicio de sesión
usersCtrl.renderSignInForm = (req, res) => {
  res.render('users/signin');
};

// Manejo del inicio de sesión con Passport
usersCtrl.signin = passport.authenticate('local', {
  failureRedirect: '/users/signin',
  successRedirect: '/notes',
  failureFlash: true
});

// Cerrar sesión
usersCtrl.logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      req.flash('error_msg', 'There was an error logging out.');
      return res.redirect('/users/signin');
    }
    req.flash('success_msg', 'You are logged out now');
    res.redirect('/users/signin');
  });
};

module.exports = usersCtrl;
