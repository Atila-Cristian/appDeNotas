const usersCtrl = {};

const User = require('../models/User') // inporta el modelo de los usuarios

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
      res.render('users/signup', { // devolver al formulario lo siguiente 
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
    res.redirect('/users/signin');
 }else {
  const newUser = new User({name, email, password});
  newUser.password = await newUser.encryptPassword(password)
  await newUser.save();
  req.flash('succes_msg', 'you are registered')
  res.redirect('users/signin')
 }

}

usersCtrl.renderSignInForm = (req, res) => {
  res.render('users/signin')
}

usersCtrl.signin = (req, res) => {
  res.send('signin')
}

usersCtrl.logout = (req, res) => {
  res.send('logout')
}



module.exports = usersCtrl;