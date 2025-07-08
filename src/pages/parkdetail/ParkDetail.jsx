import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./ParkDetail.css";
import myImage from "/src/assets/components/photos/Photo-1.png";
import { AuthContext } from "../../assets/context/AuthContext.jsx";

function ParkDetail() {
    const { id: parkCode } = useParams();
    const [park, setPark] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { isAuth, favorites, addFavorite, removeFavorite } = useContext(AuthContext);
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
            } catch (error) {
                setError("Fout bij laden van parkgegevens.");
            } finally {
                setLoading(false);
            }
        };

        fetchPark();
    }, [parkCode]);

    useEffect(() => {
        if (park) {
            const favorited = favorites.some((fav) => fav.parkCode === park.parkCode);
            setIsFavorite(favorited);
        }
    }, [favorites, park]);

    const handleFavoriteToggle = () => {
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
                image: park.images?.[0]?.url,
            });
        }
        setIsFavorite(!isFavorite);
    };

    if (loading) return <p>Bezig met laden...</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
            <div className="background-image">
                <img src={myImage} alt="Background" />
            </div>

            <div className="park-detail">
                <h1>{park.fullName}</h1>


                <div
                    className="favorite-icon"
                    onClick={handleFavoriteToggle}
                    title={isFavorite ? "Verwijder uit favorieten" : "Voeg toe aan favorieten"}
                    style={{ cursor: "pointer", fontSize: "80px" }}
                >
                    {isFavorite ? "❤️" : "🤍"}
                </div>

                <img
                    src={park.images?.[0]?.url}
                    alt={park.images?.[0]?.altText || park.fullName}
                    width="600"
                />
                <p><strong>Description:</strong> {park.description}</p>
                <p><strong>State:</strong> {park.states}</p>
                <p><strong>Address:</strong> {park.directionsInfo}</p>

                <p><strong>Openinghours:</strong></p>
                {park.operatingHours?.length > 0 ? (
                    <div>
                        <p>{park.operatingHours[0].description}</p>
                        <ul>
                            {[
                                "monday", "tuesday", "wednesday", "thursday",
                                "friday", "saturday", "sunday",
                            ].map((day) => (
                                <li key={day}>
                                    {day.charAt(0).toUpperCase() + day.slice(1)}:{" "}
                                    {park.operatingHours[0].standardHours[day] || "Gesloten"}
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <p>Geen openingstijden beschikbaar.</p>
                )}

                <Link to="/" className="back-button">Back</Link>


                {showLoginModal && (
                    <div
                        className="modal-overlay"
                        onClick={() => setShowLoginModal(false)}
                    >
                        <div
                            className="modal-content"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <p>Je moet inloggen om favorieten toe te voegen.</p>
                            <button onClick={() => setShowLoginModal(false)}>Sluiten</button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default ParkDetail;
