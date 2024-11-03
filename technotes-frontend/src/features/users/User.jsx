import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectUserById } from "./usersApiSlice"

export default function User({userId}) {
    const user = useSelector(state => selectUserById(state, userId))
    const navigate = useNavigate()

    if(user) {
        const handleEdit = () => navigate(`/dash/users/${userId}`)
        const userRolesString = user.roles.toString().replaceAll(',', ', ')
        return (
            <tr>
                <td className="border-2 border-black">{user.username}</td>
                <td className="border-2 border-black">{userRolesString}</td>
                <td className="border-2 border-black">
                    <button onClick={handleEdit}>Edit</button>
                </td>
            </tr>
        )
    } else return null
    
}
