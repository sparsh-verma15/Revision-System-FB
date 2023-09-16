import React from 'react'
import { Navigate, Route, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'

const ProtectedRoute = (props) => {
    const auth = useAuthContext();
    const navigate = useNavigate();
    if(!auth.user) {
        return <Navigate to='/'/>
    }
    return props.children;
}

export default ProtectedRoute