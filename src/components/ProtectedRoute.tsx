import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoute = () => {
    const location = useLocation();
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
        // Agar user logged in nahi hai, to use login page par bhej do
        // Saath mein ek message bhi bhejo ki use login kyun karna hai
        return (
            <Navigate 
                to="/login" 
                replace 
                state={{ 
                    from: location,
                    message: "You must be logged in to view this page."
                }} 
            />
        );
    }

    // Agar user logged in hai, to use aage jaane do (jo bhi page woh dekhna chahta hai)
    return <Outlet />;
};

export default ProtectedRoute;
