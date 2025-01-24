const notesCtrl = {};

const { request } = require('express');
const note = require('../models/Note');

notesCtrl.renderNoteForm = (req, res) => {
  res.render('notes/new-note');
};

notesCtrl.createNewNote = async (req, res) => {
  const {title, description} = req.body;
  const newNote = new note({title, description});
  newNote.user = req.user.id
  await newNote.save();
  req.flash('success_msg', 'Note Added Succesfully');
  res.redirect('/notes')
};

notesCtrl.renderNotes =  async (req, res) => {
   const notes = await note.find({user: req.user.id}).lean(); 
   res.render('notes/all-notes', {notes});
};

notesCtrl.renderEditForm = async (req, res) => {
 const Note = await note.findById(req.params.id).lean();
  if (note.user != req.user.id) {
    req.flash('error_msg', 'Not Authorize');
    return res.redirect('/notes');
  }
  res.render('notes/edit-note',{Note});
};

notesCtrl.updateNote = async (req, res) => {
  const { title, description } = req.body;
  await note.findByIdAndUpdate(req.params.id, {title, description});
  req.flash('success_msg', 'Note Updated Succesfully');
  res.redirect('/notes');
};

notesCtrl.deleteNote = async (req, res) => {
  await note.findByIdAndDelete(req.params.id);
  req.flash('success_msg', 'Note Delete Succesfully');
  res.redirect('/notes');
};

module.exports = notesCtrl;