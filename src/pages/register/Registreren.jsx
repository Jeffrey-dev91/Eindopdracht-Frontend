import React from "react";
import myImage from "/src/assets/components/photos/Photo-1.png"
import "./Registreren.css"
import Button from "../../assets/components/button/Button.jsx";

function Registreren() {
    return (
        <>


            <main>
<div className="header-page">
                <img alt="image" width="100%" src={myImage}/>

            </div>


<div className="formulier-container">
            <h2>Registreren</h2>
    <form className="formulier-inside" action="/verwerk-formulier" method="post">
        <label htmlFor="naam">Gebruikersnaam:</label><br/>
        <input type="text" id="naam" name="naam" required/><br/><br/>

        <label htmlFor="wachtwoord">Wachtwoord:</label><br/>
        <input type="text" id="wachtwoord" name="wachtwoord" required/><br/><br/>

        <label htmlFor="email">Email:</label><br/>
        <input type="text" id="email" name="email" required/><br/><br/>

        <button className="button-twee" type="button">Registreren</button>

    </form>
</div>


            </main>
        </>

    );
}

export default Registreren;