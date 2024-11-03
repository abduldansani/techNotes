import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectAllUsers } from "../users/usersApiSlice"
import EditNoteForm from "./EditNoteForm"
import { selectNoteById } from "./notesApiSlice"

export default function EditNote() {
    const { id } = useParams()

    const note = useSelector(state => selectNoteById(state, id))
    const users = useSelector(selectAllUsers)

    const content = note && users ? <EditNoteForm note={note} users={users} /> : <p className=" text-red-500">Loading...</p>
    return content
}
