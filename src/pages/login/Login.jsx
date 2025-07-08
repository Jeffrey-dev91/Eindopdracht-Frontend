
import "./Login.css"
import React, {useContext, useState} from "react";
import axios from "axios";
import {AuthContext} from "/src/assets/context/AuthContext.jsx";
import {useNavigate} from "react-router-dom";
import Button from "../../assets/components/button/Button.jsx";
import myImage from "../../assets/components/photos/Photo-1.png";






function Login() {
    const {login} = useContext(AuthContext);
    const apiAuth = import.meta.env.VITE_API_URL_AUTH;
    const apiKey = import.meta.env.VITE_API_KEY_NOVI_BACKEND;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
const navigate = useNavigate();
const [isLoading, setLoading] = useState(false);
const[error, setError] = useState(null);


    const handleLogin = async (e) => {
        e.preventDefault();

setLoading(true);


            try {

                const response = await axios.post(
                    apiAuth,
                    {

             username,
                        email,password

                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "X-Api-Key": apiKey,

                        },

                    }
                );

console.log(response);
if(response.status === 200) {
    login(response.data.jwt);
    navigate("/favorite");

}

            } catch (error) {
                setError(`Er is iets mis gegaan. Error: ${error.message}`);
                console.error(error);
            }finally {
                setLoading(false);
            }

        };


        return (
            <>


                <header className="header-containers">
                    <div className="background-image">
                        <img src={myImage} alt="Background"/>
                    </div>


                    <div className="register-contents">
                        <h2>Inloggen</h2>

                        <form className="formulier-inlog" onSubmit={handleLogin}>

                            <label>
                                Username:
                                <input
                                    className="username-balk"
                                    type="text"
                                    name="username"
                                    value={username}
                                    onChange={(e) => {
                                        setUsername(e.target.value);
                                    }}
                                    required
                                />

                            </label>
                            <br/>
                            <label>
                                E-mail:
                                <input
                                    className="email-balk"
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);

                                    }}
                                    required
                                />
                            </label>


                            <br/>

                            <label>
                                Wachtwoord:
                                <input
                                    className="password-balk"
                                    type="password"
                                    name="wachtwoord"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);

                                    }}
                                    required
                                />
                            </label>

                            <br/>

                            <button type="submit" disabled={isLoading}>Inloggen</button>


                        </form>

                    </div>
                </header>
            </>
        );
}

export default Login;