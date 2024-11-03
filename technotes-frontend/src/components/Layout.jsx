import React from 'react'
import { Outlet } from 'react-router-dom'

export default function Layout() {
    return (
        <>
            <div className="min-h-lvh flex flex-col">
                <header>
                    <div className="border-b-2 border-black flex justify-between p-2 bg-white md:p-4">
                        <div className="font-extrabold text-blue-800 text-3xl md-text-5xl">MechaNotes</div>
                    </div>
                </header>
                <Outlet />
            </div>
        </>
    )
}
