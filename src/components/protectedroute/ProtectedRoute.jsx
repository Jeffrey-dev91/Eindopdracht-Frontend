import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "/src/context/AuthContext.jsx";






function ProtectedRoute({ children }) {
    const { isAuth } = useContext(AuthContext);

    if (!isAuth) {
        alert("Je moet ingelogd zijn om je favorieten te bekijken.");
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRoute;