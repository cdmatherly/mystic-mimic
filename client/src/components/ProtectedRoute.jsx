import { useState } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../context/AuthProvider'
import { useCookies } from 'react-cookie'

const ProtectedRoute = ({ person, redirectPath='/login', children }) => {
    const [cookies, setCookie, removeCookie] = useCookies(['user_id'])
    const user = cookies.user_id
    console.log(user)
    if (!user) {
        return <Navigate to={redirectPath} replace/>
    }

    //if using Outlet, return the Outlet routes, otherwise, return children
    return children ? children : <Outlet />
}

export default ProtectedRoute