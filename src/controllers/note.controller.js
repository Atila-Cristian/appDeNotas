const notesCtrl = {};

const note = require('../models/Note');

notesCtrl.renderNoteForm = (req, res) => {
  res.render('notes/new-note');
};

notesCtrl.createNewNote = async (req, res) => {
  const {title, description} = req.body;
  const newNote = new note({title, description});
  await newNote.save();
  res.send('new note')
};

notesCtrl.renderNotes =  async (req, res) => {
   const notes = await note.find(); 
   res.render('notes/all-notes', {notes});
};

notesCtrl.renderEditForm = (req, res) => {
  res.send('render edit form') 
};

notesCtrl.updateNote = (req, res) => {
  res.send('update note')
};

notesCtrl.deleteNote = (req, res) => {
  res.send('update note')
};

module.exports = notesCtrl;