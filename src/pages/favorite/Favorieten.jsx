import React, {useContext} from "react";
import {Link} from "react-router-dom";
import { AuthContext } from "../../assets/context/AuthContext.jsx";
import "/src/pages/favorite/Favorieten.css";
import myImage from "../../assets/components/photos/Photo-1.png";

function Favorieten() {
    const { favorites, isAuth } = useContext(AuthContext);




    return (
        <>

            <header className="header-container-1">
                <div className="background-image">
                    <img src={myImage} alt="Background"/>
                </div>
            </header>


            <div className="favorieten-container">
                {!isAuth ? (
                    <>
                        <h2>Je bent niet ingelogd.</h2>
                        <p>
                            <Link to="/login">Log in</Link> om je favoriete parken te bekijken.
                        </p>
                    </>
                ) : favorites.length === 0 ? (
                    <>
                        <h1>Mijn Favoriete Parken</h1>
                        <p>Je hebt nog geen favoriete parken toegevoegd.</p>
                        <Link to="/" className="back-button">← Terug naar Home</Link>
                    </>
                ) : (
                    <>
                        <h1>Mijn Favoriete Parken</h1>
                        <div className="favorieten-lijst">
                            {favorites.map((park) => (
                                <div key={park.parkCode} className="favoriet-kaart">
                                    <h3>{park.fullName}</h3>
                                    {park.image && (
                                        <img
                                            src={park.image}
                                            alt={park.fullName}
                                            width="300"
                                        />
                                    )}
                                    <Link to={`/park/${park.parkCode}`} className="detail-link">
                                        Bekijk details
                                    </Link>
                                </div>
                            ))}
                        </div>
                        <Link to="/" className="back-button">← Terug naar Home</Link>
                    </>

                )}

            </div>
        </>
    );
}

export default Favorieten;