import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/homepage/Home.jsx";
import Registreren from "./pages/register/Registreren.jsx";
import Navbar from "./assets/components/navbar/Navbar.jsx";
import Login from "./pages/login/Login.jsx";
import Favorieten from "./pages/favorite/Favorieten.jsx";
import ParkDetail from "./pages/parkdetail/ParkDetail.jsx";

function App() {
    return (
     <>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/registreer" element={<Registreren />} />
                <Route path="/login" element={<Login />} />
                <Route path="/favorite" element={<Favorieten />} />
                <Route path="/park/:id" element={<ParkDetail />} />
            </Routes>
</>
    );
}

export default App;