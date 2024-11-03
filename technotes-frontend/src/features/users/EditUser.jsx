import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectUserById } from "./usersApiSlice"
import EditUserForm from "./EditUserForm"

export default function EditUser() {
    const { id } = useParams()
    const user = useSelector(state => selectUserById(state, id))

    const content = user ? <EditUserForm user={user} /> : <p className=" text-red-500">Loading...</p>
    return content
}
