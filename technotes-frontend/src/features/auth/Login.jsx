import { useState } from "react"

export default function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const onUsernameChanged = e => setUsername(e.target.value)
    const onPasswordChanged = e => setPassword(e.target.value)

    return (
        <div 
            className="min-h-screen w-screen p-10 flex items-center justify-center bg-cover"
            style={{backgroundImage: `url("/img/mctu-1.jpg")`}} 
        >
            <div className="bg-white p-6 sm:p-16 w-[95%] max-w-lg rounded-lg shadow-2xl">
                <div className="font-extrabold text-orange-600 text-3xl md-text-5xl text-center">MCTuneUps</div>
                <div className="text-center mb-10">Login</div>
                <form onSubmit={e => e.preventDefault()}>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="username" className="text-xs font-semibold text-gray-700">Username:</label>
                        <input 
                            type="text" 
                            autoComplete={false}
                            className="w-full text-sm p-3 text-gray-800 rounded-lg outline-orange-600 border-2 border-orange-500"
                            value={username}
                            onChange={onUsernameChanged}
                        />
                    </div>
                    <div className="flex flex-col gap-2 mt-4">
                        <label htmlFor="username" className="text-xs font-semibold text-gray-700">Password:</label>
                        <input 
                            type="password"
                            autoComplete={false}
                            className="w-full text-sm p-3 text-gray-800 rounded-lg outline-orange-600 border-2 border-orange-500"
                            value={password}
                            onChange={onPasswordChanged}
                        />
                    </div>
                    <button className="mt-6 sm:mt-8 md:mt-10 text-white bg-orange-600 hover:bg-orange-700 w-full py-3 font-bold rounded-lg">Login</button>
                </form>
            </div>
        </div>
    )
}
