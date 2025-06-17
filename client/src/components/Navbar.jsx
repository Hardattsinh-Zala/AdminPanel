import { NavLink } from "react-router";
import { useAuth } from "../store/token";
import { useEffect, useState } from "react";
import "./Navbar.css";

export function Navbar() {
    const { isLogged } = useAuth();
    const [hydrated, setHydrated] = useState(false);
    const [menu, setMenu] = useState(false);

    const handleClick = () => {
        setMenu(!menu);
    }

    useEffect(() => {
        setHydrated(true);
    }, [])

    return <>
        <header>
            <div className="nav-container">
                <span className="brand"><NavLink to="/"><b>GhostShell</b></NavLink></span>
                {
                    hydrated &&
                    (<div className={`menu-links ${!hydrated ? 'menu-links-inactive' : menu ? 'slideDownMenu' : 'slideUpMenu'}`}>
                        <span><NavLink onClick={handleClick} to="/">Home</NavLink></span>
                        <span><NavLink onClick={handleClick} to="/contact">Contact</NavLink></span>
                        {
                            isLogged ?
                                <span><NavLink onClick={handleClick} to="/logout">Logout</NavLink></span>
                                :
                                <>
                                    <span><NavLink onClick={handleClick} to="/register">Register</NavLink></span>
                                    <span><NavLink onClick={handleClick} to="/login">Login</NavLink></span>
                                </>
                        }
                    </div>)
                }
                <div className="links">
                    <span><NavLink to="/">Home</NavLink></span>
                    {/* <NavLink to="/services">Services</NavLink> */}
                    <span><NavLink to="/contact">Contact</NavLink></span>
                    {
                        isLogged ?
                            <span><NavLink to="/logout">Logout</NavLink></span>
                            :
                            <>
                                <span><NavLink to="/register">Register</NavLink></span>
                                <span><NavLink to="/login">Login</NavLink></span>
                            </>
                    }
                </div>
                <span className="menu" onClick={handleClick}>{menu ? "Close" : "Menu"}</span>
            </div>
        </header>
    </>
}