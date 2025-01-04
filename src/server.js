const express = require('express');
const {engine} = require('express-handlebars'); // modulo de express para manejar vistas
const path = require('path'); // modulo de nodejs para manejar rutas 
// initializations

const app = express(); 


// settings

app.set('port', process.env.PORT || 4000); // si existe un puerto en el sistema lo usa, si no usa el 4000

app.set('views', path.join(__dirname, 'views')); // le dice a express donde esta la carpeta views

app.engine('.hbs', engine({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'), 
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs' // le dice a express que las vistas son .hbs
  }));

app.set('view engine', '.hbs') // le dice a express que el motor de vistas es .hbs

// midelewares

app.use(express.urlencoded({extended: false})); // convierte los datos que llegan en json

// global variables


// routes 

app.use(require('./routes/index.routes')); 

// static files 

app.use(express.static(path.join(__dirname, 'public'))); // le dice a express donde esta la carpeta public


module.exports = app; //exporta app para ser usado en otros archivos

