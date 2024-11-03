const Note = require('../models/Note')
const User = require('../models/User')

async function getAllNotes(req, res) {
    try {
        const notes = await Note.find().populate('user', 'username').lean()
        if(!notes?.length) {
            return res.status(404).json({message: 'No notes found'})
        }

        const notesWithUser = await Promise.all(notes.map(async (note) => {
            const user = await User.findById(note.user).lean().exec()
            return { ...note, username: user.username }
        }))
    
        res.status(200).json(notesWithUser)
    } catch(err) {
        console.error('Error fetching notes:', err)
        res.status(500).json({message: 'An error occured while fetching notes'})
    }
}

async function addNewNote(req, res) {
    const {user, title, text} = req.body
    if(!user || !title || !text) {
        return res.status(400).json({message: 'All fields are required'})
    }
    try {
        const existingUser = await User.findById(user).exec()
        if(!existingUser) {
            return res.status(400).json({message: 'invalid user ID supplied'})
        }

        const noteObject = {user, title, text}
        const note = await Note.create(noteObject)
        if(note) {
            res.status(201).json(note)
        } else {
            res.status(400).json({message: 'invalid note input received'})
        }
        
    } catch(err) {
        console.log('Error adding note', err)
        res.status(500).json({message: 'An error occured while adding note'})
    }
}

async function updateNote(req, res) {
    const { id, ...updates } = req.body
    if(!id) {
        return res.status(400).json({message: 'note ID is required'})
    }

    try {
        const note = await Note.findById(id).exec()
        if(!note) {
            return res.status(400).json({message: 'Note not found'})
        }

        const allowedUpdates = ['title', 'text', 'completed']
        const sanitizedUpdates = Object.keys(updates).reduce((obj, key) => {
            if(allowedUpdates.includes(key)) {
                obj[key] = updates[key]
            }
            return obj
        }, {})

        const updatedNote = await Note.findByIdAndUpdate(id, sanitizedUpdates, {new: true, runValidators: true}).exec()
        res.status(200).json({message: `${updatedNote.title} updated successfully`, updatedNote })
    } catch(err) {
        console.error('Error updating note', err)
        res.status(500).json({message: 'an error occured while updating note'})
    }
}

async function deleteNote(req, res) {
    const { id } = req.body
    if(!id) {
        return res.status(400).json({message: 'note ID is required'})
    }

    try {
        const note = await Note.findById(id).exec()
        if(!note) {
            return res.status(400).json({message: 'no note found'})
        }

        const result = await Note.deleteOne(note).exec()
        res.json(result)
    } catch(err) {
        console.error('Error deleting note', err)
        res.status(500).json({message: 'An error occured while deleting note'})
    }
}

module.exports = {
    getAllNotes,
    addNewNote,
    updateNote,
    deleteNote
}