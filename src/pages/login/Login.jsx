import "./Login.css";
import React, {useContext, useState} from "react";
import axios from "axios";
import { AuthContext } from "/src/context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button/Button.jsx";
import myImage from "../../assets/photos/Photo-1.png";

function Login() {
    const { login } = useContext(AuthContext);
    const apiAuth = import.meta.env.VITE_API_URL_AUTH;
    const apiKey = import.meta.env.VITE_API_KEY_NOVI_BACKEND;
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();



    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);



        try {
            const response = await axios.post(
                apiAuth,
                { username,  password },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "X-Api-Key": apiKey,
                    },
                }
            );

            if (response.status === 200) {
                login(response.data.jwt);
                navigate("/favorite");
            }
        } catch (error) {
            setError(`Er is iets mis gegaan met inloggen!`);
            console.error(error);
        } finally {
            setLoading(false);
        }





    };

    return(

        <main className="login-page">
            <div className="login-image">
                <img src={myImage} alt="Sfeervolle achtergrondafbeelding" />
            </div>

            <section className="login-section">
                <h1>Inloggen</h1>

                <form className="login-form" onSubmit={handleLogin}>
                    <fieldset>
                        <div className="input-group">
                            <label htmlFor="username">Username:</label>
                            <input
                                id="username"
                                type="text"
                                name="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>

                            <div className="input-group">

                                <label htmlFor="password">Wachtwoord:</label>
                                <input
                                    id="password"
                                    type="password"
                                    name="wachtwoord"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                    </fieldset>

                    <Button onClick={onclick}

                            type="submit" disabled={isLoading}
                        className="button-login">
                        {isLoading ? "Bezig met inloggen..." : "Inloggen"}
                    </Button>

                    {error && <p className="error-message" role="alert">{error}</p>}
                </form>
            </section>
        </main>
    );
}

export default Login;
