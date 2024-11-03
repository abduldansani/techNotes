import Note from "./Note"
import { useGetNotesQuery } from "./notesApiSlice"

export default function NotesList() {
    const {
        data: notes,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetNotesQuery(undefined, {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let content
    if(isLoading) {
        content = <p className="text-2xl font-bold italic">Loading</p>
    }
    if(isError) {
        content = <p className="text-2xl font-bold text-red-600">{error?.data?.message}</p>
    }
    if(isSuccess) {
        console.log(notes)
        const {ids} = notes

        const tableContent = ids?.length
            ? ids.map(noteId => <Note key={noteId} noteId={noteId} />)
            : null

        content = (
            <table>
                <thead>
                    <tr>
                        <th className="border-2 border-black">Username</th>
                        <th className="border-2 border-black">Created</th>
                        <th className="border-2 border-black">Updated</th>
                        <th className="border-2 border-black">Title</th>
                        <th className="border-2 border-black">Owner</th>
                        <th className="border-2 border-black">Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {tableContent}
                </tbody>
            </table>
        )
    }
    return content
}
