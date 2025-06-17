import { useEffect, useState } from "react";
import { createContext, useContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [data, setData] = useState("");
    const tokenBearer = "Bearer "+token;
    const URL = "https://adminpanel-backend-y8yv.onrender.com";

    let isLogged = !!token;

    const logoutUser = () => {
        setToken("");
        setData("");
        return localStorage.removeItem("token");
    }

    const userAuthenticate = async () => {
        const response = await fetch(`${URL}/api/auth/user`, {
            method: "GET",
            headers: {
                Authorization: tokenBearer
            }
        });

        if(response.ok) {
            const res = await response.json();
            setData(res.userData);
        }
    }

    useEffect(() => {
        userAuthenticate();
    }, []);

    const storeToken = (token) => {
        setToken(token);
        return localStorage.setItem('token', token);
    }

    const checkAdmin = (isAdmin) => {
        setIsAdmin(isAdmin);
        return localStorage.setItem('isAdmin', isAdmin);
    }

    return <AuthContext.Provider value={{logoutUser, storeToken, checkAdmin, isLogged, data, tokenBearer, URL}}>
        {children}
    </AuthContext.Provider>
}

export const useAuth = () => {
    return useContext(AuthContext);
}
