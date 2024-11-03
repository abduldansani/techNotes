import { Link } from "react-router-dom"
import Header from "./Header"

export default function Hero() {
    return (
        <div className="relative h-screen z-0">
            <img src="/img/mctu-1.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gray-900 bg-opacity-70"></div>
            <div className="relative h-full">
                <Header />
                <div className="text-white p-2 h-full flex items-center flex-col justify-center">
                    <div className="font-bold text-5xl md:text-7xl">
                        Precision Tune-Ups, Expert Care
                    </div>
                    <div className="font-semibold font-mono mt-10">Don't let engine problems slow you down. Visit Motor City Tune-Ups for reliable tune-ups, diagnostics, and maintenance.</div>
                    <div className="mt-20">
                        <Link className="font-semibold py-2 px-6 bg-orange-600 text-white rounded-lg hover:rounded-full inline-block hover:scale-105 transition-all">Learn More</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
