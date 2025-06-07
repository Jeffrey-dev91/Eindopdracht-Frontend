import Button from "../../assets/components/button/Button.jsx";
import "./Login.css"
import React from "react";
import {useNavigate} from "react-router-dom";
import myImage from "../../assets/components/photos/Photo-1.png";



function Login() {

    // const navigate = useNavigate();
    //
    // const handleClick = () => {
    //     navigate('/favorite'); // Verwijst naar /doelpagina binnen je app
    // };

    return (


        <>

            <main>
                <div className="header-page">
                    <img alt="image" width="100%" src={myImage}/>

                </div>


                <div className="formulier-container">
                    <h2>Inloggen</h2>
                    <form className="formulier-inside" action="/verwerk-formulier" method="post">
                        <label htmlFor="naam">Gebruikersnaam:</label><br/>
                        <input type="text" id="naam" name="naam" required/><br/><br/>

                        <label htmlFor="wachtwoord">Wachtwoord:</label><br/>
                        <input type="text" id="wachtwoord" name="wachtwoord" required/><br/><br/>


                        <button className="button-twee" type="button">Inloggen</button>

                    </form>
                </div>


            </main>






</>
)
}

export default Login