import React from 'react';
import { Navigate, Route, Outlet } from 'react-router-dom'

const LoginRoute = ({ component: Component, ...rest }) => {
    const checkAuth = () => {

        const token = localStorage.getItem("token")
        const expiration = localStorage.getItem("expiration")

        console.log(new Date().getTime() < expiration)
        if (token != undefined && new Date().getTime() < expiration) {
            return true
        } else {
            return false
        }
    }


    return checkAuth() ? <Navigate to="/login" /> : <Outlet />
};

export default LoginRoute;