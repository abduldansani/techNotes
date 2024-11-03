import { Link } from "react-router-dom"

export default function Welcome() {
    const links = [
        {
            to: "/dash/notes",
            text: "Notes"
        },
        {
            to: "/dash/users",
            text: "Users"
        },
        {
            to: "/dash/notes/new",
            text: "Add new note"
        },
        {
            to: "/dash/notes/new",
            text: "Add new user"
        }
    ]
    return (
        <div className="p-3 md:p-8">
            <div className="font-bold text-3xl md:text-5xl mb-6 text-white mt-4">Welcome back, Abdurrahman</div>
            <div className="grid gap-4 md:grid-cols-2 w-full max-w-5xl">
                {links.map((link, i) => (
                    <div className="bg-white rounded-lg">
                        <Link key={i} to={link.to} className="font-bold flex gap-2 items-center p-6 hover:gap-4 hover:bg-orange-500 hover:text-white transition-all rounded-lg"><p className="text-2xl font-bold">&rarr;</p>{link.text}</Link>
                    </div>
                ))}
            </div>
        </div>
    )
}
