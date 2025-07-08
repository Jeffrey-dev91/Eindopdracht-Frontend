import React, {useState} from "react";
import axios from "axios";
import Alert from "/src/assets/components/Alertpopup/Alert.jsx";
import myImage from "/src/assets/components/photos/Photo-1.png";
import "./Registreren.css";


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
            const response = await axios.post(
               apiUrl,
                { username, email, password },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "X-Api-Key": apiKey,
                    },
                }

            )

            console.log("Registratie succesvol:", response.data);
            setMelding("Registratie gelukt!");
            setMeldingType("success");
        } catch (error) {
            console.log("Complete error object:", error);
            console.log("error.response:", error.response);
            console.log("error.response.data:", error.response?.data);
            console.log("error.response.data.message:", error.response?.data?.message);


            let message = "";

            if (error.response?.data?.message) {
                message = error.response.data.message;
            } else if (error.response?.data) {
                if (typeof error.response.data === "string") {
                    message = error.response.data;
                } else if (typeof error.response.data === "object") {
                    message = JSON.stringify(error.response.data);
                }
            } else {
                message = error.message || "Onbekende fout";
            }

            const msg = message.toLowerCase();

            let isRelevantError = false;

            if (
                msg.includes("gebruikersnaam") ||
                msg.includes("username") ||
                msg.includes("naam bestaat") ||
                msg.includes("naam is al in gebruik")
            ) {
                setUsernameError(message);
                console.error("Fout bij gebruikersnaam:", message);
                isRelevantError = true;
            } else if (
                msg.includes("email") ||
                msg.includes("e-mailadres") ||
                msg.includes("emailadres") ||
                msg.includes("al geregistreerd") ||
                msg.includes("already exists")
            ) {
                setEmailError(message);
                console.error("Fout bij email:", message);
                isRelevantError = true;
            } else if (
                msg.includes("wachtwoord") ||
                msg.includes("password") ||
                msg.includes("minimaal") ||
                msg.includes("tekens") ||
                msg.includes("too short")
            ) {
                setPasswordError(message);
                console.error("Fout bij wachtwoord:", message);
                isRelevantError = true;
            }

            if (!isRelevantError) {
                console.error("Niet-herkende fout:", message);
                setMelding(message);
                setMeldingType("error");
            }
        }
    };

    return (
        <>
            <header className="header-containers">
                <div className="background-image">
                    <img src={myImage} alt="Background" />
                </div>

                <div className="register-contents">
                    <h2>Registreren</h2>

                    <form className="formulier-register" onSubmit={handleRegisteren}>
                        <label>
                            Username:
                            <input
                                className="naambalk"
                                type="text"
                                name="naam"
                                value={username}
                                onChange={(e) => {
                                    setUsername(e.target.value);
                                    setUsernameError("");
                                }}
                                required
                            />
                        </label>
                        {usernameError && <p style={{ color: "red" }}>{usernameError}</p>}

                        <br />

                        <label>
                            E-mail:
                            <input
                                className="email-balk"
                                type="email"
                                name="email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setEmailError("");
                                }}
                                required
                            />
                        </label>
                        {emailError && <p style={{ color: "red" }}>{emailError}</p>}

                        <br />

                        <label>
                            Wachtwoord:
                            <input
                                className="password-balk"
                                type="password"
                                name="wachtwoord"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setPasswordError("");
                                }}
                                required
                            />
                        </label>
                        {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}

                        <br />

                        <button type="submit">Registreer</button>

                        <Alert
                            message={melding}
                            type={meldingType}
                            onClose={() => {
                                setMelding("");
                                setMeldingType("");
                            }}
                        />
                    </form>
                </div>
            </header>
        </>
    );
}

export default Registreren;
