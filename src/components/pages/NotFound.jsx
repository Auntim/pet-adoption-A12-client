import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <div className="flex min-h-screen flex-col gap-6 justify-center items-center">
            <h2 className="text-7xl">Page Not Found</h2>
            <Link to='/'>
                <button className='btn bg-slate-900 text-white hover:text-black'>Back To Home</button>
            </Link>
        </div>
    )
}

export default NotFound
