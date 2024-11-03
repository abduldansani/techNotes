import { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
    const [isMenuOpen, setIsmenuOpen] = useState(false)

    const navItems = ["About", "Services", "Testimonials", "Contact"]
    return (
        <header className="bg-gray-950 text-white fixed top-0 flex justify-between items-center py-3 px-3 md:px-8 md:py-4 drop-shadow-md w-full">
            <Link to="/" className="text-orange-500 font-extrabold text-4xl md:text-5xl hover:scale-105 transition-all">MCTuneUps</Link>

            <div className="flex items-center gap-10 lg:gap-20">
                <nav className="hidden lg:flex gap-4">
                    {navItems.map((item, i) => (
                        <Link className="font-semibold py-2 px-6 rounded-full hover:bg-orange-500 hover:text-white hover:scale-105 transition-all">{item}</Link>
                    ))}
                </nav>

                <Link to="/login" className="hidden sm:inline font-semibold bg-orange-500 text-white py-2 px-6 rounded-full hover:scale-110 transition-all">Login</Link>
                {isMenuOpen ? (
                    <svg width="32" height="32" className="lg:hidden cursor-pointer" onClick={() => setIsmenuOpen(prev => !prev)}>
                        <line x1="6" y1="6" x2="26" y2="26" stroke="currentColor" stroke-width="3" />
                        <line x1="26" y1="6" x2="6" y2="26" stroke="currentColor" stroke-width="3" />
                    </svg>
                ) : (
                    <svg width="32" height="32" className="lg:hidden cursor-pointer" onClick={() => setIsmenuOpen(prev => !prev)}>
                        <rect y="6" width="32" height="3" fill="currentColor" />
                        <rect y="14" width="32" height="3" fill="currentColor" />
                        <rect y="22" width="32" height="3" fill="currentColor" />
                    </svg>
                )}
                
                
            </div>
            
            <nav 
                className={`flex flex-col items-center lg:hidden py-4 absolute top-16 right-2 shadow-2xl rounded-b-3xl bg-gray-950 w-4/5 sm:w-1/2 transform transition-transform ${isMenuOpen ? "opacity-100" : "opacity-0 lg:hidden"}`}
                style={{transition: "transform 0.3s ease, opacity 0.3s ease"}}
            >
                {navItems.map((item, i) => (
                    <Link className="font-semibold py-4 px-5 w-full hover:text-orange-500 hover:border-l-4 border-l-orange-500 transition-all">{item}</Link>
                ))}
                <Link to="/login" className="sm:hidden font-semibold bg-orange-500 text-white py-2 px-6 rounded-full hover:scale-110 transition-all">Login</Link>
            </nav>
        </header>
    )
}
