const express = require('express')
const router = express.Router()
const {
    getAllNotes,
    addNewNote,
    updateNote,
    deleteNote
} = require('../controllers/notesController')

router.route('/')
    .get(getAllNotes)
    .post(addNewNote)
    .patch(updateNote)
    .delete(deleteNote)

module.exports = router