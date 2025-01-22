const usersCtrl = {};

const passport = require('passport');

const User = require('../models/User'); // inporta el modelo de los usuarios

usersCtrl.renderSignUpForm = (req, res) => {
  res.render('users/signup')
}

//validaciones de las contraseñas y registrar usuario
usersCtrl.signup = async (req, res) =>{
  const errors = []

  const {name, email, password, confirm_password} = req.body

  if (password != confirm_password){
      errors.push({text: 'password do not match'})
  }
  if (password.length < 4){
      errors.push({text: 'password must be at least 4 characters.'})
  }
  if (errors.length > 0 ){
     return res.render('users/signup', { // devolver al formulario lo siguiente 
        errors,
        name,
        email
      })
  }else {
    res.send('signup successfully');
  }
  
 const emailUser = await User.findOne({email: email});

 if  (emailUser) {
    req.flash('error_msg',  'the email is already in use');
   return res.redirect('/users/signin');
 }else {
  const newUser = new User({name, email, password});
  newUser.password = await newUser.encryptPassword(password)
  await newUser.save();
  req.flash('success_msg', 'you are registered')
  return res.redirect('users/signin');
 }

}

usersCtrl.renderSignInForm = (req, res) => {
  res.render('users/signin');
}

usersCtrl.signin = passport.authenticate('local', {
  failureRedirect: '/users/signin',
  successRedirect: '/notes',
  failureFlash: true
});


usersCtrl.logout = (req, res) => {
  req.logout();
  req.flash('seccess.msg', 'You are logged out now');
  res.redirect('/users/signin');
}



module.exports = usersCtrl;