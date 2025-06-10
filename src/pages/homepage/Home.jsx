import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import myImage from "/src/assets/components/photos/Photo-1.png";
import "./Home.css";

function Home() {
    const [allParks, setAllParks] = useState([]);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [error, setError] = useState(null);
    const [noResults, setNoResults] = useState(false);

    useEffect(() => {
        const fetchAllParks = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    "https://developer.nps.gov/api/v1/parks?limit=474", {
                        headers: {
                            "X-Api-Key": import.meta.env.VITE_API_KEY,
                        },

                    }
                );
                setAllParks(response.data.data);
            } catch (err) {
                console.error(err.message);
                setError("Fout bij ophalen van parken.");
            } finally {
                setLoading(false);
            }
        };

        fetchAllParks();
    }, []);


    useEffect(() => {
        const trimmedSearch = searchTerm.trim().toLowerCase();
        if (!trimmedSearch) {
            setPosts([]);
            setError(null);
            return;
        }

        const filtered = allParks.filter((post) =>
            post.fullName.toLowerCase().startsWith(trimmedSearch)
        );

        setPosts(filtered);
        setNoResults(filtered.length === 0);
        setError(filtered.length === 0 ? 'Geen resultaten gevonden.' : null);
    }, [searchTerm, allParks]);


    return (
        <>

            <header className="header-container">
                <div className="background-image">
                    <img src={myImage} alt="Background" />
                </div>


                <div className="home-content">
                    <h1> Amusement Parks USA</h1>

                    <form className="home-form">
                        <input
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



            {noResults && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Geen Resultaten Gevonden</h2>
                        <p>Probeer het met andere zoektermen.</p>
                        <button onClick={() => setNoResults(false)} className="modal-close-button">
                            Sluit
                        </button>
                    </div>
                </div>

            )}


            <div className="overlay-grid">
                {error && <p>{error}</p>}

                {loading ? (
                    <p>Loading...</p>
                ) : (
                    posts.map((post) => (
                        <div key={post.id} className="post-card">
                            <Link to={`/park/${post.parkCode}`} className="image-link">
                                <div className="image-container">

                                    {post.images?.length > 0 && (
                                        <img
                                            src={post.images[0].url}
                                            alt={post.images[0].altText || `Afbeelding van ${post.fullName}`}
                                            className="park-image"
                                            loading="lazy"
                                            width="300"
                                            height="200"
                                        />
                                    )}
                                    <div className="overlay">
                                        <p className="overlay-title">{post.fullName}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))
                )}
            </div>
        </>
    );
}

export default Home;
