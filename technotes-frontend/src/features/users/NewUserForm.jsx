import { useState, useEffect } from "react"
import { useAddNewUserMutation } from "./usersApiSlice"
import { useNavigate } from "react-router-dom"
import { ROLES } from "../../config/roles"

const USER_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX =/^[A-z0-9!@#$%]{4,12}$/

export default function NewUserForm() {
    const [addNewUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewUserMutation()

    const navigate = useNavigate()
    
    const [username, setUsername] = useState("")
    const [validUsername, setValidUsername] = useState("")
    const [password, setPassword] = useState("")
    const [validPassword, setValidPassword] = useState("")
    const [roles, setRoles] = useState(["Employee"])

    useEffect(() => {
        setValidUsername(USER_REGEX.test(username))
    }, [username])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password))
    }, [password])

    useEffect(() => {
        if(isSuccess) {
            setUsername("")
            setPassword("")
            setRoles([])
            navigate("/dash/users")
        }
    }, [isSuccess, navigate])

    const onUsernameChanged = e => setUsername(e.target.value)
    const onPasswordChanged = e => setPassword(e.target.value)

    const onRolesChanged = e => {
        const values = Array.from(
            e.target.selectedOptions,
            option => option.value
        )
        setRoles(values)
    }

    const canSave = [roles.length, validUsername, validPassword].every(Boolean) && !isLoading
    const onSaveUserClicked = async e => {
        e.preventDefault()
        if(canSave) {
            await addNewUser({username, password, roles})
        }
    }

    const options = Object.values(ROLES).map(role => {
        return (
            <option
                key={role}
                value={role}
            >{role}</option>
        )
    })

    const content = (
        <>
            <p className="text-red-600 font-bold text-2xl">{error?.data?.message}</p>
            <form onSubmit={onSaveUserClicked}>
                <div className="text-3xl font-bold text-blue-500">New user</div>
                <label htmlFor="username">Username: [3 to 20 letters]</label>
                <input 
                    type="text" 
                    id="username"
                    name="username"
                    autoComplete="off"
                    value={username}
                    onChange={onUsernameChanged}
                />
                <label htmlFor="password">Password: [4 to 12 chars incl. !@#$%]</label>
                <input 
                    type="password" 
                    id="password"
                    name="password"
                    autoComplete="off"
                    value={password}
                    onChange={onPasswordChanged}
                />

                <label htmlFor="roles">Assigned Roles:</label>
                <select 
                    name="roles" 
                    id="roles"
                    multiple={true}
                    size="3"
                    value={roles}
                    onChange={onRolesChanged}
                >
                    {options}
                </select>
                <button onClick={onSaveUserClicked} className="bg-orange-500">Save</button>
            </form>
        </>
    )

    return content
}
