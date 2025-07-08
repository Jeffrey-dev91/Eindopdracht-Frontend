// AuthContextProvider.jsx
import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext(null);

function AuthContextProvider({ children }) {
    const [auth, setAuth] = useState({
        isAuth: false,
        user: null,
    });

    const [favorites, setFavorites] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        const token = localStorage.getItem("token");
        const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
        setFavorites(storedFavorites);

        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                axios
                    .get(`https://api.datavortex.nl/amusementdatabase/users/${decodedToken.sub}`, {
                        headers: {
                            authorization: `Bearer ${token}`,
                            "content-type": "application/json",
                        },
                    })
                    .then((response) => {
                        const userData = response.data;
                        setAuth({
                            isAuth: true,
                            user: {
                                username: userData.username,
                                email: userData.email,
                            },
                        });
                    })
                    .catch((err) => {
                        console.error("Fout bij ophalen user data:", err);
                        setAuth({ isAuth: false, user: null });
                        localStorage.removeItem("token");
                    });
            } catch (err) {
                console.error("Ongeldige token:", err);
                setAuth({ isAuth: false, user: null });
                localStorage.removeItem("token");
            }
        }
    }, []);

    const login = async (jwtToken) => {
        try {
            localStorage.setItem("token", jwtToken);
            const decodedToken = jwtDecode(jwtToken);
            const response = await axios.get(
                `https://api.datavortex.nl/amusementdatabase/users/${decodedToken.sub}`,
                {
                    headers: {
                        authorization: `Bearer ${jwtToken}`,
                        "content-type": "application/json",
                    },
                }
            );
            const userData = response.data;
            setAuth({
                isAuth: true,
                user: {
                    username: userData.username,
                    email: userData.email,
                },
            });
            navigate("/favorite");
        } catch (err) {
            console.error("Login mislukt:", err);
        }
    };

    const logout = () => {

        localStorage.removeItem("token");
        setAuth({ isAuth: false, user: null });
        navigate("/login");
    };

    const addFavorite = (park) => {
        if (!favorites.some((item) => item.parkCode === park.parkCode)) {
            const newFavorites = [...favorites, park];
            setFavorites(newFavorites);
            localStorage.setItem("favorites", JSON.stringify(newFavorites));
        }
    };

    const removeFavorite = (parkCode) => {
        const newFavorites = favorites.filter((item) => item.parkCode !== parkCode);
        setFavorites(newFavorites);
        localStorage.setItem("favorites", JSON.stringify(newFavorites));
    };

    const contextData = {
        isAuth: auth.isAuth,
        user: auth.user,
        login,
        logout,
        favorites,
        addFavorite,
        removeFavorite,
    };

    return <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
