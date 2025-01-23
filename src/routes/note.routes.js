const { Router } = require('express')
const router = Router()

const  { renderNoteForm, 
          createNewNote, 
          renderNotes, 
          renderEditForm, 
          updateNote, 
          deleteNote 
        } = require('../controllers/note.controller');
 
const {isAuthenticated} = require('../helpers/auth');

//formulario para crear una nota nueva
router.get('/notes/add', isAuthenticated, renderNoteForm);

//funcion de guardado de notas creadas
router.post('/notes/new-note', isAuthenticated, createNewNote);

//todas las notas 
router.get('/notes', isAuthenticated, renderNotes);

// editar notas
router.get('/notes/edit/:id', isAuthenticated, renderEditForm);

router.put('/notes/edit/:id', isAuthenticated, updateNote);

// borrar notas
router.delete('/notes/delete/:id', isAuthenticated, deleteNote);

module.exports = router

// get (pedir datos)
// post (enviar datos) 
// put (actualizar datos.
// delete (borrar datos)