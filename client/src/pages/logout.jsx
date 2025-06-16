import { useEffect } from "react";
import {Navigate} from "react-router";
import { useAuth } from "../store/token";

export function Logout() {
    const {logoutUser} = useAuth();

    useEffect(() => {
        logoutUser();
    }, [logoutUser]);

    return <Navigate to={'/login'} />
}