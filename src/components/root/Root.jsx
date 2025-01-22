import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../pages/Footer'
import Navbar from '../pages/Navbar'

function Root() {
    return (
        <div>
            <Navbar></Navbar>
            <div className="min-h-[calc(100vh-232px)]   mx-auto">
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    )
}

export default Root