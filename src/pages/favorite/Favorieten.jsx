import React from "react";
import axios from "axios";
import "./Favorieten.css"
import { useEffect, useState } from "react";
import { Link} from "react-router-dom";


function Favorieten() {
    const [allParks, setAllParks] = useState([]);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [openParkIds, setOpenParkIds] = useState([]);

    const toggleParkDetails = (parkId) => {
        setOpenParkIds((prev) =>
            prev.includes(parkId)
                ? prev.filter((id) => id !== parkId) // sluiten
                : [...prev, parkId] // openen
        );
    };


    useEffect(() => {
        const fetchAllParks = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    "https://developer.nps.gov/api/v1/parks?limit=474",
                    {
                        headers: {
                            "X-Api-Key": "uzHHE33UGURmm9IfC4s9c5c4KyfjhfFwKnEPJ0AJ",
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
        setError(filtered.length === 0 ? "Geen resultaten gevonden." : null);
    }, [searchTerm, allParks]);

    const handleClearContent = () => {
        setPosts([]);
        setSearchTerm("");
        setError(null);
    };

    return (
        <>
            <input
                type="text"
                placeholder="Zoek op parknaam (beginletters)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="zoekbalk"
            />

            <nav className="navbar">
                <h1>Park Zoeker</h1>
                <div className="nav-controls">
                    <button className="button-een" type="button" onClick={handleClearContent}>
                        Clear content
                    </button>
                </div>
            </nav>


            <div className="post-grid">

                {posts.map((post) => (
                    <div key={post.id} className="post-card">
                            <h2>{post.fullName}</h2>

                            {post.images?.length > 0 && (

                                <Link to={`/park/${post.parkCode}`}>

                                    <img
                                        src={post.images[0].url}
                                        alt={post.images[0].altText || `Afbeelding van ${post.fullName}`}
                                        className="park-image"
                                        loading="lazy"
                                        width="300"
                                        height="200"
                                    />
                                </Link>

                                    )}

                                    <button onClick={() => toggleParkDetails(post.id)}>
                                        {openParkIds.includes(post.id) ? "Minder informatie" : "Meer informatie"}
                                    </button>

                                    {openParkIds.includes(post.id) && (
                                        <div className="extra-info">
                                            <p><strong>Beschrijving:</strong> {post.description}</p>
                                            <p><strong>Staat(en):</strong> {post.states}</p>
                                            <p><strong>Adres:</strong> {post.directionsInfo}</p>
                                            <a href={post.url} target="_blank" rel="noopener noreferrer">
                                                Bekijk officiële pagina →
                                            </a>
                                        </div>
                                    )}
                                </div>
                            ))}

                        </div>

                        </>
                        );
                    }

                    export default Favorieten;
