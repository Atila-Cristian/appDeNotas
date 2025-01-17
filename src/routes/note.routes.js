const { Router } = require('express')
const router = Router()

const  { renderNoteForm, 
          createNewNote, 
          renderNotes, 
          renderEditForm, 
          updateNote, 
          deleteNote 
        } = require('../controllers/note.controller');

//formulario para crear una nota nueva
router.get('/notes/add', renderNoteForm);

//funcion de guardado de notas creadas
router.post('/notes/new-note', createNewNote);

//todas las notas 
router.get('/notes', renderNotes);

// editar notas
router.get('/notes/edit/:id', renderEditForm)

router.put('/notes/edit/:id', updateNote)

// borrar notas
router.delete('/notes/delete/:id', deleteNote)

module.exports = router

// get (pedir datos)
// post (enviar datos) 
// put (actualizar datos.
// delete (borrar datos)