import {Link} from "react-router-dom";
import "./Navbar.css";

function Navbar() {
    return (
        <nav className="navi-outer">
            <div className="navi-inner">
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                        <Link to="/registreer">Registreer</Link>
                        <Link to="/login">Inloggen</Link>
                        <Link to="/favorite">Favorieten</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
