import React, { useState } from "react";
import axios from "axios";
import Alert from "/src/components/Alertpopup/Alert.jsx";
import myImage from "/src/assets/photos/Photo-1.png";
import "./Registreren.css";
import Button from "../../components/button/Button.jsx";

function Registreren() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [usernameError, setUsernameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [melding, setMelding] = useState("");
    const [meldingType, setMeldingType] = useState("");

    const apiUrl = import.meta.env.VITE_API_URL;
    const apiKey = import.meta.env.VITE_API_KEY_NOVI_BACKEND;

    const handleRegisteren = async (e) => {
        e.preventDefault();
        setUsernameError("");
        setEmailError("");
        setPasswordError("");
        setMelding("");
        setMeldingType("");

        try {
            await axios.post(
                apiUrl,
                {username, email, password},
                {
                    headers: {
                        "Content-Type": "application/json",
                        "X-Api-Key": apiKey,
                    },
                }
            );

            setMelding(`Registratie gelukt!`);
            setMeldingType("success");
        } catch (error) {
            const status = error.response?.status;
            const field = error.response?.data?.field;
            const message = error.response?.data?.message || error.message || "Onbekende fout";

            if (status === 409) {
                if (field === "email") setEmailError(message);
                else if (field === "username") setUsernameError(message);
                else {
                    setMelding("Er bestaat al een gebruiker met dezelfde gegevens.");
                    setMeldingType("error");
                }
            } else {
                const msg = message.toLowerCase();
                if (msg.includes("gebruikersnaam") || msg.includes("username")) setUsernameError(message);
                else if (msg.includes("email") || msg.includes("e-mailadres")) setEmailError(message);
                else if (msg.includes("wachtwoord") || msg.includes("password")) setPasswordError(message);
                else {
                    setMelding(message);
                    setMeldingType("error");
                }
            }
        }
    };
        return (
            <>
                <main className="register-main">
                    <div className="header-container-2">
                        <div className="register-background">
                            <img src={myImage} alt="A scenic background"/>
                        </div>
                    </div>


                    <section className="register-content">
                        <h2>Registreren</h2>

                        <form
                            className="formulier-register"
                            onSubmit={handleRegisteren}
                            aria-labelledby="registratie-formulier"
                        >
                            <fieldset>
                                <div>
                                    <label htmlFor="username">Username:</label>
                                    <input
                                        id="username"
                                        type="text"
                                        value={username}
                                        onChange={(e) => {
                                            setUsername(e.target.value);
                                            setUsernameError("");
                                        }}
                                        required
                                        aria-describedby="username-error"
                                    />
                                    {usernameError &&
                                        <p id="username-error" className="error-message">{usernameError}</p>}
                                </div>

                                <div>
                                    <label htmlFor="email">E-mail:</label>
                                    <input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                            setEmailError("");
                                        }}
                                        required
                                        aria-describedby="email-error"
                                    />
                                    {emailError && <p id="email-error" className="error-message">{emailError}</p>}
                                </div>

                                <div>
                                    <label htmlFor="password">Wachtwoord:</label>
                                    <input
                                        id="password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                            setPasswordError("");
                                        }}
                                        required
                                        aria-describedby="password-error"
                                    />
                                    {passwordError &&
                                        <p id="password-error" className="error-message">{passwordError}</p>}
                                </div>

                                <Button type="submit" className="button-register">Registreer</Button>
                            </fieldset>
                        </form>

                        <Alert
                            message={melding}
                            type={meldingType}
                            onClose={() => {
                                setMelding("");
                                setMeldingType("");
                            }}
                        />
                    </section>

                </main>


            </>

        );
    }


export default Registreren;
