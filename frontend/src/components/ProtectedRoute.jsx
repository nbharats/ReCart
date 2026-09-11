import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate, Outlet, useLocation } from 'react-router-dom';

function ProtectedRoute() {

    const { isAuthenticated, loading } = useAuth();
    const location = useLocation()

    if(loading){
        return(
            <div className="container-fuild py-5 text-center">
                <h4>Checking authentication.... </h4>
            </div>
        )
    }

    if(!isAuthenticated){
        return(
            <Navigate
                to='/login'
                replace
                state={{ from : location }}
            />
        )
    }

    return <Outlet/>
}

export default ProtectedRoute
