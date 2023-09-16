import React from 'react'
import './Logout.css'
import { useAuthContext } from '../context/AuthContext'

const Logout = () => {
    const auth = useAuthContext();
    const handleLogout = () => {
        localStorage.removeItem('user');
        auth.logout();
    }
  return (
    <div className='logoutContainer' onClick={handleLogout}>
        Logout
    </div>
  )
}

export default Logout