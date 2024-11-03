import { Link, Outlet } from "react-router-dom";

export default function DashLayout() {
    return (
        <>
            <div className="flex flex-col min-h-screen">
                <header className="w-full bg-gray-900 flex justify-between items-center py-3 px-3 md:px-8 md:py-4 drop-shadow-md">
                    <Link to="/dash" className="text-orange-500 font-extrabold text-4xl md:text-5xl hover:scale-105 transition-all">MCTuneUps</Link>
                    <div className="font-bold text-orange-500">Logout</div>
                </header>
                <div className="grow bg-cover bg-no-repeat bg-opacity-25 flex" style={{backgroundImage: `url("/img/mctu-2.jpg")`}}>
                    <div className="grow bg-black bg-opacity-80">
                        <Outlet />
                    </div>
                </div>
                <footer className="bg-gray-950 w-full py-3 px-3 md:px-8 md:py-4">
                    <div className="font-bold text-orange-500">Abduldansani: Admin, User</div>
                </footer>
            </div>
        </>
    )
}
