import React from "react";
import "/src/assets/components/Alertpopup/Alert.css";




function Alert({ message, onClose, type }) {

    if (!message) return null;

    return (
        <div className="alert-overlay">
            <div className={`alert-box ${type}`}>
                <p>{message}</p>
                <button onClick={onClose}>OK</button>
            </div>
        </div>
    );
}



export default Alert;