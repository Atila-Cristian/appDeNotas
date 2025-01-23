const helpers = {};

// middleware para verificar que los usuarios esten autenticados 
helpers.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next(); 
  }
  req.flash('error_msg', 'you are not logged in')
  res.redirect('/users/signin')
}

module.exports = helpers;