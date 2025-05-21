import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router";
import Login from './pages/Login.jsx';
import Users from './pages/Users.jsx';
import Appointment from './pages/appointment.jsx';
import ShowAppointments from './pages/ShowAppointments.jsx';
import Navbar from './components/Navbar.jsx';
import CancelAppointment from './pages/CancelAppointment.jsx';
import { ToastContainer } from 'react-toastify';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Navbar />
    <ToastContainer autoClose={1000} toastClassName={'custom-toast-bg'} position='top-right' hideProgressBar={true}/>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="users" element={<Users />} />
      <Route path="appointment" element={<Appointment />} />
      <Route path='/appointment/show' element={<ShowAppointments/>}/>
      <Route path='/appointment/cancel' element={<CancelAppointment/>}/>
    </Routes>
  </BrowserRouter>
)
