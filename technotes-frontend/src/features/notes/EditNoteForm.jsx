import { useEffect, useState } from "react"
import { useDeleteNoteMutation, useUpdateNoteMutation } from "./notesApiSlice"
import { useNavigate } from "react-router-dom"

export default function EditNoteForm({ note, users }) {
    const noteToEdit = note
    const navigate = useNavigate()
    const [updateNote, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateNoteMutation()

    const [deleteNote, {
        isLoading: isDelLoading,
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delError
    }] = useDeleteNoteMutation()

    const [title, setTitle] = useState(noteToEdit.title)
    const [text, setText] = useState(noteToEdit.text)
    const [completed, setCompleted] = useState(noteToEdit.completed)
    const [userId, setUserId] = useState(noteToEdit.user._id)

    useEffect(() => {
        if(isSuccess || isDelSuccess) {
            setTitle("")
            setText("")
            setUserId("")
            navigate("/dash/notes")
        }
    }, [isSuccess, isDelSuccess, navigate])

    const onTitleChanged = e => setTitle(e.target.value)
    const onTextChanged = e => setText(e.target.value)
    const onUserIdChanged = e => setUserId(e.target.value)
    const onCompletedChanged = e => setCompleted(prev => !prev)

    const canSave = [title, text, userId].every(Boolean) && !isLoading

    const onSaveNoteClicked = async e => {
        e.preventDefault()
        if(canSave) {
            await updateNote({ id: note.id, user: userId, title, text, completed })
        }
    }

    const onDeleteNoteClicked = async () => {
        await deleteNote({ id: noteToEdit.id })
    }

    const created = new Date(note.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })
    const updated = new Date(note.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })

    const userOptions = users.map(user => (
        <option 
            key={user.id}
            value={user.id}
        >{user.username}</option>
    ))

    const errContent = (error?.data?.message || delError?.data?.message) ?? ''

    const content = (
        <>
            <p>{errContent}</p>
            <div className="text-blue-600 font-bold text-2xl">Edit note: #{note.ticket}</div>
            <form>
                <label htmlFor="title">Title:</label>
                <input 
                    type="text" 
                    id="title"
                    name="title"
                    value={title}
                    onChange={onTitleChanged}
                />
                <label htmlFor="title">Text:</label>
                <input 
                    type="text" 
                    id="text"
                    name="text"
                    value={text}
                    onChange={onTextChanged}
                />
                <select 
                    name="user" 
                    id="user" 
                    value={userId}
                    onChange={onUserIdChanged}
                >
                    {userOptions}
                </select>
                <button
                    title="Save"
                    onClick={onSaveNoteClicked}
                    disabled={!canSave}
                >Save</button>
                <label htmlFor="note-completed">
                    WORK COMPLETE:
                    <input
                        id="note-completed"
                        name="completed"
                        type="checkbox"
                        checked={completed}
                        onChange={onCompletedChanged}
                    />
                </label>
            </form>
            <button
                title="Delete"
                onClick={onDeleteNoteClicked}
            >
                Delete
            </button>
        </>
    )

    return content
}
