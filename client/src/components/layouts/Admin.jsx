import { NavLink, Outlet } from "react-router";
import { useState } from "react";
import "./Admin.css";

export function Admin() {
    const [toggle, setToggle] = useState(false);

    return <>
        <section>
            <div className="admin">
                <div className="sidebar">
                    <span><NavLink to={'/admin'}>Home</NavLink></span>
                    <span><NavLink onClick={() => setToggle(!toggle)} to={'/admin/user'}>Users</NavLink></span>
                    <span><NavLink onClick={() => setToggle(!toggle)} to={'/admin/contact'}>Contacts</NavLink></span>
                </div>
                <Outlet context={{toggle, setToggle}}/>
            </div>
        </section>
    </>;
}