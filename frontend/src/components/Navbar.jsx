import React from 'react'
import { Link } from 'react-router'

function Navbar() {
  return (
    <div>
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-lg font-bold">Appointment System</div>
                <ul className="flex space-x-4">
                    <li><Link to="/" className="text-white hover:text-gray-300">Login</Link></li>
                    <li><Link to="/users" className="text-white hover:text-gray-300">Users</Link></li>
                    <li><Link to="/appointment" className="text-white hover:text-gray-300">Book Appointment</Link></li>
                    <li><Link to="/appointment/show" className="text-white hover:text-gray-300">All Appointments</Link></li>
                    <li><Link to="/appointment/cancel" className="text-white hover:text-gray-300">User Appointments</Link></li>
                </ul>
            </div>
        </nav>
    </div>
  )
}

export default Navbar