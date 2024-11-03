import { useState, useEffect } from "react"
import { useUpdateUserMutation, useDeleteUserMutation } from "./usersApiSlice"
import { useNavigate } from "react-router-dom"
import { ROLES } from "../../config/roles"

const USER_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX =/^[A-z0-9!@#$%]{4,12}$/

export default function EditUserForm({user}) {
    const navigate = useNavigate()
    const [updateUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateUserMutation()

    const [deleteUser, {
        isLoading: isDelLoading,
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delError
    }] = useDeleteUserMutation()

    const [username, setUsername] = useState(user.username)
    const [validUsername, setValidUsername] = useState(false)
    const [password, setPassword] = useState("")
    const [validPassword, setValidPassword] = useState(false)
    const [active, setActive] = useState(user.active)
    const [roles, setRoles] = useState(user.roles)

    useEffect(() => {
        setValidUsername(USER_REGEX.test(username))
    }, [username])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password))
    }, [password])

    useEffect(() => {
        if(isSuccess || isDelSuccess) {
            setUsername("")
            setPassword("")
            setRoles([])
            navigate("/dash/users")
        }
    }, [isSuccess, isDelSuccess, navigate])

    const onUsernameChanged = e => setUsername(e.target.value)
    const onPasswordChanged = e => setPassword(e.target.value)

    const onRolesChanged = e => {
        const values = Array.from(
            e.target.selectedOptions,
            option => option.value
        )
        setRoles(values)
    }

    const onActiveChanged = () => setActive(prev => !prev)

    const onSaveUserClicked = async e => {
        // e.preventDefault()
        // if(canSave) {
        //     await addNewUser({username, password, roles})
        // }
        if(password) {
            await updateUser({ id: user.id, username, password, roles, active})
        } else {
            await updateUser({ id: user.id, username, roles, active})
        }
    }

    const onDeleteUserClicked = async () => {
        await deleteUser({id: user.id})
    }
    let canSave
    if(password){
        canSave = [roles.length, validUsername, validPassword].every(Boolean) && !isLoading
    } else {
        canSave = [roles.length, validUsername].every(Boolean) && !isLoading
    }

    const errContent = (error?.data?.message || delError?.data?.message) ?? ""

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
            <form onSubmit={e => e.preventDefault()}>
            <div className="text-3xl font-bold text-blue-500">Edit user</div>
                <button 
                    title="Save"
                    onClick={onSaveUserClicked}
                    disabled={!canSave}
                >save</button>
                <button 
                    title="Delete"
                    onClick={onDeleteUserClicked}
                >Delete</button>
                <label htmlFor="username">Username: [3 to 20 letters]</label>
                <input 
                    type="text" 
                    id="username"
                    className="border-2"
                    name="username"
                    autoComplete="off"
                    value={username}
                    onChange={onUsernameChanged}
                />
                <label htmlFor="password">Password: [4 to 12 chars incl. !@#$%]</label>
                <input 
                    type="password" 
                    className="border-2"
                    id="password"
                    name="password"
                    autoComplete="off"
                    value={password}
                    onChange={onPasswordChanged}
                />

                <label htmlFor="user-active">
                    ACTIVE:
                    <input 
                        type="checkbox" 
                        checked={active}
                        onChange={onActiveChanged}
                    />
                </label>
                
                <label htmlFor="roles">Assigned Roles:</label>
                <select 
                    name="roles" 
                    id="roles"
                    className="border-2"
                    multiple={true}
                    size="3"
                    value={roles}
                    onChange={onRolesChanged}
                >
                    {options}
                </select>
            </form>
        </>
    )
    return content
}
