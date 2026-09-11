import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedToken = localStorage.getItem("accessToken");

        if (!storedToken) {
            setLoading(false);
            return;
        }

        const verifyUser = async () => {
            try {
                const response = await axios.get(
                    "http://127.0.0.1:5000/api/auth/me",
                    {
                        headers: {
                            Authorization: `Bearer ${storedToken}`,
                        },
                    }
                );

                setToken(storedToken);
                setUser(response.data.user);

                localStorage.setItem(
                    "user",
                    JSON.stringify(response.data.user)
                );
            } catch (error) {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("user");

                setToken(null);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        verifyUser();
    }, []);

    const login = (accessToken, userData) => {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("user", JSON.stringify(userData));

        setToken(accessToken);
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");

        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                loading,
                login,
                logout,
                isAuthenticated: !!token,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}