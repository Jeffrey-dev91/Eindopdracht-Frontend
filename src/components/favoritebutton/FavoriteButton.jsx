import React from "react";
import "/src/components/favoritebutton/FavoriteButton.css";




function FavoriteButton({ isFavorite, onToggle, className = "" }) {
    return (
        <button
            className={`favorite-button ${isFavorite ? "favorite" : ""} ${className}`}
            onClick={onToggle}
            aria-pressed={isFavorite}

        >
            {isFavorite ? "❤️" : "🤍"}
        </button>
    );
}

export default FavoriteButton;