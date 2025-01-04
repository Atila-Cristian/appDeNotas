const { Router } = require('express')
const router = Router();

const { renderIndex, renderAbout } = require('../controllers/index.controller') //importa las funciones de index.controller

router.get('/', renderIndex); // cuando se haga una peticion get a la raiz del servidor, se ejecuta la funcion renderIndex

router.get('/about', renderAbout);

module.exports = router;
