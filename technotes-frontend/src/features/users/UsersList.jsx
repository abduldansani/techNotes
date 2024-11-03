import User from "./User"
import { useGetUsersQuery } from "./usersApiSlice"

export default function UsersList() {
    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersQuery(undefined, {
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
        const {ids} = users
        
        const tableContent = ids?.length ? ids.map(userId => <User key={userId} userId={userId} />) : null
        content = (
            <table className="border-2">
                <thead>
                    <tr  className="border-2">
                        <th  className="border-2 border-black">Username</th>
                        <th  className="border-2 border-black">Roles</th>
                        <th  className="border-2 border-black">Edit</th>
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
