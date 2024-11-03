import { useState, useEffect } from "react"
import { useAddNewNoteMutation } from "./notesApiSlice"
import { useNavigate } from "react-router-dom"

export default function NewNoteForm({ users }) {
    const usersList = users
    console.log(users)
    const navigate = useNavigate()
    const [addNewNote, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewNoteMutation()

    const [title, setTitle] = useState("")
    const [text, setText] = useState("")
    const [userId, setUserId] = useState(usersList[0].id)

    useEffect(() => {
        if (users && users.length > 0) {
            setUserId(users[0].id);
        }
    }, [users])

    useEffect(() => {
        if(isSuccess) {
            setTitle("")
            setText("")
            navigate("/dash/notes")
        }
    }, [isSuccess, navigate])

    const onTitleChanged = e => setTitle(e.target.value)
    const onTextChanged = e => setText(e.target.value)
    const onUserIdChanged = e => setUserId(e.target.value)

    const canSave = [title, text, userId].every(Boolean) && !isLoading
    const onSaveNoteClicked = async (e) => {
        e.preventDefault()
        if(canSave) {
            await addNewNote({user: userId, title, text})
        }
    }

    const options = users.map(user => (
        <option 
            key={user.id}
            value={user.id}
        >{user.username}</option>
    ))

    const content = (
        <>
            <form>
                <div className="font-bold text-2xl text-blue-600">Add new note</div>
                <label htmlFor="title">Title</label>
                <input 
                    type="text" 
                    name="title"
                    id="title"
                    autoComplete="off"
                    value={title}
                    onChange={onTitleChanged}
                />
                <label htmlFor="text">Text</label>
                <input 
                    type="text" 
                    name="text"
                    id="text"
                    autoComplete="off"
                    value={text}
                    onChange={onTextChanged}
                />
                <label htmlFor="username">Assigned to:</label>
                <select 
                    name="username" 
                    id="username"
                    value={userId}
                    onChange={onUserIdChanged}
                >
                    {options}
                </select>
                <button
                    disabled={!canSave}
                    title="save"
                    type="submit"
                    onClick={onSaveNoteClicked}
                >Save</button>
            </form>
        </>
    )
    return content
}
