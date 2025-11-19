import { createContext, useEffect, useState, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FavoritesContext } from "./FavoritesContext.jsx"; // import FavoritesContext

export const AuthContext = createContext(null);

function AuthContextProvider({ children }) {
    const [auth, setAuth] = useState({ isAuth: false, user: null });
    const navigate = useNavigate();
    const SESSION_DURATION = 30 * 60 * 1000;

    const { clearFavorites } = useContext(FavoritesContext); // haal clearFavorites op

    useEffect(() => {
        const token = localStorage.getItem("token");

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

    useEffect(() => {
        if (!auth.isAuth) return;

        const logoutTimer = setTimeout(() => {
            logout();
        }, SESSION_DURATION);

        return () => clearTimeout(logoutTimer);
    }, [auth.isAuth]);

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
                user: { username: userData.username, email: userData.email },
            });
            navigate("/favorite");
        } catch (err) {
            console.error("Login mislukt:", err);
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setAuth({ isAuth: false, user: null });
        clearFavorites(); // <-- reset favorites bij logout
        navigate("/login");
    };

    const contextData = {
        isAuth: auth.isAuth,
        user: auth.user,
        login,
        logout,
    };

    return <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
