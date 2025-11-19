import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import myImage from "/src/assets/photos/Photo-1.png";
import "./Home.css";
import Button from "../../components/button/Button.jsx";

function Home() {
    const [allParks, setAllParks] = useState([]);
    const [filteredParks, setFilteredParks] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [noResults, setNoResults] = useState(false);
    const [visibleCount, setVisibleCount] = useState(20);

    const apiKey = import.meta.env.VITE_API_KEY_PARK;
    const apiUrl = import.meta.env.VITE_API_PARK_URL;


    useEffect(() => {
        let isMounted = true;

        const fetchParks = async () => {
            setLoading(true);
            setError(null);

            try {
                const cached = sessionStorage.getItem("parks");
                if (cached) {
                    if (isMounted) setAllParks(JSON.parse(cached));
                    return;
                }

                const response = await axios.get(apiUrl, {
                    headers: { "X-Api-Key": apiKey },
                });

                if (isMounted) {
                    setAllParks(response.data.data);
                    sessionStorage.setItem("parks", JSON.stringify(response.data.data));
                }
            } catch (err) {
                console.error(err);
                if (isMounted)
                    setError("Fout bij het ophalen van parken. Probeer het later opnieuw.");
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchParks();

        return () => {
            isMounted = false;
        };
    }, [apiUrl, apiKey]);

    useEffect(() => {
        const handler = setTimeout(() => {
            const trimmed = searchTerm.trim().toLowerCase();

            if (!trimmed) {
                setFilteredParks([]);
                setNoResults(false);
                setVisibleCount(20);
                return;
            }

            const filtered = allParks.filter((p) =>
                p.fullName.toLowerCase().includes(trimmed)
            );

            setFilteredParks(filtered);
            setNoResults(filtered.length === 0);
            setVisibleCount(20);
        }, 300);

        return () => clearTimeout(handler);
    }, [searchTerm, allParks]);

    const displayedParks = filteredParks.slice(0, visibleCount);

    return (
        <>
            <header className="header-container">
                <div className="home-background">
                    <img src={myImage} alt="Amusement Parks USA Background" />
                </div>

                <div className="home-content">
                    <h1>Amusement Parks USA</h1>
                    <form className="home-form" role="search">
                        <input
                            id="searchTerm"
                            className="balk-1"
                            type="text"
                            placeholder="Zoek op parknaam..."
                            value={searchTerm}
                            maxLength={20}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </form>
                </div>
            </header>

            {error && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>{error}</h2>
                        <button
                            onClick={() => setError(null)}
                            className="modal-close-button"
                        >
                            Sluit
                        </button>
                    </div>
                </div>
            )}

            {noResults && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Geen resultaten gevonden</h2>
                        <p>Probeer een andere zoekterm.</p>
                        <button
                            onClick={() => setNoResults(false)}
                            className="modal-close-button"
                        >
                            Sluit
                        </button>
                    </div>
                </div>
            )}

            <main>
                <section aria-live="polite" className="overlay-grid-1">
                    {loading ? (
                        <p className="loading-text">Bezig met laden...</p>
                    ) : (
                        displayedParks.map((post) => (
                            <article key={post.id} className="post-card-1">
                                <Link to={`/park/${post.parkCode}`} className="name-card">
                                    <div className="name-box">
                                        <h2 className="park-name">{post.fullName}</h2>
                                    </div>
                                </Link>
                            </article>
                        ))
                    )}

                    {!loading && visibleCount < filteredParks.length && (
                        <div
                            style={{
                                gridColumn: "1 / -1",
                                textAlign: "center",
                                marginTop: "20px",
                            }}
                        >
                            <Button
                                className="button-home"
                                onClick={() => setVisibleCount((prev) => prev + 20)}
                            >
                                Zoek verder
                            </Button>
                        </div>
                    )}
                </section>
            </main>
        </>
    );
}

export default Home;
