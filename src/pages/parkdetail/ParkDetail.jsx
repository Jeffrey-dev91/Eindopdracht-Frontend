import React, { useEffect, useState } from "react";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import "./ParkDetail.css";
import myImage from "/src/assets/components/photos/Photo-1.png";



function ParkDetail() {
    const {id: parkCode} = useParams();
    const [park, setPark] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);



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

            } catch (setError) {
                setError("Fout bij laden van parkgegevens.");
            } finally {
                setLoading(false);
            }
        };

        fetchPark();
    }, [parkCode]);

    if (loading) return <p>Bezig met laden...</p>;
    if (error) return <p>{error}</p>;


    return (
        <>
            <div className="background-image">
                <img src={myImage} alt="Background"/>
            </div>

            <div className="park-detail">
                <h1>{park.fullName}</h1>
                <img
                    src={park.images?.[0]?.url}
                    alt={park.images?.[0]?.altText || park.fullName}
                    width="600"
                />
                <p><strong>Description:</strong> {park.description}</p>
                <p><strong>State:</strong> {park.states}</p>
                <p><strong>Adress:</strong> {park.directionsInfo}</p>

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

                <a>
                    <Link to={'/'} className="back-button">Back</Link>

                </a>

            </div>
        </>
    );

}

export default ParkDetail;
