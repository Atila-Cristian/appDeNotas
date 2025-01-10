const { Router } = require('express')
const router = Router()

const  { renderNoteForm, 
          createNewNote, 
          renderNotes, 
          renderEditForm, 
          updateNote, 
          deleteNote 
        } = require('../controllers/note.controller');

// nota nueva
router.get('/notes/add', renderNoteForm);


router.post('/notes/new-note', createNewNote); //resolver el herror con la rutas note -- notes

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