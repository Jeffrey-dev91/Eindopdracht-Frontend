
import {Link, useNavigate} from "react-router-dom";
import "./Navbar.css";
import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import ProtectedRoute from "../protectedroute/ProtectedRoute.jsx";



function Navbar() {
    const navigate = useNavigate();
const {isAuth, logout} = useContext(AuthContext);
    const handleLogout = () => {

        logout();
        navigate("/");
    };


    const handleFavoritesClick = (e) => {
        e.preventDefault();
        if (!isAuth) {
            alert("Je moet ingelogd zijn om je favorieten te bekijken.");

        } else {
            navigate("/favorite");
        }
    };

    return (

        <nav className="navi-outer">
            <div className="navi-inner">
                <ul>
                    <li>
                   <Link to="/">Home</Link>
                   <Link to="/registreer">Registreer</Link>


                   <a href="#" onClick={handleFavoritesClick}>Favorieten</a>

                        { isAuth ? (
                        <Link
                            to="#"
                            onClick={(e) => {
                                e.preventDefault();
                                handleLogout();
                            }}
                            style={{ cursor: "pointer", color: "purple", textDecoration: "none" }}
                        >
                            Uitloggen
                        </Link>
                        ) : (
                        <Link to="/login">Inloggen</Link>
                        )}

                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;