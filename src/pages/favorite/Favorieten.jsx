import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";
import { FavoritesContext } from "../../context/FavoritesContext.jsx";
import "/src/pages/favorite/Favorieten.css";
import myImage from "../../assets/photos/Photo-1.png";
import Button from "../../components/button/Button.jsx";

function Favorieten() {
    const { isAuth } = useContext(AuthContext);
    const { favorites } = useContext(FavoritesContext);
    const navigate = useNavigate();


    function handleClick() {
        navigate("/");
    }

    function handleClickPark(parkCode) {
        navigate(`/park/${parkCode}`);
    }

    return (
        <>
            <header className="header-container-1">
                <div className="favorite-image">
                    <img src={myImage} alt="Sfeervolle achtergrond van de favoriete parken" />
                </div>
            </header>

            <main className="favorieten-container">


                {!isAuth ? (
                    <section aria-labelledby="login-header">
                        <h2 id="login-header">Je bent niet ingelogd.</h2>
                        <p>
                            <Link to="/login">Log in</Link> om je favoriete parken te bekijken.
                        </p>
                    </section>
                ) : favorites.length === 0 ? (
                    <section aria-labelledby="no-favorites-header">
                        <h1 id="no-favorites-header">Mijn Favoriete Parken</h1>
                        <p>Je hebt nog geen favoriete parken toegevoegd.</p>

                        <Button
                            onClick={handleClick}
                            className="no-favorite-button"
                        >
                            ← Terug naar Home
                        </Button>
                    </section>
                ) : (
                    <section aria-labelledby="favorites-header">
                        <h1 id="favorites-header">Mijn Favoriete Parken</h1>
                        <div className="favorieten-lijst">
                            {favorites.map((park) => (
                                <article key={park.parkCode} className="favoriet-kaart">
                                    <h3>{park.fullName}</h3>

                                    {park.image && (
                                        <img
                                            src={park.image}
                                            alt={park.fullName}
                                            width="250"
                                            height="250"
                                        />
                                    )}

                                    <Button
                                        onClick={() => handleClickPark(park.parkCode)}
                                        className="detail-link-button"
                                    >
                                        Bekijk Park
                                    </Button>
                                </article>
                            ))}
                        </div>

                        <Button
                            onClick={handleClick}
                            className="no-favorite-button"
                        >
                            ← Terug naar Home
                        </Button>
                    </section>
                )}
            </main>
        </>
    );
}

export default Favorieten;
