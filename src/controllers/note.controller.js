const notesCtrl = {};

const { request } = require('express');
const note = require('../models/Note');

notesCtrl.renderNoteForm = (req, res) => {
  res.render('notes/new-note');
};

notesCtrl.createNewNote = async (req, res) => {
  const {title, description} = req.body;
  const newNote = new note({title, description});
  await newNote.save();
  res.redirect('/notes')
};

notesCtrl.renderNotes =  async (req, res) => {
   const notes = await note.find().lean(); 
   res.render('notes/all-notes', {notes});
};

notesCtrl.renderEditForm = async (req, res) => {
 const Note = await note.findById(req.params.id).lean();
 console.log(Note)
  res.render('notes/edit-note',{Note}) 
};

notesCtrl.updateNote = async (req, res) => {
  const { title, description } = req.body
  await note.findByIdAndUpdate(req.params.id, {title, description})
  res.redirect('/notes');
};

notesCtrl.deleteNote = async (req, res) => {
  await note.findByIdAndDelete(req.params.id);
  res.redirect('/notes')
};

module.exports = notesCtrl;