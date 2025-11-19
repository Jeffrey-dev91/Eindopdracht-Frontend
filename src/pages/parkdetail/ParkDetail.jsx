import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ParkDetail.css";
import myImage from "/src/assets/photos/Photo-1.png";
import { AuthContext } from "../../context/AuthContext.jsx";
import { FavoritesContext } from "../../context/FavoritesContext.jsx";
import Button from "../../components/button/Button.jsx";
import FavoriteButton from "../../components/favoritebutton/FavoriteButton.jsx";


function ParkDetail() {
    const { id: parkCode } = useParams();
    const navigate = useNavigate();
    const { isAuth } = useContext(AuthContext);
    const { favorites, addFavorite, removeFavorite } = useContext(FavoritesContext);
    const [park, setPark] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);


    useEffect(() => {
        const fetchPark = async () => {
            try {
                const response = await axios.get(
                    `https://developer.nps.gov/api/v1/parks?parkCode=${parkCode}`,
                    {
                        headers: {
                            "X-Api-Key": "uzHHE33UGURmm9IfC4s9c5c4KyfjhfFwKnEPJ0AJ",
                        },
                    }
                );

                if (response.data.data.length > 0) {
                    setPark(response.data.data[0]);
                } else {
                    setError("Park niet gevonden.");
                }
            } catch (err) {
                setError("Fout bij laden van parkgegevens.");
            } finally {
                setLoading(false);
            }
        };
        fetchPark();
    }, [parkCode]);


    useEffect(() => {
        if (park) {
            const favorited = favorites.some(fav => fav.parkCode === park.parkCode);
            setIsFavorite(favorited);
        }
    }, [favorites, park]);

    const handleFavoriteToggle = async () => {
        try {
            if (!park) return;

            if (!isAuth) {
                setShowLoginModal(true);
                return;
            }

            if (isFavorite) {

                removeFavorite(park.parkCode);
            } else {

                addFavorite({
                    parkCode: park.parkCode,
                    fullName: park.fullName,
                    image: park.images?.[0]?.url || null,
                });
            }

            setIsFavorite(!isFavorite);
        } catch (err) {
            console.error("Fout bij togglen van favoriet:", err);
            alert("Er is iets misgegaan bij het toevoegen of verwijderen van favorieten.");
        }
    };

    if (loading) return <p>Bezig met laden...</p>;
    if (error) return <p>{error}</p>;

    return (
        <main className="park-detail-page">
            <div className="park-detail-image">
                <img src={myImage} alt="Decoratieve achtergrond" />
            </div>

            <div className="park-detail-content">
                <header>
                    <h1>{park.fullName}</h1>
                </header>

                <figure className="park-figure">
                    {park.images?.[0]?.url && (
                        <img
                            src={park.images[0].url}
                            alt={park.images[0].altText || park.fullName}
                        />
                    )}

                    <FavoriteButton

                        className= "favorite-button"
                        isFavorite={isFavorite}
                        onToggle={handleFavoriteToggle}
                        >
                    </FavoriteButton>


                </figure>

                <section className="section" aria-labelledby="description-heading">
                    <h2 id="description-heading">Beschrijving</h2>
                    <p>{park.description}</p>
                </section>

                <section className="section" aria-labelledby="info-heading">
                    <h2 id="info-heading">Informatie</h2>
                    <p><strong>Staat:</strong> {park.states}</p>
                    <p><strong>Adres / Routebeschrijving:</strong> {park.directionsInfo}</p>
                </section>

                <section className="section" aria-labelledby="hours-heading">
                    <h2 id="hours-heading">Openingstijden</h2>
                    {park.operatingHours?.length > 0 ? (
                        <>
                            <p>{park.operatingHours[0].description}</p>
                            <ul className="ul">
                                {["monday","tuesday","wednesday","thursday","friday","saturday","sunday"].map(day => (
                                    <li key={day}>
                                        {day.charAt(0).toUpperCase() + day.slice(1)}:{" "}
                                        {park.operatingHours[0].standardHours[day] || "Gesloten"}
                                    </li>
                                ))}
                            </ul>
                        </>
                    ) : (
                        <p>Geen openingstijden beschikbaar.</p>
                    )}
                </section>

                <div className="park-home-button-container">
                    <Button onClick={() => navigate("/")} className="park-detail-button">
                        Home
                    </Button>
                </div>

                {showLoginModal && (
                    <div
                        className="modal-overlay"
                        onClick={() => setShowLoginModal(false)}
                        role="dialog"
                        aria-modal="true"
                    >
                        <div
                            className="modal-content"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <p>Je moet inloggen om favorieten toe te voegen.</p>
                            <Button onClick={() => setShowLoginModal(false)}>Sluiten</Button>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}

export default ParkDetail;
