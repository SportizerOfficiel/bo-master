import React from 'react';
import { Navigate, Route, Outlet } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => {
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


    return checkAuth() ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;