import './App.css';
import React, {useContext} from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";

import Home from "./pages/homepage/Home.jsx";
import Registreren from "./pages/register/Registreren.jsx";
import Navbar from "./components/navbar/Navbar.jsx";
import Login from "./pages/login/Login.jsx";
import Favorieten from "./pages/favorite/Favorieten.jsx";
import ParkDetail from "./pages/parkdetail/ParkDetail.jsx";
import {AuthContext} from "./context/AuthContext.jsx";
import ProtectedRoute from "./components/protectedroute/ProtectedRoute.jsx";
import Footer from "./components/footer/Footer.jsx";





function App() {
const {isAuth} = useContext(AuthContext);

    return (
        <>


            <div className="app-wrapper">
                <Navbar/>
                <div className="page-content">
                    <Routes>

                        <Route path="/" element={<Home/>}/>
                        <Route path="/registreer" element={<Registreren/>}/>

                        <Route path="/login" element={<Login/>}/>


                        <Route path="/favorite"
                               element={isAuth ?

                                   <ProtectedRoute>
                                       <Favorieten/>
                                   </ProtectedRoute>

                                   : <Navigate to="/login"/>}
                        />

                        <Route path="/park/:id" element={<ParkDetail/>}/>


                    </Routes>


                </div>
                <Footer/>
            </div>
        </>
    );
}

export default App;