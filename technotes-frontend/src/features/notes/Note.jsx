import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectNoteById } from "./notesApiSlice"

export default function Note({noteId}) {
    const note = useSelector(state => selectNoteById(state, noteId))
    const navigate = useNavigate()

    if(note) {
        const created = new Date(note.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })
        const updated = new Date(note.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

        const onEditNoteClicked = () => navigate(`/dash/notes/${noteId}`)

        return (
            <tr>
                <td className="border-2 border-black">
                    { note.completed
                        ? <span>completed</span>
                        : <span>open</span>
                    }
                </td>
                <td className="border-2 border-black">{created}</td>
                <td className="border-2 border-black">{updated}</td>
                <td className="border-2 border-black">{note.title}</td>
                <td className="border-2 border-black">{note.username}</td>
                <td className="border-2 border-black">
                    <button onClick={onEditNoteClicked}>Edit</button>
                </td>
            </tr>
        )
    } else return null
    return (
        <div>Note</div>
    )
}
