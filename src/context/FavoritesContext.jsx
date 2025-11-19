
import { createContext, useEffect, useState } from "react";

export const FavoritesContext = createContext(null);

function FavoritesContextProvider({ children }) {
    const [favorites, setFavorites] = useState(() => {

        return JSON.parse(localStorage.getItem("favorites")) || [];
    });

    const addFavorite = (park) => {
        if (!favorites.some((item) => item.parkCode === park.parkCode)) {
            setFavorites((prev) => [...prev, park]);
        }
    };

    const removeFavorite = (parkCode) => {
        setFavorites((prev) => prev.filter((item) => item.parkCode !== parkCode));
    };

    const clearFavorites = () => setFavorites([]);


    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);


    const contextValue = {
        favorites,
        addFavorite,
        removeFavorite,
        clearFavorites,
    };

    return (
        <FavoritesContext.Provider value={contextValue}>
            {children}
        </FavoritesContext.Provider>
    );
}

export default FavoritesContextProvider;
